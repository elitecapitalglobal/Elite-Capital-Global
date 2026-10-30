import type { Metadata } from "next";
import { riskDisclosure } from "@/content/legal/risk-disclosure";
import { LegalPage } from "@/components/pages/LegalPage";

export const metadata: Metadata = {
  title: `${riskDisclosure.title} | Elite fx Capital`,
  description: riskDisclosure.summary,
};

export default function RiskDisclosurePage() {
  return <LegalPage doc={riskDisclosure} />;
}
