import Link from "next/link";
import { SERVICES } from "@/lib/constants";

export default function NotFound() {
  return (
    <section className="section-padding min-h-[60vh] flex items-center bg-white">
      <div className="section-container text-center">
        <p className="font-script text-5xl text-teal mb-4">Oops!</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-charcoal mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 text-lg max-w-lg mx-auto mb-8">
          We couldn&apos;t find the page you&apos;re looking for. It may have
          moved or the link may be outdated.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/" className="btn-teal">
            Back to Home
          </Link>
          <Link href="/contact#contact-form" className="btn-outline-teal">
            Contact Us
          </Link>
        </div>
        {/* Quick links */}
        <div className="text-sm text-gray-500">
          <p className="mb-3 font-medium text-charcoal">Quick links:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "About Us", href: "/about" },
              { label: "Our Services", href: "/services" },
              { label: "Insurance", href: "/insurance" },
              ...SERVICES.slice(0, 3).map((s) => ({
                label: s.shortName,
                href: `/services/${s.slug}`,
              })),
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-teal hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
