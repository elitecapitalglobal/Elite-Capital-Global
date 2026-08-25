import type { ReactNode } from "react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";

export type TierCardProps = {
  name: string;
  blurb: string;
  deposit: string;
  spread: string;
  commission: string;
  features: readonly string[];
  cta: string;
  /** Dark, lifted treatment — reserved for the Standard card. */
  recommended?: boolean;
  /** A control rendered next to the name — the Dollar/Cent switch on Standard. */
  toggle?: ReactNode;
};

/**
 * One pricing card. Shared by the plain ECN/Pro tiers (`Accounts.tsx`, server
 *-rendered) and `StandardTierCard` (client, owns the Dollar/Cent toggle) —
 * the card itself has no state of its own, it just renders whatever numbers
 * it's handed.
 */
export function TierCard({
  name,
  blurb,
  deposit,
  spread,
  commission,
  features,
  cta,
  recommended = false,
  toggle,
}: TierCardProps) {
  return (
    <article
      data-tilt="3"
      className={`card-glow card-3d lift-hover relative flex flex-col rounded-panel p-6 sm:p-7 ${
        recommended
          ? "glow-light bg-navy-950 text-ink-100 shadow-[0_30px_70px_-24px_rgb(10_15_31/0.45)] lg:-mt-4 lg:pb-12"
          : "bevel-clear"
      }`}
    >
      {recommended && (
        <span className="absolute -top-3 left-8 rounded-pill bg-blue-600 px-3 py-1 text-[11.5px] font-bold text-white">
          Recommended
        </span>
      )}

      <div className="flex items-center justify-between gap-3">
        <h3
          className={`type-h3 ${recommended ? "text-ink-100" : "text-navy-900"}`}
        >
          {name}
        </h3>
        {toggle}
      </div>

      <p
        // The height floor only applies once the tiers sit side by side and
        // their divider rules need to line up. Stacked on mobile it would
        // just be dead space.
        className={`mt-2.5 text-[14.5px] leading-relaxed lg:min-h-[4.5rem] ${
          recommended ? "text-ink-300" : "text-navy-700/80"
        }`}
      >
        {blurb}
      </p>

      <div
        className={`mt-6 flex items-baseline gap-1 border-t pt-6 ${
          recommended ? "border-ink-100/10" : "border-navy-900/8"
        }`}
      >
        <span className={`num text-lg ${recommended ? "text-ink-300" : "text-navy-700/60"}`}>
          $
        </span>
        <span
          className={`num-display text-[clamp(2.5rem,4vw,3.25rem)] leading-none font-medium ${
            recommended ? "text-blue-400" : "text-navy-900"
          }`}
        >
          {deposit}
        </span>
        <span className={`ml-1.5 text-sm ${recommended ? "text-ink-500" : "text-navy-700/60"}`}>
          min. deposit
        </span>
      </div>

      {/* Two tiles side by side need ~170px each for the word "Commission"
          to fit. That fails twice: on phones under 380px, and again in the
          1024–1280 band where the tiers first sit in a row and each card is
          at its narrowest. Stack in both, pair in between and above. */}
      <dl className="mt-5 grid grid-cols-1 gap-2.5 min-[380px]:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <Stat label="Spreads from" value={`${spread} pips`} dark={recommended} />
        <Stat label="Commission" value={commission} dark={recommended} />
      </dl>

      <ul className="mt-6 flex-1 space-y-2.5">
        {features.map((f) => (
          <li
            key={f}
            className={`flex items-start gap-2.5 text-[14.5px] ${
              recommended ? "text-ink-300" : "text-navy-700/85"
            }`}
          >
            <Check recommended={recommended} />
            {f}
          </li>
        ))}
      </ul>

      <Button
        href={site.cta.primary.href}
        variant={recommended ? "primary" : "ghostDark"}
        className="mt-7 w-full"
      >
        {cta}
      </Button>
    </article>
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
    <div className={`rounded-inner px-3.5 py-3 ${dark ? "bg-ink-100/6" : "bg-navy-900/4"}`}>
      <dt className={`type-label ${dark ? "text-ink-500" : "text-navy-700/55"}`}>{label}</dt>
      <dd className={`num mt-1 text-[15px] font-medium ${dark ? "text-ink-100" : "text-navy-900"}`}>
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
