import { NextResponse } from "next/server";
import { ticker } from "@/content/site";
import { fetchQuotes } from "@/lib/quotes";

/**
 * Polled client-side by the ticker tape — see `TickerTape.tsx`. Symbols come
 * from the same `ticker` list the initial server render uses, so the two
 * never drift.
 */
export async function GET() {
  const quotes = await fetchQuotes(ticker.map((row) => row.symbol));
  return NextResponse.json(
    { quotes },
    { headers: { "Cache-Control": "no-store" } },
  );
}
