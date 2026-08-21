import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * Feedback lands on pointer-down (`active:`), not on release — waiting for the
 * click event to show state is what makes a button feel dead. DESIGN.md §5.
 */
/**
 * Note: `base` sets `inline-flex`. Tailwind orders display utilities by
 * property, not by class order, so passing `hidden` via `className` will NOT
 * override it — wrap the button in a container and hide that instead.
 *
 * The same trap applies to `px-8` / `py-[0.9rem]` below: a bare `px-3` passed
 * through `className` loses to the base and the button keeps its full padding,
 * which fails silently and only shows up as a too-wide button in a tight row.
 * Override padding with the important modifier (`!px-3`), as SiteHeader does.
 */
const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-medium " +
  "text-sm tracking-[-0.01em] whitespace-nowrap " +
  "min-h-11 px-8 py-[0.9rem] " +
  "transition-[transform,background,border-color,box-shadow] duration-200 " +
  "ease-[var(--ease-out-expo)] " +
  // Press feedback lands on pointer-DOWN, and it is the one thing here that is
  // not decoration: the delay between a click and any visible response is what
  // makes an interface feel dead, and waiting for the click event to fire is
  // already too late.
  "active:scale-[0.97] active:duration-100";

const variants = {
  /**
   * The load-bearing accent. Vertex Pro's button, 1:1 — a flat blue-600 pill
   * with white text, not a gradient.
   *
   * It is deliberately NOT a light-to-dark gradient: white on blue-600 is
   * 5.2:1, but any stop lighter than that drops the label below 4.5:1, so a
   * gradient fill makes the top half of every button fail contrast while
   * looking fine in a screenshot.
   *
   * The hover shadow grows and warms rather than switching on a glow: a
   * saturated `box-shadow` with a large spread is the banned neon look
   * (DESIGN.md §2), a deeper cast shadow is just the button lifting.
   */
  primary:
    "shine bg-blue-600 text-white font-semibold " +
    "shadow-[0_1px_0_rgb(255_255_255/0.28)_inset,0_8px_20px_-8px_rgb(37_99_235/0.65)] " +
    "hover:-translate-y-0.5 hover:bg-blue-700 " +
    "hover:shadow-[0_1px_0_rgb(255_255_255/0.32)_inset,0_14px_30px_-10px_rgb(37_99_235/0.75)]",

  /** On `deep` surfaces. */
  ghost:
    "border border-ink-100/22 text-ink-100 " +
    "hover:-translate-y-0.5 hover:border-blue-400 hover:bg-ink-100/6",

  /** On `clear` surfaces. */
  ghostDark:
    "border border-navy-900/18 text-navy-900 " +
    "hover:-translate-y-0.5 hover:border-blue-600 hover:bg-blue-600/6",

  /** Glass pill — nav and floating chrome. */
  glass:
    "bevel-deep text-ink-100 hover:-translate-y-0.5 hover:border-blue-400/40",
} as const;

type Variant = keyof typeof variants;

export function Button({
  variant = "primary",
  className = "",
  href,
  ...props
}: {
  variant?: Variant;
  className?: string;
  href?: string;
} & Omit<ComponentProps<"button">, "ref">) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {props.children}
      </Link>
    );
  }

  return <button className={cls} {...props} />;
}
