import type { Metadata } from "next";
import { cookiePolicy } from "@/content/legal/cookie-policy";
import { LegalPage } from "@/components/pages/LegalPage";

export const metadata: Metadata = {
  title: `${cookiePolicy.title} | Elite fx Capital`,
  description: cookiePolicy.summary,
};

export default function CookiePolicyPage() {
  return <LegalPage doc={cookiePolicy} />;
}
