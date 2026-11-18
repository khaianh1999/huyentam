"use client";

import Link from "next/link";
import { LaSoView, LuuNhatPanel, LuuNienPanel } from "@/components/divination/LaSoView";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { buildLaSo } from "@/lib/algorithms/astrology/la-so";
import { isRealDate, parseTuViQuery, type SearchRecord } from "@/lib/divination/params";
import { useSearchRecord } from "@/lib/client/use-search-record";

export function Result() {
  const searchRecord = useSearchRecord<SearchRecord>();
  const parsed = parseTuViQuery(searchRecord);
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

  const chart = buildLaSo(parsed.profile);

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
    const date = { year: parsed.namXem, month: parsed.thangXem, day: parsed.ngayXem };
    return (
      <div className="space-y-6">
        <div className="mx-auto max-w-4xl">
          <LuuNhatPanel chart={chart} date={date} />
        </div>
        <LaSoView chart={chart} />
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
    return (
      <div className="space-y-6">
        <div className="mx-auto max-w-4xl">
          <LuuNienPanel
            chart={chart}
            year={parsed.namXem}
            selectedMonth={parsed.cheDo === "thang" ? parsed.thangXem : null}
          />
        </div>
        <LaSoView chart={chart} />
      </div>
    );
  }

  return <LaSoView chart={chart} />;
}
