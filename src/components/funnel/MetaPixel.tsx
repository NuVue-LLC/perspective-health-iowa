"use client";

import { useEffect } from "react";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: unknown;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

// Standard events go through fbq("track"), anything else through "trackCustom".
const STANDARD = new Set(["PageView", "ViewContent", "InitiateCheckout", "Schedule", "Lead", "Contact"]);

// Dev visits do not reach the real pixel; add ?pixel=1 to test locally.
function allowed() {
  return !/^(localhost|127\.)/.test(location.hostname) || /[?&]pixel=1/.test(location.search);
}

// Loads the pixel once per browser session and sends the first PageView.
// Later in-app navigations get their PageView from the pixel's own history tracking.
function ensurePixel(pixelId: string) {
  if (window.fbq) return;
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  fbq("init", pixelId);
  fbq("track", "PageView");
}

/** Fire a pixel event. Never pass names, contact details or health details. */
export function pixelTrack(event: string) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq(STANDARD.has(event) ? "track" : "trackCustom", event);
}

/**
 * Put one on each funnel page. Runs on every visit to the page, including
 * in-app navigation from the previous step, so each step's event always fires.
 */
export function MetaPixel({ pixelId, events = [] }: { pixelId: string; events?: string[] }) {
  const key = events.join(",");
  useEffect(() => {
    if (!pixelId || !allowed()) return;
    ensurePixel(pixelId);
    key.split(",").filter(Boolean).forEach(pixelTrack);
  }, [pixelId, key]);
  return null;
}
