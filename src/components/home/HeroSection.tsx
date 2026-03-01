import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-end overflow-hidden bg-charcoal">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Warm, welcoming integrative health clinic consultation"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
      </div>

      {/* "Be Seen." signature text */}
      <div className="relative z-10 flex flex-col items-start justify-end pb-0 px-6 sm:px-12 lg:px-20 pt-32">
        <div className="inline-block">
          <p className="font-script italic text-7xl sm:text-8xl lg:text-9xl text-white mb-2 drop-shadow-lg -rotate-2 tracking-tight">
            Be Seen.
          </p>
          <div className="h-[2px] w-3/4 bg-white/60 ml-2 -mt-1 rounded-full" />
        </div>
      </div>

      {/* Color-blocked headline bars */}
      <div className="relative z-10 w-full">
        <div className="headline-bar-teal px-6 sm:px-12 lg:px-20 py-4 sm:py-5">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-widest">
            EXPERIENCE HEALTHCARE
          </h1>
        </div>
        <div className="headline-bar-purple px-6 sm:px-12 lg:px-20 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-widest">
            FROM A NEW PERSPECTIVE
          </span>
          <Link
            href="/contact"
            className="btn-outline-white whitespace-nowrap text-sm sm:text-base px-6 py-3 self-start sm:self-auto"
          >
            Start Your Health Journey
          </Link>
        </div>
      </div>
    </section>
  );
}
