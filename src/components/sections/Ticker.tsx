import { ticker } from "@/content/site";
import { Marquee } from "@/components/ui/Marquee";

/**
 * The market tape. Perpetual motion earns its place here: a tape that isn't
 * moving reads as stale data. Everything else on the page animates once.
 *
 * One copy of this list measures ~1440px, so four copies keep ~4300px of
 * content behind the viewport — enough that the wrap is invisible up to 4K.
 * See the `copies` rule in Marquee.tsx before changing the item list.
 */
export function Ticker() {
  return (
    <div
      data-surface="deep"
      // overflow-hidden is load-bearing: the track is several times the
      // viewport width, and without clipping here it drags the whole page
      // into horizontal scroll.
      className="relative overflow-hidden border-y border-ink-100/8 bg-navy-900"
    >
      <Marquee copies={4} duration="60s">
        {ticker.map((row) => (
          <span
            key={row.pair}
            className="flex shrink-0 items-center gap-2 py-3 pe-12 text-[13px] font-semibold text-ink-300"
          >
            {row.pair}
            <span
              className={`num ${row.dir === "up" ? "text-bid" : "text-ask"}`}
            >
              {row.price} {row.dir === "up" ? "▲" : "▼"}
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
