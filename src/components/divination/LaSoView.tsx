"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { CalendarClock, Compass, Sparkles, Star } from "lucide-react";
import type { NguHanh, SolarDate } from "@/types";
import { ResultActions } from "@/components/shared/ResultActions";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CHI_VI, NGU_HANH_VI } from "@/lib/algorithms/calendar/constants";
import { tamPhuong, type LaSo, type Palace } from "@/lib/algorithms/astrology/la-so";
import {
  buildDayReading,
  buildOverview,
  buildYearReading,
  laSoPlainText,
  palaceTone,
  readPalace,
  TONE_LABEL,
  type Tone,
} from "@/lib/algorithms/astrology/la-so-reading";
import { useTodaySolar } from "@/lib/client/use-vn-today";
import { formatSolarSlash, weekdayName } from "@/lib/calendar/dates";
import { cn } from "@/lib/utils";

const ELEMENT_COLOR: Record<NguHanh, string> = {
  Kim: "text-slate-500",
  Moc: "text-emerald-700",
  Thuy: "text-sky-800",
  Hoa: "text-red-700",
  Tho: "text-amber-700",
};

const TONE_CLASS: Record<Tone, string> = {
  sang: "border-jade/30 bg-jade/10 text-jade",
  kha: "border-accent/50 bg-accent/15 text-wood",
  vun: "border-border bg-muted text-muted-foreground",
};

/** Vị trí trên lưới 4×4 theo số cung 1 (Tý) đến 12 (Hợi). */
const GRID: Record<number, [number, number]> = {
  6: [1, 1],
  7: [2, 1],
  8: [3, 1],
  9: [4, 1],
  5: [1, 2],
  10: [4, 2],
  4: [1, 3],
  11: [4, 3],
  3: [1, 4],
  2: [2, 4],
  1: [3, 4],
  12: [4, 4],
};

function ToneBadge({ tone }: { tone: Tone }) {
  return (
    <span className={cn("inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium", TONE_CLASS[tone])}>
      {TONE_LABEL[tone]}
    </span>
  );
}

function PalaceCell({
  palace,
  chart,
  selected,
  linked,
  onSelect,
}: {
  palace: Palace;
  chart: LaSo;
  selected: boolean;
  linked: boolean;
  onSelect: () => void;
}) {
  const [column, row] = GRID[palace.position];
  const mains = palace.stars.filter((star) => star.kind === "chinh");
  const good = palace.stars.filter((star) => star.kind === "cat" && star.major);
  const bad = palace.stars.filter((star) => star.kind === "hung" && star.major);
  // Tối đa 10 sao, hai cột 5 hàng, để mọi ô cao bằng nhau; danh sách đủ nằm ở phần luận giải.
  const shownGood = good.slice(0, 6);
  const aux = [...shownGood, ...bad.slice(0, 10 - shownGood.length)];
  const style: CSSProperties = { gridColumn: column, gridRow: row };
  const isMenh = palace.position === chart.menhPosition;

  return (
    <button
      type="button"
      onClick={onSelect}
      style={style}
      aria-pressed={selected}
      aria-label={`Cung ${palace.name}, ${palace.chiLabel}`}
      className={cn(
        "flex h-[6.5rem] min-w-0 flex-col items-center bg-card p-1.5 text-center transition-colors md:h-[12rem] md:p-2",
        linked && !selected && "bg-[#fbf1da]",
        selected && "bg-[#f7e7bf] ring-2 ring-inset ring-primary",
      )}
    >
      <span className="flex w-full items-center justify-between gap-1 text-[10px] leading-none text-muted-foreground md:text-[11px]">
        <span>{palace.chiLabel}</span>
        <span className="tabular-nums">{palace.daiHan}</span>
      </span>
      <span
        className={cn(
          "mt-1 w-full truncate text-[11px] leading-tight font-semibold md:text-[14px]",
          isMenh ? "text-primary" : "text-ink",
        )}
      >
        {palace.name}
        {palace.isThan ? (
          <span className="ml-1 font-normal text-bronze">
            <span className="md:hidden">(T)</span>
            <span className="hidden md:inline">· Thân</span>
          </span>
        ) : null}
      </span>
      <span className="flex w-full flex-1 flex-col justify-center md:mt-1 md:h-[2.5rem] md:flex-none">
        {mains.length ? (
          mains.map((star) => (
            <span
              key={star.name}
              className={cn(
                "block truncate text-[10px] leading-[1.3] font-semibold tracking-tight md:text-[13px] md:tracking-normal",
                ELEMENT_COLOR[star.element],
              )}
            >
              {star.name}
              {star.brightness ? (
                <span className="ml-px text-[8.5px] font-normal opacity-75 md:ml-0.5 md:text-[9px]">{star.brightness}</span>
              ) : null}
            </span>
          ))
        ) : (
          <span className="text-[9.5px] text-muted-foreground italic md:text-[11.5px]">Vô chính diệu</span>
        )}
      </span>
      <span className="mt-1 hidden w-full flex-1 flex-wrap content-start justify-center text-[10.5px] leading-[1.35] md:flex">
        {aux.map((star) => (
          <span
            key={star.name}
            className={cn("w-1/2 truncate px-0.5", star.kind === "hung" ? "text-muted-foreground" : "text-wood")}
          >
            {star.name}
          </span>
        ))}
      </span>
      <span className="h-3 text-[9.5px] leading-3 font-medium text-primary md:h-3.5 md:text-[10.5px] md:leading-3.5">
        {[palace.tuan ? "Tuần" : "", palace.triet ? "Triệt" : ""].filter(Boolean).join(" · ")}
      </span>
    </button>
  );
}

