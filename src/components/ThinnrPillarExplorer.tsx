"use client";

import { useState } from "react";
import { FlaskConical, Salad, Check } from "lucide-react";

const pillars = [
  {
    label: "Homeopathic OTC Medication",
    tagline: "Pillar 1",
    Icon: FlaskConical,
    summary:
      "An all-natural, FDA-registered homeopathic OTC formula that supports the body's own weight regulation systems.",
    bullets: [
      "Supports balanced metabolism and efficient fat burning",
      "Helps curb hunger and cravings",
      "Supports lower stress linked to emotional eating",
      "Aids natural detoxification and elimination",
      "No injections, no prescription required",
    ],
    footer:
      "Manufactured in US-based, FDA-registered, cGMP-certified, state-licensed facilities with post-production quantitative testing.",
  },
  {
    label: "Weight Loss & Maintenance Nutrition Strategy",
    tagline: "Pillar 2",
    Icon: Salad,
    summary:
      "A science-informed eating plan built around real, whole foods — designed to work with the homeopathic protocol, not against your lifestyle.",
    bullets: [
      "Emphasizes low-glycemic, anti-inflammatory foods",
      "Balanced portions with structured daily guidance",
      "Designed to support weight loss while you stay satisfied",
      "Aims to help reduce inflammation and stabilize blood sugar",
      "Built around real foods, not packaged meal replacements",
    ],
    footer:
      "Together with the homeopathic protocol, the nutrition strategy is the second half of THINNR's two-pillar approach.",
  },
];

export default function ThinnrPillarExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      {/* Pillar selector cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {pillars.map((pillar, i) => {
          const isActive = activeIndex === i;
          const { Icon } = pillar;
          return (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-pressed={isActive}
              className={`group text-left p-6 rounded-2xl transition-all duration-200 border-2 ${
                isActive
                  ? "bg-white border-white shadow-xl scale-[1.02]"
                  : "bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40"
              }`}
            >
              <div className="flex items-center gap-4 mb-2">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    isActive ? "bg-teal/10" : "bg-white/15"
                  }`}
                >
                  <Icon
                    size={22}
                    className={isActive ? "text-teal" : "text-white"}
                  />
                </div>
                <div>
                  <p
                    className={`text-xs font-semibold uppercase tracking-wider mb-0.5 ${
                      isActive ? "text-teal" : "text-white/70"
                    }`}
                  >
                    {pillar.tagline}
                  </p>
                  <h3
                    className={`text-base sm:text-lg font-bold uppercase tracking-wide leading-tight ${
                      isActive ? "text-charcoal" : "text-white"
                    }`}
                  >
                    {pillar.label}
                  </h3>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active pillar details */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
        <p className="text-gray-700 leading-relaxed mb-6">
          {pillars[activeIndex].summary}
        </p>
        <ul className="space-y-3 mb-6">
          {pillars[activeIndex].bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={14} className="text-teal" strokeWidth={3} />
              </span>
              <span className="text-gray-700 leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-500 italic border-t border-gray-100 pt-4">
          {pillars[activeIndex].footer}
        </p>
      </div>
    </div>
  );
}
