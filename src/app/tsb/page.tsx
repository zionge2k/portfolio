import type { Metadata } from "next";
import Link from "next/link";
import { getAllBriefingDates } from "@/lib/tsb";
import CommandBlock from "@/components/command-block";

export const metadata: Metadata = {
  title: "TSB | 이성",
  description: "Today Stock Briefing — 매일 아침·저녁 한국 증시 서사 브리핑",
};

export default function TsbPage() {
  const dates = getAllBriefingDates();

  return (
    <div className="space-y-4">
      <CommandBlock command="whatis tsb">
        <p className="text-sm">
          <span className="text-t-green">tsb (1)</span>
          <span className="text-t-muted"> — </span>
          <span className="text-t-fg">Today Stock Briefing</span>
          <span className="text-t-muted">
            : 매 거래일 08:00 아침 프리뷰, 18:00 저녁 마감 리뷰를 자동 발행하는
            증시 서사 브리핑
          </span>
        </p>
      </CommandBlock>
      <CommandBlock command="ls -t ~/tsb/">
        {dates.length === 0 ? (
          <p className="text-sm text-t-red">
            ls: cannot access &apos;~/tsb/&apos;: No such file or directory
          </p>
        ) : (
          <div className="space-y-1 text-sm">
            {dates.map((date) => {
              const weekday = new Date(`${date}T00:00:00+09:00`).toLocaleDateString(
                "ko-KR",
                { weekday: "short", timeZone: "Asia/Seoul" },
              );

              return (
                <Link
                  key={date}
                  href={`/tsb/${date}`}
                  className="flex gap-2 rounded px-1 py-1 transition-colors hover:bg-t-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-t-accent"
                >
                  <span className="shrink-0 text-t-green">{date}.html</span>
                  <span className="shrink-0 text-t-muted">({weekday})</span>
                  <span className="truncate text-t-fg">오늘의 증시 브리핑</span>
                </Link>
              );
            })}
          </div>
        )}
      </CommandBlock>
    </div>
  );
}
