/**
 * Request hardening shared by the auth route handlers. Server only.
 *
 * Each helper answers one abuse case found in the security review
 * (28 October 2026) — see the comment on each.
 */

/**
 * The visitor's IP. Used for rate limiting and sent to FYNXT, which asks for
 * the real client IP on every Login.
 *
 * Order matters: a client can put anything in `X-Forwarded-For`, so a raw
 * XFF read lets an attacker pick a fresh "IP" per request and walk straight
 * past the rate limit. `x-vercel-forwarded-for` and `x-real-ip` are set by
 * Vercel's edge and cannot be supplied by the client. XFF is only a last
 * resort for local development.
 *
 * Production is on Vercel (decided 30 Oct 2026). There XFF is never read at
 * all; in local development it is the only source, which is harmless.
 * Moving hosts: make the proxy overwrite `X-Real-IP` with the connecting
 * address.
 */
const PRODUCTION = process.env.NODE_ENV === "production";

export function clientIp(req: Request): string {
  const h = req.headers;
  const trusted = h.get("x-vercel-forwarded-for") ?? h.get("x-real-ip");
  if (trusted) return trusted.split(",")[0].trim();
  if (!PRODUCTION) {
    const fwd = h.get("x-forwarded-for");
    if (fwd) return fwd.split(",")[0].trim();
  }
  return "0.0.0.0";
}

/**
 * The visitor's country (ISO alpha-2) from Vercel's edge geolocation, or null
 * when unknown. Read only on Vercel (`VERCEL=1`), where the edge overwrites
 * the header; anywhere else a client could simply send it.
 */
export function ipCountry(req: Request): string | null {
  if (process.env.VERCEL !== "1") return null;
  const c = req.headers.get("x-vercel-ip-country");
  return c && /^[A-Z]{2}$/.test(c) ? c : null;
}

/** This site's own host as the request reached it (used for the Origin and Turnstile hostname checks). */
export function requestHost(req: Request): string | null {
  return req.headers.get("x-forwarded-host") ?? req.headers.get("host");
}

/**
 * Sliding-window limiter: at most `limit` hits per `windowMs` per key.
 *
 * Expired entries are pruned rather than the whole map being cleared — a
 * clear-all at a size cap would let an attacker flood unique keys to reset
 * everyone's counters. It still lives in one server instance's memory, so on
 * serverless hosting each instance counts separately: it slows abuse down; a
 * CAPTCHA and an edge/WAF limit are what stop it.
 */
const hits = new Map<string, number[]>();
let lastSweep = 0;

export function rateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  if (now - lastSweep > 60_000) {
    lastSweep = now;
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > limit;
}

const MAX_BODY_BYTES = 8 * 1024;

/**
 * Reads a JSON body only if the request is a genuine same-site JSON call.
 *
 * - Content-Type must be application/json. A cross-site <form> can only send
 *   text/plain, urlencoded or multipart without a CORS preflight, so this
 *   alone stops form-based CSRF.
 * - If an Origin header is present it must match this site's own host.
 * - Bodies over 8 KB are refused before parsing; a real form is under 1 KB.
 *
 * Returns the parsed object, or a short reason string for the log.
 */
export async function readJson(req: Request): Promise<Record<string, unknown> | string> {
  const type = req.headers.get("content-type") ?? "";
  if (!type.toLowerCase().startsWith("application/json")) return "content-type";

  const origin = req.headers.get("origin");
  if (origin) {
    const host = requestHost(req);
    let originHost = "";
    try {
      originHost = new URL(origin).host;
    } catch {
      return "origin";
    }
    if (!host || originHost !== host) return "origin";
  }

  const declared = Number(req.headers.get("content-length") ?? "0");
  if (declared > MAX_BODY_BYTES) return "size";
  const text = await req.text();
  if (text.length > MAX_BODY_BYTES) return "size";

  try {
    const body = JSON.parse(text);
    return body && typeof body === "object" && !Array.isArray(body) ? body : "shape";
  } catch {
    return "json";
  }
}

export const EMAIL = /^[^\s@<>()"',;:]+@[^\s@<>()"',;:]+\.[^\s@<>()"',;:]{2,}$/;

/**
 * Personal names: letters in any script, combining marks, spaces, and the
 * punctuation real names use (' . -). Rejects <, >, quotes, braces and the
 * like, so nothing that reads as HTML or script can be stored in the CRM —
 * where back-office staff would view it — whatever the CRM does with output.
 */
export const NAME = /^[\p{L}\p{M}][\p{L}\p{M}' .’-]{0,59}$/u;

/** Trim and cap a form value; anything that isn't a string becomes "". */
export function str(v: unknown, max = 120): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}
