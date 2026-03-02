import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { WelcomeSection } from "@/components/home/WelcomeSection";
import { OurApproach } from "@/components/home/OurApproach";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProvidersSection } from "@/components/home/ProvidersSection";
import { GoogleReviews } from "@/components/home/GoogleReviews";
import { InsurancePartners } from "@/components/home/InsurancePartners";
import { CTABanner } from "@/components/home/CTABanner";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";

export const metadata: Metadata = {
  title: "Integrative Medical Clinic in Iowa | Perspective Health Iowa",
  description:
    "Perspective Health is an integrative medical clinic in Iowa offering personalized primary care, hormone health, functional medicine, and digestive wellness. See healthcare from a new perspective.",
  openGraph: {
    title: "Perspective Health Iowa | Integrative Medical Clinic",
    description:
      "Integrative healthcare that sees the whole person. Primary care, hormone health, and functional medicine in Iowa.",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
      <HeroSection />
      <WelcomeSection />
      <ServicesSection />
      <OurApproach />
      <ProvidersSection />
      <GoogleReviews />
      <InsurancePartners />
      <CTABanner />
    </>
  );
}
