"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// Three yes/no taps on one screen. Answers never leave the browser: they only
// decide whether the next page shows the phone number.
export function Qualifier({ questions, yesHref, noHref }: { questions: string[]; yesHref: string; noHref: string }) {
  const router = useRouter();
  const [answers, setAnswers] = useState<(boolean | null)[]>(() => questions.map(() => null));
  const complete = answers.every((a) => a !== null);

  const pick = (i: number, v: boolean) => setAnswers((a) => a.map((x, k) => (k === i ? v : x)));

  return (
    <div className="space-y-3">
      {questions.map((q, i) => (
        <div
          key={q}
          className="flex items-center justify-between gap-3 rounded-2xl border border-sage-100 bg-white px-4 py-3 text-left shadow-sm"
        >
          <p className="text-base font-medium leading-snug sm:text-lg">{q}</p>
          <div className="flex flex-none gap-2">
            {[true, false].map((v) => (
              <button
                key={String(v)}
                type="button"
                aria-pressed={answers[i] === v}
                onClick={() => pick(i, v)}
                className={`h-11 w-[58px] rounded-full border-2 text-base font-semibold transition ${
                  answers[i] === v
                    ? "border-teal bg-teal text-white"
                    : "border-teal-200 bg-white text-teal-700 hover:border-teal"
                }`}
              >
                {v ? "Yes" : "No"}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        disabled={!complete}
        onClick={() => router.push(answers.every(Boolean) ? yesHref : noHref)}
        className="!mt-5 w-full rounded-full bg-purple px-10 py-4 text-xl font-semibold text-white shadow-lg shadow-purple/25 transition hover:bg-purple-600 disabled:cursor-not-allowed disabled:bg-[#c9c3cc] disabled:shadow-none sm:w-auto"
      >
        Next
      </button>
    </div>
  );
}
