"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { NAVIGATION_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isTransparent = !isScrolled && !mobileMenuOpen;

  const handleDropdownEnter = useCallback((href: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(href);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      closeTimeoutRef.current = null;
    }, 200);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Main header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isTransparent
            ? "bg-transparent"
            : "bg-charcoal/95 backdrop-blur-sm shadow-lg"
        )}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-28">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 flex-shrink-0"
              aria-label="Perspective Health Iowa — Home"
            >
              <Image
                src="/images/brand/phi-icon.svg"
                alt=""
                width={113}
                height={113}
                priority
                className="h-16 w-16 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
              />
              <span className="hidden sm:flex items-baseline gap-2 whitespace-nowrap text-2xl md:text-3xl font-bold tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
                <span className="text-[#21c1dc]">PERSPECTIVE</span>
                <span className="text-white">HEALTH</span>
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav
              className="hidden lg:flex items-center gap-1"
              ref={dropdownRef}
              aria-label="Main navigation"
            >
              {NAVIGATION_LINKS.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={link.children ? () => handleDropdownEnter(link.href) : undefined}
                  onMouseLeave={link.children ? handleDropdownLeave : undefined}
                >
                  {link.children ? (
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-1 px-4 py-2 rounded-lg text-base font-medium transition-all duration-300 hover:underline underline-offset-4",
                        pathname.startsWith(link.href) && link.href !== "/"
                          ? "text-teal"
                          : "text-white/90 hover:text-teal"
                      )}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform duration-200",
                          activeDropdown === link.href ? "rotate-180" : ""
                        )}
                      />
                    </Link>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        "px-4 py-2 rounded-lg text-base block font-medium transition-all duration-300 hover:underline underline-offset-4",
                        pathname === link.href ||
                          (link.href !== "/" && pathname.startsWith(link.href))
                          ? "text-teal"
                          : "text-white/90 hover:text-teal"
                      )}
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* Dropdown menu */}
                  {link.children && activeDropdown === link.href && (
                    <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in">
                      {link.children.map((child) =>
                        child.href === "#" || child.href.startsWith("http") ? (
                          <a
                            key={child.label}
                            href={child.href}
                            target={child.href.startsWith("http") ? "_blank" : undefined}
                            rel={child.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="block px-4 py-2.5 text-base text-purple font-medium hover:bg-purple/5 hover:text-purple-700 transition-colors border-t border-gray-100"
                          >
                            {child.label} &rarr;
                          </a>
                        ) : (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-base text-charcoal hover:bg-sage hover:text-teal transition-colors"
                          >
                            {child.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact#contact-form"
                className={cn(
                  "hidden md:inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-base transition-all duration-300",
                  isTransparent
                    ? "border-2 border-white text-white hover:bg-white hover:text-purple"
                    : "text-white bg-purple hover:bg-purple/90 shadow-md hover:shadow-lg"
                )}
              >
                Start Your Health Journey
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg transition-colors duration-300 text-white hover:bg-white/10"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-charcoal">
            <nav
              className="section-container py-4 space-y-1"
              aria-label="Mobile navigation"
            >
              {NAVIGATION_LINKS.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-lg font-medium transition-colors",
                      pathname === link.href ||
                        (link.href !== "/" && pathname.startsWith(link.href))
                        ? "bg-teal/10 text-teal"
                        : "text-white/90 hover:bg-white/10"
                    )}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {link.children.map((child) =>
                        child.href.startsWith("http") ? (
                          <a
                            key={child.href}
                            href={child.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 text-base text-white/60 hover:text-teal rounded-lg hover:bg-white/10 transition-colors"
                          >
                            {child.label}
                          </a>
                        ) : (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-base text-white/60 hover:text-teal rounded-lg hover:bg-white/10 transition-colors"
                          >
                            {child.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 border-t border-white/10">
                <Link
                  href="/contact#contact-form"
                  className="bg-purple text-white hover:bg-purple/90 w-full justify-center text-base inline-flex items-center px-6 py-3 rounded-full font-semibold transition-all"
                >
                  Start Your Health Journey
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
