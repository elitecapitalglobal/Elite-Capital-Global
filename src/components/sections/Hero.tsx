"use client";

import { useRef, type Ref } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { hero, site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { EASE, DUR, STAGGER, canAnimate } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

/**
 * Vertex Pro's hero, pill kicker, two-line display headline, one primary CTA,
 * trust row, then a small, permanent scroll-down indicator — the pill stays
 * put; only the chevron inside it bobs.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!canAnimate()) return;

        // One orchestrated page-load. Aurora, then headline lines, then the
        // rest of the hero content fades up. ~1s total, runs once.
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
      className="aurora-light relative isolate overflow-hidden pt-[clamp(56px,8vw,104px)] text-navy-900"
    >
      <div data-hero-aurora aria-hidden className="absolute inset-0 -z-10">
        {/* Faint vertical rule field — Vertex's hero has one; it gives the
            gradient something to sit against so it doesn't read as a blur. */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0 63px, rgb(0 0 0 / 0.35) 63px 64px)",
            maskImage:
              "radial-gradient(70% 55% at 50% 30%, #000, transparent 78%)",
          }}
        />
      </div>

      <div className="shell">
        <div className="relative z-0 mx-auto max-w-5xl pb-[clamp(64px,11vw,132px)] text-center">
          <p
            data-hero-fade
            className="bevel-clear mx-auto mb-6 inline-flex items-center gap-2.5 rounded-pill px-4 py-1.5 text-[13px] font-medium text-navy-700"
          >
            <span className="size-1.5 rounded-full bg-blue-700" aria-hidden />
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
            className="type-lead mx-auto mt-5 max-w-[54ch] text-navy-700/80"
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
            <Button href={site.cta.secondary.href} variant="ghostDark">
              {site.cta.secondary.label}
            </Button>
          </div>

          {/* Chrom's trust row. Verifiable facts only — no install counts or
              star ratings we can't source. */}
          <ul
            data-hero-fade
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-navy-700/70"
          >
            {hero.trustRow.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check />
                {item}
              </li>
            ))}
          </ul>

          <div
            className="flex justify-center"
            style={{ transform: "translateY(60px)" }}
          >
            <ScrollIndicator />
          </div>
        </div>
      </div>
    </section>
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
