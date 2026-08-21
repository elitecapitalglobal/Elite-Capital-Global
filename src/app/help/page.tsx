import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Help Center" };

/**
 * The help centre IS the FAQ right now, so this route sends readers straight
 * to it rather than standing up a second page that only links onward.
 *
 * A permanent redirect on purpose: `/help` is linked from the nav, the footer
 * and the contact page, and if a real help centre is built later this file is
 * the one place that has to change.
 *
 * When that happens, delete the redirect and render the article index here —
 * every existing link keeps working.
 */
export default function HelpPage() {
  redirect("/#faq");
}
