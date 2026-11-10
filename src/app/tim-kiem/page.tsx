import Link from "next/link";
import { Suspense } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { POPULAR_TOOLS } from "@/data/tools/catalog";
import { filterPosts, searchTools } from "@/lib/blog/query";
import { firstParam, type SearchRecord } from "@/lib/divination/params";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Tìm kiếm",
  description: "Tìm công cụ và bài viết trên Huyền Tâm theo tên, chủ đề hoặc từ khóa.",
  path: "/tim-kiem",
});

export default function SearchPage({ searchParams }: { searchParams: Promise<SearchRecord> }) {
  return (
    <PageShell
      title="Tìm kiếm"
      description="Một ô tìm cho cả công cụ và bài kiến thức. Dấu tiếng Việt có hoặc không đều được."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Tìm kiếm" },
      ]}
    >
      <Suspense fallback={<LoadingYinYang label="Đang tìm…" />}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </PageShell>
  );
}

async function SearchResults({ searchParams }: { searchParams: Promise<SearchRecord> }) {
  const q = firstParam((await searchParams).q)?.trim() ?? "";
  const tools = q ? searchTools(q) : [];
  const posts = q ? filterPosts({ q }) : [];

  return (
    <div className="space-y-10">
      <form action="/tim-kiem" className="flex flex-col gap-3 sm:flex-row">
        <Input name="q" defaultValue={q} placeholder="Ví dụ: ngũ hành, Kinh Dịch, tuổi hợp" aria-label="Từ khóa" />
        <Button type="submit">Tìm</Button>
      </form>

      {!q ? (
        <div className="space-y-8">
          <section>
            <h2 className="ink-heading text-2xl text-ink">Công cụ hay mở</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {POPULAR_TOOLS.map((tool) => (
                <li key={tool.href + tool.title}>
                  <Link href={tool.href} className="paper-card block rounded-xl p-4 hover:border-accent">
                    <span className="ink-heading text-lg text-ink">{tool.title}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{tool.category}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <p className="text-sm text-muted-foreground">
            Gõ từ khóa để lọc công cụ và bài viết. Có thể vào{" "}
            <Link href="/kien-thuc" className="text-primary underline-offset-4 hover:underline">
              tủ sách
            </Link>{" "}
            nếu muốn xem theo danh mục.
          </p>
        </div>
      ) : (
        <>
          <section>
            <h2 className="ink-heading text-2xl text-ink">Công cụ</h2>
            {tools.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">Không có công cụ khớp “{q}”.</p>
            ) : (
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {tools.map((tool) => (
                  <li key={tool.href + tool.title}>
                    <Link href={tool.href} className="paper-card block rounded-xl p-4 hover:border-accent">
                      <Badge variant="muted">{tool.category}</Badge>
                      <span className="ink-heading mt-2 block text-lg text-ink">{tool.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                        {tool.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h2 className="ink-heading text-2xl text-ink">Bài viết</h2>
            {posts.length === 0 ? (
              <div className="mt-4">
                <EmptyState
                  title="Không thấy bài viết"
                  description={`Không có bài khớp “${q}”. Thử “can chi”, “ngũ hành” hoặc “Kinh Dịch”.`}
                />
              </div>
            ) : (
              <ul className="mt-4 grid gap-3">
                {posts.map((post) => (
                  <li key={post.slug} className="paper-card rounded-xl p-4">
                    <p className="text-xs text-bronze">{post.category}</p>
                    <Link
                      href={`/kien-thuc/${post.slug}`}
                      className="ink-heading mt-1 block text-xl text-ink hover:text-primary"
                    >
                      {post.title}
                    </Link>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
}
