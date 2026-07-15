"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Cpu, ShieldCheck } from "lucide-react"

function SettingRow({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-4">
      <div className="flex flex-col gap-0.5">
        <span className="font-medium">{title}</span>
        <span className="text-sm text-muted-foreground">{description}</span>
      </div>
      {children}
    </div>
  )
}

function SettingsCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-2 divide-y divide-border/60">{children}</div>
    </section>
  )
}

export default function SettingsPage() {
  const [onDevice, setOnDevice] = useState(true)
  const [voiceReactions, setVoiceReactions] = useState(true)
  const [autoAnalyze, setAutoAnalyze] = useState(true)
  const [gentleFeedback, setGentleFeedback] = useState(false)
  const [notifications, setNotifications] = useState(true)

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <header className="mb-10">
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">Settings</h1>
          <p className="mt-3 text-lg text-muted-foreground">Tune your companion and keep your learning private.</p>
        </header>

        <div className="flex flex-col gap-6">
          <SettingsCard title="Profile">
            <div className="flex items-center gap-4 py-4">
              <Avatar className="size-14">
                <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">AR</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5">
                <span className="font-medium">Alex Rivera</span>
                <span className="text-sm text-muted-foreground">alex@school.edu</span>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">
                Change
              </Button>
            </div>
            <div className="grid gap-4 py-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Display name</Label>
                <Input id="name" defaultValue="Alex Rivera" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="alex@school.edu" />
              </div>
            </div>
          </SettingsCard>

          <SettingsCard title="On-Device AI">
            <div className="flex items-center gap-3 py-4">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Cpu className="size-5" />
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="font-medium">TeachBack-Local 3B</span>
                <span className="text-sm text-primary">Active &amp; private</span>
              </div>
              <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <ShieldCheck className="size-3.5" />
                Verified
              </span>
            </div>
            <SettingRow title="Run entirely on-device" description="Never send audio or transcripts to the cloud.">
              <Switch checked={onDevice} onCheckedChange={setOnDevice} />
            </SettingRow>
            <SettingRow title="Auto-analyze after speaking" description="Generate a report as soon as you finish.">
              <Switch checked={autoAnalyze} onCheckedChange={setAutoAnalyze} />
            </SettingRow>
          </SettingsCard>

          <SettingsCard title="Companion">
            <SettingRow title="Voice reactions" description="Let TeachBot respond aloud while you teach.">
              <Switch checked={voiceReactions} onCheckedChange={setVoiceReactions} />
            </SettingRow>
            <SettingRow title="Gentle feedback mode" description="Softer tone and more encouragement.">
              <Switch checked={gentleFeedback} onCheckedChange={setGentleFeedback} />
            </SettingRow>
            <SettingRow title="Study reminders" description="A daily nudge to keep your streak alive.">
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </SettingRow>
          </SettingsCard>

          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button>Save changes</Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
