# Project Instructions

This is a Next.js portfolio project using TypeScript, Tailwind CSS, and App Router.

## Project Structure

```
src/
├── app/                   # 라우팅만. 페이지/레이아웃 컴포넌트만 배치
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈 (/)
│   ├── {route}/
│   │   └── page.tsx       # 정적 라우트
│   └── {route}/[slug]/
│       └── page.tsx       # 동적 라우트
│
├── components/            # 여러 페이지에서 공유하는 UI 컴포넌트
├── lib/                   # 유틸리티, 상수, 헬퍼 함수
└── types/                 # 공유 TypeScript 타입
```

### 구조 규칙

- `app/` 디렉토리에는 Next.js 컨벤션 파일만 둔다 (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`)
- 재사용 가능한 UI 컴포넌트는 `src/components/`에 작성한다
- 유틸리티, 상수, 설정은 `src/lib/`에 작성한다
- 공유 타입은 `src/types/`에 작성한다
- 새 라우트가 필요하면 `app/` 아래에 폴더를 만들고 `page.tsx`를 추가한다
- 프로젝트 규모가 작으므로 Route Group `()`, Private Folder `_` 는 필요해질 때 도입한다

## Feature Workflow

새 기능을 만들 때 반드시 아래 순서를 따르세요.

```
PRD → Spec → Plan Mode → 구현 → Spec 업데이트
```

1. **PRD 확인**: `.claude/features/{feature-name}/prd.md`를 먼저 읽는다
2. **Spec 작성**: `spec.md`를 작성한다 (설계 결정의 Why, How)
3. **Plan Mode**: spec 기반으로 구현 계획을 수립한다
4. **구현**: 코드를 작성한다
5. **Spec 업데이트**: 주요 변경사항을 구현 노트로 추가한다

### 핵심 원칙: Code is Truth

- 코드가 진실이다. 문서에는 **"Why"만** 기록한다
- 코드로 확인 가능한 것(API 스펙, 컴포넌트 구조, 라우팅)은 문서에 쓰지 않는다
- Spec에는 설계 결정의 이유와 구현 노트만 남긴다
- 상세 가이드: `.claude/features/README.md`

## Agent Skills

코드 작성, 리뷰, 리팩토링 시 아래 스킬 지침을 항상 참고하고 적용하세요.

### React Best Practices (`.claude/skills/vercel-react-best-practices/SKILL.md`)

React/Next.js 코드 작성 시 반드시 참조. 우선순위별 핵심 규칙:

- **CRITICAL**: 비동기 워터폴 제거 (`Promise.all`, Suspense 활용), 번들 사이즈 최적화 (barrel import 금지, `next/dynamic` 사용)
- **HIGH**: 서버 컴포넌트 성능 (`React.cache()`, 병렬 데이터 패칭, 직렬화 최소화)
- **MEDIUM**: 리렌더링 최적화 (메모이제이션, derived state, `useTransition`), 렌더링 성능 (`content-visibility`, 조건부 렌더링)

상세 규칙은 `.agents/skills/vercel-react-best-practices/rules/` 디렉토리의 개별 파일을 참조.

### Web Design Guidelines (`.claude/skills/web-design-guidelines/SKILL.md`)

UI 컴포넌트 작성 시 접근성, 성능, UX 규칙을 준수. 가이드라인 원본:
`https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`

### Composition Patterns (`.claude/skills/vercel-composition-patterns/SKILL.md`)

컴포넌트 설계 시 참조:

- boolean prop 남용 금지, composition 패턴 사용
- compound component 구조로 복잡한 컴포넌트 설계
- children을 통한 합성, renderX props 지양
- React 19 API 활용 (`forwardRef` 대신 `ref` prop, `use()` 사용)

상세 규칙은 `.agents/skills/vercel-composition-patterns/rules/` 디렉토리 참조.
