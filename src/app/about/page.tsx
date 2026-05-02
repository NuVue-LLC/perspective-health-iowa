import type { Metadata } from "next";
import Image from "next/image";
import { Eye, Sprout, Handshake, Microscope } from "lucide-react";
import { PROVIDERS } from "@/lib/constants";
import { CTABanner } from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the Perspective Health Iowa team — Audrey Gries PA-C, Stephanie Erdmann DNP, and Tara Sayer RN. Iowa's integrative health clinic built on collaboration, compassion, and root-cause care.",
  openGraph: {
    title: "Our Team | Perspective Health Iowa",
    description:
      "Meet our integrative health team in Iowa. Whole-person care that truly listens.",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col justify-end overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-about.jpg"
            alt="Collaborative healthcare team working together at Perspective Health Iowa"
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
            Who We Are
          </p>
          <h1 className="flex flex-col items-start gap-2 sm:gap-3">
            <span className="inline-block bg-teal/90 px-4 py-2.5 sm:px-6 sm:py-3 text-white text-xl sm:text-2xl lg:text-3xl font-normal tracking-wide uppercase">
              Our Team
            </span>
          </h1>
          <p className="text-white/80 text-lg max-w-xl mt-4">
            We built Perspective Health because we believe everyone deserves
            healthcare that sees the whole person.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-script text-3xl text-teal mb-2">
                Our Mission
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal mb-5">
                HEALTHCARE FROM A{" "}
                <span className="text-teal">NEW PERSPECTIVE</span>
              </h2>
              <div className="w-16 h-1 bg-teal rounded-full mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">
                At Perspective Health, we started with a simple belief: that
                true healthcare means seeing and treating the whole person —
                not just isolated symptoms or lab values. We believe in
                listening deeply, thinking broadly, and partnering with each
                patient to build health from the inside out.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our clinic brings together practitioners from diverse healthcare
                backgrounds — physician assisting, advanced nursing practice,
                and clinical nutrition — united by a shared commitment to
                integrative, root-cause medicine. We combine the rigor of
                evidence-based conventional medicine with the wisdom of
                functional and integrative approaches.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you&apos;re struggling with a chronic condition,
                searching for answers to longstanding symptoms, or simply
                looking for a healthcare team that&apos;s as invested in your
                wellness as you are — you&apos;ve found us.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video lg:aspect-square image-zoom">
              <Image
                src="/images/about-clinic.jpg"
                alt="Perspective Health Iowa clinic — warm, welcoming integrative health environment"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding geometric-pattern-green">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="font-script text-3xl text-white/90 mb-2">What We Stand For</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              OUR <span className="text-white/80">VALUES</span>
            </h2>
            <div className="w-16 h-1 bg-white rounded-full mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {[
              {
                Icon: Eye,
                title: "See the Whole Person",
                body: "We evaluate physical, hormonal, metabolic, and lifestyle factors together — never in isolation.",
              },
              {
                Icon: Sprout,
                title: "Root-Cause Focus",
                body: "We invest time to understand why — not just what — treating root causes rather than managing symptoms.",
              },
              {
                Icon: Handshake,
                title: "True Partnership",
                body: "Your care plan is built with you, not for you. We listen, collaborate, and adjust as your needs evolve.",
              },
              {
                Icon: Microscope,
                title: "Evidence-Based",
                body: "Integrative doesn't mean unscientific. We use proven diagnostics and therapies, always informed by the latest research.",
              },
            ].map(({ Icon, title, body }) => (
              <div
                key={title}
                className="group bg-white rounded-2xl p-7 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border-t-4 border-teal"
              >
                <div className="w-14 h-14 rounded-2xl bg-teal/10 flex items-center justify-center mb-5 group-hover:bg-teal group-hover:scale-105 transition-all">
                  <Icon size={26} strokeWidth={2} className="text-teal group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-charcoal text-lg mb-2 leading-snug">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Providers */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="font-script text-3xl text-teal mb-2">The People Behind Your Care</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal">
              MEET OUR <span className="text-teal">PROVIDERS</span>
            </h2>
            <div className="w-16 h-1 bg-teal rounded-full mx-auto mt-4" />
          </div>

          <div className="space-y-16">
            {PROVIDERS.map((provider, idx) => (
              <article
                key={provider.id}
                id={provider.id}
                className={`scroll-mt-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center rounded-3xl p-8 ${
                  idx % 2 === 0 ? "geometric-pattern-light" : "bg-white"
                }`}
              >
                <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="rounded-2xl overflow-hidden shadow-xl aspect-[3/4] image-zoom relative">
                    <Image
                      src={provider.image}
                      alt={provider.imageAlt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal">
                    {provider.name}
                    <span className="text-teal font-medium text-xl ml-2">
                      {provider.credentials}
                    </span>
                  </h3>
                  <p className="text-purple italic font-medium mt-1 mb-2">
                    {provider.title}
                  </p>
                  <p className="text-teal text-sm font-semibold mb-4 uppercase tracking-wide">
                    {provider.specialty}
                  </p>
                  <div className="w-12 h-1 bg-teal rounded-full mb-5" />
                  <p className="text-gray-600 leading-relaxed">
                    {provider.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner heading="Like What You See? Let's Meet." subtext="Our providers are ready to partner with you on your health journey." />
    </>
  );
}
