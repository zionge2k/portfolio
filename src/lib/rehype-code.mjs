import rehypePrettyCode from "rehype-pretty-code";

export default function rehypeCode(options = {}) {
  return rehypePrettyCode({
    theme: "github-light",
    keepBackground: false,
    ...options,
  });
}
