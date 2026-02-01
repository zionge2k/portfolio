import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import CommandBlock from "@/components/command-block";
import { getAllPosts } from "@/lib/blog";
import { GITHUB_USERNAME } from "@/lib/constants";

const GitHubCalendarSection = dynamic(
  () => import("@/components/github-calendar"),
);

const neofetchInfo = [
  { key: "OS", value: "macOS / Linux (Arch Linux)" },
  { key: "Role", value: "Backend Developer" },
  { key: "Lang", value: "Java, Python, TypeScript" },
  { key: "Terminal", value: "Warp" },
  { key: "Shell", value: "zsh" },
  { key: "Editor", value: "VSCode, NeoVim, Claude CLI" },
  { key: "Uptime", value: "반복을 싫어하고 자동화에 집착하는 개발자" },
];

export default function Home() {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Hero — neofetch */}
      <CommandBlock command="neofetch" aria-label="neofetch">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <Image
            src="/images/profile.jpg"
            alt="zion 프로필 사진"
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
            <p>
              <span className="text-t-blue">GitHub</span>
              <span className="text-t-muted">: </span>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded text-t-cyan hover:text-t-br-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-t-accent"
              >
                github.com/{GITHUB_USERNAME}
              </a>
            </p>
          </div>
        </div>
      </CommandBlock>

      {/* GitHub Contributions */}
      <CommandBlock command={`gh contributions --user ${GITHUB_USERNAME}`} aria-label="GitHub 기여">
        <GitHubCalendarSection username={GITHUB_USERNAME} />
      </CommandBlock>

      {/* Recent Posts */}
      <CommandBlock command="ls -lt ~/blog | head -3" aria-label="최근 글">
        {recentPosts.length === 0 ? (
          <p className="text-sm text-t-muted">total 0</p>
        ) : (
          <div className="space-y-1 text-sm">
            <p className="text-t-muted">total {allPosts.length}</p>
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
                  className="flex flex-wrap gap-x-3 gap-y-0.5 rounded px-1 py-0.5 transition-colors hover:bg-t-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-t-accent sm:flex-nowrap"
                >
                  <span className="hidden shrink-0 text-t-subtle sm:inline">-rw-r--r--</span>
                  <span className="shrink-0 text-t-muted">{dateStr}</span>
                  <span className="shrink-0 text-t-cyan">{tags}</span>
                  <span className="w-full truncate text-t-fg sm:w-auto">
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
      </CommandBlock>
    </div>
  );
}
