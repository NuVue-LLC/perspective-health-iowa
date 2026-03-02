import Link from "next/link";
import { Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function CTABanner() {
  return (
    <section className="bg-gradient-to-br from-sage/50 via-white to-teal/10 py-20 sm:py-24 lg:py-28">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-script text-3xl sm:text-4xl text-teal mb-3">
            Take the First Step
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal leading-tight mb-5">
            Your Journey to Better Health{" "}
            <span className="text-teal">Starts Here</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Our team is ready to listen, understand, and build a plan just for
            you. Whether you&apos;re a new patient or looking for a new
            perspective on your health &mdash; we&apos;re here.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-teal text-base px-8 py-3.5 shadow-lg"
            >
              Schedule a Consultation
            </Link>
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center gap-2 border-2 border-charcoal/20 text-charcoal font-semibold px-8 py-3 rounded-lg hover:border-teal hover:text-teal transition-colors"
            >
              <Phone size={16} />
              Call {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
