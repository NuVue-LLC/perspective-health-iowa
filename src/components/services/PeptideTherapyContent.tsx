import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ClipboardCheck,
  GraduationCap,
  HeartPulse,
  MapPin,
  Phone,
  ShieldCheck,
  Stethoscope,
  Video,
} from "lucide-react";
import type { ServiceData } from "@/lib/services-data";
import { PROVIDERS, SITE_CONFIG } from "@/lib/constants";

/*
 * Peptide Therapy page body.
 *
 * WORDING RULES (see docs/peptide-marketing-research.md before editing):
 *  - Do not name, price, or describe the effects of any specific peptide.
 *  - Do not say a peptide treats, cures, heals, reverses, or prevents anything.
 *  - Do not promise results or timelines. Goals are what patients ask about.
 *  - Keep "Compounded medications are not FDA-approved" wherever compounding
 *    comes up.
 *  - Everything said about Stacey comes from her clinic intro sheet. Do not
 *    add experience claims (patient counts, years with peptides) without her
 *    sign-off.
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

// From Stacey's intro sheet (sent by the clinic, Aug 2026).
const STACEY_EXPERIENCE = [
  {
    icon: Stethoscope,
    title: "Over two decades in medicine",
    detail: "Including eight years in advanced practice as a nurse practitioner.",
  },
  {
    icon: ShieldCheck,
    title: "Board-certified Family Nurse Practitioner",
    detail: "FNP-C, with a BSN and MSN from Graceland University.",
  },
  {
    icon: HeartPulse,
    title: "Emergency and trauma nursing",
    detail: "At Nebraska Medical Center.",
  },
  {
    icon: ClipboardCheck,
    title: "Family practice and functional medicine",
    detail:
      "Plus chronic pain management, and seven years of practice along the Texas Gulf Coast.",
  },
];

const STACEY_FOCUS = [
  "Hormone management",
  "Peptide management",
  "Trigger point and joint injections",
  "Therapeutic and cosmetic Botox",
];

// What people ask about. These are goals, not outcomes.
const COMMON_GOALS = [
  "Energy and vitality",
  "Healthy weight and body composition",
  "Healthy aging",
  "Recovery and staying active",
  "Sexual wellness",
];

const WHY_A_PROVIDER = [
  {
    title: "You know what you are taking",
    body: "Prescriptions are filled by a licensed pharmacy. We never use products labeled “for research use only,” which are not made or labeled for people to use.",
  },
  {
    title: "The plan is built around you",
    body: "Stacey reviews your goals, health history, medications, and labs before she prescribes anything. Sometimes the right answer is a different treatment, or no prescription at all.",
  },
  {
    title: "Someone is following along",
    body: "Scheduled follow-ups are part of the plan, so Stacey can see how you are responding and adjust or stop it.",
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
  const stacey = PROVIDERS.find((p) => p.id === "stacey-darnold");
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
    mentions: stacey
      ? {
          "@type": "Physician",
          name: stacey.name,
          honorificSuffix: stacey.credentials,
          jobTitle: stacey.title,
          url: `${SITE_CONFIG.url}/about#${stacey.id}`,
          worksFor: { "@id": `${SITE_CONFIG.url}/#organization` },
        }
      : undefined,
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
            <span className="text-teal">Peptide Therapy,</span>{" "}
            <span className="text-charcoal">Guided by a Provider</span>
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
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {service.intro}
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                {service.whatItIs}
              </p>
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-charcoal mb-4">
                What people ask Stacey about
              </h3>
              <ul className="flex flex-wrap gap-2 mb-4">
                {COMMON_GOALS.map((goal) => (
                  <li
                    key={goal}
                    className="px-4 py-2 rounded-full bg-sage/40 text-sm text-gray-700"
                  >
                    {goal}
                  </li>
                ))}
              </ul>
              <p className="text-gray-500 text-sm leading-relaxed">
                These are goals, not promises. Whether a peptide is appropriate
                for you, and what it can reasonably do, is the conversation
                you have with Stacey at your visit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Light: Stacey and her experience */}
      {stacey && (
        <section className="geometric-pattern-light" id="stacey">
          <div className="section-container py-16 sm:py-20 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
              <div className="lg:sticky lg:top-28">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg w-full max-w-sm mx-auto">
                  <Image
                    src={stacey.image}
                    alt={stacey.imageAlt}
                    fill
                    quality={85}
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
                <ul className="flex flex-wrap justify-center gap-2 mt-6 max-w-sm mx-auto">
                  {STACEY_FOCUS.map((focus) => (
                    <li
                      key={focus}
                      className="px-3 py-1.5 rounded-full bg-white border border-teal/30 text-xs font-medium text-charcoal"
                    >
                      {focus}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-teal text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-3">
                  Your Peptide Therapy Provider
                </p>
                <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-charcoal leading-tight mb-2">
                  Meet {stacey.name},{" "}
                  <span className="whitespace-nowrap text-teal">
                    {stacey.credentials}
                  </span>
                </h2>
                <p className="text-purple italic font-medium mb-6">
                  {stacey.title}, Board Certified
                </p>

                <p className="text-gray-700 text-lg leading-relaxed mb-5">
                  Every peptide plan at Perspective Health goes through
                  Stacey. She is a board-certified Family Nurse Practitioner
                  with over two decades of medical experience, eight of them
                  in advanced practice.
                </p>
                <p className="text-gray-600 leading-relaxed mb-5">
                  Her background covers emergency and trauma nursing at
                  Nebraska Medical Center, seven years of practice along the
                  Texas Gulf Coast, and work in family practice, chronic pain
                  management, and functional medicine. She earned her BSN and
                  MSN from Graceland University.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  That range matters for peptide therapy. A prescriber who has
                  worked in emergency care, primary care, and functional
                  medicine looks at the whole picture: your history, your
                  medications, your labs, and what you want to feel different.
                  Stacey meets patients where they are and works with them
                  toward their most optimal life, and that includes telling
                  you when a peptide is not the right fit.
                </p>

                <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-charcoal mb-4">
                  Experience and background
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {STACEY_EXPERIENCE.map(({ icon: Icon, title, detail }) => (
                    <li
                      key={title}
                      className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-start gap-4"
                    >
                      <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center">
                        <Icon size={20} className="text-teal" />
                      </span>
                      <span>
                        <span className="block font-semibold text-charcoal leading-snug">
                          {title}
                        </span>
                        <span className="block text-sm text-gray-600 leading-relaxed mt-1">
                          {detail}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="text-gray-600 leading-relaxed mb-6">
                  Outside the clinic, Stacey is a wife, a mother of four, and
                  &ldquo;Grandma&rdquo; to five. You will likely find her in
                  her vegetable garden, in the middle of a home renovation
                  project, or on the golf course.
                </p>

                <Link
                  href={`/about#${stacey.id}`}
                  className="inline-flex items-center gap-1.5 text-teal font-semibold hover:underline"
                >
                  Meet the full Perspective Health team <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section 3 - Green: how a virtual visit works */}
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
              Peptide consultations happen by secure video, so you can meet
              with Stacey from home, anywhere in Iowa.
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
              Because peptide consultations are virtual, Stacey can also see
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
              <Link
                href="/contact#contact-form"
                className="btn-teal px-7 py-3 inline-flex items-center gap-2"
              >
                Request a Consultation
              </Link>
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-teal border-2 border-teal hover:bg-teal hover:text-white transition-colors"
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
