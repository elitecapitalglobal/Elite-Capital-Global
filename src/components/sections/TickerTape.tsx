"use client";

import { useEffect, useState } from "react";
import { Marquee } from "@/components/ui/Marquee";

export type TickerRow = {
  pair: string;
  symbol: string;
  decimals: number;
  price: number | null;
  dir: "up" | "down";
};

/** How often the tape re-polls `/api/quotes` for fresh prices. */
const REFRESH_MS = 30_000;

/**
 * Client half of the ticker. Takes the server-rendered rows as a starting
 * point — so the tape never opens on a blank/loading state — then polls for
 * live updates. A symbol Yahoo fails to price on a given poll just keeps
 * showing its last known value rather than blanking out.
 */
export function TickerTape({ initial }: { initial: TickerRow[] }) {
  const [rows, setRows] = useState(initial);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch("/api/quotes", { cache: "no-store" });
        if (!res.ok) return;
        const { quotes } = (await res.json()) as {
          quotes: Record<string, { price: number; dir: "up" | "down" }>;
        };
        if (cancelled) return;
        setRows((prev) =>
          prev.map((row) => {
            const quote = quotes[row.symbol];
            return quote ? { ...row, price: quote.price, dir: quote.dir } : row;
          }),
        );
      } catch {
        // Offline or Yahoo is down for this tick — keep the last good prices.
      }
    }

    const id = setInterval(poll, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return (
    <div
      data-surface="clear"
      // overflow-hidden is load-bearing: the track is several times the
      // viewport width, and without clipping here it drags the whole page
      // into horizontal scroll.
      className="relative overflow-hidden border-y border-navy-900/10 bg-blue-50"
    >
      <Marquee copies={4} duration="60s">
        {rows.map((row) => (
          <span
            key={row.pair}
            className="flex shrink-0 items-center gap-2 py-3 pe-12 text-[13px] font-semibold text-navy-700"
          >
            {row.pair}
            <span
              className={`num ${row.dir === "up" ? "text-bid" : "text-ask"}`}
            >
              {row.price === null ? "—" : row.price.toFixed(row.decimals)}{" "}
              {row.dir === "up" ? "▲" : "▼"}
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
