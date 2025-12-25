import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getPublishedBlogPosts } from "@/lib/blog";
import { getCanonicalUrl, siteConfig } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical articles and engineering notes by Talal Majeed, covering Next.js, React, full-stack development, and software engineering.",
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    url: getCanonicalUrl("/blog"),
    name: `${siteConfig.name} Blog`,
    description: metadata.description,
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: getCanonicalUrl(`/blog/${post.slug}`),
      datePublished: post.createdAt.toISOString(),
      dateModified: (post.updatedAt ?? post.createdAt).toISOString(),
      description: post.summary,
    })),
  };

  return (
    <div className="bg-white">
      <Navigation />
      <main className="min-h-[93svh] mx-auto max-w-4xl px-6 py-16">
        <header className="mb-10 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Blog
          </h1>
        </header>

        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {posts.length === 0 ? (
          <p className="text-gray-600">
            No articles yet. Check back soon for technical write-ups and
            engineering insights.
          </p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <a href={`/blog/${post.slug}`} className="block space-y-2">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-gray-700">{post.summary}</p>
                </a>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
