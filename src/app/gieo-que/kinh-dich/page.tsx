import { PageShell } from "@/components/layout/PageShell";
import { CoinGame } from "@/components/divination/CoinGame";
import { GIEO_QUE_LINKS, Subnav } from "@/components/divination/Subnav";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Gieo quẻ Kinh Dịch",
  description: "Tung ba đồng sáu lần theo phương pháp Kinh Dịch, có hào động và quẻ biến.",
  path: "/gieo-que/kinh-dich",
});

export default function KinhDichPage() {
  return (
    <PageShell
      title="Gieo quẻ Kinh Dịch"
      description="Một chạm, ba đồng xu tự tung đủ sáu lần và dựng quẻ. Mặt ngửa tính 3, mặt sấp tính 2."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Gieo quẻ", href: "/gieo-que" },
        { label: "Kinh Dịch" },
      ]}
    >
      <Subnav items={GIEO_QUE_LINKS} />
      <CoinGame mode="auto" />
    </PageShell>
  );
}
