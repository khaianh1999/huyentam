import { PageShell } from "@/components/layout/PageShell";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { TarotStudio } from "@/components/divination/TarotStudio";
import { BOI_TOAN_LINKS, Subnav } from "@/components/divination/Subnav";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Bói bài Tây",
  description:
    "Rút 3 lá Major Arcana mang tính tham khảo dân gian với seed có thể kiểm thử.",
  path: "/boi-toan/boi-bai-tay",
});

export default function BoiBaiTayPage() {
  return (
    <PageShell
      title="Bói bài Tây"
      description="Trải nghiệm rút bài theo phong cách giải trí văn hóa. Cùng câu hỏi và seed sẽ cho cùng bộ lá."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Bói toán", href: "/boi-toan" },
        { label: "Bói bài Tây" },
      ]}
    >
      <Subnav items={BOI_TOAN_LINKS} />
      <Disclaimer type="quan-niem-dan-gian" className="mb-6" />
      <TarotStudio />
    </PageShell>
  );
}
