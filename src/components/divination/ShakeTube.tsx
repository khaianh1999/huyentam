"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import Link from "next/link";
import { nanoid } from "nanoid";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Hand, RotateCcw, Smartphone, Volume2, VolumeX } from "lucide-react";
import { HexagramView } from "@/components/divination/HexagramView";
import { Button } from "@/components/ui/button";
import { HEXAGRAMS } from "@/data/hexagrams";
import { pickRandomHexagram } from "@/lib/algorithms/kinh-dich/hexagram";
import { hexResultHref } from "@/lib/divination/params";
import { cn } from "@/lib/utils";
import type { HexagramResult } from "@/types";

type Phase = "intro" | "ready" | "falling" | "done";
type Sensor = "server" | "motion" | "permission" | "insecure" | "none";

/** Độ biến thiên gia tốc (m/s²) giữa hai lần đo để tính là một cú lắc. */
const SHAKE_THRESHOLD = 13;
const MIN_HIT_GAP_MS = 70;
const ENERGY_PER_HIT = 0.03;
const ENERGY_DECAY_PER_SECOND = 0.22;

type IOSMotion = typeof DeviceMotionEvent & { requestPermission?: () => Promise<"granted" | "denied"> };

function readSensor(): Sensor {
  if (!("DeviceMotionEvent" in window) || !window.matchMedia("(pointer: coarse)").matches) return "none";
  if (!window.isSecureContext) return "insecure";
  return typeof (DeviceMotionEvent as IOSMotion).requestPermission === "function" ? "permission" : "motion";
}

const noSubscribe = () => () => {};
const STICKS = Array.from({ length: 19 }, (_, index) => ({
  left: 14 + (index * 72) / 18,
  height: 98 + ((index * 37) % 34),
  rotate: ((index * 53) % 11) - 5,
  delay: ((index * 29) % 17) / 100,
}));

/** Tiếng thẻ tre va nhau: một nhịp nhiễu ngắn qua lọc dải. */
function playClack(ctx: AudioContext, gain: number) {
  const length = Math.floor(ctx.sampleRate * 0.04);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 2;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1700 + Math.random() * 1500;
  filter.Q.value = 3;
  const volume = ctx.createGain();
  volume.gain.value = gain;
  source.connect(filter).connect(volume).connect(ctx.destination);
  source.start();
}

