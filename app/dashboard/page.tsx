import Link from "next/link"
import {
  ArrowUpRight,
  Cpu,
  Flame,
  Mic,
  Plus,
  ShieldCheck,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AreaChart, BarChart } from "@/components/charts"
import { goals, sessions, weekdayMinutes, weekdays, weeklyScores } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const stats = [
  { label: "Avg. understanding", value: "82", suffix: "%", icon: TrendingUp, trend: "+8%" },
  { label: "Topics taught", value: "24", icon: Zap, trend: "+3" },
  { label: "Day streak", value: "5", icon: Flame, trend: "Best: 12" },
  { label: "Time learning", value: "3.2", suffix: "h", icon: Target, trend: "This week" },
]

const timeline = [
  { time: "Today", title: "Taught Photosynthesis", detail: "Scored 84 · 3 gaps found" },
  { time: "Yesterday", title: "Reviewed Neural Networks", detail: "Answered 2 follow-ups" },
  { time: "2 days ago", title: "New personal best", detail: "Supply & Demand at 91" },
  { time: "4 days ago", title: "Started Physics track", detail: "Newton's Laws unlocked" },
]

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-8 sm:px-8">
        {/* Greeting */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back, Alex</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">Your learning dashboard</h1>
          </div>
          <Button asChild size="lg" className="group h-12 rounded-full px-6 shadow-lg shadow-primary/25">
            <Link href="/studio">
              <Mic className="size-4" /> New TeachBack
            </Link>
          </Button>
        </div>

        {/* Stat cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border/70 bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="size-4.5" />
                </span>
                <span className="text-xs font-medium text-muted-foreground">{s.trend}</span>
              </div>
              <div className="mt-4 flex items-end gap-0.5">
                <span className="text-3xl font-semibold tabular-nums">{s.value}</span>
                {s.suffix && <span className="mb-1 text-lg font-medium text-muted-foreground">{s.suffix}</span>}
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Left column (2/3) */}
          <div className="space-y-6 lg:col-span-2">
            {/* Progress charts */}
            <div className="rounded-3xl border border-border/70 bg-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Understanding over time</h2>
                  <p className="text-sm text-muted-foreground">Last 7 sessions</p>
                </div>
                <Badge className="gap-1 rounded-full bg-primary/10 text-primary hover:bg-primary/10">
                  <TrendingUp className="size-3" /> +32
                </Badge>
              </div>
              <div className="mt-6">
                <AreaChart data={weeklyScores} className="h-40 w-full overflow-visible" />
              </div>
            </div>

            {/* Recent sessions */}
            <div className="rounded-3xl border border-border/70 bg-card p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Recent sessions</h2>
                <Link href="/history" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  View all <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
              <div className="mt-4 divide-y divide-border/60">
                {sessions.slice(0, 4).map((s) => (
                  <div key={s.id} className="flex items-center gap-4 py-3.5">
                    <span
                      className={cn(
                        "flex size-11 shrink-0 items-center justify-center rounded-xl text-sm font-semibold tabular-nums",
                        s.score >= 85 ? "bg-primary/10 text-primary" : s.score >= 70 ? "bg-chart-5/15 text-chart-5" : "bg-destructive/10 text-destructive",
                      )}
                    >
                      {s.score}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{s.topic}</p>
                      <p className="text-xs text-muted-foreground">
                        {s.subject} · {s.duration} · {s.gaps} gaps
                      </p>
                    </div>
                    <span className="hidden text-xs text-muted-foreground sm:block">{s.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly activity */}
            <div className="rounded-3xl border border-border/70 bg-card p-6">
              <h2 className="text-lg font-semibold">Weekly activity</h2>
              <p className="text-sm text-muted-foreground">Minutes spent teaching each day</p>
              <div className="mt-6">
                <BarChart data={weekdayMinutes} labels={weekdays} />
              </div>
            </div>
          </div>

          {/* Right column (1/3) */}
          <div className="space-y-6">
            {/* On-device status */}
            <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-primary/10 to-card p-6">
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Cpu className="size-4.5" />
                </span>
                <div>
                  <h2 className="text-sm font-semibold">On-Device AI</h2>
                  <p className="text-xs text-primary">Active & private</p>
                </div>
              </div>
              <div className="mt-5 space-y-3 text-sm">
                {[
                  { k: "Model", v: "TeachBack-Local 3B" },
                  { k: "Data sent to cloud", v: "0 KB" },
                  { k: "Latency", v: "~120ms" },
                ].map((row) => (
                  <div key={row.k} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{row.k}</span>
                    <span className="font-medium">{row.v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-2 rounded-xl bg-card/70 px-3 py-2.5 text-xs text-muted-foreground">
                <ShieldCheck className="size-4 text-primary" />
                Your voice never leaves this device.
              </div>
            </div>

            {/* Goals */}
            <div className="rounded-3xl border border-border/70 bg-card p-6">
              <div className="flex items-center gap-2">
                <Target className="size-5 text-primary" />
                <h2 className="text-lg font-semibold">Goals</h2>
              </div>
              <div className="mt-5 space-y-5">
                {goals.map((g) => {
                  const pct = Math.round((g.current / g.target) * 100)
                  return (
                    <div key={g.label}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{g.label}</span>
                        <span className="text-muted-foreground">
                          {g.current}/{g.target}
                        </span>
                      </div>
                      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-3xl border border-border/70 bg-card p-6">
              <h2 className="text-lg font-semibold">Quick actions</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { label: "New topic", icon: Plus, href: "/studio" },
                  { label: "View report", icon: TrendingUp, href: "/report" },
                  { label: "History", icon: Flame, href: "/history" },
                  { label: "Settings", icon: Cpu, href: "/settings" },
                ].map((a) => (
                  <Link
                    key={a.label}
                    href={a.href}
                    className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-background p-4 transition-all hover:border-primary/40 hover:bg-muted"
                  >
                    <a.icon className="size-5 text-primary" />
                    <span className="text-sm font-medium">{a.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="rounded-3xl border border-border/70 bg-card p-6">
              <h2 className="text-lg font-semibold">Learning timeline</h2>
              <div className="mt-5 space-y-0">
                {timeline.map((t, i) => (
                  <div key={i} className="relative flex gap-4 pb-5 last:pb-0">
                    {i < timeline.length - 1 && (
                      <span className="absolute left-[7px] top-4 h-full w-px bg-border" />
                    )}
                    <span className="relative mt-1 size-3.5 shrink-0 rounded-full border-2 border-primary bg-background" />
                    <div className="-mt-0.5">
                      <p className="text-xs text-muted-foreground">{t.time}</p>
                      <p className="text-sm font-medium">{t.title}</p>
                      <p className="text-xs text-muted-foreground">{t.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
