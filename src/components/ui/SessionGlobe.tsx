"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  geoCircle,
  geoDistance,
  geoGraticule10,
  geoOrthographic,
  geoPath,
} from "d3-geo";
import { feature } from "topojson-client";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";
import { useSessionClock } from "@/components/ui/SessionClock";
import { SESSIONS, subsolarPoint, type MarketState, type SessionId } from "@/lib/sessions";
import { EASE } from "@/lib/motion";

/**
 * The hero globe. Orthographic d3-geo projection drawn to a 2D canvas — real
 * country polygons (so a session's region can actually light up, which a
 * dot-matrix globe can't do) at a fraction of three.js's weight.
 *
 * Each frame paints, back to front: the glass ocean sphere with its emerald
 * rim, the graticule, land (live sessions' regions in emerald), the night
 * hemisphere centred on the antisolar point, then the four city markers.
 *
 * Colours are the `@theme` tokens in globals.css, inlined because canvas
 * can't read CSS custom properties per fill. Keep them in step.
 *
 * Loaded through `next/dynamic` with `ssr: false` — the atlas JSON and d3
 * stay out of the first-paint bundle, and the h1 remains the LCP element.
 */

const C = {
  blue700: "#0c8753",
  blue600: "#0fa968",
  blue400: "#6fe3ae",
  blue50: "#dcece1",
  navy900: "#0d0d0d",
  ink500: "#929290",
  land: "#cfd2cd",
} as const;

/** Degrees of longitude per ms while idle. ~3°/s — a slow, legible drift. */
const SPIN = 0.003;
/** How long after a drag or hover the idle spin waits before resuming. */
const IDLE_RESUME = 2500;
const LAT_LIMIT = 55;

type Countries = Feature<Geometry, { name: string }>[];

/** Where to point the globe for a given state — the live session(s), or the next to open. */
function homeFor(market: MarketState): [number, number] {
  const live = market.sessions.filter((s) => s.live);
  if (live.length) {
    // Average longitudes on the circle so Tokyo + Sydney doesn't wrap wrongly.
    const x = live.reduce((a, s) => a + Math.cos((s.def.coords[0] * Math.PI) / 180), 0);
    const y = live.reduce((a, s) => a + Math.sin((s.def.coords[0] * Math.PI) / 180), 0);
    const lat = live.reduce((a, s) => a + s.def.coords[1], 0) / live.length;
    return [(Math.atan2(y, x) * 180) / Math.PI, lat * 0.5];
  }
  const next = [...market.sessions]
    .filter((s) => s.opensIn !== null)
    .sort((a, b) => a.opensIn! - b.opensIn!)[0];
  return next ? [next.def.coords[0], next.def.coords[1] * 0.5] : [0, 20];
}

function shortestLng(from: number, to: number) {
  const d = ((((to - from) % 360) + 540) % 360) - 180;
  return from + d;
}

