import type { Metadata } from "next";
import Link from "next/link";
import { PEPTIDE_FUNNEL } from "@/lib/peptide-funnel";
import { MetaPixel } from "@/components/funnel/MetaPixel";
import { Steps } from "@/components/funnel/Steps";

export const metadata: Metadata = {
  title: "Peptide Therapy in the Des Moines Metro",
  description: "Find out if peptide therapy is right for you.",
};

export default function PeptideOfferPage() {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <MetaPixel pixelId={PEPTIDE_FUNNEL.pixelId} events={["ViewContent"]} />
      <Steps current={1} total={3} />
      <p className="text-sm font-semibold uppercase tracking-[0.06em] text-purple sm:text-lg">Des Moines Metro</p>
      <h1 className="mt-2 text-[34px] font-medium leading-[1.1] text-[#2B2B2B] sm:text-[56px]">
        Is peptide therapy <strong className="font-extrabold text-teal">right for you?</strong>
      </h1>
      <p className="mt-4 text-lg text-[#4A4A4A] sm:text-xl">Three quick questions, then a quick call with our clinic.</p>
      {PEPTIDE_FUNNEL.offer && (
        <div className="mx-auto mt-6 w-full rounded-2xl bg-teal px-6 py-4 text-white shadow-lg shadow-teal/25 sm:w-fit sm:px-12">
          <p className="text-[44px] font-extrabold uppercase leading-none tracking-tight sm:text-[56px]">
            {PEPTIDE_FUNNEL.offerBig}
          </p>
          <p className="mt-1 text-lg font-semibold sm:text-xl">{PEPTIDE_FUNNEL.offerRest}</p>
        </div>
      )}
      <Link
        href="/go/peptides/start"
        className="mt-5 inline-block w-full rounded-full bg-purple px-10 py-4 text-xl font-semibold text-white shadow-lg shadow-purple/25 transition hover:bg-purple-600 sm:w-auto"
      >
        Next
      </Link>
    </div>
  );
}
