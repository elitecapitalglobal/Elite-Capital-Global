import type { NextConfig } from "next";

/**
 * Security headers, sent on every response (security review, 28 Oct 2026).
 *
 * - frame-ancestors / X-Frame-Options: no other site may frame ours. Stops
 *   clickjacking — a scam page overlaying our real log-in form.
 * - form-action 'self', base-uri 'self', object-src 'none': forms can only
 *   post back to us; no <base> or plugin tricks.
 * - HSTS: browsers only ever talk to us over HTTPS once they've seen us.
 * - nosniff, Referrer-Policy, Permissions-Policy, COOP: standard hardening.
 *
 * Not yet a full script-src CSP: Next.js and Vercel Analytics use inline
 * scripts, and a strict policy needs per-request nonces (middleware). That is
 * the next step if a full CSP is wanted; these headers are safe to ship now.
 */
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'none'; form-action 'self'; base-uri 'self'; object-src 'none'",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // Don't advertise the framework and version to scanners.
  poweredByHeader: false,
  async redirects() {
    return [
      // The holding page was removed on 9 Nov 2026; old links land on sign-up.
      { source: "/coming-soon", destination: "/signup", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Auth responses must never be cached by a browser or proxy.
      { source: "/api/auth/:path*", headers: [{ key: "Cache-Control", value: "no-store" }] },
    ];
  },
};

export default nextConfig;
