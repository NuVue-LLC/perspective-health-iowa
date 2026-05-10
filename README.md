# Perspective Health Iowa - Production Website

A complete, production-ready Next.js 14 website for Perspective Health, an integrative medical clinic in Iowa.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **Blog**: MDX via `next-mdx-remote`
- **Images**: `next/image` with lazy loading
- **SEO**: Built-in Next.js Metadata API + JSON-LD schemas
- **Deployment**: Vercel (recommended)

---

## Quick Start

### Prerequisites

- Node.js 18.17+ ([download](https://nodejs.org))
- npm 9+ or yarn

### 1. Install dependencies

```bash
cd perspective-health-iowa
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in:
- `NEXT_PUBLIC_SITE_URL` - your production domain
- `RESEND_API_KEY` - for contact form emails (see below)
- `CONTACT_EMAIL` - where form submissions are sent

### 3. Generate placeholder images (development only)

```bash
node scripts/generate-placeholders.js
```

This downloads placeholder images from placehold.co. **Replace all placeholders with real photography before launch.**

### 4. Start development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (header, footer, fonts)
│   ├── page.tsx                # Homepage
│   ├── about/page.tsx          # About & providers
│   ├── services/
│   │   ├── page.tsx            # Services overview
│   │   └── [slug]/page.tsx     # Individual service pages
│   ├── insurance/page.tsx      # Insurance & pricing
│   ├── for-patients/page.tsx   # Patient resources + FAQ
│   ├── contact/page.tsx        # Contact page
│   ├── blog/
│   │   ├── page.tsx            # Blog index
│   │   └── [slug]/page.tsx     # Individual blog posts
│   ├── api/contact/route.ts    # Contact form API endpoint
│   ├── sitemap.ts              # Auto-generated sitemap
│   └── robots.ts               # robots.txt generation
├── components/
│   ├── layout/                 # Header, Footer
│   ├── home/                   # Homepage sections
│   ├── contact/                # Contact form
│   ├── seo/                    # JSON-LD schema components
│   └── ui/                     # PinwheelLogo, shared UI
├── content/
│   └── blog/                   # MDX blog posts
│       ├── what-is-integrative-medicine.mdx
│       └── understanding-hormone-health.mdx
└── lib/
    ├── constants.ts            # Site config, providers, services, nav
    ├── services-data.ts        # Full service page content
    ├── blog.ts                 # MDX blog utilities
    └── utils.ts                # cn(), formatDate(), etc.
```

---

## Content Management

### Before Launch - Replace These Placeholders

In `src/lib/constants.ts`, update:
- `phone` and `phoneRaw`
- `address.street`, `address.city`, `address.zip`
- `hours` (all days)
- `social.facebook` and `social.instagram`

In `src/app/layout.tsx`:
- Replace `"your-google-verification-code"` with your actual Google Search Console verification token.

### Adding Blog Posts

Create a new `.mdx` file in `src/content/blog/`:

```mdx
---
title: "Your Post Title"
description: "Meta description for SEO"
date: "2025-01-15"
category: "Category Name"
tags: ["tag1", "tag2"]
author: "Perspective Health Team"
ogImage: "/images/blog/your-post-image.jpg"
published: true
---

Your post content here...
```

### Adding/Editing Services

Edit `src/lib/services-data.ts`. Each service has:
- `slug`, `name`, `headline`, `metaDescription`
- `heroImage`, `heroImageAlt`
- `intro`, `whatItIs`, `whoItsFor[]`, `whatToExpect[]`, `benefits[]`
- `faqs[]` (question/answer)
- `relatedServices[]` (array of slugs)

---

## Setting Up the Contact Form

The contact form API is at `src/app/api/contact/route.ts`. Configure your email provider:

### Option A: Resend (recommended)

1. Sign up at [resend.com](https://resend.com)
2. Add your API key to `.env.local`: `RESEND_API_KEY=re_xxxxx`
3. Uncomment the Resend code block in `api/contact/route.ts`
4. Install: `npm install resend`

### Option B: SendGrid

1. Add `SENDGRID_API_KEY` to `.env.local`
2. Install: `npm install @sendgrid/mail`
3. Implement in `api/contact/route.ts`

---

## Images

**All images must be replaced before production launch.**

### Required Images

| Path | Dimensions | Subject |
|------|-----------|---------|
| `/public/images/hero-bg.jpg` | 1920×1080 | Hero background photo |
| `/public/images/welcome-1.jpg` | 800×600 | Patient consultation |
| `/public/images/welcome-2.jpg` | 600×400 | Care team photo |
| `/public/images/approach-1.jpg` | 600×800 (portrait) | Provider consulting |
| `/public/images/approach-2.jpg` | 600×800 (portrait) | Clinic interior |
| `/public/images/audrey-gries.jpg` | 600×450 | Provider headshot |
| `/public/images/stephanie-erdmann.jpg` | 600×450 | Provider headshot |
| `/public/images/tara-sayer.jpg` | 600×450 | Provider headshot |
| `/public/images/service-*.jpg` | 600×400 | Service imagery (5 files) |
| `/public/images/insurance-*.png` | 300×100 | Insurance logos (6 files) |
| `/public/images/blog/*.jpg` | 1200×630 | Blog post OG images |
| `/public/images/og-default.jpg` | 1200×630 | Default OG image |

---

## SEO Implementation

Every page includes:
- Dynamic `<title>` and `<meta description>`
- OpenGraph and Twitter card tags
- Canonical URLs (automatic via Next.js)

Structured data (JSON-LD):
- **Homepage**: `LocalBusiness` + `MedicalBusiness` schema
- **Service pages**: `MedicalProcedure` + `FAQPage` schema
- **For Patients**: `FAQPage` schema
- **Blog posts**: `Article` schema

To verify schemas: [Google Rich Results Test](https://search.google.com/test/rich-results)

---

## Deployment (Vercel - Recommended)

### First deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment variables on Vercel

1. Go to your project in the [Vercel Dashboard](https://vercel.com)
2. Settings → Environment Variables
3. Add all variables from `.env.example`

### Custom domain

1. Vercel Dashboard → Settings → Domains
2. Add `perspectivehealthiowa.com` and `www.perspectivehealthiowa.com`
3. Configure DNS at your registrar

### After deployment

1. Submit sitemap to Google Search Console: `https://perspectivehealthiowa.com/sitemap.xml`
2. Set up Google Analytics (add `NEXT_PUBLIC_GA_ID` to env)
3. Verify site in Google Search Console
4. Test contact form end-to-end
5. Run Lighthouse audit (target 90+ on all metrics)

---

## Performance Notes

- Server Components by default (client components only for interactive UI)
- `next/image` with lazy loading for all images
- Google Fonts with `display: swap` and preloading
- Static generation for all pages at build time (`generateStaticParams`)
- Tailwind CSS purged in production (CSS bundle < 20KB)

---

## Local SEO Checklist

Before launch, complete these items:

- [ ] Replace all `[PLACEHOLDER]` content in `constants.ts`
- [ ] Add exact GPS coordinates in `LocalBusinessSchema.tsx`
- [ ] Create and verify Google Business Profile
- [ ] Submit to Google Search Console with sitemap
- [ ] Add real photography
- [ ] Replace Google verification meta tag
- [ ] Configure contact form email provider
- [ ] Test contact form end-to-end
- [ ] Verify all structured data with Google Rich Results Test
- [ ] Run Lighthouse audit on production
- [ ] Set up Google Analytics or preferred analytics

---

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run type-check   # TypeScript check
```

---

## License

Proprietary - for Perspective Health Iowa. All rights reserved.
