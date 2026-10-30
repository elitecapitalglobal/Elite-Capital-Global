"use client";

import { useCallback, useRef, useState, type FormEvent } from "react";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import { countries } from "@/content/countries";
import { MOBILE_ERROR, checkMobile } from "@/lib/phone";
import { Choice, Consent, FloatField, FloatSelect, FormAlert, Primary } from "@/components/auth/Fields";
import { Turnstile, turnstileWaitMessage, type TurnstileState } from "@/components/auth/Turnstile";

type Key = "title" | "firstName" | "lastName" | "email" | "country" | "mobile" | "adult" | "terms" | "risk";
type Errors = Partial<Record<Key, string>>;

const STEPS = [
  { label: "You", keys: ["title", "firstName", "lastName"] },
  { label: "Contact", keys: ["email", "country", "mobile"] },
  { label: "Agreement", keys: ["adult", "terms", "risk"] },
] as const satisfies readonly { label: string; keys: readonly Key[] }[];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME = /^[\p{L}\p{M}][\p{L}\p{M}' .’-]{0,59}$/u;

/** The server already allow-lists the portal host; never follow anything but https here either. */
const isHttps = (u: unknown): u is string => typeof u === "string" && /^https:\/\//i.test(u);

/**
 * Three quiet steps — You, Contact, Agreement — instead of one long form.
 * Each step is checked before moving on (with the same rules and wording the
 * server uses); the server still re-checks everything, and if it rejects a
 * field the form returns to the step that field lives on.
 *
 * On success there is a brief welcome before the portal opens, so the
 * moment of joining is marked rather than lost in a redirect.
 */
export function SignupForm() {
  const [step, setStep] = useState(0);
  const [v, setV] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    mobile: "",
    adult: false,
    terms: false,
    risk: false,
    website: "", // honeypot
  });
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState<"form" | "welcome" | "emailed">("form");
  const [human, setHuman] = useState<TurnstileState>({ token: null, failed: false });
  const [resetKey, setResetKey] = useState(0);
  const onHuman = useCallback((s: TurnstileState) => setHuman(s), []);
  const top = useRef<HTMLDivElement>(null);

  const set = <K extends keyof typeof v>(k: K, val: (typeof v)[K]) => {
    setV((s) => ({ ...s, [k]: val }));
    if (errors[k as Key]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const country = countries.find((c) => c.code === v.country);

  function check(keys: readonly Key[]): Errors {
    const e: Errors = {};
    for (const k of keys) {
      if (k === "title" && !v.title) e.title = "Choose a title.";
      if (k === "firstName") {
        if (!v.firstName.trim()) e.firstName = "Enter your first name.";
        else if (!NAME.test(v.firstName.trim())) e.firstName = "Use letters only, as on your ID.";
      }
      if (k === "lastName") {
        if (!v.lastName.trim()) e.lastName = "Enter your last name.";
        else if (!NAME.test(v.lastName.trim())) e.lastName = "Use letters only, as on your ID.";
      }
      if (k === "email" && !EMAIL.test(v.email.trim())) e.email = "Enter a valid email address.";
      if (k === "country" && !v.country) e.country = "Choose your country of residence.";
      if (k === "mobile" && !(country && checkMobile(v.mobile, country.code, country.dial).ok)) e.mobile = MOBILE_ERROR;
      if (k === "adult" && !v.adult) e.adult = "You must be 18 or over to open an account.";
      if (k === "terms" && !v.terms) e.terms = "Please accept the Client Agreement and Privacy Policy.";
      if (k === "risk" && !v.risk) e.risk = "Please confirm you have read the risk warning.";
    }
    return e;
  }

  function go(to: number) {
    setStep(to);
    setMessage(null);
    top.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  function next() {
    const e = check(STEPS[step].keys);
    setErrors(e);
    if (Object.keys(e).length === 0) go(step + 1);
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (step < STEPS.length - 1) return next();
    const e = check(STEPS[step].keys);
    setErrors(e);
    if (Object.keys(e).length) return;
    if (!human.token) return setMessage(turnstileWaitMessage(human.failed));

    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, turnstile: human.token }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        if (isHttps(data.redirect)) {
          setStage("welcome");
          setTimeout(() => window.location.assign(data.redirect), 1800);
        } else {
          setStage("emailed");
        }
        return;
      }
      const errs: Errors = data.errors ?? {};
      setErrors(errs);
      const at = STEPS.findIndex((s) => s.keys.some((k) => errs[k]));
      if (at >= 0) setStep(at);
      setMessage(data.message ?? "Something went wrong. Please try again.");
    } catch {
      setMessage("We could not connect. Check your internet connection and try again.");
    }
    // The token was spent (or may have been); get a fresh one for the next try.
    setResetKey((k) => k + 1);
    setBusy(false);
  }

  if (stage !== "form") {
    return (
      <div className="ec-rise py-6 text-center" role="status">
        <span className="mx-auto grid size-16 place-items-center rounded-full border border-blue-400/40 bg-blue-400/10 text-blue-400">
          <svg width="26" height="26" viewBox="0 0 14 14" aria-hidden>
            <path d="M2.5 7.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="type-serif mt-7 text-[clamp(2rem,3.4vw,2.6rem)] leading-tight">
          Welcome, {v.firstName.trim() || "and thank you"}.
        </h2>
        {stage === "welcome" ? (
          <p className="mx-auto mt-4 max-w-[34ch] text-[15.5px] leading-relaxed text-ink-300">
            Your account is ready. We&apos;re taking you to your client portal now.
          </p>
        ) : (
          <p className="mx-auto mt-4 max-w-[38ch] text-[15.5px] leading-relaxed text-ink-300">
            Your account has been created. We have sent your login details to{" "}
            <span className="text-ink-100">{v.email.trim()}</span>. If it hasn&apos;t arrived in a few minutes, check your
            spam folder or write to support@elitecapital.global.
          </p>
        )}
        {stage === "welcome" && (
          <div className="mx-auto mt-8 h-px w-40 overflow-hidden bg-ink-100/10">
            <i className="block h-full w-full origin-left animate-[ec-fill_1.8s_var(--ease-out-expo)_both] bg-blue-400" />
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div ref={top} className="scroll-mt-32">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="type-serif text-[26px] leading-tight">Open your account</h2>
          <span className="num text-[12px] text-ink-300/60">
            {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
          </span>
        </div>

        {/* Progress — three hairlines that fill as you go. */}
        <ol className="mt-6 grid grid-cols-3 gap-3" aria-label="Progress">
          {STEPS.map((s, i) => (
            <li key={s.label} aria-current={i === step ? "step" : undefined}>
              <button
                type="button"
                disabled={i > step}
                onClick={() => i < step && go(i)}
                className="group w-full text-left disabled:cursor-default"
              >
                <span className="block h-px overflow-hidden bg-ink-100/12">
                  <i
                    className={`block h-full origin-left bg-blue-400 transition-transform duration-700 ease-[var(--ease-out-expo)] ${
                      i <= step ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </span>
                <span
                  className={`mt-2.5 block text-[11px] tracking-[0.18em] uppercase transition-colors ${
                    i === step ? "text-ink-100" : i < step ? "text-ink-300 group-hover:text-blue-400" : "text-ink-300/40"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-9 grid gap-7">
        {message && <FormAlert>{message}</FormAlert>}

        {step === 0 && (
          <div key="s0" className="ec-rise grid gap-7">
            <Choice name="title" legend="Title" options={["Mr", "Ms"]} value={v.title} onChange={(x) => set("title", x)} error={errors.title} />
            <div className="grid gap-7 sm:grid-cols-2">
              <FloatField id="firstName" label="First name" value={v.firstName} onChange={(e) => set("firstName", e.target.value)} error={errors.firstName} autoComplete="given-name" autoFocus />
              <FloatField id="lastName" label="Last name" value={v.lastName} onChange={(e) => set("lastName", e.target.value)} error={errors.lastName} autoComplete="family-name" />
            </div>
          </div>
        )}

        {step === 1 && (
          <div key="s1" className="ec-rise grid gap-7">
            <FloatField id="email" type="email" label="Email address" value={v.email} onChange={(e) => set("email", e.target.value)} error={errors.email} hint="This is also your username. We send your login details here." autoComplete="email" inputMode="email" autoFocus />
            <FloatSelect id="country" label="Country of residence" value={v.country} onChange={(e) => set("country", e.target.value)} error={errors.country} autoComplete="country">
              <option value="" disabled>
                Select your country
              </option>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </FloatSelect>
            <div className="grid grid-cols-[72px_minmax(0,1fr)] items-start gap-4">
              <div className="flex h-[60px] items-end border-b border-ink-100/18 pb-[9px]">
                <span className="num text-[18px] text-ink-300">{country ? `+${country.dial}` : "+"}</span>
              </div>
              <FloatField id="mobile" type="tel" label="Mobile number" value={v.mobile} onChange={(e) => set("mobile", e.target.value)} error={errors.mobile} hint="We may send your one-time passwords here." autoComplete="tel-national" inputMode="tel" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div key="s2" className="ec-rise grid gap-7">
            {/* Review — a last look before anything is sent. */}
            <dl className="grid gap-px overflow-hidden rounded-[18px] border border-ink-100/10 text-[14.5px]">
              {[
                ["Name", `${v.title} ${v.firstName} ${v.lastName}`.trim(), 0],
                ["Email", v.email, 1],
                ["Country", country?.name ?? "", 1],
                ["Mobile", country ? `+${country.dial} ${v.mobile}` : v.mobile, 1],
              ].map(([k, val, s]) => (
                <div key={k as string} className="flex items-center justify-between gap-4 bg-ink-100/[0.03] px-5 py-3.5">
                  <dt className="text-[11px] tracking-[0.16em] text-ink-300/60 uppercase">{k}</dt>
                  <dd className="flex min-w-0 items-center gap-3">
                    <span className="truncate text-ink-100">{val}</span>
                    <button type="button" onClick={() => go(s as number)} className="shrink-0 text-[12.5px] text-blue-400 underline-offset-4 hover:underline">
                      Edit
                    </button>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="grid gap-3">
              <Consent id="adult" checked={v.adult} onChange={(x) => set("adult", x)} error={errors.adult}>
                I am 18 or over.
              </Consent>
              <Consent id="terms" checked={v.terms} onChange={(x) => set("terms", x)} error={errors.terms}>
                I have read and accept the{" "}
                <Link href="/legal/client-agreement" target="_blank" className="text-ink-100 underline decoration-blue-400/60 underline-offset-4 hover:decoration-blue-400">
                  Client Agreement
                </Link>{" "}
                and the{" "}
                <Link href="/legal/privacy-policy" target="_blank" className="text-ink-100 underline decoration-blue-400/60 underline-offset-4 hover:decoration-blue-400">
                  Privacy Policy
                </Link>
                .
              </Consent>
              <Consent id="risk" checked={v.risk} onChange={(x) => set("risk", x)} error={errors.risk}>
                I understand that CFDs are complex, leveraged products and that I could lose all the money I deposit, and I have read the{" "}
                <Link href="/legal/risk-disclosure" target="_blank" className="text-ink-100 underline decoration-blue-400/60 underline-offset-4 hover:decoration-blue-400">
                  Risk Disclosure Notice
                </Link>
                .
              </Consent>
            </div>

            {/* Bot check — usually invisible; runs while the consents are read. */}
            <Turnstile action="signup" resetKey={resetKey} onChange={onHuman} />
          </div>
        )}

        {/* Honeypot — hidden from people and from assistive tech. */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">Website</label>
          <input id="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set("website", e.target.value)} />
        </div>

        <div className="mt-2 grid gap-4">
          <Primary busy={busy}>
            {step < STEPS.length - 1 ? "Continue" : busy ? "Opening your account…" : "Open my account"}
          </Primary>
          {step > 0 && (
            <button type="button" onClick={() => go(step - 1)} className="mx-auto min-h-11 px-4 text-[14px] text-ink-300 transition-colors hover:text-ink-100">
              &larr; Back
            </button>
          )}
        </div>

        <p className="border-t border-ink-100/10 pt-6 text-center text-[14px] text-ink-300/80">
          Already a client?{" "}
          <Link href="/login" className="text-ink-100 underline decoration-blue-400/60 underline-offset-4 hover:decoration-blue-400">
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
}
