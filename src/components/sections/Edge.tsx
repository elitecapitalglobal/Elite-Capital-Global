import { edge } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The four things a trader comparing brokers checks before anything else:
 * spread, total cost, execution, and how hard it is to get money back out.
 *
 * Deliberately has no section heading. It sits directly under the hero as a
 * continuation of it — a heading here would announce a new section and break
 * the fold into two competing openings. The cards *are* the statement.
 */
export function Edge() {
  return (
    <Section surface="clear" className="py-[clamp(48px,6vw,88px)]">
      <Reveal
        stagger
        className="shell grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {edge.items.map((item) => (
          <article
            key={item.title}
            data-tilt
            className="bevel-clear card-glow card-3d lift-hover flex flex-col rounded-panel p-6 sm:p-7"
          >
            <span
              aria-hidden
              className="depth grid size-11 place-items-center rounded-full border border-blue-600/20 bg-blue-600/8 text-blue-600"
            >
              <Icon name={item.icon} />
            </span>
            <h3 className="type-h3 mt-5 text-navy-900">{item.title}</h3>
            <p className="mt-2.5 text-[15px] leading-relaxed text-navy-700/80">
              {item.body}
            </p>
          </article>
        ))}
      </Reveal>
    </Section>
  );
}

/**
 * One 20x20 grid, one stroke weight, one cap style. Icons drawn to different
 * weights in the same row is the fastest way to make a card set look
 * assembled from stock rather than designed.
 */
function Icon({ name }: { name: (typeof edge.items)[number]["icon"] }) {
  const paths: Record<typeof name, React.ReactNode> = {
    // Two arrows closing on each other — a spread narrowing.
    spread: (
      <>
        <path d="M3 5h5.5M8.5 5v5.5M17 15h-5.5M11.5 15V9.5" />
        <path d="M8.5 5L3.5 10M11.5 15l5-5" />
      </>
    ),
    // A tag with nothing written on it.
    cost: (
      <>
        <path d="M10.5 2.5H16a1.5 1.5 0 011.5 1.5v5.5L9.6 17.4a1.2 1.2 0 01-1.7 0L2.6 12.1a1.2 1.2 0 010-1.7L10.5 2.5z" />
        <path d="M13.6 6.4h.01" />
      </>
    ),
    // Clock with a tick — a fill that lands on time.
    execution: (
      <>
        <path d="M17.4 10a7.4 7.4 0 11-3.6-6.35" />
        <path d="M10 5.6V10l2.6 1.8" />
        <path d="M13.4 15.6l1.9 1.9 3.2-3.6" />
      </>
    ),
    // Arrow leaving a tray.
    withdraw: (
      <>
        <path d="M10 12.5V2.8M10 2.8L6.6 6.2M10 2.8l3.4 3.4" />
        <path d="M3 12v3.6a1.6 1.6 0 001.6 1.6h10.8a1.6 1.6 0 001.6-1.6V12" />
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
