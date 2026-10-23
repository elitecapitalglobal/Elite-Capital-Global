/**
 * This week's economic calendar, from Forex Factory's public weekly feed.
 *
 * Like the Yahoo quotes in `quotes.ts`, this is an unauthenticated feed with
 * no uptime guarantee, so it fails soft: any error yields an empty list and
 * the section shows its quiet empty state rather than breaking the page.
 *
 * The feed asks consumers not to poll it hard. One server-side fetch an hour,
 * shared by every visitor through Next's data cache, keeps us well inside
 * that — never fetch it from the browser.
 */

export type Impact = "High" | "Medium";

export type CalendarEvent = {
  id: string;
  title: string;
  /** ISO currency code the release moves — USD, EUR, GBP… */
  currency: string;
  /** Epoch ms. */
  time: number;
  impact: Impact;
  forecast: string;
  previous: string;
};

const FEED_URL = "https://nfs.faireconomy.media/ff_calendar_thisweek.json";

/** The currencies our FX book actually quotes. */
const CURRENCIES = new Set(["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "NZD", "CNY"]);

type RawEvent = {
  title?: string;
  country?: string;
  date?: string;
  impact?: string;
  forecast?: string;
  previous?: string;
};

export async function fetchCalendar(): Promise<CalendarEvent[]> {
  try {
    const res = await fetch(FEED_URL, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    const raw: RawEvent[] = await res.json();
    if (!Array.isArray(raw)) return [];

    return raw
      .filter(
        (e) =>
          (e.impact === "High" || e.impact === "Medium") &&
          !!e.country &&
          CURRENCIES.has(e.country) &&
          !!e.title &&
          !!e.date,
      )
      .map((e, i) => ({
        id: `${e.date}-${e.country}-${i}`,
        title: e.title!,
        currency: e.country!,
        time: Date.parse(e.date!),
        impact: e.impact as Impact,
        forecast: e.forecast ?? "",
        previous: e.previous ?? "",
      }))
      .filter((e) => Number.isFinite(e.time))
      .sort((a, b) => a.time - b.time);
  } catch {
    return [];
  }
}
