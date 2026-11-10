"use client";

import { useActionState } from "react";
import { loginAction, registerAction } from "@/lib/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Notice({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
      {error}
    </p>
  );
}

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <form action={action} className="space-y-4">
      <Notice error={state?.error} />
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Mật khẩu</Label>
        <Input id="password" name="password" type="password" autoComplete="current-password" required minLength={6} />
      </div>
      <Button type="submit" variant="gold" disabled={pending}>
        {pending ? "Đang mở phiên…" : "Đăng nhập"}
      </Button>
    </form>
  );
}

export function RegisterForm() {
  const [state, action, pending] = useActionState(registerAction, null);

  return (
    <form action={action} className="space-y-4">
      <Notice error={state?.error} />
      <div className="space-y-2">
        <Label htmlFor="name">Tên hiển thị</Label>
        <Input id="name" name="name" autoComplete="name" maxLength={80} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Mật khẩu</Label>
        <Input id="password" name="password" type="password" autoComplete="new-password" required minLength={6} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm">Nhập lại mật khẩu</Label>
        <Input id="confirm" name="confirm" type="password" autoComplete="new-password" required minLength={6} />
      </div>
      <Button type="submit" variant="gold" disabled={pending}>
        {pending ? "Đang tạo phiên…" : "Đăng ký"}
      </Button>
    </form>
  );
}
