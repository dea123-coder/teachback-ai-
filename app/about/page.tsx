import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TeachBot } from "@/components/companion/teachbot"
import { Button } from "@/components/ui/button"
import { Brain, Lock, Sparkles, Waves } from "lucide-react"

const values = [
  {
    icon: Brain,
    title: "Learning by teaching",
    body: "The Feynman technique, reimagined. When you explain a concept out loud, gaps in your understanding surface instantly.",
  },
  {
    icon: Lock,
    title: "Privacy by design",
    body: "Every model runs locally on your device. Your voice, transcripts, and progress never touch a server.",
  },
  {
    icon: Waves,
    title: "An emotional companion",
    body: "TeachBot listens, reacts, and celebrates with you. Learning should feel alive, not transactional.",
  },
]

const stats = [
  { value: "100%", label: "On-device" },
  { value: "0 KB", label: "Sent to cloud" },
  { value: "~120ms", label: "Response latency" },
  { value: "6", label: "Subject tracks" },
]

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="border-b border-border/60">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
            <div className="flex flex-col gap-6">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                <Sparkles className="size-3.5 text-primary" />
                Our mission
              </span>
              <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                We believe the future of learning is teaching.
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                TeachBack AI was built on a simple idea: you don&apos;t truly understand something until you can teach
                it. We paired that timeless method with a private, on-device AI companion that listens to how you think
                — and helps you think better.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <Link href="/studio">Try TeachBack</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/dashboard">See the dashboard</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <TeachBot mode="speaking" size="lg" />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-border/60 bg-card/40">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-12 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 text-center">
                <span className="text-3xl font-semibold tracking-tight sm:text-4xl">{s.value}</span>
                <span className="text-sm text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">What we stand for</h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Three principles guide every decision we make.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="flex flex-col gap-4 rounded-3xl border border-border/60 bg-card p-8 shadow-sm"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <v.icon className="size-6" />
                </span>
                <h3 className="text-xl font-semibold">{v.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
