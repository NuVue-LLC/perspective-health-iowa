import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Tag } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { CTABanner } from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Health insights, integrative medicine education, and wellness tips from the Perspective Health Iowa team.",
  openGraph: {
    title: "Blog | Perspective Health Iowa",
    description:
      "Health education and wellness insights from Perspective Health Iowa.",
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col justify-end overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-blog.jpg"
            alt="Health education and wellness insights from Perspective Health Iowa"
            fill
            priority
            quality={90}
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/60" />
        </div>
        <div className="relative z-10 px-6 sm:px-12 lg:px-20 pb-16 sm:pb-20 lg:pb-24">
          <p className="font-script text-5xl sm:text-6xl lg:text-7xl text-white -rotate-2 font-light mb-2 sm:mb-3 ml-1">
            Insights & Education
          </p>
          <h1 className="flex flex-col items-start gap-2 sm:gap-3">
            <span className="inline-block bg-teal/90 px-4 py-2.5 sm:px-6 sm:py-3 text-white text-xl sm:text-2xl lg:text-3xl font-normal tracking-wide uppercase">
              Our Blog
            </span>
          </h1>
          <p className="text-white/80 text-lg max-w-xl mt-4">
            Evidence-based insights on integrative health, hormone balance,
            functional medicine, and whole-person wellness.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="section-padding bg-white">
        <div className="section-container">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                Blog posts coming soon. Check back shortly!
              </p>
              <Link href="/contact#contact-form" className="btn-teal mt-6 inline-flex">
                Contact Us
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, idx) => (
                <article key={post.slug} className="card flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden image-zoom">
                    <Image
                      src={post.frontmatter.ogImage || "/images/blog-default.jpg"}
                      alt={post.frontmatter.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading={idx < 3 ? "eager" : "lazy"}
                    />
                    {/* Category tag */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-teal text-white text-xs font-bold px-3 py-1 rounded-full">
                        {post.frontmatter.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-gray-400 text-xs font-medium mb-2">
                      {formatDate(post.frontmatter.date)} &bull;{" "}
                      {post.frontmatter.author}
                    </p>
                    <h2 className="font-bold text-lg text-charcoal mb-3 leading-snug">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-teal transition-colors"
                      >
                        {post.frontmatter.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-4 line-clamp-3">
                      {post.frontmatter.description}
                    </p>
                    {/* Tags */}
                    {post.frontmatter.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.frontmatter.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-0.5"
                          >
                            <Tag size={9} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-teal font-semibold text-sm hover:gap-3 transition-all"
                    >
                      Read Article <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABanner heading="Ready to Take the Next Step?" subtext="Schedule a consultation and put what you've learned into action." />
    </>
  );
}
