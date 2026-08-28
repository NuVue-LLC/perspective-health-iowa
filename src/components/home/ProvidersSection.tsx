import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROVIDERS } from "@/lib/constants";

export function ProvidersSection() {
  return (
    <section className="section-padding geometric-pattern-light">
      <div className="section-container">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="font-script text-3xl text-teal mb-2">Our Team</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal">
            MEET OUR{" "}
            <span className="text-teal">PROVIDERS</span>
          </h2>
          <div className="w-16 h-1 bg-teal rounded-full mx-auto mt-4 mb-6" />
          <p className="max-w-2xl mx-auto text-gray-600">
            Our experienced, compassionate team brings together diverse
            expertise in primary care, hormone health, functional medicine, and
            clinical nutrition.
          </p>
        </div>

        {/* Provider grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROVIDERS.map((provider) => (
            <div key={provider.id} className="provider-card">
              {/* Photo */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={provider.image}
                  alt={provider.imageAlt}
                  fill
                  className="object-cover object-center transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="font-extrabold text-xl text-charcoal">
                  {provider.name}
                  <span className="text-teal font-medium text-base ml-2">
                    {provider.credentials}
                  </span>
                </h3>
                <p className="text-purple italic font-medium text-sm mt-1 mb-4">
                  {provider.title}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">
                  {provider.bio}
                </p>
                <Link
                  href={`/about#${provider.id}`}
                  className="inline-flex items-center gap-2 text-teal font-semibold text-sm uppercase tracking-wider hover:gap-3 transition-all"
                >
                  Meet {provider.name.split(" ")[0]} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/about" className="btn-teal">
            Meet Our Wonderful Team
          </Link>
        </div>
      </div>
    </section>
  );
}
