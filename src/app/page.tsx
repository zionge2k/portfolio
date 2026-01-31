import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import SocialLinks from "@/components/social-links";
import BlogCard from "@/components/blog-card";

const GitHubCalendarSection = dynamic(
  () => import("@/components/github-calendar"),
);
import { getAllPosts } from "@/lib/blog";
import { GITHUB_USERNAME } from "@/lib/constants";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="space-y-6">
        <div className="flex items-start gap-6">
          <Image
            src="/images/profile.jpg"
            alt="이성 프로필 사진"
            width={96}
            height={96}
            className="rounded-full"
            priority
          />
          <div className="min-w-0 space-y-2">
            <h1 className="text-3xl font-bold text-ctp-text text-wrap-balance">이성</h1>
            <p className="text-lg text-ctp-subtext-1">Backend Developer</p>
          </div>
        </div>
        <p className="text-ctp-subtext-1 leading-relaxed">
          문제의 본질을 파악해 근본적인 해결책을 찾는 백엔드 개발자입니다.
          효율과 구조화를 중시하며, 이 공간에서 개발 여정과 배움을 기록합니다.
        </p>
        <SocialLinks />
      </section>

      {/* GitHub Contributions */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-ctp-text">
          GitHub Contributions
        </h2>
        <GitHubCalendarSection username={GITHUB_USERNAME} />
      </section>

      {/* Recent Posts */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-ctp-text">Recent Posts</h2>
          <Link
            href="/blog"
            className="text-sm text-ctp-subtext-1 transition-colors hover:text-ctp-mauve"
          >
            모든 글 보기 &rarr;
          </Link>
        </div>
        {recentPosts.length === 0 ? (
          <p className="text-ctp-subtext-1">아직 게시된 글이 없습니다.</p>
        ) : (
          <div className="space-y-8">
            {recentPosts.map((post) => (
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
      </section>
    </div>
  );
}
