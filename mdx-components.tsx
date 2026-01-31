import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="text-ctp-text" {...props} />,
    h2: (props) => <h2 className="text-ctp-text" {...props} />,
    h3: (props) => <h3 className="text-ctp-text" {...props} />,
    a: (props) => (
      <a className="rounded text-ctp-blue hover:text-ctp-sapphire focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-mauve" {...props} />
    ),
    code: (props) => (
      <code
        className="rounded bg-ctp-mantle px-1.5 py-0.5 text-sm text-ctp-mauve"
        {...props}
      />
    ),
    pre: (props) => (
      <pre className="rounded-lg bg-ctp-mantle p-4 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-ctp-text" {...props} />
    ),
    blockquote: (props) => (
      <blockquote
        className="border-ctp-mauve text-ctp-subtext-1"
        {...props}
      />
    ),
    ...components,
  };
}
