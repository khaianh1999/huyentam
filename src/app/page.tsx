import Link from "next/link";
import { Suspense } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { HeroSection } from "@/components/home/HeroSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ToolCard } from "@/components/shared/ToolCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { POPULAR_TOOLS, TOOL_CATALOG } from "@/data/tools/catalog";
import { BLOG_POSTS } from "@/data/blog/posts";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Huyền Tâm",
  description:
    "Phong thủy, tử vi, lịch âm dương, xem ngày tốt, gieo quẻ Kinh Dịch và kiến thức tâm linh Việt Nam.",
  path: "/",
});

export default function HomePage() {
  const posts = BLOG_POSTS.slice(0, 3);

  return (
    <PageShell width="wide" hideRail>
      <Suspense fallback={<div className="h-56 rounded-2xl border border-accent/30 bg-card/40" />}>
        <HeroSection />
      </Suspense>

      <section className="mt-10">
        <SectionHeading
          eyebrow="Công cụ"
          title="Danh mục công cụ phong thủy & tâm linh"
          description="Mỗi công cụ có luồng riêng, thuật toán tách module, và ghi rõ đâu là tính toán, đâu là quan niệm dân gian."
        />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TOOL_CATALOG.map((tool) => (
            <ToolCard
              key={tool.href + tool.title}
              title={tool.title}
              description={tool.description}
              href={tool.href}
              iconName={tool.icon}
            />
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHeading
            eyebrow="Nổi bật"
            title="Bài viết phong thủy & kiến thức"
            description="Nội dung SEO về lịch âm, ngũ hành, Kinh Dịch và văn hóa thờ cúng."
          />
          <div className="mt-6 grid gap-4">
            {posts.map((post) => (
              <Card key={post.slug}>
                <CardHeader>
                  <p className="text-xs uppercase tracking-wider text-bronze">
                    {post.category}
                  </p>
                  <CardTitle className="text-xl">
                    <Link href={`/kien-thuc/${post.slug}`} className="hover:text-primary">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/kien-thuc">Xem tất cả kiến thức</Link>
          </Button>
        </div>

        <div>
          <SectionHeading
            eyebrow="Phổ biến"
            title="Công cụ được dùng nhiều"
            description="Lối tắt tới các trải nghiệm người dùng quay lại thường xuyên."
          />
          <div className="mt-6 grid gap-3">
            {POPULAR_TOOLS.map((tool) => (
              <Link
                key={tool.href + tool.title}
                href={tool.href}
                className="paper-card gold-border flex items-start justify-between gap-3 rounded-xl p-4 transition hover:-translate-y-0.5"
              >
                <span>
                  <span className="ink-heading block text-base text-ink">
                    {tool.title}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {tool.category}
                  </span>
                </span>
                <span className="text-sm text-bronze">Mở</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
