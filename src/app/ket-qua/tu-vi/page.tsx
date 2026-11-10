import { Suspense } from "react";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { TuViDayView, TuViLifeView, TuViYearView } from "@/components/divination/TuViPanels";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { Button } from "@/components/ui/button";
import { buildTuViNam, buildTuViNgay, buildTuViTronDoi } from "@/lib/algorithms/astrology/tu-vi";
import { isRealDate, parseTuViQuery, type SearchRecord } from "@/lib/divination/params";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Kết quả tử vi",
  description: "Lá tử vi lập lại từ họ tên, ngày giờ sinh và mốc muốn xem trên đường dẫn.",
  path: "/ket-qua/tu-vi",
});

export default function TuViResultPage({
  searchParams,
}: {
  searchParams: Promise<SearchRecord>;
}) {
  return (
    <PageShell
      title="Kết quả tử vi"
      description="Trang này lập lại luận giải từ các tham số trên đường dẫn, để giữ và chia sẻ."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Tử vi", href: "/tu-vi" },
        { label: "Kết quả" },
      ]}
    >
      <Suspense fallback={<LoadingYinYang label="Đang mở kết quả…" />}>
        <Result searchParams={searchParams} />
      </Suspense>
    </PageShell>
  );
}

async function Result({ searchParams }: { searchParams: Promise<SearchRecord> }) {
  const parsed = parseTuViQuery(await searchParams);
  if (!parsed) {
    return (
      <EmptyState
        title="Chưa đủ lá số"
        description="Cần họ tên, ngày sinh dương lịch, giờ và giới tính. Hãy lập từ trang tử vi."
        action={
          <Button asChild>
            <Link href="/tu-vi">Mở trang tử vi</Link>
          </Button>
        }
      />
    );
  }

  const life = buildTuViTronDoi(parsed.profile);
  const share = `${life.profile.fullName}\n${life.overview}\n${life.disclaimer}`;

  if (parsed.cheDo === "ngay") {
    if (
      parsed.namXem === null ||
      parsed.thangXem === null ||
      parsed.ngayXem === null ||
      !isRealDate(parsed.namXem, parsed.thangXem, parsed.ngayXem)
    ) {
      return (
        <EmptyState
          title="Thiếu ngày muốn xem"
          description="Đường dẫn hàng ngày cần đủ năm, tháng và ngày muốn xem."
          action={
            <Button asChild>
              <Link href="/tu-vi/hang-ngay">Chọn ngày</Link>
            </Button>
          }
        />
      );
    }
    const day = buildTuViNgay(parsed.profile, {
      year: parsed.namXem,
      month: parsed.thangXem,
      day: parsed.ngayXem,
    });
    return (
      <div className="space-y-8">
        <TuViDayView data={day} />
        <TuViLifeView data={life} shareText={share} />
      </div>
    );
  }

  if (parsed.cheDo === "nam" || parsed.cheDo === "thang") {
    if (parsed.namXem === null || (parsed.cheDo === "thang" && parsed.thangXem === null)) {
      return (
        <EmptyState
          title="Thiếu mốc năm hoặc tháng"
          description="Hãy chọn lại năm xem, và tháng nếu đang xem theo tháng."
          action={
            <Button asChild>
              <Link href={parsed.cheDo === "thang" ? "/tu-vi/hang-thang" : "/tu-vi/hang-nam"}>
                Chọn lại
              </Link>
            </Button>
          }
        />
      );
    }
    const yearView = buildTuViNam(parsed.profile, parsed.namXem);
    return (
      <div className="space-y-8">
        <TuViYearView data={yearView} selectedMonth={parsed.cheDo === "thang" ? parsed.thangXem : null} />
        <Disclaimer type="can-bo-sung" />
        <TuViLifeView data={life} shareText={share} />
      </div>
    );
  }

  return <TuViLifeView data={life} shareText={share} />;
}
