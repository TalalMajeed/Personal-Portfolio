"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type BlogPostSummary = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  published: boolean;
  createdAt: string;
};

type Props = {
  initialPosts: BlogPostSummary[];
};

type FormState = {
  title: string;
  slug: string;
  summary: string;
  content: string;
  tags: string;
  seoTitle: string;
  seoDescription: string;
  published: boolean;
  loading: boolean;
};

export function AdminBlogManager({ initialPosts }: Props) {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPostSummary[]>(initialPosts);
  const [form, setForm] = useState<FormState>({
    title: "",
    slug: "",
    summary: "",
    content: "",
    tags: "",
    seoTitle: "",
    seoDescription: "",
    published: true,
    loading: false,
  });

  useEffect(() => {
    async function refreshPosts() {
      try {
        const response = await fetch("/api/blog");
        const data = (await response.json().catch(() => ({}))) as {
          success?: boolean;
          posts?: BlogPostSummary[];
        };
        if (response.ok && data.success && data.posts) {
          setPosts(data.posts);
        }
      } catch {
        // Ignore background refresh errors
      }
    }

    if (!initialPosts.length) {
      void refreshPosts();
    }
  }, [initialPosts.length]);

  function handleChange<K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.title.trim() || !form.summary.trim() || !form.content.trim()) {
      toast.error("Title, summary, and content are required.");
      return;
    }

    setForm((prev) => ({ ...prev, loading: true }));

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: form.title,
          slug: form.slug,
          summary: form.summary,
          content: form.content,
          tags: form.tags,
          seoTitle: form.seoTitle,
          seoDescription: form.seoDescription,
          published: form.published,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
        post?: BlogPostSummary;
      };

      if (!response.ok || !data.success || !data.post) {
        toast.error(data.message || "Failed to create blog post.");
        setForm((prev) => ({ ...prev, loading: false }));
        return;
      }

      setPosts((prev) => [data.post!, ...prev]);

      toast.success("Blog post created.");

      setForm({
        title: "",
        slug: "",
        summary: "",
        content: "",
        tags: "",
        seoTitle: "",
        seoDescription: "",
        published: true,
        loading: false,
      });

      router.refresh();
    } catch (error) {
      console.error("Error creating blog post:", error);
      toast.error("Something went wrong. Please try again.");
      setForm((prev) => ({ ...prev, loading: false }));
    }
  }

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">
          Create New Blog Post
        </h2>
        <p className="text-sm text-muted-foreground">
          Add content, summary, and SEO details for a new article.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-4 grid gap-4 rounded-lg border border-border bg-card p-6"
        >
          <div className="grid gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              Title
            </label>
            <Input
              value={form.title}
              onChange={(event) =>
                handleChange("title", event.target.value)
              }
              placeholder="How I built my personal website with Next.js"
              required
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              Slug (optional)
            </label>
            <Input
              value={form.slug}
              onChange={(event) =>
                handleChange("slug", event.target.value)
              }
              placeholder="my-nextjs-portfolio-setup"
            />
            <p className="text-xs text-muted-foreground">
              If left empty, the slug will be generated from the title.
            </p>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              Summary
            </label>
            <Textarea
              value={form.summary}
              onChange={(event) =>
                handleChange("summary", event.target.value)
              }
              placeholder="A short overview that will appear in the blog list and SEO descriptions."
              rows={3}
              required
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              Content
            </label>
            <Textarea
              value={form.content}
              onChange={(event) =>
                handleChange("content", event.target.value)
              }
              placeholder="Write your blog content here. You can start simple text now and enhance the renderer later."
              rows={10}
              required
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              Tags (optional)
            </label>
            <Input
              value={form.tags}
              onChange={(event) =>
                handleChange("tags", event.target.value)
              }
              placeholder="next.js, react, portfolio"
            />
            <p className="text-xs text-muted-foreground">
              Comma-separated values (e.g. next.js, react, full-stack).
            </p>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              SEO Title (optional)
            </label>
            <Input
              value={form.seoTitle}
              onChange={(event) =>
                handleChange("seoTitle", event.target.value)
              }
              placeholder="Building a High-Performance Next.js Portfolio"
            />
            <p className="text-xs text-muted-foreground">
              If empty, the blog title will be used.
            </p>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              SEO Description (optional)
            </label>
            <Textarea
              value={form.seoDescription}
              onChange={(event) =>
                handleChange("seoDescription", event.target.value)
              }
              placeholder="A concise, search-friendly summary that appears in Google results."
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              If empty, the summary will be used for meta descriptions.
            </p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(event) =>
                  handleChange("published", event.target.checked)
                }
                className="h-4 w-4 rounded border border-input"
              />
              <span>Publish immediately</span>
            </label>

            <Button
              type="submit"
              disabled={form.loading}
              className="ml-auto"
            >
              {form.loading ? "Saving..." : "Create Post"}
            </Button>
          </div>
        </form>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">
          Existing Posts
        </h2>
        <p className="text-sm text-muted-foreground">
          Recent articles you&apos;ve published or drafted.
        </p>

        {posts.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">
            No posts yet. Create your first article using the form above.
          </p>
        ) : (
          <div className="mt-4 grid gap-3">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="flex items-start justify-between gap-4 border-border bg-card/80 p-4"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold">{post.title}</h3>
                    <span className="text-xs text-muted-foreground">
                      /blog/{post.slug}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {post.summary}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {post.published ? "Published" : "Draft"} •{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

