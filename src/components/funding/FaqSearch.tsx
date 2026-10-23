"use client";

import { useState } from "react";

/**
 * Searchable FAQ. Same native <details> as the home-page FAQ, so it still
 * opens and closes with no JS; search only filters which items render.
 */
export function FaqSearch({ items }: { items: { q: string; a: string }[] }) {
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const shown = term
    ? items.filter((i) => (i.q + " " + i.a).toLowerCase().includes(term))
    : items;

  return (
    <div>
      <label className="flex h-12 items-center gap-2.5 rounded-pill border border-transparent bg-white px-5 focus-within:border-blue-600">
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden className="shrink-0 text-navy-700/60">
          <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span className="sr-only">Search questions</span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search questions"
          autoComplete="off"
          className="h-full w-full bg-transparent text-[16px] text-navy-900 outline-none placeholder:text-navy-700/50"
        />
      </label>

      <div className="mt-5 divide-y divide-navy-900/10 border-y border-navy-900/10">
        {shown.map((item, i) => (
          <details key={item.q} className="group" open={term ? true : i === 0}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
              <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-navy-900">{item.q}</h3>
              <span
                aria-hidden
                className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-navy-900/15 text-navy-900 transition-transform duration-300 ease-[var(--ease-out-expo)] group-open:rotate-45 group-open:border-blue-700 group-open:text-blue-700"
              >
                <svg width="11" height="11" viewBox="0 0 12 12">
                  <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <p className="measure pb-5 text-[15px] leading-relaxed text-navy-700/85">{item.a}</p>
          </details>
        ))}
      </div>
      <p aria-live="polite" className="mt-4 text-[14px] text-navy-700/75">
        {shown.length === 0 && "No questions match that search. Try another word, or contact our support team."}
      </p>
    </div>
  );
}
