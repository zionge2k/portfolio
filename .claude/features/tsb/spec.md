# Spec: TSB 아카이브

## 설계 결정 (Why)

**Raw HTML 서빙 (`[date]/route.ts`) — MDX 변환 대신.**
브리핑 카드는 자체 CSS를 내장한 독립 문서다. 사이트 레이아웃 안에 넣으면
Tailwind 리셋·typography와 스타일이 충돌하고, MDX 변환은 외부 파이프라인의
렌더러(`html_renderer.py`)를 재작업해야 한다. Route Handler가 파일을 그대로
`text/html`로 응답하면 두 문제 모두 없다.

**`force-static` + `generateStaticParams`.**
브리핑은 git push(=재배포) 시점에만 추가되므로 요청 시점 fs 접근이 필요 없다.
빌드 타임 정적 생성으로 Vercel serverless 번들에 content 파일을 트레이싱할
필요도 사라진다. 새 날짜는 push → 재배포로 자동 포함된다.

**날짜 파라미터는 `^\d{4}-\d{2}-\d{2}$` 화이트리스트.**
파일명이 곧 URL 파라미터인 구조라 path traversal 방어를 `lib/tsb.ts`
한 곳에서 수행한다 (목록 필터와 단건 조회가 같은 패턴 공유).

**`content/stock-briefing/` 위치.**
`content/blog`와 나란히 — "외부에서 적재되는 콘텐츠는 content/, 코드는 src/"
경계 유지. public/은 Next 라우팅 밖이라 nav 통합·404 처리가 불가능해 배제.

## 구현 노트

- 발행 파이프라인: `~/projects/stock/stock_brief/publisher.py`가
  `content/stock-briefing/{date}.html` 복사 → commit → push
- 하루 한 페이지: 저녁 세션이 같은 `{date}.html`을 재생성(아침 카드 아래 저녁 카드)
