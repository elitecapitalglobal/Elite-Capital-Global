import { NextResponse } from "next/server";
import { FynxtConfigError, login, portalUrlFor } from "@/lib/fynxt";
import { EMAIL, clientIp, rateLimited, readJson, requestHost, str } from "@/lib/request";
import { verifyTurnstile } from "@/lib/turnstile";

/**
 * Log In → FYNXT Login (with the client's own credentials) → portal SSO.
 *
 * The password is passed straight through to FYNXT and never stored or
 * logged. A wrong email and a wrong password get the same answer, so the
 * form can't be used to discover which emails have accounts.
 *
 * Hardening (security review, 28 Oct 2026): JSON + same-origin only (CSRF),
 * 8 KB body cap, a per-IP limit AND a per-account limit (password guessing
 * spread across many IPs still hits the account's own ceiling), and the
 * portal link is allow-listed before the browser is sent to it.
 *
 * Added 30 Oct 2026: a Cloudflare Turnstile check on every attempt, so
 * password lists can't be run against the form by a script. With bots
 * handled there, the per-account ceiling is set for humans: 10 tries in 10
 * minutes, which also keeps the time a real client can be locked out short.
 *
 * The redirect needs FYNXT_PORTAL_SSO_URL (see `portalUrlFor`). Until FYNXT
 * confirms that format the route answers 503 with a plain explanation rather
 * than sending the client somewhere that might not work.
 */
export async function POST(req: Request) {
  const ip = clientIp(req);
  if (rateLimited(`login:${ip}`, 10, 10 * 60_000)) {
    return fail(429, "Too many attempts. Please wait a few minutes and try again.");
  }

  const body = await readJson(req);
  if (typeof body === "string") {
    console.warn("[login] rejected request:", body, ip);
    return fail(400, "Something went wrong. Please refresh the page and try again.");
  }

  const email = str(body.email, 120).toLowerCase();
  // Not trimmed: spaces can be part of a password.
  const password = typeof body.password === "string" ? body.password.slice(0, 200) : "";
  if (!EMAIL.test(email) || !password) {
    return fail(422, "Enter your email address and password.");
  }

  // Per-account ceiling: 10 tries in 10 minutes, whichever IPs they come from.
  if (rateLimited(`login-email:${email}`, 10, 10 * 60_000)) {
    return fail(429, "Too many attempts for this account. Please wait 10 minutes, or use “Forgotten your password?” to reset it.");
  }

  const human = await verifyTurnstile(body.turnstile, ip, "login", requestHost(req));
  if (human === "unavailable") return fail(503, "Log in is temporarily unavailable. Please try again later.");
  if (human === "failed") return fail(403, "We could not complete the security check. Please try again.");

  try {
    const res = await login(email, password, ip);
    if (!res.ok) {
      if (res.message === "network" || (res.status ?? 0) >= 500) {
        return fail(502, "We could not reach the client portal. Please try again in a moment.");
      }
      // Log FYNXT's own reason (never the password; email masked) so a
      // refusal for bad keys or a disallowed account isn't mistaken for a
      // typo. The visitor still gets one neutral message either way.
      console.warn(`[login] FYNXT refused ${maskEmail(email)} (HTTP ${res.status}): ${res.message}`);
      return fail(401, "The email address or password is incorrect.");
    }

    const redirect = portalUrlFor(res.data);
    if (!redirect) {
      console.error("[login] no allowed portal URL — check FYNXT_PORTAL_SSO_URL / FYNXT_PORTAL_HOSTS.");
      return fail(503, "Your details are correct, but portal sign-in is not available yet. Please try again later, or contact support@elitecapital.global.");
    }
    return NextResponse.json({ ok: true, redirect }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    if (err instanceof FynxtConfigError) console.error("[login]", err.message);
    else console.error("[login] unexpected", err);
    return fail(503, "Log in is temporarily unavailable. Please try again later.");
  }
}

function fail(status: number, message: string) {
  return NextResponse.json({ ok: false, message }, { status, headers: { "Cache-Control": "no-store" } });
}

/** "jane.doe@example.com" → "ja***@example.com" — enough to tell attempts apart in the log. */
function maskEmail(email: string) {
  const [user, domain] = email.split("@");
  return `${user.slice(0, 2)}***@${domain}`;
}
