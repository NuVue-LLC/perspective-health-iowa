"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

const FORM_ID = "261325118696057";
const FORM_URL = `https://form.jotform.com/${FORM_ID}`;

declare global {
  interface Window {
    jotformEmbedHandler?: (selector: string, origin: string) => void;
  }
}

export function JotFormEmbed() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // After the JotForm embed handler script loads, attach it to the iframe so
  // the height auto-resizes to fit the form's content (no inner scroll).
  useEffect(() => {
    const tryAttach = () => {
      if (typeof window === "undefined") return;
      if (typeof window.jotformEmbedHandler === "function") {
        window.jotformEmbedHandler(
          `iframe[id='JotFormIFrame-${FORM_ID}']`,
          "https://form.jotform.com"
        );
        return true;
      }
      return false;
    };

    // Try once immediately and then poll briefly in case the script is still loading.
    if (tryAttach()) return;
    const interval = setInterval(() => {
      if (tryAttach()) clearInterval(interval);
    }, 200);
    const timeout = setTimeout(() => clearInterval(interval), 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <Script
        src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"
        strategy="lazyOnload"
      />
      <div className="relative">
        <iframe
          ref={iframeRef}
          id={`JotFormIFrame-${FORM_ID}`}
          title="Perspective Health Iowa contact form"
          src={FORM_URL}
          allow="geolocation; microphone; camera"
          allowTransparency
          scrolling="no"
          style={{
            minWidth: "100%",
            maxWidth: "100%",
            height: "720px",
            border: "none",
            display: "block",
          }}
        />
        {/* Mask the free-tier JotForm branding bar at the bottom of the iframe.
            Card background is white so a white block blends in seamlessly.
            Pointer-events-none so it never blocks interaction with the form above. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-white"
        />
      </div>
    </>
  );
}
