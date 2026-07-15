import Link from "next/link"
import { ArrowRight, BrainCircuit, Gauge, LineChart, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TeachBot } from "@/components/companion/teachbot"

const features = [
  {
    icon: BrainCircuit,
    title: "Concept Mirror",
    desc: "See your explanation reflected back as a structured map of what you actually said.",
  },
  {
    icon: Gauge,
    title: "Understanding Score",
    desc: "A clear, honest measure of how well you conveyed the idea — no vague grades.",
  },
  {
    icon: LineChart,
    title: "Progress over time",
    desc: "Every session compounds. Watch confidence and clarity climb across topics.",
  },
  {
    icon: ShieldCheck,
    title: "Fully on-device",
    desc: "Your voice and transcripts never leave your device. Private by design.",
  },
]

export function Showcase() {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div className="relative order-2 flex justify-center lg:order-1">
          <div className="relative w-full max-w-md rounded-[2rem] border border-border/70 bg-card p-8 shadow-2xl shadow-primary/5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Live TeachBack
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                <span className="size-1.5 animate-pulse rounded-full bg-primary" /> On-Device
              </span>
            </div>
            <div className="mt-4 flex justify-center">
              <TeachBot mode="speaking" size="sm" />
            </div>
            <div className="mt-4 rounded-2xl bg-muted/60 p-4">
              <p className="text-sm leading-relaxed">
                &ldquo;So gravity bends spacetime, and objects follow the curve…&rdquo;
              </p>
              <div className="mt-3 flex items-end gap-0.5">
                {Array.from({ length: 28 }).map((_, i) => (
                  <span
                    key={i}
                    className="animate-eq-bar w-1 rounded-full bg-primary/70"
                    style={{ height: 6 + ((i * 7) % 26), animationDelay: `${(i % 6) * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">TeachBack Studio</span>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            A companion that listens, not a bot that answers
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Step into a calm voice workspace. Speak freely while your companion reacts in real time — nodding along,
            thinking, and gently probing where your understanding thins out.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border/70 bg-card p-5">
                <f.icon className="size-5 text-primary" />
                <h3 className="mt-3 text-base font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>

          <Button asChild size="lg" className="group mt-8 h-12 rounded-full px-6 text-base">
            <Link href="/studio">
              Enter the Studio
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
