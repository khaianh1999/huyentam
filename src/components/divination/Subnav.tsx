"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Subnav({
  items,
  label = "Trong mục",
}: {
  items: { href: string; label: string }[];
  label?: string;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className="mb-7 flex flex-wrap gap-1.5">
      {items.map((item) => {
        const base = item.href.split("?")[0] ?? item.href;
        const active =
          pathname === base ||
          (base !== "/tu-vi" &&
            base !== "/boi-toan" &&
            base !== "/gieo-que" &&
            base !== "/phong-thuy" &&
            pathname.startsWith(`${base}/`));
        return (
          <Link
            key={item.href + item.label}
            href={item.href}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm transition",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border border-accent/30 bg-[#fffaf2]/70 text-wood hover:border-accent hover:text-primary",
            )}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export const TU_VI_LINKS = [
  { href: "/tu-vi", label: "Lá số" },
  { href: "/tu-vi/hang-ngay", label: "Hàng ngày" },
  { href: "/tu-vi/hang-nam", label: "Hàng năm" },
  { href: "/tu-vi/hang-thang", label: "Hàng tháng" },
  { href: "/12-con-giap", label: "12 con giáp" },
  { href: "/cung-hoang-dao", label: "Cung hoàng đạo" },
];

export const GIEO_QUE_LINKS = [
  { href: "/gieo-que", label: "Các lối gieo" },
  { href: "/gieo-que/kinh-dich", label: "Kinh Dịch" },
  { href: "/gieo-que/tung-dong-xu", label: "Tung đồng xu" },
  { href: "/gieo-que/lac-que", label: "Lắc quẻ" },
  { href: "/gieo-que/rut-que", label: "Rút quẻ" },
  { href: "/gieo-que/que-hom-nay", label: "Quẻ hôm nay" },
];

export const BOI_TOAN_LINKS = [
  { href: "/boi-toan", label: "Bói toán" },
  { href: "/boi-ten", label: "Bói tên" },
  { href: "/boi-toan/boi-bai-tay", label: "Bài Tây" },
  { href: "/boi-toan/xin-xam-quan-am", label: "Xăm Quan Âm" },
  { href: "/boi-toan/xin-xam-quan-thanh", label: "Xăm Quan Thánh" },
  { href: "/boi-toan/xin-xam-dau-nam", label: "Xăm đầu năm" },
  { href: "/boi-toan/tuoi-hop", label: "Tuổi hợp" },
  { href: "/boi-toan/tuoi-vo-chong", label: "Tuổi vợ chồng" },
  { href: "/boi-toan/boi-tinh-yeu", label: "Tình yêu" },
  { href: "/boi-toan/boi-cong-danh", label: "Công danh" },
  { href: "/boi-toan/boi-tai-loc", label: "Tài lộc" },
  { href: "/boi-toan/boi-van-may", label: "Vận may" },
  { href: "/boi-toan/boi-so-dien-thoai", label: "Số điện thoại" },
  { href: "/boi-toan/boi-bien-so-xe", label: "Biển số xe" },
];

export const PHONG_THUY_LINKS = [
  { href: "/phong-thuy", label: "Phong thủy" },
  { href: "/phong-thuy/ngu-hanh", label: "Ngũ hành" },
  { href: "/phong-thuy/mau-huong", label: "Màu & hướng" },
  { href: "/phong-thuy/nha-o", label: "Nhà ở" },
  { href: "/phong-thuy/tuoi-lam-nha", label: "Tuổi làm nhà" },
  { href: "/phong-thuy/phong-ngu", label: "Phòng ngủ" },
  { href: "/phong-thuy/phong-khach", label: "Phòng khách" },
  { href: "/phong-thuy/ban-lam-viec", label: "Bàn làm việc" },
  { href: "/phong-thuy/ban-tho", label: "Bàn thờ" },
  { href: "/phong-thuy/xay-nha", label: "Xây nhà" },
];
