import type { ReactNode } from "react";
import { site } from "@/content/site";

/**
 * The stage for sign-up and log-in.
 *
 * The brief was "the most premium thing you'll have" — so the page is
 * restraint, not decoration: obsidian, one slow light source, a film of
 * grain, a serif headline, generous space, and fine hairlines doing the work
 * borders usually do. The copy stays factual; the feeling comes from the
 * craft, not from adjectives.
 *
 * Left: the editorial column (headline, a few facts). Right: the form, set in
 * a framed panel with corner marks. On phones the form comes first.
 */
export function AuthShell({
  eyebrow,
  title,
  lead,
  points,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  points: { k: string; v: string }[];
  children: ReactNode;
}) {
  return (
    <main data-surface="deep" className="ec-auth relative isolate overflow-hidden bg-navy-950 text-ink-100 [color-scheme:dark]">
      {/* Light. Anchored low and off to one side, drifting very slowly. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="ec-drift absolute -bottom-[35%] -left-[15%] h-[85%] w-[75%] rounded-full opacity-90 blur-3xl"
          style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--color-blue-600) 42%, transparent), transparent)" }}
        />
        <div
          className="absolute -top-[30%] right-[-20%] h-[70%] w-[60%] rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--color-navy-600) 55%, transparent), transparent)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0 calc(100% - 1px), rgb(255 255 255 / 0.035) 0) 0 0 / 120px 100%",
            maskImage: "linear-gradient(180deg, transparent, black 30%, black 70%, transparent)",
          }}
        />
        <div className="ec-grain absolute inset-0" />
      </div>

      <div className="shell grid min-h-[calc(100dvh-120px)] items-center gap-12 py-[clamp(40px,7vw,104px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-20">
        {/* Editorial column */}
        <div className="ec-rise order-2 lg:order-1">
          <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.28em] text-blue-400 uppercase">
            <span aria-hidden className="h-px w-10 bg-blue-400/60" />
            {eyebrow}
          </p>
          <h1 className="type-serif mt-6 text-[clamp(2.75rem,5.4vw,4.75rem)] leading-[1.02] text-ink-100">
            {title}
          </h1>
          <p className="mt-6 max-w-[44ch] text-[clamp(1rem,1.25vw,1.125rem)] leading-relaxed text-ink-300/85">{lead}</p>

          <dl className="mt-12 grid max-w-xl border-t border-ink-100/10">
            {points.map((p) => (
              <div key={p.k} className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-6 border-b border-ink-100/10 py-4">
                <dt className="text-[11px] tracking-[0.18em] text-ink-300/60 uppercase">{p.k}</dt>
                <dd className="text-[15px] text-ink-100">{p.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Form panel */}
        <section className="ec-rise relative order-1 [animation-delay:120ms] lg:order-2">
          <div className="relative rounded-[28px] border border-ink-100/10 bg-[linear-gradient(180deg,rgb(255_255_255/0.055),rgb(255_255_255/0.015))] p-7 shadow-[0_1px_0_rgb(255_255_255/0.08)_inset,0_40px_120px_-40px_rgb(0_0_0/0.9)] backdrop-blur-xl sm:p-11">
            <Corners />
            {children}
          </div>
        </section>
      </div>

      <p className="shell pb-10 text-[12px] leading-relaxed text-ink-300/50">
        <span className="text-ink-300/80">Risk warning.</span> {site.riskDisclaimer}
      </p>
    </main>
  );
}

/** Four hairline corner marks, like the registration marks on a print proof. */
function Corners() {
  const c = "pointer-events-none absolute size-4 border-blue-400/50";
  return (
    <>
      <span aria-hidden className={`${c} -top-px -left-px rounded-tl-[28px] border-t border-l`} />
      <span aria-hidden className={`${c} -top-px -right-px rounded-tr-[28px] border-t border-r`} />
      <span aria-hidden className={`${c} -bottom-px -left-px rounded-bl-[28px] border-b border-l`} />
      <span aria-hidden className={`${c} -right-px -bottom-px rounded-br-[28px] border-r border-b`} />
    </>
  );
}
