import { ticker } from "@/content/site";
import { fetchQuotes } from "@/lib/quotes";
import { TickerTape, type TickerRow } from "./TickerTape";

/**
 * The market tape. Perpetual motion earns its place here: a tape that isn't
 * moving reads as stale data. Everything else on the page animates once.
 *
 * Prices are live (Yahoo Finance, see `src/lib/quotes.ts`), fetched here on
 * the server so the tape never opens on a loading state, then kept fresh by
 * `TickerTape`'s client-side poll.
 *
 * One copy of this list measures ~1440px, so four copies keep ~4300px of
 * content behind the viewport — enough that the wrap is invisible up to 4K.
 * See the `copies` rule in Marquee.tsx before changing the item list.
 */
export async function Ticker() {
  const quotes = await fetchQuotes(ticker.map((row) => row.symbol));

  const rows: TickerRow[] = ticker.map((row) => ({
    pair: row.pair,
    symbol: row.symbol,
    decimals: row.decimals,
    price: quotes[row.symbol]?.price ?? null,
    dir: quotes[row.symbol]?.dir ?? "up",
  }));

  return <TickerTape initial={rows} />;
}
