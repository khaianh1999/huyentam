"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { auth, signIn, signOut } from "@/lib/auth";
import { getPrisma, hasDatabase } from "@/lib/prisma";
import { isRealDate, parseBoundedInt } from "@/lib/divination/params";

export type FormNotice = { error?: string; ok?: string };

function text(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function validEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 120;
}

function isNextControl(error: unknown): boolean {
  if (typeof error !== "object" || error === null || !("digest" in error)) return false;
  const digest = (error as { digest?: unknown }).digest;
  return typeof digest === "string" && digest.startsWith("NEXT_");
}

async function signInWithPassword(email: string, password: string): Promise<FormNotice> {
  try {
    await signIn("credentials", { email, password, redirectTo: "/tai-khoan" });
  } catch (error) {
    if (isNextControl(error)) throw error;
    if (error instanceof AuthError) {
      return { error: "Email hoặc mật khẩu chưa đúng." };
    }
    throw error;
  }
  return {};
}

export async function loginAction(_prev: FormNotice | null, formData: FormData): Promise<FormNotice> {
  const email = text(formData.get("email")).toLowerCase();
  const password = text(formData.get("password"));
  if (!validEmail(email) || password.length < 6) {
    return { error: "Nhập email hợp lệ và mật khẩu từ 6 ký tự." };
  }
  return signInWithPassword(email, password);
}

export async function registerAction(_prev: FormNotice | null, formData: FormData): Promise<FormNotice> {
  const name = text(formData.get("name")).slice(0, 80);
  const email = text(formData.get("email")).toLowerCase();
  const password = text(formData.get("password"));
  const confirm = text(formData.get("confirm"));

  if (!validEmail(email)) return { error: "Email chưa đúng dạng." };
  if (password.length < 6 || password.length > 72) {
    return { error: "Mật khẩu cần từ 6 đến 72 ký tự." };
  }
  if (password !== confirm) return { error: "Mật khẩu nhập lại chưa khớp." };

  if (!hasDatabase()) {
    return signInWithPassword(email, password);
  }

  const prisma = getPrisma();
  if (!prisma) return { error: "Chưa kết nối được cơ sở dữ liệu." };

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return { error: "Email này đã có tài khoản. Hãy đăng nhập." };
    await prisma.user.create({
      data: {
        email,
        name: name || null,
        passwordHash: await bcrypt.hash(password, 10),
      },
    });
  } catch {
    return { error: "Không ghi được tài khoản. Kiểm tra DATABASE_URL và đã chạy prisma db push chưa." };
  }

  return signInWithPassword(email, password);
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}

export async function saveBirthProfile(_prev: FormNotice | null, formData: FormData): Promise<FormNotice> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Hãy đăng nhập trước khi lưu hồ sơ." };
  if (!hasDatabase() || session.user.demo) {
    return { error: "Chưa có cơ sở dữ liệu. Hồ sơ xem thử được lưu trên trình duyệt." };
  }

  const prisma = getPrisma();
  if (!prisma) return { error: "Chưa kết nối được cơ sở dữ liệu." };

  const name = text(formData.get("name")).slice(0, 80);
  const genderRaw = text(formData.get("gender"));
  const gender = genderRaw === "nam" || genderRaw === "nu" ? genderRaw : null;
  const dayRaw = text(formData.get("birthDay"));
  const monthRaw = text(formData.get("birthMonth"));
  const yearRaw = text(formData.get("birthYear"));
  const hourRaw = text(formData.get("birthHour"));

  const anyDate = Boolean(dayRaw || monthRaw || yearRaw);
  const day = parseBoundedInt(dayRaw, 1, 31);
  const month = parseBoundedInt(monthRaw, 1, 12);
  const year = parseBoundedInt(yearRaw, 1900, 2100);
  if (anyDate && (day === null || month === null || year === null || !isRealDate(year, month, day))) {
    return { error: "Ngày sinh chưa hợp lệ. Nhập đủ ngày, tháng, năm hoặc để trống cả ba." };
  }

  const hour = hourRaw === "" ? null : parseBoundedInt(hourRaw, 0, 23);
  if (hourRaw !== "" && hour === null) return { error: "Giờ sinh chọn từ 0 đến 23, hoặc để trống." };

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name || null,
        gender,
        birthDay: day,
        birthMonth: month,
        birthYear: year,
        birthHour: hour,
      },
    });
  } catch {
    return { error: "Không lưu được hồ sơ. Phiên này có thể không còn trong bảng User." };
  }

  return { ok: "Đã lưu hồ sơ vào cơ sở dữ liệu." };
}
