import type { Metadata } from "next";
import Link from "next/link";
import { funding } from "@/content/funding";
import { accounts, contact } from "@/content/site";
import { PageHero } from "@/components/pages/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { MethodFinder } from "@/components/funding/MethodFinder";
import { WithdrawChecklist } from "@/components/funding/WithdrawChecklist";
import { FaqSearch } from "@/components/funding/FaqSearch";
import { Icon } from "@/components/funding/Icons";

export const metadata: Metadata = {
  title: "Deposits & Withdrawals | Elite fx Capital",
  description:
    "Fund your account by card, bank transfer, e-wallet or crypto. No fees from us, deposits 24/7, withdrawals processed 24/5, from USD 10.",
};

/**
 * Order follows what a reader needs to decide, then what they need to trust:
 * methods and limits first, then the flow, account minimums, safety, rules,
 * FAQs and help. Copy and payment data live in `src/content/funding.ts`.
 *
 * Account minimums are read from `accounts` in `site.ts` — the same figures
 * as the home page — so the two pages can never disagree.
 */
const minimums = [
  {
    name: accounts.standard.name,
    deposit: accounts.standard.modes.dollar.deposit,
    blurb: accounts.standard.blurb,
  },
  ...accounts.tiers.map((t) => ({
    name: t.name,
    deposit: t.deposit,
    blurb: t.blurb,
  })),
];