export function ShakeTube() {
  const reduceMotion = useReducedMotion();
  const sensor = useSyncExternalStore<Sensor>(noSubscribe, readSensor, () => "server");
  const [phase, setPhase] = useState<Phase>("intro");
  const [motionOn, setMotionOn] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);
  const [result, setResult] = useState<HexagramResult | null>(null);

  const sceneRef = useRef<HTMLElement | null>(null);
  const tubeRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const energy = useRef(0);
  const tilt = useRef(0);
  const targetTilt = useRef(0);
  const lastHit = useRef(0);
  const entropy = useRef(0);
  const audio = useRef<AudioContext | null>(null);
  const mutedRef = useRef(false);
  const holdTimer = useRef<number | null>(null);
  const fallTimer = useRef<number | null>(null);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  const release = useCallback(() => {
    if (holdTimer.current) window.clearInterval(holdTimer.current);
    holdTimer.current = null;
    const seed = `${nanoid()}.${Math.floor(entropy.current)}`;
    setResult(pickRandomHexagram(seed));
    setPhase("falling");
    navigator.vibrate?.([60, 40, 120]);
    fallTimer.current = window.setTimeout(() => setPhase("done"), reduceMotion ? 0 : 1500);
  }, [reduceMotion]);

  const hit = useCallback(
    (strength: number, direction: number) => {
      const now = performance.now();
      if (now - lastHit.current < MIN_HIT_GAP_MS) return;
      lastHit.current = now;
      entropy.current += strength * 1000 + now;
      energy.current = Math.min(1, energy.current + ENERGY_PER_HIT * Math.min(strength / SHAKE_THRESHOLD, 1.6));
      targetTilt.current = Math.max(-1, Math.min(1, direction));
      if (audio.current && !mutedRef.current) playClack(audio.current, 0.12 + energy.current * 0.25);
      navigator.vibrate?.(12);
      if (energy.current >= 1) release();
    },
    [release],
  );

  // Đọc gia tốc kế của điện thoại.
  useEffect(() => {
    if (phase !== "ready" || !motionOn) return;
    let previous: { x: number; y: number; z: number } | null = null;
    const onMotion = (event: DeviceMotionEvent) => {
      const a = event.accelerationIncludingGravity;
      if (a?.x == null || a.y == null || a.z == null) return;
      const current = { x: a.x, y: a.y, z: a.z };
      if (previous) {
        const delta = Math.hypot(current.x - previous.x, current.y - previous.y, current.z - previous.z);
        if (delta > SHAKE_THRESHOLD) hit(delta, current.x / 12);
      }
      previous = current;
    };
    window.addEventListener("devicemotion", onMotion);
    return () => window.removeEventListener("devicemotion", onMotion);
  }, [phase, motionOn, hit]);

  // Cập nhật ống bằng style trực tiếp, không render lại theo từng khung hình.
  useEffect(() => {
    if (phase !== "ready") return;
    let frame = 0;
    let previous = performance.now();
    const loop = (now: number) => {
      const dt = (now - previous) / 1000;
      previous = now;
      if (now - lastHit.current > 280) {
        energy.current = Math.max(0, energy.current - ENERGY_DECAY_PER_SECOND * dt);
        targetTilt.current = 0;
      }
      tilt.current += (targetTilt.current - tilt.current) * Math.min(1, dt * 18);
      const tube = tubeRef.current;
      if (tube) {
        tube.style.setProperty("--energy", energy.current.toFixed(3));
        tube.style.transform = reduceMotion
          ? ""
          : `rotate(${(tilt.current * 16).toFixed(2)}deg) translateY(${(-energy.current * 8).toFixed(1)}px)`;
      }
      if (barRef.current) barRef.current.style.transform = `scaleX(${energy.current.toFixed(3)})`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [phase, reduceMotion]);

  useEffect(
    () => () => {
      if (holdTimer.current) window.clearInterval(holdTimer.current);
      if (fallTimer.current) window.clearTimeout(fallTimer.current);
      void audio.current?.close();
    },
    [],
  );

  async function begin() {
    // Phải chạy ngay trong thao tác chạm: iOS và trình duyệt chặn cảm biến, âm thanh nếu không.
    try {
      audio.current ??= new AudioContext();
      void audio.current.resume();
    } catch {
      audio.current = null;
    }
    let enabled = sensor === "motion";
    let message: string | null = null;
    if (sensor === "permission") {
      try {
        enabled = (await (DeviceMotionEvent as IOSMotion).requestPermission?.()) === "granted";
      } catch {
        enabled = false;
      }
      if (!enabled) message = "Máy chưa cho phép đọc cảm biến chuyển động. Bạn vẫn có thể giữ nút để lắc.";
    } else if (sensor === "insecure") {
      message = "Cảm biến lắc chỉ chạy trên trang https. Bạn vẫn có thể giữ nút để lắc.";
    }
    energy.current = 0;
    entropy.current = Math.random() * 1e6;
    setMotionOn(enabled);
    setNotice(message);
    setResult(null);
    setPhase("ready");
    sceneRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  function startHold() {
    if (holdTimer.current || phase !== "ready") return;
    let side = 1;
    holdTimer.current = window.setInterval(() => {
      side = -side;
      hit(SHAKE_THRESHOLD * (0.9 + Math.random() * 0.5), side * (0.5 + Math.random() * 0.5));
    }, 95);
  }

  function stopHold() {
    if (holdTimer.current) window.clearInterval(holdTimer.current);
    holdTimer.current = null;
  }

  function reset() {
    stopHold();
    energy.current = 0;
    setResult(null);
    setPhase("intro");
  }

  const hexagram = result ? HEXAGRAMS.find((item) => item.number === result.primaryNumber) : null;
  const href = result ? hexResultHref({ phuong: "chon", seed: result.seed }) : null;
  const shaking = phase === "ready";

  return (
    <div className="space-y-5">
      {phase === "done" ? (
        <div className="flex flex-wrap justify-center gap-2">
          <Button type="button" variant="gold" size="sm" onClick={reset}>
            <RotateCcw />
            Xin quẻ khác
          </Button>
          {href ? (
            <Button asChild variant="outline" size="sm">
              <Link href={href}>Mở trang kết quả</Link>
            </Button>
          ) : null}
        </div>
      ) : (
      <section ref={sceneRef} className="lacquer relative mx-auto max-w-md scroll-mt-28 overflow-hidden rounded-2xl border border-accent/30 px-5 pt-5 pb-5 text-center text-primary-foreground shadow-[var(--shadow-lift)] sm:px-10">
        <div className="cloud-motif pointer-events-none absolute inset-0" aria-hidden="true" />
        <button
          type="button"
          onClick={() => setMuted((value) => !value)}
          aria-label={muted ? "Bật tiếng thẻ" : "Tắt tiếng thẻ"}
          className="absolute top-3 right-3 z-10 grid size-8 place-items-center rounded-full border border-white/15 bg-white/5 text-[#f1e5cb]"
        >
          {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
        </button>

        <div className="relative">
          <p className="px-10 text-xs leading-relaxed tracking-[0.2em] text-accent uppercase">
            {phase === "intro"
              ? "Tĩnh tâm, nghĩ về điều muốn hỏi"
              : phase === "ready"
                ? motionOn
                  ? "Cầm chắc điện thoại và lắc"
                  : "Giữ nút bên dưới để lắc"
                : "Một thẻ đã rơi"}
          </p>

          <div className="relative mx-auto mt-3 h-56 w-44 select-none" aria-hidden="true">
            <div ref={tubeRef} className="shake-tube absolute inset-x-0 bottom-1 mx-auto h-52 w-24 origin-bottom">
              {STICKS.map((stick, index) => (
                <span
                  key={index}
                  className={cn("tube-stick absolute bottom-12 w-[3.5px] rounded-t-full", shaking && "is-rattling")}
                  style={
                    {
                      left: `${stick.left}%`,
                      height: stick.height,
                      "--r": `${stick.rotate}deg`,
                      animationDelay: `${stick.delay}s`,
                    } as CSSProperties
                  }
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 h-28 overflow-hidden rounded-b-2xl rounded-t-md border border-black/40 bg-[linear-gradient(90deg,#3b1a12_0%,#7c3a1d_22%,#b26a33_46%,#7c3a1d_72%,#2d140e_100%)] shadow-[inset_0_-16px_26px_rgba(0,0,0,0.45)]">
                <span className="absolute inset-x-0 top-5 h-[2px] bg-black/35" />
                <span className="absolute inset-x-0 bottom-5 h-[2px] bg-black/35" />
                <span className="ink-heading absolute inset-0 grid place-items-center text-3xl text-accent/90">籤</span>
              </div>
              <div className="absolute inset-x-[-4px] bottom-[6.6rem] h-3 rounded-full border border-black/40 bg-[linear-gradient(90deg,#55291a,#c58a4b,#55291a)]" />
            </div>

            <AnimatePresence>
              {result && phase === "falling" ? (
                <motion.div
                  key={result.seed}
                  initial={reduceMotion ? false : { y: -130, x: 6, rotate: -8, opacity: 0 }}
                  animate={{ y: 0, x: 0, rotate: 78, opacity: 1 }}
                  transition={{ duration: 0.85, ease: [0.3, 0.9, 0.45, 1.15] }}
                  className="absolute inset-x-0 bottom-4 z-10 mx-auto flex h-36 w-9 flex-col items-center rounded-full border border-[#8a5a24] bg-[linear-gradient(90deg,#d9ad63,#f2d597,#c8964c)] py-2 shadow-[0_18px_30px_-10px_rgba(0,0,0,0.75)]"
                >
                  <span className="ink-heading -rotate-[78deg] text-2xl leading-none text-primary">{hexagram?.symbol}</span>
                  <span className="mt-auto -rotate-[78deg] text-xs font-semibold text-primary">{result.primaryNumber}</span>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <div className={cn("mx-auto h-1.5 max-w-xs overflow-hidden rounded-full bg-white/10", !shaking && "invisible")}>
            <div ref={barRef} className="h-full origin-left scale-x-0 rounded-full bg-accent" />
          </div>

          {phase === "intro" ? (
            <div className="mx-auto mt-3 max-w-sm space-y-3 text-left [&_label]:text-[#f1e5cb]">
              <Button type="button" variant="gold" className="w-full" onClick={() => void begin()}>
                {sensor === "motion" || sensor === "permission" ? <Smartphone /> : <Hand />}
                Bắt đầu xin quẻ
              </Button>
              <p className="text-center text-xs leading-relaxed text-[#f1e5cb]/70">
                {sensor === "motion" || sensor === "permission"
                  ? "Bấm bắt đầu rồi lắc điện thoại như lắc ống xăm, thẻ sẽ tự rơi ra."
                  : "Trên điện thoại, bạn có thể cầm máy lắc thật. Trên máy tính, giữ nút để lắc."}
              </p>
            </div>
          ) : null}

          {phase === "ready" ? (
            <div className="mt-3 space-y-2">
              {notice ? <p className="text-sm text-[#f1e5cb]/85">{notice}</p> : null}
              <Button
                type="button"
                variant={motionOn ? "outline" : "gold"}
                className={cn("touch-none select-none", motionOn && "border-white/25 bg-white/5 text-[#fff8ec] hover:bg-white/10")}
                onPointerDown={startHold}
                onPointerUp={stopHold}
                onPointerLeave={stopHold}
                onPointerCancel={stopHold}
                onKeyDown={(event) => {
                  if (event.key === " " || event.key === "Enter") {
                    event.preventDefault();
                    startHold();
                  }
                }}
                onKeyUp={stopHold}
                onBlur={stopHold}
              >
                <Hand />
                {motionOn ? "Hoặc giữ để lắc" : "Giữ để lắc"}
              </Button>
            </div>
          ) : null}
        </div>
      </section>
      )}

      {result && phase === "done" ? (
        <HexagramView result={result} caption="Quẻ rơi từ ống" />
      ) : null}
    </div>
  );
}
