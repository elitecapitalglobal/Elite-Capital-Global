import Link from "next/link";
import { site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { footerColumns, footerContact, footerLegal } from "@/content/footer";

/**
 * Three bands, which is the shape every regulated broker's footer converges on
 * — see the reasoning in `src/content/footer.ts`.
 *
 *   1. Brand + contact + link columns.
 *   2. The disclosure stack: risk, restrictions, regulator, client funds.
 *   3. Copyright.
 *
 * Band 2 is the part that usually gets designed into illegibility — 10px grey
 * on grey, collapsed behind a "read more", or dropped entirely. It is set here
 * at 13px with real line-height and a proper contrast ratio, because it is the
 * band a regulator actually reads and the one a client needs when something
 * has gone wrong. It is deliberately the least decorated thing on the page.
 */
export function SiteFooter() {
  return (
    <footer data-surface="clear" className="bg-ink-100 text-navy-900">
      {/* ---------------------------------------------------------------- */}
      {/* 1. Navigation                                                     */}
      {/* ---------------------------------------------------------------- */}
      <div className="border-t border-navy-900/10">
        <div className="shell grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-16 lg:py-16">
          <div>
            <Logo className="text-[44px]" tone="dark" />
            <p className="measure mt-5 text-[14.5px] leading-relaxed text-navy-700/80">
              {site.footerBlurb}
            </p>

            <div className="mt-7">
              <h2 className="type-label text-blue-700">
                {footerContact.heading}
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-navy-700/80">
                {footerContact.body}
              </p>
              <a
                href={`mailto:${footerContact.email}`}
                className="mt-2 inline-flex min-h-11 items-center text-[14.5px] font-semibold text-navy-900 underline decoration-blue-700/50 underline-offset-4 transition-colors hover:text-blue-700"
              >
                {footerContact.email}
              </a>
              <a
                href={`tel:${footerContact.phone.replace(/\s+/g, "")}`}
                className="flex min-h-11 items-center text-[14.5px] font-semibold text-navy-900 underline decoration-blue-700/50 underline-offset-4 transition-colors hover:text-blue-700"
              >
                {footerContact.phone}
              </a>
              <p className="mt-2 text-[14px] leading-relaxed text-navy-700/80">
                {footerContact.address}
              </p>
            </div>
          </div>

          <nav aria-label="Footer" className="grid max-w-2xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h2 className="type-label mb-3 text-blue-700">{col.title}</h2>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="flex min-h-10 items-center text-[14.5px] text-navy-700 transition-colors hover:text-blue-700"
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
      <div className="border-t border-navy-900/10 bg-blue-50">
        <div className="shell grid gap-8 py-12 md:grid-cols-2 lg:gap-x-16">
          {footerLegal.map((block) => (
            <section key={block.label}>
              <h2 className="type-label text-navy-900">{block.label}</h2>
              {block.paragraphs.map((p) => (
                <p
                  key={p}
                  className="mt-2.5 text-[13px] leading-[1.65] text-navy-700/80"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 3. Copyright                                                      */}
      {/* ---------------------------------------------------------------- */}
      <div className="border-t border-navy-900/10 bg-blue-50">
        <div className="shell py-7 text-center">
          <p className="text-[13px] text-navy-700/70">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
