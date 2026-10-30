import { NextResponse } from "next/server";
import { addCustomer, FynxtConfigError } from "@/lib/fynxt";
import { RESTRICTED, findCountry } from "@/content/countries";
import { MOBILE_ERROR, checkMobile } from "@/lib/phone";
import { EMAIL, NAME, clientIp, ipCountry, rateLimited, readJson, requestHost, str } from "@/lib/request";
import { verifyTurnstile } from "@/lib/turnstile";

/**
 * Sign-up → FYNXT AddCustomer → redirect into the client portal (SSOUrl).
 *
 * Every rule the form enforces is enforced again here; the browser is never
 * trusted. Errors returned to the visitor are written for them — FYNXT's
 * raw messages and our configuration problems go to the server log only.
 *
 * Hardening (security review, 28 Oct 2026): JSON + same-origin only (CSRF),
 * 8 KB body cap, per-IP and per-email limits, names restricted to name
 * characters (no HTML reaches the CRM), and the SSO link is checked against
 * an allow-list before the browser is sent to it (see `safePortalUrl`).
 *
 * Added 30 Oct 2026: Cloudflare Turnstile bot check (verified here, before
 * FYNXT is called), sign-ups refused from restricted-country IPs, and mobile
 * numbers checked against the real numbering plan of the chosen country.
 */
export async function POST(req: Request) {
  const ip = clientIp(req);
  if (rateLimited(`signup:${ip}`, 5, 10 * 60_000)) {
    return fail(429, "Too many attempts. Please wait a few minutes and try again.");
  }

  // Restricted jurisdictions, by where the request comes from — not just by
  // the country picked on the form, which anyone can change.
  const from = ipCountry(req);
  if (from && RESTRICTED.has(from)) {
    console.warn("[signup] refused: request from restricted country", from);
    return fail(403, "We are unable to open accounts for residents of your region.");
  }

  const body = await readJson(req);
  if (typeof body === "string") {
    console.warn("[signup] rejected request:", body, ip);
    return fail(400, "Something went wrong. Please refresh the page and try again.");
  }

  // Honeypot: a field real visitors never see. Bots fill everything in.
  // Answer as if it worked so the bot learns nothing.
  if (str(body.website)) return NextResponse.json({ ok: true, redirect: null });

  const title = str(body.title);
  const firstName = str(body.firstName, 60);
  const lastName = str(body.lastName, 60);
  const email = str(body.email, 120).toLowerCase();
  const country = findCountry(str(body.country, 2));
  const mobile = country ? checkMobile(str(body.mobile, 20), country.code, country.dial) : null;

  const errors: Record<string, string> = {};
  if (title !== "Mr" && title !== "Ms") errors.title = "Choose a title.";
  if (!firstName) errors.firstName = "Enter your first name.";
  else if (!NAME.test(firstName)) errors.firstName = "Use letters only, as on your ID.";
  if (!lastName) errors.lastName = "Enter your last name.";
  else if (!NAME.test(lastName)) errors.lastName = "Use letters only, as on your ID.";
  if (!EMAIL.test(email)) errors.email = "Enter a valid email address.";
  if (!country) errors.country = "Choose your country of residence. We cannot accept clients from restricted countries.";
  if (country && !mobile?.ok) errors.mobile = MOBILE_ERROR;
  if (body.adult !== true) errors.adult = "You must be 18 or over to open an account.";
  if (body.terms !== true) errors.terms = "Please accept the Client Agreement and Privacy Policy.";
  if (body.risk !== true) errors.risk = "Please confirm you have read the risk warning.";
  if (Object.keys(errors).length || !country || !mobile?.ok) {
    return NextResponse.json({ ok: false, message: "Please check the highlighted fields.", errors }, { status: 422 });
  }

  // Per-email brake: stops one address being used to probe or spam FYNXT's
  // welcome emails from many IPs.
  if (rateLimited(`signup-email:${email}`, 3, 60 * 60_000)) {
    return fail(429, "Too many attempts. Please wait a while and try again.");
  }

  // Bot check last before FYNXT: a script that gets this far still can't
  // create a customer without solving Turnstile for every single attempt.
  const human = await verifyTurnstile(body.turnstile, ip, "signup", requestHost(req));
  if (human === "unavailable") {
    return fail(503, "Account opening is temporarily unavailable. Please try again later, or email support@elitecapital.global.");
  }
  if (human === "failed") {
    return fail(403, "We could not complete the security check. Please try again.");
  }

  try {
    const res = await addCustomer(
      {
        CustomerType: 1,
        UserName: email,
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        CountryCode: country.code.toLowerCase(),
        MobileNumber: mobile.e164,
        iSDCode: country.dial,
        Title: title as "Mr" | "Ms",
      },
      ip,
    );

    if (!res.ok) {
      console.error("[signup] AddCustomer failed:", res.message);
      if (/exist|already|duplicate|registered/i.test(res.message)) {
        // Deliberately not "this email is already a client" — that would let
        // anyone test addresses to build a list of our clients.
        return fail(409, "We could not open an account with these details. If you already have an account, please log in.");
      }
      return fail(502, "We could not open your account just now. Please try again, or email support@elitecapital.global.");
    }

    return NextResponse.json({ ok: true, redirect: res.data.ssoUrl });
  } catch (err) {
    if (err instanceof FynxtConfigError) console.error("[signup]", err.message);
    else console.error("[signup] unexpected", err);
    return fail(503, "Account opening is temporarily unavailable. Please try again later, or email support@elitecapital.global.");
  }
}

function fail(status: number, message: string) {
  return NextResponse.json({ ok: false, message }, { status, headers: { "Cache-Control": "no-store" } });
}
