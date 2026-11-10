export type VnDate = {
  key: string;
  year: number;
  month: number;
  day: number;
  label: string;
};

export function vnDateParts(date: Date): VnDate {
  const key = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
  const [yearText, monthText, dayText] = key.split("-");
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const label = new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  return { key, year, month, day, label };
}

export function weekKeyFromParts(year: number, month: number, day: number): string {
  const utc = new Date(Date.UTC(year, month - 1, day));
  const weekday = utc.getUTCDay() || 7;
  utc.setUTCDate(utc.getUTCDate() - weekday + 1);
  const y = utc.getUTCFullYear();
  const m = String(utc.getUTCMonth() + 1).padStart(2, "0");
  const d = String(utc.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function monthKeyFromParts(year: number, month: number): string {
  return `${year}-${String(month).padStart(2, "0")}`;
}
