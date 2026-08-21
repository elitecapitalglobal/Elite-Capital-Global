import type { Metadata } from "next";
import Link from "next/link";
import { contact, site } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ClosingCta } from "@/components/sections/ClosingCta";

export const metadata: Metadata = {
  title: `Contact us — ${site.name}`,
  description: contact.lead,
};

/**
 * XM's contact layout: a short masthead, then one card per way of reaching us.
 *
 * There are two cards, not four, because there are two channels — email and
 * the help centre. Padding this out with a greyed "Live chat: coming soon"
 * tile would be the obvious move and the wrong one: a support page that lists
 * a channel you cannot use is worse than a short support page.
 */
export default function ContactPage() {
  return (
    <main>
      <PageHero title={contact.title} lead={contact.lead} />

      <Section surface="clear" className="section-y">
        <div className="shell">
          <Reveal
            stagger
            className="grid gap-4 sm:grid-cols-2 lg:mx-auto lg:max-w-4xl"
          >
            {contact.channels.map((channel) => (
              <article
                key={channel.title}
                data-tilt="4"
                className="bevel-clear card-glow card-3d lift-hover flex flex-col rounded-panel p-6 sm:p-7"
              >
                <span
                  aria-hidden
                  className="depth grid size-11 place-items-center rounded-inner bg-navy-950 text-ink-100"
                >
                  <Icon name={channel.icon} />
                </span>

                <h2 className="type-h3 mt-5 text-navy-900">{channel.title}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-navy-700/80">
                  {channel.body}
                </p>

                {channel.detail && (
                  <p className="mt-3 text-[15px] font-semibold text-navy-900">
                    {channel.detail}
                  </p>
                )}

                <span className="mt-4 w-fit rounded-pill border border-navy-900/12 bg-navy-900/4 px-3 py-1 text-[12.5px] font-medium text-navy-700/80">
                  {channel.availability}
                </span>

                <Link
                  href={channel.href}
                  className="group mt-auto inline-flex min-h-11 w-fit items-center gap-2 pt-6 text-[15px] font-semibold text-blue-600 transition-colors hover:text-blue-700"
                >
                  {channel.cta}
                  <span
                    aria-hidden
                    className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5"
                  >
                    <svg width="13" height="13" viewBox="0 0 14 14">
                      <path
                        d="M3 11L11 3M11 3H5M11 3v6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </article>
            ))}
          </Reveal>

          {/* The security note belongs on this page specifically: a contact
              page is exactly where someone is primed to hand over details to
              whoever answers. */}
          <Reveal className="mx-auto mt-10 max-w-4xl">
            <div className="rounded-panel border border-navy-900/10 bg-navy-900/3 p-6">
              <h2 className="type-h3 text-navy-900">{contact.security.title}</h2>
              <p className="measure mt-2.5 text-[15px] leading-relaxed text-navy-700/85">
                {contact.security.body}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <ClosingCta />
    </main>
  );
}

function Icon({ name }: { name: (typeof contact.channels)[number]["icon"] }) {
  const paths: Record<typeof name, React.ReactNode> = {
    email: (
      <>
        <rect x="2.5" y="4" width="15" height="12" rx="2.5" />
        <path d="M3.5 5.5l6.5 5 6.5-5" />
      </>
    ),
    help: (
      <>
        <circle cx="10" cy="10" r="7.5" />
        <path d="M7.8 7.6a2.3 2.3 0 114 1.6c-.7.7-1.8 1-1.8 2.1" />
        <path d="M10 14.4h.01" />
      </>
    ),
  };

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths[name]}
      </g>
    </svg>
  );
}
