import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { PageShell } from "@/components/layout/PageShell";
import { AccountStudio, type BirthDraft } from "@/components/account/AccountStudio";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { logoutAction } from "@/lib/auth-actions";
import { auth } from "@/lib/auth";
import { getPrisma, hasDatabase } from "@/lib/prisma";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = {
  ...createPageMetadata({
    title: "Tài khoản",
    description: "Hồ sơ ngày sinh, lịch sử tra cứu và mục yêu thích trên Huyền Tâm.",
    path: "/tai-khoan",
  }),
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return (
    <PageShell
      title="Tài khoản"
      description="Ngày giờ sinh dùng lại cho tử vi và xem ngày. Lịch sử và mục ghim sẽ nối khi các công cụ ghi QueryHistory và Favorite."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Tài khoản" },
      ]}
    >
      <Suspense fallback={<LoadingYinYang label="Đang mở tài khoản…" />}>
        <AccountBody />
      </Suspense>
    </PageShell>
  );
}

async function AccountBody() {
  await connection();
  const session = await auth();
  if (!session?.user?.email) {
    return (
      <EmptyState
        title="Chưa đăng nhập"
        description="Đăng nhập để giữ hồ sơ ngày sinh. Công cụ vẫn dùng được khi chưa có tài khoản."
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild variant="gold">
              <Link href="/dang-nhap">Đăng nhập</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dang-ky">Đăng ký</Link>
            </Button>
          </div>
        }
      />
    );
  }

  const demo = session.user.demo === true || !hasDatabase();
  const initial = await loadDraft(session.user.id, session.user.name ?? "", demo);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hồ sơ ngày sinh</CardTitle>
          <CardDescription>
            {session.user.email}
            {session.user.role ? ` · ${session.user.role}` : ""}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <AccountStudio
            email={session.user.email}
            demo={session.user.demo === true}
            mode={demo ? "browser" : "database"}
            initial={initial}
          />
          <form action={logoutAction} className="mt-6">
            <Button type="submit" variant="outline">
              Đăng xuất
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lịch sử tra cứu</CardTitle>
            <CardDescription>Model QueryHistory đã có: toolKey, inputJson, resultJson, seed.</CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <EmptyState
              title="Chưa có lần xem nào"
              description="Các công cụ chưa ghi lịch sử vào tài khoản. Khi nối cơ sở dữ liệu, mỗi lần xem ngày, gieo quẻ hoặc tử vi có thể lưu tại đây."
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mục yêu thích</CardTitle>
            <CardDescription>Model Favorite đã có: toolKey, title, payload.</CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <EmptyState
              title="Chưa ghim công cụ"
              description="Nút ghim trên từng công cụ sẽ viết vào Favorite. Hiện danh sách này là chỗ dành sẵn."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

async function loadDraft(userId: string, name: string, demo: boolean): Promise<BirthDraft> {
  const blank: BirthDraft = {
    name,
    gender: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    birthHour: "",
  };
  if (demo) return blank;
  const prisma = getPrisma();
  if (!prisma) return blank;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        gender: true,
        birthDay: true,
        birthMonth: true,
        birthYear: true,
        birthHour: true,
      },
    });
    if (!user) return blank;
    return {
      name: user.name ?? name,
      gender: user.gender === "nam" || user.gender === "nu" ? user.gender : "",
      birthDay: user.birthDay ? String(user.birthDay) : "",
      birthMonth: user.birthMonth ? String(user.birthMonth) : "",
      birthYear: user.birthYear ? String(user.birthYear) : "",
      birthHour: user.birthHour === null || user.birthHour === undefined ? "" : String(user.birthHour),
    };
  } catch {
    return blank;
  }
}
