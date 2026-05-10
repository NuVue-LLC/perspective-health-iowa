export interface ServiceData {
  slug: string;
  name: string;
  headline: string;
  heroScript: string;
  heroSubtitle: string;
  metaDescription: string;
  heroImage: string;
  heroImageAlt: string;
  intro: string;
  whatItIs: string;
  whoItsFor: string[];
  whatToExpect: string[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
  relatedServices: string[];
  gallery?: { src: string; alt: string }[];
  accordionSections?: { title: string; items: string[] }[];
}

export const servicesData: ServiceData[] = [
  {
    slug: "comprehensive-primary-care",
    name: "Comprehensive Primary Care",
    headline: "Comprehensive Primary Care",
    heroScript: "Your Health, Our Priority",
    heroSubtitle: "Primary care that goes beyond annual checkups — we partner with you to build a proactive plan for lasting wellbeing.",
    metaDescription:
      "Whole-person primary care in Iowa at Perspective Health. We go beyond symptom management to address root causes and support your long-term health.",
    heroImage: "/images/service-primary-care.jpg",
    heroImageAlt: "Primary care provider consulting with patient in Iowa",
    intro:
      "Primary care is the foundation of your health journey. At Perspective Health, our primary care goes far beyond annual checkups and prescription refills — we partner with you to understand your full health picture and create a proactive plan for lasting wellbeing.",
    whatItIs:
      "Comprehensive primary care at Perspective Health integrates conventional medicine with an integrative, root-cause lens. We provide preventive care, chronic disease management, acute illness treatment, and health optimization. Rather than treating each symptom in isolation, we evaluate how all aspects of your health — physical, hormonal, metabolic, and lifestyle — connect and influence one another.",
    whoItsFor: [
      "Adults seeking a primary care provider who truly listens and takes time",
      "Patients managing chronic conditions like hypertension, diabetes, or thyroid disorders",
      "Individuals interested in preventive medicine and proactive health optimization",
      "Those who feel their conventional care isn't addressing the root causes of their symptoms",
      "Patients wanting an integrative approach to existing health concerns",
    ],
    whatToExpect: [
      "An extended initial visit (60–90 minutes) to review your complete health history",
      "Comprehensive lab work beyond standard panels to get a full picture",
      "A personalized care plan addressing your unique goals and health concerns",
      "Regular follow-up appointments to track your progress and adjust your plan",
      "Coordination with specialists and other providers as needed",
      "Direct communication with your provider between visits",
    ],
    benefits: [
      "May help identify and address underlying causes of recurring symptoms",
      "Often leads to improved management of chronic conditions",
      "Supports better long-term health outcomes through proactive care",
      "May reduce need for specialist referrals through comprehensive assessment",
      "Provides a consistent, trusted healthcare relationship over time",
    ],
    faqs: [
      {
        question: "Can I use Perspective Health as my primary care provider?",
        answer:
          "Yes! We welcome new patients seeking primary care. Our providers offer comprehensive primary care services for adults, combining conventional medicine with an integrative approach.",
      },
      {
        question: "Do you accept insurance for primary care visits?",
        answer:
          "We accept most major insurance plans including Wellmark BlueCross BlueShield, Optum/UnitedHealthcare, MidlandsChoice, and Medicare. Please contact our office to verify your specific coverage.",
      },
      {
        question: "How long does an initial primary care appointment take?",
        answer:
          "Initial appointments are typically 60–90 minutes. We invest this time upfront to thoroughly understand your health history, concerns, and goals so we can create the most effective care plan possible.",
      },
      {
        question:
          "What makes your primary care different from a conventional practice?",
        answer:
          "We combine standard primary care with an integrative, functional medicine perspective. This means we look beyond symptoms to understand root causes, use comprehensive testing, and incorporate lifestyle, nutrition, and targeted supplementation alongside conventional treatments.",
      },
    ],
    relatedServices: [
      "hormone-health",
      "integrative-functional-medicine",
      "digestive-metabolic-health",
    ],
    accordionSections: [
      {
        title: "Wellness Care",
        items: [
          "Annual wellness exams and preventive screenings",
          "Personalized health optimization plans",
          "Immunizations and routine health maintenance",
          "Lifestyle counseling for nutrition, exercise, and stress management",
          "Age-appropriate cancer and disease screenings",
        ],
      },
      {
        title: "Chronic Care",
        items: [
          "Hypertension and cardiovascular risk management",
          "Type 2 diabetes and prediabetes management",
          "Thyroid disorders and autoimmune conditions",
          "Asthma, COPD, and respiratory conditions",
          "Ongoing monitoring, medication management, and care plan adjustments",
        ],
      },
      {
        title: "Acute Care",
        items: [
          "Same-day or next-day sick visits when available",
          "Upper respiratory infections, sinus infections, and flu",
          "Urinary tract infections and minor skin conditions",
          "Minor injuries, sprains, and strains",
          "Referrals and coordination for urgent or emergency needs",
        ],
      },
      {
        title: "Functional \"Root Cause\" Lab Testing",
        items: [
          "Comprehensive metabolic and inflammatory marker panels",
          "Advanced thyroid testing (Free T3, Free T4, Reverse T3, antibodies)",
          "Hormone panels including sex hormones, adrenal markers, and insulin",
          "Micronutrient and vitamin deficiency assessments",
          "Gut health and food sensitivity testing",
        ],
      },
      {
        title: "Medication and Supplement Consultation",
        items: [
          "Comprehensive medication review and optimization",
          "Evidence-based supplement recommendations tailored to your labs",
          "Drug-supplement interaction screening",
          "Deprescribing strategies to reduce unnecessary medications",
          "Personalized protocols integrating conventional and natural approaches",
        ],
      },
    ],
  },
  {
    slug: "hormone-health",
    name: "Hormone Health",
    headline: "Hormone Health",
    heroScript: "Find Your Balance",
    heroSubtitle: "Comprehensive hormone evaluation and personalized treatment to help you feel like yourself again.",
    metaDescription:
      "Personalized hormone evaluation and balancing in Iowa at Perspective Health. We help men and women experiencing hormonal imbalances reclaim their energy, mood, and vitality.",
    heroImage: "/images/service-hormone-health.jpg",
    heroImageAlt: "Woman embracing balanced hormone health at Perspective Health Iowa",
    intro:
      "Hormones are the body's chemical messengers — when they're out of balance, virtually every system in your body can feel the impact. At Perspective Health, we take a comprehensive, personalized approach to hormone evaluation and optimization, helping you reclaim your energy, mood, libido, and overall vitality.",
    whatItIs:
      "Our hormone health services encompass thorough evaluation of your hormonal landscape, including thyroid function, sex hormones (estrogen, progesterone, testosterone), adrenal hormones (cortisol, DHEA), and metabolic markers. We use advanced testing to identify imbalances that standard testing often misses, and create individualized treatment plans that may include bioidentical hormone therapy, targeted nutrition, lifestyle modifications, and evidence-based supplementation.",
    whoItsFor: [
      "Women experiencing perimenopause or menopause symptoms (hot flashes, night sweats, mood changes, weight gain)",
      "Men with low testosterone symptoms (fatigue, decreased libido, muscle loss, brain fog)",
      "Adults with thyroid symptoms including fatigue, weight changes, hair loss, or temperature sensitivity",
      "Patients with irregular cycles, PMS, or PCOS",
      "Anyone experiencing unexplained fatigue, mood changes, or difficulty maintaining a healthy weight",
      "Those who have been told their labs are 'normal' but still feel off",
    ],
    whatToExpect: [
      "Comprehensive intake of symptoms, history, and previous lab work",
      "Advanced hormone panel including sex hormones, thyroid, adrenal, and metabolic markers",
      "In-depth results review explaining what each value means for your health",
      "A personalized treatment plan tailored to your symptoms and goals",
      "Options including lifestyle changes, targeted supplements, and/or bioidentical hormone therapy as appropriate",
      "Regular monitoring to optimize your hormone levels and treatment outcomes",
    ],
    benefits: [
      "Often helps improve energy, mental clarity, and mood",
      "May support healthy weight management when hormonal factors are involved",
      "Can help reduce symptoms of perimenopause and menopause",
      "May improve libido, sexual function, and relationship satisfaction",
      "Often associated with better sleep quality and recovery",
      "May support bone density, cardiovascular health, and long-term vitality",
    ],
    faqs: [
      {
        question: "How do I know if my hormones are out of balance?",
        answer:
          "Common signs of hormonal imbalance include unexplained fatigue, brain fog, weight changes despite a healthy diet, mood swings, irregular periods, low libido, poor sleep, hair loss, and hot flashes or night sweats. However, these symptoms overlap with many conditions — a comprehensive evaluation is the best way to identify what's driving your symptoms.",
      },
      {
        question: "What is bioidentical hormone therapy?",
        answer:
          "Bioidentical hormones are chemically identical to the hormones your body naturally produces. They are often used to restore hormonal balance during perimenopause, menopause, or when other hormonal deficiencies are present. Whether bioidentical hormone therapy is appropriate for you depends on a thorough evaluation of your symptoms, labs, and health history.",
      },
      {
        question:
          "My previous doctor said my thyroid levels are normal. Why am I still having symptoms?",
        answer:
          "Standard thyroid panels often test only TSH, which can miss the full picture. We run a comprehensive thyroid panel including Free T3, Free T4, Reverse T3, and thyroid antibodies to get a complete view of thyroid function. Many patients with symptoms have values that fall in the 'normal' range but aren't optimal for how they feel.",
      },
      {
        question: "Do you treat men's hormone health?",
        answer:
          "Absolutely. We evaluate and treat male hormonal imbalances including low testosterone, adrenal dysfunction, and thyroid disorders. Men often experience declining testosterone starting in their 30s–40s, which can significantly impact energy, body composition, mood, and sexual health.",
      },
    ],
    relatedServices: [
      "integrative-functional-medicine",
      "comprehensive-primary-care",
      "digestive-metabolic-health",
    ],
  },
  {
    slug: "integrative-functional-medicine",
    name: "Integrative and Functional Medicine",
    headline: "Integrative & Functional Medicine",
    heroScript: "Deeper Answers",
    heroSubtitle: "Root-cause medicine that looks at the whole picture — not just symptoms — to restore your health from the inside out.",
    metaDescription:
      "Evidence-based integrative and functional medicine in Iowa at Perspective Health. We identify root causes of chronic illness using advanced testing and personalized treatment plans.",
    heroImage: "/images/service-integrative-medicine.jpg",
    heroImageAlt: "Family supported through whole-person integrative care at Perspective Health Iowa",
    intro:
      "Integrative and functional medicine represents a paradigm shift in how we think about health and disease. Rather than simply treating symptoms, we ask why — exploring the complex web of genetic, environmental, lifestyle, and biological factors that influence your health and using that understanding to create lasting, meaningful change.",
    whatItIs:
      "Functional medicine is a systems-based approach that views the body as an interconnected whole. We use advanced diagnostic testing, detailed health timelines, and personalized treatment protocols to address the underlying causes of chronic illness. Integrative medicine combines this with evidence-based conventional care and proven complementary approaches including nutrition therapy, targeted supplementation, mind-body practices, and lifestyle medicine.",
    whoItsFor: [
      "Patients with chronic, complex conditions that haven't responded to conventional treatment",
      "Those dealing with fatigue, brain fog, digestive issues, or chronic pain",
      "Individuals with autoimmune conditions seeking a root-cause approach",
      "Anyone interested in understanding the 'why' behind their health challenges",
      "Patients who want to use food, lifestyle, and targeted strategies as medicine",
    ],
    whatToExpect: [
      "A comprehensive 90-minute initial consultation exploring your full health timeline",
      "Advanced functional lab testing (gut microbiome, nutrient status, inflammation markers, toxin load, and more)",
      "A personalized, prioritized treatment roadmap",
      "Integration of dietary therapy, targeted supplementation, and lifestyle medicine",
      "Ongoing support and regular reassessment to track your progress",
      "Collaboration with your existing healthcare team as needed",
    ],
    benefits: [
      "May help identify root causes of chronic symptoms and conditions",
      "Often supports improved energy, focus, and cognitive function",
      "Can be helpful for managing autoimmune and inflammatory conditions",
      "May support gut health restoration and digestive wellness",
      "Addresses the whole person, not just isolated symptoms",
    ],
    faqs: [
      {
        question:
          "What is the difference between integrative medicine and conventional medicine?",
        answer:
          "Conventional medicine excels at treating acute illness and disease management. Integrative and functional medicine focuses on understanding why disease develops and addressing those root causes. At Perspective Health, we use both — bringing together the best of each approach.",
      },
      {
        question: "How long does it take to see results with functional medicine?",
        answer:
          "This varies significantly based on the complexity of your health history and the conditions being addressed. Some patients notice improvements in weeks; chronic, complex conditions may take months of consistent work. We set realistic expectations and celebrate incremental progress throughout your journey.",
      },
      {
        question:
          "Is functional medicine covered by insurance?",
        answer:
          "Many of our conventional services are covered by insurance. Some functional testing and extended consultations may be billed as out-of-pocket or through HSA/FSA. We're transparent about costs upfront and work to maximize your insurance benefits where possible.",
      },
    ],
    relatedServices: [
      "comprehensive-primary-care",
      "hormone-health",
      "digestive-metabolic-health",
    ],
    accordionSections: [
      {
        title: "Functional Medicine",
        items: [
          "Finding and addressing the root cause(s) of a patient's health problems",
          "Advanced diagnostic testing to uncover hidden imbalances",
          "Personalized treatment protocols based on your unique biology",
          "Focus on addressing triggers and promoting health rather than treating symptoms alone",
          "Tools that are safe with minimum side effects",
        ],
      },
      {
        title: "Integrative Medicine",
        items: [
          "Collaborative practice combining traditional and complementary therapies",
          "Treating and healing the whole person — body, mind, and lifestyle",
          "Evidence-based conventional care paired with proven natural approaches",
          "Nutrition therapy, targeted supplementation, and mind-body practices",
          "Making each person's care collaborative and comprehensive",
        ],
      },
      {
        title: "Advanced Lab Testing",
        items: [
          "Comprehensive metabolic and inflammatory marker panels",
          "Gut microbiome analysis and intestinal permeability testing",
          "Nutrient status and vitamin deficiency assessments",
          "Hormone and adrenal function testing",
          "Toxin load and environmental exposure screening",
        ],
      },
      {
        title: "Lifestyle Medicine",
        items: [
          "Personalized nutrition plans and dietary therapy",
          "Stress management and adrenal support strategies",
          "Sleep optimization protocols",
          "Movement and exercise guidance tailored to your condition",
          "Mind-body techniques for whole-person healing",
        ],
      },
      {
        title: "Supplement and Nutrition Protocols",
        items: [
          "Evidence-based supplement recommendations tailored to your labs",
          "Targeted protocols for specific conditions and deficiencies",
          "Drug-supplement interaction screening",
          "Elimination diet guidance and food sensitivity support",
          "Ongoing adjustments based on progress and retesting",
        ],
      },
    ],
  },
  {
    slug: "digestive-metabolic-health",
    name: "Digestive & Metabolic Health",
    headline: "Digestive & Metabolic Health",
    heroScript: "Heal from Within",
    heroSubtitle: "Targeted evaluation and treatment for gut health, metabolic imbalances, and the conditions they drive.",
    metaDescription:
      "Expert digestive and metabolic health care in Iowa at Perspective Health. We address IBS, SIBO, gut dysbiosis, metabolic syndrome, insulin resistance, and weight management.",
    heroImage: "/images/service-digestive-metabolic.jpg",
    heroImageAlt: "Digestive health consultation at Perspective Health Iowa",
    intro:
      "Your gut is often called the 'second brain' — and for good reason. Digestive health is foundational to everything from immune function and mental wellness to hormonal balance and metabolic health. At Perspective Health, we take a comprehensive, root-cause approach to digestive and metabolic conditions.",
    whatItIs:
      "Our digestive and metabolic health services address the full spectrum of gut health concerns — from common conditions like IBS, bloating, and acid reflux to complex issues like SIBO, intestinal permeability ('leaky gut'), and gut microbiome imbalances. We also specialize in metabolic health, addressing insulin resistance, prediabetes, metabolic syndrome, weight management challenges, and the complex relationship between gut health and metabolism.",
    whoItsFor: [
      "Individuals with chronic digestive symptoms (bloating, constipation, diarrhea, abdominal pain)",
      "Those diagnosed with or suspected of having IBS, IBD, SIBO, or GERD",
      "Patients managing type 2 diabetes, prediabetes, or metabolic syndrome",
      "Anyone struggling with unexplained weight changes or difficulty losing weight",
      "Patients with food sensitivities, intolerances, or suspected leaky gut",
      "Those interested in optimizing gut microbiome health",
    ],
    whatToExpect: [
      "A thorough dietary, symptom, and health history review",
      "Advanced gut testing including microbiome analysis, SIBO breath testing, and intestinal permeability markers",
      "Metabolic evaluation including comprehensive blood sugar testing, insulin markers, and lipid panels",
      "A personalized nutrition and treatment plan",
      "Food sensitivity and elimination diet guidance",
      "Targeted probiotic, prebiotic, and supplement recommendations",
    ],
    benefits: [
      "May help reduce chronic digestive symptoms like bloating, gas, and abdominal discomfort",
      "Often used to support gut microbiome diversity and balance",
      "Can be effective in managing blood sugar and improving insulin sensitivity",
      "May support healthy weight management through metabolic optimization",
      "Often associated with improvements in energy, mood, and cognitive function tied to gut health",
    ],
    faqs: [
      {
        question: "What is SIBO and how do you test for it?",
        answer:
          "Small Intestinal Bacterial Overgrowth (SIBO) occurs when bacteria that normally live in the large intestine migrate and overgrow in the small intestine. We use a non-invasive lactulose or glucose breath test to identify SIBO, measuring hydrogen and methane gas levels produced by excess bacteria.",
      },
      {
        question: "How is metabolic syndrome treated?",
        answer:
          "Metabolic syndrome is a cluster of conditions — elevated blood sugar, blood pressure, cholesterol, and waist circumference — that increase the risk of heart disease and diabetes. Our approach combines targeted nutrition therapy, lifestyle medicine, stress management, and when appropriate, conventional medications to address each component of metabolic syndrome.",
      },
    ],
    relatedServices: [
      "integrative-functional-medicine",
      "hormone-health",
      "supplementary-services",
    ],
  },
  {
    slug: "supplementary-services",
    name: "Supplementary Services",
    headline: "Supplementary Services",
    heroScript: "Beyond the Basics",
    heroSubtitle: "Additional therapies and tools to complement your care plan and support your wellness journey.",
    metaDescription:
      "Targeted supplementary health services in Iowa at Perspective Health including IV nutrient therapy, nutrition counseling, and wellness support to complement your care plan.",
    heroImage: "/images/service-supplementary.jpg",
    heroImageAlt: "Supplementary health services at Perspective Health Iowa",
    intro:
      "Our supplementary services provide targeted therapeutic support to complement and enhance your primary care and integrative treatment plans. These evidence-informed services address specific health needs and help optimize your body's innate healing capacity.",
    whatItIs:
      "Our supplementary service offerings are designed to fill the gaps that conventional medicine often leaves. Whether you need nutritional repletion through IV therapy, personalized nutrition coaching, stress and adrenal support, or other targeted wellness interventions, our team develops a supplementary plan that integrates seamlessly with your overall care.",
    whoItsFor: [
      "Patients looking to enhance the outcomes of their primary or functional medicine care",
      "Individuals with nutrient deficiencies or malabsorption issues",
      "Those experiencing adrenal fatigue or high-stress symptoms",
      "Patients seeking immune support or enhanced recovery",
      "Anyone interested in evidence-informed wellness optimization",
    ],
    whatToExpect: [
      "Evaluation of your current health status and existing care plan",
      "Targeted testing to identify specific deficiencies or areas for support",
      "A tailored supplementary service recommendation",
      "Integration with your existing treatment plan",
      "Regular reassessment to ensure efficacy and adjust as needed",
    ],
    benefits: [
      "IV nutrient therapy may help rapidly address nutrient deficiencies and support energy",
      "Nutrition counseling often leads to improved dietary patterns and metabolic health",
      "Adrenal support strategies may help improve stress resilience and energy levels",
      "Immune-focused protocols may support your body's natural defenses",
      "Comprehensive supplement guidance helps avoid ineffective or redundant products",
    ],
    faqs: [
      {
        question: "What supplementary services do you offer?",
        answer:
          "Our supplementary offerings include personalized nutrition counseling, targeted supplement protocols, adrenal health support, immune optimization, and wellness consultations. Please contact our office for the most current list of available services.",
      },
      {
        question: "Do I need a primary care relationship with Perspective Health to access supplementary services?",
        answer:
          "While most of our supplementary services are designed to complement an established care relationship with our clinic, we welcome inquiries. Please reach out and we'll help determine the best path forward for your needs.",
      },
    ],
    relatedServices: [
      "integrative-functional-medicine",
      "digestive-metabolic-health",
      "comprehensive-primary-care",
    ],
  },
  {
    slug: "hocatt",
    name: "HOCATT Ozone Sauna",
    headline: "HOCATT Ozone Sauna",
    heroScript: "Restore & Rejuvenate",
    heroSubtitle: "Advanced ozone sauna therapy that combines ten modalities in a single session to detoxify, energize, and heal.",
    metaDescription:
      "Experience HOCATT ozone sauna therapy in Iowa at Perspective Health. A single one-hour session delivers up to 10 therapeutic modalities to support detox, immunity, pain relief, and recovery.",
    heroImage: "/images/service-hocatt.jpg",
    heroImageAlt: "HOCATT ozone sauna therapy session at Perspective Health Iowa",
    intro:
      "The HOCATT (Hyperthermic Ozone and Carbonic Acid Transdermal Technology) is the only device in the world that simultaneously delivers up to 10 evidence-informed therapeutic modalities in a single session. At Perspective Health, we use the HOCATT as a powerful tool to support detoxification, immune function, circulation, and whole-body wellness.",
    whatItIs:
      "The HOCATT is a personal steam sauna capsule that combines transdermal ozone therapy, carbonic acid therapy, whole-body hyperthermia, far infrared energy, electrotherapy (TENS), aromatherapy, photon light therapy, ultraviolet irradiation, and pure humidified oxygen breathing into a single one-hour session. You sit comfortably inside the capsule with your head outside, breathing pure oxygen while the combination of steam, ozone, and other modalities work synergistically to promote circulation, stimulate the immune system, support the body's natural detoxification pathways, and aid recovery.",
    whoItsFor: [
      "Individuals seeking whole-body detoxification and immune support",
      "Those managing chronic fatigue, low energy, or brain fog",
      "Patients dealing with chronic pain, inflammation, or joint stiffness",
      "Athletes or active individuals looking to speed recovery and improve performance",
      "People with skin conditions who may benefit from ozone and steam therapy",
      "Anyone looking to complement their integrative or functional medicine care plan",
    ],
    whatToExpect: [
      "A brief health screening and intake to ensure the HOCATT is appropriate for you",
      "You'll sit comfortably inside the capsule with your head and neck outside at all times",
      "A one-hour session as the HOCATT cycles through its therapeutic modalities automatically",
      "You'll breathe pure humidified oxygen through a nasal cannula during the session",
      "Mild sweating and warmth — most patients find the experience deeply relaxing",
      "A cool-down period with hydration after your session before heading home",
    ],
    benefits: [
      "Supports the body's natural detoxification and elimination pathways",
      "May help improve circulation, oxygen delivery, and cellular energy production",
      "Often associated with reduced inflammation and relief from chronic pain",
      "Can support immune system function and resilience",
      "Promotes relaxation, stress relief, and improved sleep quality",
      "May enhance skin health and appearance through ozone and steam exposure",
    ],
    faqs: [
      {
        question: "Is the HOCATT safe?",
        answer:
          "The HOCATT has been used safely in clinics worldwide. Your head remains outside the capsule at all times, and you breathe pure oxygen throughout the session. Our team monitors each session and tailors settings to your comfort level. However, the HOCATT is not appropriate for everyone — we complete a health screening before your first session to ensure it is safe for you.",
      },
      {
        question: "How long is a HOCATT session and how often should I come?",
        answer:
          "Each session lasts approximately one hour. For general wellness, many patients start with 2–3 sessions per week for the first few weeks, then transition to weekly or biweekly maintenance. Your provider will recommend a frequency based on your individual health goals.",
      },
      {
        question: "Who should not use the HOCATT?",
        answer:
          "The HOCATT may not be appropriate for individuals who are pregnant, have uncontrolled high blood pressure, active bleeding disorders, organ transplant recipients on immunosuppressants, or those with certain cardiac conditions. We screen every patient before their first session to ensure safety.",
      },
      {
        question: "Does insurance cover HOCATT therapy?",
        answer:
          "HOCATT therapy is generally not covered by insurance as it is considered a wellness and complementary therapy. We offer competitive self-pay pricing and package options. HSA and FSA funds may be eligible — check with your plan administrator.",
      },
    ],
    relatedServices: [
      "integrative-functional-medicine",
      "supplementary-services",
      "digestive-metabolic-health",
    ],
    gallery: [
      {
        src: "/images/hocatt-open.jpg",
        alt: "Patient sitting comfortably inside the HOCATT ozone sauna with the capsule open",
      },
      {
        src: "/images/hocatt-closed.jpg",
        alt: "HOCATT ozone sauna capsule during a therapy session",
      },
      {
        src: "/images/hocatt-experience-poster.jpg",
        alt: "The HOCATT Experience — phases of a session: Heat & Infrared, Carbonic Acid, and Ozone",
      },
    ],
  },
  {
    slug: "thinnr",
    name: "THINNR Weight Loss Program",
    headline: "THINNR Weight Loss Program",
    heroScript: "A Healthier You",
    heroSubtitle:
      "A medically-supervised, all-natural weight loss program — a thoughtful alternative to GLP-1 medications, supported by your Perspective Health team.",
    metaDescription:
      "THINNR weight loss program at Perspective Health Iowa — a provider-supervised, all-natural alternative to GLP-1 medications combining a homeopathic protocol with a personalized nutrition strategy.",
    heroImage: "/images/service-thinnr.jpg",
    heroImageAlt: "THINNR medically-supervised weight loss program at Perspective Health Iowa",
    intro:
      "Lasting weight change rarely comes from a single intervention. THINNR is a structured, provider-supervised program that pairs an all-natural homeopathic protocol with a personalized nutrition strategy — designed to support sustainable results while your Perspective Health team monitors your progress, lab work, and overall wellbeing.",
    whatItIs:
      "THINNR is a 42-day, provider-supervised weight loss program built around a two-pillar approach: an all-natural, FDA-registered homeopathic OTC medication and the THINNR Weight Loss & Maintenance Nutrition Strategy, which emphasizes low-glycemic, anti-inflammatory foods in balanced portions. After the initial protocol, patients transition into a Metabolic Normalization phase to lock in results. THINNR is positioned as a faster, lower-cost alternative to GLP-1 medications like semaglutide — and at Perspective Health, it's integrated into the broader, root-cause approach we already take with our patients, so your weight loss plan is informed by your full health picture, not treated in isolation.",
    whoItsFor: [
      "Adults who want a structured, provider-supervised approach to weight loss",
      "Patients exploring alternatives to GLP-1 medications like semaglutide or tirzepatide",
      "Individuals who have struggled to lose weight with diet and exercise changes alone",
      "Those whose weight is contributing to hormonal, metabolic, or inflammatory concerns",
      "Patients who prefer an all-natural, non-injectable, non-prescription option",
      "People who want their weight loss plan integrated with their primary or functional medicine care",
    ],
    whatToExpect: [
      "An initial consultation to review your health history, goals, and whether THINNR is a good fit",
      "Baseline lab work and vitals to make sure the program is appropriate and safe for you",
      "A personalized nutrition plan and clear, day-by-day program guidance",
      "Regular check-ins with your provider to track progress and address questions",
      "A maintenance and metabolic-normalization phase after the initial protocol",
      "Coordination with your other care at Perspective Health — primary care, hormone health, or functional medicine — as needed",
    ],
    benefits: [
      "Provider-supervised throughout, with check-ins and guidance built into the program",
      "All-natural, non-injectable, and does not require a prescription",
      "Pairs nutrition strategy with a homeopathic protocol rather than relying on a single mechanism",
      "May support better blood sugar stability and reduced inflammation through the nutrition plan",
      "Often easier to sustain than restrictive diets because of the structured framework",
      "Integrates seamlessly with the broader integrative care we offer",
    ],
    faqs: [
      {
        question: "What is THINNR, and how does it work?",
        answer:
          "THINNR uses a two-pillar approach to weight loss while supporting the four accepted keys to long-term maintenance. The first pillar is the THINNR homeopathic OTC medication — an all-natural, FDA-registered formula intended to support healthy weight loss, balanced metabolism, lower stress, reduced hunger and cravings, detoxification, and improved elimination. The second pillar is the THINNR Weight Loss & Maintenance Nutrition Strategy, which emphasizes low-glycemic and anti-inflammatory foods. Together, they're designed to support sustainable weight loss faster and at a lower cost than GLP-1s and semaglutide.",
      },
      {
        question: "How is THINNR different from GLP-1 medications like semaglutide?",
        answer:
          "GLP-1 medications work by mimicking a hormone that regulates appetite and blood sugar, and they require ongoing prescription injections. THINNR is an all-natural, 42-day program that combines a homeopathic OTC protocol with a structured nutrition plan — no injections and no prescription. Whether THINNR or a GLP-1 medication is the better fit depends on your health history and goals, which we'll discuss during your consultation.",
      },
      {
        question: "How much weight can I expect to lose?",
        answer:
          "Results vary by person. Many people have lost 20–35 pounds during the 42-day THINNR protocol. Outcomes depend on the amount of excess weight, genetics, and how closely the protocol is followed.",
      },
      {
        question: "How long does the program last?",
        answer:
          "The initial THINNR protocol runs for 42 days. After that, you transition into a Metabolic Normalization phase for at least 3 weeks before considering another round. Your provider will walk you through the full timeline and help you plan how to maintain results long term.",
      },
      {
        question: "Where are THINNR products made and how is quality controlled?",
        answer:
          "All THINNR products are manufactured in US-based, FDA-registered, cGMP-certified, state-licensed facilities. They undergo post-production quantitative testing for product specification, potency, and safety, and manufacturing follows Good Manufacturing Practices and the Code of Federal Regulations.",
      },
      {
        question: "Is THINNR safe with my current medications, or during pregnancy?",
        answer:
          "Because THINNR is homeopathic, significant interactions with conventional medications — including birth control pills and Depo-Provera — are not highly likely, but you should always review your specific medications with your provider before starting. THINNR should not be used during pregnancy. If you become pregnant during the protocol, stop immediately and contact your provider.",
      },
      {
        question: "Will I get hungry, and do I need to exercise?",
        answer:
          "Mild psychological hunger in the first few days is normal and typically subsides after 4–6 days. Daily exercise is not required for success on the protocol — your provider will share more detailed guidance in the program guide.",
      },
      {
        question: "Is THINNR covered by insurance?",
        answer:
          "Weight loss programs like THINNR are typically not covered by insurance. We are transparent about pricing during your consultation, and HSA or FSA funds may be eligible — please check with your plan administrator.",
      },
    ],
    relatedServices: [
      "digestive-metabolic-health",
      "hormone-health",
      "comprehensive-primary-care",
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return servicesData.map((s) => s.slug);
}
