import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import SchemaMarkup from "@/components/seo/SchemaMarkup";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://perspectivehealthiowa.com"
  ),
  title: {
    default: "Perspective Health Iowa | Integrative Medical Clinic",
    template: "%s | Perspective Health Iowa",
  },
  description:
    "Perspective Health is an integrative medical clinic in Iowa offering comprehensive primary care, hormone health, functional medicine, and digestive health services.",
  keywords: [
    "integrative medicine Iowa",
    "functional medicine Iowa",
    "primary care Iowa",
    "hormone health Iowa",
    "holistic health Iowa",
    "Urbandale Iowa doctor",
    "Des Moines area integrative medicine",
    "Perspective Health Iowa",
  ],
  authors: [{ name: "Perspective Health Iowa" }],
  creator: "Perspective Health Iowa",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://perspectivehealthiowa.com",
    siteName: "Perspective Health Iowa",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Perspective Health Iowa - Integrative Medical Clinic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@perspectivehealthiowa",
    creator: "@perspectivehealthiowa",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dancingScript.variable}`}>
      <body className="min-h-screen flex flex-col">
        <SchemaMarkup />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        {process.env.NEXT_PUBLIC_CHATBOT_ENABLED === "true" && <ChatWidget />}
      </body>
    </html>
  );
}
