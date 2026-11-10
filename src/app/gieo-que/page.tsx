import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { GIEO_QUE_LINKS, Subnav } from "@/components/divination/Subnav";
import { createPageMetadata } from "@/lib/seo/metadata";

const WAYS = [
  {
    href: "/gieo-que/kinh-dich",
    eyebrow: "Sáu bước",
    title: "Gieo quẻ Kinh Dịch",
    body: "Viết câu hỏi, khóa seed, rồi tung ba đồng sáu lần từ hào sơ lên hào thượng. Có hào động thì có quẻ biến.",
  },
  {
    href: "/gieo-que/tung-dong-xu",
    eyebrow: "Từng mặt",
    title: "Tung đồng xu",
    body: "Ba đồng lớn cho mỗi hào. Bạn lật từng mặt ngửa hoặc sấp. Quẻ chỉ hiện khi đủ sáu hào.",
  },
  {
    href: "/gieo-que/lac-que",
    eyebrow: "Ống",
    title: "Lắc quẻ",
    body: "Một ống, một lần lắc. Quẻ được chọn trong 64 quẻ bằng seed, không đi qua sáu lần tung.",
  },
  {
    href: "/gieo-que/rut-que?loai=dau-nam",
    eyebrow: "Sáu lối rút",
    title: "Rút quẻ theo việc",
    body: "Đầu năm, tình duyên, công danh, tài lộc, gia đạo, bình an. Mỗi lối có lời dẫn riêng và mục được đọc trước.",
  },
  {
    href: "/gieo-que/que-hom-nay",
    eyebrow: "Trong ngày",
    title: "Quẻ hôm nay",
    body: "Seed là chuỗi ngày theo giờ Việt Nam. Cả ngày dùng một quẻ, ngày mai đổi.",
  },
] as const;

export const metadata = createPageMetadata({
  title: "Gieo quẻ",
  description: "Năm lối gieo quẻ Kinh Dịch: sáu lần tung, lật đồng, lắc ống, rút theo việc và quẻ trong ngày.",
  path: "/gieo-que",
});

export default function GieoQuePage() {
  return (
    <PageShell
      title="Gieo quẻ"
      description="Mỗi lối có một cách hỏi khác nhau. Kết quả cùng dùng 64 quẻ, nhưng đường đi tới quẻ thì không giống nhau."
      breadcrumbs={[{ label: "Trang chủ", href: "/" }, { label: "Gieo quẻ" }]}
    >
      <Subnav items={GIEO_QUE_LINKS} />
      <div className="space-y-4">
        {WAYS.map((way, index) => (
          <Link
            key={way.href}
            href={way.href}
            className="paper-card gold-border grid gap-3 rounded-2xl p-6 transition hover:-translate-y-0.5 sm:grid-cols-[8rem_1fr]"
          >
            <p className="text-xs tracking-[0.18em] text-bronze uppercase">
              0{index + 1} · {way.eyebrow}
            </p>
            <span>
              <span className="ink-heading block text-2xl text-ink">{way.title}</span>
              <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{way.body}</span>
            </span>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
