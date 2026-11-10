import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { PageShell } from "@/components/layout/PageShell";
import { LoginForm } from "@/components/auth/CredentialForms";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { hasDatabase } from "@/lib/prisma";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = {
  ...createPageMetadata({
    title: "Đăng nhập",
    description: "Đăng nhập Huyền Tâm để giữ hồ sơ ngày sinh trên tài khoản.",
    path: "/dang-nhap",
  }),
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <PageShell
      width="narrow"
      hideRail
      title="Đăng nhập"
      description="Phiên dùng JWT. Có cơ sở dữ liệu thì đối chiếu mật khẩu đã băm. Chưa có thì mở phiên xem thử."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Đăng nhập" },
      ]}
    >
      <Suspense fallback={<LoadingYinYang label="Đang chuẩn bị cửa đăng nhập…" />}>
        <LoginBody />
      </Suspense>
    </PageShell>
  );
}

async function LoginBody() {
  await connection();
  const demo = !hasDatabase();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email và mật khẩu</CardTitle>
        <CardDescription>
          {demo
            ? "Chưa có DATABASE_URL. Email hợp lệ và mật khẩu từ 6 ký tự sẽ mở phiên xem thử trên trình duyệt, không ghi bảng User."
            : "Đăng nhập bằng tài khoản đã lưu trong cơ sở dữ liệu."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pb-6">
        <LoginForm />
        <p className="text-sm text-muted-foreground">
          Chưa có tài khoản?{" "}
          <Link href="/dang-ky" className="text-primary underline-offset-4 hover:underline">
            Đăng ký
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
