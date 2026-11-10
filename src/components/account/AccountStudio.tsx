"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { saveBirthProfile, type FormNotice } from "@/lib/auth-actions";
import { BIRTH_HOURS } from "@/lib/divination/params";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

const STORAGE_KEY = "huyen-tam.profile.v1";

export type BirthDraft = {
  name: string;
  gender: "" | "nam" | "nu";
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  birthHour: string;
};

type AccountStudioProps = {
  email: string;
  demo: boolean;
  mode: "database" | "browser";
  initial: BirthDraft;
};

function emptyDraft(name: string): BirthDraft {
  return { name, gender: "", birthDay: "", birthMonth: "", birthYear: "", birthHour: "" };
}

function readDraft(raw: string | null, fallback: BirthDraft): BirthDraft {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw) as Partial<BirthDraft>;
    const gender = parsed.gender === "nam" || parsed.gender === "nu" ? parsed.gender : "";
    return {
      name: typeof parsed.name === "string" ? parsed.name.slice(0, 80) : fallback.name,
      gender,
      birthDay: typeof parsed.birthDay === "string" ? parsed.birthDay : "",
      birthMonth: typeof parsed.birthMonth === "string" ? parsed.birthMonth : "",
      birthYear: typeof parsed.birthYear === "string" ? parsed.birthYear : "",
      birthHour: typeof parsed.birthHour === "string" ? parsed.birthHour : "",
    };
  } catch {
    return fallback;
  }
}

export function AccountStudio({ email, demo, mode, initial }: AccountStudioProps) {
  const [draft, setDraft] = useState<BirthDraft>(initial);
  const [localNote, setLocalNote] = useState<string | null>(null);
  const [state, action, pending] = useActionState(saveBirthProfile, null as FormNotice | null);

  const loaded = useRef(false);

  useEffect(() => {
    if (mode !== "browser" || loaded.current) return;
    loaded.current = true;
    setDraft(readDraft(window.localStorage.getItem(STORAGE_KEY), initial));
  }, [mode, initial]);

  function patch(partial: Partial<BirthDraft>) {
    setDraft((current) => ({ ...current, ...partial }));
    setLocalNote(null);
  }

  function saveLocal() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    setLocalNote("Đã lưu trên trình duyệt này. Dữ liệu không gửi lên máy chủ.");
  }

  function clearLocal() {
    window.localStorage.removeItem(STORAGE_KEY);
    setDraft(emptyDraft(initial.name));
    setLocalNote("Đã xóa hồ sơ lưu trên trình duyệt.");
  }

  const fields = (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="name">Tên hiển thị</Label>
        <Input
          id="name"
          name="name"
          value={draft.name}
          maxLength={80}
          onChange={(event) => patch({ name: event.target.value })}
        />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={email} readOnly />
      </div>
      <div className="space-y-2">
        <Label htmlFor="gender">Giới tính</Label>
        <Select
          id="gender"
          name="gender"
          value={draft.gender}
          onChange={(event) => patch({ gender: event.target.value === "nu" ? "nu" : event.target.value === "nam" ? "nam" : "" })}
        >
          <option value="">Chưa chọn</option>
          <option value="nam">Nam</option>
          <option value="nu">Nữ</option>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="birthHour">Giờ sinh</Label>
        <Select
          id="birthHour"
          name="birthHour"
          value={draft.birthHour}
          onChange={(event) => patch({ birthHour: event.target.value })}
        >
          <option value="">Chưa rõ</option>
          {BIRTH_HOURS.map((item) => (
            <option key={item.hour} value={String(item.hour)}>
              {item.label}
            </option>
          ))}
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="birthDay">Ngày</Label>
        <Input
          id="birthDay"
          name="birthDay"
          inputMode="numeric"
          value={draft.birthDay}
          onChange={(event) => patch({ birthDay: event.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="birthMonth">Tháng</Label>
        <Input
          id="birthMonth"
          name="birthMonth"
          inputMode="numeric"
          value={draft.birthMonth}
          onChange={(event) => patch({ birthMonth: event.target.value })}
        />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="birthYear">Năm dương lịch</Label>
        <Input
          id="birthYear"
          name="birthYear"
          inputMode="numeric"
          value={draft.birthYear}
          onChange={(event) => patch({ birthYear: event.target.value })}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <p className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm leading-relaxed text-wood">
        {mode === "browser"
          ? "Đang lưu trên trình duyệt (localStorage), vì chưa có DATABASE_URL. Hồ sơ không đồng bộ giữa các máy."
          : "Hồ sơ ghi vào bảng User: ngày, tháng, năm, giờ sinh và giới tính."}
        {demo ? " Phiên này là phiên xem thử." : ""}
      </p>

      {mode === "browser" ? (
        <div className="space-y-4">
          {fields}
          {localNote ? <p className="text-sm text-jade">{localNote}</p> : null}
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="gold" onClick={saveLocal}>
              Lưu trên trình duyệt
            </Button>
            <Button type="button" variant="outline" onClick={clearLocal}>
              Xóa bản lưu
            </Button>
          </div>
        </div>
      ) : (
        <form action={action} className="space-y-4">
          {fields}
          {state?.error ? (
            <p role="alert" className="text-sm text-destructive">
              {state.error}
            </p>
          ) : null}
          {state?.ok ? <p className="text-sm text-jade">{state.ok}</p> : null}
          <Button type="submit" variant="gold" disabled={pending}>
            {pending ? "Đang lưu…" : "Lưu hồ sơ"}
          </Button>
        </form>
      )}
    </div>
  );
}
