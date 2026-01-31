# Portfolio V1 Spec

## 설계 결정

### 왜 @next/mdx인가?

블로그 콘텐츠 관리에 `@next/mdx`를 사용한다.

- **`next-mdx-remote` 대비 장점**: Next.js 공식 패키지로 안정적이며, RSC(React Server Components)와의 호환이 검증되어 있다. MDX 파일 내에서 import/export를 사용할 수 있고, 클라이언트 번들 사이즈가 최소화된다.
- **`next-mdx-remote`의 한계**: 2025년 기준 유지보수가 활발하지 않고, RSC 지원이 unstable로 표기되어 있다. MDX 내부에서 import/export를 지원하지 않는다.
- **CMS 마이그레이션 고려**: 콘텐츠를 `content/blog/`에 분리하여 관리한다. 추후 CMS로 전환할 때는 데이터 페칭 레이어만 교체하면 되도록 컴포넌트와 콘텐츠를 분리한다. CMS 전환 시점에 `next-mdx-remote-client`를 도입하면 된다.

### 왜 content/ 디렉토리를 프로젝트 루트에 두는가?

MDX 콘텐츠 파일을 `src/` 밖의 `content/blog/`에 배치한다.

- `src/`는 애플리케이션 코드(컴포넌트, 유틸리티, 라우팅)를 위한 공간이다. 콘텐츠는 애플리케이션 코드가 아니라 데이터다.
- 콘텐츠 디렉토리가 명확히 분리되어 있으면, CMS 마이그레이션 시 교체 범위가 명확하다.
- `@next/mdx`는 프로젝트 내 어디서든 MDX 파일을 import할 수 있으므로 위치 제약이 없다.

### 왜 react-github-calendar인가?

GitHub Contributions Graph에 `react-github-calendar`을 사용한다.

- GitHub 잔디 표시용 React 컴포넌트 중 가장 많은 사용량(622+ stars)과 활발한 유지보수를 보인다.
- SSR을 지원하고, 커스텀 테마(색상)를 적용할 수 있어 Catppuccin Latte 팔레트에 맞출 수 있다.
- 내부적으로 `react-activity-calendar`를 사용하며, GitHub API 토큰 없이도 공개 프로필의 잔디를 가져올 수 있다(Gruber Contributions API 활용).
- 단, Client Component(`"use client"`)로 사용해야 한다. 메인 페이지에서 이 컴포넌트만 클라이언트로 분리한다.

### 왜 Pretendard는 next/font/local인가?

- Pretendard는 Google Fonts에 등록되어 있지 않으므로 `next/font/local`로 로드한다.
- Variable Font(PretendardVariable.woff2) 단일 파일로 모든 굵기를 커버하여 네트워크 요청을 최소화한다.
- `pretendard` npm 패키지에서 woff2 파일을 참조하면 저장소에 폰트 바이너리를 넣지 않아도 된다.
- Inter는 Google Fonts에 등록되어 있으므로 `next/font/google`을 사용한다.

### 왜 Tailwind CSS 4 @theme인가?

Catppuccin Latte 팔레트를 Tailwind CSS 4의 `@theme inline` 디렉티브로 정의한다.

- 프로젝트가 이미 Tailwind CSS 4를 사용 중이며, `@theme` 디렉티브가 별도의 config 파일 없이 CSS에서 직접 테마를 정의하는 공식 방법이다.
- CSS Custom Properties로 정의되므로 런타임에서도 접근 가능하고, `react-github-calendar` 등 외부 컴포넌트의 스타일링에도 활용할 수 있다.

### 왜 Light 모드 전용인가?

- V1의 범위를 줄여 빠르게 배포하기 위한 의도적 선택이다.
- Catppuccin Latte는 라이트 테마 전용 팔레트이므로, 다크 모드를 추가하려면 별도 팔레트(Mocha/Macchiato 등)를 추가 설계해야 한다. 이는 V1 범위를 넘는다.
- `prefers-color-scheme` 미디어 쿼리를 제거하고 Light 모드로 고정한다.

---

## 구현 계획

### 프로젝트 구조

