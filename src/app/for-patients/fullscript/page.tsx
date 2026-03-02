import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ArrowRight, Phone, ExternalLink } from "lucide-react";
import { CTABanner } from "@/components/home/CTABanner";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Fullscript Supplements",
  description:
    "Order practitioner-grade supplements online through Fullscript — convenient, reliable delivery of the supplements recommended by your Perspective Health Iowa provider.",
  openGraph: {
    title: "Fullscript Supplements | Perspective Health Iowa",
    description:
      "Order practitioner-grade supplements online through our Fullscript dispensary. Convenient home delivery of the highest-quality supplements.",
  },
};

export default function FullscriptPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col justify-end overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-fullscript.jpg"
            alt="Practitioner-grade supplements and natural health products"
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
            Supplements Made Simple
          </p>
          <h1 className="flex flex-col items-start gap-2 sm:gap-3">
            <span className="inline-block bg-teal/90 px-4 py-2.5 sm:px-6 sm:py-3 text-white text-xl sm:text-2xl lg:text-3xl font-normal tracking-wide uppercase">
              Fullscript Supplements
            </span>
          </h1>
          <p className="text-white/80 text-lg max-w-xl mt-4">
            Order the practitioner-grade supplements recommended by your provider
            &mdash; delivered right to your door.
          </p>
        </div>
      </section>

      {/* Intro + Fullscript card */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left — intro text */}
            <div>
              <p className="font-script text-3xl text-teal mb-2">Quality You Can Trust</p>
              <h2 className="text-3xl font-extrabold text-charcoal mb-4">
                CONVENIENT SUPPLEMENT <span className="text-teal">DELIVERY</span>
              </h2>
              <div className="w-16 h-1 bg-teal rounded-full mb-6" />
              <p className="text-gray-600 text-lg leading-relaxed">
                We&apos;ve partnered with Fullscript to give you easy, online access
                to the highest-quality, practitioner-grade supplements. Whether
                your provider recommends a specific protocol or you&apos;re
                restocking your favorites, Fullscript makes ordering simple and
                delivers directly to your home.
              </p>
            </div>

            {/* Right — Fullscript card */}
            <div className="bg-gradient-to-br from-teal to-teal/80 rounded-2xl p-8 sm:p-10 text-white shadow-lg">
              <div className="bg-white rounded-xl p-4 inline-block mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/fullscript-logo.svg"
                  alt="Fullscript logo"
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-2xl sm:text-3xl font-bold leading-snug mb-4">
                Order Healthcare&apos;s Best Supplements &mdash; Delivered To Your Door.
              </p>
              <p className="text-white/80 text-sm mb-6">
                Browse practitioner-grade supplements, set up auto-refills, and
                enjoy free shipping on orders over $50.
              </p>
              <a
                href="https://us.fullscript.com/welcome/perspectivehealthdispensary"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-purple hover:bg-purple/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Visit Our Store <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Fullscript? */}
      <section className="section-padding bg-sage/40">
        <div className="section-container max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-charcoal mb-4">
              WHY <span className="text-teal">FULLSCRIPT?</span>
            </h2>
            <div className="w-16 h-1 bg-teal rounded-full mx-auto" />
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
            <ul className="space-y-4">
              {[
                "Practitioner-grade quality — every product is vetted for purity, potency, and safety",
                "Personalized recommendations from your Perspective Health provider",
                "Convenient home delivery with free shipping on orders over $50",
                "Easy auto-refill options so you never run out of your essentials",
                "Transparent pricing with exclusive discounts for our patients",
              ].map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle
                    size={20}
                    className="flex-shrink-0 mt-0.5 text-teal"
                  />
                  <span className="text-base">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="font-script text-3xl text-teal mb-2">Easy As 1-2-3-4</p>
            <h2 className="text-3xl font-extrabold text-charcoal">
              HOW IT <span className="text-teal">WORKS</span>
            </h2>
            <div className="w-16 h-1 bg-teal rounded-full mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                title: "Get a Recommendation",
                body: "Your provider recommends specific supplements as part of your personalized care plan.",
              },
              {
                step: 2,
                title: "Create Your Account",
                body: "Sign up through our Fullscript dispensary link. It only takes a minute to get started.",
              },
              {
                step: 3,
                title: "Place Your Order",
                body: "Browse your recommended products, add them to your cart, and check out securely online.",
              },
              {
                step: 4,
                title: "Delivered to Your Door",
                body: "Your supplements ship directly to you. Set up auto-refills so you never miss a dose.",
              },
            ].map(({ step, title, body }) => (
              <div
                key={step}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-teal/10 rounded-bl-2xl flex items-center justify-end pr-3 pt-2">
                  <span className="font-extrabold text-teal text-2xl">{step}</span>
                </div>
                <h3 className="font-bold text-charcoal text-lg mb-2 mt-2">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA info banner */}
      <section className="section-padding bg-white pt-0">
        <div className="section-container max-w-4xl">
          <div className="bg-teal/10 border border-teal/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-11 h-11 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
              <Phone size={20} className="text-teal" />
            </div>
            <div className="flex-grow">
              <p className="font-semibold text-charcoal">
                Questions about supplements?
              </p>
              <p className="text-gray-600 text-sm">
                Contact us or ask your provider at your next visit.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="btn-primary text-sm"
              >
                Call Us
              </a>
              <Link
                href="/contact#contact-form"
                className="btn-outline-teal text-sm inline-flex items-center gap-2"
              >
                Contact Us <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABanner heading="Need Help With Your Supplement Plan?" subtext="Talk to your provider about a personalized recommendation." />
    </>
  );
}
