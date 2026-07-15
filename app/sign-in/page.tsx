import Link from "next/link"
import { AuthShell } from "@/components/auth-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignInPage() {
  return (
    <AuthShell
      mode="listening"
      quote="Welcome back. Ready to teach me something new today?"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-balance">Sign in</h1>
          <p className="text-muted-foreground">Continue your learning journey.</p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@school.edu" autoComplete="email" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-sm text-primary hover:underline">
                Forgot?
              </Link>
            </div>
            <Input id="password" type="password" placeholder="••••••••" autoComplete="current-password" />
          </div>
          <Button className="mt-2 w-full" size="lg" asChild>
            <Link href="/dashboard">Sign in</Link>
          </Button>
        </form>

        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">OR</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Button variant="outline" size="lg" className="w-full" asChild>
          <Link href="/dashboard">Continue with Google</Link>
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          New to TeachBack?{" "}
          <Link href="/sign-up" className="font-medium text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </AuthShell>
  )
}
