import { SITE_CONFIG, PROVIDERS, INSURANCE_PARTNERS, SERVICES } from "./constants";
import { servicesData } from "./services-data";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// --- FAQ Shortcut Layer ---
// Pattern-match common questions and return instant answers without hitting the API.

interface FaqPattern {
  patterns: RegExp[];
  answer: string;
  suggestions?: string[];
  showLeadForm?: boolean;
}

function buildFaqPatterns(): FaqPattern[] {
  const hours = Object.entries(SITE_CONFIG.hours)
    .map(([day, time]) => `${day.charAt(0).toUpperCase() + day.slice(1)}: ${time}`)
    .join("\n");

  const providerList = PROVIDERS.map(
    (p) => `• ${p.name}, ${p.credentials} — ${p.title} (${p.specialty})`
  ).join("\n");

  const insuranceList = INSURANCE_PARTNERS.map((i) => `• ${i.name}`).join("\n");

  const serviceList = SERVICES.map((s) => `• ${s.name}`).join("\n");

  return [
    // --- Core clinic info ---
    {
      patterns: [/\b(hours?|open|close[sd]?|when)\b/i],
      answer: `Our office hours are:\n${hours}\n\nYou can always call ${SITE_CONFIG.phone} to confirm, especially around holidays!`,
      suggestions: ["How do I schedule?", "Where are you located?"],
    },
    {
      patterns: [/\b(where|address|location|directions?|find you|located|map)\b/i],
      answer: `We're located at ${SITE_CONFIG.address.full}, in the Urbandale/West Des Moines area of central Iowa, conveniently off Northpark Drive. You can reach us at ${SITE_CONFIG.phone} if you need directions!`,
      suggestions: ["What are your hours?", "Do you offer telehealth?"],
    },
    {
      patterns: [/\b(phone|call|number|reach|contact)\b/i],
      answer: `You can reach us at:\n📞 ${SITE_CONFIG.phone}\n📧 ${SITE_CONFIG.email}\n\nOr visit our Contact page on the website to send us a message!`,
      suggestions: ["What are your hours?", "How do I schedule?"],
    },

    // --- Insurance & payment ---
    {
      patterns: [/\b(insurance|accepts?|coverage|plans?|wellmark|united|aetna|cigna|medicare|optum|midlands)\b/i],
      answer: `We accept most major insurance plans, including:\n${insuranceList}\n\nWe also accept HSA/FSA funds and CareCredit. Some integrative services may be cash-pay. Call ${SITE_CONFIG.phone} to verify your specific coverage before your visit — no surprises!`,
      suggestions: ["Self-pay options", "HSA/FSA info", "How do I become a new patient?"],
    },
    {
      patterns: [/\b(pay|cost|price|how much|afford|self.?pay|cash)\b/i],
      answer: `We believe in transparent pricing. We accept most insurance plans, HSA/FSA funds, and CareCredit. If you don't have insurance or your plan doesn't cover a specific service, we offer fair self-pay rates.\n\nSelf-pay services include:\n• New Patient Comprehensive Visit (60–90 min)\n• Follow-Up Visit (30 min)\n• Hormone Evaluation & Consultation\n• Functional Medicine Consultation\n• Nutrition Counseling Session\n• Lab Processing (in addition to lab fees)\n\nPricing varies by service — call ${SITE_CONFIG.phone} for a personalized quote before your visit!`,
      suggestions: ["What insurance do you accept?", "HSA/FSA info"],
    },
    {
      patterns: [/\b(hsa|fsa|health savings|flexible spending|pre.?tax)\b/i],
      answer: `Yes, we accept both HSA and FSA!\n\nHSA (Health Savings Account):\n• Use pre-tax dollars for eligible healthcare expenses\n• Accepted for most services at our clinic\n• Bring your HSA debit card or reimbursement form\n• Great for services with cost-sharing or deductibles\n\nFSA (Flexible Spending Account):\n• Employer-sponsored pre-tax healthcare spending account\n• Use for copays, deductibles, and eligible services\n• Check your FSA plan for covered services\n\nWe also accept CareCredit!`,
      suggestions: ["What insurance do you accept?", "Self-pay options"],
    },
    {
      patterns: [/\b(carecredit|care credit|payment plan|financing)\b/i],
      answer: `Yes, we accept CareCredit to help make healthcare more affordable! CareCredit offers flexible financing options for healthcare expenses. You can apply online or ask our team for details when you visit. We also accept HSA/FSA funds and most major insurance plans.`,
      suggestions: ["What insurance do you accept?", "How do I become a new patient?"],
    },

    // --- Providers ---
    {
      patterns: [/\baudrey\b/i],
      answer: `Audrey Gries, PA-C is a co-founder of Perspective Health with 15+ years of experience in primary care. She brings a compassionate, whole-person approach and has advanced training in functional medicine and hormone health. She partners with patients to uncover the root causes of their health challenges and build personalized, sustainable wellness plans.\n\nSpecialty: Primary Care & Hormone Health`,
      suggestions: ["Tell me about Stephanie", "Tell me about Tara", "How do I schedule?"],
    },
    {
      patterns: [/\bstephanie\b/i],
      answer: `Stephanie Erdmann, DNP is a Doctor of Nursing Practice who specializes in relationship-based care, integrative chronic disease management, and preventive wellness. She is passionate about empowering patients with the knowledge and tools to take charge of their health journey.\n\nSpecialty: Chronic Disease & Preventive Wellness`,
      suggestions: ["Tell me about Audrey", "Tell me about Tara", "How do I schedule?"],
    },
    {
      patterns: [/\btara\b/i],
      answer: `Tara Sayer, RN, BSN, MSCN, CNSC has 20+ years of healthcare experience combining intensive care nursing expertise with integrative medicine. She focuses on digestive health, metabolic wellness, and the connection between nutrition and health outcomes.\n\nSpecialty: Digestive Health & Clinical Nutrition`,
      suggestions: ["Tell me about Audrey", "Tell me about Stephanie", "How do I schedule?"],
    },
    {
      patterns: [/\b(providers?|doctors?|staff|team|who works|practitioners?|nurse|pa\b)/i],
      answer: `Our care team includes:\n${providerList}\n\nEach provider brings a unique perspective to our integrative approach. Want to learn more about a specific provider?`,
      suggestions: ["Tell me about Audrey", "Tell me about Stephanie", "Tell me about Tara"],
    },

    // --- Services ---
    {
      patterns: [/\b(services?|offers?|do you do|what do you|treat|speciali)/i],
      answer: `We offer a personalized blend of integrative care:\n${serviceList}\n\nOur focus areas include hormone balance, gut health, thyroid support, and metabolic care. Want details on a specific service?`,
      suggestions: ["Hormone Health", "Primary Care", "Digestive Health", "Functional Medicine"],
    },
    {
      patterns: [/\b(hormone|menopause|testosterone|thyroid|perimenopause|hot flash|libido|andropause|estrogen|progesterone)\b/i],
      answer: `Our Hormone Health services include thorough evaluation of your hormonal landscape — thyroid, sex hormones (estrogen, progesterone, testosterone), adrenal hormones, and metabolic markers.\n\nCommon signs of hormonal imbalance include fatigue that won't respond to rest, unexplained weight changes, mood disturbances, brain fog, sleep disruption, libido changes, irregular cycles, and hair loss.\n\nWe offer personalized treatment plans that may include bioidentical hormone therapy, targeted nutrition, and lifestyle modifications. We treat both men and women — including perimenopause, menopause, and low testosterone.\n\nLearn more: /services/hormone-health`,
      suggestions: ["Who are the providers?", "How do I schedule?", "Insurance"],
    },
    {
      patterns: [/\b(gut|digest|bloat|ibs|sibo|metaboli|weight|insulin|leaky gut|microbiome)\b/i],
      answer: `Our Digestive & Metabolic Health services address everything from IBS, SIBO, and bloating to metabolic syndrome, insulin resistance, and weight management.\n\nWe use advanced testing like microbiome analysis, SIBO breath testing, and intestinal permeability markers to find root causes. Treatment includes personalized nutrition plans, food sensitivity guidance, targeted probiotic and supplement recommendations.\n\nLearn more: /services/digestive-metabolic-health`,
      suggestions: ["What insurance do you accept?", "How do I schedule?"],
    },
    {
      patterns: [/\b(functional medicine|integrative|root cause|holistic|complementary)\b/i],
      answer: `Our Integrative and Functional Medicine approach views the body as an interconnected whole. Rather than simply managing symptoms, we ask why — exploring genetic, environmental, lifestyle, and biological factors.\n\nWe use advanced diagnostic testing (microbiome, nutrient status, inflammation markers, toxin load), detailed health timelines, and personalized treatment protocols. This includes nutrition therapy, targeted supplementation, mind-body practices, and lifestyle medicine.\n\nIntegrative medicine is not anti-science — evidence is the foundation. We integrate multiple evidence-based approaches.\n\nLearn more: /services/integrative-functional-medicine`,
      suggestions: ["What insurance do you accept?", "Tell me about your providers"],
    },
    {
      patterns: [/\b(primary care|annual|checkup|physical|preventive)\b/i],
      answer: `Our Comprehensive Primary Care goes far beyond annual checkups. We integrate conventional medicine with a root-cause, functional lens — evaluating how all aspects of your health (physical, hormonal, metabolic, and lifestyle) connect.\n\nWe provide preventive care, chronic disease management, acute illness treatment, and health optimization. Initial visits are 60–90 minutes with comprehensive lab work beyond standard panels.\n\nLearn more: /services/comprehensive-primary-care`,
      suggestions: ["What insurance do you accept?", "How do I become a new patient?"],
    },
    {
      patterns: [/\b(supplements?|iv therap|nutrition counseling|adrenal|immune)/i],
      answer: `Our Supplementary Services include personalized nutrition counseling, targeted supplement protocols, adrenal health support, and immune optimization. These complement your primary care or integrative treatment plan.\n\nServices are designed for patients looking to enhance outcomes, address nutrient deficiencies, support stress resilience, or boost immune function.\n\nLearn more: /services/supplementary-services`,
      suggestions: ["What services do you offer?", "How do I schedule?"],
    },

    // --- New patient & scheduling ---
    {
      patterns: [/\b(new patient|first visit|first time|get started|become a patient|sign up|onboard)\b/i],
      answer: `Welcome! Here's how to get started:\n\n1. Reach Out — Call ${SITE_CONFIG.phone}, email ${SITE_CONFIG.email}, or use our Contact page\n2. Complete Paperwork — We'll send intake forms to complete before your visit\n3. Your First Visit — Arrive 15 minutes early for your 60–90 minute appointment\n4. Your Care Plan — You'll receive a personalized plan with next steps and testing recommendations\n\nPlease bring: photo ID, insurance card, current medications & supplements with dosages, recent lab work/medical records, a list of symptoms and health goals, and emergency contact info.`,
      suggestions: ["What insurance do you accept?", "Do you offer telehealth?", "What to bring"],
    },
    {
      patterns: [/\b(bring|prepare|before.*visit|what.*need)\b/i],
      answer: `Here's what to bring to your appointment:\n\n• Photo ID\n• Insurance card(s)\n• Current medications with dosages\n• Current supplements\n• Recent lab work or medical records\n• List of symptoms and health concerns\n• Health goals and questions\n• Emergency contact info\n\nThe more information you can share upfront, the more productive your visit will be! Arrive 15 minutes early for your first visit.`,
      suggestions: ["How long is the first visit?", "Do you offer telehealth?"],
    },
    {
      patterns: [/\b(how long|duration|appointment length|follow.?up)\b/i],
      answer: `Initial appointments are typically 60–90 minutes — we invest this time to thoroughly review your health history, symptoms, goals, and concerns. Follow-up appointments are generally 30–45 minutes. We believe taking the time upfront leads to better outcomes!`,
      suggestions: ["How do I become a new patient?", "What should I bring?"],
    },
    {
      patterns: [/\b(telehealth|virtual|video|remote|online visit)\b/i],
      answer: `Yes! We offer telehealth appointments for established patients for appropriate visit types. Contact our office to determine if your needs can be addressed via telehealth — call ${SITE_CONFIG.phone} or use our Contact page when scheduling!`,
      suggestions: ["How do I become a new patient?", "What are your hours?"],
    },
    {
      patterns: [/\b(schedule|book|appointment|make.*visit)\b/i],
      answer: `You can schedule an appointment by:\n• Calling us at ${SITE_CONFIG.phone}\n• Emailing ${SITE_CONFIG.email}\n• Using the Contact form on our website\n\nWe'll help you find the right provider and appointment type. New patients should allow 60–90 minutes for the initial visit!`,
      suggestions: ["New patient info", "What are your hours?", "Telehealth"],
    },

    // --- Policies & logistics ---
    {
      patterns: [/\b(cancel|reschedule|no.?show|miss.*appointment)\b/i],
      answer: `We ask that you provide at least 24 hours' notice to cancel or reschedule an appointment. Late cancellations or no-shows may be subject to a fee. We understand unexpected situations arise — please contact us as soon as possible if you need to reschedule at ${SITE_CONFIG.phone}.`,
      suggestions: ["How do I schedule?", "What are your hours?"],
    },
    {
      patterns: [/\b(prescription|refill|medication|rx)\b/i],
      answer: `Prescription refill requests should be submitted through your patient portal or by calling our office during business hours at ${SITE_CONFIG.phone}. Please allow 2–3 business days for refill processing. Note that controlled substances require an in-person visit.`,
      suggestions: ["What are your hours?", "Telehealth"],
    },
    {
      patterns: [/\b(medical record|record.*request|chart|health record)\b/i],
      answer: `You can request your medical records by contacting our office at ${SITE_CONFIG.phone}. We comply with all HIPAA regulations regarding medical records requests and aim to fulfill requests within 30 business days.`,
      suggestions: ["Contact info", "What are your hours?"],
    },
    {
      patterns: [/\b(lab result|test result|blood work|lab.*back)\b/i],
      answer: `Lab results are reviewed by your provider and communicated through the patient portal or by phone, depending on the nature of the results. Routine results are typically available within 5–7 business days. Abnormal or time-sensitive results will be communicated sooner. If you're waiting on results, feel free to call ${SITE_CONFIG.phone}.`,
      suggestions: ["Contact info", "Prescription refills"],
    },
    {
      patterns: [/\b(child|kid|pediatric|son|daughter|baby|infant|minor)\b/i],
      answer: `Our current practice focuses on adult patients (18+). We'd be happy to help connect you with appropriate pediatric resources in the area — just call us at ${SITE_CONFIG.phone} and we can point you in the right direction!`,
      suggestions: ["What services do you offer?", "How do I become a new patient?"],
    },
    {
      patterns: [/\b(other doctor|existing doctor|current doctor|alongside|collaborative|coordinate|work with)\b/i],
      answer: `Absolutely — and we encourage it! We believe in collaborative care and are happy to work alongside your existing healthcare team. We can coordinate care and share records as appropriate and with your consent. Your health is a team effort!`,
      suggestions: ["What services do you offer?", "How do I become a new patient?"],
    },

    // --- Lead capture ---
    {
      patterns: [/\b(call me|call me back|callback|reach out to me|contact me|have someone call|get back to me|want a call|request.?a.?call)\b/i],
      answer: `Absolutely! I'd be happy to have our team reach out to you. Just fill out the quick form below and someone will get back to you within 1 business day!`,
      showLeadForm: true,
    },

    // --- Our approach & values ---
    {
      patterns: [/\b(approach|philosophy|different|why.*choose|what sets|values|mission|believe)\b/i],
      answer: `At Perspective Health, we believe true healthcare means seeing the whole person — not just symptoms or lab values. Our approach is built on four pillars:\n\n• Collaborative Approach — our team works across disciplines to ensure every aspect of your health is considered\n• Root-Cause Focus — we invest time understanding why, not just what\n• Personalized Care Plans — built around your unique biology, lifestyle, and goals\n• Whole-Person Wellness — addressing physical health, mental wellness, and lifestyle as deeply interconnected\n\nWe combine evidence-based conventional medicine with functional and integrative approaches.`,
      suggestions: ["Meet our providers", "Our services", "How do I get started?"],
    },

    // --- Reviews ---
    {
      patterns: [/\b(reviews?|ratings?|testimonials?|recommend|reputation|what.*people.*say)/i],
      answer: `We're proud of our 5.0-star rating on Google (${SITE_CONFIG.googleReviews.count} reviews)! Our patients appreciate the time we take to truly listen and find root causes. Here's what they're saying:\n\n"I've never felt so heard by a healthcare provider. Audrey took over an hour to go through my history and we came up with a real plan." — Jennifer M.\n\n"After years of being told my labs were 'normal' while I felt terrible, Stephanie actually dug deeper." — Robert K.\n\n"Tara completely changed how I think about nutrition and gut health." — Sarah L.\n\nYou can see all our reviews on Google!`,
      suggestions: ["Meet our providers", "How do I get started?"],
    },
  ];
}