export function SessionGlobe({ className = "" }: { className?: string }) {
  const { market, focus } = useSessionClock();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Everything the frame loop reads lives in refs, so a 1s clock tick never
  // re-creates the loop.
  const marketRef = useRef<MarketState | null>(null);
  const focusRef = useRef<SessionId | null>(null);
  const rot = useRef({ lng: 0, lat: 20 });
  const placed = useRef(false);
  const idleAt = useRef(0);
  const tween = useRef<gsap.core.Tween | null>(null);
  const dirty = useRef(true);

  // First real tick: face the live session(s), without animating.
  useEffect(() => {
    marketRef.current = market;
    dirty.current = true;
    if (!market || placed.current) return;
    const [lng, lat] = homeFor(market);
    rot.current = { lng, lat };
    placed.current = true;
  }, [market]);

  // Hovering a row in the session card turns the globe to that city.
  useEffect(() => {
    focusRef.current = focus;
    dirty.current = true;
    if (!placed.current) return;
    const target = focus
      ? SESSIONS.find((s) => s.id === focus)!.coords
      : null;
    if (!target) {
      idleAt.current = performance.now() + IDLE_RESUME;
      return;
    }
    tween.current?.kill();
    tween.current = gsap.to(rot.current, {
      lng: shortestLng(rot.current.lng, target[0]),
      lat: Math.max(-LAT_LIMIT, Math.min(LAT_LIMIT, target[1] * 0.6)),
      duration: 1.1,
      ease: EASE,
      onUpdate: () => {
        dirty.current = true;
      },
    });
    idleAt.current = Infinity;
  }, [focus]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const wrap = wrapRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let countries: Countries = [];
    let size = 0;
    let dpr = 1;
    let visible = true;
    let raf = 0;
    let last = performance.now();
    let cancelled = false;
    let dragging = false;
    let px = 0;
    let py = 0;

    const projection = geoOrthographic().clipAngle(90).precision(0.5);
    const path = geoPath(projection, ctx);
    const graticule = geoGraticule10();
    const sphere = { type: "Sphere" } as const;
    const font = getComputedStyle(document.body).fontFamily;

    import("world-atlas/countries-110m.json").then((mod) => {
      if (cancelled) return;
      const topo = (mod.default ?? mod) as unknown as Topology<{
        countries: GeometryCollection<{ name: string }>;
      }>;
      countries = (
        feature(topo, topo.objects.countries) as FeatureCollection<Geometry, { name: string }>
      ).features;
      dirty.current = true;
    });

    const resize = () => {
      size = wrap.clientWidth;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      dirty.current = true;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) dirty.current = true;
    });
    io.observe(wrap);

    function draw(now: number) {
      const m = marketRef.current;
      const r = size * 0.44;
      const cx = size / 2;
      const cy = size / 2;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      projection
        .scale(r)
        .translate([cx, cy])
        .rotate([-rot.current.lng, -rot.current.lat, 0]);

      // Ocean — a lit glass sphere with an emerald halo.
      const ocean = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.4, r * 0.05, cx, cy, r);
      ocean.addColorStop(0, "#ffffff");
      ocean.addColorStop(0.6, "#f1f6f2");
      ocean.addColorStop(1, C.blue50);
      ctx.save();
      ctx.shadowColor = "rgb(15 169 104 / 0.38)";
      ctx.shadowBlur = r * 0.22;
      ctx.beginPath();
      path(sphere);
      ctx.fillStyle = ocean;
      ctx.fill();
      ctx.restore();

      ctx.beginPath();
      path(graticule);
      ctx.strokeStyle = "rgb(13 13 13 / 0.06)";
      ctx.lineWidth = 0.6;
      ctx.stroke();

      // Land — which countries are lit, and which belong to the hovered session.
      const lit = new Map<string, SessionId>();
      if (m && !m.marketClosed) {
        for (const s of m.sessions) {
          if (s.live) for (const id of s.def.countries) lit.set(id, s.def.id);
        }
      }
      const hovered = focusRef.current
        ? new Set(SESSIONS.find((s) => s.id === focusRef.current)!.countries)
        : null;

      for (const f of countries) {
        const id = String(f.id);
        const session = lit.get(id);
        ctx.beginPath();
        path(f);
        ctx.fillStyle = session
          ? focusRef.current === session
            ? C.blue700
            : C.blue600
          : hovered?.has(id)
            ? C.blue400
            : C.land;
        ctx.fill();
        ctx.strokeStyle = session ? "rgb(111 227 174 / 0.9)" : "rgb(255 255 255 / 0.7)";
        ctx.lineWidth = session ? 0.8 : 0.5;
        ctx.stroke();
      }

      // Night side. Stacked circles feather the terminator into a dusk band.
      if (m) {
        const [sl, sp] = subsolarPoint(m.now);
        const anti: [number, number] = [sl + 180, -sp];
        for (const radius of [92, 90, 88, 86, 84]) {
          ctx.beginPath();
          path(geoCircle().center(anti).radius(radius)());
          ctx.fillStyle = "rgb(13 13 13 / 0.028)";
          ctx.fill();
        }
      }

      ctx.beginPath();
      path(sphere);
      ctx.strokeStyle = "rgb(13 13 13 / 0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // City markers — only on the near hemisphere.
      const centre: [number, number] = [rot.current.lng, rot.current.lat];
      const pulse = reduced.matches ? 0 : (now % 2200) / 2200;
      ctx.font = `600 10.5px ${font}`;
      ctx.textBaseline = "middle";
      for (const def of SESSIONS) {
        if (geoDistance(def.coords, centre) > Math.PI / 2 - 0.08) continue;
        const p = projection(def.coords);
        if (!p) continue;
        const live = !!m?.sessions.find((s) => s.def.id === def.id)?.live;

        if (live && !reduced.matches) {
          ctx.beginPath();
          ctx.arc(p[0], p[1], 4 + pulse * 16, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(15 169 104 / ${0.45 * (1 - pulse)})`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(p[0], p[1], live ? 4.5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = live ? C.blue600 : C.ink500;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();

        const label = def.city;
        const tx = p[0] + 10;
        const w = ctx.measureText(label).width;
        ctx.fillStyle = "rgb(255 255 255 / 0.82)";
        ctx.beginPath();
        ctx.roundRect(tx - 5, p[1] - 9, w + 10, 18, 9);
        ctx.fill();
        ctx.fillStyle = live ? C.navy900 : C.ink500;
        ctx.fillText(label, tx, p[1] + 0.5);
      }
    }

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(now - last, 64);
      last = now;
      if (!visible || document.hidden || !size) return;

      const spinning =
        !reduced.matches && !dragging && now > idleAt.current && placed.current;
      if (spinning) {
        rot.current.lng += dt * SPIN;
        dirty.current = true;
      }
      // Pulses animate continuously while anything is live.
      if (!reduced.matches && marketRef.current?.sessions.some((s) => s.live)) {
        dirty.current = true;
      }
      if (!dirty.current) return;
      dirty.current = false;
      draw(now);
    }
    raf = requestAnimationFrame(frame);

    // Drag to rotate. `touch-action: pan-y` keeps vertical page scroll on touch.
    const onDown = (e: PointerEvent) => {
      dragging = true;
      px = e.clientX;
      py = e.clientY;
      tween.current?.kill();
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const k = 180 / (Math.PI * size * 0.44);
      rot.current.lng -= (e.clientX - px) * k;
      rot.current.lat = Math.max(
        -LAT_LIMIT,
        Math.min(LAT_LIMIT, rot.current.lat + (e.clientY - py) * k),
      );
      px = e.clientX;
      py = e.clientY;
      dirty.current = true;
    };
    const onUp = () => {
      dragging = false;
      idleAt.current = performance.now() + IDLE_RESUME;
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    const onReduced = () => {
      dirty.current = true;
    };
    reduced.addEventListener("change", onReduced);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      tween.current?.kill();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      reduced.removeEventListener("change", onReduced);
    };
  }, []);

  const live = market?.sessions.filter((s) => s.live).map((s) => s.def.city) ?? [];
  const label = !market
    ? "Globe of the world's trading sessions"
    : market.marketClosed || !live.length
      ? "Globe of the world's trading sessions. No session is open right now."
      : `Globe of the world's trading sessions. Open now: ${live.join(", ")}.`;

  return (
    <div ref={wrapRef} className={`relative aspect-square w-full ${className}`}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={label}
        className="absolute inset-0 size-full cursor-grab touch-pan-y active:cursor-grabbing"
      />
    </div>
  );
}
