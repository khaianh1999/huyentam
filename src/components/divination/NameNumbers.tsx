"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, Heart, Lightbulb, ShieldAlert, Sparkles } from "lucide-react";
import { NGU_HANH_VI } from "@/lib/algorithms/calendar/constants";
import { analyzeNameDetail, personalYear } from "@/lib/algorithms/numerology/name";
import { harmonyLabel } from "@/lib/divination/labels";
import { useTodaySolar } from "@/lib/client/use-vn-today";
import {
  ELEMENT_COLORS,
  ELEMENT_RELATION_TEXT,
  NUMBER_PROFILES,
  PERSONAL_YEAR,
  ROLE_INFO,
  type NumberRole,
} from "@/data/name/numbers";
import type { NumerologyResult } from "@/types";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { ResultActions } from "@/components/shared/ResultActions";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ROLES: NumberRole[] = ["lifePath", "destiny", "soul", "personality", "maturity"];
const PART_LABEL = { ho: "Họ", dem: "Đệm", ten: "Tên" } as const;

export function NameNumbers({ result, shareHref }: { result: NumerologyResult; shareHref?: string }) {
  const reduceMotion = useReducedMotion();
  const today = useTodaySolar();
  const detail = analyzeNameDetail(result);
  const [active, setActive] = useState<NumberRole>("lifePath");

  const numbers: Record<NumberRole, number> = {
    lifePath: result.lifePath,
    destiny: result.destiny,
    soul: result.soul,
    personality: result.personality,
    maturity: detail.maturity,
  };
  const activeNumber = numbers[active];
  const profile = NUMBER_PROFILES[activeNumber];
  const given = detail.parts.at(-1)?.given ?? null;
  const rel = ELEMENT_RELATION_TEXT[detail.relation];
  const thisYear = today?.year ?? null;

  const share = [
    `Bói tên ${result.fullName}`,
    ...ROLES.map((role) => `${ROLE_INFO[role].label}: ${numbers[role]} (${NUMBER_PROFILES[numbers[role]]?.title ?? ""})`),
    given ? `Tên "${detail.parts.at(-1)?.word}" (${given.han}): ${given.meaning}` : "",
    `Ngũ hành: tên ${NGU_HANH_VI[result.nameElement]}, mệnh ${detail.napAm}. ${rel.title}.`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="space-y-6">
      {/* Đầu thẻ: tên, nghĩa, bản mệnh */}
      <section className="lacquer relative overflow-hidden rounded-2xl border border-accent/30 px-5 py-6 text-center text-[#fff8ec] sm:px-8">
        <div className="cloud-motif pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative">
          <p className="text-xs tracking-[0.2em] text-accent uppercase">Luận giải họ tên</p>
          <h2 className="ink-heading mt-2 text-3xl leading-tight sm:text-4xl">{result.fullName}</h2>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {detail.parts.map((part, index) => (
              <span key={index} className="rounded-full border border-accent/40 bg-black/20 px-3 py-1 text-xs">
                {PART_LABEL[part.role]} <b className="text-accent">{part.word}</b> · số {part.number}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-[#f1e5cb]/85">
            Sinh {result.birthDate.day}/{result.birthDate.month}/{result.birthDate.year} · năm {detail.canChi} · mệnh {detail.napAm}
          </p>
        </div>
      </section>

      {/* Năm thẻ số, chạm để xem */}
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5">
        {ROLES.map((role, index) => {
          const value = numbers[role];
          const selected = role === active;
          return (
            <motion.button
              key={role}
              type="button"
              onClick={() => setActive(role)}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              aria-pressed={selected}
              className={cn(
                "rounded-2xl border px-2 py-4 text-center transition",
                selected ? "border-primary bg-primary text-primary-foreground shadow-lg" : "paper-card gold-border hover:-translate-y-0.5",
              )}
            >
              <span className={cn("block text-[11px] tracking-[0.12em] uppercase", selected ? "text-accent" : "text-bronze")}>
                {ROLE_INFO[role].label}
              </span>
              <span className={cn("ink-heading mt-1 block text-4xl sm:text-5xl", selected ? "text-[#fff8ec]" : "text-primary")}>{value}</span>
              <span className={cn("mt-1 block text-[11px] leading-tight", selected ? "text-[#f1e5cb]" : "text-muted-foreground")}>
                {NUMBER_PROFILES[value]?.title}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Lời luận của thẻ đang chọn */}
      {profile ? (
        <motion.article
          key={active}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="paper-card overflow-hidden rounded-2xl"
        >
          <header className="border-b border-accent/20 bg-accent/[0.07] px-5 py-4 sm:px-7">
            <p className="eyebrow">
              {ROLE_INFO[active].label} {activeNumber} · {ROLE_INFO[active].question} · {ROLE_INFO[active].hint.toLowerCase()}
            </p>
            <h3 className="ink-heading mt-1 text-2xl text-ink">{profile.title}</h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {profile.keywords.map((word) => (
                <Badge key={word} variant="outline">
                  {word}
                </Badge>
              ))}
            </div>
          </header>
          <div className="space-y-4 px-5 py-5 text-[15px] leading-7 text-ink sm:px-7">
            <p className="font-medium text-wood">{profile.lens[active]}</p>
            <p>{profile.essence}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-jade/[0.07] p-4">
                <h4 className="flex items-center gap-1.5 text-sm font-semibold text-jade">
                  <Sparkles className="size-4" aria-hidden="true" /> Điểm mạnh
                </h4>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[14.5px] leading-6 text-wood">
                  {profile.strengths.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-accent/[0.08] p-4">
                <h4 className="flex items-center gap-1.5 text-sm font-semibold text-bronze">
                  <ShieldAlert className="size-4" aria-hidden="true" /> Điều nên giữ
                </h4>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[14.5px] leading-6 text-wood">
                  {profile.cautions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <dl className="grid gap-4 border-t border-border/60 pt-4 sm:grid-cols-2">
              <div>
                <dt className="flex items-center gap-1.5 text-sm font-semibold">
                  <Briefcase className="size-4 text-bronze" aria-hidden="true" /> Công việc hợp
                </dt>
                <dd className="mt-1 text-[14.5px] leading-6 text-wood">{profile.work}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-sm font-semibold">
                  <Heart className="size-4 text-bronze" aria-hidden="true" /> Tình cảm
                </dt>
                <dd className="mt-1 text-[14.5px] leading-6 text-wood">{profile.love}</dd>
              </div>
            </dl>
            <p className="flex gap-2 rounded-xl border border-accent/30 bg-[#fffaf2] p-4 text-[14.5px] leading-6 text-wood">
              <Lightbulb className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{profile.advice}</span>
            </p>
          </div>
        </motion.article>
      ) : null}

      {/* Ý nghĩa tên chính và ngũ hành */}
      <div className="grid gap-4 md:grid-cols-2">
        <section className="paper-card rounded-2xl p-5">
          <p className="eyebrow">Ý nghĩa tên gọi</p>
          {given ? (
            <>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="ink-heading text-4xl text-primary">{given.han}</span>
                <span className="ink-heading text-2xl text-ink">{detail.parts.at(-1)?.word}</span>
                <Badge variant="outline">hành {NGU_HANH_VI[given.element]}</Badge>
              </div>
              <p className="mt-3 text-[15px] leading-7 text-wood">
                Chữ “{detail.parts.at(-1)?.word}” mang nghĩa {given.meaning}
              </p>
              {detail.givenRelation ? (
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Theo nghĩa chữ, tên thuộc hành {NGU_HANH_VI[given.element]}: {ELEMENT_RELATION_TEXT[detail.givenRelation].title.toLowerCase()}{" "}
                  ({NGU_HANH_VI[given.element]} với mệnh {NGU_HANH_VI[result.birthElement]}).
                </p>
              ) : null}
            </>
          ) : (
            <p className="mt-2 text-[15px] leading-7 text-wood">
              Tên “{detail.parts.at(-1)?.word}” chưa có trong bộ chữ Hán Việt của Huyền Tâm, hoặc là tên thuần Việt. Phần luận dưới đây dựa
              trên con số của tên: số {detail.parts.at(-1)?.number}, {NUMBER_PROFILES[detail.parts.at(-1)?.number ?? 0]?.title.toLowerCase()}, với
              nét {NUMBER_PROFILES[detail.parts.at(-1)?.number ?? 0]?.keywords.join(", ")}.
            </p>
          )}
        </section>

        <section className="paper-card rounded-2xl p-5">
          <p className="eyebrow">Ngũ hành tên và mệnh</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge variant="gold">{harmonyLabel(result.harmony)}</Badge>
            <Badge variant="outline">Tên: {NGU_HANH_VI[result.nameElement]}</Badge>
            <Badge variant="outline">Mệnh: {detail.napAm}</Badge>
          </div>
          <h3 className="ink-heading mt-3 text-xl text-ink">{rel.title}</h3>
          <p className="mt-1 text-[15px] leading-7 text-wood">{rel.text}</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Màu hợp bản mệnh {NGU_HANH_VI[result.birthElement]}: {ELEMENT_COLORS[result.birthElement]}.
          </p>
        </section>
      </div>

      {/* Năm cá nhân */}
      {thisYear ? (
        <section className="paper-card rounded-2xl p-5">
          <p className="eyebrow">Chu kỳ năm cá nhân</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {[thisYear, thisYear + 1].map((year) => {
              const value = personalYear(result.birthDate, year);
              const info = PERSONAL_YEAR[value];
              return (
                <div key={year} className="flex gap-3">
                  <span className="ink-heading grid size-12 shrink-0 place-items-center rounded-full bg-primary text-xl text-primary-foreground">
                    {value}
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">
                      Năm {year}: {info.title}
                    </h3>
                    <p className="mt-1 text-[14.5px] leading-6 text-wood">{info.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      <Disclaimer type="quan-niem-dan-gian" />
      <p className="text-xs leading-relaxed text-muted-foreground">{result.disclaimer}</p>
      <ResultActions title={`Bói tên ${result.fullName}`} text={share} url={shareHref} />
    </div>
  );
}
