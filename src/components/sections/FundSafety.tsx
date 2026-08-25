import { fundSafety } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The trust banner: one wide blue panel, centred copy, an oversized shield
 * bleeding off the right edge.
 *
 * This is the only place on the page where a single panel is allowed to carry
 * the full brand blue at full strength. It earns it by saying the one thing a
 * reader most needs to believe before depositing — so it gets to interrupt the
 * page rather than sit in the flow with everything else.
 *
 * The shield is drawn, not an image: it has to scale from 320px to 3440px
 * without a second asset, and at 8% opacity a PNG's edges would band.
 */
export function FundSafety() {
  return (
    <section
      id="fund-safety"
      // `clear`, not `deep` — the blue is the panel, not the section. Painting
      // the whole band indigo is what turned the page into a wall of navy; the
      // banner reads as an interruption precisely because the page around it
      // stays light.
      data-surface="clear"
      className="bg-ink-100 px-[var(--gutter)] py-[clamp(40px,5vw,80px)]"
    >
      <Reveal className="relative isolate mx-auto max-w-[var(--container-shell)] overflow-hidden rounded-panel">
        {/* The panel's own light. Brightest at the lower left, so the shield on
            the right sits in the darker half and stays legible as a silhouette
            rather than competing with the headline. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(85% 120% at 8% 105%, color-mix(in oklab, var(--color-blue-600) 38%, transparent), transparent 65%), radial-gradient(80% 120% at 12% 100%, color-mix(in oklab, var(--color-blue-700) 16%, transparent), transparent 62%), linear-gradient(160deg, color-mix(in oklab, var(--color-navy-950) 97%, var(--color-blue-700)) 0%, var(--color-navy-950) 58%, var(--color-navy-900) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-panel border border-ink-100/12"
        />

        <Shield />

        <div className="relative px-6 py-[clamp(44px,6vw,88px)] text-center sm:px-10">
          <h2 className="type-h2 mx-auto max-w-[18ch] whitespace-pre-line">
            {fundSafety.heading}
          </h2>
          <p className="type-lead mx-auto mt-5 max-w-[58ch] text-ink-300">
            {fundSafety.lead}
          </p>

          <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-2.5">
            {fundSafety.points.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 rounded-pill border border-ink-100/18 bg-ink-100/8 px-3.5 py-1.5 text-[13px] font-medium"
              >
                <Check />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

function Shield() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 220"
      className="pointer-events-none absolute -right-8 -bottom-10 -z-10 h-[130%] w-auto opacity-[0.13] sm:-right-4 sm:opacity-[0.16]"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M100 8L14 44v72c0 48 36 82 86 96 50-14 86-48 86-96V44L100 8z" />
      <path d="M100 34L38 60v56c0 36 26 62 62 73 36-11 62-37 62-73V60l-62-26z" />
      <path d="M68 112l22 22 44-52" strokeWidth="9" />
    </svg>
  );
}

function Check() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 14 14"
      aria-hidden
      className="shrink-0 text-blue-400"
    >
      <path
        d="M2.5 7.5l3 3 6-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
