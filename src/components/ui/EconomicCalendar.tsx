"use client";

import { useEffect, useMemo, useState } from "react";
import type { CalendarEvent } from "@/lib/calendar";
import { formatDuration } from "@/lib/sessions";
import { calendar as copy } from "@/content/site";

/**
 * The week's medium- and high-impact releases, drawn in the house style
 * rather than embedded — so it sits on the page like every other panel.
 *
 * Events arrive from the server (see `lib/calendar.ts`); everything that
 * depends on the reader's clock and zone — day grouping, local times, which
 * release is next — waits for the first client tick, the same rule the hero
 * session clock follows, so SSR and first paint never disagree.
 */
export function EconomicCalendar({ events }: { events: CalendarEvent[] }) {
  const [now, setNow] = useState<number | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [highOnly, setHighOnly] = useState(false);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  // Formatters only need building once, when the client's zone is known.
  const ready = now !== null;
  const fmt = useMemo(
    () =>
      !ready
        ? null
        : {
            key: new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" }),
            tab: new Intl.DateTimeFormat(undefined, { weekday: "short", day: "numeric" }),
            time: new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }),
            zone: new Intl.DateTimeFormat(undefined, { timeZoneName: "shortOffset" }),
          },
    [ready],
  );

  const days = useMemo(() => {
    if (!fmt) return [];
    const map = new Map<string, { key: string; label: string; first: number }>();
    for (const e of events) {
      const key = fmt.key.format(e.time);
      if (!map.has(key)) map.set(key, { key, label: fmt.tab.format(e.time), first: e.time });
    }
    return [...map.values()];
  }, [events, fmt]);

  const today = fmt && now !== null ? fmt.key.format(now) : null;
  const nextEvent = now === null ? undefined : events.find((e) => e.time > now);

  // Default tab: today if it has releases, else the day of the next release,
  // else the last day of the week.
  const fallbackDay =
    days.find((d) => d.key === today)?.key ??
    (nextEvent && fmt ? fmt.key.format(nextEvent.time) : days.at(-1)?.key) ??
    null;
  const selected = day ?? fallbackDay;

  const rows = fmt
    ? events.filter(
        (e) => fmt.key.format(e.time) === selected && (!highOnly || e.impact === "High"),
      )
    : [];

  if (!events.length) {
    return (
      <div className="bevel-clear rounded-panel px-6 py-14 text-center text-[14.5px] text-navy-700/70">
        {copy.unavailable}
      </div>
    );
  }

  return (
    <div className="bevel-clear rounded-panel p-2 sm:p-3">
      {/* Controls */}
      <div className="flex flex-col gap-3 p-2 sm:flex-row sm:items-center sm:justify-between sm:p-3">
        <div
          role="tablist"
          aria-label={copy.daysLabel}
          className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 sm:pb-0"
        >
          {fmt
            ? days.map((d) => {
                const active = d.key === selected;
                return (
                  <button
                    key={d.key}
                    role="tab"
                    type="button"
                    aria-selected={active}
                    onClick={() => setDay(d.key)}
                    className={`relative shrink-0 rounded-pill px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-300 ${
                      active
                        ? "bg-navy-900 text-ink-100"
                        : "text-navy-700/75 hover:bg-navy-900/5 hover:text-navy-900"
                    }`}
                  >
                    {d.label}
                    {d.key === today && (
                      <span
                        aria-label={copy.today}
                        className={`ms-1.5 inline-block size-1.5 rounded-full align-middle ${active ? "bg-blue-400" : "bg-blue-600"}`}
                      />
                    )}
                  </button>
                );
              })
            : Array.from({ length: 5 }, (_, i) => (
                <span key={i} className="h-[30px] w-[68px] shrink-0 animate-pulse rounded-pill bg-navy-900/5" />
              ))}
        </div>

        <label className="flex shrink-0 cursor-pointer items-center gap-2.5 text-[13px] font-medium text-navy-700/80 select-none">
          <span>{copy.highOnly}</span>
          <button
            type="button"
            role="switch"
            aria-checked={highOnly}
            onClick={() => setHighOnly((v) => !v)}
            className={`relative h-[22px] w-[38px] rounded-pill transition-colors duration-300 ${
              highOnly ? "bg-blue-600" : "bg-navy-900/12"
            }`}
          >
            <span
              className={`absolute top-[3px] left-[3px] size-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                highOnly ? "translate-x-4" : ""
              }`}
            />
          </button>
        </label>
      </div>

      {/* Table */}
      <div className="mt-1 overflow-hidden rounded-[calc(var(--radius-panel)-12px)] bg-white/70">
        <div className="hidden grid-cols-[84px_72px_84px_1fr_92px_92px] gap-4 border-b border-navy-900/8 px-5 py-3 md:grid">
          {[copy.cols.time, copy.cols.currency, copy.cols.impact, copy.cols.event, copy.cols.forecast, copy.cols.previous].map(
            (c, i) => (
              <span key={c} className={`type-label text-[10.5px] text-navy-700/55 ${i >= 4 ? "text-right" : ""}`}>
                {c}
              </span>
            ),
          )}
        </div>

        {!fmt ? (
          <ul aria-hidden>
            {Array.from({ length: 6 }, (_, i) => (
              <li key={i} className="border-b border-navy-900/6 px-5 py-4 last:border-0">
                <span className="block h-4 animate-pulse rounded-tight bg-navy-900/5" />
              </li>
            ))}
          </ul>
        ) : rows.length === 0 ? (
          <p className="px-5 py-12 text-center text-[14px] text-navy-700/60">{copy.emptyDay}</p>
        ) : (
          <ul>
            {rows.map((e) => {
              const past = now !== null && e.time <= now;
              const next = e.id === nextEvent?.id;
              return (
                <li
                  key={e.id}
                  className={`relative grid grid-cols-[auto_auto_1fr] items-center gap-x-3 gap-y-1.5 border-b border-navy-900/6 px-5 py-3.5 transition-colors last:border-0 md:grid-cols-[84px_72px_84px_1fr_92px_92px] md:gap-4 ${
                    next ? "bg-blue-600/8" : "hover:bg-navy-900/[0.025]"
                  } ${past ? "text-navy-700/45" : "text-navy-900"}`}
                >
                  {next && <span aria-hidden className="absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-blue-600" />}

                  <span className="num text-[13px]">{fmt.time.format(e.time)}</span>

                  <span>
                    <span
                      className={`num inline-flex rounded-tight border px-1.5 py-0.5 text-[11.5px] font-medium ${
                        past ? "border-navy-900/6 text-navy-700/45" : "border-navy-900/10 bg-white text-navy-800"
                      }`}
                    >
                      {e.currency}
                    </span>
                  </span>

                  <ImpactBars impact={e.impact} dim={past} />

                  <span className="col-span-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[14.5px] font-medium md:col-span-1">
                    {e.title}
                    {next && now !== null && (
                      <span className="num rounded-pill bg-blue-600 px-2 py-0.5 text-[10.5px] font-medium tracking-normal text-white">
                        {copy.next} · {formatDuration(e.time - now)}
                      </span>
                    )}
                  </span>

                  <span className="num col-span-3 flex gap-4 text-[12.5px] text-navy-700/70 md:contents md:text-[13px]">
                    <span className="md:text-right">
                      <span className="text-navy-700/45 md:hidden">{copy.cols.forecast} </span>
                      {e.forecast || "—"}
                    </span>
                    <span className="md:text-right">
                      <span className="text-navy-700/45 md:hidden">{copy.cols.previous} </span>
                      {e.previous || "—"}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <p className="num px-3 pt-3 pb-1 text-[11.5px] text-navy-700/55">
        {copy.footnote}
        {fmt && now !== null
          ? ` (${fmt.zone.formatToParts(now).find((p) => p.type === "timeZoneName")?.value})`
          : ""}
      </p>
    </div>
  );
}

/** Three ascending bars: all three lit for high impact, two for medium. */
function ImpactBars({ impact, dim }: { impact: CalendarEvent["impact"]; dim: boolean }) {
  const lit = impact === "High" ? 3 : 2;
  return (
    <span className="flex items-center gap-2">
      <span aria-hidden className="flex items-end gap-[3px]">
        {[7, 10, 13].map((h, i) => (
          <span
            key={h}
            style={{ height: h }}
            className={`w-[3.5px] rounded-full ${
              i < lit ? (dim ? "bg-blue-600/35" : impact === "High" ? "bg-blue-700" : "bg-blue-600") : "bg-navy-900/12"
            }`}
          />
        ))}
      </span>
      <span className={`text-[12px] ${dim ? "" : "text-navy-700/70"}`}>
        {impact === "High" ? copy.high : copy.medium}
      </span>
    </span>
  );
}
