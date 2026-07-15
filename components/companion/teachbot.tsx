"use client"

import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"

export type CompanionMode = "idle" | "listening" | "thinking" | "speaking" | "celebrating"

const sizeMap = {
  sm: 180,
  md: 300,
  lg: 400,
} as const

export function TeachBot({
  mode = "idle",
  size = "md",
  className,
}: {
  mode?: CompanionMode
  size?: keyof typeof sizeMap
  className?: string
}) {
  const px = sizeMap[size]
  const listening = mode === "listening"
  const thinking = mode === "thinking"
  const speaking = mode === "speaking"
  const celebrating = mode === "celebrating"

  return (
    <div
      className={cn("teachbot relative select-none", `teachbot--${mode}`, className)}
      style={{ width: px, height: px * 1.15 }}
      role="img"
      aria-label={`AI companion, ${mode}`}
    >
      <style>{`
        .teachbot * { transform-origin: center; }
        .teachbot-motion { animation: teachbot-idle-float 6.8s ease-in-out infinite; }
        .teachbot-breathe { animation: teachbot-breathe 4.6s ease-in-out infinite; }
        .teachbot-head { transition: transform 500ms cubic-bezier(.22,1,.36,1), filter 500ms ease; }
        .teachbot-eye { animation: teachbot-blink 5.8s ease-in-out infinite; }
        .teachbot-eye:nth-child(2) { animation-delay: 90ms; }
        .teachbot-pupil { transition: transform 450ms cubic-bezier(.22,1,.36,1), width 350ms ease, height 350ms ease; }
        .teachbot-core { animation: teachbot-core-idle 3.6s ease-in-out infinite; }
        .teachbot-antenna-light { animation: teachbot-antenna 2.8s ease-in-out infinite; }
        .teachbot-left-arm, .teachbot-right-arm { transition: transform 500ms cubic-bezier(.22,1,.36,1); }
        .teachbot--idle .teachbot-pupil { animation: teachbot-eye-drift 5.7s ease-in-out infinite; }
        .teachbot--listening .teachbot-motion { animation: teachbot-listen-float 3.2s ease-in-out infinite; }
        .teachbot--listening .teachbot-head { transform: translateX(-50%) translateY(2%) scale(1.015); }
        .teachbot--listening .teachbot-pupil { transform: scaleX(.82) scaleY(1.08); }
        .teachbot--listening .teachbot-side-light { opacity: 1; animation: teachbot-listen-light 1.15s ease-in-out infinite; }
        .teachbot--listening .teachbot-core { animation: teachbot-listen-core 1.25s ease-in-out infinite; }
        .teachbot--thinking .teachbot-motion { animation: teachbot-think-float 4.3s ease-in-out infinite; }
        .teachbot--thinking .teachbot-head { transform: translateX(-50%) rotate(-6deg); }
        .teachbot--thinking .teachbot-pupil { transform: translate(18%, -28%) scale(.9); }
        .teachbot--thinking .teachbot-core { animation: teachbot-think-core 1.7s ease-in-out infinite; }
        .teachbot--speaking .teachbot-motion { animation: teachbot-speak-nod 2.2s ease-in-out infinite; }
        .teachbot--speaking .teachbot-head { transform: translateX(-50%) rotate(1.5deg); }
        .teachbot--speaking .teachbot-pupil { animation: teachbot-speaking-eyes 2.6s ease-in-out infinite; }
        .teachbot--speaking .teachbot-left-arm { animation: teachbot-left-gesture 1.85s ease-in-out infinite; }
        .teachbot--speaking .teachbot-right-arm { animation: teachbot-right-gesture 2.1s ease-in-out infinite; }
        .teachbot--celebrating .teachbot-motion { animation: teachbot-celebrate-bounce .85s cubic-bezier(.28,.84,.42,1) infinite alternate; }
        .teachbot--celebrating .teachbot-head { transform: translateX(-50%) scale(1.03); }
        .teachbot--celebrating .teachbot-core { animation: teachbot-celebrate-core 1s ease-in-out infinite; }
        .teachbot--celebrating .teachbot-right-arm { animation: teachbot-celebrate-wave .62s ease-in-out infinite; }
        .teachbot--celebrating .teachbot-left-arm { animation: teachbot-left-cheer .62s ease-in-out infinite; }
        .teachbot-processing-ring { animation: teachbot-spin 3.4s linear infinite; }
        .teachbot-processing-particle { animation: teachbot-particle 1.9s ease-in-out infinite; }
        .teachbot-mouth-bar { animation: teachbot-mouth 560ms ease-in-out infinite alternate; }
        .teachbot-confetti { animation: teachbot-confetti 1.45s ease-out infinite; }
        @keyframes teachbot-idle-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2.5%); } }
        @keyframes teachbot-breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.012,.992); } }
        @keyframes teachbot-blink { 0%,44%,48%,100% { transform: scaleY(1); } 46% { transform: scaleY(.08); } }
        @keyframes teachbot-eye-drift { 0%,18%,100% { transform: translate(0,0); } 30% { transform: translate(13%,2%); } 50% { transform: translate(-10%,-4%); } 70% { transform: translate(4%,5%); } }
        @keyframes teachbot-core-idle { 0%,100% { transform: translate(-50%,-50%) scale(1); opacity:.9; } 50% { transform: translate(-50%,-50%) scale(1.06); opacity:1; } }
        @keyframes teachbot-antenna { 0%,100% { opacity:.75; } 50% { opacity:1; filter: brightness(1.2); } }
        @keyframes teachbot-listen-float { 0%,100% { transform: translateY(1%) rotate(0); } 50% { transform: translateY(-1%) rotate(-.7deg); } }
        @keyframes teachbot-listen-light { 0%,100% { transform: scale(.8); filter: brightness(1); } 50% { transform: scale(1.35); filter: brightness(1.45); } }
        @keyframes teachbot-listen-core { 0%,100% { transform: translate(-50%,-50%) scale(1); box-shadow:0 0 18px 4px var(--color-primary); } 50% { transform: translate(-50%,-50%) scale(1.24); box-shadow:0 0 34px 12px var(--color-primary); } }
        @keyframes teachbot-think-float { 0%,100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-2%) rotate(1deg); } }
        @keyframes teachbot-think-core { 0%,100% { transform: translate(-50%,-50%) scale(.94); opacity:.7; } 50% { transform: translate(-50%,-50%) scale(1.18); opacity:1; } }
        @keyframes teachbot-spin { to { transform: translate(-50%,-50%) rotate(360deg); } }
        @keyframes teachbot-particle { 0%,100% { opacity:.25; transform: translateY(3px) scale(.65); } 50% { opacity:1; transform: translateY(-4px) scale(1.1); } }
        @keyframes teachbot-speak-nod { 0%,100% { transform: translateY(0) rotate(0); } 30% { transform: translateY(-1.5%) rotate(.7deg); } 70% { transform: translateY(.5%) rotate(-.7deg); } }
        @keyframes teachbot-speaking-eyes { 0%,100% { transform: translate(0,0); } 33% { transform: translate(7%,1%); } 66% { transform: translate(-5%,-2%); } }
        @keyframes teachbot-mouth { from { transform: scaleY(.42); opacity:.55; } to { transform: scaleY(1.3); opacity:1; } }
        @keyframes teachbot-left-gesture { 0%,100% { transform: rotate(12deg); } 50% { transform: rotate(-1deg) translateY(-4%); } }
        @keyframes teachbot-right-gesture { 0%,100% { transform: rotate(-7deg); } 50% { transform: rotate(-21deg) translateY(-6%); } }
        @keyframes teachbot-celebrate-bounce { from { transform: translateY(1%); } to { transform: translateY(-6%); } }
        @keyframes teachbot-celebrate-core { 0%,100% { transform: translate(-50%,-50%) scale(1); box-shadow:0 0 20px 5px #22c55e; } 50% { transform: translate(-50%,-50%) scale(1.32); box-shadow:0 0 38px 16px #22c55e; } }
        @keyframes teachbot-celebrate-wave { from { transform: rotate(-38deg); } to { transform: rotate(24deg); } }
        @keyframes teachbot-left-cheer { from { transform: rotate(-25deg) translateY(-3%); } to { transform: rotate(5deg) translateY(-15%); } }
        @keyframes teachbot-confetti { 0% { opacity:0; transform:translate(0,0) rotate(0); } 15% { opacity:1; } 100% { opacity:0; transform:translate(var(--x), var(--y)) rotate(300deg); } }
        @media (prefers-reduced-motion: reduce) { .teachbot *, .teachbot-motion, .teachbot-breathe { animation: none !important; transition: none !important; } }
      `}</style>

      <div
        className={cn(
          "absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-all duration-700",
          celebrating ? "bg-green-400/40" : listening || speaking ? "bg-primary/30" : "bg-primary/15",
        )}
        style={{ width: px * 0.95, height: px * 0.95 }}
      />

      {thinking && <div className="teachbot-processing-ring absolute left-1/2 top-[34%] h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-primary/25" />}

      {celebrating && ["-38px,-56px", "42px,-68px", "-68px,-8px", "72px,-18px", "-12px,-88px", "18px,-46px"].map((offset, index) => {
        const [x, y] = offset.split(",")
        return <span key={offset} className="teachbot-confetti absolute left-1/2 top-[34%] h-2 w-1.5 rounded-sm bg-primary" style={{ "--x": x, "--y": y, animationDelay: `${index * 110}ms`, backgroundColor: index % 2 ? "#22c55e" : undefined } as CSSProperties} />
      })}

      <div className="teachbot-motion absolute inset-0">
        <div className="teachbot-breathe absolute inset-0">
          <div className="absolute left-1/2 top-[4%] -translate-x-1/2">
            <div className="mx-auto w-[3px] rounded-full bg-gradient-to-b from-zinc-300 to-zinc-400 dark:from-zinc-400 dark:to-zinc-500" style={{ height: px * 0.06 }} />
            <div className="teachbot-antenna-light mx-auto rounded-full bg-primary shadow-[0_0_16px_4px_var(--color-primary)]" style={{ width: px * 0.05, height: px * 0.05 }} />
          </div>

          <div className="teachbot-head absolute left-1/2 rounded-[42%] bg-gradient-to-b from-white to-zinc-100 shadow-[0_20px_50px_-12px_rgba(16,60,40,0.35),inset_0_2px_6px_rgba(255,255,255,0.9),inset_0_-10px_20px_rgba(0,0,0,0.06)] dark:from-zinc-50 dark:to-zinc-200" style={{ top: px * 0.09, width: px * 0.62, height: px * 0.5, transform: "translateX(-50%)" }}>
            {["left-[10%]", "right-[10%]"].map((position) => <div key={position} className={cn("teachbot-side-light absolute top-[58%] rounded-full bg-primary/70 opacity-40", position)} style={{ width: px * 0.05, height: px * 0.05, filter: "blur(1px)" }} />)}
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-[14%] rounded-[44%] bg-gradient-to-b from-[#0e1a16] to-[#0a1310] shadow-[inset_0_2px_10px_rgba(0,0,0,0.6)]" style={{ width: px * 0.46, height: px * 0.3 }}>
              {[0, 1].map((index) => <div key={index} className="teachbot-eye">{celebrating ? <div className="rounded-b-full border-primary shadow-[0_0_12px_2px_var(--color-primary)]" style={{ width: px * 0.075, height: px * 0.04, borderBottomWidth: px * 0.018 }} /> : <div className="teachbot-pupil rounded-full bg-primary shadow-[0_0_14px_3px_var(--color-primary)]" style={{ width: px * (thinking ? 0.05 : 0.07), height: px * (thinking ? 0.05 : 0.09) }} />}</div>)}
              {speaking && <div className="absolute bottom-[16%] left-1/2 flex -translate-x-1/2 items-end gap-[3px]">{[0, 1, 2, 3, 4].map((index) => <span key={index} className="teachbot-mouth-bar block w-[3px] rounded-full bg-primary/90" style={{ height: px * 0.05, animationDelay: `${index * 90}ms` }} />)}</div>}
              {thinking && <div className="absolute bottom-[14%] left-1/2 flex -translate-x-1/2 gap-1">{[0, 1, 2].map((index) => <span key={index} className="teachbot-processing-particle block rounded-full bg-primary/80" style={{ width: px * 0.018, height: px * 0.018, animationDelay: `${index * 180}ms` }} />)}</div>}
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 rounded-[38%] bg-gradient-to-b from-white to-zinc-100 shadow-[0_24px_50px_-14px_rgba(16,60,40,0.4),inset_0_2px_6px_rgba(255,255,255,0.9),inset_0_-12px_24px_rgba(0,0,0,0.07)] dark:from-zinc-50 dark:to-zinc-200" style={{ top: px * 0.56, width: px * 0.5, height: px * 0.4 }}>
            <div className="teachbot-core absolute left-1/2 top-1/2 rounded-full bg-primary shadow-[0_0_16px_4px_var(--color-primary)]" style={{ width: px * 0.12, height: px * 0.12 }}><div className="absolute inset-[22%] rounded-full bg-white/70" /></div>
            {listening && <div className="absolute left-1/2 top-1/2 h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/60 animate-ping" />}
          </div>

          <div className="teachbot-left-arm absolute rounded-full bg-gradient-to-b from-white to-zinc-200 shadow-md dark:from-zinc-100 dark:to-zinc-300" style={{ top: px * 0.62, left: px * 0.14, width: px * 0.11, height: px * 0.26, transform: "rotate(12deg)" }} />
          <div className="teachbot-right-arm absolute origin-top" style={{ top: px * 0.6, right: px * 0.13, width: px * 0.11, height: px * 0.27, transform: "rotate(-7deg)" }}><div className="h-full w-full rounded-full bg-gradient-to-b from-white to-zinc-200 shadow-md dark:from-zinc-100 dark:to-zinc-300" /><div className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-white shadow-md dark:bg-zinc-100" style={{ width: px * 0.09, height: px * 0.09 }} /></div>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 rounded-[50%] bg-black/10 blur-md dark:bg-black/40" style={{ bottom: px * 0.01, width: px * 0.44, height: px * 0.05 }} />
    </div>
  )
}