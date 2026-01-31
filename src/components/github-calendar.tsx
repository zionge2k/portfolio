"use client";

import { GitHubCalendar } from "react-github-calendar";

const theme = {
  light: ["#e5e7eb", "#b2dfdb", "#66bb6a", "#2e7d32", "#10a778"],
};

export default function GitHubCalendarSection({
  username,
}: {
  username: string;
}) {
  return (
    <div className="overflow-x-auto rounded border border-t-border bg-t-surface p-4">
      <GitHubCalendar
        username={username}
        colorScheme="light"
        theme={theme}
        fontSize={11}
        style={{ color: "#6b7280" }}
      />
    </div>
  );
}
