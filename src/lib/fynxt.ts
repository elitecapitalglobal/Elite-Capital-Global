/**
 * FYNXT CRM — External API client. SERVER ONLY.
 *
 * Imported by the route handlers under `src/app/api/auth/` and nowhere else.
 * It reads secrets from the environment, so it must never be imported into a
 * client component; the guard below makes that fail loudly rather than
 * silently shipping an empty config to the browser.
 *
 * The two documented endpoints ("FYNXT – External API Documentation"):
 *
 *   POST {FYNXT_API_URL}/api/ExternalApi/Login         JSON
 *        headers ip_address, ClientId, SecretKey · body UserName, Password
 *        → { Status: 0, Data: { AccessToken, UserId, ... } }
 *
 *   POST {FYNXT_API_URL}/api/ExternalApi/AddCustomer   JSON
 *        headers ClientId, SecretKey (no Bearer token, despite the docs)
 *        → { Status: 0, UserId, SSOUrl }
 *
 * Verified against the live API on 28 Oct 2026 (with a deliberately fake
 * account): it lives at https://api.elitecapital.global — not the portal
 * host, which answers these paths with a 302 to its 404 page — and Login
 * takes JSON. Form-urlencoded, as the documentation says, gets HTTP 415; the
 * JSON in the documentation's own screenshot is what works.
 *
 * `Status` is FYNXT's own result code: 0 = success, 1 = failure. HTTP 200
 * does not mean success on its own.
 *
 * ClientId and SecretKey are mandatory on every request, Login included
 * (confirmed by the client on 29 Oct 2026, matching the docs' "mandatory
 * for every request").
 */

if (typeof window !== "undefined") {
  throw new Error("src/lib/fynxt.ts is server-only and must not be imported in the browser.");
}

type Envelope<T> = { Message?: string; Status?: number } & T;

export type LoginData = {
  UserId: number;
  FirstName: string | null;
  LastName: string | null;
  CountryCode: string | null;
  AccessToken: string;
  UserName: string;
  IsAPI: boolean | null;
};

export type NewCustomer = {
  CustomerType: 1 | 3;
  UserName: string;
  FirstName: string;
  LastName: string;
  Email: string;
  CountryCode: string;
  MobileNumber: string;
  iSDCode: string;
  Title: "Mr" | "Ms";
};

export type Result<T> = { ok: true; data: T } | { ok: false; message: string; status?: number };

/** Thrown for configuration problems — these are ours to fix, not the visitor's. */
export class FynxtConfigError extends Error {}

type Setting = "apiUrl" | "clientId" | "secretKey";

/** Reads settings; every call needs all three. Nothing runs half-configured. */
function config<K extends Setting>(required: readonly K[]) {
  // One base URL for both endpoints (https://api.elitecapital.global).
  const apiUrl = process.env.FYNXT_API_URL?.replace(/\/+$/, "");
  const cfg: Record<Setting, string | undefined> = {
    apiUrl,
    clientId: process.env.FYNXT_CLIENT_ID,
    secretKey: process.env.FYNXT_SECRET_KEY,
  };
  const missing = required.filter((k) => !cfg[k]);
  if (missing.length) {
    throw new FynxtConfigError(`FYNXT is not configured. Missing: ${missing.join(", ")}. See .env.example.`);
  }
  if (apiUrl) assertEncrypted(apiUrl);
  return cfg as Record<K, string> & Record<Exclude<Setting, K>, string | undefined>;
}

/**
 * Transport encryption is the only encryption the FYNXT API offers (its
 * documentation specifies no payload encryption or request signing), so it
 * is enforced here rather than trusted to configuration:
 *
 * - The base URLs must be https. Plain http is allowed only for localhost,
 *   for local testing against a stand-in server.
 * - Certificate checking must be on. Node verifies TLS certificates by
 *   default; NODE_TLS_REJECT_UNAUTHORIZED=0 turns that off and would let
 *   anyone in the network path read the API password, SecretKey and every
 *   client's password. We refuse to run like that.
 */
function assertEncrypted(base: string) {
  let url: URL;
  try {
    url = new URL(base);
  } catch {
    throw new FynxtConfigError(`FYNXT URL is not a valid URL: ${base}`);
  }
  const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  if (url.protocol !== "https:" && !local) {
    throw new FynxtConfigError(`FYNXT URL must use https (got ${url.protocol}//${url.host}).`);
  }
  if (process.env.NODE_TLS_REJECT_UNAUTHORIZED === "0") {
    throw new FynxtConfigError("NODE_TLS_REJECT_UNAUTHORIZED=0 disables certificate checks. Remove it.");
  }
}

const TIMEOUT_MS = 15_000;

