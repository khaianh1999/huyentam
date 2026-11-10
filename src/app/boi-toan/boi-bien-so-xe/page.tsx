import { PageShell } from "@/components/layout/PageShell";
import { PlateStudio } from "@/components/divination/FolkStudios";
import { BOI_TOAN_LINKS, Subnav } from "@/components/divination/Subnav";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Bói biển số xe",
  description: "Luận chữ và số trên biển xe theo quan niệm dân gian có seed.",
  path: "/boi-toan/boi-bien-so-xe",
});

export default function PlatePage() {
  return (
    <PageShell
      title="Bói biển số xe"
      description="Gõ lên mặt biển. Chữ cái và chữ số được tách ra. Đây không phải kết quả đăng kiểm."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Bói toán", href: "/boi-toan" },
        { label: "Biển số" },
      ]}
    >
      <Subnav items={BOI_TOAN_LINKS} />
      <PlateStudio />
    </PageShell>
  );
}
