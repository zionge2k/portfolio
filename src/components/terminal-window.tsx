export default function TerminalWindow({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-t-border bg-t-surface">
      <div className="flex items-center gap-2 border-b border-t-border px-4 py-2">
        <span className="size-3 rounded-full bg-t-red" aria-hidden="true" />
        <span className="size-3 rounded-full bg-t-yellow" aria-hidden="true" />
        <span className="size-3 rounded-full bg-t-green" aria-hidden="true" />
        {title ? (
          <span className="ml-2 text-xs text-t-muted">{title}</span>
        ) : null}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
