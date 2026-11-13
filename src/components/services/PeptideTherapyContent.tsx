import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  GraduationCap,
  MapPin,
  Phone,
  ShieldCheck,
  Video,
} from "lucide-react";
import type { ServiceData } from "@/lib/services-data";
import { SITE_CONFIG } from "@/lib/constants";

/*
 * Peptide Therapy page body.
 *
 * WORDING RULES (see docs/peptide-marketing-research.md before editing):
 *  - Do not name, price, or describe the effects of any specific peptide.
 *  - Do not say a peptide treats, cures, heals, reverses, or prevents anything.
 *  - Do not promise results or timelines. Goals are what patients ask about.
 *  - Keep "Compounded medications are not FDA-approved" wherever compounding
 *    comes up.
 *  - No individual provider is named on this page (clinic request,
 *    2026-11-13). Say "your provider" or "our providers".
 *  - The two opening sections are the clinic's own wording (service.intro and
 *    service.whatItIs). Do not edit them without asking the clinic.
 *  - The call to action is a phone call to the office. No online booking.
 */

interface RelatedService {
  slug: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
}

interface Props {
  service: ServiceData;
  relatedServices: (RelatedService | undefined)[];
  introImage: { src: string; alt: string };
}

const WHY_A_PROVIDER = [
  {
    title: "You know what you are taking",
    body: "Prescriptions are filled by a licensed pharmacy. We never use products labeled “for research use only,” which are not made or labeled for people to use.",
  },
  {
    title: "The plan is built around you",
    body: "Your provider reviews your goals, health history, medications, and labs before prescribing anything. Sometimes the right answer is a different treatment, or no prescription at all.",
  },
  {
    title: "Someone is following along",
    body: "Scheduled follow-ups are part of the plan, so your provider can see how you are responding and adjust or stop it.",
  },
];

const METRO_CITIES = [
  "Urbandale",
  "Johnston",
  "Grimes",
  "Clive",
  "Waukee",
  "West Des Moines",
  "Ankeny",
  "Des Moines",
];

