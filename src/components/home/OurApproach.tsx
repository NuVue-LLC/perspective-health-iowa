"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const accordionItems = [
  {
    id: "collaborative",
    title: "Collaborative Approach",
    content:
      "Our team works together across disciplines — conventional medicine, nursing practice, and functional nutrition — to ensure every aspect of your health is considered. We share insights and coordinate your care so nothing falls through the cracks.",
  },
  {
    id: "root-cause",
    title: "Root-Cause Focus",
    content:
      "Rather than simply managing symptoms, we invest time in understanding why you feel the way you do. Through comprehensive testing, detailed health histories, and listening, we uncover the underlying factors driving your health challenges.",
  },
  {
    id: "personalized",
    title: "Personalized Care Plans",
    content:
      "No two patients are alike. Your care plan is built around your unique biology, lifestyle, preferences, and goals — combining evidence-based conventional treatments with targeted nutrition, lifestyle, and supplement strategies.",
  },
  {
    id: "whole-person",
    title: "Whole-Person Wellness",
    content:
      "We view your physical health, mental wellness, and lifestyle as deeply interconnected. Our approach addresses all dimensions of health — including stress, sleep, nutrition, movement, and social connection — to support sustainable, lasting change.",
  },
];

export function OurApproach() {
  const [openItem, setOpenItem] = useState<string | null>("collaborative");

  return (
    <section className="section-padding bg-teal geometric-pattern">
      <div className="section-container">
        {/* Section heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            OUR{" "}
            <span className="text-white">APPROACH</span>
          </h2>
          <div className="w-16 h-1 bg-white rounded-full mx-auto mt-4 mb-6" />
          <p className="max-w-2xl mx-auto text-white/80 text-lg leading-relaxed">
            We see health as multidimensional — shaped by genetics, environment,
            relationships, nutrition, and life experiences. Our integrative
            model goes beyond treating disease to actively cultivating your
            optimal health.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[3/4] image-zoom">
              <Image
                src="/images/approach-1.jpg"
                alt="Provider consulting with patient at Perspective Health Iowa"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[3/4] image-zoom mt-8">
              <Image
                src="/images/approach-2.jpg"
                alt="Integrative health care discussion at Perspective Health Iowa"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>

          {/* Right: Accordion */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              What Sets Us Apart
            </h3>
            <p className="text-white/70 mb-8">
              Discover the pillars of our integrative practice.
            </p>
            <div className="space-y-0 border border-white/20 rounded-xl overflow-hidden">
              {accordionItems.map((item) => (
                <div key={item.id} className="accordion-item border-b border-white/20 last:border-0">
                  <button
                    onClick={() =>
                      setOpenItem(openItem === item.id ? null : item.id)
                    }
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/10 transition-colors"
                    aria-expanded={openItem === item.id}
                  >
                    <span
                      className={cn(
                        "font-semibold text-white transition-colors",
                        openItem === item.id && "text-white font-bold"
                      )}
                    >
                      {item.title}
                    </span>
                    <ChevronDown
                      size={18}
                      className={cn(
                        "flex-shrink-0 text-white/70 transition-transform duration-200",
                        openItem === item.id ? "rotate-180" : ""
                      )}
                    />
                  </button>
                  {openItem === item.id && (
                    <div className="px-6 pb-5 text-white/70 text-sm leading-relaxed animate-fade-in">
                      {item.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
