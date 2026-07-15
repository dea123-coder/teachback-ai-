import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TeachBot } from "@/components/companion/teachbot"

export function CtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-border/70 bg-gradient-to-br from-primary/10 via-card to-card px-6 py-16 text-center shadow-xl sm:px-16">
        <div
          className="pointer-events-none absolute -top-24 left-1/2 size-[400px] -translate-x-1/2 rounded-full bg-primary/20 blur-[110px]"
          aria-hidden
        />
        <div className="relative flex justify-center">
          <TeachBot mode="celebrating" size="sm" />
        </div>
        <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Your smartest study partner is waiting
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-muted-foreground">
          Teach your first topic today. It&apos;s free, private, and works entirely on your device.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="group h-12 rounded-full px-6 text-base shadow-lg shadow-primary/25">
            <Link href="/studio">
              Start Your First TeachBack
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-6 text-base">
            <Link href="/signup">Create free account</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
