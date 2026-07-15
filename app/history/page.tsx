"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { ArrowUpRight, Clock, Search, Target } from "lucide-react"
import { Input } from "@/components/ui/input"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { sessions } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const subjects = ["All", "Biology", "AI", "Economics", "Physics", "History", "CS"]

export default function HistoryPage() {
  const [filter, setFilter] = useState("All")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    return sessions.filter(
      (s) =>
        (filter === "All" || s.subject === filter) &&
        s.topic.toLowerCase().includes(query.toLowerCase()),
    )
  }, [filter, query])

  const avg = Math.round(sessions.reduce((a, s) => a + s.score, 0) / sessions.length)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 sm:px-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Learning history</h1>
          <p className="text-muted-foreground">Every topic you&apos;ve taught, mirrored and scored.</p>
        </div>

        {/* Summary */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total sessions", value: String(sessions.length), icon: Clock },
            { label: "Average score", value: `${avg}%`, icon: Target },
            { label: "Subjects covered", value: "6", icon: ArrowUpRight },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-4 rounded-2xl border border-border/70 bg-card p-5">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="size-5" />
              </span>
              <div>
                <div className="text-2xl font-semibold tabular-nums">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {subjects.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all",
                  filter === s
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background hover:border-primary/40 hover:bg-muted",
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="relative sm:w-64">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics…"
              className="rounded-full pl-9"
            />
          </div>
        </div>

        {/* List */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-border/70 bg-card">
          {filtered.length === 0 && (
            <div className="p-10 text-center text-sm text-muted-foreground">No sessions match your filters.</div>
          )}
          <div className="divide-y divide-border/60">
            {filtered.map((s) => (
              <Link
                key={s.id}
                href="/report"
                className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50 sm:p-5"
              >
                <span
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-xl text-base font-semibold tabular-nums",
                    s.score >= 85
                      ? "bg-primary/10 text-primary"
                      : s.score >= 70
                        ? "bg-chart-5/15 text-chart-5"
                        : "bg-destructive/10 text-destructive",
                  )}
                >
                  {s.score}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{s.topic}</p>
                  <p className="text-sm text-muted-foreground">
                    {s.subject} · {s.duration} · {s.gaps} gaps found
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-sm text-muted-foreground">{s.date}</p>
                </div>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