function CenterInfo({ chart }: { chart: LaSo }) {
  const { profile, lunar } = chart;
  const rows: [string, string][] = [
    ["Dương lịch", `${profile.birth.day}/${profile.birth.month}/${profile.birth.year}`],
    ["Âm lịch", `${lunar.day}/${lunar.month}${lunar.leap ? " nhuận" : ""}/${lunar.year}`],
    ["Giờ sinh", `${CHI_VI[chart.hourChi]} (${profile.birthHour} giờ)`],
    ["Năm", `${chart.yearLabel} · ${chart.amDuongNamNu}`],
    ["Bản mệnh", chart.banMenh],
    ["Cục", chart.cucName],
    ["Mệnh chủ", chart.menhChu],
    ["Thân chủ", chart.thanChu],
  ];
  return (
    <div
      style={{ gridColumn: "2 / span 2", gridRow: "2 / span 2" }}
      className="lacquer relative flex min-w-0 flex-col justify-center overflow-hidden p-2 text-center text-[#fff8ec] md:p-5"
    >
      <div className="cloud-motif pointer-events-none absolute inset-0" aria-hidden="true" />
      <p className="relative text-[9px] tracking-[0.16em] text-accent uppercase md:text-[11px]">Lá số Tử Vi</p>
      <p className="ink-heading relative mt-0.5 truncate text-[14px] leading-tight md:text-2xl">{profile.fullName}</p>
      <dl className="relative mx-auto mt-1 w-full max-w-md md:mt-4 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-2.5 md:text-center">
        {rows.map(([label, value], index) => (
          <div key={label} className={cn("flex justify-between gap-1 md:block", index > 5 && "hidden md:block", index < 2 && "hidden md:block")}>
            <dt className="text-[9.5px] text-[#f1e5cb]/60 md:text-[11px]">{label}</dt>
            <dd className="truncate text-[9.5px] font-medium md:text-[13px]">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function PalaceDetail({ chart, palace }: { chart: LaSo; palace: Palace }) {
  const reading = readPalace(chart, palace);
  const links = tamPhuong(palace.position)
    .slice(1)
    .map((position) => chart.palaces[position - 1].name);
  const others = palace.stars.filter((star) => star.kind !== "chinh");

  return (
    <article className="paper-card rounded-2xl p-5 sm:p-6">
      <header className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="eyebrow">Cung {palace.canChiLabel}</p>
          <h3 className="ink-heading mt-0.5 text-xl text-ink">
            {palace.name}
            <span className="ml-2 text-sm font-normal text-muted-foreground">{reading.title}</span>
          </h3>
          <p className="mt-0.5 text-[13px] text-muted-foreground">{reading.hint}</p>
        </div>
        <ToneBadge tone={reading.tone} />
      </header>

      <div className="mt-3 space-y-2.5">
        {reading.pair ? (
          <div className="rounded-xl border border-accent/30 bg-accent/[0.07] px-3.5 py-3">
            <p className="text-sm font-semibold text-primary">{reading.pair.title}</p>
            <p className="mt-1 text-[14.5px] leading-6 text-wood">{reading.pair.essence}</p>
            <p className="mt-1.5 text-[15px] leading-7 text-ink">{reading.pair.text}</p>
          </div>
        ) : null}
        {reading.portrait ? <p className="text-[15px] leading-7 text-wood">{reading.portrait}</p> : null}
        {reading.mains.map((item) => (
          <p key={item.star} className="text-[15px] leading-7 text-ink">
            <span className="font-semibold text-primary">
              {item.star}
              {item.brightness ? <span className="font-normal text-muted-foreground"> ({item.brightness})</span> : null}.{" "}
            </span>
            {item.text}
          </p>
        ))}
        {reading.borrowed ? <p className="text-[15px] leading-7 text-ink">{reading.borrowed}</p> : null}
        {reading.helpers ? (
          <p className="text-[14px] leading-6 text-wood">
            <span className="font-medium text-jade">Được nâng đỡ. </span>
            {reading.helpers}
          </p>
        ) : null}
        {reading.cares ? (
          <p className="text-[14px] leading-6 text-wood">
            <span className="font-medium text-bronze">Nên lưu ý. </span>
            {reading.cares}
          </p>
        ) : null}
        {reading.seal ? <p className="text-[14px] leading-6 text-wood">{reading.seal}</p> : null}
        {reading.echoes.length ? (
          <div className="text-[14px] leading-6 text-wood">
            <p className="font-medium text-ink">Hội chiếu</p>
            {reading.echoes.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        ) : null}
        <p className="rounded-xl bg-accent/10 px-3 py-2 text-[14.5px] leading-6 text-ink">
          <span className="font-semibold text-primary">Nên làm. </span>
          {reading.tip}
        </p>
      </div>

      <p className="mt-3 border-t border-border/60 pt-3 text-[12.5px] leading-5 text-muted-foreground">
        Tam phương: {links.join(", ")}. Đầy đủ các sao: {others.map((star) => star.name).join(", ") || "không có"}.
      </p>
    </article>
  );
}

function OverviewPanel({ chart }: { chart: LaSo }) {
  const overview = useMemo(() => buildOverview(chart), [chart]);
  return (
    <article className="paper-card space-y-3 rounded-2xl p-5 sm:p-6">
      <p className="eyebrow">Tổng quan cuộc đời</p>
      {overview.pair ? (
        <div className="rounded-xl border border-accent/30 bg-accent/[0.07] px-3.5 py-3">
          <p className="text-sm font-semibold text-primary">Mệnh {overview.pair.title}</p>
          <p className="mt-1 text-[14.5px] leading-6 text-wood">{overview.pair.essence}</p>
          <p className="mt-1.5 text-[15px] leading-7 text-ink">{overview.pair.text}</p>
        </div>
      ) : null}
      {overview.portraits.map((item) => (
        <p key={item.star} className="text-[15px] leading-7 text-ink">
          <span className="font-semibold text-primary">Mệnh {item.star}. </span>
          {item.portrait} Thế mạnh lớn nhất: {item.gift.toLowerCase()}
        </p>
      ))}
      <p className="text-[15px] leading-7 text-wood">
        Bản mệnh {chart.banMenh} ({overview.element}), {chart.cucName}. {overview.cucMenh}
      </p>
      <p className="text-[15px] leading-7 text-wood">{overview.thuanLy}</p>
      {overview.than ? <p className="text-[15px] leading-7 text-wood">{overview.than}</p> : null}
      {overview.patterns.length ? (
        <div className="border-t border-border/60 pt-3">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
            <Sparkles className="size-4 text-accent" aria-hidden="true" />
            Cách cục nổi bật
          </p>
          <dl className="mt-2 space-y-2">
            {overview.patterns.map((item) => (
              <div key={item.name}>
                <dt className="inline text-[14.5px] font-semibold text-primary">{item.name}. </dt>
                <dd className="inline text-[14.5px] leading-6 text-wood">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </article>
  );
}

export function LuuNienPanel({
  chart,
  year,
  selectedMonth,
  onYearChange,
}: {
  chart: LaSo;
  year: number;
  selectedMonth?: number | null;
  onYearChange?: (year: number) => void;
}) {
  const reading = useMemo(() => buildYearReading(chart, year), [chart, year]);
  return (
    <article className="paper-card overflow-hidden rounded-2xl">
      <header className="flex flex-wrap items-end justify-between gap-3 px-5 pt-5 sm:px-6">
        <div>
          <p className="eyebrow">Lưu niên</p>
          <h3 className="ink-heading mt-0.5 text-xl text-ink">
            Năm {reading.year} · {reading.yearLabel}
          </h3>
          <p className="text-[13px] text-muted-foreground">
            Tuổi mụ {reading.age}
          </p>
        </div>
        {onYearChange ? (
          <label className="flex items-center gap-2 text-sm text-wood">
            Năm xem
            <Input
              type="number"
              min={1900}
              max={2200}
              value={year}
              onChange={(event) => {
                const next = Number(event.target.value);
                if (next >= 1900 && next <= 2200) onYearChange(next);
              }}
              className="h-9 w-24"
            />
          </label>
        ) : null}
      </header>
      <div className="px-5 py-4 sm:px-6">
        <p className="text-[15px] leading-7 text-ink">{reading.summary}</p>
        <ul className="mt-3 space-y-1.5">
          {reading.stars.map((item) => (
            <li key={item.label} className="text-[14.5px] leading-6 text-wood">
              <span className={cn("font-semibold", item.good ? "text-jade" : "text-bronze")}>{item.label}. </span>
              {item.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-border/60 px-5 py-4 sm:px-6">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
          <CalendarClock className="size-4 text-bronze" aria-hidden="true" />
          Mười hai tháng âm lịch
        </p>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
          {reading.months.map((item) => (
            <li
              key={item.month}
              className={cn(
                "rounded-xl border border-border/70 px-3 py-2",
                selectedMonth === item.month && "border-primary bg-accent/15",
              )}
            >
              <p className="flex items-center justify-between gap-2 text-sm font-medium text-ink">
                Tháng {item.month} · {item.palace.name}
                <ToneBadge tone={item.tone} />
              </p>
              <p className="mt-0.5 text-[13.5px] leading-5 text-wood">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function LuuNhatPanel({ chart, date }: { chart: LaSo; date: SolarDate }) {
  const reading = useMemo(() => buildDayReading(chart, date), [chart, date]);
  const hours = reading.summary.gioHoangDao.slice(0, 4).join(", ");
  return (
    <article className="paper-card rounded-2xl p-5 sm:p-6">
      <header className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="eyebrow">Vận trong ngày</p>
          <h3 className="ink-heading mt-0.5 text-xl text-ink">
            {weekdayName(date)}, {formatSolarSlash(date)}
          </h3>
          <p className="text-[13px] text-muted-foreground">
            Âm lịch {reading.lunar.day}/{reading.lunar.month} · Ngày {reading.summary.canChi.dayLabel}
          </p>
        </div>
        <ToneBadge tone={reading.tone} />
      </header>
      <p className="mt-3 text-[15px] leading-7 text-ink">{reading.text}</p>
      <p className="mt-2 text-[14.5px] leading-6 text-wood">
        Tháng này nguyệt hạn ở cung {reading.monthPalace.name}. Ngày{" "}
        {reading.summary.isHoangDao ? "hoàng đạo" : "bình thường"} ({reading.summary.dayGod}), trực{" "}
        {reading.summary.truc}. Giờ đẹp: {hours}.
      </p>
    </article>
  );
}

export function LaSoView({ chart }: { chart: LaSo }) {
  const [selected, setSelected] = useState(chart.menhPosition);
  const [pickedYear, setPickedYear] = useState<number | null>(null);
  const today = useTodaySolar();
  const year = pickedYear ?? today?.year ?? chart.profile.birth.year + 30;
  const palace = chart.palaces[selected - 1];
  const linked = new Set(tamPhuong(selected));
  const ordered = [...chart.palaces].sort(
    (a, b) => ((a.position - chart.menhPosition + 12) % 12) - ((b.position - chart.menhPosition + 12) % 12),
  );

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <div
        className="grid grid-cols-4 gap-px overflow-hidden rounded-2xl border border-accent/40 bg-accent/40 shadow-[var(--shadow-soft)]"
        style={{ gridTemplateRows: "repeat(4, minmax(0, 1fr))" }}
      >
        {chart.palaces.map((item) => (
          <PalaceCell
            key={item.position}
            palace={item}
            chart={chart}
            selected={item.position === selected}
            linked={linked.has(item.position)}
            onSelect={() => setSelected(item.position)}
          />
        ))}
        <CenterInfo chart={chart} />
      </div>
      <p className="text-center text-[12px] leading-5 text-muted-foreground">
        Bấm vào một cung để đọc luận giải. Ô tô nhạt là các cung hội chiếu. M miếu, V vượng, Đ đắc, B bình, H hãm.
      </p>

      <Tabs defaultValue="cung">
        <TabsList className="mx-auto">
          <TabsTrigger value="cung">
            <Compass className="mr-1 size-3.5" aria-hidden="true" />
            12 cung
          </TabsTrigger>
          <TabsTrigger value="tong-quan">
            <Star className="mr-1 size-3.5" aria-hidden="true" />
            Tổng quan
          </TabsTrigger>
          <TabsTrigger value="luu-nien">Lưu niên</TabsTrigger>
        </TabsList>
        <TabsContent value="cung" className="space-y-3">
          <div className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
            {ordered.map((item) => (
              <button
                key={item.position}
                type="button"
                onClick={() => setSelected(item.position)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1 text-[13px] whitespace-nowrap transition-colors",
                  item.position === selected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-wood hover:border-accent",
                )}
              >
                {item.name}
              </button>
            ))}
          </div>
          <PalaceDetail chart={chart} palace={palace} />
        </TabsContent>
        <TabsContent value="tong-quan">
          <OverviewPanel chart={chart} />
        </TabsContent>
        <TabsContent value="luu-nien">
          <LuuNienPanel chart={chart} year={year} onYearChange={setPickedYear} />
        </TabsContent>
      </Tabs>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <ResultActions title={`Lá số Tử Vi ${chart.profile.fullName}`} text={laSoPlainText(chart)} />
        <Badge variant="gold">
          {palaceTone(chart.palaces[chart.menhPosition - 1]) === "sang" ? "Cung Mệnh rất sáng" : `Mệnh ${chart.banMenh}`}
        </Badge>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">
        An sao theo quy tắc Tử Vi Đẩu Số Việt Nam; một số sao có khác biệt giữa các trường phái. {NGU_HANH_VI[chart.cucElement]} cục quyết định tuổi khởi hạn.
        {chart.lateTy ? " Sinh sau 23 giờ nên được tính sang ngày hôm sau." : ""}
        {chart.lunar.leap ? ` Sinh tháng nhuận nên an sao theo tháng ${chart.usedMonth}.` : ""} Lời luận mang tính giải trí và tham khảo văn hóa.
      </p>
    </div>
  );
}

