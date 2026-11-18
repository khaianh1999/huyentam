import { Suspense } from "react";
import Link from "next/link";
import { TodaySign } from "./TodaySign";
import { PageShell } from "@/components/layout/PageShell";
import { SignFinder } from "@/components/divination/SignFinder";
import { Subnav, TU_VI_LINKS } from "@/components/divination/Subnav";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { WESTERN_NOTE, WESTERN_SIGNS } from "@/data/zodiac";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "12 cung hoàng đạo",
  description: "Tra cứu mười hai cung hoàng đạo nhiệt đới và đoạn vận ngắn theo ngày, tuần, tháng.",
  path: "/cung-hoang-dao",
});

export default function SignsPage() {
  return (
    <PageShell
      title="12 cung hoàng đạo"
      description="Hệ phương Tây. Lửa, Đất, Khí, Nước không phải Kim, Mộc, Thủy, Hỏa, Thổ. Mốc ngày có thể lệch một ngày tùy năm."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Tử vi", href: "/tu-vi" },
        { label: "Cung hoàng đạo" },
      ]}
    >
      <Subnav items={TU_VI_LINKS} />
      <SignFinder />
      <Suspense fallback={<LoadingYinYang label="Đang lấy ngày…" />}>
        <TodaySign />
      </Suspense>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WESTERN_SIGNS.map((sign) => (
          <Link key={sign.id} href={`/cung-hoang-dao/${sign.id}`} className="paper-card rounded-xl p-5">
            <p className="text-2xl" aria-hidden="true">
              {sign.symbol}
            </p>
            <h2 className="ink-heading mt-2 text-2xl text-ink">{sign.name}</h2>
            <p className="mt-1 text-xs text-bronze">
              {sign.dateRange} · {sign.element}
            </p>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{sign.personality}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <Disclaimer type="quan-niem-dan-gian" />
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{WESTERN_NOTE}</p>
      </div>
    </PageShell>
  );
}
