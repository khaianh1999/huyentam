import { PageShell } from "@/components/layout/PageShell";
import { LoveStudio } from "@/components/divination/FolkStudios";
import { BOI_TOAN_LINKS, Subnav } from "@/components/divination/Subnav";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Bói tình yêu",
  description: "Se một sợi duyên từ hai cái tên, theo quan niệm dân gian có seed.",
  path: "/boi-toan/boi-tinh-yeu",
});

export default function LovePage() {
  return (
    <PageShell
      title="Bói tình yêu"
      description="Chỉ cần hai tên. Không hỏi năm sinh, không hỏi tuổi. Sợi chỉ và ba lời là cả trang này."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Bói toán", href: "/boi-toan" },
        { label: "Tình yêu" },
      ]}
    >
      <Subnav items={BOI_TOAN_LINKS} />
      <LoveStudio />
    </PageShell>
  );
}
