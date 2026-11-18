import { Suspense } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { BOI_TOAN_LINKS, Subnav } from "@/components/divination/Subnav";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { Draw } from "./Draw";

export const metadata = createPageMetadata({
  title: "Xin xăm đầu năm",
  description:
    "Nghi thức xin xăm đầu năm mang tính quan niệm dân gian, dùng bộ xăm biên soạn có seed kiểm thử được.",
  path: "/boi-toan/xin-xam-dau-nam",
});

export default function XinXamDauNamPage() {
  return (
    <PageShell
      title="Xin xăm đầu năm"
      description="Không khí năm mới: một lời nguyện ngắn, rồi mở thẻ. Đây là trải nghiệm văn hóa dân gian trên bộ xăm biên soạn — không phải bản xăm gốc của một ngôi đền."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Bói toán", href: "/boi-toan" },
        { label: "Xăm đầu năm" },
      ]}
    >
      <Subnav items={BOI_TOAN_LINKS} />
      <div className="mb-6 rounded-2xl border border-accent/40 bg-gradient-to-br from-amber-50 to-card p-5">
        <p className="text-xs tracking-[0.2em] text-bronze uppercase">Đầu năm</p>
        <p className="mt-2 text-sm leading-relaxed text-wood">
          Theo quan niệm dân gian, nhiều nhà xin xăm vào những ngày đầu năm để lấy lời nhắc
          cho việc nhà và hướng đi. Huyền Tâm giữ nghi thức này như trải nghiệm tham khảo.
        </p>
      </div>
      <Disclaimer type="quan-niem-dan-gian" />
      <div className="mt-8">
        <Suspense fallback={<LoadingYinYang label="Đang mở ống xăm đầu năm…" />}>
          <Draw />
        </Suspense>
      </div>
    </PageShell>
  );
}
