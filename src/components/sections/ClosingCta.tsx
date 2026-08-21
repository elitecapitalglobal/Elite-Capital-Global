import { closing, site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The one place gold is allowed to go full drench. It's the last thing on the
 * page, so there's nothing left for it to compete with — everywhere else gold
 * stays at accent weight.
 */
export function ClosingCta() {
  return (
    <section
      data-surface="deep"
      className="relative isolate overflow-hidden bg-navy-950 py-[clamp(72px,8vw,124px)]"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(62% 82% at 50% 118%, rgb(37 99 235 / 0.55), transparent 62%), radial-gradient(48% 60% at 12% 8%, rgb(30 64 175 / 0.5), transparent 60%)",
        }}
      />
      <div aria-hidden className="hairline absolute inset-x-0 top-0 h-px" />

      <Reveal className="shell text-center">
        <h2 className="type-h2 mx-auto max-w-3xl whitespace-pre-line">
          {closing.heading}
        </h2>
        <p className="type-lead mx-auto mt-5 max-w-[46ch] text-ink-300">
          {closing.lead}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button href={site.cta.primary.href}>{site.cta.primary.label}</Button>
          <Button href={site.cta.secondary.href} variant="ghost">
            {site.cta.secondary.label}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
