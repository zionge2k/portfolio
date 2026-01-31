export default function Prompt({
  command,
  path = "~",
}: {
  command: string;
  path?: string;
}) {
  return (
    <p className="text-sm">
      <span className="text-t-blue">{path}</span>
      <span className="text-t-green"> $ </span>
      <span className="text-t-fg">{command}</span>
    </p>
  );
}
