"use client";

import { useSessionClock } from "@/components/ui/SessionClock";
import { formatDuration } from "@/lib/sessions";
import { sessionsCopy } from "@/content/site";

/**
 * The hero kicker, made live: which sessions are open and how long the
 * current state lasts. Renders the static kicker until the first clock tick,
 * so SSR markup and first paint are identical.
 */
export function LiveSessionPill({ fallback }: { fallback: string }) {
  const { market } = useSessionClock();
  const live = market?.sessions.filter((s) => s.live) ?? [];
  const on = !!market && !market.marketClosed && live.length > 0;

  let text = fallback;
  if (market) {
    if (market.marketClosed && market.reopensAt) {
      const at = new Intl.DateTimeFormat(undefined, {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
      }).format(market.reopensAt);
      text = `${sessionsCopy.closedPill} · ${sessionsCopy.reopens} ${at}`;
    } else if (live.length) {
      const names = live.map((s) => s.def.city).join(" + ");
      text =
        market.overlapEndsIn !== null
          ? `${names} ${sessionsCopy.live.toLowerCase()} · ${sessionsCopy.overlap.toLowerCase()} ${sessionsCopy.endsIn} ${formatDuration(market.overlapEndsIn)}`
          : `${names} ${sessionsCopy.live.toLowerCase()} · ${sessionsCopy.closesIn.toLowerCase()} ${formatDuration(live[0].closesIn!)}`;
    } else {
      const next = market.sessions
        .filter((s) => s.opensIn !== null)
        .sort((a, b) => a.opensIn! - b.opensIn!)[0];
      if (next) text = `${next.def.city} ${sessionsCopy.opensIn.toLowerCase()} ${formatDuration(next.opensIn!)}`;
    }
  }

  return (
    <a
      href="#sessions"
      className="bevel-clear mb-6 inline-flex items-center gap-2.5 rounded-pill px-4 py-1.5 text-[13px] font-medium text-navy-700 transition-colors duration-300 hover:text-navy-900"
    >
      <span aria-hidden className="relative flex size-1.5">
        {on && (
          <span className="absolute inset-0 animate-ping rounded-full bg-blue-600 motion-reduce:animate-none" />
        )}
        <span className={`relative size-1.5 rounded-full ${on ? "bg-blue-600" : "bg-blue-700"}`} />
      </span>
      <span className="tabular-nums">{text}</span>
    </a>
  );
}
