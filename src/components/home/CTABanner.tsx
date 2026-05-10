import Link from "next/link";
import { Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

interface CTABannerProps {
  heading?: string;
  subtext?: string;
}

export function CTABanner({
  heading = "Your Journey to Better Health Starts Here",
  subtext = "Take the first step - our team is ready to listen.",
}: CTABannerProps) {
  return (
    <section className="bg-purple geometric-pattern py-14 sm:py-16 relative overflow-hidden">
      <div className="section-container relative z-10">
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
              className="btn-teal px-7 py-2.5 text-sm"
            >
              Get in Touch
            </Link>
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center gap-2 border border-white/30 text-white font-medium px-7 py-2.5 text-sm rounded-full hover:border-white hover:bg-white/10 transition-colors"
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
