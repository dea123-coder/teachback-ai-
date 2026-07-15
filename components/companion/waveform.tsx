"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useMemo } from "react"
import { cn } from "@/lib/utils"

type WaveBar = {
  idle: number
  peak: number
  delay: number
  duration: number
}

function createBars(count: number): WaveBar[] {
  return Array.from({ length: count }, (_, index) => {
    const position = count > 1 ? index / (count - 1) : 0.5
    const centerWeight = Math.sin(Math.PI * position)
    const ripple = (Math.sin(index * 1.71) + Math.sin(index * 0.37) + 2) / 4

    return {
      // A quiet, breathing baseline instead of static equal-height bars.
      idle: 5 + centerWeight * 3 + ripple * 2,
      // Focus energy near the center like a voice waveform, with organic variation.
      peak: 14 + centerWeight * 35 + ripple * 11,
      delay: -((index % 11) * 0.075),
      duration: 0.72 + ((index * 17) % 7) * 0.09,
    }
  })
}

function toPixels(value: number): string {
  // Server-side and browser-side Framer Motion serialize fractional values
  // differently. Whole-pixel values keep hydration deterministic.
  return `${Math.round(value)}px`
}

export function Waveform({
  active,
  bars = 48,
  className,
}: {
  active: boolean
  bars?: number
  className?: string
}) {
  const shouldReduceMotion = useReducedMotion()
  const barData = useMemo(() => createBars(bars), [bars])

  return (
    <div
      className={cn("relative flex h-16 items-center justify-center gap-[3px] overflow-hidden", className)}
      aria-hidden
    >
      <motion.div
        className={cn(
          "absolute inset-x-[12%] top-1/2 h-px -translate-y-1/2 rounded-full blur-sm transition-colors duration-500",
          active ? "bg-primary/35" : "bg-muted-foreground/10",
        )}
        animate={{ opacity: active ? [0.35, 0.8, 0.35] : 0.25 }}
        transition={{ duration: 1.8, repeat: active ? Infinity : 0, ease: "easeInOut" }}
      />

      {barData.map((bar, index) => {
        const activeHeights = [bar.idle, bar.peak * 0.58, bar.peak, bar.peak * 0.42, bar.idle].map(toPixels)
        const idleHeights = [bar.idle, bar.idle + 2, bar.idle].map(toPixels)

        return (
          <motion.span
            key={index}
            className={cn(
              "relative z-10 w-[3px] rounded-full bg-primary will-change-transform",
              active && "shadow-[0_0_10px_0_var(--color-primary)]",
            )}
            initial={false}
            animate={{
              height: shouldReduceMotion ? toPixels(active ? bar.peak * 0.55 : bar.idle) : active ? activeHeights : idleHeights,
              opacity: active ? 1 : 0.28,
              scaleY: active ? [0.95, 1.04, 0.92, 1] : 1,
            }}
            transition={{
              height: {
                duration: active ? bar.duration : 2.6 + (index % 4) * 0.18,
                delay: active ? bar.delay : -((index % 8) * 0.12),
                repeat: shouldReduceMotion ? 0 : Infinity,
                ease: "easeInOut",
              },
              opacity: { duration: 0.45, ease: "easeOut" },
              scaleY: {
                duration: bar.duration * 0.85,
                delay: bar.delay,
                repeat: shouldReduceMotion || !active ? 0 : Infinity,
                ease: "easeInOut",
              },
            }}
          />
        )
      })}
    </div>
  )
}
