import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * Pages served with the strict, per-request security policy (see
 * `src/proxy.ts`). A browser applies a page's policy only when it loads the
 * page as a document; Next's in-app navigation keeps the previous page's
 * (lighter) policy. So links to these pages are plain <a> tags — a full load
 * that picks up the strict policy — and every other link stays a fast `Link`.
 */
const STRICT_PAGES = new Set(["/signup", "/login"]);

export function SiteLink({ href, prefetch, ...props }: ComponentProps<typeof Link>) {
  if (typeof href === "string" && STRICT_PAGES.has(href.split(/[?#]/)[0])) {
    return <a href={href} {...(props as ComponentProps<"a">)} />;
  }
  return <Link href={href} prefetch={prefetch} {...props} />;
}
