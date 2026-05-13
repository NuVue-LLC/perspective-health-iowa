"use client";

import { useState } from "react";

const modalities = [
  {
    label: "Transdermal Ozone",
    icon: "O₃",
    description:
      "Full-body ozone steam sauna for deep wellness support.",
  },
  {
    label: "CO₂ (Carbonic Acid)",
    icon: "CO₂",
    description:
      "Enhances ozone absorption and supports circulation.",
  },
  {
    label: "Steam Sauna",
    icon: "♨",
    description:
      "Whole body hyperthermia for core temperature elevation.",
  },
  {
    label: "Far Infrared",
    icon: "IR",
    description:
      "Deep-penetrating infrared warmth for enhanced vitality.",
  },
  {
    label: "High-Intensity PEMF",
    icon: "⚡",
    description:
      "Pulsed electromagnetic energy optimization.",
  },
  {
    label: "Frequency Specific Microcurrents",
    icon: "〰",
    description:
      "Targeted frequency protocols for cellular support.",
  },
  {
    label: "Concentrated Oxygen Breathing",
    icon: "O₂",
    description:
      "Pure oxygen inhalation during the session.",
  },
  {
    label: "Essential Oil Infusions",
    icon: "✦",
    description:
      "Aromatic compounds delivered via steam.",
  },
  {
    label: "Photon Light & Color",
    icon: "◉",
    description:
      "Full-spectrum light for photobiomodulation.",
  },
  {
    label: "Ultraviolet Irradiation",
    icon: "UV",
    description:
      "Natural UV energy that complements ozone's antimicrobial action.",
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
