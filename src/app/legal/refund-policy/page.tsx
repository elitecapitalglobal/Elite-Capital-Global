import type { Metadata } from "next";
import { refundPolicy } from "@/content/legal/refund-policy";
import { LegalPage } from "@/components/pages/LegalPage";

export const metadata: Metadata = {
  title: `${refundPolicy.title} | Elite fx Capital`,
  description: refundPolicy.summary,
};

export default function RefundPolicyPage() {
  return <LegalPage doc={refundPolicy} />;
}
