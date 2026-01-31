"use client";

import { GitHubCalendar } from "react-github-calendar";

const theme = {
  light: ["#eff1f5", "#ead4f9", "#d5a9f3", "#bf7eed", "#8839ef"],
};

export default function GitHubCalendarSection({
  username,
}: {
  username: string;
}) {
  return (
    <div className="overflow-x-auto">
      <GitHubCalendar
        username={username}
        colorScheme="light"
        theme={theme}
        fontSize={12}
      />
    </div>
  );
}
