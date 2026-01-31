import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, slugToHash } from "@/lib/blog";
import Prompt from "@/components/prompt";

export const metadata: Metadata = {
  title: "Blog | 이성",
  description: "개발 블로그 — 프로젝트, 회고, TIL",
};

export default async function BlogPage() {
  const posts = getAllPosts();

  return (
    <div>
      <Prompt command="git log --oneline --decorate" />
      <div className="mt-4">
        {posts.length === 0 ? (
          <p className="text-sm text-t-red">
            fatal: your current branch &apos;main&apos; does not have any
            commits yet
          </p>
        ) : (
          <div className="space-y-1 text-sm">
            {posts.map((post, index) => {
              const hash = slugToHash(post.slug);
              const date = new Date(post.frontmatter.date);
              const dateStr = date
                .toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })
                .replace(",", "");
              const isFirst = index === 0;

              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="flex gap-2 rounded px-1 py-0.5 transition-colors hover:bg-t-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-t-accent"
                >
                  <span className="shrink-0 text-t-red">*</span>
                  <span className="shrink-0 text-t-yellow">{hash}</span>
                  <span className="shrink-0 text-t-yellow">
                    (
                    {isFirst && (
                      <>
                        <span className="text-t-cyan">HEAD -&gt;</span>{" "}
                        <span className="text-t-green">main</span>
                        <span className="text-t-yellow">, </span>
                      </>
                    )}
                    {post.frontmatter.tags.map((tag, i) => (
                      <span key={tag}>
                        {i > 0 && <span className="text-t-yellow">, </span>}
                        <span className="text-t-yellow">tag: {tag}</span>
                      </span>
                    ))}
                    )
                  </span>
                  <span className="shrink-0 text-t-muted">{dateStr}</span>
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
