import { steps } from "@/content/site";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The only numbered sequence on the site. It gets numbers because it genuinely
 * is one — the order carries information the reader needs. `01 / 02 / 03` used
 * as decoration above unordered sections is the pattern being avoided
 * everywhere else.
 */
export function Steps() {
  return (
    <Section surface="clear" className="section-y">
      <div className="shell">
        <Reveal>
          <SectionHead heading={steps.heading} surface="clear" />
        </Reveal>

        {/* A 1px grid built from `gap-px` over a coloured parent, so the rules
            between steps are the background showing through rather than three
            borders that have to be de-duplicated at the joins. */}
        <Reveal stagger className="mt-10 grid gap-px overflow-hidden rounded-panel bg-navy-900/10 md:mt-12 md:grid-cols-3">
          {steps.items.map((step, i) => (
            <div key={step.title} className="bg-white p-6 sm:p-8 lg:p-9">
              <span
                className="num block text-sm text-blue-600"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="type-h3 mt-5 text-navy-900">
                <span className="sr-only">{`Step ${i + 1}: `}</span>
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-navy-700/80">
                {step.body}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
