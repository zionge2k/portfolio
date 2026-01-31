export default function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="text-sm text-t-cyan">
      [{tag}]
    </span>
  );
}
