# ~/blog → ~/log 리네이밍 + 카테고리 필터 구현 Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 포트폴리오의 blog 섹션을 log로 리네이밍하고, git branch 메타포 기반 카테고리 필터를 추가한다.

**Architecture:** 라우트를 `/blog` → `/log`로 변경하되 내부 콘텐츠 디렉토리(`content/blog/`)는 유지. Frontmatter에 `category` 필드를 추가하고, log 목록 페이지에 searchParams 기반 카테고리 필터 탭(git branch 스타일)을 구현한다. 포트폴리오에 테스트 프레임워크가 없으므로 `pnpm build` 성공 여부로 검증한다.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, MDX

---

## File Structure

| 파일 | 변경 | 역할 |
|------|------|------|
| `src/app/log/page.tsx` | Create (blog/page.tsx 이동) | log 목록 페이지 + 카테고리 필터 |
| `src/app/log/[slug]/page.tsx` | Create (blog/[slug]/page.tsx 이동) | log 상세 페이지 |
| `src/app/blog/` | Delete | 기존 라우트 제거 |
| `src/types/blog.ts` | Modify | `category` 필드 추가 |
| `src/lib/blog.ts` | Modify | 카테고리별 필터 함수 추가 |
| `src/components/nav.tsx` | Modify | `~/blog` → `~/log` |
| `src/components/footer.tsx` | Modify | SHELL_HISTORY 경로 변경 |
| `src/components/blog-card.tsx` | Modify | 링크 `/blog/` → `/log/` |
| `src/app/page.tsx` | Modify | 홈 페이지 링크/커맨드 텍스트 변경 |
| `content/blog/*.mdx` | Modify | 기존 글에 `category` 필드 추가 |

---

## Phase 1: 라우트 리네이밍 (blog → log)

### Task 1: 라우트 디렉토리 이동

**Files:**
- Create: `src/app/log/page.tsx`
- Create: `src/app/log/[slug]/page.tsx`
- Delete: `src/app/blog/page.tsx`
- Delete: `src/app/blog/[slug]/page.tsx`

- [ ] **Step 1: git 브랜치 생성**

```bash
cd /Users/iseong/projects/portfolio
git checkout -b feat/blog-to-log-with-categories
```

- [ ] **Step 2: 라우트 디렉토리 이동**

```bash
cd /Users/iseong/projects/portfolio
mkdir -p src/app/log
git mv src/app/blog/page.tsx src/app/log/page.tsx
git mv src/app/blog/\[slug\] src/app/log/\[slug\]
```

- [ ] **Step 3: log/page.tsx 메타데이터 및 커맨드 텍스트 수정**

`src/app/log/page.tsx` 에서:
```typescript
// Before
export const metadata: Metadata = {
  title: "Blog | 이성",
  description: "개발 블로그 — 프로젝트, 회고, TIL",
};
// After
export const metadata: Metadata = {
  title: "Log | 이성",
  description: "개발, 설계, 제품, AI — Builder의 기록",
};

// Before
<CommandBlock command="git log --oneline --decorate">
// After
<CommandBlock command="git log --oneline --all --decorate">
```

- [ ] **Step 4: log/[slug]/page.tsx 커맨드 텍스트 수정**

`src/app/log/[slug]/page.tsx` 에서:
```typescript
// Before
<CommandBlock as="header" command={`vim ~/blog/${slug}.mdx`} className="mb-8">
// After
<CommandBlock as="header" command={`vim ~/log/${slug}.mdx`} className="mb-8">
```

- [ ] **Step 5: 빌드 확인**

```bash
cd /Users/iseong/projects/portfolio && pnpm build
```
Expected: 빌드 성공. `/log` 라우트 생성 확인.

- [ ] **Step 6: 커밋**

```bash
git add -A && git commit -m "refactor: blog 라우트를 log로 리네이밍"
```

---

### Task 2: 네비게이션 및 링크 업데이트

