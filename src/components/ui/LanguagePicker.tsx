"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import {
  languages,
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  type Language,
} from "@/content/languages";

/**
 * The globe button and its modal — StarTrader's language grid.
 *
 * Read `src/content/languages.ts` before touching this: the picker records a
 * preference and sets `<html lang>`, it does not translate the page, and the
 * "coming soon" marker on unavailable locales is the honest part of the
 * feature rather than a placeholder to tidy away.
 *
 * Uses a native `<dialog>` with `showModal()`, which gets focus trapping, the
 * Escape key, the top layer and `::backdrop` from the platform. Hand-rolling
 * any of that in a div is how modals end up unreachable by keyboard.
 */

/* --- The stored preference, as an external store ---------------------------
 * `localStorage` is external mutable state that the server cannot see, which
 * is exactly what `useSyncExternalStore` is for. Reading it in an effect and
 * calling `setState` would work, but it renders once with the wrong value and
 * again with the right one — and it does not stay in sync when the reader has
 * the site open in two tabs. The `storage` event handles that for free. */

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot() {
  const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return saved && languages.some((l) => l.code === saved)
    ? saved
    : DEFAULT_LANGUAGE;
}

/** The server has no preference to read, so it always renders the default. */
function getServerSnapshot() {
  return DEFAULT_LANGUAGE;
}

function storeLanguage(code: string) {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
  // `storage` only fires in *other* tabs, so this tab is notified by hand.
  listeners.forEach((l) => l());
}

export function LanguagePicker({ tone }: { tone: "deep" | "clear" }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const current = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const active = languages.find((l) => l.code === current) ?? languages[0];

  // Real, and worth doing even without catalogues: `lang` drives screen reader
  // pronunciation and the browser's own offer to translate the page. It is a
  // DOM mutation outside React's tree, so it belongs in an effect.
  useEffect(() => {
    document.documentElement.lang = active.code;
    document.documentElement.dir = active.rtl ? "rtl" : "ltr";
  }, [active]);

  const choose = (lang: Language) => {
    storeLanguage(lang.code);
    dialog.current?.close();
  };

  return (
    <>
      <button
        onClick={() => dialog.current?.showModal()}
        aria-label={`Language: ${active.english}. Change language`}
        className={`hidden size-11 shrink-0 items-center justify-center rounded-pill transition-colors sm:flex ${
          tone === "clear"
            ? "text-navy-700/75 hover:text-blue-600"
            : "text-ink-300 hover:text-blue-400"
        }`}
      >
        <Globe />
      </button>

      <dialog
        ref={dialog}
        // Light dismiss. `showModal()` renders the backdrop as part of the
        // dialog itself, so a click landing on the backdrop reports the dialog
        // as its target — that identity check is the whole test. Escape is
        // handled by the platform and needs no code.
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
        className="m-auto w-[min(92vw,860px)] rounded-panel bg-white p-0 text-navy-900 backdrop:bg-navy-950/70 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-start justify-between gap-4 border-b border-navy-900/10 p-6 sm:p-7">
          <div>
            <h2 className="type-h3">Choose your language</h2>
            <p className="mt-1.5 text-[14px] leading-relaxed text-navy-700/75">
              Translated pages are rolling out. Anything marked below still
              reads in English for now.
            </p>
          </div>
          <button
            onClick={() => dialog.current?.close()}
            aria-label="Close"
            className="-mt-1 grid size-11 shrink-0 place-items-center rounded-full text-navy-700/70 transition-colors hover:bg-navy-900/6 hover:text-navy-900"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
              <path
                d="M2 2l10 10M12 2L2 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <ul className="grid max-h-[60dvh] gap-1 overflow-y-auto p-4 sm:grid-cols-3 sm:p-5 lg:grid-cols-4">
          {languages.map((lang) => {
            const selected = lang.code === current;
            return (
              <li key={lang.code}>
                <button
                  onClick={() => choose(lang)}
                  aria-current={selected || undefined}
                  lang={lang.code}
                  className={`flex min-h-11 w-full flex-col items-start rounded-inner px-3 py-2.5 text-left transition-colors ${
                    selected
                      ? "bg-blue-600/10 ring-1 ring-blue-600/30"
                      : "hover:bg-navy-900/5"
                  }`}
                >
                  <span
                    className={`text-[15px] font-semibold ${
                      selected ? "text-blue-700" : "text-navy-900"
                    }`}
                    dir={lang.rtl ? "rtl" : undefined}
                  >
                    {lang.native}
                  </span>
                  <span className="text-[12.5px] text-navy-700/60" lang="en">
                    {lang.english}
                    {!lang.available && " · coming soon"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </dialog>
    </>
  );
}

function Globe() {
  return (
    <svg width="19" height="19" viewBox="0 0 20 20" aria-hidden>
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="10" cy="10" r="7.5" />
        <path d="M2.5 10h15" />
        <path d="M10 2.5c1.9 2 3 4.7 3 7.5s-1.1 5.5-3 7.5c-1.9-2-3-4.7-3-7.5s1.1-5.5 3-7.5z" />
      </g>
    </svg>
  );
}
