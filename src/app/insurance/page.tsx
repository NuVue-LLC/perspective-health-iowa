import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Phone, ArrowRight } from "lucide-react";
import { INSURANCE_PARTNERS, SITE_CONFIG } from "@/lib/constants";
import { CTABanner } from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "Insurance & Pricing",
  description:
    "Perspective Health Iowa accepts most major insurance plans including Wellmark BCBS, UnitedHealthcare, Medicare, and more. We also offer HSA/FSA and transparent self-pay pricing.",
  openGraph: {
    title: "Insurance & Pricing | Perspective Health Iowa",
    description:
      "Insurance information and self-pay pricing for Perspective Health Iowa.",
  },
};

export default function InsurancePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col justify-end overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-insurance.jpg"
            alt="Healthcare professional reviewing insurance paperwork and forms"
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
            No Surprises
          </p>
          <h1 className="flex flex-col items-start gap-2 sm:gap-3">
            <span className="inline-block bg-teal/90 px-4 py-2.5 sm:px-6 sm:py-3 text-white text-xl sm:text-2xl lg:text-3xl font-normal tracking-wide uppercase">
              Insurance & Pricing
            </span>
          </h1>
          <p className="text-white/80 text-lg max-w-xl mt-4">
            We believe great healthcare should be accessible. We work with most
            major insurers and offer transparent pricing for all services.
          </p>
        </div>
      </section>

      {/* Insurance partners */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-extrabold text-charcoal mb-4">
              ACCEPTED <span className="text-teal">INSURANCE PLANS</span>
            </h2>
            <div className="w-16 h-1 bg-teal rounded-full mx-auto mb-6" />
            <p className="text-gray-600 text-lg">
              We accept most major insurance plans and are continuously adding
              new partners. We also accept HSA (Health Savings Account) and
              FSA (Flexible Spending Account) for eligible services.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-5 max-w-4xl mx-auto mb-10">
            {INSURANCE_PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="bg-white rounded-xl p-5 flex flex-col items-center justify-center w-[calc(50%-10px)] sm:w-[calc(25%-15px)] h-28 shadow-sm border border-gray-100 hover:border-teal/30 hover:shadow-md transition-all"
              >
                {partner.logo.endsWith(".svg") ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={partner.logo}
                    alt={`${partner.name} — accepted at Perspective Health Iowa`}
                    className="max-h-12 max-w-full object-contain mb-1"
                  />
                ) : (
                  <div className="relative w-full h-12 mb-1">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} — accepted at Perspective Health Iowa`}
                      fill
                      className="object-contain"
                      sizes="180px"
                    />
                  </div>
                )}
                <p className="text-xs text-gray-500 text-center mt-1 leading-tight">
                  {partner.name}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-teal/10 border border-teal/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
              <Phone size={20} className="text-teal" />
            </div>
            <div className="flex-grow">
              <p className="font-semibold text-charcoal">
                Not sure if we accept your insurance?
              </p>
              <p className="text-gray-600 text-sm">
                Call us and we&apos;ll verify your benefits before your first
                appointment — no surprises.
              </p>
            </div>
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="btn-teal whitespace-nowrap flex-shrink-0"
            >
              {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      </section>

      {/* HSA / FSA */}
      <section className="section-padding bg-teal geometric-pattern">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "HSA — Health Savings Account",
                color: "teal",
                points: [
                  "Use pre-tax dollars to pay for eligible healthcare expenses",
                  "Accepted for most services at Perspective Health",
                  "Bring your HSA debit card or reimbursement form",
                  "Great for services with cost-sharing or deductibles",
                ],
              },
              {
                title: "FSA — Flexible Spending Account",
                color: "purple",
                points: [
                  "Employer-sponsored pre-tax healthcare spending account",
                  "Use for copays, deductibles, and eligible services",
                  "Accepted at our clinic for qualifying expenses",
                  "Check your FSA plan for covered services",
                ],
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`bg-white rounded-2xl p-8 shadow-md border-t-4 ${
                  item.color === "teal" ? "border-teal" : "border-purple"
                }`}
              >
                <h3 className="text-xl font-bold text-charcoal mb-4">
                  {item.title}
                </h3>
                <ul className="space-y-3">
                  {item.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <CheckCircle
                        size={16}
                        className={`flex-shrink-0 mt-0.5 ${
                          item.color === "teal" ? "text-teal" : "text-purple"
                        }`}
                      />
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Self-pay / Pricing */}
      <section className="section-padding bg-white">
        <div className="section-container max-w-4xl">
          <h2 className="text-3xl font-extrabold text-charcoal mb-4">
            SELF-PAY <span className="text-teal">PRICING</span>
          </h2>
          <div className="w-16 h-1 bg-teal rounded-full mb-6" />
          <p className="text-gray-600 mb-8 text-lg">
            We believe in transparent pricing. If you don&apos;t have insurance
            or your plan doesn&apos;t cover a specific service, we offer clear,
            fair self-pay rates. Contact us for a personalized quote.
          </p>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h3 className="font-bold text-charcoal mb-5">Services available at self-pay rates:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                "New Patient Comprehensive Visit (60–90 min)",
                "Follow-Up Visit (30 min)",
                "Hormone Evaluation & Consultation",
                "Functional Medicine Consultation",
                "Nutrition Counseling Session",
                "Lab Processing (in addition to lab fees)",
              ].map((service, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-sage/30 rounded-xl p-4"
                >
                  <CheckCircle size={16} className="text-teal flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{service}</span>
                </div>
              ))}
            </div>
            <div className="bg-teal/10 border border-teal/20 rounded-xl p-5 text-center">
              <p className="text-charcoal font-semibold mb-1">
                Contact us for current self-pay rates
              </p>
              <p className="text-gray-500 text-sm">
                Pricing varies by service. Lab fees are billed separately. We&apos;re happy to provide a quote before your visit.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/contact#contact-form" className="btn-teal">
              Get Pricing Info
            </Link>
            <Link href="/for-patients" className="btn-outline-teal inline-flex items-center gap-2">
              Patient Resources <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <CTABanner heading="Questions About Your Coverage?" subtext="Contact us and we'll verify your benefits before your first visit." />
    </>
  );
}
