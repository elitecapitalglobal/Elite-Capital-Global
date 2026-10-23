import type { Metadata } from "next";
import Link from "next/link";
import { contactPage } from "@/content/company";
import { contact } from "@/content/site";
import { PageHero } from "@/components/pages/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact Us | Elite fx Capital",
  description: contactPage.hero.lead,
};

/**
 * Email and live chat only — no phone number or street address is published
 * on the site. Each inbox is shown with what it is for, so a reader picks the
 * right one first time instead of being forwarded.
 */
export default function ContactPage() {
  return (
    <main>
      <PageHero
        label={contactPage.hero.label}
        title={contactPage.hero.title}
        lead={contactPage.hero.lead}
      />

      <Section surface="white" className="section-y">
        <div className="shell">
          <Reveal stagger className="grid gap-4 md:grid-cols-2">
            {/* Live chat first: it is the quickest route to a person. */}
            <div className="flex flex-col rounded-card bg-navy-950 p-7 text-ink-100">
              <span className="flex items-center gap-2 text-[13px] font-medium text-blue-400">
                <span aria-hidden className="size-2 rounded-full bg-blue-400" />
                Online 24/7
              </span>
              <h2 className="type-h3 mt-4">{contactPage.chat.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-300">
                {contactPage.chat.body}
              </p>
              <div className="mt-auto pt-6">
                <Button href={contact.liveChatHref}>{contactPage.chat.cta}</Button>
              </div>
            </div>

            {contactPage.channels.map((c) => (
              <div key={c.email} className="flex flex-col rounded-card border border-navy-900/10 bg-ink-100 p-7">
                <h2 className="type-h3 text-navy-900">{c.title}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-navy-700/80">{c.body}</p>
                <a
                  href={`mailto:${c.email}`}
                  className="num mt-4 inline-flex min-h-11 items-center text-[15px] font-medium break-all text-blue-700 underline decoration-blue-700/40 underline-offset-4 hover:decoration-blue-700"
                >
                  {c.email}
                </a>
                <p className="mt-auto pt-3 text-[13px] text-navy-700/70">
                  Reply within {contact.replyTime}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section surface="clear" className="section-y">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="type-h2 text-navy-900">{contactPage.tips.heading}</h2>
            <ul className="mt-6 grid gap-3">
              {contactPage.tips.items.map((t) => (
                <li key={t} className="flex gap-3 rounded-inner bg-white px-5 py-4 text-[15px] leading-relaxed text-navy-700">
                  <Tick />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <h2 className="type-h2 text-navy-900">{contactPage.more.heading}</h2>
            <ul className="mt-6 grid gap-3">
              {contactPage.more.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-center justify-between gap-4 rounded-inner bg-white px-5 py-4 transition-colors hover:bg-blue-50"
                  >
                    <span>
                      <span className="block text-[16px] font-semibold text-navy-900">{l.label}</span>
                      <span className="block text-[14px] text-navy-700/75">{l.desc}</span>
                    </span>
                    <span aria-hidden className="text-blue-700 transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}

function Tick() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" aria-hidden className="mt-1 shrink-0 text-blue-600">
      <path d="M2.5 7.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
