import { SITE_CONFIG } from "@/lib/constants";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness"],
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/brand/phi-logo-horizontal.jpg`,
    image: `${SITE_CONFIG.url}/images/og-default.jpg`,
    description:
      "Perspective Health is an integrative medical clinic in Iowa offering comprehensive primary care, hormone health, functional medicine, and digestive health services.",
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      // Coordinates for Urbandale, IA (8860 Northpark Dr)
      latitude: 41.6528,
      longitude: -93.7614,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Wednesday"],
        opens: "08:00",
        closes: "12:00",
      },
    ],
    sameAs: [
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.instagram,
    ],
    medicalSpecialty: [
      "IntegrativeMedicine",
      "FunctionalMedicine",
      "GeneralPractice",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE_CONFIG.googleReviews.rating,
      reviewCount: SITE_CONFIG.googleReviews.count,
      bestRating: 5,
      worstRating: 1,
    },
    priceRange: "$$",
    paymentAccepted: "Cash, Check, Credit Card, Insurance, HSA, FSA",
    currenciesAccepted: "USD",
    areaServed: {
      "@type": "State",
      name: "Iowa",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
