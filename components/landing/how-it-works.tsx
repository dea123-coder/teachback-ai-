import { BookOpen, Mic, ScanSearch, Sparkles } from "lucide-react"

const steps = [
  {
    icon: BookOpen,
    step: "01",
    title: "Pick a topic",
    desc: "Choose anything you're learning — from photosynthesis to neural networks. Your companion sets the stage.",
  },
  {
    icon: Mic,
    step: "02",
    title: "Teach it out loud",
    desc: "Explain the concept in your own words. The AI Companion listens and watches for how you connect ideas.",
  },
  {
    icon: ScanSearch,
    step: "03",
    title: "Get your gaps",
    desc: "It mirrors back your understanding, highlights strong and missing concepts, and scores your clarity.",
  },
  {
    icon: Sparkles,
    step: "04",
    title: "Improve & repeat",
    desc: "Adaptive follow-up questions push you to fill the gaps. Watch your understanding compound over time.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-primary">How TeachBack Works</span>
        <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Learning that sticks, in four steps
        </h2>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          The proven Teach-Back method says: if you can teach it, you truly know it. We turned that into a companion.
        </p>
      </div>

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div
            key={s.step}
            className="group relative overflow-hidden rounded-3xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
          >
            <div className="absolute right-4 top-4 text-5xl font-semibold text-muted/70 transition-colors group-hover:text-primary/15">
              {s.step}
            </div>
            <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
              <s.icon className="size-6" />
            </span>
            <h3 className="mt-6 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            {i < steps.length - 1 && (
              <div className="mt-6 h-px w-full bg-gradient-to-r from-border to-transparent lg:hidden" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
