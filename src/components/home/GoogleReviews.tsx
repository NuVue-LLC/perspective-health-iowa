import { Star } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { PinwheelLogo } from "@/components/ui/PinwheelLogo";

const reviews = [
  {
    id: 1,
    initials: "M",
    name: "Megan S.",
    rating: 5,
    excerpt:
      "I have NEVER met a more caring, thorough doctor than Audrey. She cares and is devoted to making sure your concerns are heard and looked into. So thankful for her!!!",
  },
  {
    id: 2,
    initials: "A",
    name: "Amy U.",
    rating: 5,
    excerpt:
      "I had a wonderful experience with Stephanie and the entire staff. Stephanie was incredibly understanding, thorough, and took the time to really listen to my concerns. I felt heard and supported throughout my visit. The rest of the team was also kind, professional, and helpful from start to finish. I highly recommend this office to anyone looking for compassionate and attentive care!",
  },
  {
    id: 3,
    initials: "A",
    name: "Alexa S.",
    rating: 5,
    excerpt:
      "The motto here is \u201cBe Seen\u201d and they truly do see you as a person! I have never felt so heard than at any other medical practice. I recommend this practice to anyone who wills listen \ud83d\ude00",
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
