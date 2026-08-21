import Link from "next/link";

/**
 * The masthead every interior page opens with.
 *
 * Deliberately shorter than the home hero and without its card cluster: an
 * interior page has already been chosen, so the job here is to confirm where
 * the reader landed and get out of the way — not to sell the arrival again.
 *
 * It keeps the indigo, though. The header pill reads `data-surface` to pick
 * its palette, so an interior page opening on a light band would put the
 * dark-surface pill on a light background for the first paint.
 */
export function PageHero({
  title,
  lead,
  breadcrumb,
}: {
  title: string;
  lead: string;
  breadcrumb?: { label: string; href: string };
}) {
  return (
    <section
      data-surface="deep"
      className="aurora relative isolate overflow-hidden pt-[clamp(52px,7vw,88px)] pb-[clamp(52px,7vw,88px)]"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0 63px, rgb(255 255 255 / 0.5) 63px 64px)",
            maskImage:
              "radial-gradient(70% 60% at 50% 30%, #000, transparent 78%)",
          }}
        />
      </div>

      <div className="shell">
        <div className="max-w-3xl">
          {breadcrumb && (
            <Link
              href={breadcrumb.href}
              className="type-label inline-flex min-h-11 items-center gap-2 text-blue-400 transition-colors hover:text-blue-200"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                <path
                  d="M10 6H2M5.5 2.5L2 6l3.5 3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {breadcrumb.label}
            </Link>
          )}
          <h1 className="type-h2 mt-2">{title}</h1>
          <p className="type-lead measure mt-4 text-ink-300">{lead}</p>
        </div>
      </div>
    </section>
  );
}
