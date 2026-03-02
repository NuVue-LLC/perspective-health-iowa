import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Calendar, User, Tag, ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { SITE_CONFIG } from "@/lib/constants";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    authors: [{ name: post.frontmatter.author }],
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author],
      images: post.frontmatter.ogImage
        ? [
            {
              url: post.frontmatter.ogImage,
              alt: post.frontmatter.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <ArticleSchema
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        author={post.frontmatter.author}
        datePublished={post.frontmatter.date}
        image={post.frontmatter.ogImage}
        url={`/blog/${post.slug}`}
      />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col justify-end overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <Image
            src={post.frontmatter.ogImage || "/images/blog-default.jpg"}
            alt={post.frontmatter.title}
            fill
            priority
            quality={90}
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/60" />
        </div>

        {/* Breadcrumb */}
        <div className="absolute top-24 left-0 right-0 z-10">
          <nav aria-label="Breadcrumb" className="section-container text-sm text-white/70">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <ChevronRight size={12} />
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              </li>
              <ChevronRight size={12} />
              <li className="text-white truncate max-w-xs">
                {post.frontmatter.title}
              </li>
            </ol>
          </nav>
        </div>

        <div className="relative z-10 px-6 sm:px-12 lg:px-20 pb-16 sm:pb-20 lg:pb-24">
          <span className="inline-block bg-teal text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            {post.frontmatter.category}
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white max-w-3xl leading-tight">
            {post.frontmatter.title}
          </h1>
        </div>
      </section>

      {/* Article body */}
      <article className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 pb-6 mb-8 border-b border-gray-100 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-teal" />
                {formatDate(post.frontmatter.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <User size={14} className="text-teal" />
                {post.frontmatter.author}
              </span>
              {post.frontmatter.tags?.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <Tag size={12} className="text-teal" />
                  {post.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 rounded-full px-2 py-0.5 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* MDX Content */}
            <div className="prose prose-lg max-w-none prose-headings:font-extrabold prose-headings:text-charcoal prose-a:text-teal prose-a:no-underline hover:prose-a:underline prose-strong:text-charcoal prose-li:text-gray-600 prose-p:text-gray-600 prose-h2:text-2xl prose-h3:text-xl">
              <MDXRemote source={post.content} />
            </div>

            {/* Back link */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-teal font-medium hover:gap-3 transition-all"
              >
                <ArrowLeft size={16} />
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="bg-sage/40 section-padding">
        <div className="section-container max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal mb-3">
            Ready to Take the Next Step?
          </h2>
          <p className="text-gray-600 mb-6">
            Our team at Perspective Health Iowa is here to help you apply these
            insights to your own health journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact#contact-form" className="btn-primary">
              Schedule a Consultation
            </Link>
            <Link href="/services" className="btn-outline-teal">
              Explore Our Services
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-6">
            {SITE_CONFIG.name} &bull; {SITE_CONFIG.address.city},{" "}
            {SITE_CONFIG.address.state} &bull;{" "}
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="hover:text-teal"
            >
              {SITE_CONFIG.phone}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
