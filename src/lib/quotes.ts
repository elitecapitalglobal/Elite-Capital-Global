/**
 * Live market data via Yahoo Finance's unauthenticated chart endpoint.
 *
 * There is no official Yahoo Finance API — this is the same undocumented
 * endpoint Yahoo Finance's own site calls, keyed by symbol rather than an API
 * key. It has no published uptime guarantee, so every call is wrapped to fail
 * soft: a symbol that errors is simply missing from the result map, and
 * callers keep whatever price they last had rather than showing a blank.
 */

export type Quote = { symbol: string; price: number; dir: "up" | "down" };

const CHART_URL = "https://query1.finance.yahoo.com/v8/finance/chart";

async function fetchQuote(symbol: string): Promise<Quote | null> {
  try {
    const res = await fetch(
      `${CHART_URL}/${encodeURIComponent(symbol)}?interval=1d&range=1d`,
      {
        // Yahoo's edge rejects requests with no User-Agent.
        headers: { "User-Agent": "Mozilla/5.0" },
        next: { revalidate: 20 },
      },
    );
    if (!res.ok) return null;

    const data = await res.json();
    const meta = data?.chart?.result?.[0]?.meta;
    if (!meta || typeof meta.regularMarketPrice !== "number") return null;

    const previousClose =
      meta.chartPreviousClose ?? meta.previousClose ?? meta.regularMarketPrice;

    return {
      symbol,
      price: meta.regularMarketPrice,
      dir: meta.regularMarketPrice >= previousClose ? "up" : "down",
    };
  } catch {
    return null;
  }
}

/** Keyed by symbol. Symbols Yahoo couldn't price are simply absent. */
export async function fetchQuotes(
  symbols: string[],
): Promise<Record<string, Quote>> {
  const results = await Promise.all(symbols.map(fetchQuote));
  const quotes: Record<string, Quote> = {};
  results.forEach((quote) => {
    if (quote) quotes[quote.symbol] = quote;
  });
  return quotes;
}
