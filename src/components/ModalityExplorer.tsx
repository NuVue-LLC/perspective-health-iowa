"use client";

import { useState } from "react";

const modalities = [
  {
    label: "Transdermal Ozone",
    icon: "O₃",
    description:
      "Ozone is delivered through the skin via steam, supporting the immune system, promoting oxygen utilization, and aiding the body's natural detoxification processes.",
  },
  {
    label: "Carbonic Acid",
    icon: "CO₂",
    description:
      "Carbonic acid therapy dilates blood vessels and increases blood flow, improving oxygen delivery to tissues. It also opens pores to enhance the absorption of ozone that follows.",
  },
  {
    label: "Whole-Body Hyperthermia",
    icon: "°F",
    description:
      "Controlled elevation of core body temperature stimulates immune function, increases circulation, and promotes the release of heat shock proteins that support cellular repair.",
  },
  {
    label: "Far Infrared",
    icon: "IR",
    description:
      "Far infrared energy penetrates deep into tissues, promoting circulation, easing muscle tension, reducing inflammation, and supporting the body's natural healing processes.",
  },
  {
    label: "Electrotherapy (TENS)",
    icon: "⚡",
    description:
      "Transcutaneous electrical nerve stimulation helps manage pain, reduce muscle tension, and stimulate circulation - all while you relax inside the capsule.",
  },
  {
    label: "Aromatherapy",
    icon: "✦",
    description:
      "Essential oils are infused into the steam to promote relaxation, support respiratory function, and enhance the overall therapeutic experience.",
  },
  {
    label: "Photon Light Therapy",
    icon: "◉",
    description:
      "Specific light frequencies support cellular energy production, skin health, and mood. Photon therapy works at the cellular level to promote healing and regeneration.",
  },
  {
    label: "UV Irradiation",
    icon: "UV",
    description:
      "Controlled ultraviolet exposure inside the capsule supports vitamin D synthesis, skin health, and has antimicrobial properties that complement the ozone therapy.",
  },
  {
    label: "Oxygen Breathing",
    icon: "O₂",
    description:
      "Throughout your session, you breathe pure humidified oxygen through a nasal cannula, supporting brain function, energy production, and overall cellular vitality.",
  },
  {
    label: "Steam Sauna",
    icon: "♨",
    description:
      "Medical-grade steam opens pores, promotes sweating for detoxification, and serves as the delivery system for ozone and carbonic acid to penetrate the skin.",
  },
];

export default function ModalityExplorer() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {modalities.map((mod, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            className={`group flex flex-col items-center text-center p-5 rounded-2xl transition-all duration-200 border-2 ${
              activeIndex === i
                ? "bg-white text-teal border-white shadow-lg scale-105"
                : "bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/40"
            }`}
          >
            <span
              className={`text-2xl font-bold mb-2 ${
                activeIndex === i ? "text-teal" : "text-white"
              }`}
            >
              {mod.icon}
            </span>
            <span
              className={`text-xs font-semibold uppercase tracking-wide leading-tight ${
                activeIndex === i ? "text-charcoal" : "text-white/90"
              }`}
            >
              {mod.label}
            </span>
          </button>
        ))}
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          activeIndex !== null ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {activeIndex !== null && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h4 className="font-bold text-charcoal mb-2">
              {modalities[activeIndex].label}
            </h4>
            <p className="text-gray-600 leading-relaxed">
              {modalities[activeIndex].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
