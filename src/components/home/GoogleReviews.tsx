import { Star } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { PinwheelLogo } from "@/components/ui/PinwheelLogo";

const reviews = [
  {
    id: 1,
    initials: "EH",
    name: "E.H.",
    rating: 5,
    date: "Google Review",
    excerpt:
      "My first appointment was wonderful! I felt very listened to and understood. Clear expectations and plans were discussed. The prices are given ahead of time and they work with your income and specific needs. The office was very clean and smells wonderful! I had a great experience and look forward to working with all of the providers at Perspective Health to get well and stay well!",
  },
  {
    id: 2,
    initials: "LW",
    name: "L.W.",
    rating: 5,
    date: "Google Review",
    excerpt:
      "I came to see Tara for nutritional guidance to avoid the middle age issues of prediabetes. She lent such wisdom and support that it does feel freeing instead of overwhelming. I\u2019m also working with Audrey on a health issue that cropped up. She is so protective and supportive. I am all in to working with all these practitioners to live a more healthy and resilient lifestyle in retirement.",
  },
  {
    id: 3,
    initials: "MG",
    name: "M.G.",
    rating: 5,
    date: "Google Review",
    excerpt:
      "Absolutely stunning office, unreal staff. I came here as a referral from a doctor. I was so incredibly anxious with a new environment and the unknown. Walking in and immediately greeted by staff who is incredibly detailed!",
  },
];

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }
        />
      ))}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function GoogleReviews() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
          {/* Left: Rating summary */}
          <div className="lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <PinwheelLogo className="w-16 h-16 mb-4" />
            <h2 className="font-bold text-xl text-charcoal mb-1">
              Perspective Health
            </h2>
            <p className="text-gray-500 text-sm mb-3">Iowa</p>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-4xl font-extrabold text-charcoal">
                {SITE_CONFIG.googleReviews.rating.toFixed(1)}
              </span>
              <div className="flex flex-col">
                <StarRating rating={SITE_CONFIG.googleReviews.rating} />
                <span className="text-gray-500 text-xs mt-0.5">
                  {SITE_CONFIG.googleReviews.count} Google reviews
                </span>
              </div>
            </div>
            <a
              href={SITE_CONFIG.social.google}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-teal font-medium hover:underline"
            >
              <GoogleIcon />
              View on Google
            </a>
          </div>

          {/* Right: Review cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map((review) => (
              <article key={review.id} className="review-card">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {review.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal text-sm">
                        {review.name}
                      </p>
                      <p className="text-gray-400 text-xs">{review.date}</p>
                    </div>
                  </div>
                  <GoogleIcon />
                </div>
                <StarRating rating={review.rating} />
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                  {review.excerpt}
                </p>
                <a
                  href={SITE_CONFIG.social.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-teal text-xs font-medium hover:underline"
                >
                  Verified on Google
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
