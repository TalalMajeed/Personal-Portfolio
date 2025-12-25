import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  createBlogPost,
  getAllBlogPosts,
} from "@/lib/blog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function GET() {
  try {
    const posts = await getAllBlogPosts();

    const data = posts.map((post) => ({
      id: post._id.toString(),
      title: post.title,
      slug: post.slug,
      summary: post.summary,
      published: post.published,
      createdAt: post.createdAt.toISOString(),
    }));

    return NextResponse.json({ success: true, posts: data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load blog posts." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 },
      );
    }

    const body = await request.json().catch(() => null);

    const title = body?.title;
    const rawSlug = body?.slug;
    const summary = body?.summary;
    const content = body?.content;
    const tagsRaw = body?.tags;
    const seoTitle = body?.seoTitle;
    const seoDescription = body?.seoDescription;
    const published = body?.published;

    if (
      typeof title !== "string" ||
      typeof summary !== "string" ||
      typeof content !== "string" ||
      !title.trim() ||
      !summary.trim() ||
      !content.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, summary, and content are required.",
        },
        { status: 400 },
      );
    }

    const slug =
      typeof rawSlug === "string" && rawSlug.trim()
        ? slugify(rawSlug)
        : slugify(title);

    const tags: string[] | undefined =
      typeof tagsRaw === "string"
        ? tagsRaw
            .split(",")
            .map((tag: string) => tag.trim())
            .filter(Boolean)
        : Array.isArray(tagsRaw)
          ? (tagsRaw as string[])
              .map((tag) => (typeof tag === "string" ? tag.trim() : ""))
              .filter(Boolean)
          : undefined;

    const created = await createBlogPost({
      title: title.trim(),
      slug,
      summary: summary.trim(),
      content: content.trim(),
      tags,
      seoTitle:
        typeof seoTitle === "string" && seoTitle.trim()
          ? seoTitle.trim()
          : undefined,
      seoDescription:
        typeof seoDescription === "string" && seoDescription.trim()
          ? seoDescription.trim()
          : undefined,
      published: typeof published === "boolean" ? published : true,
    });

    return NextResponse.json(
      {
        success: true,
        post: {
          id: created._id.toString(),
          title: created.title,
          slug: created.slug,
          summary: created.summary,
          published: created.published,
          createdAt: created.createdAt.toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating blog post:", error);
    const message =
      error instanceof Error ? error.message : "Failed to create blog post.";
    return NextResponse.json(
      { success: false, message },
      { status: 500 },
    );
  }
}

