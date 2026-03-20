import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/log",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/log/:slug",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-frontmatter"], ["remark-gfm"]],
    rehypePlugins: [[`${process.cwd()}/src/lib/rehype-code.mjs`]],
  },
});

export default withMDX(nextConfig);
