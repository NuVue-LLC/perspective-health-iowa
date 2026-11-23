"use client";

import Script from "next/script";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Standard events go through fbq("track"), anything else through "trackCustom".
const STANDARD = new Set(["PageView", "ViewContent", "InitiateCheckout", "Schedule", "Lead", "Contact"]);

/** Fire a pixel event. Never pass names, contact details or health details. */
export function pixelTrack(event: string) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq(STANDARD.has(event) ? "track" : "trackCustom", event);
}

/**
 * Loads the pixel, sends PageView, then any extra events for this page.
 * Skipped on localhost so dev visits do not reach the real pixel; add ?pixel=1 to test.
 */
export function MetaPixel({ pixelId, events = [] }: { pixelId: string; events?: string[] }) {
  if (!pixelId) return null;
  const extra = events
    .map((e) => `fbq('${STANDARD.has(e) ? "track" : "trackCustom"}','${e}');`)
    .join("");
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`if(!/^(localhost|127\\.)/.test(location.hostname)||/[?&]pixel=1/.test(location.search)){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');${extra}}`}
    </Script>
  );
}
