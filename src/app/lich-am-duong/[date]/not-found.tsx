import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";

export default function DayNotFound() {
  return (
    <PageShell
      title="Không thấy ngày này"
      description="Đường dẫn cần đúng dạng năm-tháng-ngày, ví dụ 2026-11-10, và là một ngày dương lịch có thật."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Lịch âm dương", href: "/lich-am-duong" },
        { label: "Ngày không hợp lệ" },
      ]}
    >
      <EmptyState
        title="Ngày không hợp lệ"
        description="Hãy mở lịch tháng và chọn một ô ngày, hoặc kiểm tra lại năm, tháng, ngày trên đường dẫn."
        action={
          <Button asChild>
            <Link href="/lich-am-duong">Về lịch tháng</Link>
          </Button>
        }
      />
    </PageShell>
  );
}
