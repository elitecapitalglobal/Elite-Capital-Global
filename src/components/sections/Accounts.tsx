import { accounts, site } from "@/content/site";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * Chrom's pricing block, 1:1 — three tiers, the middle one recommended and
 * lifted. Mapped onto the existing site's Standard / Pro / ECN accounts.
 *
 * The old version was a comparison table with ✓ and ✕ glyphs. Three cards
 * scan faster for the switcher, who is here for exactly one number.
 */
export function Accounts() {
  return (
    <Section surface="white" id="accounts" className="section-y">
      <div className="shell">
        <Reveal>
          <SectionHead
            heading={accounts.heading}
            lead={accounts.lead}
            surface="white"
            align="center"
          />
        </Reveal>

        <Reveal stagger className="mt-10 grid items-start md:mt-12 gap-5 lg:grid-cols-3">
          {accounts.tiers.map((tier) => (
            <article
              key={tier.name}
              data-tilt="3"
              className={`card-glow card-3d lift-hover relative flex flex-col rounded-panel p-6 sm:p-7 ${
                tier.recommended
                  ? "glow-light bg-navy-950 text-ink-100 shadow-[0_30px_70px_-24px_rgb(10_15_31/0.45)] lg:-mt-4 lg:pb-12"
                  : "bevel-clear"
              }`}
            >
              {tier.recommended && (
                <span className="absolute -top-3 left-8 rounded-pill bg-blue-600 px-3 py-1 text-[11.5px] font-bold text-white">
                  Recommended
                </span>
              )}

              <h3
                className={`type-h3 ${tier.recommended ? "text-ink-100" : "text-navy-900"}`}
              >
                {tier.name}
              </h3>
              <p
                // The height floor only applies once the tiers sit side by
                // side and their divider rules need to line up. Stacked on
                // mobile it would just be dead space.
                className={`mt-2.5 text-[14.5px] leading-relaxed lg:min-h-[4.5rem] ${
                  tier.recommended ? "text-ink-300" : "text-navy-700/80"
                }`}
              >
                {tier.blurb}
              </p>

              <div
                className={`mt-6 flex items-baseline gap-1 border-t pt-6 ${
                  tier.recommended ? "border-ink-100/10" : "border-navy-900/8"
                }`}
              >
                <span
                  className={`num text-lg ${tier.recommended ? "text-ink-300" : "text-navy-700/60"}`}
                >
                  $
                </span>
                <span
                  className={`num-display text-[clamp(2.5rem,4vw,3.25rem)] leading-none font-medium ${
                    tier.recommended ? "text-blue-400" : "text-navy-900"
                  }`}
                >
                  {tier.deposit}
                </span>
                <span
                  className={`ml-1.5 text-sm ${tier.recommended ? "text-ink-500" : "text-navy-700/60"}`}
                >
                  min. deposit
                </span>
              </div>

              {/* Two tiles side by side need ~170px each for the word
                  "Commission" to fit. That fails twice: on phones under
                  380px, and again in the 1024–1280 band where three tiers
                  first sit in a row and each card is at its narrowest. Stack
                  in both, pair in between and above. */}
              <dl className="mt-5 grid grid-cols-1 gap-2.5 min-[380px]:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <Stat
                  label="Spreads from"
                  value={`${tier.spread} pips`}
                  dark={tier.recommended}
                />
                <Stat
                  label="Commission"
                  value={tier.commission}
                  dark={tier.recommended}
                />
              </dl>

              <ul className="mt-6 flex-1 space-y-2.5">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-start gap-2.5 text-[14.5px] ${
                      tier.recommended ? "text-ink-300" : "text-navy-700/85"
                    }`}
                  >
                    <Check recommended={tier.recommended} />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                href={site.cta.primary.href}
                variant={tier.recommended ? "primary" : "ghostDark"}
                className="mt-7 w-full"
              >
                {tier.cta}
              </Button>
            </article>
          ))}
        </Reveal>

        <p className="mt-18 text-center text-[13px] text-navy-700/65">
          Leverage is subject to terms and regulatory guidelines and varies by
          jurisdiction.
        </p>
      </div>
    </Section>
  );
}

function Stat({
  label,
  value,
  dark,
}: {
  label: string;
  value: string;
  dark: boolean;
}) {
  return (
    <div
      className={`rounded-inner px-3.5 py-3 ${
        dark ? "bg-ink-100/6" : "bg-navy-900/4"
      }`}
    >
      <dt
        className={`type-label ${dark ? "text-ink-500" : "text-navy-700/55"}`}
      >
        {label}
      </dt>
      <dd
        className={`num mt-1 text-[15px] font-medium ${
          dark ? "text-ink-100" : "text-navy-900"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

function Check({ recommended }: { recommended: boolean }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 14 14"
      aria-hidden
      className={`mt-[5px] shrink-0 ${recommended ? "text-blue-400" : "text-blue-700"}`}
    >
      <path
        d="M2.5 7.5l3 3 6-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
