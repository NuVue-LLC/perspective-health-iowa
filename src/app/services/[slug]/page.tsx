import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, ChevronRight, ArrowRight } from "lucide-react";
import {
  getServiceBySlug,
  getAllServiceSlugs,
} from "@/lib/services-data";
import { SERVICES } from "@/lib/constants";
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
        {/* Breadcrumb */}
        <div className="absolute top-24 left-0 right-0 z-10">
          <nav
            aria-label="Breadcrumb"
            className="section-container text-sm text-white/70"
          >
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <ChevronRight size={12} className="flex-shrink-0" />
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <ChevronRight size={12} className="flex-shrink-0" />
              <li className="text-white">{service.name}</li>
            </ol>
          </nav>
        </div>
        {/* Heading */}
        <div className="relative z-10 px-6 sm:px-12 lg:px-20 pb-16 sm:pb-20 lg:pb-24">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white max-w-2xl leading-tight">
            {service.headline}
          </h1>
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
                <p className="text-gray-600 leading-relaxed">
                  {service.whatItIs}
                </p>
              </div>
            </div>

            {/* Two-column: Accordions left, sidebar right */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 lg:gap-14 mb-16 items-start">
              <div>
                <div>
                  {service.accordionSections.map((section, i) => (
                    <details key={i} className="group border-b border-gray-200">
                      <summary className="flex items-center justify-between cursor-pointer py-6 list-none [&::-webkit-details-marker]:hidden">
                        <span className="text-lg sm:text-xl font-bold text-charcoal uppercase tracking-wide">
                          {section.title}
                        </span>
                        <span className="flex-shrink-0 ml-4 text-2xl text-charcoal/60 font-light select-none">
                          <span className="group-open:hidden">+</span>
                          <span className="hidden group-open:inline">&minus;</span>
                        </span>
                      </summary>
                      <ul className="pb-6 pl-1 space-y-2">
                        {section.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3 text-gray-600 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal mt-2.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </details>
                  ))}
                </div>
                <div className="flex justify-center mt-10">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-14 py-5 rounded-full text-lg font-bold text-white bg-teal hover:bg-teal-600 transition-colors shadow-md"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              <aside className="space-y-6 lg:sticky lg:top-8">
                <div className="bg-sage/40 rounded-2xl p-7">
                  <p className="text-teal italic leading-relaxed">
                    &ldquo;At Perspective Health, we believe in going beyond symptom management.
                    Our team takes the time to listen, understand your full health picture,
                    and create a care plan built around you.&rdquo;
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

            {/* CTA */}
            <section className="bg-purple rounded-2xl geometric-pattern p-10 sm:p-12 text-white mb-12 relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                    <ArrowRight size={32} className="text-teal" />
                  </div>
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">Ready to Get Started?</h2>
                  <p className="text-white/80 max-w-md">Our team is ready to answer your questions and help you take the first step toward better health.</p>
                </div>
                <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
                  <Link href="/contact" className="btn-teal whitespace-nowrap">Book Your Appointment</Link>
                  <Link href="/for-patients" className="text-center text-sm text-white/70 hover:text-white transition-colors whitespace-nowrap">New patient info &rarr;</Link>
                </div>
              </div>
            </section>

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
          <section className="bg-sage/40 geometric-pattern-light">
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
                  <p className="text-teal italic text-lg leading-relaxed">
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
                      href="/contact"
                      className="inline-flex items-center justify-center px-12 py-4 rounded-full text-lg font-bold text-white bg-teal hover:bg-teal-600 transition-colors shadow-md"
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
              {/* CTA */}
              <section className="bg-purple rounded-2xl geometric-pattern p-10 sm:p-12 text-white mb-12 relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                      <ArrowRight size={32} className="text-teal" />
                    </div>
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
                      Ready to Get Started?
                    </h2>
                    <p className="text-white/80 max-w-md">
                      Our team is ready to answer your questions and help you take the
                      first step toward better health.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
                    <Link href="/contact" className="btn-teal whitespace-nowrap">
                      Book Your Appointment
                    </Link>
                    <Link href="/for-patients" className="text-center text-sm text-white/70 hover:text-white transition-colors whitespace-nowrap">
                      New patient info &rarr;
                    </Link>
                  </div>
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

          {/* Section 2 — Teal bg: Our Approach + service cards grid */}
          <section className="bg-teal geometric-pattern">
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
                  <p className="text-teal italic text-lg leading-relaxed">
                    At Perspective Health Iowa, we&apos;re here to support your gut health journey, offering expert guidance and personalized care.{" "}
                    <Link href="/contact" className="underline hover:text-teal-600 transition-colors">
                      Contact us today
                    </Link>{" "}
                    to learn more about how our services can help you thrive.
                  </p>
                </div>
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/approach-1.jpg"
                    alt="Digestive health care at Perspective Health"
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
              <section className="bg-purple rounded-2xl geometric-pattern p-10 sm:p-12 text-white mb-12 relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                      <ArrowRight size={32} className="text-teal" />
                    </div>
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
                      Ready to Get Started?
                    </h2>
                    <p className="text-white/80 max-w-md">
                      Our team is ready to answer your questions and help you take the
                      first step toward better health.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
                    <Link href="/contact" className="btn-teal whitespace-nowrap">
                      Book Your Appointment
                    </Link>
                    <Link href="/for-patients" className="text-center text-sm text-white/70 hover:text-white transition-colors whitespace-nowrap">
                      New patient info &rarr;
                    </Link>
                  </div>
                </div>
              </section>

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

          {/* Section 2 — Teal: Interactive Modality Explorer */}
          <section className="bg-teal geometric-pattern">
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
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-10 py-4 rounded-full text-base font-bold text-white bg-teal hover:bg-teal-600 transition-colors shadow-md"
                    >
                      Book a Session
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 — Sage: Benefits left, image right */}
          <section className="bg-sage/30">
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
                  <p className="text-teal italic text-lg leading-relaxed">
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
              <section className="bg-purple rounded-2xl geometric-pattern p-10 sm:p-12 text-white mb-12 relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                      <ArrowRight size={32} className="text-teal" />
                    </div>
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
                      Ready to Get Started?
                    </h2>
                    <p className="text-white/80 max-w-md">
                      Our team is ready to answer your questions and help you take the
                      first step toward better health.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
                    <Link href="/contact" className="btn-teal whitespace-nowrap">
                      Book Your Appointment
                    </Link>
                    <Link href="/for-patients" className="text-center text-sm text-white/70 hover:text-white transition-colors whitespace-nowrap">
                      New patient info &rarr;
                    </Link>
                  </div>
                </div>
              </section>

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
                  <Link
                    href="/blog"
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-bold text-white bg-teal hover:bg-teal-600 transition-colors shadow-md uppercase tracking-wide"
                  >
                    Read About Mental Health and Hormonal Balance
                  </Link>
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

          {/* Section 3 — Sage: Interactive Symptom Explorer */}
          <section className="bg-sage/30">
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
              <section className="bg-purple rounded-2xl geometric-pattern p-10 sm:p-12 text-white mb-12 relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                      <ArrowRight size={32} className="text-teal" />
                    </div>
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
                      Ready to Get Started?
                    </h2>
                    <p className="text-white/80 max-w-md">
                      Our team is ready to answer your questions and help you take the
                      first step toward better health.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
                    <Link href="/contact" className="btn-teal whitespace-nowrap">
                      Book Your Appointment
                    </Link>
                    <Link href="/for-patients" className="text-center text-sm text-white/70 hover:text-white transition-colors whitespace-nowrap">
                      New patient info &rarr;
                    </Link>
                  </div>
                </div>
              </section>

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
          <section className="bg-white border-t border-gray-200">
            <div className="section-container py-16 sm:py-20 lg:py-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-charcoal mb-6">
                    Convenient Supplement Delivery
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Effective supplementation goes beyond powders or pills. As a Perspective Health patient, we want to equip you with trusted products and tools you need to succeed in your supplement routine &mdash; all in a convenient online and mobile app experience.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-teal to-teal/80 rounded-2xl p-10 text-center text-white shadow-lg">
                  <p className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight mb-4">
                    Order Healthcare&apos;s Best Supplements &mdash; Delivered to Your Door.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-bold text-white bg-purple hover:bg-purple/90 transition-colors shadow-md"
                  >
                    Visit Our Store
                  </Link>
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
                  <p className="text-gray-600 leading-relaxed">
                    {service.whatItIs}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 — Patient Packages */}
          <section className="bg-sage/30 geometric-pattern-light">
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
              <section className="bg-purple rounded-2xl geometric-pattern p-10 sm:p-12 text-white mb-12 relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                      <ArrowRight size={32} className="text-teal" />
                    </div>
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
                      Ready to Get Started?
                    </h2>
                    <p className="text-white/80 max-w-md">
                      Our team is ready to answer your questions and help you take the
                      first step toward better health.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
                    <Link href="/contact" className="btn-teal whitespace-nowrap">
                      Book Your Appointment
                    </Link>
                    <Link href="/for-patients" className="text-center text-sm text-white/70 hover:text-white transition-colors whitespace-nowrap">
                      New patient info &rarr;
                    </Link>
                  </div>
                </div>
              </section>

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

              {/* CTA */}
              <section className="bg-purple rounded-2xl geometric-pattern p-10 sm:p-12 text-white mb-12 relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                      <ArrowRight size={32} className="text-teal" />
                    </div>
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
                      Ready to Get Started?
                    </h2>
                    <p className="text-white/80 max-w-md">
                      Our team is ready to answer your questions and help you take the
                      first step toward better health.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
                    <Link href="/contact" className="btn-teal whitespace-nowrap">
                      Book Your Appointment
                    </Link>
                    <Link href="/for-patients" className="text-center text-sm text-white/70 hover:text-white transition-colors whitespace-nowrap">
                      New patient info &rarr;
                    </Link>
                  </div>
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

      <CTABanner />
    </>
  );
}
