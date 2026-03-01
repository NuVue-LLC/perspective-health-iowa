import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import { SITE_CONFIG, SERVICES, NAVIGATION_LINKS } from "@/lib/constants";
import { PinwheelLogo } from "@/components/ui/PinwheelLogo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white">
      {/* Main footer */}
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4" aria-label="Perspective Health Iowa">
              <PinwheelLogo className="w-12 h-12" />
              <div>
                <span className="block font-bold text-white text-lg leading-tight">
                  Perspective Health
                </span>
                <span className="block text-teal text-sm font-medium">Iowa</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Integrative healthcare that sees the whole person — not just the
              symptoms. We combine the best of conventional and functional
              medicine to help you thrive.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 text-gray-300 hover:bg-teal hover:text-white transition-all"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 text-gray-300 hover:bg-teal hover:text-white transition-all"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="font-bold text-white text-lg mb-5 uppercase tracking-wide text-sm">
              Useful Links
            </h3>
            <ul className="space-y-2.5">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-teal transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-teal transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="font-bold text-white text-lg mb-5 uppercase tracking-wide text-sm">
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-gray-400 hover:text-teal transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-white text-lg mb-5 uppercase tracking-wide text-sm">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="flex items-start gap-3 text-gray-400 hover:text-teal transition-colors"
                >
                  <Phone
                    size={16}
                    className="mt-0.5 flex-shrink-0 text-teal"
                  />
                  <span className="text-sm">{SITE_CONFIG.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-start gap-3 text-gray-400 hover:text-teal transition-colors"
                >
                  <Mail size={16} className="mt-0.5 flex-shrink-0 text-teal" />
                  <span className="text-sm">{SITE_CONFIG.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin
                  size={16}
                  className="mt-0.5 flex-shrink-0 text-teal"
                />
                <span className="text-sm">{SITE_CONFIG.address.full}</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Clock
                  size={16}
                  className="mt-0.5 flex-shrink-0 text-teal"
                />
                <div className="text-sm">
                  <p>Mon, Tue, Thu, Fri: 8:00 AM – 5:00 PM</p>
                  <p>Wed: 8:00 AM – 12:00 PM</p>
                  <p>Sat–Sun: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="section-container py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>
            &copy; {currentYear} Perspective Health Iowa. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy-policy"
              className="hover:text-teal transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-teal transition-colors"
            >
              Terms of Use
            </Link>
            <Link
              href="/sitemap.xml"
              className="hover:text-teal transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
