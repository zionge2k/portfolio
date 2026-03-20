import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getPostsByCategory, slugToHash } from "@/lib/blog";
import { CATEGORIES, type Category } from "@/types/blog";
import CommandBlock from "@/components/command-block";

export const metadata: Metadata = {
  title: "Log | 이성",
  description: "개발, 설계, 제품, AI — Builder의 기록",
};

export default async function LogPage({
  searchParams,
}: {
  searchParams: Promise<{ branch?: string }>;
}) {
  const { branch } = await searchParams;
  const activeCategory = CATEGORIES.includes(branch as Category)
    ? (branch as Category)
    : null;

  const posts = activeCategory
    ? getPostsByCategory(activeCategory)
    : getAllPosts();

  const command = activeCategory
    ? `git log --oneline origin/${activeCategory}`
    : "git log --oneline --all --decorate";

  return (
    <div className="space-y-4">
      {/* Branch tabs */}
      <div className="flex flex-wrap gap-2 text-xs">
        <Link
          href="/log"
          className={`rounded px-2 py-1 transition-colors ${
            !activeCategory
              ? "bg-t-green/20 text-t-green"
              : "text-t-muted hover:text-t-fg"
          }`}
        >
          * main
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/log?branch=${cat}`}
            className={`rounded px-2 py-1 transition-colors ${
              activeCategory === cat
                ? "bg-t-yellow/20 text-t-yellow"
                : "text-t-muted hover:text-t-fg"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Post list */}
      <CommandBlock command={command}>
        {posts.length === 0 ? (
          <p className="text-sm text-t-red">
            fatal: your current branch does not have any commits yet
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
              const isFirst = index === 0 && !activeCategory;

              return (
                <Link
                  key={post.slug}
                  href={`/log/${post.slug}`}
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
                      <span className="text-t-yellow">
                        {post.frontmatter.category}
                      </span>
                      {post.frontmatter.tags.map((tag) => (
                        <span key={tag}>
                          <span className="text-t-yellow">, </span>
                          <span className="text-t-yellow">{tag}</span>
                        </span>
                      ))}
                      )
                    </span>
                    <span className="hidden shrink-0 text-t-muted sm:inline">
                      {dateStr}
                    </span>
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
    </div>
  );
}
