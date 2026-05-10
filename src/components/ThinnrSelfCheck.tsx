"use client";

import { useState } from "react";
import { Check, Sparkles } from "lucide-react";

interface Props {
  items: string[];
}

export default function ThinnrSelfCheck({ items }: Props) {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const count = selected.size;
  const total = items.length;

  let message = "Tap the signs that sound like you to see how strong a fit THINNR may be.";
  if (count > 0 && count < Math.ceil(total / 2)) {
    message = "A few signs match — a quick consultation can help clarify whether THINNR is the right next step.";
  } else if (count >= Math.ceil(total / 2) && count < total) {
    message = "Several signs match — THINNR may be a good fit. Reach out to talk it through.";
  } else if (count === total) {
    message = "All signs match — let's talk about getting you started.";
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {items.map((item, i) => {
          const isSelected = selected.has(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              aria-pressed={isSelected}
              className={`h-full flex items-start gap-3 text-left rounded-xl p-4 border-2 transition-all duration-200 ${
                isSelected
                  ? "bg-teal/5 border-teal shadow-md"
                  : "bg-white border-gray-200 hover:border-teal/40 hover:bg-teal/5"
              }`}
            >
              <span
                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5 border-2 transition-all duration-200 ${
                  isSelected
                    ? "bg-teal border-teal text-white scale-110"
                    : "bg-white border-gray-300 text-transparent"
                }`}
              >
                <Check size={16} strokeWidth={3} />
              </span>
              <span
                className={`text-sm sm:text-base leading-relaxed ${
                  isSelected ? "text-charcoal font-medium" : "text-gray-700"
                }`}
              >
                {item}
              </span>
            </button>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-teal/5 to-teal/10 border border-teal/20 rounded-2xl p-5 sm:p-6 flex items-center gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal flex items-center justify-center text-white shadow-md">
          <Sparkles size={20} />
        </div>
        <div className="flex-grow">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal mb-1">
            {count} of {total} signs match
          </p>
          <p className="text-sm sm:text-base text-charcoal leading-snug">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
