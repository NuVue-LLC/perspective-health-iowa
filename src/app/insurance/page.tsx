import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Phone, ArrowRight, PiggyBank, Wallet } from "lucide-react";
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
          <p className="font-script text-5xl sm:text-6xl lg:text-7xl text-white font-light mb-2 sm:mb-3 ml-1">
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
      <section className="section-padding geometric-pattern-green">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="font-script text-3xl text-white/90 mb-2">Tax-Advantaged Options</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              Pay With <span className="text-white/80">HSA or FSA</span>
            </h2>
            <div className="w-16 h-1 bg-white rounded-full mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "HSA",
                subtitle: "Health Savings Account",
                Icon: PiggyBank,
                accent: "teal" as const,
                points: [
                  "Use pre-tax dollars to pay for eligible healthcare expenses",
                  "Accepted for most services at Perspective Health",
                  "Bring your HSA debit card or reimbursement form",
                  "Great for services with cost-sharing or deductibles",
                ],
              },
              {
                title: "FSA",
                subtitle: "Flexible Spending Account",
                Icon: Wallet,
                accent: "purple" as const,
                points: [
                  "Employer-sponsored pre-tax healthcare spending account",
                  "Use for copays, deductibles, and eligible services",
                  "Accepted at our clinic for qualifying expenses",
                  "Check your FSA plan for covered services",
                ],
              },
            ].map(({ title, subtitle, Icon, accent, points }) => {
              const accentClasses = {
                teal: {
                  border: "border-t-4 border-teal",
                  badge: "bg-teal/10",
                  icon: "text-teal",
                  title: "text-teal",
                  badgeHover: "group-hover:bg-teal",
                  iconHover: "group-hover:text-white",
                },
                purple: {
                  border: "border-t-4 border-purple",
                  badge: "bg-purple/10",
                  icon: "text-purple",
                  title: "text-purple",
                  badgeHover: "group-hover:bg-purple",
                  iconHover: "group-hover:text-white",
                },
              }[accent];
              return (
                <div
                  key={title}
                  className={`group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${accentClasses.border}`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${accentClasses.badge} ${accentClasses.badgeHover} group-hover:scale-105`}>
                      <Icon size={26} strokeWidth={2} className={`transition-colors ${accentClasses.icon} ${accentClasses.iconHover}`} />
                    </div>
                    <div>
                      <h3 className={`text-2xl font-extrabold ${accentClasses.title}`}>
                        {title}
                      </h3>
                      <p className="text-gray-500 text-sm">{subtitle}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle
                          size={18}
                          className={`flex-shrink-0 mt-0.5 ${accentClasses.icon}`}
                        />
                        <span className="text-sm text-gray-700 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Self-pay / Pricing */}
      <section className="section-padding bg-white">
        <div className="section-container max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal mb-4">
              SELF-PAY <span className="text-teal">PRICING</span>
            </h2>
            <div className="w-16 h-1 bg-teal rounded-full mx-auto mb-6" />
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We believe in transparent pricing. If you don&apos;t have insurance
              or your plan doesn&apos;t cover a specific service, we offer clear,
              fair self-pay rates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[
              { service: "New Patient Comprehensive Visit", detail: "60–90 min" },
              { service: "Follow-Up Visit", detail: "30 min" },
              { service: "Hormone Evaluation & Consultation", detail: null },
              { service: "Functional Medicine Consultation", detail: null },
              { service: "Nutrition Counseling Session", detail: null },
              { service: "Lab Processing", detail: "in addition to lab fees" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md hover:border-teal/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-charcoal leading-snug">{item.service}</p>
                    {item.detail && (
                      <p className="text-xs text-gray-400 mt-1">{item.detail}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-teal/10 border border-teal/20 rounded-2xl p-6 text-center mb-8">
            <p className="text-charcoal font-semibold mb-1">
              Contact us for current self-pay rates
            </p>
            <p className="text-gray-500 text-sm">
              Pricing varies by service. Lab fees are billed separately. We&apos;re happy to provide a quote before your visit.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
