import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  deleteBlogPost,
  getBlogPostById,
  updateBlogPost,
} from "@/lib/blog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function ensureAdminSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return Boolean(session);
}

async function triggerFrontendRebuild() {
  const webhookUrl = process.env.FRONTEND_REBUILD_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "admin-panel", type: "blog-changed" }),
    });
  } catch (error) {
    console.error("Failed to trigger frontend rebuild:", error);
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    if (!(await ensureAdminSession())) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 },
      );
    }

    const { id } = await params;
    const post = await getBlogPostById(id);

    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        post: {
          id: post._id.toString(),
          title: post.title,
          slug: post.slug,
          summary: post.summary,
          content: post.content,
          tags: post.tags ?? [],
          seoTitle: post.seoTitle ?? "",
          seoDescription: post.seoDescription ?? "",
          published: post.published,
          createdAt: post.createdAt.toISOString(),
          updatedAt: (post.updatedAt ?? post.createdAt).toISOString(),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blog post.",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    if (!(await ensureAdminSession())) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 },
      );
    }

    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 },
      );
    }

    const { id } = await params;

    const updated = await updateBlogPost(id, {
      title:
        typeof body.title === "string" && body.title.trim()
          ? body.title.trim()
          : undefined,
      slug:
        typeof body.slug === "string" && body.slug.trim()
          ? body.slug.trim()
          : undefined,
      summary:
        typeof body.summary === "string" &&
        body.summary.trim()
          ? body.summary.trim()
          : undefined,
      content:
        typeof body.content === "string" &&
        body.content.trim()
          ? body.content.trim()
          : undefined,
      tags: Array.isArray(body.tags)
        ? (body.tags as string[])
            .map((tag) =>
              typeof tag === "string" ? tag.trim() : "",
            )
            .filter(Boolean)
        : typeof body.tags === "string"
          ? body.tags
              .split(",")
              .map((tag: string) => tag.trim())
              .filter(Boolean)
          : undefined,
      seoTitle:
        typeof body.seoTitle === "string" &&
        body.seoTitle.trim()
          ? body.seoTitle.trim()
          : undefined,
      seoDescription:
        typeof body.seoDescription === "string" &&
        body.seoDescription.trim()
          ? body.seoDescription.trim()
          : undefined,
      published:
        typeof body.published === "boolean"
          ? body.published
          : undefined,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Post not found." },
        { status: 404 },
      );
    }

    await triggerFrontendRebuild();

    return NextResponse.json(
      {
        success: true,
        post: {
          id: updated._id.toString(),
          title: updated.title,
          slug: updated.slug,
          summary: updated.summary,
          published: updated.published,
          createdAt: updated.createdAt.toISOString(),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating blog post:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Failed to update blog post.";
    return NextResponse.json(
      { success: false, message },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    if (!(await ensureAdminSession())) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 },
      );
    }

    const { id } = await params;

    const deleted = await deleteBlogPost(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Post not found." },
        { status: 404 },
      );
    }

    await triggerFrontendRebuild();

    return NextResponse.json(
      { success: true },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete blog post.",
      },
      { status: 500 },
    );
  }
}
