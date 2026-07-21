import { getAllBriefingDates, getBriefingHtml } from "@/lib/tsb";

// 브리핑 HTML은 배포(git push) 시점에만 바뀌므로 빌드 타임에 정적 생성한다
export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllBriefingDates().map((date) => ({ date }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ date: string }> },
) {
  const { date } = await params;
  const html = getBriefingHtml(date);

  if (!html) {
    return new Response("Not Found", { status: 404 });
  }

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
