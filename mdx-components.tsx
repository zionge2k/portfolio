import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

function Pre(props: ComponentPropsWithoutRef<"pre"> & { "data-language"?: string }) {
  const lang = props["data-language"];

  return (
    <pre
      className="relative overflow-x-auto rounded-lg border border-t-border bg-t-surface p-4"
      {...props}
    >
      {lang && (
        <span className="absolute right-3 top-2 select-none text-xs text-t-subtle">
          {lang}
        </span>
      )}
      {props.children}
    </pre>
  );
}

function Code(props: ComponentPropsWithoutRef<"code">) {
  // rehype-pretty-code가 처리한 코드블록 내 <code>는 data-language 속성이 있음
  // 인라인 코드만 커스텀 스타일 적용
  if ("data-language" in props) {
    return <code {...props} />;
  }
  return (
    <code
      className="rounded bg-t-surface px-1.5 py-0.5 text-sm text-t-green"
      {...props}
    />
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="text-balance text-t-fg" {...props} />,
    h2: (props) => <h2 className="text-balance text-t-fg" {...props} />,
    h3: (props) => <h3 className="text-balance text-t-fg" {...props} />,
    a: (props) => (
      <a className="rounded text-t-blue hover:text-t-br-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-t-accent" {...props} />
    ),
    code: Code,
    pre: Pre,
    blockquote: (props) => (
      <blockquote
        className="border-t-magenta text-t-muted"
        {...props}
      />
    ),
    ...components,
  };
}