export default function FundingPage() {
  const f = funding;
  return (
    <main>
      <PageHero label={f.hero.label} title={f.hero.title} lead={f.hero.lead}>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="#methods">Find your payment method</Button>
          <Button href={contact.liveChatHref} variant="ghostDark">Live chat</Button>
        </div>
        <dl className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 text-left lg:grid-cols-4">
          {f.hero.glance.map((g) => (
            <div key={g.value} className="grid gap-1.5 rounded-card bg-white p-5">
              <dt className="order-2 text-[14px] text-navy-700/75">{g.label}</dt>
              <dd className="num-display order-1 text-[clamp(1.5rem,2.4vw,2rem)] leading-none font-medium text-navy-900">
                {g.value}
              </dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* Jump links. Plain row rather than a second sticky bar — the site
          header already holds the top of the viewport. */}
      <nav aria-label="On this page" className="border-y border-navy-900/10 bg-white">
        <ul className="shell flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
          {f.jump.map((j) => (
            <li key={j.href} className="shrink-0">
              <Link
                href={j.href}
                className="flex min-h-11 items-center rounded-pill px-4 text-[14px] font-medium whitespace-nowrap text-navy-700 transition-colors hover:bg-ink-100 hover:text-navy-900"
              >
                {j.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Section surface="clear" id="methods" className="section-y scroll-mt-28">
        <div className="shell">
          <div className="max-w-2xl">
            <h2 className="type-h2 text-navy-900">{f.methods.heading}</h2>
            <p className="type-lead mt-4 text-navy-700/80">{f.methods.lead}</p>
          </div>
          <div className="mt-10">
            <MethodFinder />
          </div>
          <p className="measure mt-6 text-[14px] leading-relaxed text-navy-700/75">{f.methods.foot}</p>
        </div>
      </Section>

      <Section surface="white" id="how" className="section-y scroll-mt-28">
        <div className="shell">
          <h2 className="type-h2 text-navy-900">{f.how.heading}</h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {[f.how.deposit, f.how.withdraw].map((flow) => (
              <div key={flow.title} className="rounded-card bg-ink-100 p-6 sm:p-8">
                <h3 className="text-[24px] font-medium tracking-[-0.02em] text-navy-900">{flow.title}</h3>
                <p className="mt-1 text-[15px] text-navy-700/75">{flow.lead}</p>
                <ol className="mt-6 grid gap-2.5">
                  {flow.steps.map((s, i) => (
                    <li key={s.title} className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3 rounded-inner bg-white px-4 py-4">
                      <span className="num grid size-8 place-items-center rounded-full bg-blue-50 text-[13px] text-blue-700">{i + 1}</span>
                      <span>
                        <span className="block text-[16px] font-semibold text-navy-900">{s.title}</span>
                        <span className="block text-[15px] leading-relaxed text-navy-700/80">{s.body}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          <div className="relative isolate mt-4 overflow-hidden rounded-card bg-navy-900 p-6 text-ink-100 sm:p-8">
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{ background: "radial-gradient(50% 90% at 25% 120%, color-mix(in oklab, var(--color-blue-600) 35%, transparent), transparent 70%)" }}
            />
            <h3 className="text-[22px] font-medium tracking-[-0.02em]">{f.how.timeline.title}</h3>
            <ol className="mt-8 grid gap-5 md:grid-cols-5 md:gap-0">
              {f.how.timeline.stages.map((s, i, arr) => (
                <li key={s.title} className="relative ps-8 md:ps-0 md:pe-4 md:pt-7">
                  {i < arr.length - 1 && (
                    <span aria-hidden className="absolute top-4 bottom-[-20px] left-[6px] w-0.5 bg-ink-100/12 md:top-[6px] md:right-0 md:bottom-auto md:left-0 md:h-0.5 md:w-auto" />
                  )}
                  <span aria-hidden className={`absolute top-1 left-0 size-3.5 rounded-full border-2 border-blue-400 md:top-0 ${i < 2 ? "bg-blue-400" : "bg-navy-900"}`} />
                  <b className="block text-[15px] font-semibold">{s.title}</b>
                  <span className="block text-[13.5px] text-ink-300">{s.body}</span>
                  <span className="mt-1.5 block text-[12.5px] text-blue-400">{s.when}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section surface="clear" id="accounts" className="section-y scroll-mt-28">
        <div className="shell">
          <div className="max-w-2xl">
            <h2 className="type-h2 text-navy-900">{f.accounts.heading}</h2>
            <p className="type-lead mt-4 text-navy-700/80">{f.accounts.lead}</p>
          </div>
          <Reveal stagger className="mt-10 grid gap-4 md:grid-cols-3">
            {minimums.map((a, i) => (
              <article
                key={a.name}
                className={`grid content-start gap-4 rounded-card p-7 ${
                  i === 0 ? "bg-navy-900 text-ink-100" : "border border-navy-900/10 bg-white text-navy-900"
                }`}
              >
                <h3 className="text-[22px] font-medium">{a.name}</h3>
                <p className={`text-[15px] leading-relaxed ${i === 0 ? "text-ink-300" : "text-navy-700/80"}`}>{a.blurb}</p>
                <p className="flex items-baseline gap-2">
                  <span className="num-display text-[44px] leading-none font-medium">${a.deposit}</span>
                  <span className={`text-[14px] ${i === 0 ? "text-ink-300" : "text-navy-700/75"}`}>min. first deposit</span>
                </p>
              </article>
            ))}
          </Reveal>
          <p className="mt-6">
            <Link href="/#accounts" className="text-[15px] font-semibold text-blue-700 underline decoration-blue-700/40 underline-offset-4 hover:decoration-blue-700">
              Compare account types in full
            </Link>
          </p>
        </div>
      </Section>

      <section id="safety" data-surface="clear" className="scroll-mt-28 bg-ink-100 px-[var(--gutter)] pb-[var(--section-y)]">
        <div className="relative isolate mx-auto max-w-[var(--container-shell)] overflow-hidden rounded-panel bg-navy-950 px-6 py-[clamp(40px,5vw,72px)] text-ink-100 sm:px-10">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{ background: "radial-gradient(60% 100% at 5% 115%, color-mix(in oklab, var(--color-blue-600) 40%, transparent), transparent 68%)" }}
          />
          <h2 className="type-h2 max-w-[16ch]">{f.safety.heading}</h2>
          <p className="type-lead mt-4 max-w-[58ch] text-ink-300">{f.safety.lead}</p>
          <Reveal stagger className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {f.safety.items.map((s) => (
              <div key={s.title} className="grid content-start gap-2 rounded-card border border-ink-100/12 bg-ink-100/[0.04] p-6">
                <span className="text-blue-400"><Icon name={s.icon} className="size-6" /></span>
                <h3 className="text-[17px] font-semibold">{s.title}</h3>
                <p className="text-[15px] leading-relaxed text-ink-300">{s.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <Section surface="white" id="rules" className="section-y scroll-mt-28">
        <div className="shell">
          <h2 className="type-h2 max-w-2xl text-navy-900">{f.rules.heading}</h2>
          <div className="mt-10 grid items-start gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="grid gap-3 sm:grid-cols-2">
              {f.rules.items.map((r) => (
                <div key={r.title} className="grid content-start gap-1.5 rounded-card bg-ink-100 p-6">
                  <b className="text-[16px] font-semibold text-navy-900">{r.title}</b>
                  <span className="text-[15px] leading-relaxed text-navy-700/80">{r.body}</span>
                </div>
              ))}
            </div>
            <WithdrawChecklist />
          </div>
        </div>
      </Section>

      <Section surface="clear" id="faq" className="section-y scroll-mt-28">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="type-h2 text-navy-900">{f.faq.heading}</h2>
            <p className="type-lead mt-4 text-navy-700/80">{f.faq.lead}</p>
          </div>
          <FaqSearch items={f.faq.items} />
        </div>
      </Section>

      <Section surface="tint" className="py-[clamp(48px,6vw,88px)]">
        <div className="shell flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-[clamp(1.5rem,2.4vw,2rem)] font-medium tracking-[-0.025em] text-navy-900">{f.help.heading}</h2>
            <p className="mt-2 text-[16px] text-navy-700/80">{f.help.lead}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={contact.liveChatHref}>Start live chat</Button>
            <Button href={`mailto:${contact.support}`} variant="ghostDark">{contact.support}</Button>
          </div>
        </div>
      </Section>

      <ClosingCta />
    </main>
  );
}
