import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Showcase } from "@/components/landing/showcase"
import { CtaSection } from "@/components/landing/cta"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Showcase />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  )
}
