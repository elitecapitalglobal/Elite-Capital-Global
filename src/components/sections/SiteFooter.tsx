import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import {
  footerColumns,
  footerContact,
  footerLegal,
  footerLegalLinks,
} from "@/content/footer";

/**
 * Three bands, which is the shape every regulated broker's footer converges on
 * — see the reasoning in `src/content/footer.ts`.
 *
 *   1. Brand + contact + link columns.
 *   2. The disclosure stack: risk, restrictions, regulator, client funds.
 *   3. Legal document links and copyright.
 *
 * Band 2 is the part that usually gets designed into illegibility — 10px grey
 * on grey, collapsed behind a "read more", or dropped entirely. It is set here
 * at 13px with real line-height and a proper contrast ratio, because it is the
 * band a regulator actually reads and the one a client needs when something
 * has gone wrong. It is deliberately the least decorated thing on the page.
 */
export function SiteFooter() {
  return (
    <footer data-surface="deep" className="bg-navy-900 text-ink-100">
      {/* ---------------------------------------------------------------- */}
      {/* 1. Navigation                                                     */}
      {/* ---------------------------------------------------------------- */}
      <div className="border-t border-ink-100/8">
        <div className="shell grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-16 lg:py-16">
          <div>
            <Image
              src="/logo-transparent.png"
              alt={site.name}
              width={180}
              height={50}
              className="h-11 w-auto"
            />
            <p className="measure mt-5 text-[14.5px] leading-relaxed text-ink-300">
              {site.footerBlurb}
            </p>

            <div className="mt-7">
              <h2 className="type-label text-blue-400">
                {footerContact.heading}
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-300">
                {footerContact.body}
              </p>
              <a
                href={`mailto:${footerContact.email}`}
                className="mt-2 inline-flex min-h-11 items-center text-[14.5px] font-semibold text-ink-100 underline decoration-blue-400/50 underline-offset-4 transition-colors hover:text-blue-400"
              >
                {footerContact.email}
              </a>
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          >
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h2 className="type-label mb-3 text-blue-400">{col.title}</h2>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="flex min-h-10 items-center text-[14.5px] text-ink-300 transition-colors hover:text-blue-400"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 2. Disclosures                                                    */}
      {/* ---------------------------------------------------------------- */}
      <div className="border-t border-ink-100/8 bg-navy-950">
        <div className="shell grid gap-8 py-12 md:grid-cols-2 lg:gap-x-16">
          {footerLegal.map((block) => (
            <section key={block.label}>
              <h2 className="type-label text-ink-100">{block.label}</h2>
              {block.paragraphs.map((p) => (
                <p
                  key={p}
                  className="mt-2.5 text-[13px] leading-[1.65] text-ink-300/85"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 3. Legal documents + copyright                                    */}
      {/* ---------------------------------------------------------------- */}
      <div className="border-t border-ink-100/8 bg-navy-950">
        <div className="shell flex flex-col gap-4 py-7 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {footerLegalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="flex min-h-10 items-center text-[13px] text-ink-300 transition-colors hover:text-blue-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-[13px] text-ink-500">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
