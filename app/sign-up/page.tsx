import Link from "next/link"
import { AuthShell } from "@/components/auth-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"

const perks = ["Private on-device AI", "Unlimited TeachBacks", "Personalized gap tracking"]

export default function SignUpPage() {
  return (
    <AuthShell
      mode="celebrating"
      quote="Let's get started. The best way to learn is to teach — and I'm here to listen."
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-balance">Create your account</h1>
          <p className="text-muted-foreground">Start learning by teaching. Free forever.</p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" type="text" placeholder="Alex Rivera" autoComplete="name" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@school.edu" autoComplete="email" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Create a password" autoComplete="new-password" />
          </div>
          <Button className="mt-2 w-full" size="lg" asChild>
            <Link href="/dashboard">Create account</Link>
          </Button>
        </form>

        <ul className="flex flex-col gap-2">
          {perks.map((perk) => (
            <li key={perk} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="size-3" />
              </span>
              {perk}
            </li>
          ))}
        </ul>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthShell>
  )
}