let _faqPatterns: FaqPattern[] | null = null;

function getFaqPatterns(): FaqPattern[] {
  if (!_faqPatterns) {
    _faqPatterns = buildFaqPatterns();
  }
  return _faqPatterns;
}

export interface FaqMatch {
  answer: string;
  suggestions?: string[];
  showLeadForm?: boolean;
}

export function matchFaq(userMessage: string): FaqMatch | null {
  const patterns = getFaqPatterns();
  for (const faq of patterns) {
    if (faq.patterns.some((p) => p.test(userMessage))) {
      return {
        answer: faq.answer,
        suggestions: faq.suggestions,
        showLeadForm: faq.showLeadForm,
      };
    }
  }
  return null;
}

// --- Page-aware welcome messages ---

export function getWelcomeMessage(pathname?: string): { content: string; suggestions: string[] } {
  const defaultSuggestions = ["Our Services", "Hours & Location", "Insurance", "New Patient Info"];

  if (!pathname || pathname === "/") {
    return {
      content: "Hi! I'm the Perspective Health assistant. I can help with questions about our services, providers, hours, insurance, and scheduling. What can I help you with?",
      suggestions: defaultSuggestions,
    };
  }

  if (pathname.startsWith("/services/")) {
    const slug = pathname.replace("/services/", "");
    const service = servicesData.find((s) => s.slug === slug);
    if (service) {
      return {
        content: `Hi! I see you're looking at our ${service.name} services. I'd be happy to answer any questions about what to expect, who it's for, or how to get started!`,
        suggestions: ["Who is this for?", "How do I schedule?", "Insurance", "Other Services"],
      };
    }
  }

  if (pathname === "/services") {
    return {
      content: "Hi! You're browsing our services. I can help you find the right fit — whether it's primary care, hormone health, functional medicine, or something else. What are you looking for?",
      suggestions: ["Hormone Health", "Primary Care", "Digestive Health", "Functional Medicine"],
    };
  }

  if (pathname === "/about") {
    return {
      content: "Hi! You're checking out our team. Want to know more about one of our providers, or how our integrative approach works?",
      suggestions: ["Tell me about Audrey", "Tell me about Stephanie", "Tell me about Tara", "Your Approach"],
    };
  }

  if (pathname === "/insurance") {
    return {
      content: "Hi! I can help with insurance and payment questions. We accept most major plans, plus HSA/FSA and CareCredit. What would you like to know?",
      suggestions: ["Which plans?", "Cash-pay options", "HSA/FSA", "CareCredit"],
    };
  }

  if (pathname === "/contact") {
    return {
      content: "Hi! Looking to get in touch? I can help with scheduling info, directions, or any quick questions while you're here.",
      suggestions: ["Hours & Location", "New Patient Info", "Telehealth", "Our Services"],
    };
  }

  if (pathname === "/for-patients") {
    return {
      content: "Hi! I can help answer questions about what to expect as a patient — from your first visit to insurance and telehealth options.",
      suggestions: ["New Patient Info", "Insurance", "Telehealth", "Hours & Location"],
    };
  }

  return {
    content: "Hi! I'm the Perspective Health assistant. I can help with questions about our services, providers, hours, insurance, and scheduling. What can I help you with?",
    suggestions: defaultSuggestions,
  };
}

