import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="text-t-fg" {...props} />,
    h2: (props) => <h2 className="text-t-fg" {...props} />,
    h3: (props) => <h3 className="text-t-fg" {...props} />,
    a: (props) => (
      <a className="rounded text-t-blue hover:text-t-br-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-t-accent" {...props} />
    ),
    code: (props) => (
      <code
        className="rounded bg-t-surface px-1.5 py-0.5 text-sm text-t-green"
        {...props}
      />
    ),
    pre: (props) => (
      <pre className="rounded-lg border border-t-border bg-t-surface p-4 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-t-fg" {...props} />
    ),
    blockquote: (props) => (
      <blockquote
        className="border-t-magenta text-t-muted"
        {...props}
      />
    ),
    ...components,
  };
}
