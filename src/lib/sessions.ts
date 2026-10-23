/**
 * The four FX trading sessions, computed from the wall clock in each city.
 *
 * Every session is defined in its own IANA zone with local open/close hours,
 * so daylight saving is handled by `Intl` rather than by a table of UTC
 * offsets that goes stale twice a year. Pure — no React, no DOM — so it can be
 * exercised with fixed `Date`s.
 *
 * The FX week runs Sunday 17:00 to Friday 17:00 New York time. Outside that
 * window every session reports closed, whatever its own local clock says.
 */

export type SessionId = "sydney" | "tokyo" | "london" | "newyork";

export type SessionDef = {
  id: SessionId;
  city: string;
  short: string;
  tz: string;
  /** Local hours, 24h. */
  open: number;
  close: number;
  /** [lng, lat] — d3-geo order. */
  coords: [number, number];
  /**
   * ISO 3166-1 numeric ids, as world-atlas keys its countries, lit on the
   * globe while this session is live. Small financial centres (HK, SG) are
   * below the 110m atlas's resolution, so the region carries them.
   */
  countries: string[];
};

export const SESSIONS: SessionDef[] = [
  {
    id: "sydney",
    city: "Sydney",
    short: "SYD",
    tz: "Australia/Sydney",
    open: 7,
    close: 16,
    coords: [151.21, -33.87],
    countries: ["036", "554"],
  },
  {
    id: "tokyo",
    city: "Tokyo",
    short: "TYO",
    tz: "Asia/Tokyo",
    open: 9,
    close: 18,
    coords: [139.69, 35.68],
    countries: ["392", "156", "410", "158"],
  },
  {
    id: "london",
    city: "London",
    short: "LDN",
    tz: "Europe/London",
    open: 8,
    close: 17,
    coords: [-0.13, 51.51],
    countries: [
      "826", "372", "250", "276", "528", "056", "442", "756", "724",
      "620", "380", "040", "208", "752", "578", "246", "616", "203",
    ],
  },
  {
    id: "newyork",
    city: "New York",
    short: "NY",
    tz: "America/New_York",
    open: 8,
    close: 17,
    coords: [-74.01, 40.71],
    countries: ["840", "124"],
  },
];

export type SessionState = {
  def: SessionDef;
  live: boolean;
  /** ms until it closes (live) or next opens (closed). */
  closesIn: number | null;
  opensIn: number | null;
  /** 0..1 through today's session while live, else 0. */
  progress: number;
};

export type MarketState = {
  now: number;
  sessions: SessionState[];
  /** Pairs of sessions live at the same time — the liquid hours. */
  overlaps: [SessionId, SessionId][];
  /** ms until the earliest overlap ends, if one is running. */
  overlapEndsIn: number | null;
  marketClosed: boolean;
  /** Epoch ms of the next Sunday-17:00-NY open, while closed. */
  reopensAt: number | null;
};

/* -------------------------------------------------------------------------- */
/* Zone arithmetic                                                             */
/* -------------------------------------------------------------------------- */

const formatters = new Map<string, Intl.DateTimeFormat>();

function formatter(tz: string) {
  let f = formatters.get(tz);
  if (!f) {
    f = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hourCycle: "h23",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      weekday: "short",
    });
    formatters.set(tz, f);
  }
  return f;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type Wall = { y: number; mo: number; d: number; h: number; mi: number; s: number; wd: number };

function wall(t: number, tz: string): Wall {
  const parts: Record<string, string> = {};
  for (const p of formatter(tz).formatToParts(new Date(t))) parts[p.type] = p.value;
  return {
    y: +parts.year,
    mo: +parts.month,
    d: +parts.day,
    h: +parts.hour,
    mi: +parts.minute,
    s: +parts.second,
    wd: WEEKDAYS.indexOf(parts.weekday),
  };
}

/** The zone's UTC offset at instant `t`, in ms. */
function offset(t: number, tz: string) {
  const w = wall(t, tz);
  return Date.UTC(w.y, w.mo - 1, w.d, w.h, w.mi, w.s) - Math.floor(t / 1000) * 1000;
}

/** A local wall time in `tz` → epoch ms. Day overflow is fine (Date.UTC normalises). */
function zoned(y: number, mo: number, d: number, h: number, tz: string) {
  const asUtc = Date.UTC(y, mo - 1, d, h);
  const guess = asUtc - offset(asUtc, tz);
  return asUtc - offset(guess, tz);
}

/* -------------------------------------------------------------------------- */
/* Weekend                                                                      */
/* -------------------------------------------------------------------------- */

const NY = "America/New_York";
const DAY = 86_400_000;

export function isWeekendClosed(t: number) {
  const w = wall(t, NY);
  return w.wd === 6 || (w.wd === 5 && w.h >= 17) || (w.wd === 0 && w.h < 17);
}

