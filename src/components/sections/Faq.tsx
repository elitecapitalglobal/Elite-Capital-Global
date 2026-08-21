import { faq } from "@/content/site";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Native <details>/<summary>. No JS, no ARIA to get wrong, keyboard and screen
 * reader support for free, and it still works if the bundle fails.
 */
export function Faq() {
  return (
    // `/help` redirects to this anchor — the FAQ is the help centre for now.
    // Renaming the id breaks that redirect, so change both together.
    <Section surface="clear" id="faq" className="section-y">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <Reveal>
          <SectionHead heading={faq.heading} lead={faq.lead} surface="clear" />
        </Reveal>

        <Reveal stagger className="divide-y divide-navy-900/10 border-y border-navy-900/10">
          {faq.items.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                <h3 className="type-h3 text-navy-900">{item.q}</h3>
                <span
                  aria-hidden
                  className="mt-1 grid size-7 shrink-0 place-items-center rounded-full border border-navy-900/15 text-navy-900 transition-transform duration-300 ease-[var(--ease-out-expo)] group-open:rotate-45 group-open:border-blue-700 group-open:text-blue-700"
                >
                  <svg width="11" height="11" viewBox="0 0 12 12">
                    <path
                      d="M6 1v10M1 6h10"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <p className="measure pb-5 text-[15px] leading-relaxed text-navy-700/85">
                {item.a}
              </p>
            </details>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
