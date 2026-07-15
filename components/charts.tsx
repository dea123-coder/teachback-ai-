"use client"

import { useEffect, useState } from "react"

export function AreaChart({ data, className }: { data: number[]; className?: string }) {
  const w = 320
  const h = 120
  const max = Math.max(...data)
  const min = Math.min(...data) - 6
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((d - min) / (max - min)) * h
    return [x, y] as const
  })
  const id = `af-${data.join("-").slice(0, 12)}`
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ")
  const area = `${line} L${w},${h} L0,${h} Z`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className ?? "h-32 w-full overflow-visible"}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={i === pts.length - 1 ? 5 : 3} fill="var(--primary)" />
      ))}
    </svg>
  )
}

export function BarChart({ data, labels }: { data: number[]; labels: string[] }) {
  const max = Math.max(...data)
  return (
    <div className="flex h-40 items-end justify-between gap-2">
      {data.map((d, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex h-32 w-full items-end justify-center">
            <div
              className="w-full max-w-9 rounded-t-lg bg-primary/80 transition-all duration-700"
              style={{ height: `${(d / max) * 100}%` }}
            />
          </div>
          <span className="text-[11px] text-muted-foreground">{labels[i]}</span>
        </div>
      ))}
    </div>
  )
}

export function ScoreRing({ value, size = 176 }: { value: number; size?: number }) {
  const [shown, setShown] = useState(0)
  const r = 78
  const c = 2 * Math.PI * r
  useEffect(() => {
    const t = setTimeout(() => setShown(value), 250)
    return () => clearTimeout(t)
  }, [value])
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="-rotate-90" style={{ width: size, height: size }} viewBox="0 0 180 180">
        <circle cx="90" cy="90" r={r} fill="none" stroke="var(--muted)" strokeWidth="14" />
        <circle
          cx="90"
          cy="90"
          r={r}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * shown) / 100}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-semibold tabular-nums">{shown}</span>
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Score</span>
      </div>
    </div>
  )
}
