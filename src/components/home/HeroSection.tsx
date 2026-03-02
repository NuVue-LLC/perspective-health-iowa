import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-end overflow-hidden bg-charcoal">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Smiling woman representing the warm, personal care at Perspective Health Iowa"
          fill
          priority
          quality={90}
          className="object-cover object-top"
          sizes="100vw"
        />
        {/* Warm overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/50" />
      </div>

      {/* Hero text */}
      <div className="relative z-10 px-6 sm:px-12 lg:px-20 pb-16 sm:pb-20 lg:pb-24 pt-32">
        {/* "Be Seen." — handwritten on the image, overlapping into headline */}
        <p className="font-script text-6xl sm:text-7xl lg:text-8xl text-white -rotate-2 tracking-tight font-light mb-[-0.3em] ml-1 sm:ml-2 relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
          Be Seen.
        </p>

        {/* Highlighted headline blocks */}
        <h1 className="flex flex-col items-start gap-1.5 sm:gap-2 relative z-0">
          <span className="inline-block bg-teal/90 px-3 py-1.5 sm:px-5 sm:py-2 text-white text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal tracking-wide uppercase">
            Experience Healthcare
          </span>
          <span className="inline-block bg-purple/90 px-3 py-1.5 sm:px-5 sm:py-2 text-white text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal tracking-wide uppercase">
            From a New Perspective
          </span>
        </h1>
      </div>
    </section>
  );
}
