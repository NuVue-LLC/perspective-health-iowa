"use client";

// Vercel Web Analytics (pageviews by country / route / referrer) plus the two
// events that matter for a phone-first local business:
//   • call_tap — any tel: link, captured site-wide by one delegated listener
//   • text_tap — any sms: link, same listener
// Nothing to wire per link: every phone link on the site, present or future,
// is counted. Analytics must also be enabled on the Vercel project.
import { track } from "@vercel/analytics";
import { Analytics } from "@vercel/analytics/next";
import { useEffect } from "react";

export default function SiteAnalytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const link = target?.closest?.('a[href^="tel:"], a[href^="sms:"]');
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      track(href.startsWith("sms:") ? "text_tap" : "call_tap", {
        path: window.location.pathname,
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return <Analytics />;
}
