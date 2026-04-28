// ============================================================
// SCHEMA MARKUP FOR PERSPECTIVE HEALTH IOWA
// ============================================================
// 
// HOW TO USE IN NEXT.JS:
// 
// Option 1: Add to your app/layout.tsx (recommended - applies site-wide)
//   - Paste the <Script> component inside your <body> tag
//   - Import Script from 'next/script' at the top of the file
//
// Option 2: Add to a specific page like app/page.tsx
//   - Same approach, just in the page file instead
//
// After pasting, you can verify it works by going to:
// https://search.google.com/test/rich-results
// and entering your site URL. Google will tell you if it reads the schema correctly.
// ============================================================

import Script from 'next/script';

// Drop this component into your layout.tsx or page.tsx
// Usage: <SchemaMarkup />

export default function SchemaMarkup() {
  // --- ORGANIZATION / LOCAL BUSINESS SCHEMA ---
  // This tells Google: "This is a medical business, here's everything about it"
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": "https://perspectivehealthiowa.com/#organization",
    "name": "Perspective Health Iowa",
    "alternateName": "Perspective Health",
    "description":
      "Perspective Health Iowa is an integrative medical clinic in Urbandale, IA offering primary care, hormone health, functional medicine, digestive and metabolic health services. Our experienced team blends conventional medicine with evidence-based complementary therapies for personalized, whole-person care.",
    "url": "https://perspectivehealthiowa.com",
    "logo": "https://perspectivehealthiowa.com/images/brand/phi-logo-horizontal.jpg",
    "image": "https://perspectivehealthiowa.com/images/hero-bg.jpg", // UPDATE with actual hero image URL
    "telephone": "+1-515-724-0377",
    "faxNumber": "+1-515-724-7018",
    "email": "info@perspectivehealthiowa.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "8860 Northpark Dr., Suite 200",
      "addressLocality": "Urbandale",
      "addressRegion": "IA",
      "postalCode": "50131",
      "addressCountry": "US",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.6528, // UPDATE with exact coordinates
      "longitude": -93.7614, // UPDATE with exact coordinates
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Wednesday",
        "opens": "08:00",
        "closes": "12:00",
      },
    ],
    "priceRange": "$$",
    "currenciesAccepted": "USD",
    "paymentAccepted": "Cash, Credit Card, HSA, FSA, CareCredit, Insurance",
    "areaServed": [
      {
        "@type": "City",
        "name": "Urbandale",
        "containedInPlace": { "@type": "State", "name": "Iowa" },
      },
      {
        "@type": "City",
        "name": "Des Moines",
        "containedInPlace": { "@type": "State", "name": "Iowa" },
      },
      {
        "@type": "City",
        "name": "West Des Moines",
        "containedInPlace": { "@type": "State", "name": "Iowa" },
      },
      {
        "@type": "City",
        "name": "Johnston",
        "containedInPlace": { "@type": "State", "name": "Iowa" },
      },
      {
        "@type": "City",
        "name": "Clive",
        "containedInPlace": { "@type": "State", "name": "Iowa" },
      },
      {
        "@type": "City",
        "name": "Ankeny",
        "containedInPlace": { "@type": "State", "name": "Iowa" },
      },
      {
        "@type": "City",
        "name": "Waukee",
        "containedInPlace": { "@type": "State", "name": "Iowa" },
      },
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "23",
      "bestRating": "5",
      "worstRating": "1",
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61566951063111",
      "https://www.instagram.com/perspective_health_iowa/",
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Healthcare Services",
      "itemListElement": [
        {
          "@type": "MedicalProcedure",
          "name": "Comprehensive Primary Care",
          "description":
            "Preventive wellness, annual exams, chronic condition management, and whole-person primary care.",
          "url": "https://perspectivehealthiowa.com/services/comprehensive-primary-care",
        },
        {
          "@type": "MedicalProcedure",
          "name": "Hormone Health",
          "description":
            "Bioidentical hormone therapy, hormone optimization, menopause and andropause support.",
          "url": "https://perspectivehealthiowa.com/services/hormone-health",
        },
        {
          "@type": "MedicalProcedure",
          "name": "Integrative and Functional Medicine",
          "description":
            "Root-cause approach combining conventional medicine with evidence-based complementary therapies.",
          "url": "https://perspectivehealthiowa.com/services/integrative-functional-medicine",
        },
        {
          "@type": "MedicalProcedure",
          "name": "Digestive and Metabolic Health",
          "description":
            "Gut health assessment, metabolic optimization, nutrition-based treatment plans.",
          "url": "https://perspectivehealthiowa.com/services/digestive-metabolic-health",
        },
        {
          "@type": "MedicalProcedure",
          "name": "Supplementary Services",
          "description":
            "Additional integrative wellness services including advanced testing and tailored treatments.",
          "url": "https://perspectivehealthiowa.com/services/supplementary-services",
        },
      ],
    },
  };

  // --- PROVIDER SCHEMAS ---
  // Each provider gets their own schema so Google knows who works here
  const providers = [
    {
      "@context": "https://schema.org",
      "@type": "Physician",
      "name": "Audrey Gries",
      "honorificSuffix": "PA-C",
      "jobTitle": "Physician Assistant",
      "description":
        "Audrey Gries, PA-C, is a physician assistant with 15 years of experience in primary care. She specializes in integrative and functional medicine approaches at Perspective Health Iowa in Urbandale.",
      "image": "https://perspectivehealthiowa.com/images/audrey-gries.jpg",
      "url": "https://perspectivehealthiowa.com/about#audrey-gries",
      "worksFor": {
        "@id": "https://perspectivehealthiowa.com/#organization",
      },
      "medicalSpecialty": [
        "Primary Care",
        "Integrative Medicine",
        "Hormone Health",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Physician",
      "name": "Stephanie Erdmann",
      "honorificSuffix": "DNP",
      "jobTitle": "Nurse Practitioner",
      "description":
        "Stephanie Erdmann, DNP, is a Doctor of Nursing Practice specializing in integrative approaches to chronic disease management and preventive wellness at Perspective Health Iowa.",
      "image": "https://perspectivehealthiowa.com/images/stephanie-erdmann.jpg",
      "url": "https://perspectivehealthiowa.com/about#stephanie-erdmann",
      "worksFor": {
        "@id": "https://perspectivehealthiowa.com/#organization",
      },
      "medicalSpecialty": [
        "Integrative Medicine",
        "Chronic Disease Management",
        "Preventive Wellness",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Physician",
      "name": "Tara Sayer",
      "honorificSuffix": "RN, BSN, MSCN, CNSC",
      "jobTitle": "Integrative and Functional Medicine Practitioner",
      "description":
        "Tara Sayer, RN, BSN, MSCN, CNSC, brings over two decades of healthcare experience combining expertise in intensive care nursing, functional medicine, and clinical nutrition at Perspective Health Iowa.",
      "image": "https://perspectivehealthiowa.com/images/tara-sayer.jpg",
      "url": "https://perspectivehealthiowa.com/about#tara-sayer",
      "worksFor": {
        "@id": "https://perspectivehealthiowa.com/#organization",
      },
      "medicalSpecialty": [
        "Functional Medicine",
        "Clinical Nutrition",
        "Digestive Health",
      ],
    },
  ];

  // --- WEBSITE SCHEMA ---
  // Tells Google this is an official website with search functionality
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Perspective Health Iowa",
    "url": "https://perspectivehealthiowa.com",
    "publisher": {
      "@id": "https://perspectivehealthiowa.com/#organization",
    },
  };

  return (
    <>
      <Script
        id="schema-organization"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      {providers.map((provider, index) => (
        <Script
          key={`schema-provider-${index}`}
          id={`schema-provider-${index}`}
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(provider),
          }}
        />
      ))}
      <Script
        id="schema-website"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
