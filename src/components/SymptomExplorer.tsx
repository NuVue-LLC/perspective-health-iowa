"use client";

import { useState } from "react";

const symptoms = [
  {
    label: "Fatigue & Low Energy",
    description:
      "Persistent fatigue is one of the most common signs of hormonal imbalance. Whether it's thyroid dysfunction, adrenal fatigue, or declining sex hormones, your energy levels are deeply connected to your hormonal health. We identify the root cause and create a plan to restore your vitality.",
  },
  {
    label: "Hot Flashes & Night Sweats",
    description:
      "These hallmark symptoms of perimenopause and menopause are caused by fluctuating estrogen levels. Through personalized bioidentical hormone therapy and lifestyle modifications, we help reduce the frequency and intensity of these disruptive episodes.",
  },
  {
    label: "Brain Fog & Mood Changes",
    description:
      "Difficulty concentrating, memory issues, anxiety, and mood swings are often tied to hormonal shifts. Thyroid imbalances, low testosterone, and estrogen fluctuations can all affect your cognitive function and emotional well-being.",
  },
  {
    label: "Weight Changes",
    description:
      "Unexplained weight gain - especially around the midsection - or difficulty losing weight despite a healthy lifestyle can signal hormonal imbalances including thyroid dysfunction, insulin resistance, or cortisol dysregulation.",
  },
  {
    label: "Low Libido",
    description:
      "Declining interest in intimacy affects both men and women and is frequently connected to low testosterone, estrogen imbalances, or adrenal fatigue. Restoring hormonal balance can help reignite your drive and improve relationship satisfaction.",
  },
  {
    label: "Sleep Disruption",
    description:
      "Trouble falling or staying asleep is closely linked to hormonal health. Progesterone, cortisol, and melatonin imbalances can all interfere with restful sleep. Addressing the hormonal root cause often leads to dramatically better sleep quality.",
  },
  {
    label: "Hair Loss & Skin Changes",
    description:
      "Thinning hair, dry skin, and brittle nails can be signs of thyroid disorders, hormonal shifts during menopause, or androgen imbalances. A comprehensive hormone panel helps pinpoint the cause so we can target treatment effectively.",
  },
  {
    label: "Irregular Cycles & PMS",
    description:
      "Heavy periods, painful cramps, irregular cycles, and severe PMS symptoms often point to estrogen-progesterone imbalances or conditions like PCOS. We evaluate your full hormonal picture to create a plan that brings your cycle back into balance.",
  },
];

export default function SymptomExplorer() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {symptoms.map((symptom, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border-2 ${
              activeIndex === i
                ? "bg-teal text-white border-teal shadow-md scale-105"
                : "bg-white text-charcoal border-gray-200 hover:border-teal/50 hover:shadow-sm"
            }`}
          >
            {symptom.label}
          </button>
        ))}
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          activeIndex !== null ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {activeIndex !== null && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-teal/20">
            <h4 className="font-bold text-charcoal mb-2">
              {symptoms[activeIndex].label}
            </h4>
            <p className="text-gray-600 leading-relaxed">
              {symptoms[activeIndex].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
