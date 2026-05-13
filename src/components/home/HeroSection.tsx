import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-end overflow-hidden bg-charcoal">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-brunette-preview.jpg"
          alt="Smiling woman outdoors in a blue top - welcoming integrative healthcare at Perspective Health Iowa"
          fill
          priority
          quality={90}
          className="object-cover object-[60%_top]"
          sizes="100vw"
        />
        {/* Warm overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/50" />
      </div>

      {/* Hero text */}
      <div className="relative z-10 px-6 sm:px-12 lg:px-20 pb-16 sm:pb-20 lg:pb-24">
        {/* "Be Seen." */}
        <p className="font-script text-7xl sm:text-8xl lg:text-9xl text-white font-light mb-2 sm:mb-3 ml-1">
          Be Seen.
        </p>

        {/* Highlighted headline blocks */}
        <h1 className="flex flex-col items-start gap-2 sm:gap-3">
          <span className="inline-block bg-teal/90 px-4 py-2.5 sm:px-6 sm:py-3 text-white text-xl sm:text-2xl lg:text-3xl font-normal tracking-wide uppercase">
            Experience Healthcare
          </span>
          <span className="inline-block bg-purple/90 px-4 py-2.5 sm:px-6 sm:py-3 text-white text-xl sm:text-2xl lg:text-3xl font-normal tracking-wide uppercase">
            From a New Perspective
          </span>
        </h1>
      </div>

    </section>
  );
}
