import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/blog-card";

export const metadata: Metadata = {
  title: "Blog | 이성",
  description: "개발 블로그 — 프로젝트, 회고, TIL",
};

export default async function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-ctp-text">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-ctp-subtext-1">아직 게시된 글이 없습니다.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              title={post.frontmatter.title}
              description={post.frontmatter.description}
              date={post.frontmatter.date}
              tags={post.frontmatter.tags}
            />
          ))}
        </div>
      )}
    </div>
  );
}
