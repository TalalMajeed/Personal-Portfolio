import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAllBlogPosts } from "@/lib/blog";
import { AdminBlogManager } from "./AdminBlogManager";

export default async function PanelHomePage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session) {
    redirect("/admin/login");
  }

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
    <div className="flex min-h-screen justify-center bg-background px-4 py-8">
      <div className="w-full max-w-4xl space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Admin Panel
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your blog posts and SEO settings.
          </p>
        </header>

        <AdminBlogManager initialPosts={initialPosts} />
      </div>
    </div>
  );
}
