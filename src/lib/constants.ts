export const SITE_CONFIG = {
  name: "Perspective Health Iowa",
  tagline: "Experience Healthcare From A New Perspective",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://perspectivehealthiowa.com",
  phone: "(515) 724-0377",
  phoneRaw: "15157240377",
  fax: "515-724-7018",
  email: "info@perspectivehealthiowa.com",
  address: {
    street: "8860 Northpark Dr., Suite 200",
    city: "Urbandale",
    state: "IA",
    zip: "50131",
    full: "8860 Northpark Dr., Suite 200, Urbandale, IA 50131",
  },
  hours: {
    monday: "8:00 AM – 5:00 PM",
    tuesday: "8:00 AM – 5:00 PM",
    wednesday: "8:00 AM – 12:00 PM",
    thursday: "8:00 AM – 5:00 PM",
    friday: "8:00 AM – 5:00 PM",
    saturday: "Closed",
    sunday: "Closed",
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61566951063111",
    instagram: "https://www.instagram.com/perspective_health_iowa/",
    google:
      "https://www.google.com/maps/place/Perspective+Health+Iowa",
  },
  googleReviews: {
    rating: 5.0,
    count: 23,
  },
};

export const SERVICES = [
  {
    slug: "comprehensive-primary-care",
    name: "Comprehensive Primary Care",
    shortName: "Primary Care",
    description:
      "Whole-person primary care that goes beyond symptom management to address root causes and support your long-term wellbeing.",
    image: "/images/service-primary-care.jpg",
    imageAlt: "Comprehensive primary care consultation in Iowa",
  },
  {
    slug: "hormone-health",
    name: "Hormone Health",
    shortName: "Hormone Health",
    description:
      "Personalized hormone evaluation and optimization for men and women experiencing hormonal imbalances affecting quality of life.",
    image: "/images/service-hormone-health.jpg",
    imageAlt: "Hormone health consultation in Iowa",
  },
  {
    slug: "integrative-functional-medicine",
    name: "Integrative and Functional Medicine",
    shortName: "Functional Medicine",
    description:
      "Evidence-based integrative approaches that look at the body as an interconnected system to find and address root causes of illness.",
    image: "/images/service-integrative-medicine.jpg",
    imageAlt: "Integrative and functional medicine in Iowa",
  },
  {
    slug: "digestive-metabolic-health",
    name: "Digestive & Metabolic Health",
    shortName: "Digestive Health",
    description:
      "Comprehensive assessment and support for digestive disorders, gut health optimization, and metabolic conditions.",
    image: "/images/service-digestive-metabolic.jpg",
    imageAlt: "Digestive and metabolic health services in Iowa",
  },
  {
    slug: "supplementary-services",
    name: "Supplementary Services",
    shortName: "Supplementary",
    description:
      "Targeted therapeutic services including IV therapy, nutrition counseling, and wellness support to complement your care plan.",
    image: "/images/service-supplementary.jpg",
    imageAlt: "Supplementary health services in Iowa",
  },
  {
    slug: "hocatt",
    name: "HOCATT Ozone Sauna",
    shortName: "HOCATT",
    description:
      "Advanced ozone therapy sauna that delivers up to 10 therapeutic modalities in a single 30-minute session — supporting detoxification, circulation, immune function, and whole-body recovery.",
    image: "/images/service-hocatt.jpg",
    imageAlt: "HOCATT ozone sauna therapy at Perspective Health Iowa",
  },
];

export const PROVIDERS = [
  {
    id: "audrey-gries",
    name: "Audrey Gries",
    credentials: "PA-C",
    title: "Physician Assistant",
    bio: "Audrey brings a compassionate, whole-person approach to primary and integrative care. With advanced training in functional medicine and hormone health, she partners with patients to uncover the root causes of their health challenges and build personalized, sustainable wellness plans.",
    image: "/images/audrey-gries.jpg",
    imageAlt: "Audrey Gries, PA-C - Physician Assistant at Perspective Health Iowa",
    specialty: "Primary Care & Hormone Health",
  },
  {
    id: "stephanie-erdmann",
    name: "Stephanie Erdmann",
    credentials: "DNP",
    title: "Nurse Practitioner",
    bio: "Stephanie is a Doctor of Nursing Practice who specializes in integrative approaches to chronic disease management and preventive wellness. She is passionate about empowering patients with the knowledge and tools to take charge of their health journey.",
    image: "/images/stephanie-erdmann.jpg",
    imageAlt: "Stephanie Erdmann, DNP - Nurse Practitioner at Perspective Health Iowa",
    specialty: "Chronic Disease & Preventive Wellness",
  },
  {
    id: "tara-sayer",
    name: "Tara Sayer",
    credentials: "RN, BSN, MSCN, CNSC",
    title: "Integrative And Functional Medicine Practitioner",
    bio: "Tara combines her extensive nursing background with specialized training in functional medicine and clinical nutrition. She focuses on digestive health, metabolic wellness, and the intricate relationship between nutrition and overall health outcomes.",
    image: "/images/tara-sayer.jpg",
    imageAlt: "Tara Sayer, RN, BSN, MSCN, CNSC - Functional Medicine Practitioner at Perspective Health Iowa",
    specialty: "Digestive Health & Clinical Nutrition",
  },
];

export const INSURANCE_PARTNERS = [
  {
    name: "Wellmark BlueCross BlueShield",
    logo: "/images/insurance-wellmark.webp",
  },
  {
    name: "Optum / UnitedHealthcare",
    logo: "/images/insurance-optum.webp",
  },
  {
    name: "Midlands Choice",
    logo: "/images/insurance-midlandschoice.jpeg",
  },
  {
    name: "Medicare",
    logo: "/images/insurance-medicare.png",
  },
  {
    name: "Aetna",
    logo: "/images/insurance-aetna.webp",
  },
  {
    name: "Cigna",
    logo: "/images/insurance-cigna.png",
  },
  {
    name: "Humana",
    logo: "/images/insurance-humana.svg",
  },
];

export const NAVIGATION_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Our Services",
    href: "/services",
    children: SERVICES.map((s) => ({
      label: s.name,
      href: `/services/${s.slug}`,
    })),
  },
  { label: "Our Team", href: "/about" },
  { label: "For Our Patients", href: "/for-patients" },
  { label: "Insurance", href: "/insurance" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];
