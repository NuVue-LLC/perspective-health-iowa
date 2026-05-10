import Image from "next/image";
import Link from "next/link";

export function WelcomeSection() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Images */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] image-zoom">
              <Image
                src="/images/welcome-1.jpg"
                alt="Patient consultation at Perspective Health Iowa"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Second floating image */}
            <div className="rounded-xl overflow-hidden shadow-lg w-2/3 mt-4 ml-auto image-zoom">
              <Image
                src="/images/welcome-2.jpg"
                alt="Whole-body wellness at Perspective Health Iowa"
                width={400}
                height={280}
                className="object-cover w-full h-48 object-center"
                sizes="(max-width: 1024px) 66vw, 33vw"
              />
            </div>
          </div>

          {/* Right: Text content */}
          <div>
            <p className="font-script text-3xl sm:text-4xl text-teal mb-2">
              Welcome To
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal leading-tight mb-6">
              PERSPECTIVE{" "}
              <span className="text-teal">HEALTH</span>
            </h2>
            {/* Teal accent bar */}
            <div className="w-16 h-1 bg-teal rounded-full mb-6" />
            <p className="text-gray-600 leading-relaxed mb-4 text-lg">
              At Perspective Health, we believe that true wellness means seeing
              the whole person - your history, your environment, your goals, and
              your unique biology. We combine the best of conventional medicine
              with integrative and functional approaches to create care plans
              that are as individual as you are.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Whether you&apos;re managing a chronic condition, seeking to optimize
              your hormone health, or simply looking for a healthcare team that
              truly listens - you&apos;ve found the right place. Our providers take
              the time to understand your full story and partner with you on your
              journey to lasting wellness.
            </p>
            <Link href="/about" className="btn-teal">
              Read More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