/** The next Sunday 17:00 New York at or after `t`. */
function nextReopen(t: number) {
  const w = wall(t, NY);
  const days = (7 - w.wd) % 7;
  let at = zoned(w.y, w.mo, w.d + days, 17, NY);
  if (at < t) at = zoned(w.y, w.mo, w.d + days + 7, 17, NY);
  return at;
}

/** The next Friday 17:00 New York after `t`. */
function nextWeekClose(t: number) {
  const w = wall(t, NY);
  const days = (5 - w.wd + 7) % 7;
  let at = zoned(w.y, w.mo, w.d + days, 17, NY);
  if (at <= t) at = zoned(w.y, w.mo, w.d + days + 7, 17, NY);
  return at;
}

/* -------------------------------------------------------------------------- */
/* Sessions                                                                     */
/* -------------------------------------------------------------------------- */

/** Today's (local) open/close for a session as epoch ms, offset by `dayDelta`. */
function sessionWindow(def: SessionDef, w: Wall, dayDelta: number) {
  return {
    open: zoned(w.y, w.mo, w.d + dayDelta, def.open, def.tz),
    close: zoned(w.y, w.mo, w.d + dayDelta, def.close, def.tz),
    wd: (w.wd + dayDelta + 7 * 2) % 7,
  };
}

function sessionState(def: SessionDef, t: number): SessionState {
  const w = wall(t, def.tz);
  const today = sessionWindow(def, w, 0);
  const weekday = today.wd >= 1 && today.wd <= 5;

  if (weekday && !isWeekendClosed(t) && t >= today.open && t < today.close) {
    const close = Math.min(today.close, nextWeekClose(t));
    return {
      def,
      live: true,
      closesIn: close - t,
      opensIn: null,
      progress: (t - today.open) / (today.close - today.open),
    };
  }

  // Walk forward a local day at a time to the next weekday open. If that open
  // falls inside the weekend gap (Sydney's Monday morning can), the session
  // really starts when the FX week does — provided that's before its close.
  for (let i = 0; i <= 8; i++) {
    const win = sessionWindow(def, w, i);
    if (win.wd < 1 || win.wd > 5 || win.close <= t) continue;
    let open = Math.max(win.open, t);
    if (isWeekendClosed(open)) {
      const reopen = nextReopen(open);
      if (reopen >= win.close) continue;
      open = reopen;
    }
    if (open <= t) continue;
    return { def, live: false, closesIn: null, opensIn: open - t, progress: 0 };
  }

  return { def, live: false, closesIn: null, opensIn: null, progress: 0 };
}

export function getMarketState(now: Date | number = Date.now()): MarketState {
  const t = typeof now === "number" ? now : now.getTime();
  const sessions = SESSIONS.map((def) => sessionState(def, t));
  const live = sessions.filter((s) => s.live);

  const overlaps: [SessionId, SessionId][] = [];
  let overlapEndsIn: number | null = null;
  for (let i = 0; i < live.length; i++) {
    for (let j = i + 1; j < live.length; j++) {
      overlaps.push([live[i].def.id, live[j].def.id]);
      const ends = Math.min(live[i].closesIn!, live[j].closesIn!);
      overlapEndsIn = overlapEndsIn === null ? ends : Math.min(overlapEndsIn, ends);
    }
  }

  const marketClosed = isWeekendClosed(t);
  return {
    now: t,
    sessions,
    overlaps,
    overlapEndsIn,
    marketClosed,
    reopensAt: marketClosed ? nextReopen(t) : null,
  };
}

/* -------------------------------------------------------------------------- */
/* Sun                                                                          */
/* -------------------------------------------------------------------------- */

/**
 * The point on earth where the sun is directly overhead, as [lng, lat].
 * Low-precision (declination from day-of-year, equation of time included) —
 * accurate to well under a degree, which is far finer than the globe draws.
 */
export function subsolarPoint(t: number): [number, number] {
  const d = new Date(t);
  const start = Date.UTC(d.getUTCFullYear(), 0, 0);
  const doy = (t - start) / DAY;
  const g = ((2 * Math.PI) / 365) * (doy - 1);
  const decl =
    0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) -
    0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g);
  const eqt =
    229.18 *
    (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) -
      0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  const utcMin = d.getUTCHours() * 60 + d.getUTCMinutes() + d.getUTCSeconds() / 60;
  let lng = -((utcMin + eqt) / 4 - 180);
  lng = ((lng + 540) % 360) - 180;
  return [lng, (decl * 180) / Math.PI];
}

/* -------------------------------------------------------------------------- */
/* Formatting                                                                   */
/* -------------------------------------------------------------------------- */

/** "7h 28m", "42m 10s", "2d 4h". */
export function formatDuration(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${String(m).padStart(2, "0")}m`;
  return `${m}m ${String(s % 60).padStart(2, "0")}s`;
}
