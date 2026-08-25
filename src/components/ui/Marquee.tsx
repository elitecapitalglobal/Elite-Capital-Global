import type { ReactNode } from "react";

/**
 * A seamless, continuously looping horizontal track.
 *
 * ## Getting `copies` right — this is the whole reason this component exists
 *
 * The track holds N identical copies of `children` and slides left by exactly
 * one copy (`-100% / N`) before snapping back. The snap is invisible only
 * while copies still cover the viewport at the moment it happens.
 *
 * At the end of a cycle the first copy has left the screen, so what remains to
 * fill the viewport is `(N - 1) x copyWidth`. If that is narrower than the
 * viewport, the tail of the track drifts into view and the reader watches a
 * blank gap slide past before the loop restarts.
 *
 *     (copies - 1) x copyWidth  >=  widest viewport you support
 *
 * Two copies is the reflex answer and it is wrong on anything wide: a 2160px
 * copy on a 3440px ultrawide leaves a 1265px hole every lap. Measure one copy
 * in the browser, then pick `copies` from the rule above — do not guess.
 *
 * Items inside `children` must carry their own trailing space via padding
 * (`pe-*`), never a `gap` on the track. A gap sits between copies too, which
 * puts a visible seam at the wrap point.
 */
export function Marquee({
  copies = 3,
  duration = "40s",
  className = "",
  children,
}: {
  /** See the rule above. Higher is safer on wide displays; each copy is real DOM. */
  copies?: number;
  /** Slower reads as ambient; faster reads as urgent. */
  duration?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      data-marquee-track
      className={`marquee-hoverable ${className}`}
    >
      <div
        className="marquee"
        style={
          {
            "--marquee-copies": copies,
            "--marquee-duration": duration,
          } as React.CSSProperties
        }
      >
        {Array.from({ length: copies }, (_, i) => (
          <div
            key={i}
            className="flex shrink-0"
            // Only the first copy is real content; the rest are visual
            // padding, so screen readers announce the list once.
            aria-hidden={i > 0 || undefined}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
