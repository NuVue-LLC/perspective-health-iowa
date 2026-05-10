"use client";

import { useState } from "react";
import { ClipboardCheck, CalendarDays, Scale, Sparkles } from "lucide-react";

const phases = [
  {
    label: "Consultation",
    duration: "Before you start",
    Icon: ClipboardCheck,
    summary:
      "An initial visit to confirm THINNR is a good fit for you, review your full health picture, and answer any questions before day one.",
    items: [
      "Health history, medications, and goals review",
      "Baseline lab work and vitals if needed",
      "Walk-through of the protocol, what to expect, and pricing",
      "Confirmation that the program is appropriate for you",
    ],
  },
  {
    label: "THINNR Protocol",
    duration: "Days 1–42",
    Icon: CalendarDays,
    summary:
      "The core 42-day program — daily homeopathic protocol paired with the structured nutrition plan, supported by check-ins along the way.",
    items: [
      "Daily THINNR homeopathic OTC routine",
      "Low-glycemic, anti-inflammatory nutrition plan",
      "Provider check-ins to track progress and adjust support",
      "Guidance for early-week adjustment (hunger, hydration, energy)",
    ],
  },
  {
    label: "Metabolic Normalization",
    duration: "Minimum 3 weeks",
    Icon: Scale,
    summary:
      "After day 42, you transition into a structured normalization phase to help your body settle and protect the results from the protocol.",
    items: [
      "Required minimum 3-week phase before any additional rounds",
      "Gradual reintroduction of foods with continued structure",
      "Continued provider guidance during the transition",
      "Plan-building for what comes next based on your goals",
    ],
  },
  {
    label: "Long-Term Maintenance",
    duration: "Ongoing",
    Icon: Sparkles,
    summary:
      "We work with you on the longer-term plan — sustainable nutrition habits, lifestyle support, and integration with your other care at Perspective Health.",
    items: [
      "Sustainable nutrition and lifestyle habits",
      "Coordination with your primary care, hormone, or functional medicine plan",
      "Ongoing follow-up and support as life changes",
      "Discussion of additional rounds only when clinically appropriate",
    ],
  },
];

export default function ThinnrTimeline() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div>
      {/* Phase selector — horizontal connected stepper on md+, vertical stack on mobile */}
      <div className="relative mb-8">
        {/* Desktop connector line */}
        <div
          className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-0.5 bg-teal/20"
          aria-hidden="true"
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-2 relative">
          {phases.map((phase, i) => {
            const isActive = activeIndex === i;
            const { Icon } = phase;
            return (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-pressed={isActive}
                className="group flex md:flex-col items-center md:text-center gap-3 md:gap-2 p-3 rounded-xl hover:bg-teal/5 transition-colors text-left md:text-center"
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all duration-200 ${
                    isActive
                      ? "bg-teal border-teal text-white shadow-lg scale-110"
                      : "bg-white border-teal/30 text-teal group-hover:border-teal/60"
                  }`}
                >
                  <Icon size={22} />
                </div>
                <div className="md:mt-2">
                  <p
                    className={`text-xs font-semibold uppercase tracking-wider ${
                      isActive ? "text-teal" : "text-gray-400"
                    }`}
                  >
                    Step {i + 1}
                  </p>
                  <p
                    className={`text-sm sm:text-base font-bold leading-tight ${
                      isActive ? "text-charcoal" : "text-gray-600"
                    }`}
                  >
                    {phase.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {phase.duration}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active phase details */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
        <div className="flex items-baseline justify-between gap-4 mb-4 flex-wrap">
          <h3 className="text-xl sm:text-2xl font-bold text-charcoal">
            {phases[activeIndex].label}
          </h3>
          <span className="text-sm font-semibold uppercase tracking-wider text-teal">
            {phases[activeIndex].duration}
          </span>
        </div>
        <p className="text-gray-700 leading-relaxed mb-6">
          {phases[activeIndex].summary}
        </p>
        <ul className="space-y-2.5">
          {phases[activeIndex].items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-600 leading-relaxed">
              <span className="text-teal font-bold mt-0.5 flex-shrink-0">&raquo;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
