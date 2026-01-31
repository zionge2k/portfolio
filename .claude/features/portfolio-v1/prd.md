# Portfolio V1 PRD

## 개요

취업 및 개인 브랜딩을 위한 포트폴리오 웹사이트의 초기 버전.
채용담당자, 기술 리드, 일반 방문자를 대상으로 경력과 기술을 효과적으로 전달한다.

## 배경 (Why)

- 개발자로서의 역량과 관심 분야를 한눈에 보여줄 공간이 필요하다
- GitHub 활동을 시각적으로 보여주어 꾸준한 개발 습관을 어필한다
- 블로그를 통해 학습 기록과 프로젝트 경험을 공유한다

## 타겟 사용자

| 사용자 | 목적 | 핵심 관심사 |
|--------|------|------------|
| 채용담당자 | 지원자 평가 | 경력, 기술스택, 활동량 |
| 기술 리드 | 기술 역량 확인 | 코드 품질, 기술 깊이, 블로그 글 |
| 일반 방문자 | 정보 탐색 | 누구인지, 무엇을 하는지 |

## 기능 요구사항

### 페이지 구성

#### 1. 메인 페이지 (`/`)

세 개의 섹션으로 구성한다:

**Hero 섹션**
- 프로필 사진
- Tagline (한 줄 소개)
- 간단한 자기소개
- 소셜 링크 (GitHub, LinkedIn, Email 등)

**GitHub Contributions 섹션**
- GitHub 잔디(Contributions Graph)를 표시한다
- Catppuccin Latte 색상 팔레트에 맞게 스타일링한다

**최근 블로그 글 섹션**
- 최근 작성한 블로그 글 목록을 표시한다
- 블로그 페이지로의 링크를 제공한다

#### 2. About 페이지 (`/about`)

- 경력 (Career)
- 기술 스택 (Tech Stack)
- 관심 분야 (Interests)
- 현재 하고 있는 것 (Now)
- 프로필 사진
- 연락처 / 소셜 링크

#### 3. Blog 페이지 (`/blog`)

**목록 페이지 (`/blog`)**
- 블로그 글 목록을 표시한다
- 태그/뱃지 기반으로 카테고리를 분류한다
- 주요 카테고리: 프로젝트 기록, 회고, TIL

**상세 페이지 (`/blog/[slug]`)**
- MDX로 작성된 블로그 글을 렌더링한다
- 태그/뱃지를 표시한다

### 콘텐츠 관리

- 블로그 글은 MDX 파일로 관리한다
- 추후 CMS 연동을 고려하여 콘텐츠 레이어를 분리 가능하게 설계한다

## 비기능 요구사항

### 디자인

- **디자인 레퍼런스**: [catppuccin.com](https://catppuccin.com/) 공식 사이트
- **테마**: Light 모드 전용 (다크 모드 미지원)
- **색상**: Catppuccin Latte 팔레트
  - Base: `#eff1f5` (배경)
  - Text: `#4c4f69` (본문)
  - Subtext: `#5c5f77`, `#6c6f85`
  - Surface: `#ccd0da`, `#bcc0cc`, `#acb0be` (카드, 보더)
  - Accent: Mauve `#8839ef`, Blue `#1e66f5`, Sapphire `#209fb5`
  - 기타: 전체 팔레트는 [catppuccin.com/palette](https://catppuccin.com/palette/) 참조
- **디자인 키워드**: 미니멀, 클린 타이포그래피, 넉넉한 여백, 라운드 코너, 소프트 섀도우, 파스텔 액센트
- **폰트**:
  - 한글: Pretendard
  - 영문: Inter
- **스타일링**: Tailwind CSS (커스텀 구현)

### 기술 스택

- **프레임워크**: Next.js (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **콘텐츠**: MDX
- **배포**: Vercel (예정)

### 성능

- Lighthouse Performance 90+ 목표
- 웹폰트 최적화 (font-display: swap)
- 이미지 최적화 (next/image)

### 접근성

- 시맨틱 HTML
- 적절한 색상 대비 (WCAG 2.1 AA 기준)
- 키보드 내비게이션 지원

## 범위 (Scope)

### In Scope (V1)

- 메인 페이지 (Hero + GitHub 잔디 + 최근 블로그)
- About 페이지
- Blog 목록 + 상세 페이지
- MDX 기반 블로그 시스템
- 반응형 디자인 (모바일/태블릿/데스크톱)

### Out of Scope (추후 기획)

- 다크 모드
- Projects 페이지
- Resume/CV 페이지
- CMS 연동
- 검색 기능
- 댓글 시스템
- RSS 피드
- SEO 고도화 (sitemap, OG 이미지 등)
- 다국어 지원