```
portfolio/
├── content/
│   └── blog/                    # MDX 블로그 글
│       ├── hello-world.mdx
│       └── ...
├── public/
│   └── images/                  # 정적 이미지 (프로필 사진 등)
├── src/
│   ├── app/
│   │   ├── layout.tsx           # 루트 레이아웃 (폰트, 메타데이터, 네비게이션)
│   │   ├── page.tsx             # 메인 페이지 (Hero + 잔디 + 최근 글)
│   │   ├── about/
│   │   │   └── page.tsx         # About 페이지
│   │   └── blog/
│   │       ├── page.tsx         # 블로그 목록
│   │       └── [slug]/
│   │           └── page.tsx     # 블로그 상세
│   ├── components/
│   │   ├── nav.tsx              # 네비게이션
│   │   ├── footer.tsx           # 푸터
│   │   ├── github-calendar.tsx  # GitHub 잔디 (Client Component)
│   │   ├── blog-card.tsx        # 블로그 카드
│   │   ├── tag-badge.tsx        # 태그 뱃지
│   │   └── social-links.tsx     # 소셜 링크
│   ├── lib/
│   │   └── blog.ts              # MDX 파일 읽기, 메타데이터 파싱 유틸리티
│   └── types/
│       └── blog.ts              # 블로그 관련 타입 (Post, Frontmatter 등)
└── mdx-components.tsx           # MDX 커스텀 컴포넌트 매핑 (프로젝트 루트)
```

### MDX 블로그 Frontmatter 구조

```yaml
---
title: "글 제목"
description: "글 요약"
date: "2026-01-31"
tags: ["프로젝트", "Next.js"]
published: true
---
```

- `published: false`인 글은 목록에서 제외한다.
- `date` 기준 내림차순으로 정렬한다.
- `tags`는 문자열 배열로, 뱃지 형태로 렌더링한다.

### 블로그 데이터 흐름

```
content/blog/*.mdx
       ↓
  src/lib/blog.ts        ← fs로 MDX 파일 목록/메타데이터 읽기
       ↓
  app/blog/page.tsx      ← 목록 렌더링 (Server Component)
  app/blog/[slug]/page.tsx ← 상세 렌더링 (Server Component + MDX)
```

- `src/lib/blog.ts`가 콘텐츠 접근의 단일 진입점이다. CMS 전환 시 이 파일만 교체한다.
- 정적 빌드를 위해 `generateStaticParams`로 모든 slug를 미리 생성한다.

### Catppuccin Latte 테마 설정

`globals.css`에서 `@theme inline`으로 전체 팔레트를 정의한다:

```css
@import "tailwindcss";

@theme inline {
  /* Catppuccin Latte - Base Colors */
  --color-ctp-base: #eff1f5;
  --color-ctp-mantle: #e6e9ef;
  --color-ctp-crust: #dce0e8;

  /* Catppuccin Latte - Surface */
  --color-ctp-surface-0: #ccd0da;
  --color-ctp-surface-1: #bcc0cc;
  --color-ctp-surface-2: #acb0be;

  /* Catppuccin Latte - Text */
  --color-ctp-text: #4c4f69;
  --color-ctp-subtext-1: #5c5f77;
  --color-ctp-subtext-0: #6c6f85;
  --color-ctp-overlay-2: #7c7f93;
  --color-ctp-overlay-1: #8c8fa1;
  --color-ctp-overlay-0: #9ca0b0;

  /* Catppuccin Latte - Accent */
  --color-ctp-rosewater: #dc8a78;
  --color-ctp-flamingo: #dd7878;
  --color-ctp-pink: #ea76cb;
  --color-ctp-mauve: #8839ef;
  --color-ctp-red: #d20f39;
  --color-ctp-maroon: #e64553;
  --color-ctp-peach: #fe640b;
  --color-ctp-yellow: #df8e1d;
  --color-ctp-green: #40a02b;
  --color-ctp-teal: #179299;
  --color-ctp-sky: #04a5e5;
  --color-ctp-sapphire: #209fb5;
  --color-ctp-blue: #1e66f5;
  --color-ctp-lavender: #7287fd;

  /* Font */
  --font-sans: var(--font-pretendard), var(--font-inter), system-ui, sans-serif;
}
```

Tailwind 클래스로 `bg-ctp-base`, `text-ctp-text`, `text-ctp-mauve` 등으로 사용한다.

### 폰트 설정

```tsx
// src/app/layout.tsx
import localFont from "next/font/local";
import { Inter } from "next/font/google";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
```

- Pretendard가 먼저 매칭되고, 라틴 문자에서 Inter가 폴백으로 동작한다.
- `src/fonts/` 디렉토리에 PretendardVariable.woff2를 배치한다. `pretendard` npm 패키지에서 복사하거나, GitHub 릴리스에서 다운로드한다.

### 컴포넌트 설계 원칙

