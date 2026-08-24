/**
 * The brand mark: a shield split black-and-emerald — trust/security for a
 * regulated broker, in the theme's own two colours — plus a two-line
 * wordmark set in Fraunces, a display serif distinct from Mona Sans, the
 * way a logotype almost always carries its own face.
 *
 * Unlike the old flat-gold PNG this replaces, every colour here is a
 * Tailwind utility bound to the same `--color-navy-*` / `--color-blue-*`
 * tokens as the rest of the site (see `globals.css`).
 *
 * Sizing is em-based end to end: the mark is `h-[1em]` and the wordmark
 * lines are fractional `em` sizes, so callers scale the whole lockup with a
 * single `text-[Npx]` (or responsive `text-[..] sm:text-[..]`) on `className`
 * instead of juggling image height/width pairs.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[0.28em] ${className}`}>
      <LogoMark className="h-[1em] w-auto shrink-0" />
      <span className="flex flex-col justify-center leading-none">
        <span className="font-[family-name:var(--font-fraunces)] text-[0.56em] font-semibold tracking-[0.01em] text-ink-100">
          Elite
        </span>
        <span className="font-[family-name:var(--font-fraunces)] text-[0.24em] font-medium tracking-[0.34em] text-blue-400 uppercase">
          Capital
        </span>
      </span>
    </span>
  );
}

/** The mark alone, no wordmark — for favicon-scale or square placements. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <defs>
        <clipPath id="ecg-shield-clip">
          <path d="M24 2 41 8.5V21C41 32.5 33.5 41.5 24 46 14.5 41.5 7 32.5 7 21V8.5Z" />
        </clipPath>
      </defs>

      {/* Split fill, clipped to one shield silhouette — obsidian on the
          left, the accent emerald on the right. Security in the shape,
          the theme's two colours doing the rest. */}
      <g clipPath="url(#ecg-shield-clip)">
        <rect x="0" y="0" width="24" height="48" className="fill-navy-950" />
        <rect x="24" y="0" width="24" height="48" className="fill-blue-600" />
      </g>

      {/* A thin lit edge so the shield reads as one object, not two
          rectangles behind a mask. */}
      <path
        d="M24 2 41 8.5V21C41 32.5 33.5 41.5 24 46 14.5 41.5 7 32.5 7 21V8.5Z"
        fill="none"
        className="stroke-blue-400/65"
        strokeWidth="1.3"
      />
      <path
        d="M24 2V46"
        className="stroke-navy-950/35"
        strokeWidth="1"
      />
    </svg>
  );
}
