import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES, INSURANCE_PARTNERS } from "@/lib/constants";
import { CTABanner } from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore integrative health services at Perspective Health Iowa — comprehensive primary care, hormone health, functional medicine, digestive & metabolic health, and supplementary services.",
  openGraph: {
    title: "Our Services | Perspective Health Iowa",
    description:
      "Personalized integrative health services in Iowa — from primary care to hormone health and functional medicine.",
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative min-h-[60vh] flex flex-col justify-end overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-services.jpg"
            alt="Integrative healthcare services at Perspective Health Iowa"
            fill
            priority
            quality={90}
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/60" />
        </div>
        <div className="relative z-10 px-6 sm:px-12 lg:px-20 pb-16 sm:pb-20 lg:pb-24">
          <p className="font-script text-5xl sm:text-6xl lg:text-7xl text-white -rotate-2 font-light mb-2 sm:mb-3 ml-1">
            What We Offer
          </p>
          <h1 className="flex flex-col items-start gap-2 sm:gap-3">
            <span className="inline-block bg-teal/90 px-4 py-2.5 sm:px-6 sm:py-3 text-white text-xl sm:text-2xl lg:text-3xl font-normal tracking-wide uppercase">
              Our Services
            </span>
          </h1>
          <p className="text-white/80 text-lg max-w-xl mt-4">
            Comprehensive, integrative healthcare designed around you — not just
            your diagnosis. Explore our full range of services below.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="card group overflow-hidden flex flex-col cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading={idx < 3 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="font-bold text-xl text-charcoal mb-3">
                    {service.name}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-5">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-teal font-semibold text-sm uppercase tracking-wider group-hover:gap-3 transition-all">
                    Learn More <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance note */}
      <section className="py-16 bg-sage/40">
        <div className="section-container text-center">
          <h2 className="text-2xl font-bold text-charcoal mb-2">
            Most Services Covered by Insurance
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-10">
            We accept most major insurance plans, Medicare, HSA, and FSA. Not
            sure what&apos;s covered for you?
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-10">
            {INSURANCE_PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 w-32 h-20 flex items-center justify-center hover:shadow-md transition-shadow"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={100}
                  height={40}
                  className="object-contain max-h-10"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/insurance" className="btn-teal">
              View Insurance Info
            </Link>
            <Link href="/contact#contact-form" className="btn-outline-teal">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <CTABanner heading="Not Sure Where to Start?" subtext="Our team can help you find the right service for your needs." />
    </>
  );
}
