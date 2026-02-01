import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, slugToHash } from "@/lib/blog";
import CommandBlock from "@/components/command-block";

export const metadata: Metadata = {
  title: "Blog | 이성",
  description: "개발 블로그 — 프로젝트, 회고, TIL",
};

export default async function BlogPage() {
  const posts = getAllPosts();

  return (
    <CommandBlock command="git log --oneline --decorate">
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
                className="block rounded px-1 py-1 transition-colors hover:bg-t-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-t-accent"
              >
                <span className="flex gap-2">
                  <span className="shrink-0 text-t-red">*</span>
                  <span className="shrink-0 text-t-yellow">{hash}</span>
                  <span className="min-w-0 truncate text-t-yellow">
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
                        <span className="text-t-yellow">{i === 0 ? `tag: ${tag}` : tag}</span>
                      </span>
                    ))}
                    )
                  </span>
                  <span className="hidden shrink-0 text-t-muted sm:inline">{dateStr}</span>
                </span>
                <span className="ml-7 block truncate text-t-fg">
                  {post.frontmatter.title}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </CommandBlock>
  );
}
