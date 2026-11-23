import type { Metadata } from "next";
import { PEPTIDE_FUNNEL } from "@/lib/peptide-funnel";
import { MetaPixel } from "@/components/funnel/MetaPixel";
import { Qualifier } from "@/components/funnel/Qualifier";
import { Steps } from "@/components/funnel/Steps";

export const metadata: Metadata = {
  title: "Three Quick Questions",
  description: "Three quick questions before your call.",
};

export default function PeptideStartPage() {
  return (
    <div className="mx-auto w-full max-w-xl text-center">
      <MetaPixel pixelId={PEPTIDE_FUNNEL.pixelId} events={["InitiateCheckout"]} />
      <Steps current={2} total={3} />
      <h1 className="mb-5 text-[28px] font-medium leading-[1.15] text-[#2B2B2B] sm:text-[40px]">
        Three <strong className="font-extrabold text-teal">quick questions.</strong>
      </h1>
      <Qualifier questions={PEPTIDE_FUNNEL.questions} yesHref="/go/peptides/call" noHref="/go/peptides/not-a-fit" />
    </div>
  );
}
