"use client";

import { useState } from "react";
import { funding } from "@/content/funding";

/**
 * Four self-checks before a withdrawal. Nothing is stored or sent — it is a
 * prompt for the reader, so state lives in the component and resets on reload.
 */
export function WithdrawChecklist() {
  const c = funding.rules.checklist;
  const [done, setDone] = useState<boolean[]>(() => c.items.map(() => false));
  const n = done.filter(Boolean).length;
  const all = n === c.items.length;

  return (
    <aside aria-labelledby="checklist-title" className="rounded-card bg-blue-50 p-7 lg:sticky lg:top-32">
      <h3 id="checklist-title" className="type-h3 text-navy-900">{c.title}</h3>
      <p className="mt-1.5 text-[15px] text-navy-700/80">{c.lead}</p>
      <ul className="mt-5 grid gap-2">
        {c.items.map((item, i) => (
          <li key={item}>
            <label className="flex cursor-pointer items-start gap-3 rounded-inner bg-white px-4 py-3.5 text-[15px] text-navy-900">
              <input
                type="checkbox"
                checked={done[i]}
                onChange={(e) =>
                  setDone((d) => d.map((v, j) => (j === i ? e.target.checked : v)))
                }
                className="mt-1 size-[18px] shrink-0 accent-[var(--color-blue-600)]"
              />
              {item}
            </label>
          </li>
        ))}
      </ul>
      <div className="mt-5 grid gap-2">
        <div className="h-1.5 overflow-hidden rounded-full bg-navy-900/8">
          <i
            className="block h-full bg-blue-600 transition-[width] duration-500 ease-[var(--ease-out-expo)]"
            style={{ width: `${(n / c.items.length) * 100}%` }}
          />
        </div>
        <p aria-live="polite" className={`text-[14px] ${all ? "font-semibold text-blue-700" : "text-navy-700/75"}`}>
          {all ? c.done : `${n} of ${c.items.length} done`}
        </p>
      </div>
    </aside>
  );
}
