import type { ReactNode } from "react";
import Link from "next/link";
import type { LegalBlock, LegalDocument } from "@/content/legal/types";
import { PageHero } from "@/components/pages/PageHero";

/**
 * One layout for every legal document: a contents list that stays in view on
 * wide screens, and the text at a readable measure beside it. Legal text is
 * the least decorated thing on the site on purpose — the reader is here to
 * find a clause, not to be sold to.
 */
export function LegalPage({
  doc,
  children,
}: {
  doc: LegalDocument;
  /** Optional note above the text, e.g. a link to a related page. */
  children?: ReactNode;
}) {
  return (
    <main>
      <PageHero label="Legal" title={doc.title} lead={doc.summary}>
        <p className="num mt-5 text-[12.5px] text-navy-700/70">{doc.meta}</p>
      </PageHero>

      <section data-surface="clear" className="bg-white text-navy-900">
        <div className="shell grid gap-10 py-[clamp(40px,5vw,80px)] lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="Contents" className="lg:sticky lg:top-32 lg:self-start">
            <p className="type-label text-blue-700">Contents</p>
            <ol className="mt-3 grid gap-0.5 border-l border-navy-900/10">
              {doc.sections.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`#${s.id}`}
                    className="-ml-px block border-l border-transparent py-1.5 pl-4 text-[13.5px] leading-snug text-navy-700/80 transition-colors hover:border-blue-600 hover:text-blue-700"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <article className="max-w-[72ch]">
            {children}
            {doc.sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-32 border-t border-navy-900/10 py-8 first:border-t-0 first:pt-0">
                <h2 className="text-[clamp(1.25rem,1.6vw,1.5rem)] font-semibold tracking-[-0.02em]">
                  {s.title}
                </h2>
                <div className="mt-4 grid gap-3.5 text-[15.5px] leading-relaxed text-navy-700">
                  {s.blocks.map((b, i) => (
                    <Block key={i} block={b} />
                  ))}
                </div>
              </section>
            ))}
          </article>
        </div>
      </section>
    </main>
  );
}

const CLAUSE = /^(\d+\.\d+)\s+/;

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") {
    const m = block.match(CLAUSE);
    if (!m) return <p>{block}</p>;
    return (
      <p className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-x-2">
        <span className="num pt-[0.15em] text-[13px] text-blue-700">{m[1]}</span>
        <span>{block.slice(m[0].length)}</span>
      </p>
    );
  }

  if ("list" in block) {
    const Tag = block.ordered ? "ol" : "ul";
    return (
      <Tag
        className={`grid gap-2 pl-5 marker:text-blue-700 ${
          block.ordered ? "list-decimal" : "list-disc"
        }`}
      >
        {block.list.map((item) => (
          <li key={item} className="pl-1">
            {item}
          </li>
        ))}
      </Tag>
    );
  }

  return (
    <div className="overflow-x-auto rounded-inner border border-navy-900/10">
      <table className="w-full min-w-[480px] border-collapse text-left text-[14px]">
        <thead className="bg-ink-100">
          <tr>
            {block.table.head.map((h) => (
              <th key={h} scope="col" className="px-4 py-2.5 font-semibold text-navy-900">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.table.rows.map((row) => (
            <tr key={row.join("|")} className="border-t border-navy-900/10 align-top">
              {row.map((cell, i) => (
                <td key={i} className="px-4 py-2.5">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
