import Link from "next/link";

export default function BlogCard({
  slug,
  title,
  date,
  tags,
}: {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}) {
  const dateStr = new Date(date)
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    })
    .replace(",", "");
  const tagStr = tags.map((t) => `[${t}]`).join(" ");

  return (
    <Link
      href={`/blog/${slug}`}
      className="flex gap-3 rounded px-1 py-0.5 text-sm transition-colors hover:bg-t-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-t-accent"
    >
      <span className="shrink-0 text-t-subtle">-rw-r--r--</span>
      <span className="shrink-0 text-t-muted">{dateStr}</span>
      <span className="shrink-0 text-t-cyan">{tagStr}</span>
      <span className="min-w-0 truncate text-t-fg">{title}</span>
    </Link>
  );
}
