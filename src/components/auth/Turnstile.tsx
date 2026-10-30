"use client";

import { useEffect, useRef } from "react";

type TurnstileApi = {
  render(el: HTMLElement, options: Record<string, unknown>): string;
  reset(id: string): void;
  remove(id: string): void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let loading: Promise<void> | null = null;

/** Loads Cloudflare's script once per page, however many widgets mount. */
function load(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  loading ??= new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      loading = null;
      reject(new Error("Turnstile failed to load"));
    };
    document.head.appendChild(s);
  });
  return loading;
}

export type TurnstileState = { token: string | null; failed: boolean };

/**
 * Cloudflare Turnstile, the bot check on sign-up and log-in.
 *
 * "interaction-only": most visitors never see it — Cloudflare decides in the
 * background and the box stays empty. Only a visitor it is unsure of gets a
 * single tick-box, in the dark theme to sit with the form.
 *
 * Tokens are single-use, so the parent bumps `resetKey` after every submit
 * that didn't leave the page, and a fresh token is fetched.
 */
export function Turnstile({
  action,
  resetKey,
  onChange,
}: {
  action: "signup" | "login";
  resetKey: number;
  onChange: (state: TurnstileState) => void;
}) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const report = useRef(onChange);
  useEffect(() => {
    report.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!sitekey) {
      console.error("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set.");
      report.current({ token: null, failed: true });
      return;
    }
    let cancelled = false;
    load()
      .then(() => {
        if (cancelled || !box.current || !window.turnstile) return;
        widget.current = window.turnstile.render(box.current, {
          sitekey,
          action,
          theme: "dark",
          size: "flexible",
          appearance: "interaction-only",
          "refresh-expired": "auto",
          callback: (token: string) => report.current({ token, failed: false }),
          "expired-callback": () => report.current({ token: null, failed: false }),
          "error-callback": () => report.current({ token: null, failed: true }),
        });
      })
      .catch(() => {
        if (!cancelled) report.current({ token: null, failed: true });
      });
    return () => {
      cancelled = true;
      if (widget.current && window.turnstile) window.turnstile.remove(widget.current);
      widget.current = null;
    };
  }, [action]);

  useEffect(() => {
    if (resetKey && widget.current && window.turnstile) {
      report.current({ token: null, failed: false });
      window.turnstile.reset(widget.current);
    }
  }, [resetKey]);

  return <div ref={box} className="empty:hidden" />;
}

/** What to tell the visitor when they submit before a token is ready. */
export function turnstileWaitMessage(failed: boolean): string {
  return failed
    ? "The security check could not load. Please turn off any content blocker for this site, refresh the page and try again."
    : "One moment — we are confirming you are not a robot. Please try again in a few seconds.";
}
