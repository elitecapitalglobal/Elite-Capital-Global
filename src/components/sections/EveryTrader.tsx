import Link from "next/link";
import { everyTrader } from "@/content/site";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Two doors, side by side: one for someone who has never placed a trade, one
 * for someone who already knows what they want from a broker.
 *
 * The cards are deliberately different colours rather than a matched pair.
 * A reader is only ever one of these two people, and the contrast makes the
 * choice legible at a glance instead of asking them to read both to find out
 * which one is theirs.
 */
export function EveryTrader() {
  return (
    <Section surface="tint" className="section-y">
      <div className="shell">
        <Reveal>
          <SectionHead
            heading={everyTrader.heading}
            lead={everyTrader.lead}
            surface="tint"
            align="center"
          />
        </Reveal>

        <Reveal stagger className="mt-10 grid gap-4 md:mt-12 lg:grid-cols-2">
          {everyTrader.cards.map((card) => {
            const dark = card.tone === "dark";
            return (
              <article
                key={card.title}
                data-tilt="3"
                className={`card-glow card-3d lift-hover flex flex-col rounded-panel p-7 sm:p-9 ${
                  dark
                    ? "glow-light bg-navy-950 text-ink-100"
                    : "bevel-clear text-navy-900"
                }`}
              >
                <h3 className="text-[clamp(1.5rem,2.6vw,2.125rem)] leading-[1.08] font-medium tracking-[-0.03em]">
                  {card.title}
                </h3>
                <p
                  className={`measure mt-4 text-[15px] leading-relaxed ${
                    dark ? "text-ink-300" : "text-navy-700/80"
                  }`}
                >
                  {card.body}
                </p>

                <Link
                  href={card.cta.href}
                  className={`group mt-auto inline-flex min-h-11 w-fit items-center gap-2 pt-8 text-[15px] font-semibold transition-colors ${
                    dark
                      ? "text-blue-400 hover:text-blue-200"
                      : "text-blue-600 hover:text-blue-700"
                  }`}
                >
                  {card.cta.label}
                  <span
                    aria-hidden
                    className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5"
                  >
                    <svg width="13" height="13" viewBox="0 0 14 14">
                      <path
                        d="M3 11L11 3M11 3H5M11 3v6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </article>
            );
          })}
        </Reveal>
      </div>
    </Section>
  );
}
