import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import Prompt from "@/components/prompt";
import { getAllPosts } from "@/lib/blog";
import { GITHUB_USERNAME } from "@/lib/constants";

const GitHubCalendarSection = dynamic(
  () => import("@/components/github-calendar"),
);

const neofetchInfo = [
  { key: "OS", value: "macOS / Linux (Arch Linux)" },
  { key: "Role", value: "Backend Developer" },
  { key: "Lang", value: "Java, Python, TypeScript" },
  { key: "Editor", value: "VSCode, NeoVim, Claude CLI" },
  { key: "Uptime", value: "반복을 싫어하고 자동화에 집착하는 개발자" },
];

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <div className="space-y-10">
      {/* Hero — neofetch */}
      <section>
        <Prompt command="neofetch" />
        <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-start">
          <Image
            src="/images/profile.jpg"
            alt="이성 프로필 사진"
            width={120}
            height={120}
            className="shrink-0 rounded-lg"
            priority
          />
          <div className="min-w-0 space-y-1 text-sm">
            <p className="font-semibold text-t-fg">
              zion<span className="text-t-muted">@</span>portfolio
            </p>
            <p className="text-t-border" aria-hidden="true">─────────────────</p>
            {neofetchInfo.map(({ key, value }) => (
              <p key={key}>
                <span className="text-t-blue">{key}</span>
                <span className="text-t-muted">: </span>
                <span className="text-t-fg">{value}</span>
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Contributions */}
      <section>
        <Prompt command={`gh contributions --user ${GITHUB_USERNAME}`} />
        <div className="mt-4">
          <GitHubCalendarSection username={GITHUB_USERNAME} />
        </div>
      </section>

      {/* Recent Posts */}
      <section>
        <Prompt command="ls -la ~/blog/recent" />
        <div className="mt-4">
          {recentPosts.length === 0 ? (
            <p className="text-sm text-t-muted">total 0</p>
          ) : (
            <div className="space-y-1 text-sm">
              <p className="text-t-muted">total {recentPosts.length}</p>
              {recentPosts.map((post) => {
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
          <div className="mt-3">
            <Link
              href="/blog"
              className="rounded text-sm text-t-blue hover:text-t-br-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-t-accent"
            >
              $ cd ~/blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
