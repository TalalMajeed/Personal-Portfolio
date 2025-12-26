import type { Collection } from "mongodb";
import { ObjectId } from "mongodb";
import { getDb } from "./mongodb";

export const BLOG_COLLECTION = "blog_posts";

export type BlogPostDocument = {
  _id: ObjectId | string;
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

async function getBlogCollection(): Promise<
  Collection<BlogPostDocument>
> {
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

  const created = await collection.findOne({
    _id: result.insertedId,
  });

  if (!created) {
    throw new Error("Failed to create blog post.");
  }

  return created;
}

export async function getPublishedBlogPosts(): Promise<
  BlogPostDocument[]
> {
  const collection = await getBlogCollection();
  return collection
    .find({ published: true })
    .sort({ createdAt: -1 })
    .toArray();
}

export async function getAllBlogPosts(): Promise<
  BlogPostDocument[]
> {
  const collection = await getBlogCollection();
  return collection.find({}).sort({ createdAt: -1 }).toArray();
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPostDocument | null> {
  const collection = await getBlogCollection();
  return collection.findOne({ slug, published: true });
}

export async function getBlogPostById(
  id: string,
): Promise<BlogPostDocument | null> {
  const collection = await getBlogCollection();
  const filter = ObjectId.isValid(id)
    ? { _id: new ObjectId(id) }
    : { _id: id };

  return collection.findOne(filter);
}

export async function updateBlogPost(
  id: string,
  updates: {
    title?: string;
    slug?: string;
    summary?: string;
    content?: string;
    tags?: string[];
    seoTitle?: string;
    seoDescription?: string;
    published?: boolean;
  },
): Promise<BlogPostDocument | null> {
  const collection = await getBlogCollection();

  const updateDoc: Partial<BlogPostDocument> & {
    updatedAt: Date;
  } = {
    updatedAt: new Date(),
  };

  if (typeof updates.title === "string") {
    updateDoc.title = updates.title;
  }

  if (typeof updates.summary === "string") {
    updateDoc.summary = updates.summary;
  }

  if (typeof updates.content === "string") {
    updateDoc.content = updates.content;
  }

  if (Array.isArray(updates.tags)) {
    updateDoc.tags = updates.tags;
  }

  if (typeof updates.seoTitle === "string") {
    updateDoc.seoTitle = updates.seoTitle;
  }

  if (typeof updates.seoDescription === "string") {
    updateDoc.seoDescription = updates.seoDescription;
  }

  if (typeof updates.published === "boolean") {
    updateDoc.published = updates.published;
  }

  if (typeof updates.slug === "string") {
    const normalizedSlug = updates.slug;

    const existingWithSlug = await collection.findOne({
      slug: normalizedSlug,
      _id: ObjectId.isValid(id)
        ? { $ne: new ObjectId(id) }
        : { $ne: id },
    });

    if (existingWithSlug) {
      throw new Error("A blog post with this slug already exists.");
    }

    updateDoc.slug = normalizedSlug;
  }

  const result = await collection.findOneAndUpdate(
    ObjectId.isValid(id)
      ? { _id: new ObjectId(id) }
      : { _id: id },
    { $set: updateDoc },
    { returnDocument: "after" },
  );

  return result;
}

export async function deleteBlogPost(
  id: string,
): Promise<boolean> {
  const collection = await getBlogCollection();
  const filter = ObjectId.isValid(id)
    ? { _id: new ObjectId(id) }
    : { _id: id };

  const result = await collection.deleteOne(filter);
  return result.deletedCount === 1;
}
