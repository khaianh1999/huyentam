import { Suspense } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { Result } from "./Result";

export const metadata = createPageMetadata({
  title: "Kết quả gieo quẻ",
  description: "Mở lại quẻ Kinh Dịch từ seed trên đường dẫn.",
  path: "/ket-qua/gieo-que",
  noindex: true,
});

export default function HexResultPage() {
  return (
    <PageShell
      title="Kết quả gieo quẻ"
      description="Cùng seed và cùng cách gieo thì ra cùng quẻ."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Gieo quẻ", href: "/gieo-que" },
        { label: "Kết quả" },
      ]}
    >
      <Suspense fallback={<LoadingYinYang label="Đang mở quẻ…" />}>
        <Result />
      </Suspense>
    </PageShell>
  );
}
