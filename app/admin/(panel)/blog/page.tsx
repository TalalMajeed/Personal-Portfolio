import { getAllBlogPosts } from "@/lib/blog";
import { AdminBlogManager } from "../../AdminBlogManager";

export default async function AdminBlogPage() {
  const posts = await getAllBlogPosts();

  const initialPosts = posts.map((post) => ({
    id: post._id.toString(),
    title: post.title,
    slug: post.slug,
    summary: post.summary,
    published: post.published,
    createdAt: post.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Blog Posts
        </h1>
        <p className="text-sm text-muted-foreground">
          Create, update, and manage your articles.
        </p>
      </header>

      <AdminBlogManager initialPosts={initialPosts} />
    </div>
  );
}

