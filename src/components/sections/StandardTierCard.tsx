"use client";

import { useState } from "react";
import { accounts } from "@/content/site";
import { TierCard } from "./TierCard";

type Mode = keyof typeof accounts.standard.modes;

/**
 * The Standard tier, priced two ways — dollar lots or cent lots. Same
 * account, same conditions otherwise, so this is a toggle inside one card
 * rather than a second near-identical tier next to it. See the `standard`
 * entry in `site.ts`.
 */
export function StandardTierCard() {
  const [mode, setMode] = useState<Mode>("dollar");
  const active = accounts.standard.modes[mode];

  return (
    <TierCard
      name={accounts.standard.name}
      blurb={accounts.standard.blurb}
      cta={accounts.standard.cta}
      deposit={active.deposit}
      spread={active.spread}
      commission={active.commission}
      features={active.features}
      recommended
      toggle={
        <div
          role="radiogroup"
          aria-label="Standard account currency"
          className="flex shrink-0 rounded-pill bg-ink-100/8 p-0.5"
        >
          {(Object.keys(accounts.standard.modes) as Mode[]).map((key) => (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={mode === key}
              onClick={() => setMode(key)}
              className={`min-h-8 rounded-pill px-3 text-[12.5px] font-semibold transition-colors ${
                mode === key
                  ? "bg-blue-600 text-navy-950"
                  : "text-ink-300 hover:text-ink-100"
              }`}
            >
              {accounts.standard.modes[key].label}
            </button>
          ))}
        </div>
      }
    />
  );
}
