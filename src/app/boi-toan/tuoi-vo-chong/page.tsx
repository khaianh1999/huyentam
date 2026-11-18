import { PageShell } from "@/components/layout/PageShell";
import { AgeMatch } from "@/components/divination/AgeMatch";
import { BOI_TOAN_LINKS, Subnav } from "@/components/divination/Subnav";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Tuổi vợ chồng",
  description: "Xem tuổi vợ chồng theo 5 tiêu chí: mệnh, thiên can, địa chi, cung phi Bát trạch, ngũ hành cung phi; kèm năm cưới đẹp, năm sinh con hợp tuổi và hướng nhà.",
  path: "/boi-toan/tuoi-vo-chong",
});

export default function MarriagePage() {
  return (
    <PageShell
      title="Tuổi vợ chồng"
      description="Chấm điểm theo 5 tiêu chí truyền thống, gợi ý năm cưới tránh kim lâu, tam tai, năm sinh con hợp tuổi bố mẹ và hướng nhà theo cung phi người chồng."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Bói toán", href: "/boi-toan" },
        { label: "Vợ chồng" },
      ]}
    >
      <Subnav items={BOI_TOAN_LINKS} />
      <AgeMatch mode="vo-chong" />
    </PageShell>
  );
}
