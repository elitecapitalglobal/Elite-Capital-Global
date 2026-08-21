"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { hero, heroCards, site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { EASE, DUR, STAGGER, canAnimate } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Vertex Pro's hero, 1:1 in structure: pill kicker, two-line display headline,
 * one primary CTA, trust row, then a cluster of three overlapping cards that
 * float across the fold. Chrom supplies the material they're made of.
 *
 * The cards overlap each other but never the headline — the headline's zone is
 * clear at every breakpoint, and below `lg` the cluster un-overlaps into a
 * vertical stack.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!canAnimate()) return;

        // One orchestrated page-load. Aurora, then headline lines, then the
        // cards settle. ~1.4s total, runs once.
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
            "[data-hero-card]",
            {
              y: 56,
              opacity: 0,
              scale: 0.96,
              filter: "blur(14px)",
              duration: 0.9,
              stagger: STAGGER.cards,
            },
            0.55,
          );

        // Depth on scroll: the cards drift at different rates so the cluster
        // reads as three planes, not one flat image.
        gsap.utils.toArray<HTMLElement>("[data-hero-card]").forEach((card) => {
          const depth = Number(card.dataset.depth ?? 1);
          gsap.to(card, {
            yPercent: -14 * depth,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      data-surface="deep"
      className="aurora relative isolate overflow-hidden pt-[clamp(56px,8vw,104px)] pb-[clamp(56px,7vw,104px)]"
    >
      <div data-hero-aurora aria-hidden className="absolute inset-0 -z-10">
        {/* Faint vertical rule field — Vertex's hero has one; it gives the
            gradient something to sit against so it doesn't read as a blur. */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0 63px, rgb(255 255 255 / 0.5) 63px 64px)",
            maskImage:
              "radial-gradient(70% 55% at 50% 30%, #000, transparent 78%)",
          }}
        />
      </div>

      <div className="shell">
        <div className="mx-auto max-w-5xl text-center">
          <p
            data-hero-fade
            className="bevel-deep mx-auto mb-6 inline-flex items-center gap-2.5 rounded-pill px-4 py-1.5 text-[13px] font-medium text-ink-300"
          >
            <span className="size-1.5 rounded-full bg-blue-400" aria-hidden />
            {hero.kicker}
          </p>

          <h1 className="type-display">
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
            className="type-lead mx-auto mt-5 max-w-[54ch] text-ink-300"
          >
            {hero.lead}
          </p>

          <div
            data-hero-fade
            className="mt-7 flex flex-wrap items-center justify-center gap-3"
          >
            <Button href={site.cta.primary.href}>
              {site.cta.primary.label}
              <Arrow />
            </Button>
            <Button href={site.cta.secondary.href} variant="ghost">
              {site.cta.secondary.label}
            </Button>
          </div>

          {/* Chrom's trust row. Verifiable facts only — no install counts or
              star ratings we can't source. */}
          <ul
            data-hero-fade
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-ink-500"
          >
            {hero.trustRow.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* The cluster. Three columns at `lg`, each at a different vertical
            offset so they read as separate planes; stacked below it.
            Deliberately NOT overlapping — panels that overlap at these widths
            put one card's chrome across another card's text. */}
        <div className="relative mt-[clamp(40px,5vw,72px)] grid gap-4 lg:grid-cols-12 lg:items-start lg:gap-5">
          <WatchlistCard />
          <SpreadCard />
          <AccessCard />
        </div>
      </div>

    </section>
  );
}

/* -------------------------------------------------------------------------- */

function WatchlistCard() {
  return (
    <div
      data-hero-card
      data-depth="1.4"
      data-tilt="5"
      className="bevel-deep card-glow glow-light rounded-panel p-5 lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:z-20 lg:mt-8"
    >
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="type-h3">{heroCards.watchlist.title}</h2>
        {/* Not decoration. Remove only when a real feed is wired. */}
        <span className="type-label text-ink-500">
          {heroCards.watchlist.note}
        </span>
      </div>
      <ul>
        {heroCards.watchlist.rows.map((row) => (
          <li
            key={row.pair}
            className="flex items-center justify-between border-b border-ink-100/8 py-2.5 last:border-0"
          >
            <span>
              <span className="block text-sm font-semibold">{row.pair}</span>
              <span className="block text-[11.5px] text-ink-500">
                {row.cls}
              </span>
            </span>
            <span className="text-right">
              <span className="num block text-sm font-medium">{row.price}</span>
              <span
                className={`num block text-[11.5px] ${
                  row.dir === "up" ? "text-bid" : "text-ask"
                }`}
              >
                {/* Glyph + sign, so state is never colour-only. */}
                {row.dir === "up" ? "▲" : "▼"} {row.change}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SpreadCard() {
  return (
    <div
      data-hero-card
      data-depth="0.6"
      data-tilt="5"
      // Raised above its neighbours — the front-centre plane of the cluster.
      // Columns 5-8: the three cards tile 4/4/4 with no shared column, so no
      // card's chrome ever lands on another card's text.
      className="bevel-deep card-glow glow-light rounded-panel p-6 text-center lg:col-span-4 lg:col-start-5 lg:row-start-1 lg:z-30 lg:-mt-4"
    >
      <p className="type-label text-ink-500">{heroCards.spread.label}</p>
      <p className="num-display mt-3 text-[clamp(3rem,5.5vw,4.25rem)] leading-none font-medium text-blue-400">
        {heroCards.spread.value}
        <span className="ml-2 text-[0.32em] tracking-normal text-ink-300">
          {heroCards.spread.unit}
        </span>
      </p>
      <p className="mt-4 text-sm text-ink-300">{heroCards.spread.caption}</p>
    </div>
  );
}

function AccessCard() {
  return (
    <div
      data-hero-card
      data-depth="1.15"
      data-tilt="5"
      className="bevel-deep card-glow glow-light rounded-panel p-5 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:z-10 lg:mt-12"
    >
      <p className="type-label text-ink-500">{heroCards.access.label}</p>
      <h2 className="type-h3 mt-2">{heroCards.access.title}</h2>
      <p className="mt-2 text-sm text-ink-300">{heroCards.access.caption}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {["Forex", "Metals", "Indices", "Shares", "Commodities", "Crypto"].map(
          (m) => (
            <span
              key={m}
              className="rounded-pill border border-blue-600/22 bg-blue-600/8 px-2.5 py-1 text-[11.5px] text-blue-200"
            >
              {m}
            </span>
          ),
        )}
      </div>
    </div>
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
    <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden className="text-blue-400">
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
