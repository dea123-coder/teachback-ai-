import Link from "next/link"
import { Sparkles } from "lucide-react"

const columns = [
  {
    title: "Product",
    links: [
      { href: "/studio", label: "TeachBack Studio" },
      { href: "/report", label: "Understanding Report" },
      { href: "/dashboard", label: "Dashboard" },
      { href: "/history", label: "History" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/settings", label: "Settings" },
      { href: "/signin", label: "Sign in" },
      { href: "/signup", label: "Sign up" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="max-w-sm">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight">TeachBack AI</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            The private, on-device AI study companion. Learn deeper by teaching what you know.
          </p>
          <p className="mt-6 text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} TeachBack AI. Runs on-device. Built for curious minds.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold">{col.title}</h4>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}
