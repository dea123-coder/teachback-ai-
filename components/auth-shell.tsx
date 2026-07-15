import Link from "next/link"
import { TeachBot } from "@/components/companion/teachbot"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sparkles } from "lucide-react"

export function AuthShell({
  children,
  quote,
  mode,
}: {
  children: React.ReactNode
  quote: string
  mode: "listening" | "celebrating" | "speaking"
}) {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      {/* Brand / companion side */}
      <section className="relative hidden overflow-hidden bg-primary/[0.06] lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute -left-24 top-1/4 size-72 rounded-full bg-primary/20 blur-3xl" />
        <Link href="/" className="relative flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="size-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">TeachBack AI</span>
        </Link>

        <div className="relative flex flex-col items-center gap-8">
          <TeachBot mode={mode} size="lg" />
          <div className="max-w-sm rounded-3xl border border-border/60 bg-card/80 p-6 text-center shadow-sm backdrop-blur">
            <p className="text-balance text-lg font-medium leading-relaxed">{quote}</p>
          </div>
        </div>

        <p className="relative text-sm text-muted-foreground">
          Runs on-device. Your voice never leaves your machine.
        </p>
      </section>

      {/* Form side */}
      <section className="relative flex flex-col">
        <div className="flex items-center justify-between p-6">
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </span>
            <span className="font-semibold tracking-tight">TeachBack AI</span>
          </Link>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center px-6 pb-16">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </section>
    </main>
  )
}
