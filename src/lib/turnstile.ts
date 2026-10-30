/**
 * Cloudflare Turnstile — server-side check of the bot-test token. SERVER ONLY.
 *
 * The widget in the browser only produces a token; nothing is proven until
 * Cloudflare confirms it here. Each token is single-use and expires after
 * five minutes, so a solved check can't be replayed by a script.
 *
 * Also checked: the `action` (a token earned on the login form can't be
 * spent on sign-up) and the `hostname` the widget ran on (a token earned on
 * someone else's page with our site key is refused).
 *
 * Fail closed: without TURNSTILE_SECRET_KEY, or if Cloudflare can't be
 * reached, the form is refused rather than let through unchecked.
 */

if (typeof window !== "undefined") {
  throw new Error("src/lib/turnstile.ts is server-only and must not be imported in the browser.");
}

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export type TurnstileAction = "signup" | "login";

export type TurnstileResult = "ok" | "failed" | "unavailable";

type Siteverify = {
  success: boolean;
  "error-codes"?: string[];
  action?: string;
  hostname?: string;
};

export async function verifyTurnstile(
  token: unknown,
  ip: string,
  action: TurnstileAction,
  host: string | null,
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("[turnstile] TURNSTILE_SECRET_KEY is not set. Forms are refused until it is.");
    return "unavailable";
  }
  // Real tokens are well under 2 KB; anything else is not worth a round trip.
  if (typeof token !== "string" || !token || token.length > 2048) return "failed";

  const form = new URLSearchParams({ secret, response: token });
  if (ip && ip !== "0.0.0.0") form.set("remoteip", ip);

  let body: Siteverify;
  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      body: form,
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
    body = (await res.json()) as Siteverify;
  } catch (err) {
    console.error("[turnstile] could not reach Cloudflare", err);
    return "unavailable";
  }

  if (!body.success) {
    const codes = body["error-codes"] ?? [];
    // Our own configuration, not the visitor: say so loudly in the log.
    if (codes.includes("invalid-input-secret") || codes.includes("missing-input-secret")) {
      console.error("[turnstile] Cloudflare rejected TURNSTILE_SECRET_KEY:", codes.join(", "));
      return "unavailable";
    }
    console.warn(`[turnstile] ${action} token refused:`, codes.join(", ") || "no reason given");
    return "failed";
  }
  if (body.action !== action) {
    console.warn(`[turnstile] token for "${body.action}" used on ${action}`);
    return "failed";
  }
  const expected = host?.split(":")[0].toLowerCase();
  if (expected && body.hostname && body.hostname.toLowerCase() !== expected) {
    console.warn(`[turnstile] token solved on ${body.hostname}, used on ${expected}`);
    return "failed";
  }
  return "ok";
}
