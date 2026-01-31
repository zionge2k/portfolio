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

**Hero 섹션 (neofetch 스타일)**
- `$ neofetch` 프롬프트 후 프로필 이미지 + key-value 정보 표시
- OS, Role, Lang, Editor, Uptime 항목

**GitHub Contributions 섹션**
- `$ gh contributions --user {username}` 프롬프트
- GitHub 잔디를 green 계열 테마로 표시, border + surface 배경으로 감싸 이질감 감소

**최근 블로그 글 섹션**
- `$ ls -la ~/blog/recent` 프롬프트
- 파일 시스템 목록 스타일: `-rw-r--r-- Jan 31 2026 [tag] title`
- `$ cd ~/blog` 링크로 블로그 페이지 이동

#### 2. About 페이지 (`/about`)

각 섹션을 터미널 명령어 결과로 표현한다:

- **Profile**: `$ vim ~/about/profile.md` — VimBuffer로 이름, Role, Education 표시
- **Career**: `$ vim ~/about/career.md` — VimBuffer로 경력 상세 (줄 번호 포함)
- **Projects**: `$ ls ~/projects` — 파일 시스템 목록, 상세는 `VimToggle`로 토글
- **Tech Stack**: `$ vim ~/.config/tech-stack.yml` — YAML 형식 VimBuffer
- **Education**: `$ vim ~/education/history.log` — VimBuffer로 학력
- **Now**: `$ vim ~/status/now.md` — VimBuffer로 현재 활동
- **Contact**: `$ vim ~/.ssh/contact.pub` — VimBuffer로 연락처

#### 3. Blog 페이지 (`/blog`)

**목록 페이지 (`/blog`)**
- `$ ls -la ~/blog/` 프롬프트
- 파일 시스템 목록 스타일: permissions + date + `[tag]` + title
- 태그는 `[bracket]` 형식

**상세 페이지 (`/blog/[slug]`)**
- `$ vim ~/blog/{slug}.mdx` 프롬프트
- frontmatter를 key-value 형식 메타데이터로 표시
- MDX 콘텐츠는 prose + font-mono

### 콘텐츠 관리

- 블로그 글은 MDX 파일로 관리한다
- 추후 CMS 연동을 고려하여 콘텐츠 레이어를 분리 가능하게 설계한다

## 비기능 요구사항

### 디자인

- **디자인 컨셉**: CLI/Terminal 테마 — 전체 사이트를 터미널 UI로 표현
- **디자인 레퍼런스**: Warp Terminal (Light 테마)
- **테마**: Light 모드 전용 (다크 모드 미지원)
- **색상**: Warp Light 터미널 팔레트
  - Background: `#ffffff`, Foreground: `#111111`, Accent: `#00c2ff`
  - Terminal ANSI: red `#c30771`, green `#10a778`, blue `#008ec4`, cyan `#20a5ba`, magenta `#523c79`, yellow `#a89c14`
  - Semantic: muted `#6b7280`, subtle `#9ca3af`, border `#e5e7eb`, surface `#f5f5f5`
- **디자인 키워드**: 모노스페이스, 터미널 프롬프트, neofetch, vim 버퍼, ls 출력, 구문 강조 색상
- **터미널 UI 요소**:
  - `$ command` 프롬프트 스타일 섹션 헤더
  - vim 버퍼 (파일명 탭, 줄 번호, `-- NORMAL --` 상태바)로 콘텐츠 표시
  - `ls -la` 파일 목록 스타일 블로그 포스트 목록
  - neofetch 스타일 프로필 (key: value)
  - 프로젝트 상세는 토글로 vim 버퍼를 열어 확인
- **폰트**:
  - 영문/코드: JetBrains Mono (전체 기본)
  - 한글 폴백: Pretendard
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
