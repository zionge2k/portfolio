import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import Prompt from "@/components/prompt";

export const metadata: Metadata = {
  title: "Blog | 이성",
  description: "개발 블로그 — 프로젝트, 회고, TIL",
};

export default async function BlogPage() {
  const posts = getAllPosts();

  return (
    <div>
      <Prompt command="ls -la ~/blog/" />
      <div className="mt-4">
        {posts.length === 0 ? (
          <p className="text-sm text-t-muted">total 0</p>
        ) : (
          <div className="space-y-1 text-sm">
            <p className="text-t-muted">total {posts.length}</p>
            {posts.map((post) => {
              const date = new Date(post.frontmatter.date);
              const dateStr = date
                .toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })
                .replace(",", "");
              const tags = post.frontmatter.tags
                .map((t) => `[${t}]`)
                .join(" ");
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="flex gap-3 rounded px-1 py-0.5 transition-colors hover:bg-t-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-t-accent"
                >
                  <span className="shrink-0 text-t-subtle">-rw-r--r--</span>
                  <span className="shrink-0 text-t-muted">{dateStr}</span>
                  <span className="shrink-0 text-t-cyan">{tags}</span>
                  <span className="truncate text-t-fg">
                    {post.frontmatter.title}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
