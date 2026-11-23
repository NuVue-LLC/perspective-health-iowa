import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { PEPTIDE_FUNNEL } from "@/lib/peptide-funnel";
import { MetaPixel } from "@/components/funnel/MetaPixel";

export const metadata: Metadata = {
  title: "Your Callback Is Set",
  description: "Our front desk will call you at the time you picked.",
};

export default function PeptideBookedPage() {
  return (
    <div className="mx-auto max-w-xl text-center">
      <MetaPixel pixelId={PEPTIDE_FUNNEL.pixelId} events={["Schedule"]} />
      <h1 className="text-[30px] font-medium leading-[1.15] text-[#2B2B2B] sm:text-[44px]">
        You&apos;re set. <strong className="font-extrabold text-teal">We&apos;ll call you.</strong>
      </h1>
      <p className="mt-4 text-lg text-[#4A4A4A]">
        Our front desk will call from <strong className="text-charcoal">{SITE_CONFIG.phone}</strong> in the
        window you picked. Please pick up.
      </p>
      <ul className="mx-auto mt-6 max-w-sm space-y-2 text-left text-lg">
        {PEPTIDE_FUNNEL.checklist.map((item) => (
          <li key={item} className="flex items-center gap-3 rounded-xl border border-sage-100 bg-white px-4 py-2.5">
            <span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-teal text-sm font-bold text-white">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
