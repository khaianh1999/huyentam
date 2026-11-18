import { PageShell } from "@/components/layout/PageShell";
import { CoinGame } from "@/components/divination/CoinGame";
import { GIEO_QUE_LINKS, Subnav } from "@/components/divination/Subnav";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Tung đồng xu",
  description: "Chạm để tung ba đồng xu cổ, sáu lần thành một quẻ Kinh Dịch có hào động.",
  path: "/gieo-que/tung-dong-xu",
});

export default function CoinPage() {
  return (
    <PageShell
      title="Tung đồng xu"
      description="Chạm vào ba đồng xu để tung. Sáu lần tung dựng nên sáu hào, từ dưới lên trên."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Gieo quẻ", href: "/gieo-que" },
        { label: "Tung đồng xu" },
      ]}
    >
      <Subnav items={GIEO_QUE_LINKS} />
      <CoinGame mode="manual" />
    </PageShell>
  );
}
