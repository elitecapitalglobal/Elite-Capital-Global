import Image from "next/image";
import Link from "next/link";
import { platforms } from "@/content/site";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The bento, plus FxPro's platform-range card closing the section.
 *
 * Two of the four tiles carry real product screenshots — a platforms section
 * with no platform imagery reads as incomplete, not restrained.
 *
 * The grid tiles 3 columns x 2 rows: the tall Mobile tile holds column 1 for
 * both rows, Web Portal takes the rest of row 1, and the two terminals share
 * row 2. Change a `span` here and the row maths has to be redone by hand —
 * there is no `dense` backfill on this grid because the tall tile's position
 * is load-bearing.
 */
export function Platforms() {
  const [mobile, web, mt5, copy] = platforms.items;

  return (
    <Section surface="white" id="platforms" className="section-y">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(58% 50% at 88% 0%, rgb(37 99 235 / 0.07), transparent 60%)",
        }}
      />

      <div className="shell">
        <Reveal>
          <SectionHead
            heading={platforms.heading}
            lead={platforms.lead}
            surface="white"
          />
        </Reveal>

        <Reveal stagger className="mt-10 grid gap-4 md:mt-12 lg:grid-cols-3">
          {/* Feature tile — tall, image-led. */}
          <Tile item={mobile} className="lg:row-span-2">
            <div className="relative mt-6 min-h-56 flex-1">
              <Image
                src={mobile.image!}
                alt="The Elite Capital mobile app showing a trader's portfolio and copy-trading list"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-contain object-bottom"
              />
            </div>
          </Tile>

          <Tile item={web} className="lg:col-span-2">
            <div className="relative mt-6 h-56">
              <Image
                src={web.image!}
                alt="The Elite Capital Web Portal with live charts and a market watch panel"
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-contain object-left-bottom"
              />
            </div>
          </Tile>

          <Tile item={mt5} />
          <Tile item={copy} />
        </Reveal>

        <Reveal className="mt-4">
          <PlatformRange />
        </Reveal>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * FxPro's range card. It exists to answer "what else have you got?" in one
 * place instead of making the reader infer the lineup from the tiles above.
 *
 * With two rows it stays honest — the card names the terminals we actually
 * run. Adding a third row is a content change in site.ts; the grid already
 * takes it.
 */
function PlatformRange() {
  const { title, lead, items } = platforms.range;

  return (
    // Top-aligned, not centred. The list is a stack of rules; centring it
    // against the heading block leaves the first rule floating above the
    // heading with nothing to line up with, which reads as a mistake even
    // though it is symmetrical. Aligning the tops gives the heading and the
    // first platform name a shared line.
    <div data-tilt="2" className="bevel-clear card-glow card-3d grid gap-6 rounded-panel p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-12 lg:p-10">
      <div>
        <h3 className="type-h3 text-navy-900">{title}</h3>
        <p className="measure mt-3 text-[15px] leading-relaxed text-navy-700/80">
          {lead}
        </p>
      </div>

      {/* Dropping the first row's top padding is what actually lands the
          alignment — without it the row padding pushes the first platform name
          half a line below the heading. Only from `lg`, where the two columns
          sit side by side and there is anything to align to. */}
      <ul className="divide-y divide-navy-900/10 lg:[&>li:first-child>a]:pt-0">
        {items.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className="group flex min-h-16 items-center justify-between gap-4 py-4 transition-colors"
            >
              <span>
                <span className="block text-[15px] font-semibold text-navy-900 transition-colors group-hover:text-blue-600">
                  {item.name}
                </span>
                <span className="block text-[13px] text-navy-700/60">
                  {item.note}
                </span>
              </span>
              <span
                aria-hidden
                className="grid size-8 shrink-0 place-items-center rounded-full border border-blue-600/30 text-blue-600 transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:bg-blue-600/10"
              >
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path
                    d="M2 6h8M6.5 2.5L10 6l-3.5 3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Tile({
  item,
  className = "",
  children,
}: {
  item: (typeof platforms.items)[number];
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={item.href}
      data-tilt="4"
      className={`bevel-clear card-glow card-3d lift-hover group flex flex-col overflow-hidden rounded-panel p-6 sm:p-7 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="type-h3 text-navy-900">{item.title}</h3>
        <span
          aria-hidden
          className="grid size-7 shrink-0 place-items-center rounded-full border border-blue-600/35 text-blue-600 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:bg-blue-600/10"
        >
          <svg width="11" height="11" viewBox="0 0 12 12">
            <path
              d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      <p className="mt-2.5 max-w-[34ch] text-[15px] leading-relaxed text-navy-700/80">
        {item.body}
      </p>
      {children}
    </Link>
  );
}