export function buildSystemPrompt(): string {
  const hours = Object.entries(SITE_CONFIG.hours)
    .map(([day, time]) => `  ${day.charAt(0).toUpperCase() + day.slice(1)}: ${time}`)
    .join("\n");

  const providers = PROVIDERS.map(
    (p) => `  - ${p.name}, ${p.credentials} (${p.title}) — ${p.specialty}`
  ).join("\n");

  const insuranceList = INSURANCE_PARTNERS.map((i) => i.name).join(", ");

  const servicesSummary = servicesData
    .map((s) => {
      const faqs = s.faqs
        .map((f) => `    Q: ${f.question}\n    A: ${f.answer}`)
        .join("\n");
      return `  ## ${s.name}\n  ${s.intro}\n  Who it's for: ${s.whoItsFor.join("; ")}\n  FAQs:\n${faqs}`;
    })
    .join("\n\n");

  return `You are the friendly virtual assistant for Perspective Health Iowa, an integrative medical clinic in Urbandale, Iowa. You go by "Perspective Health Assistant." Your tone is warm, welcoming, and conversational — like a knowledgeable front-desk team member who genuinely cares. Keep answers concise (2–4 sentences when possible) but always be helpful and encouraging.

## Clinic Information
- Name: ${SITE_CONFIG.name}
- Phone: ${SITE_CONFIG.phone}
- Email: ${SITE_CONFIG.email}
- Address: ${SITE_CONFIG.address.full}
- Website: ${SITE_CONFIG.url}
- Location context: We are in the Urbandale/West Des Moines area of central Iowa, conveniently located off Northpark Drive.

## Hours
${hours}
If someone asks about hours, mention that they can always call ${SITE_CONFIG.phone} to confirm, especially around holidays.

## Our Providers
${providers}

About our team:
- Audrey Gries, PA-C is a co-founder with 15+ years of experience in primary care. She brings a compassionate, whole-person approach and has advanced training in functional medicine and hormone health.
- Stephanie Erdmann, DNP specializes in relationship-based care, integrative chronic disease management, and preventive wellness. She empowers patients with knowledge and tools for their health journey.
- Tara Sayer, RN, BSN, MSCN, CNSC has 20+ years of healthcare experience combining intensive care nursing expertise with integrative medicine. She focuses on the connection between nutrition and health outcomes.

## Insurance & Payment
We accept most major insurance plans including: ${insuranceList}
- Some integrative and functional medicine services may not be covered by insurance and are available on a cash-pay basis.
- HSA (Health Savings Account): use pre-tax dollars for eligible healthcare expenses, bring your HSA debit card or reimbursement form.
- FSA (Flexible Spending Account): employer-sponsored pre-tax account for copays, deductibles, and eligible services.
- We also accept CareCredit to help make healthcare more affordable.
- Self-pay services available: New Patient Comprehensive Visit (60–90 min), Follow-Up Visit (30 min), Hormone Evaluation & Consultation, Functional Medicine Consultation, Nutrition Counseling Session, Lab Processing (in addition to lab fees).
- Pricing varies by service. Lab fees are billed separately. We provide quotes before visits.
- Always recommend patients call ${SITE_CONFIG.phone} to verify their specific coverage before their visit — no surprises.

## Services Overview
Our clinic offers a personalized blend of functional medicine, primary care, and health consulting. Key focus areas include hormone balance, gut health, thyroid support, and metabolic care.

${servicesSummary}

## New Patients — Step by Step
1. Reach Out: Call ${SITE_CONFIG.phone}, email ${SITE_CONFIG.email}, or use our Contact page. We'll answer questions and help find the right provider.
2. Complete Paperwork: We send intake forms to complete before the visit.
3. First Visit: Arrive 15 minutes early. The 60–90 minute appointment is an in-depth conversation about health history, concerns, and goals.
4. Care Plan: After the visit, patients receive a personalized care plan with next steps, testing recommendations, and a health roadmap.

What to bring: photo ID, insurance card(s), current medications with dosages, current supplements, recent lab work or medical records, list of symptoms and health concerns, health goals and questions, emergency contact info.

Follow-up appointments are generally 30–45 minutes.

## Telehealth
- We offer both in-person and virtual telehealth visits for flexible care.
- Telehealth is available for established patients for appropriate visit types.
- Patients can ask about telehealth availability when scheduling.

## Patient Policies
- Cancellation: 24 hours' notice required. Late cancellations or no-shows may be subject to a fee.
- Prescription refills: Submit through patient portal or call during business hours. Allow 2–3 business days. Controlled substances require an in-person visit.
- Medical records: Request by contacting the office. We comply with all HIPAA regulations. Fulfilled within 30 business days.
- Lab results: Reviewed by provider and communicated via patient portal or phone. Routine results 5–7 business days. Abnormal results communicated sooner.
- We treat adult patients (18+) only. We can help connect families with pediatric resources.
- Collaborative care: We encourage working alongside existing doctors and can coordinate care with consent.

## Our Mission & Values
At Perspective Health, we started with a simple belief: true healthcare means seeing and treating the whole person — not just isolated symptoms or lab values. We listen deeply, think broadly, and partner with each patient to build health from the inside out.

Our team brings together diverse healthcare backgrounds — physician assisting, advanced nursing practice, and clinical nutrition — united by a shared commitment to integrative, root-cause medicine.

Core Values:
- See the Whole Person: We evaluate physical, hormonal, metabolic, and lifestyle factors together.
- Root-Cause Focus: We invest time understanding why, treating root causes rather than managing symptoms.
- True Partnership: Your care plan is built with you, not for you. We listen, collaborate, and adjust.
- Evidence-Based: Integrative doesn't mean unscientific. We use proven diagnostics and therapies informed by the latest research.

Our Approach Pillars:
- Collaborative: Team works across disciplines — conventional medicine, nursing practice, and functional nutrition.
- Root-Cause: Comprehensive testing, detailed health histories, and deep listening to uncover underlying factors.
- Personalized Care Plans: Built around unique biology, lifestyle, preferences, and goals.
- Whole-Person Wellness: Physical health, mental wellness, stress, sleep, nutrition, movement, and social connection — all interconnected.

## Reviews
We have a ${SITE_CONFIG.googleReviews.rating}-star rating on Google with ${SITE_CONFIG.googleReviews.count} reviews. Sample testimonials:
- "I've never felt so heard by a healthcare provider. Audrey took over an hour to go through my history and we came up with a real plan. My hormones are finally balanced and I feel like myself again." — Jennifer M.
- "After years of being told my labs were 'normal' while I felt terrible, Stephanie actually dug deeper. She found the root cause of my fatigue and I have more energy than I've had in a decade." — Robert K.
- "Tara completely changed how I think about nutrition and gut health. Her knowledge and genuine care for her patients is exceptional." — Sarah L.

## YOU CAN Help With
- Clinic hours (Mon/Tue/Thu/Fri 8AM-5PM, Wed 8AM-12PM)
- Location (${SITE_CONFIG.address.full})
- Phone number (${SITE_CONFIG.phone})
- General information about services (Primary Care, Hormone Health, Functional Medicine, Digestive & Metabolic Health, Supplementary Services, HOCATT)
- Insurance questions (accepted: Wellmark BCBS, UnitedHealthcare/Optum, Midlands Choice, Medicare, Aetna, Cigna, Humana, plus CareCredit financing)
- Provider information (Audrey Gries PA-C, Stephanie Erdmann DNP, Tara Sayer RN BSN MSCN CNSC)
- Scheduling guidance (direct them to call or use the contact page)
- General information about what integrative medicine is
- New patient onboarding steps, what to bring, and appointment expectations
- Telehealth availability
- Patient policies (cancellation, prescription refills, medical records, lab results)
- Our clinic philosophy, mission, and values

## YOU MUST NEVER — HIPAA & Patient Safety Guardrails
1. NEVER provide medical advice, diagnoses, or treatment recommendations. You are not a medical provider.
2. NEVER ask for or encourage users to share symptoms, conditions, medications, or any personal health information.
3. NEVER store or reference any health information a user shares in this conversation.
4. NEVER recommend specific treatments, medications, supplements, or dosages.
5. NEVER interpret lab results, health data, or suggest what a condition might be.
6. NEVER compare our treatments to other providers or make claims about treatment outcomes.
7. NEVER discuss specific pricing — say "pricing varies by service and insurance" and recommend calling the office.
8. NEVER ask for or store personal health information, insurance IDs, Social Security numbers, or other sensitive data in this chat.

## IF a User Shares Health Concerns or Asks for Medical Advice
If a user shares symptoms, health concerns, conditions, medications, or asks for medical advice, DO NOT engage with the clinical details. Instead, respond warmly and redirect:

"Thank you for trusting us with that. To protect your privacy and give you the best care possible, I'm not able to discuss specific health concerns through this chat. Our providers would love to help you personally — you can call us at ${SITE_CONFIG.phone} or visit our Contact page to schedule a consultation. You'll be in great hands!"

You may acknowledge what service area might be relevant (e.g., "It sounds like our Hormone Health services could be a great fit") but NEVER go further than that.

## Emergency Protocol
For urgent or emergency matters, IMMEDIATELY instruct the person to call 911 or go to the nearest emergency room. Do not attempt to triage or assess urgency.

## Lead Capture
After you've answered 2–3 questions for a user in the conversation, naturally offer to have the team reach out. Use the EXACT trigger phrase "have our team reach out" in your response — this phrase activates a contact form in the chat interface.

Examples of natural lead capture:
- "I'm glad I could help with that! If you'd like, I'd be happy to have our team reach out to you directly — they can answer more specific questions and help you get scheduled."
- "Great question! I'd love to have our team reach out and walk you through the next steps."

Rules for lead capture:
- NEVER offer lead capture on the very first exchange — wait until you've been helpful first.
- Only offer ONCE per conversation. If the user declines or ignores it, do not bring it up again.
- Keep the offer brief and natural — don't make it feel salesy.
- Do NOT collect any health information through the lead form — the form only collects contact info and service interest.

## General Conversation Guidelines
1. Be warm, friendly, professional, and encouraging. Use a conversational tone — not robotic or overly clinical.
2. When greeting someone, introduce yourself briefly and ask how you can help.
3. Always end messages with an invitation to call or schedule when appropriate.
4. If you don't know the answer, be honest about it and suggest calling the office at ${SITE_CONFIG.phone} — never guess or make up information.
5. Keep responses concise (2–4 sentences when possible) but always helpful.`;
}
