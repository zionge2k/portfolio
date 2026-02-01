import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import CommandBlock from "@/components/command-block";

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

  const tags = post.frontmatter.tags.map((t) => `[${t}]`).join(" ");

  return (
    <article>
      <CommandBlock as="header" command={`vim ~/blog/${slug}.mdx`} className="mb-8">
        <div className="space-y-1 text-sm">
          <p>
            <span className="text-t-blue">title</span>
            <span className="text-t-muted">{": "}</span>
            <span className="font-semibold text-t-fg">
              {post.frontmatter.title}
            </span>
          </p>
          <p>
            <span className="text-t-blue">date</span>
            <span className="text-t-muted">{":  "}</span>
            <time dateTime={post.frontmatter.date} className="text-t-fg">
              {new Date(post.frontmatter.date).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </p>
          <p>
            <span className="text-t-blue">tags</span>
            <span className="text-t-muted">{":  "}</span>
            <span className="text-t-cyan">{tags}</span>
          </p>
          <p className="text-t-border" aria-hidden="true">───────────────────────────</p>
        </div>
      </CommandBlock>
      <div className="prose prose-lg max-w-none font-mono">
        <MDXContent />
      </div>
    </article>
  );
}
