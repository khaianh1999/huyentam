import { PageShell } from "@/components/layout/PageShell";
import { CareerStudio } from "@/components/divination/FolkStudios";
import { BOI_TOAN_LINKS, Subnav } from "@/components/divination/Subnav";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Bói công danh",
  description: "Xem một bậc trên thang năm nấc theo tên, năm sinh và ngả đang đứng.",
  path: "/boi-toan/boi-cong-danh",
});

export default function CareerPage() {
  return (
    <PageShell
      title="Bói công danh"
      description="Chọn ngả đang đứng: học hành, buôn bán, việc công, nghề tay hoặc mở nghiệp. Thang năm bậc sẽ đánh dấu một bậc."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Bói toán", href: "/boi-toan" },
        { label: "Công danh" },
      ]}
    >
      <Subnav items={BOI_TOAN_LINKS} />
      <CareerStudio />
    </PageShell>
  );
}
