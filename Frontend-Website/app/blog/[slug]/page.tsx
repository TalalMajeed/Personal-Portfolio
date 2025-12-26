import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getBlogPostBySlug } from "@/lib/blog";
import { getCanonicalUrl } from "@/lib/seo";

type Params = {
  slug: string;
};

type PageProps = {
  params: Params;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog post not found",
      description: "The requested blog post could not be found.",
    };
  }

  const seoTitle = post.seoTitle || post.title;
  const seoDescription = post.seoDescription || post.summary;
  const canonicalPath = `/blog/${post.slug}`;

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      title: seoTitle,
      description: seoDescription,
      url: canonicalPath,
    },
    twitter: {
      card: "summary",
      title: seoTitle,
      description: seoDescription,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="bg-white">
        <Navigation />
        <main className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-2xl font-semibold text-gray-900">
            Blog post not found
          </h1>
          <p className="mt-2 text-gray-600">
            The article you&apos;re looking for doesn&apos;t exist or may have
            been unpublished.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  const seoDescription = post.seoDescription || post.summary;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: seoDescription,
    datePublished: post.createdAt.toISOString(),
    dateModified: (post.updatedAt ?? post.createdAt).toISOString(),
    author: {
      "@type": "Person",
      name: "Talal Majeed",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getCanonicalUrl(`/blog/${post.slug}`),
    },
    url: getCanonicalUrl(`/blog/${post.slug}`),
  };

  const createdAt = post.createdAt.toISOString();

  return (
    <div className="bg-white">
      <Navigation />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <article className="prose prose-gray max-w-none">
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />

          <header className="mb-6">
            <p className="text-sm text-gray-500">
              {new Date(createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
              {post.title}
            </h1>
            {post.summary ? (
              <p className="mt-3 text-gray-600">{post.summary}</p>
            ) : null}
          </header>

          <section
            className="mt-8 text-gray-800"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getPublishedBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
