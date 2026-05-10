import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, UserPlus, Leaf, ClipboardList } from "lucide-react";
import { CTABanner } from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "For Our Patients",
  description:
    "Access your patient portal, learn about becoming a new patient, or order practitioner-grade supplements through Fullscript at Perspective Health Iowa.",
  openGraph: {
    title: "For Our Patients | Perspective Health Iowa",
    description:
      "Your health hub - access patient resources, new patient information, and supplement ordering at Perspective Health Iowa.",
  },
};

const resources = [
  {
    title: "Patient Portal",
    description:
      "Access your medical records, view lab results, request prescription refills, and communicate with your care team through the Elation Passport portal.",
    icon: ClipboardList,
    href: "https://app.elationpassport.com/passport/login/",
    external: true,
    buttonLabel: "Open Patient Portal",
    accentColor: "teal",
    iconBg: "bg-teal",
    buttonClass:
      "bg-teal text-white hover:opacity-90",
  },
  {
    title: "New Patients",
    description:
      "Everything you need to know about your first visit - what to expect, how to prepare, what to bring, and answers to frequently asked questions.",
    icon: UserPlus,
    href: "/for-patients/new-patients",
    external: false,
    buttonLabel: "Get Started",
    accentColor: "purple",
    iconBg: "bg-purple",
    buttonClass:
      "bg-purple text-white hover:opacity-90",
  },
  {
    title: "Fullscript Supplements",
    description:
      "Order practitioner-grade supplements recommended by your provider - delivered right to your door with free shipping on orders over $50.",
    icon: Leaf,
    href: "/for-patients/fullscript",
    external: false,
    buttonLabel: "Browse Supplements",
    accentColor: "green-accent",
    iconBg: "bg-green-accent",
    buttonClass:
      "bg-green-accent text-white hover:opacity-90",
  },
];

export default function ForPatientsHubPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col justify-end overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <Image
            src="/images/women-friends-wellness-perspective-health-iowa.jpg"
            alt="Women supporting each other through integrative wellness at Perspective Health Iowa"
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
            Your Health Hub
          </p>
          <h1 className="flex flex-col items-start gap-2 sm:gap-3">
            <span className="inline-block bg-teal/90 px-4 py-2.5 sm:px-6 sm:py-3 text-white text-xl sm:text-2xl lg:text-3xl font-normal tracking-wide uppercase">
              For Our Patients
            </span>
          </h1>
          <p className="text-white/80 text-lg max-w-xl mt-4">
            Everything you need in one place &mdash; access your portal, get started
            as a new patient, or order supplements from your provider.
          </p>
        </div>
      </section>

      {/* Resource Cards */}
      <section className="section-padding geometric-pattern-light">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="font-script text-3xl text-teal mb-2">
              Patient Resources
            </p>
            <h2 className="text-3xl font-extrabold text-charcoal">
              HOW CAN WE <span className="text-teal">HELP YOU?</span>
            </h2>
            <div className="w-16 h-1 bg-teal rounded-full mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {resources.map((resource) => {
              const Icon = resource.icon;
              const buttonClassName = `inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition-all ${resource.buttonClass}`;

              return (
                <div
                  key={resource.title}
                  className="bg-white rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <div className="p-8 flex flex-col items-center text-center flex-grow">
                    <div
                      className={`w-16 h-16 rounded-2xl ${resource.iconBg} flex items-center justify-center mb-5`}
                    >
                      <Icon size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-charcoal mb-3">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {resource.description}
                    </p>
                    <div className="mt-auto">
                      {resource.external ? (
                        <a
                          href={resource.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={buttonClassName}
                        >
                          {resource.buttonLabel}
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <Link href={resource.href} className={buttonClassName}>
                          {resource.buttonLabel}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Need Help Getting Started?"
        subtext="Our team is here for you - reach out anytime with questions."
      />
    </>
  );
}