async function call<T>(url: string, init: RequestInit): Promise<Result<Envelope<T>>> {
  const started = Date.now();
  let res: Response;
  try {
    // redirect: "manual" — the API never redirects. A redirect means the URL
    // is wrong (e.g. pointed at the portal host), and following it silently
    // turns a configuration mistake into an HTML page that looks like a
    // failed login.
    res = await fetch(url, {
      ...init,
      cache: "no-store",
      redirect: "manual",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (err) {
    debugLog(url, init, null, String(err), Date.now() - started);
    console.error("[fynxt] network error", url, err);
    return { ok: false, message: "network", status: 502 };
  }

  const raw = await res.text().catch(() => "");
  debugLog(url, init, res, raw, Date.now() - started);

  if (res.status >= 300 && res.status < 400) {
    console.error(`[fynxt] ${url} redirected (${res.status} → ${res.headers.get("location")}). Wrong FYNXT URL? The API host is api.elitecapital.global.`);
    return { ok: false, message: "redirected", status: 502 };
  }

  let body: Envelope<T> | null = null;
  try {
    body = JSON.parse(raw) as Envelope<T>;
  } catch {
    // Non-JSON body (HTML error page, empty response, …).
  }

  if (!body) {
    console.error(`[fynxt] ${url} answered HTTP ${res.status} with a non-JSON body. Wrong URL or content type?`);
    // Our side or theirs is misconfigured — never report it as bad credentials.
    return { ok: false, message: "bad_response", status: 502 };
  }
  if (!res.ok) {
    console.error("[fynxt] HTTP", res.status, url, body.Message ?? (body as { title?: string }).title);
    return { ok: false, message: body.Message ?? `http_${res.status}`, status: res.status };
  }
  if (body.Status !== 0) {
    // FYNXT's own refusal (Status 1), e.g. wrong credentials. Status 200 marks
    // it as a genuine answer rather than a fault.
    return { ok: false, message: body.Message ?? "failed", status: 200 };
  }
  return { ok: true, data: body };
}

/** Login with a client's own email and password (the site's Log In form). */
export async function login(
  username: string,
  password: string,
  ip: string,
): Promise<Result<LoginData>> {
  const cfg = config(["apiUrl", "clientId", "secretKey"]);
  const res = await call<{ Data?: LoginData }>(`${cfg.apiUrl}/api/ExternalApi/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ip_address: ip,
      ClientId: cfg.clientId,
      SecretKey: cfg.secretKey,
    },
    body: JSON.stringify({ UserName: username, Password: password }),
  });
  if (!res.ok) return res;
  if (!res.data.Data?.AccessToken) return { ok: false, message: "FYNXT said Success but returned no AccessToken", status: 200 };
  return { ok: true, data: res.data.Data };
}

/**
 * Create a customer. A standalone call: no Login and no Bearer token, just
 * ClientId and SecretKey (confirmed by the client and against the live API on
 * 30 Oct 2026, which validates the fields with no token).
 */
export async function addCustomer(
  customer: NewCustomer,
  ip: string,
): Promise<Result<{ userId: string; ssoUrl: string | null }>> {
  const cfg = config(["apiUrl", "clientId", "secretKey"]);

  const res = await call<{ UserId?: string | number; SSOUrl?: string }>(
    `${cfg.apiUrl}/api/ExternalApi/AddCustomer`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ClientId: cfg.clientId,
        SecretKey: cfg.secretKey,
        ip_address: ip,
      },
      body: JSON.stringify(customer),
    },
  );
  if (!res.ok) return res;

  return {
    ok: true,
    data: {
      userId: String(res.data.UserId ?? ""),
      ssoUrl: safePortalUrl(res.data.SSOUrl),
    },
  };
}

/**
 * Hosts the browser may be sent to after sign-up or log-in.
 *
 * Whatever comes back from FYNXT is handed to `window.location`, so it is
 * treated as untrusted: a misconfigured or compromised CRM returning
 * `javascript:…` would run script on elitecapital.global, and any other
 * https URL would send a brand-new client to a look-alike site.
 *
 * Allowed: https only, and only these hosts — FYNXT_PORTAL_HOSTS
 * (comma-separated) plus the host of FYNXT_PORTAL_SSO_URL. With neither set
 * nothing is allowed (fail closed); sign-up then still succeeds and the
 * client is told to use the login details FYNXT emails them.
 */
function allowedHosts(): Set<string> {
  const hosts = (process.env.FYNXT_PORTAL_HOSTS ?? "")
    .split(",")
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean);
  try {
    if (process.env.FYNXT_PORTAL_SSO_URL) {
      hosts.push(new URL(process.env.FYNXT_PORTAL_SSO_URL.replace(/\{\w+\}/g, "x")).host.toLowerCase());
    }
  } catch {
    // An unparsable template is reported where it is used, in portalUrlFor.
  }
  return new Set(hosts);
}

export function safePortalUrl(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    console.error("[fynxt] rejected unparsable portal URL");
    return null;
  }
  if (url.protocol !== "https:" || !allowedHosts().has(url.host.toLowerCase())) {
    console.error("[fynxt] rejected portal URL outside the allow-list:", url.protocol, url.host);
    return null;
  }
  return url.toString();
}

/**
 * Where a client goes after a successful Log In.
 *
 * The API documentation has no endpoint that turns a login into a portal
 * session, so the URL is a template set in the environment once FYNXT
 * confirms the format, e.g.
 *   FYNXT_PORTAL_SSO_URL=https://portal.example.com/Home/Auth?auth={token}
 * `{token}` is replaced with the AccessToken from Login; `{userId}` with the
 * client's UserId. Returns null while it is not configured.
 */
export function portalUrlFor(login: LoginData): string | null {
  const template = process.env.FYNXT_PORTAL_SSO_URL;
  if (!template) return null;
  return safePortalUrl(
    template
      .replaceAll("{token}", encodeURIComponent(login.AccessToken))
      .replaceAll("{userId}", encodeURIComponent(String(login.UserId))),
  );
}

/* ------------------------------------------------------------------------ */
/* Debug log — for sharing with FYNXT support                               */
/* ------------------------------------------------------------------------ */

/**
 * With FYNXT_DEBUG=1, every request to FYNXT is printed as one block that can
 * be copied straight into a support ticket: time (UTC), endpoint, headers,
 * body, status, duration, and the IDs FYNXT can trace on their side
 * (Cloudflare `cf-ray`, ASP.NET `traceId`).
 *
 * Secrets are always redacted, so the block is safe to send:
 *   Password → [hidden] · SecretKey → [hidden] · ClientId → first/last 4
 *   Bearer token and AccessToken → length only · SSO `auth=` → [hidden]
 * The username is shown — FYNXT needs it to find the attempt.
 *
 * Ignored in production builds whatever FYNXT_DEBUG says: bodies carry
 * clients' names, emails and phone numbers, which must not end up in hosting
 * logs because someone left a switch on.
 */
function debugLog(url: string, init: RequestInit, res: Response | null, raw: string, ms: number) {
  if (process.env.FYNXT_DEBUG !== "1" || process.env.NODE_ENV === "production") return;

  const headers = Object.entries((init.headers ?? {}) as Record<string, string>)
    .map(([k, v]) => `    ${k}: ${redactHeader(k, v)}`)
    .join("\n");

  const lines = [
    "",
    "──────────────── FYNXT API call ────────────────",
    `Time (UTC):  ${new Date(Date.now() - ms).toISOString()}`,
    `Request:     ${init.method ?? "GET"} ${url}`,
    "Headers:",
    headers,
    `Body:        ${redactJson(typeof init.body === "string" ? init.body : "")}`,
    "",
  ];
  if (res) {
    let traceId = "";
    try {
      traceId = JSON.parse(raw)?.traceId ?? "";
    } catch {}
    lines.push(
      `Response:    HTTP ${res.status} ${res.statusText} (${ms} ms)`,
      `Content-Type: ${res.headers.get("content-type") ?? "-"}`,
      `cf-ray:      ${res.headers.get("cf-ray") ?? "-"}`,
      ...(traceId ? [`traceId:     ${traceId}`] : []),
      ...(res.headers.get("location") ? [`Location:    ${res.headers.get("location")}`] : []),
      `Body:        ${redactJson(raw).slice(0, 2000)}`,
    );
  } else {
    lines.push(`Response:    none — ${raw} (${ms} ms)`);
  }
  lines.push("────────────────────────────────────────────────", "");
  console.log(lines.join("\n"));
}

function redactHeader(name: string, value: string): string {
  const n = name.toLowerCase();
  if (n === "secretkey") return "[hidden]";
  if (n === "clientid") return value.length > 10 ? `${value.slice(0, 4)}…${value.slice(-4)} (${value.length} chars)` : "[hidden]";
  if (n === "authorization") return `Bearer [hidden, ${value.replace(/^Bearer\s+/i, "").length} chars]`;
  return value;
}

const SECRET_KEYS = /^(password|accesstoken|secretkey|clientid)$/i;

function redactJson(text: string): string {
  if (!text) return "(empty)";
  try {
    return JSON.stringify(
      JSON.parse(text),
      (key, value) => {
        if (SECRET_KEYS.test(key) && typeof value === "string") {
          return key.toLowerCase() === "accesstoken" ? `[hidden, ${value.length} chars]` : "[hidden]";
        }
        if (key === "SSOUrl" && typeof value === "string") return value.replace(/auth=[^&]+/i, "auth=[hidden]");
        return value;
      },
    );
  } catch {
    return `(not JSON) ${text.replace(/\s+/g, " ").slice(0, 300)}`;
  }
}
