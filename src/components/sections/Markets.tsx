import { markets } from "@/content/site";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { fetchQuotes } from "@/lib/quotes";

/**
 * A slow, continuous loop of the asset classes.
 *
 * Full-bleed on purpose: the strip runs edge to edge while the heading stays
 * in the readable column, which is what makes it feel like a live tape rather
 * than a row of cards that happens to be clipped.
 *
 * One copy measures ~2160px, so three copies keep ~4300px behind the viewport
 * and the wrap stays invisible up to 4K. Read the `copies` rule in
 * Marquee.tsx before adding or removing an asset class.
 *
 * Each card also carries a handful of real, live-priced symbols (Yahoo
 * Finance, same feed as the header ticker — see `src/lib/quotes.ts`). This
 * section is server-rendered only; it refreshes on the page's normal
 * revalidation cadence rather than polling client-side like the ticker does,
 * since it's supporting context here, not the primary live tape.
 */
export async function Markets() {
  const symbols = markets.items.flatMap((item) =>
    item.symbols.map((s) => s.symbol),
  );
  const quotes = await fetchQuotes(symbols);

  return (
    <Section surface="tint" id="markets" className="section-y">
      <div className="shell">
        <Reveal>
          <SectionHead
            heading={markets.heading}
            lead={markets.lead}
            surface="tint"
          />
        </Reveal>
      </div>

      <Marquee copies={3} duration="90s" className="mt-10 md:mt-12">
        {markets.items.map((m) => (
          <div
            key={m.name}
            // Trailing padding rather than a track `gap`: a gap would also
            // land between copies and put a visible seam at the wrap.
            className="w-[clamp(248px,72vw,340px)] shrink-0 pe-4 sm:w-[clamp(280px,32vw,360px)] sm:pe-6"
          >
            <div data-tilt="5" className="bevel-clear card-glow card-3d lift-hover flex h-full flex-col rounded-panel p-6 sm:p-7">
              <h3 className="mt-3 text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.1] font-medium tracking-[-0.03em] text-navy-900">
                {m.name}
              </h3>
              <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-navy-700/80">
                {m.body}
              </p>

              <ul className="mt-4 flex flex-col gap-1.5 border-t border-navy-900/8 pt-4">
                {m.symbols.map((s) => {
                  const q = quotes[s.symbol];
                  return (
                    <li
                      key={s.symbol}
                      className="flex items-center justify-between gap-3 text-[13px]"
                    >
                      <span className="text-navy-700/70">{s.label}</span>
                      <span
                        className={`num font-semibold ${
                          q ? (q.dir === "up" ? "text-bid" : "text-ask") : "text-navy-700/40"
                        }`}
                      >
                        {q ? q.price.toFixed(s.decimals) : "—"}{" "}
                        {q && (q.dir === "up" ? "▲" : "▼")}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <span className="mt-5 w-fit rounded-pill border border-navy-900/10 bg-navy-900/4 px-3 py-1.5 text-[12.5px] font-medium text-navy-700">
                {m.count}
              </span>
            </div>
          </div>
        ))}
      </Marquee>
    </Section>
  );
}
