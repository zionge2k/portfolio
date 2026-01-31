export function VimBuffer({
  filename,
  children,
}: {
  filename: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded border border-t-border bg-t-surface text-sm">
      <div className="border-b border-t-border px-3 py-1 text-xs text-t-muted">
        {filename} [readonly]
      </div>
      <div className="p-3">{children}</div>
      <div className="border-t border-t-border px-3 py-1 text-xs text-t-muted">
        <span className="text-t-green">-- NORMAL --</span>
        <span className="ml-4">{filename}</span>
      </div>
    </div>
  );
}

export function Line({
  n,
  children,
}: {
  n: number;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex">
      <span className="w-8 shrink-0 select-none pr-3 text-right text-t-subtle">
        {n}
      </span>
      <span className="min-w-0">{children}</span>
    </div>
  );
}
