import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle,
  ArrowRight,
  ChevronDown,
  HeartPulse,
  Activity,
  Stethoscope,
  FlaskConical,
  Pill,
  Quote,
} from "lucide-react";

// Maps a primary-care accordion title to a Lucide icon. Lookup is case-insensitive
// and matches on a substring so minor wording changes don't drop the icon.
function getPrimaryCareSectionIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("wellness")) return HeartPulse;
  if (t.includes("chronic")) return Activity;
  if (t.includes("acute")) return Stethoscope;
  if (t.includes("lab")) return FlaskConical;
  if (t.includes("medication") || t.includes("supplement")) return Pill;
  return CheckCircle;
}
import {
  getServiceBySlug,
  getAllServiceSlugs,
} from "@/lib/services-data";
import { SERVICES, SITE_CONFIG } from "@/lib/constants";
import { MedicalServiceSchema } from "@/components/seo/MedicalServiceSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import SymptomExplorer from "@/components/SymptomExplorer";
import ModalityExplorer from "@/components/ModalityExplorer";
import { CTABanner } from "@/components/home/CTABanner";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title: service.headline,
    description: service.metaDescription,
    openGraph: {
      title: `${service.headline} | Perspective Health Iowa`,
      description: service.metaDescription,
      images: [{ url: service.heroImage, alt: service.heroImageAlt }],
    },
  };
}

