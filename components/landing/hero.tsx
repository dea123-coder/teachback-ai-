import Link from "next/link"
import { ArrowRight, Cpu, Lock, PlayCircle, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TeachBot } from "@/components/companion/teachbot"
import { SpeechBubble } from "@/components/companion/speech-bubble"

const badges = [
  { icon: Cpu, label: "Runs On-Device" },
  { icon: Lock, label: "Privacy First" },
  { icon: WifiOff, label: "Offline Capable" },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
      <div
        className="pointer-events-none absolute -top-32 right-0 -z-10 size-[520px] rounded-full bg-primary/20 blur-[120px]"
        aria-hidden
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-14 sm:px-8 md:min-h-[calc(100vh-4rem)] md:grid-cols-2 md:gap-8 md:pb-24 md:pt-10">
        {/* Left copy */}
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            The Teach-Back learning method, reimagined
          </div>

          <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Don&apos;t Ask AI.{" "}
            <span className="bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">Teach It.</span>{" "}
            Learn Better.
          </h1>

          <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            Most tools give you answers. TeachBack AI listens as you explain a topic in your own words, understands your
            thinking, and reveals your knowledge gaps — all privately, right on your device.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="group h-12 rounded-full px-6 text-base shadow-lg shadow-primary/25">
              <Link href="/studio">
                Start Your First TeachBack
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-6 text-base">
              <Link href="/#how-it-works">
                <PlayCircle className="size-4" />
                See How It Works
              </Link>
            </Button>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            {badges.map((b) => (
              <div key={b.label} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <b.icon className="size-4" />
                </span>
                {b.label}
              </div>
            ))}
          </div>
        </div>

        {/* Right companion */}
        <div className="relative flex items-center justify-center">
          <div
            className="pointer-events-none absolute inset-0 -z-10 mx-auto my-auto size-[80%] rounded-full border border-primary/10 [animation:orbit_20s_linear_infinite]"
            aria-hidden
          />
          <div className="relative">
            <TeachBot mode="listening" size="lg" />
            <div className="absolute -right-2 -top-6 animate-fade-up sm:-right-10 md:-top-4" style={{ animationDelay: "0.4s" }}>
              <SpeechBubble tail="bottom-left" className="animate-float" >
                Great explanation. Can you explain <span className="text-primary">why</span> that happens?
              </SpeechBubble>
            </div>
            <div
              className="absolute -left-4 bottom-16 hidden animate-fade-up rounded-2xl border border-border/70 bg-card/95 px-3 py-2 shadow-xl backdrop-blur sm:block"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="flex items-center gap-2">
                <span className="flex h-6 items-end gap-0.5">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className="animate-eq-bar block w-1 rounded-full bg-primary"
                      style={{ height: 24, animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </span>
                <span className="text-xs font-medium text-muted-foreground">Listening…</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
