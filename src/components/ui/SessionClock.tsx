"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getMarketState, type MarketState, type SessionId } from "@/lib/sessions";

/**
 * One 1s clock shared by everything in the hero that reads session state —
 * the kicker pill, the globe and the session card — so they never disagree by
 * a tick.
 *
 * `market` is `null` on the server and on the first client render. Session
 * state depends on the reader's clock, so rendering it during SSR would
 * guarantee a hydration mismatch; consumers render their static fallback
 * until the first tick lands.
 *
 * `focus` is the session the reader is pointing at in the card, which the
 * globe turns to.
 */
type Ctx = {
  market: MarketState | null;
  focus: SessionId | null;
  setFocus: (id: SessionId | null) => void;
};

const SessionClockContext = createContext<Ctx>({
  market: null,
  focus: null,
  setFocus: () => {},
});

export function SessionClockProvider({ children }: { children: ReactNode }) {
  const [market, setMarket] = useState<MarketState | null>(null);
  const [focus, setFocus] = useState<SessionId | null>(null);

  useEffect(() => {
    const tick = () => setMarket(getMarketState());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <SessionClockContext.Provider value={{ market, focus, setFocus }}>
      {children}
    </SessionClockContext.Provider>
  );
}

export function useSessionClock() {
  return useContext(SessionClockContext);
}
