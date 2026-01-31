export default function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="rounded-full bg-ctp-surface-0 px-3 py-1 text-sm text-ctp-subtext-1">
      {tag}
    </span>
  );
}
