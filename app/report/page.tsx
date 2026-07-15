"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  CircleHelp,
  RotateCcw,
  Sparkles,
  TrendingUp,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { TeachBot } from "@/components/companion/teachbot"
import { SpeechBubble } from "@/components/companion/speech-bubble"
import { cn } from "@/lib/utils"

const strong = [
  "Role of sunlight & chlorophyll",
  "Inputs: CO₂ and water",
  "Outputs: glucose and oxygen",
  "Light reactions in thylakoid",
]

const missing = [
  "Why the Calvin cycle needs ATP & NADPH",
  "Role of stomata in gas exchange",
  "Difference between light-dependent and independent stages",
]

const conceptMirror = [
  { label: "Energy conversion", strength: 92 },
  { label: "Chemical inputs / outputs", strength: 85 },
  { label: "Cellular location", strength: 61 },
  { label: "Reaction stages", strength: 44 },
]

const followUps = [
  "Why does photosynthesis release oxygen as a byproduct?",
  "What would happen to the Calvin cycle at night?",
  "How do stomata regulate the gases entering the leaf?",
]

const progress = [52, 58, 61, 70, 74, 79, 84]

function ScoreRing({ value }: { value: number }) {
  const [shown, setShown] = useState(0)
  const r = 78
  const c = 2 * Math.PI * r
  useEffect(() => {
    const t = setTimeout(() => setShown(value), 250)
    return () => clearTimeout(t)
  }, [value])
  return (
    <div className="relative flex size-48 items-center justify-center">
      <svg className="size-48 -rotate-90" viewBox="0 0 180 180">
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
        <span className="text-5xl font-semibold tabular-nums">{shown}</span>
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Understanding</span>
      </div>
    </div>
  )
}

function AreaChart({ data }: { data: number[] }) {
  const w = 320
  const h = 120
  const max = Math.max(...data)
  const min = Math.min(...data) - 6
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((d - min) / (max - min)) * h
    return [x, y]
  })
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ")
  const area = `${line} L${w},${h} L0,${h} Z`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-32 w-full overflow-visible">
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#areaFill)" />
      <path d={line} fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={i === pts.length - 1 ? 5 : 3} fill="var(--primary)" />
      ))}
    </svg>
  )
}

export default function ReportPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-8 sm:px-8">
        {/* Companion header */}
        <div className="animate-fade-up flex flex-col items-center gap-6 rounded-3xl border border-border/70 bg-gradient-to-br from-primary/8 via-card to-card p-8 sm:flex-row sm:items-center sm:text-left">
          <TeachBot mode="celebrating" size="sm" />
          <div className="flex-1">
            <Badge className="gap-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/10">
              <Sparkles className="size-3" /> Understanding Report
            </Badge>
            <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              You taught Photosynthesis well!
            </h1>
            <p className="mt-2 max-w-xl text-pretty text-muted-foreground">
              You explained the core process clearly. I found a few gaps around the reaction stages — let&apos;s tighten
              those up with the questions below.
            </p>
          </div>
          <div className="shrink-0">
            <ScoreRing value={84} />
          </div>
        </div>

        {/* Metrics row */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Concept Mirror */}
          <div className="animate-fade-up rounded-3xl border border-border/70 bg-card p-6 lg:col-span-2" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-2">
              <BrainCircuit className="size-5 text-primary" />
              <h2 className="text-lg font-semibold">Concept Mirror</h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">How clearly each idea came through in your explanation.</p>
            <div className="mt-5 space-y-4">
              {conceptMirror.map((c) => (
                <div key={c.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{c.label}</span>
                    <span className="tabular-nums text-muted-foreground">{c.strength}%</span>
                  </div>
                  <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        c.strength >= 70 ? "bg-primary" : c.strength >= 50 ? "bg-chart-5" : "bg-destructive",
                      )}
                      style={{ width: `${c.strength}%`, transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Confidence */}
          <div className="animate-fade-up flex flex-col rounded-3xl border border-border/70 bg-card p-6" style={{ animationDelay: "0.15s" }}>
            <div className="flex items-center gap-2">
              <TrendingUp className="size-5 text-primary" />
              <h2 className="text-lg font-semibold">Confidence</h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Your delivery signals.</p>
            <div className="mt-4 space-y-3">
              {[
                { k: "Clarity", v: "High" },
                { k: "Pace", v: "Steady" },
                { k: "Filler words", v: "Low" },
                { k: "Certainty", v: "Medium" },
              ].map((row) => (
                <div key={row.k} className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-2.5 text-sm">
                  <span className="text-muted-foreground">{row.k}</span>
                  <span className="font-semibold">{row.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strong / Missing */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="animate-fade-up rounded-3xl border border-border/70 bg-card p-6" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-primary" />
              <h2 className="text-lg font-semibold">Strong concepts</h2>
            </div>
            <ul className="mt-4 space-y-2.5">
              {strong.map((s) => (
                <li key={s} className="flex items-start gap-2.5 rounded-xl bg-primary/5 px-4 py-3 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="animate-fade-up rounded-3xl border border-border/70 bg-card p-6" style={{ animationDelay: "0.25s" }}>
            <div className="flex items-center gap-2">
              <XCircle className="size-5 text-destructive" />
              <h2 className="text-lg font-semibold">Missing concepts</h2>
            </div>
            <ul className="mt-4 space-y-2.5">
              {missing.map((m) => (
                <li key={m} className="flex items-start gap-2.5 rounded-xl bg-destructive/5 px-4 py-3 text-sm">
                  <XCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Progress + follow ups */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="animate-fade-up rounded-3xl border border-border/70 bg-card p-6" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="size-5 text-primary" />
                <h2 className="text-lg font-semibold">Progress</h2>
              </div>
              <span className="text-sm font-medium text-primary">+32 over 7 sessions</span>
            </div>
            <div className="mt-6">
              <AreaChart data={progress} />
            </div>
          </div>

          <div className="animate-fade-up rounded-3xl border border-border/70 bg-gradient-to-br from-primary/8 to-card p-6" style={{ animationDelay: "0.35s" }}>
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="size-5" />
              </span>
              <div>
                <h2 className="text-lg font-semibold">Adaptive follow-ups</h2>
                <p className="text-sm text-muted-foreground">Answer these to close your gaps.</p>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {followUps.map((q, i) => (
                <button
                  key={q}
                  className="group flex w-full items-start gap-3 rounded-2xl border border-border/60 bg-card/70 p-4 text-left text-sm transition-all hover:border-primary/40 hover:bg-card"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {i + 1}
                  </span>
                  <span className="flex-1 font-medium">{q}</span>
                  <CircleHelp className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="group h-12 rounded-full px-6 text-base shadow-lg shadow-primary/25">
            <Link href="/studio">
              <RotateCcw className="size-4" /> Teach it again
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="group h-12 rounded-full px-6 text-base">
            <Link href="/dashboard">
              Go to dashboard
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
