import Link from "next/link";
import { Suspense } from "react";
import { SectionArt, type ArtName } from "@/components/art/SectionArt";
import { PostCover } from "@/components/blog/PostCover";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  CalendarCheck,
  CalendarDays,
  Compass,
  Hexagon,
  PenLine,
  ScrollText,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { HeroSection } from "@/components/home/HeroSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ToolCard } from "@/components/shared/ToolCard";
import { Button } from "@/components/ui/button";
import { TOOL_CATALOG } from "@/data/tools/catalog";
import { BLOG_POSTS } from "@/data/blog/posts";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Huyền Tâm",
  description:
    "Phong thủy, tử vi, lịch âm dương, xem ngày tốt, gieo quẻ Kinh Dịch và kiến thức tâm linh Việt Nam.",
  path: "/",
});

const QUICK: { href: string; label: string; hint: string; icon: LucideIcon }[] =
  [
    {
      href: "/lich-am-duong",
      label: "Lịch âm dương",
      hint: "Đổi ngày, can chi",
      icon: CalendarDays,
    },
    {
      href: "/xem-ngay-tot",
      label: "Xem ngày tốt",
      hint: "Cưới hỏi, khai trương",
      icon: CalendarCheck,
    },
    {
      href: "/tu-vi",
      label: "Lá số tử vi",
      hint: "Theo ngày giờ sinh",
      icon: Sparkles,
    },
    {
      href: "/gieo-que/kinh-dich",
      label: "Gieo quẻ",
      hint: "Kinh Dịch 64 quẻ",
      icon: Hexagon,
    },
    {
      href: "/boi-ten",
      label: "Bói tên",
      hint: "Thần số, ngũ hành",
      icon: PenLine,
    },
    {
      href: "/phong-thuy",
      label: "Phong thủy",
      hint: "Nhà ở, màu, hướng",
      icon: Compass,
    },
  ];

const GROUPS = [
  {
    id: "lich-ngay",
    art: "ngay" as ArtName,
    title: "Lịch & ngày tốt",
    description:
      "Tra âm lịch, can chi, giờ hoàng đạo và chọn ngày cho việc lớn.",
    categories: ["Lịch", "Ngày tốt"],
    href: "/xem-ngay-tot",
  },
  {
    id: "tu-vi",
    art: "tu-vi" as ArtName,
    title: "Tử vi & chiêm tinh",
    description: "Lá số, vận hằng ngày, con giáp và cung hoàng đạo.",
    categories: ["Tử vi", "Hoàng đạo"],
    href: "/tu-vi",
  },
  {
    id: "gieo-que",
    art: "gieo-que" as ArtName,
    title: "Gieo quẻ",
    description: "Kinh Dịch, đồng xu, ống xăm — mỗi lối gieo một nghi thức.",
    categories: ["Gieo quẻ"],
    href: "/gieo-que",
  },
  {
    id: "boi-toan",
    art: "boi-toan" as ArtName,
    title: "Bói toán dân gian",
    description: "Tên, tuổi, xăm và những câu hỏi đời thường.",
    categories: ["Bói toán"],
    href: "/boi-toan",
  },
  {
    id: "phong-thuy",
    art: "phong-thuy" as ArtName,
    title: "Phong thủy",
    description: "Ngũ hành bản mệnh, nhà ở và tuổi làm nhà.",
    categories: ["Phong thủy"],
    href: "/phong-thuy",
  },
];

