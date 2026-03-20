export const CATEGORIES = ["dev", "design", "product", "ai-tools"] as const;
export type Category = (typeof CATEGORIES)[number];

export interface Frontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: Category;
  published: boolean;
}

export interface Post {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
}
