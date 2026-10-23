import type { Metadata } from "next";
import Link from "next/link";
import { about } from "@/content/company";
import { PageHero } from "@/components/pages/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ClosingCta } from "@/components/sections/ClosingCta";

export const metadata: Metadata = {
  title: "About Us | Elite fx Capital",
  description: about.hero.lead,
};

/**
 * Structure follows the usual broker "about" page — intro, vision and
 * mission, what we offer, how we protect clients, company details — but
 * without a founder or team section: no individual is named on this site.
 */
export default function AboutPage() {
  return (
    <main>
      <PageHero
        label={about.hero.label}
        title={about.hero.title}
        lead={about.hero.lead}
      />

      <Section surface="white" className="section-y">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal className="grid content-start gap-5">
            {about.intro.map((p) => (
              <p key={p} className="type-lead text-navy-700/85">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[about.vision, about.mission].map((v) => (
              <div key={v.title} className="rounded-card bg-blue-50 p-7">
                <h2 className="type-label text-blue-700">{v.title}</h2>
                <p className="mt-3 text-[clamp(1.125rem,1.4vw,1.3125rem)] leading-snug font-medium tracking-[-0.015em] text-navy-900">
                  {v.body}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section surface="clear" className="section-y">
        <div className="shell">
          <h2 className="type-h2 text-navy-900">{about.offer.heading}</h2>
          <Reveal stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {about.offer.items.map((item, i) => (
              <div key={item.title} className="rounded-card bg-white p-6">
                <span className="num text-[13px] text-blue-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="type-h3 mt-3 text-navy-900">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-navy-700/80">
                  {item.body}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      <section data-surface="clear" className="bg-ink-100 px-[var(--gutter)] pb-[var(--section-y)]">
        <div className="relative isolate mx-auto max-w-[var(--container-shell)] overflow-hidden rounded-panel bg-navy-950 px-6 py-[clamp(40px,5vw,72px)] text-ink-100 sm:px-10">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(70% 110% at 10% 110%, color-mix(in oklab, var(--color-blue-600) 32%, transparent), transparent 65%)",
            }}
          />
          <h2 className="type-h2">{about.protect.heading}</h2>
          <Reveal stagger className="mt-10 grid gap-4 md:grid-cols-3">
            {about.protect.items.map((item) => (
              <div key={item.title} className="rounded-card border border-ink-100/12 bg-ink-100/5 p-6">
                <h3 className="type-h3">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-300">{item.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <Section surface="white" className="py-[clamp(40px,5vw,72px)]">
        <div className="shell flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="type-label text-blue-700">{about.company.heading}</h2>
            <p className="mt-2 text-[16px] text-navy-900">{about.company.body}</p>
          </div>
          <Link
            href="/compliance"
            className="text-[15px] font-semibold text-blue-700 underline decoration-blue-700/40 underline-offset-4 hover:decoration-blue-700"
          >
            Compliance and legal documents
          </Link>
        </div>
      </Section>

      <ClosingCta />
    </main>
  );
}
