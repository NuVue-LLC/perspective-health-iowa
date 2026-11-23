import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { CALLBACKS_ENABLED, PEPTIDE_FUNNEL } from "@/lib/peptide-funnel";
import { MetaPixel } from "@/components/funnel/MetaPixel";
import { CallbackForm } from "@/components/funnel/CallbackForm";

export const metadata: Metadata = {
  title: "Request a Callback",
  description: "Tell us when to call and our front desk will call you.",
};

export default function PeptideBookPage() {
  if (!CALLBACKS_ENABLED) redirect("/go/peptides/call");
  return (
    <div className="mx-auto w-full max-w-md text-center">
      <MetaPixel pixelId={PEPTIDE_FUNNEL.pixelId} events={["CallbackStart"]} />
      <h1 className="mb-5 text-[28px] font-medium leading-[1.15] text-[#2B2B2B] sm:text-[40px]">
        We&apos;ll <strong className="font-extrabold text-teal">call you.</strong>
      </h1>
      <CallbackForm phone={SITE_CONFIG.phone} />
    </div>
  );
}
