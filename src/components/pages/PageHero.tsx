import type { ReactNode } from "react";

/**
 * The opening band for every inner page. Light `clear` surface with the same
 * rising bloom as the home hero, so a reader who lands here from search still
 * knows which site they are on. One `h1` per page lives here.
 */
export function PageHero({
  label,
  title,
  lead,
  children,
}: {
  label: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section
      data-surface="clear"
      className="aurora-light relative isolate overflow-hidden text-navy-900"
    >
      <div className="shell pt-[clamp(48px,6vw,96px)] pb-[clamp(48px,6vw,88px)] text-center">
        <p className="type-label text-blue-700">{label}</p>
        <h1 className="type-display mx-auto mt-4 max-w-[18ch]">{title}</h1>
        {lead && (
          <p className="type-lead measure mx-auto mt-5 text-navy-700/80">
            {lead}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
