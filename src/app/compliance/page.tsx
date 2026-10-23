import type { Metadata } from "next";
import Link from "next/link";
import { compliance } from "@/content/company";
import { contact } from "@/content/site";
import { PageHero } from "@/components/pages/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Compliance | Elite fx Capital",
  description: compliance.hero.lead,
};

export default function CompliancePage() {
  return (
    <main>
      <PageHero
        label={compliance.hero.label}
        title={compliance.hero.title}
        lead={compliance.hero.lead}
      />

      {/* Status. Registration only — no regulator is named because none applies. */}
      <Section surface="white" className="py-[clamp(40px,5vw,72px)]">
        <div className="shell">
          <div className="grid gap-4 rounded-card bg-blue-50 p-7 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10">
            <h2 className="type-label pt-1 text-blue-700">{compliance.status.heading}</h2>
            <div className="grid gap-3 text-[16px] leading-relaxed text-navy-900">
              {compliance.status.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section surface="white" className="pb-[var(--section-y)]">
        <div className="shell">
          <div className="max-w-2xl">
            <h2 className="type-h2 text-navy-900">{compliance.approach.heading}</h2>
            <p className="type-lead mt-4 text-navy-700/80">{compliance.approach.lead}</p>
          </div>
          <Reveal stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {compliance.approach.items.map((item) => (
              <div key={item.title} className="rounded-card border border-navy-900/10 bg-ink-100 p-6">
                <h3 className="type-h3 text-navy-900">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-navy-700/80">{item.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section surface="clear" className="section-y" id="documents">
        <div className="shell">
          <div className="max-w-2xl">
            <h2 className="type-h2 text-navy-900">{compliance.documents.heading}</h2>
            <p className="type-lead mt-4 text-navy-700/80">{compliance.documents.lead}</p>
          </div>
          <Reveal stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {compliance.documents.items.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                className="group flex flex-col rounded-card bg-white p-6 transition-shadow hover:shadow-[0_18px_40px_-18px_rgb(0_0_0/0.25)]"
              >
                <DocIcon />
                <h3 className="type-h3 mt-4 text-navy-900">{d.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-navy-700/80">{d.body}</p>
                <span className="mt-auto pt-5 text-[14px] font-semibold text-blue-700">
                  Read <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section surface="white" className="section-y" id="complaints">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h2 className="type-h2 text-navy-900">{compliance.complaints.heading}</h2>
            <p className="type-lead mt-4 text-navy-700/80">{compliance.complaints.lead}</p>
            <ol className="mt-8 grid gap-3">
              {compliance.complaints.steps.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-4 rounded-inner bg-ink-100 px-5 py-4">
                  <span className="num grid size-8 place-items-center rounded-full bg-blue-50 text-[13px] text-blue-700">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block text-[16px] font-semibold text-navy-900">{s.title}</span>
                    <span className="block text-[15px] leading-relaxed text-navy-700/80">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="self-start rounded-card bg-blue-50 p-7 lg:sticky lg:top-32">
            <h3 className="type-h3 text-navy-900">{compliance.complaints.include.heading}</h3>
            <ul className="mt-4 grid list-disc gap-2 pl-5 text-[15px] leading-relaxed text-navy-700 marker:text-blue-700">
              {compliance.complaints.include.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <div className="mt-6">
              <Button href={`mailto:${contact.compliance}?subject=Complaint`}>
                Email {contact.compliance}
              </Button>
            </div>
          </div>
        </div>
      </Section>

    </main>
  );
}

function DocIcon() {
  return (
    <span aria-hidden className="grid size-11 place-items-center rounded-inner bg-blue-50 text-blue-700">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z" />
        <path d="M14 3v5h5M9 13h6M9 17h4" />
      </svg>
    </span>
  );
}