export default function PeptideTherapyContent({
  service,
  relatedServices,
  introImage,
}: Props) {
  const pageUrl = `${SITE_CONFIG.url}/services/${service.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_CONFIG.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${SITE_CONFIG.url}/services`,
      },
      { "@type": "ListItem", position: 3, name: service.name, item: pageUrl },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: service.metaTitle ?? service.headline,
    description: service.metaDescription,
    url: pageUrl,
    inLanguage: "en-US",
    about: { "@type": "MedicalTherapy", name: "Peptide therapy" },
    audience: { "@type": "Patient" },
    publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      {/* Section 1 - White: what peptide therapy is */}
      <section className="bg-white">
        <div className="section-container py-16 sm:py-20 lg:py-24">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm text-gray-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-teal">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/services" className="hover:text-teal">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-charcoal font-medium" aria-current="page">
                Peptide Therapy
              </li>
            </ol>
          </nav>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-center mb-16 leading-tight">
            <span className="text-teal">Support Your Body&apos;s</span>{" "}
            <span className="text-charcoal">Natural Messengers</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg w-full">
              <Image
                src={introImage.src}
                alt={introImage.alt}
                fill
                quality={85}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {service.intro}
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-charcoal leading-tight mb-4">
                Personalized Care, Not a One-Size-Fits-All Product
              </h3>
              <div className="space-y-4 mb-8">
                {service.whatItIs.split("\n\n").map((para, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
              <div className="rounded-2xl bg-sage/40 p-6">
                <p className="text-charcoal leading-relaxed mb-4">
                  <span className="font-bold">Ready to learn more?</span>{" "}
                  Schedule a consultation to find out if peptide therapy is
                  right for you.
                </p>
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="btn-teal px-7 py-3 inline-flex items-center gap-2"
                >
                  <Phone size={16} />
                  Call {SITE_CONFIG.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Green: how a consultation works */}
      <section className="geometric-pattern-green">
        <div className="section-container py-16 sm:py-20 lg:py-24 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 mb-5">
              <Video size={28} className="text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight mb-4">
              How a Peptide Consultation Works
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Call our office to get started. Consultations happen by secure
              video, so you can meet with your provider from home, anywhere in
              Iowa.
            </p>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {service.whatToExpect.map((step, i) => (
              <li
                key={i}
                className="bg-white rounded-2xl p-6 shadow-lg flex items-start gap-4"
              >
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-purple text-white text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-gray-700 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
          <p className="text-white/80 text-sm text-center mt-10 max-w-2xl mx-auto">
            You must be physically located in Iowa at the time of each virtual
            visit. A consultation does not guarantee a prescription.
          </p>
        </div>
      </section>

      {/* Section 4 - White: why a provider, who it's for */}
      <section className="bg-white">
        <div className="section-container py-16 sm:py-20 lg:py-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight leading-tight mb-4">
              <span className="text-teal">Peptide Solutions</span>{" "}
              <span className="text-charcoal">Without the Guesswork</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              A lot of people find peptides through a forum, a podcast, or an
              online store. Working with a licensed provider is a different
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {WHY_A_PROVIDER.map((item, i) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 shadow-sm p-7"
              >
                <span className="inline-flex w-9 h-9 rounded-full bg-teal text-white text-sm font-bold items-center justify-center mb-4">
                  {i + 1}
                </span>
                <h3 className="text-lg font-bold text-charcoal mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
              <h3 className="text-2xl font-extrabold uppercase tracking-tight text-charcoal mb-6">
                Who It&apos;s For
              </h3>
              <div className="space-y-3">
                {service.whoItsFor.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-sage/30 rounded-xl p-4"
                  >
                    <CheckCircle
                      size={16}
                      className="text-teal flex-shrink-0 mt-0.5"
                    />
                    <span className="text-sm text-gray-700 leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
              <h3 className="text-2xl font-extrabold uppercase tracking-tight text-charcoal mb-6">
                Our Approach
              </h3>
              <div className="space-y-3">
                {service.benefits.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-purple/5 rounded-xl p-4"
                  >
                    <div className="w-2 h-2 rounded-full bg-purple mt-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700 leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 - Light: safety and eligibility */}
      {service.safetyNotes && (
        <section className="geometric-pattern-light" id="safety">
          <div className="section-container py-16 sm:py-20 lg:py-24">
            <div className="max-w-4xl mx-auto bg-white border border-teal/20 rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-teal" />
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={26} className="text-teal" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-charcoal">
                  Safety &amp; Eligibility
                </h2>
              </div>
              <ul className="space-y-4">
                {service.safetyNotes.map((note, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle
                      size={18}
                      className="text-teal flex-shrink-0 mt-1"
                    />
                    <span className="text-gray-700 leading-relaxed">{note}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-500 text-sm italic mt-8">
                Individual results vary. Peptide therapy is one part of a
                broader care plan, not a cure or a quick fix, and is only
                prescribed when your provider believes it is appropriate for
                you.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Section 6 - White: where we are */}
      <section className="bg-white" id="location">
        <div className="section-container py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal/10 mb-5">
              <MapPin size={28} className="text-teal" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight leading-tight mb-5">
              <span className="text-teal">Peptide Therapy</span>{" "}
              <span className="text-charcoal">
                in the Des Moines Metro and Across Iowa
              </span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Perspective Health Iowa is located at {SITE_CONFIG.address.full},
              close to patients throughout the Des Moines metro.
            </p>
            <ul className="flex flex-wrap justify-center gap-2 mb-6">
              {METRO_CITIES.map((city) => (
                <li
                  key={city}
                  className="px-4 py-2 rounded-full bg-sage/40 text-sm text-gray-700"
                >
                  {city}
                </li>
              ))}
            </ul>
            <p className="text-gray-600 leading-relaxed">
              Because peptide consultations are virtual, we can also see
              adults elsewhere in Iowa, as long as you are in the state during
              your visit. Not sure whether that covers you? Call us at{" "}
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="text-teal font-semibold hover:underline"
              >
                {SITE_CONFIG.phone}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Section 7 - FAQs + contact + related */}
      <section className="bg-white border-t border-gray-200" id="faq">
        <div className="section-container py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-center leading-tight mb-10">
              <span className="text-teal">Peptide Therapy</span>{" "}
              <span className="text-charcoal">Questions</span>
            </h2>
            <div className="space-y-3">
              {service.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group border border-gray-200 rounded-xl hover:border-teal/30 transition-colors"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-charcoal list-none [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base font-semibold">{faq.question}</h3>
                    <ChevronDown
                      size={20}
                      className="text-teal flex-shrink-0 ml-4 transition-transform duration-300 group-open:rotate-180"
                    />
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
              <p className="text-charcoal font-semibold">
                Ready to learn more? Call our office to schedule a
                consultation.
              </p>
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="btn-teal px-7 py-3 inline-flex items-center gap-2"
              >
                <Phone size={16} />
                Call {SITE_CONFIG.phone}
              </a>
            </div>

            <p className="flex items-start gap-3 text-gray-500 text-xs leading-relaxed mt-12 border-t border-gray-200 pt-6">
              <GraduationCap size={16} className="flex-shrink-0 mt-0.5" />
              <span>
                This page is general education, not medical advice, and it
                does not replace a visit with a licensed provider. Compounded
                medications are not FDA-approved. Individual results vary, and
                a consultation does not guarantee a prescription.
              </span>
            </p>
          </div>

          {relatedServices.length > 0 && (
            <section className="mt-20">
              <h2 className="text-2xl font-bold text-charcoal mb-6">
                Related Services
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {relatedServices.map(
                  (related) =>
                    related && (
                      <Link
                        key={related.slug}
                        href={`/services/${related.slug}`}
                        className="group rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md hover:border-teal/40 transition-all"
                      >
                        <div className="relative h-40 overflow-hidden">
                          <Image
                            src={related.image}
                            alt={related.imageAlt}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-charcoal group-hover:text-teal transition-colors mb-2">
                            {related.name}
                          </h3>
                          <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                            {related.description}
                          </p>
                          <span className="inline-flex items-center gap-1.5 text-teal text-sm font-semibold">
                            Learn more <ArrowRight size={14} />
                          </span>
                        </div>
                      </Link>
                    )
                )}
              </div>
            </section>
          )}
        </div>
      </section>
    </article>
  );
}