- **기본은 Server Component**: 데이터 페칭과 정적 렌더링은 서버에서 처리한다.
- **Client Component 최소화**: `"use client"`는 인터랙션이 필요한 컴포넌트에만 사용한다.
  - `github-calendar.tsx`: 외부 라이브러리가 클라이언트 전용
  - 태그 필터링 등 사용자 인터랙션이 있는 부분
- **Composition 패턴**: Agent Skills의 Composition Patterns를 따라 boolean prop 남용을 피하고, children 합성을 활용한다.

### 반응형 브레이크포인트

Tailwind 기본 브레이크포인트를 사용한다:

| 브레이크포인트 | 최소 너비 | 용도 |
|--------------|----------|------|
| `sm` | 640px | 모바일 → 태블릿 전환 |
| `md` | 768px | 태블릿 |
| `lg` | 1024px | 데스크톱 |

최대 콘텐츠 너비는 `max-w-3xl` (768px) 또는 `max-w-4xl` (896px)로 제한하여 가독성을 유지한다.

### 필요한 패키지

```
@next/mdx @mdx-js/loader @mdx-js/react @types/mdx
react-github-calendar
pretendard
@tailwindcss/typography
```

- `@tailwindcss/typography`: MDX 렌더링 시 `prose` 클래스로 타이포그래피 스타일 적용

---

## 구현 노트

### remark-frontmatter 추가 (계획 외)

`@next/mdx`로 MDX를 동적 import할 때 frontmatter YAML이 그대로 렌더링되는 문제 발생.
`remark-frontmatter` 플러그인을 추가하여 빌드 시 frontmatter를 파싱 단계에서 제거.
`next.config.ts`에서 플러그인을 직접 import하면 직렬화 오류가 발생하므로 문자열 형태(`["remark-frontmatter"]`)로 지정.

### react-github-calendar named export

`react-github-calendar` v5는 default export가 아닌 named export(`{ GitHubCalendar }`)를 사용.

### 프로필 이미지 placeholder

`/public/images/profile.jpg`는 아직 실제 이미지가 없음. 사용자가 직접 추가해야 함.
Next.js Image 컴포넌트는 빌드 시 이미지 존재 여부를 검증하지 않으므로 빌드는 통과.

### 소셜 링크 placeholder

`src/lib/constants.ts`의 GitHub, LinkedIn, Email URL은 placeholder. 사용자가 실제 값으로 교체 필요.

---

## 코드 리뷰 결과

3개 스킬 기반으로 전체 구현을 리뷰하고 수정 완료.

### Web Design Guidelines

접근성, 포커스, 타이포그래피, 콘텐츠 오버플로우, 테마 관련 13건 발견 후 수정.

| 카테고리 | 수정 내용 |
|----------|-----------|
| Accessibility | 장식용 Lucide 아이콘 17개에 `aria-hidden="true"` 추가 |
| Focus States | 모든 인터랙티브 링크에 `focus-visible:ring-2 ring-ctp-mauve` 적용 (nav, social-links, blog-card, mdx `<a>`) |
| Typography | 모든 h1, h2에 `text-wrap-balance` 적용 |
| Content Overflow | flex 자식에 `min-w-0` 추가 (page, about), blog-card 설명에 `line-clamp-2` 적용 |
| Theming | `layout.tsx`에 `<meta name="theme-color" content="#eff1f5">` 추가 |
| Dead Code | 미사용 `LinkedInIcon` 컴포넌트 및 iconMap 항목 제거 |

### React Best Practices (Vercel)

번들 최적화, 서버 성능 관련 2건 수정, 1건 확인.

| 우선순위 | 규칙 | 수정 내용 |
|----------|------|-----------|
| CRITICAL | `bundle-dynamic-imports` | `GitHubCalendarSection`을 `next/dynamic`으로 lazy-load하여 초기 번들에서 분리 |
| HIGH | `server-cache-react` | `getPostBySlug`를 `React.cache()`로 감싸 `generateMetadata` + page 렌더링 간 중복 호출 제거 |
| CRITICAL | `bundle-barrel-imports` | `react-icons/lu`는 개별 파일 미제공이나 `sideEffects: false` 설정으로 tree-shaking 동작 확인 — 변경 불필요 |

### Composition Patterns (Vercel)

8개 규칙 전체 통과. 위반 사항 0건.

- boolean prop 남용 없음 — 모든 컴포넌트가 primitive props 또는 children 사용
- `renderX` props 미사용 — children 합성 패턴 준수
- `forwardRef` 미사용 — React 19 API 준수
- Context/state 관련 규칙은 해당 없음 — Client Component가 `github-calendar.tsx` 1개뿐이며 로컬 state 없음
