import { advantages } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The split advantages panel: the ask on a pale half, the answers on a dark
 * half, both running edge to edge.
 *
 * Full-bleed is the whole point of the layout — the hard vertical seam down
 * the middle is what makes it read as two facing pages rather than as a card
 * with a coloured background. So this does NOT use `<Section>`/`shell`.
 * Instead each half pads itself out to the shell's inner edge, which keeps the
 * text aligned with every other section on the page while the colour keeps
 * running to the viewport edge.
 *
 * Below `lg` the halves stack and each keeps its own full-width colour, so the
 * seam becomes horizontal instead of disappearing.
 */

/** Half the readable column, minus its gutter. Both halves align to this. */
const HALF = "lg:w-full lg:max-w-[calc(var(--container-shell)/2-var(--gutter))]";
const PAD = "px-[var(--gutter)] py-[clamp(52px,6.5vw,112px)]";

export function Advantages() {
  return (
    <section id="advantages" data-surface="clear" className="relative isolate">
      <div className="grid lg:grid-cols-2">
        {/* The ask. Right-aligned into the seam on `lg`. */}
        <div className={`bg-blue-50 text-navy-900 lg:flex lg:justify-end ${PAD}`}>
          <Reveal className={`${HALF} lg:pe-[clamp(24px,3vw,64px)]`}>
            <h2 className="type-h2">{advantages.heading}</h2>
            <p className="type-lead measure mt-4 text-navy-700/80">
              {advantages.lead}
            </p>
            <div
              aria-hidden
              className="mt-8 h-px w-full max-w-sm bg-navy-900/12"
            />
          </Reveal>
        </div>

        {/* The answers. Left-aligned out of the seam on `lg`. */}
        <div className={`bg-navy-950 text-ink-100 ${PAD}`}>
          <div className={`${HALF} lg:ps-[clamp(24px,3vw,64px)]`}>
            <Reveal
              stagger
              // Two columns is the ceiling, not a small-screen fallback. The
              // half is width-capped at `HALF`, so a third column on an
              // ultrawide would only make each item narrower — it would not
              // use the extra space, which goes to the flat colour outside.
              className="grid gap-x-8 gap-y-8 sm:grid-cols-2"
            >
              {advantages.items.map((item) => (
                <div key={item.title}>
                  <h3 className="text-[1.0625rem] leading-snug font-semibold tracking-[-0.015em] text-blue-400">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-300">
                    {item.body}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
