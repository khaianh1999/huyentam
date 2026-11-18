"use client";

import type { ReactNode } from "react";
import { PostCover } from "@/components/blog/PostCover";
import Link from "next/link";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { EmptyState } from "@/components/shared/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { blogCategories, filterPosts, formatPublished } from "@/lib/blog/query";
import { firstParam, type SearchRecord } from "@/lib/divination/params";
import Form from "next/form";
import { useSearchRecord } from "@/lib/client/use-search-record";

export function KnowledgeList() {
  const searchRecord = useSearchRecord<SearchRecord>();
  const sp = searchRecord;
  const q = firstParam(sp.q)?.trim() ?? "";
  const category = firstParam(sp["danh-muc"])?.trim() ?? "";
  const posts = filterPosts({ q, category });
  const categories = blogCategories();

  return (
    <div className="space-y-8">
      <Form
        key={JSON.stringify(searchRecord)}
        action="/kien-thuc"
        className="flex flex-col gap-3 sm:flex-row"
      >
        {category ? (
          <input type="hidden" name="danh-muc" value={category} />
        ) : null}
        <Input
          name="q"
          defaultValue={q}
          placeholder="Tìm theo tiêu đề, thẻ hoặc nội dung"
          aria-label="Tìm bài viết"
        />
        <Button type="submit">Tìm</Button>
        {q || category ? (
          <Button asChild variant="outline">
            <Link href="/kien-thuc">Bỏ lọc</Link>
          </Button>
        ) : null}
      </Form>

      <div className="flex flex-wrap gap-2" aria-label="Danh mục">
        <CategoryLink
          active={!category}
          href={q ? `/kien-thuc?q=${encodeURIComponent(q)}` : "/kien-thuc"}
        >
          Tất cả
        </CategoryLink>
        {categories.map((item) => {
          const params = new URLSearchParams();
          params.set("danh-muc", item.name);
          if (q) params.set("q", q);
          return (
            <CategoryLink
              key={item.name}
              active={category === item.name}
              href={`/kien-thuc?${params.toString()}`}
            >
              {item.name}
              <span className="text-bronze"> {item.count}</span>
            </CategoryLink>
          );
        })}
      </div>

      {posts.length === 0 ? (
        <EmptyState
          title="Không thấy bài phù hợp"
          description="Thử từ khóa khác, hoặc bỏ lọc danh mục."
        />
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="paper-card group relative flex h-full flex-col overflow-hidden rounded-2xl">
                <Link
                  href={`/kien-thuc/${post.slug}`}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <PostCover post={post} className="aspect-[1200/630]" />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="gold">{post.category}</Badge>
                    <time dateTime={post.publishedAt}>
                      {formatPublished(post.publishedAt)}
                    </time>
                    <span>{post.readingMinutes} phút đọc</span>
                  </div>
                  <h2 className="ink-heading mt-3 text-[1.35rem] leading-snug text-ink">
                    <Link
                      href={`/kien-thuc/${post.slug}`}
                      className="hover:text-primary"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}

      <Disclaimer type="du-lieu-tham-khao" />
    </div>
  );
}

function CategoryLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={
        active
          ? "rounded-full border border-primary bg-primary px-3 py-1.5 text-sm text-primary-foreground"
          : "rounded-full border border-accent/40 bg-card/80 px-3 py-1.5 text-sm text-wood hover:border-accent"
      }
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
