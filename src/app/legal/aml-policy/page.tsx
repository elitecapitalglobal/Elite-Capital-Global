import type { Metadata } from "next";
import { amlPolicy } from "@/content/legal/aml-policy";
import { LegalPage } from "@/components/pages/LegalPage";

export const metadata: Metadata = {
  title: `${amlPolicy.title} | Elite fx Capital`,
  description: amlPolicy.summary,
};

export default function AmlPolicyPage() {
  return <LegalPage doc={amlPolicy} />;
}
