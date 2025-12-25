import type { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/lib/blog";
import { getCanonicalUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedBlogPosts();

  const now = new Date();

  const baseEntries: MetadataRoute.Sitemap = [
    {
      url: getCanonicalUrl("/"),
      lastModified: now,
    },
    {
      url: getCanonicalUrl("/blog"),
      lastModified: now,
    },
  ];

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: getCanonicalUrl(`/blog/${post.slug}`),
    lastModified: post.updatedAt ?? post.createdAt,
  }));

  return [...baseEntries, ...blogEntries];
}

