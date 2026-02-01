import Prompt from "@/components/prompt";

export default function CommandBlock({
  command,
  path,
  children,
  "aria-label": ariaLabel,
  as: Tag = "section",
  className,
}: {
  command: string;
  path?: string;
  children: React.ReactNode;
  "aria-label"?: string;
  as?: "section" | "header" | "div";
  className?: string;
}) {
  return (
    <Tag
      aria-label={ariaLabel}
      className={`rounded-lg border-l-2 border-t-border py-3 pl-4 pr-3 transition-colors duration-150 hover:border-t-green hover:bg-t-surface/50${className ? ` ${className}` : ""}`}
    >
      <Prompt command={command} path={path} />
      <div className="mt-3">{children}</div>
    </Tag>
  );
}
