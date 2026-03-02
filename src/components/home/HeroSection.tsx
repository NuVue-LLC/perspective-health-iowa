import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-end overflow-hidden bg-charcoal">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Warm, approachable healthcare consultation at an integrative wellness clinic"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Warm overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/55" />
      </div>

      {/* Hero text */}
      <div className="relative z-10 px-6 sm:px-12 lg:px-20 pb-16 sm:pb-20 lg:pb-24 pt-32">
        {/* "Be Seen." signature text */}
        <div className="inline-block mb-5">
          <p className="font-script text-6xl sm:text-7xl lg:text-8xl text-white/90 mb-1 drop-shadow-md -rotate-2 tracking-tight font-normal">
            Be Seen.
          </p>
          <div className="h-[1px] w-2/3 bg-white/40 ml-2 rounded-full" />
        </div>

        {/* Highlighted headline blocks */}
        <h1 className="flex flex-col items-start gap-1.5 sm:gap-2">
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
