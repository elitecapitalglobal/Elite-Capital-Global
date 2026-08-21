import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pages, pageBySlug } from "@/content/pages";
import { site } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ClosingCta } from "@/components/sections/ClosingCta";

/**
 * Renders every route in the page registry. See `src/content/pages.ts` for
 * why these are content rather than one file each, and how to graduate a page
 * out of the registry when it earns a layout of its own.
 */

type Params = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return pages.map((p) => ({ slug: p.slug.split("/") }));
}

/** Anything not in the registry 404s rather than rendering an empty shell. */
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const page = pageBySlug.get((await params).slug.join("/"));
  if (!page) return {};
  return {
    title: `${page.title} — ${site.name}`,
    description: page.lead,
  };
}

export default async function RegistryPage({ params }: Params) {
  const page = pageBySlug.get((await params).slug.join("/"));
  if (!page) notFound();

  return (
    <main>
      <PageHero title={page.title} lead={page.lead} />

      {page.blocks && (
        <Section surface="white" className="section-y">
          <Reveal
            stagger
            className="shell grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {page.blocks.map((block) => (
              <article
                key={block.heading}
                data-tilt="4"
                className="bevel-clear card-glow card-3d lift-hover rounded-panel p-6 sm:p-7"
              >
                <h2 className="type-h3 text-navy-900">{block.heading}</h2>
                <p className="mt-2.5 text-[15px] leading-relaxed text-navy-700/80">
                  {block.body}
                </p>
              </article>
            ))}
          </Reveal>
        </Section>
      )}

      {page.prose && (
        <Section
          surface={page.blocks ? "tint" : "white"}
          className="section-y"
        >
          <div className="shell">
            <Reveal className="measure">
              {page.prose.map((group, i) => (
                <div key={group.heading ?? i} className={i ? "mt-10" : ""}>
                  {group.heading && (
                    <h2 className="type-h3 text-navy-900">{group.heading}</h2>
                  )}
                  {group.paragraphs.map((p) => (
                    <p
                      key={p}
                      className="mt-3 text-[15.5px] leading-relaxed text-navy-700/85"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              ))}

              {page.cta && (
                <div className="mt-10">
                  <Button href={page.cta.href}>{page.cta.label}</Button>
                </div>
              )}
            </Reveal>
          </div>
        </Section>
      )}

      {/* If the page had no prose, the CTA still needs somewhere to live. */}
      {page.cta && !page.prose && (
        <Section surface="tint" className="py-[clamp(40px,5vw,72px)]">
          <div className="shell">
            <Button href={page.cta.href}>{page.cta.label}</Button>
          </div>
        </Section>
      )}

      <ClosingCta />
    </main>
  );
}
