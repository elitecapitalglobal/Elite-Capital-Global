import type { Metadata } from "next";
import { withdrawalPolicy } from "@/content/legal/withdrawal-policy";
import { LegalPage } from "@/components/pages/LegalPage";

export const metadata: Metadata = {
  title: `${withdrawalPolicy.title} | Elite fx Capital`,
  description: withdrawalPolicy.summary,
};

export default function WithdrawalPolicyPage() {
  return <LegalPage doc={withdrawalPolicy} />;
}