export default function ServicePage({ params }: Props) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const relatedServices = service.relatedServices
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter(Boolean);

  const ctaMap: Record<string, { heading: string; subtext: string }> = {
    "comprehensive-primary-care": {
      heading: "Ready for a Primary Care Provider Who Actually Listens?",
      subtext: "Reach out and experience the difference.",
    },
    "hormone-health": {
      heading: "Think Your Hormones Might Be Out of Balance?",
      subtext: "Let's find out together — reach out to get started.",
    },
    "integrative-functional-medicine": {
      heading: "Looking for Answers Beyond Conventional Medicine?",
      subtext: "Our integrative approach could be what you've been searching for.",
    },
    "digestive-metabolic-health": {
      heading: "Tired of Living With Digestive Issues?",
      subtext: "Let's get to the root cause — contact us today.",
    },
    "supplementary-services": {
      heading: "Ready to Explore What Else Is Possible?",
      subtext: "Discover how our supplementary services can support your wellness.",
    },
    "hocatt": {
      heading: "Curious About HOCATT Therapy?",
      subtext: "Book a session and experience it for yourself.",
    },
  };
  const ctaProps = ctaMap[service.slug] || {};

  return (
    <>
      <MedicalServiceSchema
        name={service.name}
        description={service.metaDescription}
        url={`/services/${service.slug}`}
        image={service.heroImage}
      />
      <FAQSchema faqs={service.faqs} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col justify-end overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <Image
            src={service.heroImage}
            alt={service.heroImageAlt}
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
            {service.heroScript}
          </p>
          <h1 className="flex flex-col items-start gap-2 sm:gap-3">
            <span className="inline-block bg-teal/90 px-4 py-2.5 sm:px-6 sm:py-3 text-white text-xl sm:text-2xl lg:text-3xl font-normal tracking-wide uppercase">
              {service.headline}
            </span>
          </h1>
          <p className="text-white/80 text-lg max-w-xl mt-4">
            {service.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      {service.slug === "comprehensive-primary-care" && service.accordionSections ? (
        /* ── Primary Care layout ── */
        <article className="bg-white">
          <div className="section-container py-16 sm:py-20 lg:py-24">
            {/* Large uppercase headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight mb-14 max-w-4xl">
              <span className="text-teal">Comprehensive</span>{" "}
              <span className="text-charcoal">Primary Care — Your Health, Our Priority</span>
            </h2>

            {/* Two-column intro: image left, text right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-16">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={service.heroImage}
                  alt={service.heroImageAlt}
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
              </div>
            </div>

          </div>
          <section className="geometric-pattern-light">
            <div className="section-container py-16 sm:py-20 lg:py-24">
            {/* Section header */}
            <div className="text-center mb-10">
              <p className="font-script text-3xl text-teal mb-2">What&apos;s Included</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal">
                EXPLORE OUR <span className="text-teal">PRIMARY CARE SERVICES</span>
              </h2>
              <div className="w-16 h-1 bg-teal rounded-full mx-auto mt-4" />
            </div>

            {/* Two-column: Accordions left, sidebar right */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 lg:gap-14 items-start">
              <div className="space-y-3">
                {service.accordionSections.map((section, i) => {
                  const SectionIcon = getPrimaryCareSectionIcon(section.title);
                  return (
                    <details
                      key={i}
                      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                    >
                      <summary className="flex items-center gap-4 cursor-pointer p-5 sm:p-6 list-none [&::-webkit-details-marker]:hidden">
                        <div className="w-11 h-11 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0 group-hover:bg-teal group-open:bg-teal transition-all">
                          <SectionIcon
                            size={22}
                            strokeWidth={2}
                            className="text-teal group-hover:text-white group-open:text-white transition-colors"
                          />
                        </div>
                        <span className="flex-grow text-base sm:text-lg font-bold text-charcoal uppercase tracking-wide">
                          {section.title}
                        </span>
                        <ChevronDown
                          size={20}
                          className="flex-shrink-0 text-teal transition-transform duration-200 group-open:rotate-180"
                        />
                      </summary>
                      <ul className="px-5 sm:px-6 pb-6 pl-[76px] sm:pl-[88px] space-y-3 border-t border-gray-100 pt-4">
                        {section.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3 text-gray-600 leading-relaxed text-sm sm:text-base">
                            <CheckCircle size={16} className="text-teal flex-shrink-0 mt-1" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  );
                })}
              </div>

              <aside className="space-y-6 lg:sticky lg:top-8">
                <div className="relative bg-white rounded-2xl p-7 shadow-md border-l-4 border-teal">
                  <Quote size={28} className="text-teal/30 mb-3" />
                  <p className="text-charcoal italic leading-relaxed text-sm">
                    At Perspective Health, we believe in going beyond symptom management.
                    Our team takes the time to listen, understand your full health picture,
                    and create a care plan built around you.
                  </p>
                  <p className="text-teal text-xs font-semibold mt-4 uppercase tracking-wider">
                    — Our Care Team
                  </p>
                </div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={service.heroImage}
                    alt={service.heroImageAlt}
                    fill
                    quality={85}
                    className="object-cover"
                    sizes="340px"
                  />
                </div>
              </aside>
            </div>
            </div>
          </section>

          <section className="bg-white">
            <div className="section-container py-16 sm:py-20 lg:py-24">
{/* Related services */}
            {relatedServices.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-charcoal mb-6">Related Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {relatedServices.map((related) => related && (
                    <Link key={related.slug} href={`/services/${related.slug}`} className="group rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md hover:border-teal/40 transition-all">
                      <div className="relative h-40 overflow-hidden">
                        <Image src={related.image} alt={related.imageAlt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 33vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-charcoal group-hover:text-teal transition-colors mb-2">{related.name}</h3>
                        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{related.description}</p>
                        <span className="inline-flex items-center gap-1.5 text-teal text-sm font-semibold">Learn more <ArrowRight size={14} /></span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
          </section>
        </article>
      ) : service.slug === "integrative-functional-medicine" && service.accordionSections ? (
        /* ── Integrative Medicine alternating sections layout ── */
        <article>
          {/* Section 1 — White: Headline + image LEFT, text RIGHT */}
          <section className="bg-white">
            <div className="section-container py-16 sm:py-20 lg:py-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold uppercase tracking-tight leading-tight mb-10">
                    <span className="text-teal">
                      {service.name.split(" ").slice(0, 2).join(" ")}
                    </span><br />
                    <span className="text-charcoal">
                      {service.name.split(" ").slice(2).join(" ") || "Merging Traditional and Alternative Care"}
                    </span>
                  </h2>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={service.heroImage}
                      alt={service.heroImageAlt}
                      fill
                      quality={85}
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center lg:pt-8">
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {service.intro}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {service.whatItIs}
                  </p>
                </div>
              </div>
            </div>
          </section>

              {/* Section 2 — Functional Medicine vs. Integrative Medicine */}
          <section className="geometric-pattern-light">
            <div className="section-container py-16 sm:py-20 lg:py-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight leading-tight mb-8">
                    <span className="text-teal">Functional</span>{" "}
                    <span className="text-charcoal">Medicine vs.</span><br />
                    <span className="text-teal">Integrative</span>{" "}
                    <span className="text-charcoal">Medicine</span>
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    &ldquo;Functional Medicine&rdquo; is a term often used instead of or
                    interchangeably with &ldquo;Integrative Medicine.&rdquo;
                  </p>
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-3">
                      <span className="text-teal font-bold text-lg mt-0.5 flex-shrink-0">&raquo;</span>
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-bold text-charcoal">Functional Medicine</span> is
                        the practice of finding and addressing the root cause(s) of a
                        patient&apos;s health problem.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-teal font-bold text-lg mt-0.5 flex-shrink-0">&raquo;</span>
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-bold text-charcoal">Integrative Medicine</span> is
                        the collaborative practice of medicine using a combination of therapies
                        and lifestyle changes to treat and heal the whole person.
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    Approaching patients in a functional way can change how the body works
                    physiologically, by using tools that are safe with minimum side effects and
                    by focusing on addressing triggers and promoting health rather than treating
                    symptoms alone. Integrative medicine includes the functional medicine model
                    and &ldquo;integrates&rdquo; it with additional traditional and
                    nontraditional healthcare practices to make each person&apos;s care
                    collaborative and comprehensive.
                  </p>
                  <p className="text-teal italic text-lg leading-relaxed mb-8">
                    Everyone deserves to &ldquo;Be Seen.&rdquo; We&apos;d love to partner
                    with you to help you meet your health needs.
                  </p>
                </div>
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/approach-1.jpg"
                    alt="Functional and integrative medicine at Perspective Health"
                    fill
                    quality={85}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </section>

              {/* Section 3 — White: Image LEFT, headline + accordion RIGHT */}
          <section className="bg-white">
            <div className="section-container py-16 sm:py-20 lg:py-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/approach-2.jpg"
                    alt="Integrative medicine at Perspective Health Iowa"
                    fill
                    quality={85}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight leading-tight mb-10">
                    <span className="text-teal">Our</span>{" "}
                    <span className="text-charcoal">Approach</span>
                  </h2>

                  {service.accordionSections.map((section, i) => (
                    <details key={i} className="group border-b border-gray-200">
                      <summary className="flex items-center justify-between cursor-pointer py-5 list-none [&::-webkit-details-marker]:hidden">
                        <span className="text-base sm:text-lg font-bold text-charcoal uppercase tracking-wide">
                          {section.title}
                        </span>
                        <span className="flex-shrink-0 ml-4 text-2xl text-charcoal/50 font-light select-none">
                          <span className="group-open:hidden">+</span>
                          <span className="hidden group-open:inline">&minus;</span>
                        </span>
                      </summary>
                      <ul className="pb-5 pl-1 space-y-2">
                        {section.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3 text-gray-600 leading-relaxed">
                            <span className="text-teal font-bold mt-0.5 flex-shrink-0">&raquo;</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </details>
                  ))}

                  <div className="mt-10">
                    <Link
                      href="/contact#contact-form"
                      className="btn-teal text-lg px-12 py-4"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

              {/* CTA + Related Services */}
          <section className="bg-white">
            <div className="section-container py-16 sm:py-20 lg:py-24">
{/* Related services */}
              {relatedServices.length > 0 && (
                <section>
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
      ) : service.slug === "digestive-metabolic-health" ? (
        /* ── Digestive & Metabolic Health layout ── */
        <article>
          {/* Section 1 — White: Headline + image left, text right */}
          <section className="bg-white">
            <div className="section-container py-16 sm:py-20 lg:py-24">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight mb-12">
                <span className="text-teal">Digestive</span>{" "}
                <span className="text-charcoal">&amp; Metabolic Health</span>
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
                  <Image
                    src={service.heroImage}
                    alt={service.heroImageAlt}
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
                  <p className="text-gray-600 leading-relaxed">
                    {service.whatItIs}
                  </p>
                </div>
              </div>
            </div>
          </section>

              {/* Section 2 — Green bg: Our Approach + service cards grid */}
          <section className="geometric-pattern-green">
            <div className="section-container py-16 sm:py-20 lg:py-24 relative z-10">
              <div className="mb-12">
                <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight mb-4">
                  Our Approach to Digestive &amp;<br />Metabolic Health
                </h2>
                <p className="text-white/80 text-lg max-w-2xl">
                  We offer a comprehensive range of services to help improve your digestive and metabolic health, including:
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white/95 rounded-2xl p-8 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-4">
                    <CheckCircle size={24} className="text-teal" />
                  </div>
                  <h3 className="text-lg font-bold text-charcoal mb-3">Personalized Nutrition Counseling</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Our nutrition experts provide individualized guidance to ensure your diet supports a healthy gut. We focus on integrating gut-boosting foods into your lifestyle to improve digestion and support your microbiome.
                  </p>
                </div>
                <div className="bg-white/95 rounded-2xl p-8 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-4">
                    <CheckCircle size={24} className="text-teal" />
                  </div>
                  <h3 className="text-lg font-bold text-charcoal mb-3">Stress Management Support</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    The gut-brain connection means stress can directly impact your digestion. We provide resources and support for stress management, which is a key component of improving your gut health.
                  </p>
                </div>
                <div className="bg-white/95 rounded-2xl p-8 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-4">
                    <CheckCircle size={24} className="text-teal" />
                  </div>
                  <h3 className="text-lg font-bold text-charcoal mb-3">Probiotic &amp; Supplement Recommendations</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Choosing the right probiotics can be tough. Our practitioners recommend high-quality products that enhance your gut microbiota, support digestion, and promote better overall health.
                  </p>
                </div>
                <div className="bg-white/95 rounded-2xl p-8 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-4">
                    <CheckCircle size={24} className="text-teal" />
                  </div>
                  <h3 className="text-lg font-bold text-charcoal mb-3">Digestive Health Testing</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We offer digestive and metabolic health assessments, such as microbiome testing, to gain a clearer picture of your digestive system. These insights allow us to develop tailored action plans addressing any imbalances.
                  </p>
                </div>
                <div className="bg-white/95 rounded-2xl p-8 shadow-sm sm:col-span-2 sm:max-w-[calc(50%-0.75rem)]">
                  <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-4">
                    <CheckCircle size={24} className="text-teal" />
                  </div>
                  <h3 className="text-lg font-bold text-charcoal mb-3">Medical &amp; Functional Care Integration</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    For those dealing with more complex issues like diabetes or thyroid disorders, our team uses both conventional medical approaches and functional medicine insights to ensure comprehensive, personalized care.
                  </p>
                </div>
              </div>
            </div>
          </section>

              {/* Section 3 — White: Benefits left with bullets, image right */}
          <section className="bg-white">
            <div className="section-container py-16 sm:py-20 lg:py-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight leading-tight mb-10">
                    <span className="text-charcoal">Benefits of Digestive &amp; Metabolic Health Services</span>
                  </h2>
                  <div className="space-y-6 mb-10">
                    {service.benefits.map((benefit, i) => {
                      return (
                        <div key={i} className="flex items-start gap-3">
                          <span className="text-teal font-bold text-lg mt-0.5 flex-shrink-0">&raquo;</span>
                          <p className="text-gray-700 leading-relaxed">
                            {benefit}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-teal italic text-lg leading-relaxed mb-8">
                    At Perspective Health Iowa, we&apos;re here to support your gut health journey, offering expert guidance and personalized care.{" "}
                    <Link href="/contact#contact-form" className="underline hover:text-teal-600 transition-colors">
                      Contact us today
                    </Link>{" "}
                    to learn more about how our services can help you thrive.
                  </p>
                </div>
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/approach-1.jpg"
                    alt="Digestive health care at Perspective Health Iowa"
                    fill
                    quality={85}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </section>

              {/* CTA + Related Services */}
          <section className="bg-white">
            <div className="section-container py-16 sm:py-20 lg:py-24">
{relatedServices.length > 0 && (
                <section>
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
      ) : service.slug === "hocatt" ? (
        /* ── HOCATT Ozone Sauna layout ── */
        <article>
          {/* Section 1 — White: Big centered headline + image left, intro right */}
          <section className="bg-white">
            <div className="section-container py-16 sm:py-20 lg:py-24">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-center mb-16 leading-tight">
                <span className="text-teal">The Future of</span>{" "}
                <span className="text-charcoal">Whole-Body Wellness</span>
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
                  <Image
                    src={service.heroImage}
                    alt={service.heroImageAlt}
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
                  <p className="text-gray-600 leading-relaxed">
                    {service.whatItIs}
                  </p>
                </div>
              </div>
            </div>
          </section>

              {/* Section 2 — Green: Interactive Modality Explorer */}
          <section className="geometric-pattern-green">
            <div className="section-container py-16 sm:py-20 lg:py-24 relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight mb-4">
                  10 Therapies. One 30-Minute Session.
                </h2>
                <p className="text-white/80 text-lg max-w-2xl mx-auto">
                  Click any modality to learn how it works inside the HOCATT.
                </p>
              </div>
              <ModalityExplorer />
            </div>
          </section>

              {/* Section 3 — White: Gallery left, What to Expect right */}
          <section className="bg-white">
            <div className="section-container py-16 sm:py-20 lg:py-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                <div className="space-y-4">
                  {service.gallery && service.gallery.map((img, i) => (
                    <div key={i} className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        quality={85}
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight leading-tight mb-8">
                    <span className="text-teal">What to</span>{" "}
                    <span className="text-charcoal">Expect</span>
                  </h2>
                  <div className="space-y-4">
                    {service.whatToExpect.map((step, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal text-white text-sm font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-gray-600 leading-relaxed pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10">
                    <a
                      href={SITE_CONFIG.hocattBookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-teal text-base px-10 py-4 inline-block"
                    >
                      Book &amp; Pay Online
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

              {/* Section 4 — Light green: Benefits left, image right */}
          <section className="geometric-pattern-light">
            <div className="section-container py-16 sm:py-20 lg:py-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight leading-tight mb-10">
                    <span className="text-teal">Potential</span>{" "}
                    <span className="text-charcoal">Benefits</span>
                  </h2>
                  <div className="space-y-6 mb-10">
                    {service.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-teal font-bold text-lg mt-0.5 flex-shrink-0">&raquo;</span>
                        <p className="text-gray-700 leading-relaxed">{benefit}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-teal italic text-lg leading-relaxed mb-8">
                    Experience the power of 10 therapies working together. Your body&apos;s potential for healing is extraordinary &mdash; the HOCATT helps unlock it.
                  </p>
                </div>
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
                  <Image
                    src={service.heroImage}
                    alt="HOCATT ozone sauna benefits"
                    fill
                    quality={85}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </section>

              {/* CTA + Related Services */}
          <section className="bg-white">
            <div className="section-container py-16 sm:py-20 lg:py-24">
{relatedServices.length > 0 && (
                <section>
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
      ) : service.slug === "hormone-health" ? (
        /* ── Hormone Health layout ── */
        <article>
          {/* Section 1 — White: Big centered headline + image left, text right */}
          <section className="bg-white">
            <div className="section-container py-16 sm:py-20 lg:py-24">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-center mb-16 leading-tight">
                <span className="text-teal">Restoring Hormonal Balance,</span><br />
                <span className="text-charcoal">Revitalizing Your Life</span>
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
                  <Image
                    src={service.heroImage}
                    alt={service.heroImageAlt}
                    fill
                    quality={85}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    Hormones are powerful chemical messengers that regulate almost every aspect of our physical, mental, and emotional well-being. Even the slightest imbalance can produce wide-ranging symptoms that diminish our vitality and quality of life.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    At Perspective Health, our experienced providers are exceptionally skilled in pinpointing and addressing hormonal imbalances through an integrative, personalized approach.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Combining advanced testing and in-depth assessments, we develop a comprehensive understanding of your unique biochemistry. This allows us to precisely identify and treat the root issues, whether they relate to menopause, andropause, thyroid conditions, adrenal fatigue, or other hormone dysfunctions.
                  </p>
                </div>
              </div>
            </div>
          </section>

              {/* Section 2 — White: Text left about BHRT, image right */}
          <section className="bg-white border-t border-gray-200">
            <div className="section-container py-16 sm:py-20 lg:py-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Our customized treatment plans blend bioidentical hormone replacement therapy (BHRT) with strategic nutritional guidance, supplements, lifestyle modifications, and stress management techniques. This holistic, multifaceted approach targets the interrelated factors that influence your hormonal health.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    BHRT utilizes plant-derived hormones that are biologically identical to those produced by your body. These natural compounds are delivered through tailored dosing methods such as topical creams, oral capsules/drops, and injections. We always prioritize the most physiologically congruent and effective therapies for your needs.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    We support patients in their gender-related choices but do not provide hormone therapy for gender reassignment.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    Our comprehensive hormone health program empowers you to restore balance, vitality, and optimal well-being from the inside out. Regain your zest for living and thrive through every life stage by achieving hormonal harmony.
                  </p>
                </div>
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/approach-1.jpg"
                    alt="Hormone health specialist at Perspective Health"
                    fill
                    quality={85}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </section>

              {/* Section 3 — Interactive Symptom Explorer */}
          <section className="geometric-pattern-light">
            <div className="section-container py-16 sm:py-20 lg:py-24">
              <div className="max-w-4xl mx-auto text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight leading-tight mb-4">
                  <span className="text-teal">Could It Be</span>{" "}
                  <span className="text-charcoal">Your Hormones?</span>
                </h2>
                <p className="text-gray-600 text-lg">
                  Select a symptom below to learn how it may be connected to hormonal imbalance.
                </p>
              </div>
              <div className="max-w-4xl mx-auto">
                <SymptomExplorer />
              </div>
            </div>
          </section>

              {/* CTA + Related Services */}
          <section className="bg-white">
            <div className="section-container py-16 sm:py-20 lg:py-24">
{relatedServices.length > 0 && (
                <section>
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
      ) : service.slug === "supplementary-services" ? (
        /* ── Supplementary Services layout ── */
        <article>
          {/* Section 1 — White: Big centered headline */}
          <section className="bg-white">
            <div className="section-container py-16 sm:py-20 lg:py-24">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-center mb-16 leading-tight">
                <span className="text-teal">Making the Most of Your</span>{" "}
                <span className="text-charcoal">Perspective Health Experience</span>
              </h2>

              {/* Image left, injection info right */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg w-full max-w-md">
                  <Image
                    src={service.heroImage}
                    alt={service.heroImageAlt}
                    fill
                    quality={85}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col justify-start lg:pt-4">
                  <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-charcoal mb-8">
                    In-Office and At-Home Injections
                  </h3>

                  <div className="mb-8">
                    <h4 className="font-bold text-charcoal mb-3">In-Office Injections</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Our in-office injections provide targeted treatments for immediate support, administered by skilled providers. These therapies include nutrient supplementation, hormonal support, and other specialized options to address deficiencies and enhance well-being. We have a growing interest from our patients and an increasing capability as a clinic to order and prescribe many different <span className="font-bold text-charcoal">peptides and supplementary therapies</span> that can complement your healthcare. Please call or email us if you are looking for something specific.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-charcoal mb-3">At-Home Injections</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Our peptide therapy focuses on promoting vitality, weight management, longevity, and sexual wellness. These injections, administered at home for convenience, leverage amino acid chains to stimulate key physiological processes. Peptide treatments can boost energy, improve muscle tone, and support overall well-being as part of a comprehensive health plan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

              {/* Section 2 — Supplement Delivery (Fullscript) */}
          <section className="geometric-pattern-green">
            <div className="section-container py-16 sm:py-20 lg:py-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white mb-6">
                    Convenient Supplement Delivery
                  </h3>
                  <p className="text-white/85 leading-relaxed">
                    Effective supplementation goes beyond powders or pills. As a Perspective Health patient, we want to equip you with trusted products and tools you need to succeed in your supplement routine &mdash; all in a convenient online and mobile app experience.
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-10 text-center shadow-lg">
                  <p className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-charcoal mb-4">
                    Order Healthcare&apos;s Best Supplements &mdash; Delivered to Your Door.
                  </p>
                  <a
                    href="https://us.fullscript.com/welcome/perspectivehealthdispensary"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-bold text-white bg-purple hover:bg-purple/90 transition-colors shadow-md"
                  >
                    Visit Our Store
                  </a>
                </div>
              </div>
            </div>
          </section>

              {/* Section 3 — Supplemental Services: image left with pattern, text right */}
          <section className="bg-white border-t border-gray-200">
            <div className="section-container py-16 sm:py-20 lg:py-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className="relative">
                  <div className="absolute -left-4 -top-4 w-24 h-full opacity-20 geometric-pattern-light rounded-l-2xl" />
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg w-full max-w-md">
                    <Image
                      src="/images/approach-1.jpg"
                      alt="Supplemental health services at Perspective Health"
                      fill
                      quality={85}
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-charcoal mb-6">
                    Supplemental Services
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.intro}
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    {service.whatItIs}
                  </p>
                </div>
              </div>
            </div>
          </section>

              {/* Section 4 — Patient Packages */}
          <section className="geometric-pattern-light">
            <div className="section-container py-16 sm:py-20 lg:py-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-charcoal mb-6">
                    Patient Packages
                  </h3>
                  <p className="text-gray-500 italic text-lg">Coming Soon</p>
                </div>
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
                  <Image
                    src={service.heroImage}
                    alt="Patient packages at Perspective Health"
                    fill
                    quality={85}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </section>

              {/* CTA + Related Services */}
          <section className="bg-white">
            <div className="section-container py-16 sm:py-20 lg:py-24">
{relatedServices.length > 0 && (
                <section>
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
      ) : (
        /* ── Original layout (all other services) ── */
        <article className="section-padding bg-white">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              {/* Intro */}
              <div className="bg-teal/5 border border-teal/20 rounded-2xl p-8 mb-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-teal rounded-l-2xl" />
                <p className="text-xl text-gray-700 leading-relaxed pl-4">
                  {service.intro}
                </p>
              </div>

              {/* What It Is */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-charcoal mb-4 flex items-center gap-3">
                  <span className="w-8 h-1 bg-teal rounded-full inline-block" />
                  What It Is
                </h2>
                <p className="text-gray-600 leading-relaxed">{service.whatItIs}</p>
              </section>

              {/* Gallery */}
              {service.gallery && service.gallery.length > 0 && (
                <section className="mb-12">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.gallery.map((img, i) => (
                      <div
                        key={i}
                        className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md"
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          quality={85}
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                {/* Who It's For */}
                <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={20} className="text-teal" />
                    </div>
                    <h2 className="text-xl font-bold text-charcoal">
                      Who It&apos;s For
                    </h2>
                  </div>
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
                        <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* What to Expect */}
                <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple font-bold text-sm">1–{service.whatToExpect.length}</span>
                    </div>
                    <h2 className="text-xl font-bold text-charcoal">
                      What to Expect
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {service.whatToExpect.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 bg-purple/5 rounded-xl p-4"
                      >
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple text-white text-xs font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Benefits */}
              <section className="bg-sage/50 rounded-2xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-charcoal mb-5">
                  Potential Benefits
                </h2>
                <p className="text-gray-500 text-sm mb-4 italic">
                  Individual results may vary. The following benefits are often
                  associated with this service and may vary based on individual
                  health circumstances.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm"
                    >
                      <div className="w-2 h-2 rounded-full bg-teal mt-2 flex-shrink-0" />
                      <span className="text-gray-600 text-sm leading-relaxed">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQs */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-charcoal mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {service.faqs.map((faq, i) => (
                    <details
                      key={i}
                      className="group border border-gray-200 rounded-xl hover:border-teal/30 transition-colors"
                    >
                      <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-charcoal list-none [&::-webkit-details-marker]:hidden">
                        {faq.question}
                        <svg
                          className="w-5 h-5 text-teal flex-shrink-0 ml-4 transition-transform duration-300 group-open:rotate-180"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-6 pb-6 pt-0">
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>

{/* Related services */}
              {relatedServices.length > 0 && (
                <section>
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
          </div>
        </article>
      )}

      <CTABanner heading={ctaProps.heading} subtext={ctaProps.subtext} />
    </>
  );
}