**Files:**
- Modify: `src/components/nav.tsx`
- Modify: `src/components/footer.tsx`
- Modify: `src/components/blog-card.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: nav.tsx 수정**

```typescript
// Before
const tabs = [
  { href: "/", label: "~/home" },
  { href: "/about", label: "~/about" },
  { href: "/blog", label: "~/blog" },
];
// After
const tabs = [
  { href: "/", label: "~/home" },
  { href: "/about", label: "~/about" },
  { href: "/log", label: "~/log" },
];
```

- [ ] **Step 2: footer.tsx 수정**

```typescript
// Before
const SHELL_HISTORY = [
  { command: "cd ~", path: "/" },
  { command: "cd ~/about", path: "/about" },
  { command: "cd ~/blog", path: "/blog" },
];
// After
const SHELL_HISTORY = [
  { command: "cd ~", path: "/" },
  { command: "cd ~/about", path: "/about" },
  { command: "cd ~/log", path: "/log" },
];
```

- [ ] **Step 3: blog-card.tsx 수정**

```typescript
// Before
href={`/blog/${slug}`}
// After
href={`/log/${slug}`}
```

- [ ] **Step 4: page.tsx (홈) 수정**

```typescript
// Before
<CommandBlock command="ls -lt ~/blog | head -3" aria-label="최근 글">
// After
<CommandBlock command="ls -lt ~/log | head -3" aria-label="최근 글">

// Before
<Link href="/blog" ...>$ cd ~/blog</Link>
// After
<Link href="/log" ...>$ cd ~/log</Link>
```

- [ ] **Step 5: 빌드 확인**

```bash
cd /Users/iseong/projects/portfolio && pnpm build
```
Expected: 빌드 성공. 모든 링크가 `/log`로 변경됨.

- [ ] **Step 6: 커밋**

```bash
git add -A && git commit -m "refactor: 네비게이션/링크를 blog에서 log로 업데이트"
```

---

## Phase 2: 카테고리 시스템 추가

### Task 3: Frontmatter 타입 및 데이터 레이어 확장

**Files:**
- Modify: `src/types/blog.ts`
- Modify: `src/lib/blog.ts`

- [ ] **Step 1: Category 타입 정의**

`src/types/blog.ts`:
```typescript
export const CATEGORIES = ["dev", "design", "product", "ai-tools"] as const;
export type Category = (typeof CATEGORIES)[number];

export interface Frontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: Category;
  published: boolean;
}

export interface Post {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
}
```

- [ ] **Step 2: blog.ts에 카테고리 필터 함수 추가**

`src/lib/blog.ts` — `getAllPosts` 아래에 추가:
```typescript
import type { Category } from "@/types/blog";

export const getPostsByCategory = cache(function getPostsByCategory(
  category: Category,
): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.category === category);
});

