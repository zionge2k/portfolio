"use client";

import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

const theme = {
  light: ["#e5e7eb", "#b2dfdb", "#66bb6a", "#2e7d32", "#10a778"],
};

export default function GitHubCalendarSection({
  username,
}: {
  username: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="overflow-hidden rounded border border-t-border bg-t-surface p-4 [&_svg]:h-auto [&_svg]:w-full">
      {mounted ? (
        <GitHubCalendar
          username={username}
          colorScheme="light"
          theme={theme}
          fontSize={11}
          style={{ color: "#6b7280" }}
        />
      ) : (
        <div className="h-[128px]" />
      )}
    </div>
  );
}
