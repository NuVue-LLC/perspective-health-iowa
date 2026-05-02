import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ArrowRight,
  Phone,
  IdCard,
  CreditCard,
  Pill,
  Leaf,
  FlaskConical,
  ClipboardList,
  Target,
  PhoneCall,
} from "lucide-react";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { CTABanner } from "@/components/home/CTABanner";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Welcome, New Patients",
  description:
    "Everything new patients need to know about their first visit at Perspective Health Iowa — what to expect, how to prepare, and FAQs.",
  openGraph: {
    title: "Welcome, New Patients | Perspective Health Iowa",
    description:
      "Your guide to getting started at Perspective Health Iowa. Learn what to expect at your first visit.",
  },
};

const faqs = [
  {
    question: "How do I become a new patient at Perspective Health?",
    answer:
      "Getting started is easy! Simply use our contact form or call our office to schedule your new patient appointment. We'll gather some basic information, answer your initial questions, and get you set up with one of our providers.",
  },
  {
    question: "What should I bring to my first appointment?",
    answer:
      "Please bring: a photo ID, your insurance card, a list of current medications and supplements (with dosages), any recent lab work or medical records you have access to, and a list of your current symptoms, concerns, and health goals. The more information you can share upfront, the more productive your first visit will be.",
  },
  {
    question: "How long is the initial appointment?",
    answer:
      "Initial appointments are typically 60–90 minutes. We invest this time in a thorough review of your health history, symptoms, goals, and concerns. Follow-up appointments are generally 30–45 minutes.",
  },
  {
    question: "Do you offer telehealth appointments?",
    answer:
      "Yes, we offer telehealth appointments for established patients for appropriate visit types. Please contact our office to determine if your needs can be addressed via telehealth.",
  },
  {
    question: "How do I access my medical records?",
    answer:
      "You can request your medical records by contacting our office. We comply with all HIPAA regulations regarding medical records requests and aim to fulfill requests within 30 business days.",
  },
  {
    question: "How do I refill my prescriptions?",
    answer:
      "Prescription refill requests should be submitted through your patient portal or by calling our office during business hours. Please allow 2–3 business days for refill processing. Controlled substances require an in-person visit.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We ask that you provide at least 24 hours' notice to cancel or reschedule an appointment. Late cancellations or no-shows may be subject to a fee. We understand that unexpected situations arise — please contact us as soon as possible if you need to reschedule.",
  },
  {
    question: "How do I get my lab results?",
    answer:
      "Lab results are reviewed by your provider and communicated through the patient portal or by phone, depending on the nature of the results. Routine results are typically available within 5–7 business days. Abnormal or time-sensitive results will be communicated sooner.",
  },
  {
    question: "Do you treat children?",
    answer:
      "Our current practice focuses on adult patients (18+). We'd be happy to help connect you with appropriate pediatric resources in the area.",
  },
  {
    question: "Can I use Perspective Health alongside my current doctors?",
    answer:
      "Absolutely — and we encourage it. We believe in collaborative care and are happy to work alongside your existing healthcare team, coordinate care, and share records as appropriate and with your consent.",
  },
];

