import Link from "next/link";
import { Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

interface CTABannerProps {
  heading?: string;
  subtext?: string;
}

export function CTABanner({
  heading = "Your Journey to Better Health Starts Here",
  subtext = "Take the first step — our team is ready to listen.",
}: CTABannerProps) {
  return (
    <section className="bg-teal geometric-pattern py-12 sm:py-14">
      <div className="section-container">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-2">
            {heading}
          </h2>
          <p className="text-white/80 leading-relaxed mb-7">
            {subtext}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact#contact-form"
              className="btn-primary px-7 py-2.5 text-sm"
            >
              Schedule a Consultation
            </Link>
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center gap-2 border border-white/40 text-white font-medium px-7 py-2.5 text-sm rounded-lg hover:bg-white/10 hover:border-white transition-colors"
            >
              <Phone size={15} />
              Call {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
