"use client";

import Link from "next/link";
import { pixelTrack } from "./MetaPixel";

// The one action on the call page: call the office now, or ask for a callback.
export function CallPanel({
  phone,
  phoneRaw,
  hours,
  callbacks,
  offer,
}: {
  phone: string;
  phoneRaw: string;
  hours: string;
  callbacks: boolean;
  offer?: string;
}) {
  return (
    <div className="text-center">
      {offer ? (
        <p className="rounded-xl bg-teal px-3 py-2 text-lg font-extrabold leading-tight text-white shadow-md shadow-teal/25">
          {offer}
        </p>
      ) : (
        <p className="text-sm font-bold uppercase tracking-[0.08em] text-purple">Take the next step</p>
      )}
      <a
        href={`tel:+${phoneRaw}`}
        onClick={() => pixelTrack("Contact")}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-purple px-5 py-4 text-xl font-semibold text-white shadow-lg shadow-purple/25 transition hover:bg-purple-600"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            fill="currentColor"
            d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.57 3.6a1 1 0 0 1-.25 1L6.6 10.8z"
          />
        </svg>
        Call now
      </a>
      <p className="mt-2 text-lg font-semibold text-charcoal">{phone}</p>
      <p className="text-sm text-[#4A4A4A]">{hours}</p>
      {callbacks && (
        <Link
          href="/go/peptides/book"
          className="mt-4 inline-block text-base font-semibold text-teal-700 underline underline-offset-4"
        >
          Can&apos;t talk right now? Request a callback
        </Link>
      )}
    </div>
  );
}