export default function NewPatientsPage() {
  return (
    <>
      <FAQSchema faqs={faqs} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col justify-end overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-patients.jpg"
            alt="Warm, welcoming patient consultation at Perspective Health Iowa"
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
            We&apos;re Glad You&apos;re Here
          </p>
          <h1 className="flex flex-col items-start gap-2 sm:gap-3">
            <span className="inline-block bg-teal/90 px-4 py-2.5 sm:px-6 sm:py-3 text-white text-xl sm:text-2xl lg:text-3xl font-normal tracking-wide uppercase">
              Welcome, New Patients
            </span>
          </h1>
          <p className="text-white/80 text-lg max-w-xl mt-4">
            We&apos;re excited to meet you. Here&apos;s everything you need to know
            to prepare for your first visit and start your health journey with us.
          </p>
        </div>
      </section>

      {/* New patient steps */}
      <section className="section-padding geometric-pattern-light">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="font-script text-3xl text-teal mb-2">Getting Started</p>
            <h2 className="text-3xl font-extrabold text-charcoal">
              YOUR FIRST VISIT, <span className="text-teal">STEP BY STEP</span>
            </h2>
            <div className="w-16 h-1 bg-teal rounded-full mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                title: "Reach Out",
                body: "Call our office or submit a contact form. We'll answer your questions and help you find the right provider and appointment type.",
              },
              {
                step: 2,
                title: "Complete Paperwork",
                body: "We'll send you new patient intake forms to complete before your visit. Taking time with these helps us make the most of your appointment.",
              },
              {
                step: 3,
                title: "Your First Visit",
                body: "Arrive 15 minutes early. Your 60–90 minute appointment will be an in-depth conversation about your health history, concerns, and goals.",
              },
              {
                step: 4,
                title: "Your Care Plan",
                body: "Following your visit, you'll receive a personalized care plan with next steps, testing recommendations, and a roadmap for your health journey.",
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

          <div className="text-center mt-10">
            <Link href="/contact#contact-form" className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold text-white bg-green-accent hover:opacity-90 transition-all shadow-md hover:shadow-lg">
              Start Your Health Journey
            </Link>
          </div>
        </div>
      </section>

      {/* What to bring */}
      <section className="section-padding bg-sage/40">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="font-script text-3xl text-teal mb-2">Come Prepared</p>
            <h2 className="text-3xl font-extrabold text-charcoal">
              WHAT TO BRING TO YOUR <span className="text-teal">APPOINTMENT</span>
            </h2>
            <div className="w-16 h-1 bg-teal rounded-full mx-auto mt-4" />
            <p className="text-gray-500 mt-4 max-w-lg mx-auto">
              A little prep goes a long way — these help us make the most of your time together.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {[
              { item: "Photo ID", detail: "Driver's license or state ID", Icon: IdCard, accent: "teal" as const },
              { item: "Insurance Card(s)", detail: "Front and back, if applicable", Icon: CreditCard, accent: "purple" as const },
              { item: "Current Medications", detail: "Including names and dosages", Icon: Pill, accent: "teal" as const },
              { item: "Current Supplements", detail: "Vitamins, herbs, and OTC items", Icon: Leaf, accent: "green" as const },
              { item: "Recent Lab Work", detail: "Or any medical records you have", Icon: FlaskConical, accent: "purple" as const },
              { item: "Symptoms & Concerns", detail: "Helpful to write them down ahead of time", Icon: ClipboardList, accent: "teal" as const },
              { item: "Health Goals", detail: "What outcomes matter most to you", Icon: Target, accent: "green" as const },
              { item: "Emergency Contact", detail: "Name and phone number", Icon: PhoneCall, accent: "purple" as const },
            ].map(({ item, detail, Icon, accent }) => {
              const accentClasses = {
                teal: { badge: "bg-teal/10 text-teal", border: "group-hover:border-teal/40" },
                purple: { badge: "bg-purple/10 text-purple", border: "group-hover:border-purple/40" },
                green: { badge: "bg-green-accent/10 text-green-accent", border: "group-hover:border-green-accent/40" },
              }[accent];
              return (
                <div
                  key={item}
                  className={`group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-lg transition-all duration-200 ${accentClasses.border}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${accentClasses.badge} group-hover:scale-105 transition-transform`}>
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <h3 className="font-bold text-charcoal text-base mb-1.5 leading-snug">{item}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="section-container max-w-5xl">
          <div className="text-center mb-12">
            <p className="font-script text-3xl text-teal mb-2">Questions?</p>
            <h2 className="text-3xl font-extrabold text-charcoal">
              FREQUENTLY ASKED <span className="text-teal">QUESTIONS</span>
            </h2>
            <div className="w-16 h-1 bg-teal rounded-full mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group border border-gray-200 rounded-xl overflow-hidden self-start"
              >
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-sage/30 transition-colors list-none">
                  <h3 className="font-semibold text-charcoal pr-4 text-sm sm:text-base">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    size={18}
                    className="flex-shrink-0 text-teal transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>
                <div className="px-6 pb-5 pt-2 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-10 bg-purple/10 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-11 h-11 rounded-xl bg-purple/20 flex items-center justify-center flex-shrink-0">
              <Phone size={20} className="text-purple" />
            </div>
            <div className="flex-grow">
              <p className="font-semibold text-charcoal">Still have questions?</p>
              <p className="text-gray-600 text-sm">
                Our team is happy to help. Give us a call or send us a message.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="btn-primary text-sm"
              >
                Call Us
              </a>
              <Link href="/contact#contact-form" className="btn-outline-teal text-sm inline-flex items-center gap-2">
                Message Us <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABanner heading="Ready to Get Started?" subtext="Reach out to our team — we can't wait to meet you." />
    </>
  );
}
