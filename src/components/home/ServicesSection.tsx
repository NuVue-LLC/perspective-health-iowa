import Image from "next/image";
import Link from "next/link";
import { SERVICES, SERVICE_IMAGE_POSITION } from "@/lib/constants";

export function ServicesSection() {
  return (
    <section className="section-padding geometric-pattern-green relative">
      <div className="section-container relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="font-script text-3xl sm:text-4xl text-white/90 mb-3">
            Our Services
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            LET OUR SERVICES
            <br />
            CHANGE YOUR LIFE
          </h2>
          <div className="w-16 h-1 bg-white/60 rounded-full mx-auto mt-6" />
        </div>

        {/* 3-column service grid */}
        <div className="flex flex-wrap justify-center gap-5">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="service-card group block h-48 sm:h-56 w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]"
            >
              {/* Image */}
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                style={{ objectPosition: SERVICE_IMAGE_POSITION[service.slug] }}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Gradient overlay */}
              <div className="service-card-overlay" />

              {/* Title overlay */}
              <div className="service-card-title">
                <span className="block font-bold text-base leading-snug">
                  {service.shortName}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-10">
          <Link href="/services" className="btn-outline-white">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