export function getCategories(): { name: Category; count: number }[] {
  const posts = getAllPosts();
  const counts = new Map<Category, number>();
  for (const post of posts) {
    const cat = post.frontmatter.category;
    counts.set(cat, (counts.get(cat) ?? 0) + 1);
  }
  return Array.from(counts.entries()).map(([name, count]) => ({ name, count }));
}
```

- [ ] **Step 3: 커밋**

```bash
git add -A && git commit -m "feat: category 타입 및 필터 함수 추가"
```

---

### Task 4: 기존 글에 category 필드 추가

**Files:**
- Modify: `content/blog/*.mdx` (모든 기존 글)

- [ ] **Step 1: 기존 13개 글에 category 필드 추가**

분류 기준:
| 파일 | category |
|------|----------|
| `2026-01-25-nextjs-usesearchparams-suspense.mdx` | `dev` |
| `2026-01-25-react-hook-form-usefieldarray-trigger.mdx` | `dev` |
| `2026-01-27-docker-api-version-compatibility.mdx` | `dev` |
| `2026-01-27-gitlab-runner-socket-binding.mdx` | `dev` |
| `2026-01-29-spring-mvc-path-variable-regex.mdx` | `dev` |
| `2026-02-01-seo-fundamentals.mdx` | `product` |
| `2026-02-02-geo-fundamentals.mdx` | `product` |
| `2026-02-02-geo-nextjs-implementation.mdx` | `dev` |
| `2026-02-02-seo-jsonld-core-web-vitals.mdx` | `dev` |
| `2026-02-02-seo-nextjs-metadata.mdx` | `dev` |
| `2026-02-05-claudemd-modification-strategy.mdx` | `ai-tools` |
| `2026-02-06-claude-code-agent-teams-prompt-guide.mdx` | `ai-tools` |
| `hello-world.mdx` | `dev` |

각 파일의 frontmatter `tags:` 줄 아래에 `category: "dev"` (해당 값) 추가.

예시:
```yaml
---
title: "Next.js에서 useSearchParams 쓰면 Suspense 필수"
description: "..."
date: "2026-01-25"
tags: ["nextjs", "react", "suspense"]
category: "dev"
published: true
---
```

- [ ] **Step 2: 빌드 확인**

```bash
cd /Users/iseong/projects/portfolio && pnpm build
```
Expected: 빌드 성공.

- [ ] **Step 3: 커밋**

```bash
git add -A && git commit -m "feat: 기존 글에 category 필드 추가"
```

---

### Task 5: 카테고리 필터 UI 구현 (git branch 탭)

**Files:**
- Modify: `src/app/log/page.tsx`

- [ ] **Step 1: log/page.tsx에 카테고리 필터 구현**

`src/app/log/page.tsx` 전체 교체:
```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getPostsByCategory, slugToHash } from "@/lib/blog";
import { CATEGORIES, type Category } from "@/types/blog";
import CommandBlock from "@/components/command-block";

export const metadata: Metadata = {
  title: "Log | 이성",
  description: "개발, 설계, 제품, AI — Builder의 기록",
};

const CATEGORY_LABELS: Record<Category, string> = {
  dev: "dev",
  design: "design",
  product: "product",
  "ai-tools": "ai-tools",
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
            {CATEGORY_LABELS[cat]}
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
```

- [ ] **Step 2: 빌드 확인**

```bash
cd /Users/iseong/projects/portfolio && pnpm build
```
Expected: 빌드 성공. `/log` 페이지에 브랜치 탭 표시.

- [ ] **Step 3: dev 서버에서 시각적 확인**

```bash
cd /Users/iseong/projects/portfolio && pnpm dev
```
확인 사항:
- `/log` — 전체 글 표시, `* main` 탭 활성
- `/log?branch=dev` — dev 카테고리만 표시
- `/log?branch=ai-tools` — ai-tools 카테고리만 표시
- 브랜치 탭 클릭 시 명령어 텍스트 변경 (`git log --oneline origin/dev`)

- [ ] **Step 4: 커밋**

```bash
git add -A && git commit -m "feat: git branch 스타일 카테고리 필터 UI 구현"
```

---

### Task 6: /blog → /log 리다이렉트 (SEO)

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: next.config.ts에 리다이렉트 추가**

```typescript
const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/log",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/log/:slug",
        permanent: true,
      },
    ];
  },
};
```

- [ ] **Step 2: 빌드 확인**

```bash
cd /Users/iseong/projects/portfolio && pnpm build
```

- [ ] **Step 3: 커밋**

```bash
git add -A && git commit -m "feat: /blog → /log 영구 리다이렉트 추가"
```

---

## 최종 검증

- [ ] `pnpm build` 성공
- [ ] `/log` 페이지: 전체 글 표시 + 브랜치 탭
- [ ] `/log?branch=dev` 필터링 동작
- [ ] `/log/[slug]` 상세 페이지 정상
- [ ] `/blog` 접속 시 `/log`로 301 리다이렉트
- [ ] 홈 페이지 최근 글 링크 `/log/...`
- [ ] 네비게이션 `~/log` 표시 및 동작
- [ ] Footer 셸 히스토리 `cd ~/log` 동작

---

## 향후 작업 (이 플랜 범위 외)

- Obsidian vault → portfolio MDX 변환 파이프라인 (별도 플랜)
- 카테고리별 색상 분화 (현재는 모두 yellow)
- 시리즈(series) 그룹핑 기능
