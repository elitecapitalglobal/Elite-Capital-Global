/**
 * Motion constants. Every GSAP call in this codebase reads from here — no
 * component hardcodes a duration or an ease. Mirrored in globals.css
 * (`--ease-out-expo`, `--dur-*`); change both together.
 *
 * See DESIGN.md §7.
 */

/** ease-out-expo. No bounce, no elastic. `linear` is only for the ticker. */
export const EASE = "expo.out";
export const EASE_SOFT = "power3.out";

export const DUR = {
  fast: 0.15,
  base: 0.3,
  reveal: 0.7,
  hero: 1.4,
} as const;

export const STAGGER = {
  tight: 0.06,
  cards: 0.08,
  lines: 0.09,
} as const;

/**
 * The house entrance. Written as a `from` state on purpose: the resting state
 * is what's already in the DOM, so the section is readable if JS never runs.
 * Never invert this into a `to` — that ships blank sections to crawlers and
 * to anyone whose bundle fails.
 */
export const REVEAL_FROM = {
  y: 24,
  opacity: 0,
  filter: "blur(8px)",
} as const;

/** Standard ScrollTrigger start. Fires once the section is meaningfully in view. */
export const TRIGGER_START = "top 78%";

/**
 * Guard every entrance animation with this.
 *
 * `gsap.from()` writes its start state (opacity 0) synchronously and then
 * relies on requestAnimationFrame to animate it away. rAF does not run in a
 * hidden tab — so a page opened in a background tab, prefetched, crawled, or
 * rendered by a screenshot service gets the start state written and never
 * cleared, and every guarded section ships blank.
 *
 * If the document isn't visible, skip the tween entirely. The resting state is
 * already the DOM's own, so the content simply appears — which is the correct
 * outcome for a reader who can't see the animation anyway.
 */
export function canAnimate() {
  return (
    typeof document !== "undefined" && document.visibilityState === "visible"
  );
}

/** Apple's momentum projection — where a flick is *going*, not where it stopped. */
export function project(velocity: number, decelerationRate = 0.998) {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}
