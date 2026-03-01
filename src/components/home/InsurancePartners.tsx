import Image from "next/image";
import Link from "next/link";
import { INSURANCE_PARTNERS } from "@/lib/constants";

export function InsurancePartners() {
  return (
    <section className="section-padding bg-sage/30">
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal mb-4">
            OUR INSURANCE{" "}
            <span className="text-teal">PARTNERS</span>
          </h2>
          <div className="w-16 h-1 bg-teal rounded-full mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            We accept most major insurance plans and are continuously working to
            add more partners. We also accept HSA/FSA and offer transparent
            self-pay pricing.{" "}
            <Link href="/insurance" className="text-teal font-medium hover:underline">
              Learn more about your coverage options.
            </Link>
          </p>
        </div>

        {/* Logo grid — 4 on top, 3 centered below */}
        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {INSURANCE_PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="bg-white rounded-xl p-6 flex items-center justify-center w-[calc(50%-12px)] sm:w-[calc(25%-18px)] h-32 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              {partner.logo.endsWith(".svg") ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={partner.logo}
                  alt={`${partner.name} insurance accepted at Perspective Health Iowa`}
                  className="max-h-20 max-w-full object-contain"
                />
              ) : (
                <div className="relative w-full h-20">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} insurance accepted at Perspective Health Iowa`}
                    fill
                    className="object-contain"
                    sizes="220px"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Not sure if we accept your insurance?{" "}
          <Link href="/contact" className="text-teal font-medium hover:underline">
            Contact us
          </Link>{" "}
          — we&apos;re happy to verify your benefits.
        </p>

        {/* CareCredit section */}
        <div className="mt-12 bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-100 text-center">
          <h3 className="text-2xl font-bold text-charcoal mb-3">
            Flexible Financing with{" "}
            <span className="text-teal">CareCredit</span>
          </h3>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            We proudly accept CareCredit to help make your healthcare more
            affordable. Apply today and get the care you need, when you need it.
          </p>
          <a
            href="https://www.carecredit.com/go/344RFJ/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-teal inline-flex"
          >
            Apply with CareCredit
          </a>
        </div>
      </div>
    </section>
  );
}
