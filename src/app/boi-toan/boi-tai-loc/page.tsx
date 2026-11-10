import { PageShell } from "@/components/layout/PageShell";
import { WealthStudio } from "@/components/divination/FolkStudios";
import { BOI_TOAN_LINKS, Subnav } from "@/components/divination/Subnav";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Bói tài lộc",
  description: "Ba cửa giữ, làm và chờ, luận theo năm sinh và ý bạn chọn.",
  path: "/boi-toan/boi-tai-loc",
});

export default function WealthPage() {
  return (
    <PageShell
      title="Bói tài lộc"
      description="Chọn một ý: giữ của, mở nguồn hoặc chờ thời. Ba cửa sẽ hé hoặc khép theo khóa năm sinh và ý ấy."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Bói toán", href: "/boi-toan" },
        { label: "Tài lộc" },
      ]}
    >
      <Subnav items={BOI_TOAN_LINKS} />
      <WealthStudio />
    </PageShell>
  );
}
