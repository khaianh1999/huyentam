import { BLOG_POSTS, type BlogPost } from "@/data/blog/posts";
import { TOOL_CATALOG } from "@/data/tools/catalog";
import type { ToolCard } from "@/types";

export function foldVi(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}

export function formatPublished(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return new Intl.DateTimeFormat("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function blogCategories(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of BLOG_POSTS) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }
  return [...counts.entries()].map(([name, count]) => ({ name, count }));
}

function postHaystack(post: BlogPost): string {
  return foldVi([post.title, post.excerpt, post.category, post.tags.join(" "), post.content].join(" "));
}

export function filterPosts(input: { q?: string; category?: string }): BlogPost[] {
  const q = foldVi(input.q?.trim() ?? "");
  const category = input.category?.trim() ?? "";

  return [...BLOG_POSTS]
    .filter((post) => {
      if (category && post.category !== category) return false;
      if (q && !postHaystack(post).includes(q)) return false;
      return true;
    })
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function findPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function relatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = findPost(slug);
  if (!current) return [];
  const same = BLOG_POSTS.filter((post) => post.slug !== slug && post.category === current.category);
  const rest = BLOG_POSTS.filter((post) => post.slug !== slug && post.category !== current.category);
  return [...same, ...rest].slice(0, limit);
}

export function searchTools(q: string): ToolCard[] {
  const needle = foldVi(q.trim());
  if (!needle) return [];
  return TOOL_CATALOG.filter((tool) =>
    foldVi([tool.title, tool.description, tool.category].join(" ")).includes(needle),
  );
}
