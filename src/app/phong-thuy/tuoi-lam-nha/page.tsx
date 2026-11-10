import { PageShell } from "@/components/layout/PageShell";
import { HouseYearTool } from "@/components/divination/HouseYearTool";
import { PHONG_THUY_LINKS, Subnav } from "@/components/divination/Subnav";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Tuổi làm nhà",
  description: "Đối chiếu tuổi gia chủ với năm xây theo kim lâu, tam tai và ngũ hành.",
  path: "/phong-thuy/tuoi-lam-nha",
});

export default function BuildAgePage() {
  return (
    <PageShell
      title="Tuổi làm nhà"
      description="Tuổi mụ tính bằng năm xây trừ năm sinh, cộng một. Kim lâu và tam tai là quan niệm dân gian, không thay giấy phép."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Phong thủy", href: "/phong-thuy" },
        { label: "Tuổi làm nhà" },
      ]}
    >
      <Subnav items={PHONG_THUY_LINKS} />
      <HouseYearTool />
    </PageShell>
  );
}
