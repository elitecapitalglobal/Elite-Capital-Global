import Image from "next/image";
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
            "radial-gradient(58% 50% at 88% 0%, color-mix(in oklab, var(--color-blue-600) 4%, transparent), transparent 60%)",
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
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

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
    <div
      data-tilt="4"
      className={`bevel-clear card-glow card-3d lift-hover flex flex-col overflow-hidden rounded-panel p-6 sm:p-7 ${className}`}
    >
      <h3 className="type-h3 text-navy-900">{item.title}</h3>
      <p className="mt-2.5 max-w-[34ch] text-[15px] leading-relaxed text-navy-700/80">
        {item.body}
      </p>
      {children}
    </div>
  );
}
