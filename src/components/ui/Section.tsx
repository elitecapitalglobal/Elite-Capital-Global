import type { ReactNode } from "react";

/**
 * The page's rhythm lives here. Every section declares one of two lighting
 * states and the alternation between them is the pacing — see DESIGN.md §1.
 * Flipping a section from dark to light is a one-word change in page.tsx.
 */
export type Surface = "deep" | "clear" | "tint" | "white";

const surfaces: Record<Surface, string> = {
  deep: "bg-navy-950 text-ink-100",
  clear: "bg-ink-100 text-navy-900",
  tint: "bg-blue-50 text-navy-900",
  white: "bg-white text-navy-900",
};

/**
 * `tint` and `white` are lighting *shades* of `clear`, not a third state — the
 * page alternates between two lighting conditions and these just stop the long
 * light stretch from reading as one flat wall. The floating nav only ever
 * needs to know which of the two palettes to wear, so they report as `clear`.
 */
const navSurface: Record<Surface, "deep" | "clear"> = {
  deep: "deep",
  clear: "clear",
  tint: "clear",
  white: "clear",
};

export function Section({
  surface = "deep",
  id,
  className = "",
  children,
}: {
  surface?: Surface;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-surface={navSurface[surface]}
      className={`relative isolate overflow-hidden ${surfaces[surface]} ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * Section heading + intro. Deliberately has no eyebrow slot: an uppercase
 * tracked kicker above every heading is the current AI tell, so hierarchy is
 * carried by size, weight and the surface flip instead. DESIGN.md §3.
 *
 * `\n` in a heading is an intentional line break — the copy in site.ts is
 * written to a specific rag.
 */
export function SectionHead({
  heading,
  lead,
  surface = "deep",
  align = "start",
  className = "",
}: {
  heading: string;
  lead?: string;
  surface?: Surface;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto text-center" : ""} max-w-2xl ${className}`}
    >
      <h2 className="type-h2 whitespace-pre-line">{heading}</h2>
      {lead && (
        <p
          className={`type-lead measure mt-4 ${
            surface === "deep" ? "text-ink-300" : "text-navy-700/80"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
