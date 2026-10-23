"use client";

import { useRef, type Ref } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { hero, site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { EASE, DUR, STAGGER, canAnimate } from "@/lib/motion";
import { SessionClockProvider } from "@/components/ui/SessionClock";
import { SessionBoard } from "@/components/ui/SessionBoard";
import { LiveSessionPill } from "@/components/ui/LiveSessionPill";

// Canvas + d3 + the world atlas stay out of the first-paint bundle.
const SessionGlobe = dynamic(
  () => import("@/components/ui/SessionGlobe").then((m) => m.SessionGlobe),
  { ssr: false, loading: () => <GlobePlaceholder /> },
);

gsap.registerPlugin(useGSAP);

/**
 * Split hero. Left: live-session kicker pill, two-line display headline,
 * CTAs, trust row. Right: the live trading-sessions globe with its session
 * card floating over it. Then a small, permanent scroll-down indicator — the
 * pill stays put; only the chevron inside it bobs.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!canAnimate()) return;

        // One orchestrated page-load. Aurora, then headline lines, then the
        // globe rises in beside them and the session card settles over it.
        // ~1.2s total, runs once.
        const tl = gsap.timeline({ defaults: { ease: EASE } });

        tl.from("[data-hero-aurora]", { opacity: 0, duration: 1.2 })
          .from(
            "[data-hero-line]",
            { yPercent: 108, duration: 0.95, stagger: STAGGER.lines },
            0.1,
          )
          .from(
            "[data-hero-fade]",
            { y: 20, opacity: 0, duration: DUR.reveal, stagger: STAGGER.tight },
            0.45,
          )
          .from(
            "[data-hero-globe]",
            { scale: 0.94, opacity: 0, duration: 1.2 },
            0.3,
          )
          .from(
            "[data-hero-card]",
            { y: 28, opacity: 0, duration: DUR.reveal },
            0.6,
          );
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      data-surface="clear"
      className="aurora-light relative isolate overflow-hidden pt-[clamp(40px,6vw,88px)] text-navy-900"
    >
      <div data-hero-aurora aria-hidden className="absolute inset-0 -z-10">
        {/* Faint vertical rule field — Vertex's hero has one; it gives the
            gradient something to sit against so it doesn't read as a blur.
            Its focus sits behind the copy column now the globe owns the
            right. */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0 63px, rgb(0 0 0 / 0.35) 63px 64px)",
            maskImage:
              "radial-gradient(60% 55% at 30% 35%, #000, transparent 78%)",
          }}
        />
        {/* Emerald bloom behind the globe, so it reads as lit from within. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(38% 50% at 74% 46%, color-mix(in oklab, var(--color-blue-400) 22%, transparent), transparent 70%)",
          }}
        />
      </div>

      <SessionClockProvider>
        <div className="shell">
          <div className="grid items-center gap-x-[clamp(32px,4vw,72px)] gap-y-10 lg:grid-cols-[1.05fr_1fr]">
            <div className="relative z-10 mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-none lg:text-left">
              <div data-hero-fade>
                <LiveSessionPill fallback={hero.kicker} />
              </div>

              <h1 className="type-display lg:text-[clamp(2.75rem,3.9vw,4.5rem)]!">
                {hero.headline.map((line) => (
                  <span key={line} className="block overflow-hidden pb-[0.08em]">
                    <span data-hero-line className="block">
                      {line}
                    </span>
                  </span>
                ))}
              </h1>

              <p
                data-hero-fade
                className="type-lead mx-auto mt-5 max-w-[54ch] text-navy-700/80 lg:mx-0"
              >
                {hero.lead}
              </p>

              <div
                data-hero-fade
                className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
              >
                <Button href={site.cta.primary.href}>
                  {site.cta.primary.label}
                  <Arrow />
                </Button>
                <Button href={site.cta.secondary.href} variant="ghostDark">
                  {site.cta.secondary.label}
                </Button>
              </div>

              {/* Chrom's trust row. Verifiable facts only — no install counts or
                  star ratings we can't source. */}
              <ul
                data-hero-fade
                className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-navy-700/70 lg:justify-start"
              >
                {hero.trustRow.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* The live sessions globe. Below lg it stacks under the copy and
                the card sits beneath it; from lg the card floats over the
                globe's lower-left edge, overlapping it for depth. */}
            <div id="sessions" className="relative mx-auto w-full max-w-[560px] scroll-mt-28 lg:max-w-none">
              <div data-hero-globe className="mx-auto w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[600px]">
                <SessionGlobe />
              </div>
              <div
                data-hero-card
                className="relative z-10 -mt-6 sm:-mt-10 lg:absolute lg:bottom-0 lg:-left-[6%] lg:mt-0 lg:w-[260px] xl:-left-[10%]"
              >
                <SessionBoard />
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-10 pb-[clamp(40px,5vw,64px)] lg:pt-6">
            <ScrollIndicator />
          </div>
        </div>
      </SessionClockProvider>
    </section>
  );
}

/**
 * Same footprint as the globe's sphere (88% of the box), so the canvas
 * arriving causes no shift — it simply paints over the ring.
 */
function GlobePlaceholder() {
  return (
    <div className="relative aspect-square w-full" aria-hidden>
      <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_32%_30%,#fff,var(--color-blue-50))] shadow-[0_0_60px_-10px_rgb(15_169_104/0.35)]" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Small, permanent pill with a chevron, inviting the reader to keep
 * scrolling. The pill itself never moves — only the chevron bobs in an
 * endless loop, so the invitation stays put and legible rather than
 * chasing the page.
 */
function ScrollIndicator() {
  const chevronRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!canAnimate()) return;

        gsap.to(chevronRef.current, {
          y: 14,
          duration: 1.1,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      return () => mm.revert();
    },
    { scope: chevronRef },
  );

  return (
    <a
      href="#advantages"
      aria-label="Scroll to explore"
      data-hero-fade
      className="bevel-clear flex h-16 w-9 items-start justify-center rounded-pill pt-3.5 text-navy-700 transition-colors duration-300 hover:text-navy-900"
    >
      <ChevronDown ref={chevronRef} />
    </a>
  );
}

function ChevronDown({ ref }: { ref?: Ref<SVGSVGElement> }) {
  return (
    <svg ref={ref} width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <path
        d="M2.5 5l4.5 4.5L11.5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <path
        d="M3 11L11 3M11 3H5M11 3v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Check() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden className="text-blue-700">
      <path
        d="M2.5 7.5l3 3 6-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
