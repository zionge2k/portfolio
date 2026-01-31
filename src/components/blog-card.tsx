import Link from "next/link";
import TagBadge from "@/components/tag-badge";

export default function BlogCard({
  slug,
  title,
  description,
  date,
  tags,
}: {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}) {
  return (
    <article className="space-y-2">
      <Link
        href={`/blog/${slug}`}
        className="rounded text-xl font-semibold text-ctp-text transition-colors hover:text-ctp-mauve focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-mauve"
      >
        {title}
      </Link>
      <p className="line-clamp-2 text-ctp-subtext-1">{description}</p>
      <div className="flex items-center gap-3">
        <time dateTime={date} className="text-sm text-ctp-subtext-0">
          {new Date(date).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </article>
  );
}
