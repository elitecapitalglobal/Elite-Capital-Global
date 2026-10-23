"use client";

import { useSessionClock } from "@/components/ui/SessionClock";
import { SESSIONS, formatDuration } from "@/lib/sessions";
import { sessionsCopy } from "@/content/site";

/**
 * The glass card that floats over the globe's lower edge: the four sessions in
 * the order the trading day runs (Sydney → New York), each with its status,
 * countdown and how far through the session we are.
 *
 * Rows are buttons so hover, keyboard focus and tap all turn the globe to that
 * city. Before the first clock tick (SSR, first paint) every row renders with
 * a dash, at its final size, so nothing shifts when the times arrive.
 */
export function SessionBoard({ className = "" }: { className?: string }) {
  const { market, focus, setFocus } = useSessionClock();

  return (
    <div
      data-tilt="4"
      className={`bevel-clear card-3d rounded-card p-4 sm:p-5 ${className}`}
      onMouseLeave={() => setFocus(null)}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="type-label text-navy-700/70">{sessionsCopy.title}</p>
        {market?.marketClosed && (
          <span className="rounded-pill bg-navy-900/6 px-2 py-0.5 text-[11px] font-medium text-navy-700">
            {sessionsCopy.weekend}
          </span>
        )}
        {!market?.marketClosed && !!market?.overlaps.length && (
          <span className="rounded-pill bg-blue-600/12 px-2 py-0.5 text-[11px] font-medium text-blue-700">
            {sessionsCopy.overlap}
          </span>
        )}
      </div>

      <ul className="mt-3 grid grid-cols-2 gap-1.5 sm:gap-2 lg:grid-cols-1 lg:gap-0.5">
        {SESSIONS.map((def) => {
          const s = market?.sessions.find((x) => x.def.id === def.id);
          const live = !!s?.live;
          const active = focus === def.id;
          const when = !s
            ? "—"
            : live
              ? `${sessionsCopy.closesIn} ${formatDuration(s.closesIn!)}`
              : s.opensIn !== null
                ? `${sessionsCopy.opensIn} ${formatDuration(s.opensIn)}`
                : "—";

          return (
            <li key={def.id}>
              <button
                type="button"
                onMouseEnter={() => setFocus(def.id)}
                onFocus={() => setFocus(def.id)}
                onBlur={() => setFocus(null)}
                onClick={() => setFocus(active ? null : def.id)}
                aria-pressed={active}
                className={`w-full rounded-inner px-3 py-2.5 text-left lg:py-2 transition-colors duration-300 ${
                  active ? "bg-blue-600/10" : "hover:bg-navy-900/4"
                }`}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-[14px] font-medium text-navy-900">
                    <span
                      aria-hidden
                      className={`relative flex size-2 rounded-full ${live ? "bg-blue-600" : "bg-ink-500/60"}`}
                    >
                      {live && (
                        <span className="absolute inset-0 animate-ping rounded-full bg-blue-600/60 motion-reduce:animate-none" />
                      )}
                    </span>
                    {def.city}
                  </span>
                  <span
                    className={`type-label text-[10px] ${live ? "text-blue-700" : "text-ink-500"}`}
                  >
                    {live ? sessionsCopy.live : sessionsCopy.closed}
                  </span>
                </span>
                <span className="num mt-1 block text-[12px] text-navy-700/70 lg:mt-0.5">{when}</span>
                <span
                  aria-hidden
                  className={`mt-2 block h-[3px] overflow-hidden rounded-full bg-navy-900/6 ${live ? "" : "lg:hidden"}`}
                >
                  <span
                    className="block h-full rounded-full bg-blue-600 transition-[width] duration-1000 ease-linear"
                    style={{ width: `${Math.round((s?.progress ?? 0) * 1000) / 10}%` }}
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="num mt-3 border-t border-navy-900/8 pt-3 text-[12px] text-navy-700/60">
        {sessionsCopy.yourTime}{" "}
        {market ? <LocalTime now={market.now} /> : "—"}
      </p>
    </div>
  );
}

const timeFmt = () =>
  new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "shortOffset",
  });

function LocalTime({ now }: { now: number }) {
  return <span className="text-navy-900">{timeFmt().format(now)}</span>;
}
