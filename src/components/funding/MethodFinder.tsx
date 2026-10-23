"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  MAX_PER_TRANSACTION,
  MIN_PER_TRANSACTION,
  limitsNote,
  methods,
  steps,
  withdrawal,
  type Method,
} from "@/content/funding";
import { contact } from "@/content/site";
import { Icon } from "@/components/funding/Icons";
import { Button } from "@/components/ui/Button";

type Direction = "deposit" | "withdraw";

const SPEED_LABEL = ["", "Instant", "Minutes", "Same day", "Days"] as const;

/**
 * The payment-method picker. Deposit/Withdraw switches what each card
 * leads with; selecting a card opens the full detail in a native <dialog>,
 * which gives focus trapping, Escape-to-close and an inert background for
 * free — no hand-rolled focus management to get wrong.
 *
 * Sorted fastest first for deposits. Withdrawals all share one processing
 * window (24/5), so they keep the data file's order.
 */
export function MethodFinder() {
  const [dir, setDir] = useState<Direction>("deposit");
  const [active, setActive] = useState<Method | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  const list =
    dir === "deposit"
      ? [...methods].sort((a, b) => a.deposit.speed - b.deposit.speed)
      : methods;

  const open = (m: Method, from: HTMLButtonElement) => {
    opener.current = from;
    setActive(m);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          role="group"
          aria-label="Show details for"
          className="inline-flex rounded-pill bg-ink-100 p-1"
        >
          {(["deposit", "withdraw"] as const).map((d) => (
            <button
              key={d}
              type="button"
              aria-pressed={dir === d}
              onClick={() => setDir(d)}
              className={`min-h-11 rounded-pill px-6 text-[15px] font-medium transition-colors ${
                dir === d ? "bg-navy-900 text-white" : "text-navy-700 hover:text-navy-900"
              }`}
            >
              {d === "deposit" ? "Deposit" : "Withdraw"}
            </button>
          ))}
        </div>
        <p className="text-[14px] text-navy-700/75" aria-live="polite">
          {dir === "deposit"
            ? "Deposits accepted 24/7, every day of the year."
            : "Withdrawals processed 24/5, Monday to Friday."}
        </p>
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((m, i) => (
          <li key={m.id}>
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={(e) => open(m, e.currentTarget)}
              className="group flex h-full w-full flex-col gap-4 rounded-card border border-navy-900/8 bg-white p-6 text-left transition-[box-shadow,border-color,transform] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-navy-900/15 hover:shadow-[0_18px_40px_-18px_rgb(0_0_0/0.25)]"
            >
              <span className="flex w-full items-center gap-3.5">
                <span className="grid size-12 shrink-0 place-items-center rounded-inner bg-blue-50 text-blue-700">
                  <Icon name={m.icon} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[17px] leading-tight font-semibold text-navy-900">{m.name}</span>
                  <span className="block text-[13.5px] text-navy-700/70">{m.sub}</span>
                </span>
                {dir === "deposit" && i === 0 && (
                  <span className="ms-auto self-start rounded-pill bg-navy-900 px-2.5 py-1 text-[10.5px] font-semibold tracking-[0.06em] text-white uppercase">
                    Fastest
                  </span>
                )}
              </span>

              <span className="grid w-full grid-cols-2 gap-2">
                <Stat k="Our fee" v="0%" accent />
                <Stat
                  k={dir === "deposit" ? "Arrives" : "Processing"}
                  v={dir === "deposit" ? m.deposit.time : "24/5, Mon–Fri"}
                />
                <Stat k="Minimum" v={MIN_PER_TRANSACTION} />
                <Stat k="Maximum" v={`${MAX_PER_TRANSACTION}*`} />
              </span>

              {dir === "deposit" && (
                <span className="flex items-center gap-2.5 text-[13px] text-navy-700/75">
                  <span aria-hidden className="flex gap-[3px]">
                    {[1, 2, 3, 4].map((n) => (
                      <i
                        key={n}
                        className={`h-1.5 w-4 rounded-full ${n <= 5 - m.deposit.speed ? "bg-blue-600" : "bg-navy-900/10"}`}
                      />
                    ))}
                  </span>
                  Speed: {SPEED_LABEL[m.deposit.speed]}
                </span>
              )}

              <span className="mt-auto text-[14px] font-semibold text-blue-700">
                How to {dir}{" "}
                <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-labelledby="method-title"
        data-lenis-prevent
        onClose={() => opener.current?.focus()}
        onClick={(e) => {
          // A click on the backdrop lands on the <dialog> itself.
          if (e.target === e.currentTarget) close();
        }}
        className="m-0 ms-auto h-dvh max-h-dvh w-full max-w-[520px] overflow-y-auto bg-ink-100 p-0 text-navy-900 backdrop:bg-navy-950/50 backdrop:backdrop-blur-[2px] max-sm:mt-auto max-sm:h-auto max-sm:max-h-[88dvh] max-sm:max-w-none max-sm:rounded-t-[24px]"
      >
        {active && (
          <div className="grid gap-4 p-6 sm:p-7">
            <div className="flex items-start gap-3.5 pe-12">
              <span className="grid size-12 shrink-0 place-items-center rounded-inner bg-blue-50 text-blue-700">
                <Icon name={active.icon} />
              </span>
              <div>
                <p className="text-[13.5px] text-navy-700/70">{active.sub}</p>
                <h3 id="method-title" className="text-[26px] leading-tight font-medium tracking-[-0.02em]">
                  {active.name}
                </h3>
              </div>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-5 right-5 grid size-11 place-items-center rounded-full bg-white text-navy-900"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>

            <div className="overflow-x-auto rounded-card bg-white p-5">
              <table className="w-full border-collapse text-[14px]">
                <thead>
                  <tr className="text-left text-[11px] tracking-[0.08em] text-navy-700/70 uppercase">
                    <th className="pb-2 font-medium"><span className="sr-only">Detail</span></th>
                    <th className="pb-2 font-medium">Deposit</th>
                    <th className="pb-2 font-medium">Withdrawal</th>
                  </tr>
                </thead>
                <tbody className="align-top">
                  <Row k="Our fee" a={<span className="text-blue-700">0%</span>} b={<span className="text-blue-700">0%</span>} />
                  <Row k="When" a="24/7" b="24/5, Mon–Fri" />
                  <Row k="Timing" a={active.deposit.time} b={withdrawal.arrival} />
                  <Row k="Minimum" a={MIN_PER_TRANSACTION} b={MIN_PER_TRANSACTION} />
                  <Row k="Maximum" a={`${MAX_PER_TRANSACTION}*`} b={`${MAX_PER_TRANSACTION}*`} />
                </tbody>
              </table>
              <p className="mt-3 text-[13px] leading-relaxed text-navy-700/75">* {limitsNote}</p>
            </div>

            <div className="rounded-card bg-white p-5">
              <p className="type-label text-blue-700">How to {dir}</p>
              <ol className="mt-3 grid list-decimal gap-2 pl-5 text-[15px] leading-relaxed marker:text-blue-700">
                {steps[active.type][dir].map((s) => (
                  <li key={s} className="pl-1">{s}</li>
                ))}
              </ol>
            </div>

            {active.notes && (
              <div className="rounded-card bg-white p-5">
                <p className="type-label text-blue-700">Good to know</p>
                <ul className="mt-3 grid gap-2 text-[14.5px] leading-relaxed text-navy-700/85">
                  {active.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Button href="/coming-soon">{dir === "deposit" ? "Deposit" : "Withdraw"} in Client Area</Button>
              <Button href={contact.liveChatHref} variant="ghostDark">Ask our team</Button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

function Stat({ k, v, accent = false }: { k: string; v: string; accent?: boolean }) {
  return (
    <span className="grid gap-0.5 rounded-inner bg-ink-100 px-3 py-2.5">
      <span className="text-[10.5px] tracking-[0.08em] text-navy-700/70 uppercase">{k}</span>
      <span className={`num text-[13.5px] font-medium ${accent ? "text-blue-700" : "text-navy-900"}`}>{v}</span>
    </span>
  );
}

function Row({ k, a, b }: { k: string; a: ReactNode; b: ReactNode }) {
  return (
    <tr className="border-t border-navy-900/10">
      <td className="py-2.5 pe-3 text-navy-700/75">{k}</td>
      <td className="num py-2.5 pe-3 text-[13.5px]">{a}</td>
      <td className="num py-2.5 text-[13.5px]">{b}</td>
    </tr>
  );
}
