import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { PageShell } from "@/components/layout/PageShell";
import { RegisterForm } from "@/components/auth/CredentialForms";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { hasDatabase } from "@/lib/prisma";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = {
  ...createPageMetadata({
    title: "Đăng ký",
    description: "Tạo tài khoản Huyền Tâm để lưu ngày giờ sinh.",
    path: "/dang-ky",
  }),
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <PageShell
      width="narrow"
      hideRail
      title="Đăng ký"
      description="Tài khoản dùng cho hồ sơ ngày sinh. Bài viết và công cụ vẫn mở khi chưa đăng nhập."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Đăng ký" },
      ]}
    >
      <Suspense fallback={<LoadingYinYang label="Đang chuẩn bị mẫu đăng ký…" />}>
        <RegisterBody />
      </Suspense>
    </PageShell>
  );
}

async function RegisterBody() {
  await connection();
  const demo = !hasDatabase();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tài khoản mới</CardTitle>
        <CardDescription>
          {demo
            ? "Chưa có DATABASE_URL. Đăng ký chỉ mở phiên xem thử, không tạo bản ghi User. Khi có cơ sở dữ liệu, mật khẩu được băm bằng bcrypt trước khi ghi."
            : "Mật khẩu được băm trước khi lưu. Email đã dùng thì không tạo thêm."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pb-6">
        <RegisterForm />
        <p className="text-sm text-muted-foreground">
          Đã có tài khoản?{" "}
          <Link href="/dang-nhap" className="text-primary underline-offset-4 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
