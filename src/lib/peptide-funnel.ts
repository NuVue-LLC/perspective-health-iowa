// Peptide funnel. One screen per step, no scrolling. No online booking of
// visits: patients call the office, or request a callback from the front desk.
//   /go/peptides            hook + Next                       (ViewContent)
//   /go/peptides/start      3 qualifying taps, nothing stored (InitiateCheckout)
//   /go/peptides/call       video + Call now + callback link  (Lead; Contact on tap)
//   /go/peptides/not-a-fit  shown when a qualifying answer is No
//   /go/peptides/book       callback request form, emails the front desk via
//                           /api/peptide-callback               (CallbackStart)
//   /go/peptides/booked     callback confirmed                (Schedule)
// then the front desk calls, checks insurance and books the consult with Stacey.
//
// Wording rules (see docs/peptide-marketing-research.md): no peptide names,
// no treatment claims, never "free" for the consult (it may be covered by
// insurance), keep "Compounded medications are not FDA-approved".
// Callback requests are emailed to the front desk through Resend. Without a
// RESEND_API_KEY on the deployment nobody would receive them, so the callback
// link and page switch off (they stay on in local dev, where requests are
// only logged). Evaluated at build time on the server.
export const CALLBACKS_ENABLED = !!process.env.RESEND_API_KEY || process.env.NODE_ENV !== "production";

export const PEPTIDE_FUNNEL = {
  // Clinic's Meta pixel. Events carry no personal or health details.
  pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "811186594320105",
  // Asked on /start. Any "No" goes to /not-a-fit. No health questions.
  questions: [
    "Are you in Iowa?",
    "Are you 18 or older?",
    "The consult is a medical visit. It isn't free, but it may be covered by insurance. OK?",
  ],
  // Shown on the hook page and the call panel. Clinic-set discount; clear it to hide.
  offer: "25% off your first peptide order",
  // Same offer split for the big badge: headline number, then what it applies to.
  offerBig: "25% off",
  offerRest: "your first peptide order",
  officeHours: "Mon, Tue, Thu, Fri 8 to 5 · Wed 8 to 12",
  video: {
    src: "/videos/peptide-call.mp4",
    poster: "/videos/peptide-call-poster.jpg",
    duration: 58.64,
    // [start in seconds, label]: matches the chapter tags burned into the video
    chapters: [
      [0, "Welcome"],
      [3.5, "Meet Stacey"],
      [17.9, "Why not order online?"],
      [27.8, "No commitment"],
      [35.7, "Insurance + cost"],
      [45.4, "For your call"],
    ] as [number, string][],
  },
  checklist: ["Insurance card", "List of medications + supplements", "Your questions"],
};
