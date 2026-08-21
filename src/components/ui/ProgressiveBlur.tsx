/**
 * Chrom's signature material. Not one blurred div — six stacked layers at
 * increasing blur radius, each masked to a band, so the blur *ramps* across
 * the height instead of stepping. That ramp is what reads as real depth of
 * field rather than "a card with a filter on it".
 *
 * Purely decorative: `aria-hidden`, no pointer events. Hidden under
 * prefers-reduced-transparency via the `data-progressive-blur` hook in
 * globals.css.
 */

/**
 * Ramp stops. Chrom tops out at 16px, but it applies that over the full page
 * top where nothing needs reading. Behind a floating nav a 16px cap wipes out
 * the first line of the heading underneath, so this ramp stops at 8.
 */
const LAYERS = [0.5, 1, 2, 3, 5, 8];

export function ProgressiveBlur({
  className = "",
  direction = "down",
}: {
  className?: string;
  /**
   * Which end of the band carries the heavy blur.
   *
   * - `down` — sharp at the top, blurred at the bottom. For chrome anchored
   *   to the BOTTOM of the viewport.
   * - `up` — blurred at the top, clearing downward. For chrome anchored to
   *   the TOP, which is the sticky header.
   *
   * Point this the wrong way and the effect inverts in a way that is easy to
   * misread as "the blur isn't working": content stays crisp exactly where it
   * slides behind the chrome, and the blur pools in the empty band beyond it,
   * so the glass looks like it is sitting *under* the content rather than
   * over it. Match this to where the chrome actually is.
   */
  direction?: "up" | "down";
}) {
  return (
    <div
      data-progressive-blur
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      {LAYERS.map((blur, i) => {
        // Each layer owns a band of the height. Bands overlap by one step so
        // the seams between blur radii never show as a hard line.
        const start = (i / LAYERS.length) * 100;
        const end = ((i + 2) / LAYERS.length) * 100;
        const stops =
          direction === "down"
            ? `transparent ${start}%, #000 ${Math.min(end, 100)}%`
            : `#000 ${100 - Math.min(end, 100)}%, transparent ${100 - start}%`;

        return (
          <div
            key={blur}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: `linear-gradient(to bottom, ${stops})`,
              WebkitMaskImage: `linear-gradient(to bottom, ${stops})`,
            }}
          />
        );
      })}
    </div>
  );
}
