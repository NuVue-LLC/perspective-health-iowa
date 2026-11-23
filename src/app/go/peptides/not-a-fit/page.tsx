import type { Metadata } from "next";
import Link from "next/link";
import { PEPTIDE_FUNNEL } from "@/lib/peptide-funnel";
import { MetaPixel } from "@/components/funnel/MetaPixel";

export const metadata: Metadata = {
  title: "Thanks for Checking",
  description: "Thanks for checking with Perspective Health.",
};

export default function PeptideNotAFitPage() {
  return (
    <div className="mx-auto max-w-xl text-center">
      <MetaPixel pixelId={PEPTIDE_FUNNEL.pixelId} />
      <h1 className="text-[30px] font-medium leading-[1.15] text-[#2B2B2B] sm:text-[44px]">
        Thanks for <strong className="font-extrabold text-teal">checking.</strong>
      </h1>
      <p className="mt-4 text-lg text-[#4A4A4A]">
        Based on your answers, peptide consults with us aren&apos;t the right fit right now. We see patients who
        are 18 or older and in Iowa.
      </p>
      <Link href="/" className="mt-6 inline-block font-semibold text-teal-700 underline underline-offset-4">
        See what else we offer
      </Link>
    </div>
  );
}