export default function HomePage() {
  const posts = BLOG_POSTS.slice(0, 3);

  return (
    <PageShell width="wide" hideRail>
      <Suspense>
        <HeroSection />
      </Suspense>

      {/* Lối tắt — nổi lên mép dưới hero */}
      <nav
        aria-label="Lối tắt"
        className="paper-card relative z-10 mx-3 -mt-7 rounded-2xl p-2 sm:mx-8 lg:mx-14"
      >
        <ul className="grid grid-cols-3 gap-1 lg:grid-cols-6">
          {QUICK.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex flex-col items-center gap-2 rounded-xl px-1.5 py-3 text-center transition-colors hover:bg-muted/70 sm:flex-row sm:gap-2.5 sm:px-2.5 sm:text-left"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 text-primary transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-[18px]" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm leading-tight font-medium text-ink">
                      {item.label}
                    </span>
                    <span className="mt-0.5 hidden truncate text-xs text-muted-foreground sm:block">
                      {item.hint}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <section className="mt-16" aria-labelledby="cong-cu">
        <SectionHeading
          id="cong-cu"
          eyebrow="Công cụ"
          title="Mọi công cụ, xếp theo việc bạn cần"
          description="Mỗi công cụ ghi rõ đâu là tính toán lịch pháp, đâu là quan niệm dân gian để bạn tự cân nhắc."
        />

        <div className="mt-8 space-y-4">
          {GROUPS.map((group, index) => {
            const tools = TOOL_CATALOG.filter((tool) =>
              group.categories.includes(tool.category),
            );
            if (tools.length === 0) return null;
            return (
              <div
                key={group.id}
                className="grid gap-5 rounded-2xl border border-accent/15 bg-card/50 p-5 sm:p-6 lg:grid-cols-[15rem_1fr] lg:gap-8"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 lg:block">
                    <SectionArt
                      name={group.art}
                      className="w-24 shrink-0 sm:w-28 lg:mb-2 lg:w-40"
                    />
                    <span className="ink-heading text-sm text-bronze">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="ink-heading mt-1 text-xl text-ink">
                    {group.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {group.description}
                  </p>
                  <Link
                    href={group.href}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline lg:mt-auto lg:pt-4"
                  >
                    Xem chuyên mục
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {tools.map((tool) => (
                    <ToolCard
                      key={tool.href + tool.title}
                      variant="compact"
                      title={tool.title}
                      description={tool.description}
                      href={tool.href}
                      iconName={tool.icon}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="kien-thuc">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            id="kien-thuc"
            eyebrow="Kiến thức"
            title="Đọc chậm, hiểu gốc"
            description="Lịch âm, ngũ hành, Kinh Dịch và văn hóa thờ cúng — viết gọn, dẫn nguồn."
          />
          <Button asChild variant="outline">
            <Link href="/kien-thuc">
              Tất cả bài viết
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/kien-thuc/${post.slug}`}
              className="paper-card group flex flex-col overflow-hidden rounded-2xl hover:-translate-y-0.5"
            >
              <PostCover post={post} className="aspect-[1200/630]">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium tracking-wide text-accent backdrop-blur-sm">
                  <BookOpen className="size-3.5" aria-hidden="true" />
                  {post.category}
                </span>
              </PostCover>
              <span className="flex flex-1 flex-col p-5">
                <span className="ink-heading text-lg leading-snug text-ink transition-colors group-hover:text-primary">
                  {post.title}
                </span>
                <span className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </span>
                <span className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{post.readingMinutes} phút đọc</span>
                  <span className="inline-flex items-center gap-1 font-medium text-bronze">
                    Đọc tiếp
                    <ArrowRight
                      className="size-3.5 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16 mb-4" aria-labelledby="nguyen-tac">
        <SectionHeading
          id="nguyen-tac"
          align="center"
          eyebrow="Nguyên tắc"
          title="Tách bạch tính toán và tín ngưỡng"
          description="Bạn luôn biết kết quả nào đến từ công thức lịch pháp, kết quả nào là lời dân gian truyền lại."
        />
        <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
          <div className="paper-card rounded-2xl p-6">
            <span className="grid size-11 place-items-center rounded-xl bg-jade/10 text-jade">
              <Calculator className="size-5" aria-hidden="true" />
            </span>
            <h3 className="ink-heading mt-4 text-lg text-ink">
              Tính theo thuật toán
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Đổi âm dương lịch, can chi ngày tháng năm, tiết khí, nạp âm, quẻ
              Kinh Dịch từ hào gieo — kết quả kiểm chứng được.
            </p>
          </div>
          <div className="paper-card rounded-2xl p-6">
            <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
              <ScrollText className="size-5" aria-hidden="true" />
            </span>
            <h3 className="ink-heading mt-4 text-lg text-ink">
              Quan niệm dân gian
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Hoàng đạo, trực ngày, lời xăm, tuổi hợp — giữ nguyên tinh thần văn
              hóa, ghi rõ để tham khảo, không thay quyết định thực tế.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
