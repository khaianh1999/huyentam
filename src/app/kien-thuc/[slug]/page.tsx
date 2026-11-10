import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { MarkdownBody } from "@/components/blog/MarkdownBody";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS } from "@/data/blog/posts";
import { parseMarkdown } from "@/lib/blog/markdown";
import { findPost, formatPublished, relatedPosts } from "@/lib/blog/query";
import { createPageMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = findPost(slug);
  return createPageMetadata({
    title: post?.title ?? "Bài viết",
    description: post?.excerpt ?? "Bài kiến thức trên Huyền Tâm.",
    path: `/kien-thuc/${slug}`,
  });
}

function articleJsonLd(slug: string) {
  const post = findPost(slug);
  if (!post) return null;
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
  const path = `/kien-thuc/${post.slug}`;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    inLanguage: "vi-VN",
    articleSection: post.category,
    keywords: post.tags.join(", "),
    timeRequired: `PT${post.readingMinutes}M`,
    author: { "@type": "Organization", name: "Huyền Tâm" },
    publisher: { "@type": "Organization", name: "Huyền Tâm" },
    mainEntityOfPage: origin ? `${origin}${path}` : path,
  }).replace(/</g, "\\u003c");
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();

  const { blocks, toc } = parseMarkdown(post.content);
  const related = relatedPosts(post.slug);
  const jsonLd = articleJsonLd(slug);

  return (
    <PageShell
      title={post.title}
      description={post.excerpt}
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Kiến thức", href: "/kien-thuc" },
        { label: post.title },
      ]}
    >
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      ) : null}

      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Badge variant="gold">{post.category}</Badge>
        <time dateTime={post.publishedAt}>{formatPublished(post.publishedAt)}</time>
        <span>{post.readingMinutes} phút đọc</span>
      </div>

      <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          {toc.length > 0 ? (
            <nav aria-label="Mục lục" className="rounded-xl border border-accent/40 bg-card/70 p-4">
              <p className="text-xs font-medium tracking-[0.18em] text-bronze uppercase">Mục lục</p>
              <ol className="mt-3 space-y-2 text-sm">
                {toc.map((item) => (
                  <li key={item.id} className={item.level === 3 ? "pl-3" : undefined}>
                    <a href={`#${item.id}`} className="text-wood hover:text-primary">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
        </aside>

        <article>
          <MarkdownBody blocks={blocks} />
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/tim-kiem?q=${encodeURIComponent(tag)}`}>
                <Badge variant="outline">{tag}</Badge>
              </Link>
            ))}
          </div>
          <Disclaimer type="du-lieu-tham-khao" className="mt-8" />
        </article>
      </div>

      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="ink-heading text-2xl text-ink">Bài cùng hướng</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug} className="paper-card rounded-xl p-4">
                <p className="text-xs text-bronze">{item.category}</p>
                <Link href={`/kien-thuc/${item.slug}`} className="ink-heading mt-2 block text-lg text-ink hover:text-primary">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </PageShell>
  );
}
