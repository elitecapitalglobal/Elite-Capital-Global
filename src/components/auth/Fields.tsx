import type { ComponentProps, ReactNode } from "react";

/**
 * Form primitives for the sign-up and log-in pages, drawn for an obsidian
 * ground: underline fields with a label that floats up on focus, a line of
 * light that draws across on focus, and quiet error text beneath.
 *
 * Accessibility is not traded for the look: every control keeps a real
 * <label>, errors are tied to their control with aria-describedby, and hit
 * areas stay at least 44px tall.
 */

const LINE =
  "pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-blue-400 transition-transform duration-700 ease-[var(--ease-out-expo)] peer-focus:scale-x-100";

export function FloatField({
  id,
  label,
  error,
  hint,
  className = "",
  ...props
}: ComponentProps<"input"> & { id: string; label: string; error?: string; hint?: string }) {
  return (
    <div className={className}>
      <div className="relative">
        <input
          id={id}
          placeholder=" "
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className="peer h-[60px] w-full border-0 border-b border-ink-100/18 bg-transparent px-0 pt-5 text-[18px] focus-visible:outline-none text-ink-100 caret-blue-400 outline-none transition-colors aria-[invalid=true]:border-ask/70 [&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-ink-100)] [&:-webkit-autofill]:[transition:background-color_9999s]"
          {...props}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute top-[26px] left-0 origin-left text-[16px] text-ink-300/80 transition-all duration-300 ease-[var(--ease-out-expo)] peer-focus:top-1 peer-focus:text-[11px] peer-focus:tracking-[0.16em] peer-focus:text-blue-400 peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:tracking-[0.16em] peer-[:not(:placeholder-shown)]:uppercase"
        >
          {label}
        </label>
        <span aria-hidden className={LINE} />
      </div>
      <Note id={id} error={error} hint={hint} />
    </div>
  );
}

export function FloatSelect({
  id,
  label,
  error,
  children,
  className = "",
  ...props
}: ComponentProps<"select"> & { id: string; label: string; error?: string }) {
  return (
    <div className={className}>
      <div className="relative">
        <label htmlFor={id} className="pointer-events-none absolute top-1 left-0 text-[11px] tracking-[0.16em] text-ink-300/80 uppercase">
          {label}
        </label>
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="peer h-[60px] w-full appearance-none focus-visible:outline-none border-0 border-b border-ink-100/18 bg-transparent px-0 pt-5 pe-8 text-[18px] text-ink-100 outline-none aria-[invalid=true]:border-ask/70 [&>option]:bg-navy-900 [&>option]:text-ink-100"
          {...props}
        >
          {children}
        </select>
        <svg aria-hidden width="12" height="8" viewBox="0 0 12 8" className="pointer-events-none absolute right-1 bottom-5 text-ink-300">
          <path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <span aria-hidden className={LINE} />
      </div>
      <Note id={id} error={error} />
    </div>
  );
}

function Note({ id, error, hint }: { id: string; error?: string; hint?: string }) {
  if (error)
    return (
      <p id={`${id}-error`} className="mt-2 text-[13px] text-[#f08a82]">
        {error}
      </p>
    );
  if (hint)
    return (
      <p id={`${id}-hint`} className="mt-2 text-[13px] text-ink-300/60">
        {hint}
      </p>
    );
  return null;
}

/** A pair of pill choices — used for Title. Native radios underneath. */
export function Choice({
  name,
  legend,
  options,
  value,
  onChange,
  error,
}: {
  name: string;
  legend: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="text-[11px] tracking-[0.16em] text-ink-300/80 uppercase">{legend}</legend>
      <div className="mt-3 flex gap-2">
        {options.map((o) => (
          <label key={o} className="relative cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o}
              checked={value === o}
              onChange={() => onChange(o)}
              className="peer sr-only"
            />
            <span className="flex min-h-11 min-w-20 items-center justify-center rounded-pill border border-ink-100/18 px-5 text-[15px] text-ink-300 transition-all duration-300 peer-checked:border-blue-400 peer-checked:bg-blue-400/10 peer-checked:text-ink-100 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-400 hover:border-ink-100/40">
              {o}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-2 text-[13px] text-[#f08a82]">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function Consent({
  id,
  checked,
  onChange,
  error,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="group flex cursor-pointer items-start gap-4 py-1 text-[15px] leading-relaxed text-ink-300">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="peer sr-only"
        />
        <span
          aria-hidden
          className="mt-0.5 grid size-[22px] shrink-0 place-items-center rounded-[7px] border border-ink-100/25 text-navy-950 transition-all duration-300 group-hover:border-ink-100/50 peer-checked:border-blue-400 peer-checked:bg-blue-400 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-400 [&>svg]:scale-50 [&>svg]:opacity-0 peer-checked:[&>svg]:scale-100 peer-checked:[&>svg]:opacity-100"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" className="transition-all duration-300">
            <path d="M2.5 7.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="peer-checked:text-ink-100">{children}</span>
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-1 ps-[38px] text-[13px] text-[#f08a82]">
          {error}
        </p>
      )}
    </div>
  );
}

export function FormAlert({ children }: { children: ReactNode }) {
  return (
    <div role="alert" className="rounded-inner border border-ask/30 bg-ask/8 px-4 py-3 text-[14.5px] leading-relaxed text-[#f6b1ab]">
      {children}
    </div>
  );
}

export function Primary({
  busy,
  children,
  type = "submit",
  onClick,
}: {
  busy?: boolean;
  children: ReactNode;
  type?: "submit" | "button";
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={busy}
      aria-busy={busy || undefined}
      className="shine group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-pill bg-blue-600 px-8 text-[15.5px] font-semibold tracking-[0.01em] text-white shadow-[0_1px_0_rgb(255_255_255/0.25)_inset,0_18px_40px_-18px_rgb(15_169_104/0.8)] transition-[background,transform] duration-300 hover:bg-blue-700 active:scale-[0.985] disabled:cursor-wait disabled:opacity-80"
    >
      {busy ? (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="animate-spin">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2.5" />
          <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ) : null}
      {children}
      {!busy && (
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
          &rarr;
        </span>
      )}
    </button>
  );
}
