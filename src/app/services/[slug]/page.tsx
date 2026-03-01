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
      <section className="relative h-80 sm:h-96 overflow-hidden bg-charcoal">
        <Image
          src={service.heroImage}
          alt={service.heroImageAlt}
          fill
          priority
          quality={85}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />
        {/* Breadcrumb */}
        <div className="absolute top-6 left-0 right-0">
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
        <div className="absolute bottom-0 left-0 right-0 section-container pb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white max-w-2xl leading-tight">
            {service.headline}
          </h1>
        </div>
      </section>

      {/* Content */}
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
                {/* Left: Icon */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                    <ArrowRight size={32} className="text-teal" />
                  </div>
                </div>
                {/* Center: Text */}
                <div className="flex-grow text-center md:text-left">
                  <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
                    Ready to Get Started?
                  </h2>
                  <p className="text-white/80 max-w-md">
                    Our team is ready to answer your questions and help you take the
                    first step toward better health.
                  </p>
                </div>
                {/* Right: Buttons */}
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

      <CTABanner />
    </>
  );
}
