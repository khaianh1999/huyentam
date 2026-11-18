import { Suspense } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CalendarBody, CalendarFallback } from "./CalendarBody";

export const metadata = createPageMetadata({
  title: "Lịch âm dương",
  description:
    "Lịch tháng dương với ngày âm, đổi ngày dương sang âm và âm sang dương theo lịch Việt Nam.",
  path: "/lich-am-duong",
});

export default function LunarCalendarPage() {
  return (
    <PageShell
      width="wide"
      title="Lịch âm dương"
      description="Lịch tháng bên trái, hôm nay và chọn tháng bên phải — đổi dương ↔ âm bên dưới."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Lịch âm dương" },
      ]}
    >
      <Suspense fallback={<CalendarFallback />}>
        <CalendarBody />
      </Suspense>
    </PageShell>
  );
}
