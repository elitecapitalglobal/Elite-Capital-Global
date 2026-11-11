import { NextResponse, type NextRequest } from "next/server";

/**
 * Strict Content Security Policy for the pages where credentials are typed:
 * /signup and /login (decided 30 Oct 2026 — the rest of the site keeps the
 * lighter policy in next.config.ts and stays pre-rendered).
 *
 * Every request gets a fresh random nonce. Next.js reads it from the CSP
 * request header and stamps it on its own scripts; any script without it —
 * an injected <script>, an inline handler, a script from another domain — is
 * refused by the browser. So even if an attacker found a way to put markup on
 * these pages, their script could not run and read the password field.
 *
 * 'strict-dynamic' lets our trusted scripts load what they need at runtime
 * (Cloudflare Turnstile, Vercel Analytics) without listing every URL.
 * Turnstile's challenge runs in an iframe from challenges.cloudflare.com.
 *
 * Styles allow 'unsafe-inline': animation libraries set style attributes,
 * and CSS cannot run code, so the trade is a safe one.
 *
 * The pages call `connection()` so they render per request; a pre-built page
 * would carry a stale nonce and be blocked.
 */ 
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const dev = process.env.NODE_ENV === "development";

  const csp = [
    "default-src 'self'",
    // 'unsafe-eval' only in development: React uses eval for its dev-only error overlay.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://challenges.cloudflare.com${dev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data:",
    "font-src 'self'",
    "connect-src 'self' https://challenges.cloudflare.com",
    "frame-src https://challenges.cloudflare.com",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(dev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    {
      source: "/(signup|login)",
      // Link prefetches aren't documents; the policy applies when the page itself loads.
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
