import { Suspense } from "react";
import { connection } from "next/server";
import { AdminHeading, DataTable, SchemaNote } from "@/components/admin/AdminBits";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { getPrisma, hasDatabase } from "@/lib/prisma";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Người dùng",
  description: "Danh sách tài khoản khi đã nối cơ sở dữ liệu.",
  path: "/admin/nguoi-dung",
});

type UserRow = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: Date;
};

export default function AdminUsersPage() {
  return (
    <>
      <AdminHeading
        eyebrow="Tài khoản"
        title="Người dùng"
        description="Cột khớp model User. Mật khẩu chỉ lưu dạng băm, không hiện ở đây."
      />
      <SchemaNote>
        Role gồm USER, ADMIN, EDITOR. Hồ sơ sinh gồm birthDay, birthMonth, birthYear, birthHour, gender. QueryHistory và Favorite gắn theo userId.
      </SchemaNote>
      <Suspense fallback={<LoadingYinYang label="Đang đọc danh sách…" />}>
        <UserTable />
      </Suspense>
    </>
  );
}

async function loadUsers(): Promise<
  | { status: "no-db" }
  | { status: "error" }
  | { status: "empty" }
  | { status: "ok"; users: UserRow[] }
> {
  await connection();
  if (!hasDatabase()) return { status: "no-db" };
  const prisma = getPrisma();
  if (!prisma) return { status: "no-db" };
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    if (users.length === 0) return { status: "empty" };
    return { status: "ok", users };
  } catch {
    return { status: "error" };
  }
}

async function UserTable() {
  const result = await loadUsers();

  if (result.status === "no-db") {
    return (
      <EmptyState
        title="Chưa có cơ sở dữ liệu"
        description="Đặt DATABASE_URL rồi chạy prisma db push. Trước đó tài khoản xem thử chỉ là JWT, không có hàng trong bảng User."
      />
    );
  }

  if (result.status === "error") {
    return (
      <EmptyState
        title="Không đọc được bảng User"
        description="DATABASE_URL có mặt nhưng kết nối thất bại. Kiểm tra máy chủ Postgres và đã generate client."
      />
    );
  }

  if (result.status === "empty") {
    return (
      <EmptyState
        title="Chưa có tài khoản"
        description="Đăng ký tại /dang-ky sẽ tạo hàng User khi cơ sở dữ liệu đang mở."
      />
    );
  }

  return (
    <DataTable
      headers={["Tên", "Email", "Quyền", "Tạo lúc"]}
      rows={result.users.map((user) => [
        user.name || "—",
        user.email,
        user.role,
        new Intl.DateTimeFormat("vi-VN", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(user.createdAt),
      ])}
    />
  );
}
