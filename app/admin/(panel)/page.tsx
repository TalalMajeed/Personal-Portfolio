import { getAllBlogPosts } from "@/lib/blog";

export default async function AdminDashboardPage() {
  const posts = await getAllBlogPosts();

  const total = posts.length;
  const published = posts.filter((post) => post.published).length;
  const drafts = total - published;

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Overview of your content and activity.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-card/80 p-4">
          <p className="text-xs font-medium text-muted-foreground">
            Total Posts
          </p>
          <p className="mt-2 text-2xl font-semibold">{total}</p>
        </div>
        <div className="rounded-lg border border-border bg-card/80 p-4">
          <p className="text-xs font-medium text-muted-foreground">
            Published
          </p>
          <p className="mt-2 text-2xl font-semibold">
            {published}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card/80 p-4">
          <p className="text-xs font-medium text-muted-foreground">Drafts</p>
          <p className="mt-2 text-2xl font-semibold">
            {drafts}
          </p>
        </div>
      </section>
    </div>
  );
}
