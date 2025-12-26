export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  content: string;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  published: boolean;
  createdAt: Date;
  updatedAt?: Date;
};

// Static, file-based blog content so the site can be fully exported.
// Add/edit posts here and rebuild to publish.
const posts: BlogPost[] = [
  {
    slug: "welcome-to-my-blog",
    title: "Welcome to My Blog",
    summary:
      "An introduction to my personal blog where I share notes on Next.js, React, and full‑stack engineering.",
    content:
      "<p>Welcome to my blog. Here I share short technical write‑ups, experiments, and notes on building products with Next.js, React, and modern web tooling.</p><p>This first post is a placeholder. Replace it or add more posts in <code>lib/blog.ts</code>, then rebuild and redeploy to publish changes.</p>",
    tags: ["introduction"],
    seoTitle: "Welcome to My Blog",
    seoDescription:
      "Introductory post for my personal engineering blog, covering Next.js, React, and full‑stack development.",
    published: true,
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    updatedAt: new Date("2025-01-01T00:00:00.000Z"),
  },
];

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  return posts
    .filter((post) => post.published)
    .sort(
      (a, b) =>
        b.createdAt.getTime() - a.createdAt.getTime(),
    );
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const post = posts.find(
    (entry) => entry.slug === slug && entry.published,
  );
  return post ?? null;
}
