import type { Metadata } from "next";
import { privacyPolicy } from "@/content/legal/privacy-policy";
import { LegalPage } from "@/components/pages/LegalPage";

export const metadata: Metadata = {
  title: `${privacyPolicy.title} | Elite fx Capital`,
  description: privacyPolicy.summary,
};

export default function PrivacyPolicyPage() {
  return <LegalPage doc={privacyPolicy} />;
}
