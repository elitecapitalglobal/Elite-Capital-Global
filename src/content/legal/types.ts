/**
 * Shape of every legal page. Kept as plain data so the wording can be checked
 * line by line against the source documents without reading JSX.
 *
 * A block is a paragraph, a bullet list, or a two-or-more column table.
 * Paragraphs that open with a clause number ("2.1 ") get the number set
 * apart in the page's mono face.
 */
export type LegalBlock =
  | string
  | { list: string[]; ordered?: boolean }
  | { table: { head: string[]; rows: string[][] } };

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  title: string;
  /** One sentence for the hero and the page description. */
  summary: string;
  /** e.g. "Version 20102026_V1.0 · Effective 20 October 2026" */
  meta: string;
  sections: LegalSection[];
};
