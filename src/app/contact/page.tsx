import type { Metadata } from "next";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Perspective Health Iowa to schedule an appointment or ask questions. We offer integrative primary care, hormone health, and functional medicine in Iowa.",
  openGraph: {
    title: "Contact Us | Perspective Health Iowa",
    description:
      "Reach out to schedule your appointment at Perspective Health Iowa.",
  },
};

const hours = [
  { day: "Monday", hours: SITE_CONFIG.hours.monday },
  { day: "Tuesday", hours: SITE_CONFIG.hours.tuesday },
  { day: "Wednesday", hours: SITE_CONFIG.hours.wednesday },
  { day: "Thursday", hours: SITE_CONFIG.hours.thursday },
  { day: "Friday", hours: SITE_CONFIG.hours.friday },
  { day: "Saturday", hours: SITE_CONFIG.hours.saturday },
  { day: "Sunday", hours: SITE_CONFIG.hours.sunday },
];

export default function ContactPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative min-h-[60vh] flex flex-col justify-end overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-contact.jpg"
            alt="Welcoming modern clinic interior at Perspective Health Iowa"
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
            Get in Touch
          </p>
          <h1 className="flex flex-col items-start gap-2 sm:gap-3">
            <span className="inline-block bg-teal/90 px-4 py-2.5 sm:px-6 sm:py-3 text-white text-xl sm:text-2xl lg:text-3xl font-normal tracking-wide uppercase">
              Contact Us
            </span>
          </h1>
          <p className="text-white/80 text-lg max-w-xl mt-4">
            We&apos;ll get back to you within one business day.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,640px)_1fr] gap-12 lg:gap-14">
            {/* Left: Contact form (shown first) */}
            <div id="contact-form" className="lg:order-1 scroll-mt-24">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-charcoal mb-1">
                      Send Us a Message
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Fill out the form below and we&apos;ll get back to you within one business day.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-teal/10 border border-teal/20 rounded-full px-4 py-1.5 flex-shrink-0">
                    <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                    <span className="text-teal text-xs font-semibold whitespace-nowrap">Avg. reply under 4 hrs</span>
                  </div>
                </div>
                <ContactForm />
              </div>
            </div>

            {/* Right: Contact info */}
            <div className="lg:col-span-1 lg:order-2 space-y-5">
              <h2 className="text-xl font-bold text-charcoal mb-1">
                Our Information
              </h2>

              {/* Phone card */}
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="block bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md hover:border-teal/40 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0 group-hover:bg-teal transition-colors">
                    <Phone size={20} className="text-teal group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-0.5">
                      Phone
                    </p>
                    <p className="text-charcoal font-semibold group-hover:text-teal transition-colors">
                      {SITE_CONFIG.phone}
                    </p>
                  </div>
                </div>
              </a>

              {/* Email card */}
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="block bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md hover:border-teal/40 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0 group-hover:bg-teal transition-colors">
                    <Mail size={20} className="text-teal group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-0.5">
                      Email
                    </p>
                    <p className="text-charcoal font-semibold group-hover:text-teal transition-colors break-all">
                      {SITE_CONFIG.email}
                    </p>
                  </div>
                </div>
              </a>

              {/* Address card */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-teal" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-0.5">
                      Address
                    </p>
                    <p className="text-charcoal font-semibold">
                      {SITE_CONFIG.address.street}
                      <br />
                      {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}{" "}
                      {SITE_CONFIG.address.zip}
                    </p>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(SITE_CONFIG.address.full)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal text-sm font-medium hover:underline mt-2 inline-flex items-center gap-1"
                    >
                      Get Directions <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours card */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h2 className="text-base font-bold text-charcoal mb-4 flex items-center gap-2">
                  <Clock size={18} className="text-teal" />
                  Office Hours
                </h2>
                <div className="space-y-2.5">
                  {hours.map(({ day, hours: h }) => (
                    <div key={day} className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">{day}</span>
                      <span
                        className={
                          h === "Closed"
                            ? "text-gray-400"
                            : "text-charcoal font-semibold"
                        }
                      >
                        {h}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* New patient card */}
              <div className="bg-teal/10 rounded-xl p-5 border border-teal/20 shadow-sm">
                <p className="font-semibold text-teal mb-1">New Patients Welcome</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We&apos;re accepting new patients and would love to be part of
                  your health team. Use the form to introduce yourself, and
                  we&apos;ll reach out to schedule your initial appointment.
                </p>
                <Link
                  href="/for-patients"
                  className="inline-flex items-center gap-1 text-teal font-medium text-sm mt-3 hover:underline"
                >
                  New patient resources <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit us CTA */}
      <section className="relative h-96 overflow-hidden" aria-label="Office location">
        <Image
          src="/images/about-clinic.jpg"
          alt="Perspective Health Iowa clinic"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6 max-w-lg">
            <div className="w-14 h-14 rounded-full bg-teal/20 border border-teal/40 flex items-center justify-center mx-auto mb-5">
              <MapPin size={26} className="text-teal" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Visit Our Clinic
            </h2>
            <p className="text-white/80 text-lg mb-2">
              {SITE_CONFIG.address.full}
            </p>
            <p className="text-white/60 text-sm mb-6">
              Walk-ins welcome during office hours
            </p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(SITE_CONFIG.address.full)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-teal inline-flex items-center gap-2"
            >
              <MapPin size={16} />
              Get Directions
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
