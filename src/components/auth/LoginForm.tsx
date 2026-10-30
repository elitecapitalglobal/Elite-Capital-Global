"use client";

import { useCallback, useState, type FormEvent } from "react";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import { FloatField, FormAlert, Primary } from "@/components/auth/Fields";
import { Turnstile, turnstileWaitMessage, type TurnstileState } from "@/components/auth/Turnstile";

/**
 * Posts to /api/auth/login; on success the browser is handed to the client
 * portal. The password lives only in this component's state until submit and
 * is cleared after every failed attempt.
 */
export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [human, setHuman] = useState<TurnstileState>({ token: null, failed: false });
  const [resetKey, setResetKey] = useState(0);
  const onHuman = useCallback((s: TurnstileState) => setHuman(s), []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!human.token) return setMessage(turnstileWaitMessage(human.failed));
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, turnstile: human.token }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok && typeof data.redirect === "string" && /^https:\/\//i.test(data.redirect)) {
        window.location.assign(data.redirect);
        return; // stay busy while the portal loads
      }
      setMessage(data.message ?? "Something went wrong. Please try again.");
    } catch {
      setMessage("We could not connect. Check your internet connection and try again.");
    }
    setPassword("");
    setResetKey((k) => k + 1); // tokens are single-use
    setBusy(false);
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className="type-serif text-[26px] leading-tight">Log in</h2>
      <p className="mt-2 text-[14.5px] text-ink-300/80">Use the email address and password for your client portal.</p>

      <div className="mt-9 grid gap-7">
        {message && <FormAlert>{message}</FormAlert>}

        <FloatField id="email" type="email" label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" inputMode="email" required />

        <div className="relative">
          <FloatField id="password" type={show ? "text" : "password"} label="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-pressed={show}
            aria-controls="password"
            className="absolute right-0 bottom-1 min-h-11 px-1 text-[11px] tracking-[0.16em] text-ink-300 uppercase transition-colors hover:text-blue-400"
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>

        <div className="-mt-3 text-right">
          <a href="mailto:support@elitecapital.global?subject=Password%20reset" className="text-[13.5px] text-ink-300 underline-offset-4 transition-colors hover:text-ink-100 hover:underline">
            Forgotten your password?
          </a>
        </div>

        <Turnstile action="login" resetKey={resetKey} onChange={onHuman} />

        <Primary busy={busy}>{busy ? "Logging in…" : "Log in"}</Primary>

        <p className="border-t border-ink-100/10 pt-6 text-center text-[14px] text-ink-300/80">
          New to Elite fx Capital?{" "}
          <Link href="/signup" className="text-ink-100 underline decoration-blue-400/60 underline-offset-4 hover:decoration-blue-400">
            Open an account
          </Link>
        </p>
      </div>
    </form>
  );
}
