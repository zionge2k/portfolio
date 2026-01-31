import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import TagBadge from "@/components/tag-badge";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.frontmatter.title} | 이성`,
    description: post.frontmatter.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { default: MDXContent } = await import(
    `../../../../content/blog/${slug}.mdx`
  );

  return (
    <article>
      <header className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold text-ctp-text text-wrap-balance">
          {post.frontmatter.title}
        </h1>
        <div className="flex items-center gap-3">
          <time
            dateTime={post.frontmatter.date}
            className="text-sm text-ctp-subtext-0"
          >
            {new Date(post.frontmatter.date).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <div className="flex gap-2">
            {post.frontmatter.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </header>
      <div className="prose prose-lg max-w-none">
        <MDXContent />
      </div>
    </article>
  );
}
