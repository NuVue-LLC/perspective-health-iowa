import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { CALLBACKS_ENABLED, PEPTIDE_FUNNEL } from "@/lib/peptide-funnel";
import { MetaPixel } from "@/components/funnel/MetaPixel";
import { VslPlayer } from "@/components/funnel/VslPlayer";
import { CallPanel } from "@/components/funnel/CallPanel";
import { Steps } from "@/components/funnel/Steps";

export const metadata: Metadata = {
  title: "Call to Take the Next Step",
  description: "Call Perspective Health to take the next step.",
};

export default function PeptideCallPage() {
  const { video } = PEPTIDE_FUNNEL;
  return (
    <div className="mx-auto w-full max-w-5xl text-center">
      {/* Reaching this page means all three qualifying answers were Yes. */}
      <MetaPixel pixelId={PEPTIDE_FUNNEL.pixelId} events={["Lead"]} />
      <Steps current={3} total={3} />
      <h1 className="text-[26px] font-medium leading-[1.15] text-[#2B2B2B] sm:text-[38px]">
        You&apos;re a fit. <strong className="font-extrabold text-teal">Call now</strong> to take the next step.
      </h1>
      <div className="mt-4 text-left">
        <VslPlayer
          src={video.src}
          poster={video.poster}
          duration={video.duration}
          chapters={video.chapters}
          startTitle="Meet Stacey first"
          startSub="1 minute, sound on"
          endText="Call us to take the next step."
          aside={
            <CallPanel
              phone={SITE_CONFIG.phone}
              phoneRaw={SITE_CONFIG.phoneRaw}
              hours={PEPTIDE_FUNNEL.officeHours}
              callbacks={CALLBACKS_ENABLED}
            />
          }
        />
      </div>
    </div>
  );
}
