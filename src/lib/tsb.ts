import fs from "fs";
import path from "path";
import { cache } from "react";

const TSB_DIR = path.join(process.cwd(), "content", "stock-briefing");

// YYYY-MM-DD only — also guards the route handler against path traversal
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export const getAllBriefingDates = cache(function getAllBriefingDates(): string[] {
  if (!fs.existsSync(TSB_DIR)) return [];

  return fs
    .readdirSync(TSB_DIR)
    .filter((f) => f.endsWith(".html"))
    .map((f) => f.replace(/\.html$/, ""))
    .filter((d) => DATE_PATTERN.test(d))
    .sort()
    .reverse();
});

export function getBriefingHtml(date: string): string | undefined {
  if (!DATE_PATTERN.test(date)) return undefined;

  const filePath = path.join(TSB_DIR, `${date}.html`);
  if (!fs.existsSync(filePath)) return undefined;

  return fs.readFileSync(filePath, "utf-8");
}
