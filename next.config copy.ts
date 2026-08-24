import type { NextConfig } from "next";
import { DEFAULT_LANGUAGE } from "./src/content/languages";

const nextConfig: NextConfig = {
  /**
   * Every route on the site is locale-scoped (`src/app/[lang]/...`), so there
   * is no page at `/`. Sending it to the default locale here rather than with
   * an `app/page.tsx` keeps the root layout inside `[lang]`, which is what
   * lets `<html lang>` and `dir` be correct in the served HTML.
   *
   * Deliberately NOT permanent: a `308` is cached by browsers effectively
   * forever, and the day this starts negotiating a locale from
   * `Accept-Language` — or the default changes — every returning visitor would
   * be pinned to the old target with no way to clear it.
   */
  async redirects() {
    return [
      { source: "/", destination: `/${DEFAULT_LANGUAGE}`, permanent: false },
    ];
  },
};

export default nextConfig;
