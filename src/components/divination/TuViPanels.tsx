import type { ReactNode } from "react";
import {
  buildTuViNam,
  buildTuViNgay,
  buildTuViThang,
  buildTuViTronDoi,
} from "@/lib/algorithms/astrology/tu-vi";
import { NGU_HANH_VI } from "@/lib/algorithms/calendar/constants";
import { monthRatingLabel } from "@/lib/divination/labels";
import { hourBranch } from "@/lib/divination/params";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { ResultActions } from "@/components/shared/ResultActions";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-accent/30 bg-card/70 px-4 py-3">
      <p className="text-xs tracking-wide text-bronze uppercase">{label}</p>
      <p className="mt-1 text-sm text-ink">{value}</p>
    </div>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="paper-card rounded-xl p-5">
      <h3 className="ink-heading text-xl text-ink">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </article>
  );
}

export function TuViLifeView({
  data,
  shareText,
}: {
  data: ReturnType<typeof buildTuViTronDoi>;
  shareText: string;
}) {
  const lunar = data.lunar;
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-wood">{data.overview}</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Fact label="Can chi năm" value={`${data.canChi.yearLabel} · ${data.animal}`} />
        <Fact label="Nạp âm" value={data.napAm} />
        <Fact label="Bản mệnh" value={NGU_HANH_VI[data.menh.element]} />
        <Fact
          label="Âm lịch"
          value={`${lunar.day}/${lunar.month}/${lunar.year}${lunar.leap ? " (nhuận)" : ""}`}
        />
        <Fact label="Giờ sinh" value={`${data.profile.birthHour}h · ${hourBranch(data.profile.birthHour)}`} />
        <Fact label="Giới tính" value={data.profile.gender === "nam" ? "Nam" : "Nữ"} />
      </div>
      <Block title="Cung mệnh tham chiếu">{data.cungMenh}</Block>
      <Block title="Cung thân tham chiếu">{data.cungThan}</Block>
      <div className="grid gap-3 md:grid-cols-2">
        <Block title="Công danh">{data.career}</Block>
        <Block title="Tài lộc">{data.wealth}</Block>
        <Block title="Tình duyên">{data.love}</Block>
        <Block title="Gia đạo">{data.family}</Block>
        <Block title="Sức khỏe">{data.health}</Block>
        <Block title="Hậu vận">{data.lateLife}</Block>
      </div>
      <Disclaimer type="thuat-toan" />
      <Disclaimer type="can-bo-sung" />
      <p className="text-xs leading-relaxed text-muted-foreground">{data.missingNote}</p>
      <p className="text-xs leading-relaxed text-muted-foreground">{data.disclaimer}</p>
      <ResultActions title={`Tử vi ${data.profile.fullName}`} text={shareText} />
    </div>
  );
}

export function TuViYearView({
  data,
  selectedMonth,
  onSelectMonth,
}: {
  data: ReturnType<typeof buildTuViNam>;
  selectedMonth: number | null;
  onSelectMonth?: (month: number) => void;
}) {
  const active = selectedMonth
    ? buildTuViThang(data.profile, data.viewYear, selectedMonth)
    : null;
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-wood">{data.yearOverview}</p>
      <div className="grid gap-3 md:grid-cols-2">
        <Block title="Việc làm">{data.work}</Block>
        <Block title="Tiền bạc">{data.finance}</Block>
        <Block title="Quan hệ">{data.relationship}</Block>
        <Block title="Nhà cửa">{data.familyYear}</Block>
        <Block title="Sức khỏe">{data.healthYear}</Block>
      </div>
      <div>
        <h3 className="ink-heading text-xl text-ink">Mười hai tháng</h3>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {data.months.map((month) => {
            const selected = selectedMonth === month.month;
            const className = cn(
              "rounded-xl border px-3 py-3 text-left transition-colors",
              selected ? "border-accent bg-accent/15" : "border-border bg-card/70 hover:border-accent",
            );
            const inner = (
              <>
                <span className="block text-sm text-ink">Tháng {month.month}</span>
                <Badge variant="outline" className="mt-2">
                  {monthRatingLabel(month.rating)}
                </Badge>
              </>
            );
            if (!onSelectMonth) {
              return (
                <div key={month.month} className={className}>
                  {inner}
                </div>
              );
            }
            return (
              <button key={month.month} type="button" className={className} onClick={() => onSelectMonth(month.month)}>
                {inner}
              </button>
            );
          })}
        </div>
      </div>
      {active ? (
        <Block title={`Tháng ${active.month}/${active.year}`}>
          <Badge variant="gold">{monthRatingLabel(active.rating)}</Badge>
          <p className="mt-2">{active.overview}</p>
        </Block>
      ) : (
        <p className="text-sm text-muted-foreground">Chọn một tháng trong lưới để mở lời tháng.</p>
      )}
    </div>
  );
}

export function TuViDayView({ data }: { data: ReturnType<typeof buildTuViNgay> }) {
  return (
    <div className="grid gap-3">
      <Block title="Hôm ấy">{data.overview}</Block>
      <Block title="Nên để tâm">{data.focus}</Block>
      <Block title="Nên chậm">{data.caution}</Block>
      <Disclaimer type="quan-niem-dan-gian" />
      <p className="text-xs leading-relaxed text-muted-foreground">{data.disclaimer}</p>
      <ResultActions
        title="Tử vi hàng ngày"
        text={`${data.date.day}/${data.date.month}/${data.date.year}\n${data.overview}\n${data.focus}\n${data.caution}`}
      />
    </div>
  );
}
