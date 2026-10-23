import type { Metadata } from "next";
import { clientAgreement } from "@/content/legal/client-agreement";
import { LegalPage } from "@/components/pages/LegalPage";

export const metadata: Metadata = {
  title: `${clientAgreement.title} | Elite fx Capital`,
  description: clientAgreement.summary,
};

export default function ClientAgreementPage() {
  return <LegalPage doc={clientAgreement} />;
}
