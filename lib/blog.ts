import type { Collection, ObjectId } from "mongodb";
import { getDb } from "./mongodb";

export const BLOG_COLLECTION = "blog_posts";

export type BlogPostDocument = {
  _id: ObjectId;
  title: string;
  slug: string;
  summary: string;
  content: string;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  published: boolean;
  createdAt: Date;
  updatedAt?: Date;
};

async function getBlogCollection(): Promise<Collection<BlogPostDocument>> {
  const db = await getDb();
  return db.collection<BlogPostDocument>(BLOG_COLLECTION);
}

export async function createBlogPost(input: {
  title: string;
  slug: string;
  summary: string;
  content: string;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  published?: boolean;
}): Promise<BlogPostDocument> {
  const collection = await getBlogCollection();

  const now = new Date();
  const published = input.published ?? true;

  const existing = await collection.findOne({ slug: input.slug });
  if (existing) {
    throw new Error("A blog post with this slug already exists.");
  }

  const result = await collection.insertOne({
    title: input.title,
    slug: input.slug,
    summary: input.summary,
    content: input.content,
    tags: input.tags,
    seoTitle: input.seoTitle,
    seoDescription: input.seoDescription,
    published,
    createdAt: now,
    updatedAt: now,
  } as unknown as BlogPostDocument);

  const created = await collection.findOne({ _id: result.insertedId });

  if (!created) {
    throw new Error("Failed to create blog post.");
  }

  return created;
}

export async function getPublishedBlogPosts(): Promise<BlogPostDocument[]> {
  const collection = await getBlogCollection();
  return collection
    .find({ published: true })
    .sort({ createdAt: -1 })
    .toArray();
}

export async function getAllBlogPosts(): Promise<BlogPostDocument[]> {
  const collection = await getBlogCollection();
  return collection.find({}).sort({ createdAt: -1 }).toArray();
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPostDocument | null> {
  const collection = await getBlogCollection();
  return collection.findOne({ slug, published: true });
}

