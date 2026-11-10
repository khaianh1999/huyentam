import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminChrome } from "@/components/admin/AdminChrome";

export const metadata: Metadata = {
  title: "Quản trị",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminChrome>{children}</AdminChrome>;
}
