import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// Ad funnel pages: standalone (no site nav), kept out of search results.
// Each step is one screen: small logo, one message, one action, no scrolling.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function FunnelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100svh] flex-col bg-gradient-to-b from-teal-50 to-white font-sans text-charcoal">
      <header className="flex justify-center border-b-4 border-teal bg-white px-4 py-1.5">
        <Image
          src="/images/brand/phi-logo-horizontal.jpg"
          alt="Perspective Health Iowa"
          width={2000}
          height={714}
          priority
          className="h-auto w-[150px] sm:w-[180px]"
        />
      </header>
      <div className="flex flex-1 flex-col justify-center px-4 py-4 sm:py-6">{children}</div>
      <footer className="px-4 pb-2 text-center text-[11px] leading-snug text-[#6b7673]">
        Not medical advice. Results vary. Compounded medications are not FDA-approved.{" "}
        <Link href="/privacy-policy" className="underline">Privacy</Link>
        {" · "}
        <Link href="/hipaa-notice" className="underline">HIPAA</Link>
      </footer>
    </div>
  );
}
