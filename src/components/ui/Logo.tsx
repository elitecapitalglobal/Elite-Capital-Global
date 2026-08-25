/**
 * The brand mark: three candlesticks rising in sequence — the chart-reading
 * motion at the centre of what the site does — beside a single-line
 * "ELITE CAPITAL" wordmark, tracked wide and set in Mona Sans, the site's
 * own display face (see `layout.tsx` / `--font-sans` in `globals.css`)
 * rather than a separate logotype face.
 *
 * Every colour is a Tailwind utility bound to the same `--color-ink-*` /
 * `--color-blue-*` tokens as the rest of the site (see `globals.css`).
 *
 * Sizing is em-based end to end: the mark is `h-[1em]` and the wordmark is
 * a fractional `em` size, so callers scale the whole lockup with a single
 * `text-[Npx]` (or responsive `text-[..] sm:text-[..]`) on `className`
 * instead of juggling image height/width pairs.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[0.32em] ${className}`}>
      <LogoMark className="h-[1em] w-auto shrink-0" />
      <span className="font-[family-name:var(--font-mona)] text-[0.38em] font-medium tracking-[0.14em] whitespace-nowrap text-ink-100 uppercase">
        Elite Capital
      </span>
    </span>
  );
}

/** The mark alone, no wordmark — for favicon-scale or square placements. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 46 44" aria-hidden className={className}>
      {/* Three candles rising in sequence, hold, then reset — keyframes
          and delays live in globals.css (`.ec-candle`) so every instance
          of this mark shares one animation instead of redefining it. */}
      <g className="ec-candle">
        <rect x="10" y="13" width="2" height="22" rx="1" className="fill-ink-100" />
        <rect x="6" y="18" width="10" height="12" rx="2" className="fill-ink-100" />
      </g>
      <g className="ec-candle ec-candle-2">
        <rect x="23" y="9" width="2" height="26" rx="1" className="fill-ink-100" />
        <rect x="19" y="14" width="10" height="16" rx="2" className="fill-ink-100" />
      </g>
      <g className="ec-candle ec-candle-3">
        <rect x="36" y="5" width="2" height="25" rx="1" className="fill-blue-600" />
        <rect x="32" y="9" width="10" height="17" rx="2" className="fill-blue-600" />
      </g>
    </svg>
  );
}
