import type { CanChiInfo, LunarDate, NguHanh, SolarDate } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NGU_HANH_VI } from "@/lib/algorithms/calendar/constants";
import { formatLunarLabel } from "@/lib/algorithms/calendar/can-chi";
import { formatSolarSlash, weekdayName } from "@/lib/calendar/dates";

export type DaySummaryView = {
  solar: SolarDate;
  lunar: LunarDate;
  canChi: CanChiInfo;
  tietKhi: string;
  truc: string;
  saoTot: string[];
  saoXau: string[];
  isHoangDao: boolean;
  isHacDao: boolean;
  gioHoangDao: string[];
  gioHacDao: string[];
  isTamNuong: boolean;
  isNguyetKy: boolean;
  isSatChu: boolean;
  napAm: string;
  nguHanh: NguHanh;
  festivals: string[];
  disclaimer: string;
};

type DaySummaryPanelProps = {
  summary: DaySummaryView;
};

function Fact({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="border-b border-border/60 pb-3 last:border-b-0 last:pb-0">
      <dt className="text-xs tracking-wide text-muted-foreground uppercase">{label}</dt>
      <dd className="mt-1 font-medium text-ink">{value}</dd>
      {hint ? <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function HourList({ hours }: { hours: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {hours.map((hour) => (
        <li key={hour}>
          <Badge variant="outline">{hour}</Badge>
        </li>
      ))}
    </ul>
  );
}

export function dayPlainText(summary: DaySummaryView): string {
  return [
    `${weekdayName(summary.solar)}, ${formatSolarSlash(summary.solar)}`,
    formatLunarLabel(summary.lunar),
    `Can chi ngày: ${summary.canChi.dayLabel}`,
    `Can chi tháng: ${summary.canChi.monthLabel}`,
    `Can chi năm: ${summary.canChi.yearLabel}`,
    `Tiết khí (ước lượng): ${summary.tietKhi}`,
    `Trực: ${summary.truc}`,
    `Nạp âm: ${summary.napAm}`,
    `Ngũ hành: ${NGU_HANH_VI[summary.nguHanh]}`,
    summary.isHoangDao ? "Hoàng đạo" : "Hắc đạo",
    `Sao tốt: ${summary.saoTot.join(", ") || "không có"}`,
    `Sao xấu: ${summary.saoXau.join(", ") || "không có"}`,
    `Giờ hoàng đạo: ${summary.gioHoangDao.join(", ")}`,
    `Giờ hắc đạo: ${summary.gioHacDao.join(", ")}`,
    `Tam nương: ${summary.isTamNuong ? "có" : "không"}`,
    `Nguyệt kỵ: ${summary.isNguyetKy ? "có" : "không"}`,
    `Sát chủ: ${summary.isSatChu ? "có" : "không"}`,
    summary.festivals.length
      ? `Lễ: ${summary.festivals.join(", ")}`
      : "Không có lễ truyền thống nổi bật trong dữ liệu.",
    summary.disclaimer,
  ].join("\n");
}

export function DaySummaryPanel({ summary }: DaySummaryPanelProps) {
  const element = NGU_HANH_VI[summary.nguHanh];

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Can chi</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-3">
            <Fact label="Ngày" value={summary.canChi.dayLabel} />
            <Fact label="Tháng" value={summary.canChi.monthLabel} />
            <Fact label="Năm" value={summary.canChi.yearLabel} />
            <Fact label="Nạp âm" value={summary.napAm} />
            <Fact label="Ngũ hành ngày" value={element} />
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tiết khí và trực</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-3">
            <Fact
              label="Tiết khí"
              value={summary.tietKhi}
              hint="Ước lượng theo khoảng ngày trong năm, chưa phải mốc giao tiết tính từng giờ."
            />
            <Fact label="Trực" value={summary.truc} hint="Cách gọi trực ngày theo quan niệm dân gian." />
            <Fact
              label="Hoàng đạo / hắc đạo"
              value={summary.isHoangDao ? "Hoàng đạo" : "Hắc đạo"}
              hint="Xếp theo chi ngày trong quy ước dân gian đang dùng."
            />
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sao tốt và sao xấu</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <p className="mb-2 text-xs tracking-wide text-muted-foreground uppercase">Sao tốt</p>
            {summary.saoTot.length ? (
              <ul className="flex flex-wrap gap-2">
                {summary.saoTot.map((item) => (
                  <li key={item}>
                    <Badge variant="gold">{item}</Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Không có mục sao tốt trong quy ước này.</p>
            )}
          </div>
          <div>
            <p className="mb-2 text-xs tracking-wide text-muted-foreground uppercase">Sao xấu</p>
            {summary.saoXau.length ? (
              <ul className="flex flex-wrap gap-2">
                {summary.saoXau.map((item) => (
                  <li key={item}>
                    <Badge variant="secondary">{item}</Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Không có mục sao xấu trong quy ước này.</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Giờ hoàng đạo và giờ hắc đạo</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <p className="mb-2 text-xs tracking-wide text-muted-foreground uppercase">Giờ hoàng đạo</p>
            <HourList hours={summary.gioHoangDao} />
          </div>
          <div>
            <p className="mb-2 text-xs tracking-wide text-muted-foreground uppercase">Giờ hắc đạo</p>
            <HourList hours={summary.gioHacDao} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tam nương, nguyệt kỵ, sát chủ</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-wrap gap-2">
            <li>
              <Badge variant={summary.isTamNuong ? "gold" : "muted"}>
                Tam nương: {summary.isTamNuong ? "có" : "không"}
              </Badge>
            </li>
            <li>
              <Badge variant={summary.isNguyetKy ? "gold" : "muted"}>
                Nguyệt kỵ: {summary.isNguyetKy ? "có" : "không"}
              </Badge>
            </li>
            <li>
              <Badge variant={summary.isSatChu ? "gold" : "muted"}>
                Sát chủ: {summary.isSatChu ? "có" : "không"}
              </Badge>
            </li>
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Ba mục này là quan niệm dân gian. Trong quy ước đang dùng, sát chủ là các ngày âm 5, 14
            và 23, trùng đúng nhóm ngày được gắn nguyệt kỵ. Hai tên được ghi song song để đối chiếu
            cách gọi, không phải hai lớp tính riêng.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lễ và ngày truyền thống</CardTitle>
        </CardHeader>
        <CardContent>
          {summary.festivals.length ? (
            <ul className="grid gap-2">
              {summary.festivals.map((festival) => (
                <li key={festival} className="text-sm leading-relaxed text-ink">
                  {festival}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm leading-relaxed text-muted-foreground">
              Không có lễ truyền thống nổi bật trong dữ liệu lịch của ngày âm này.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
