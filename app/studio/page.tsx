"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Cpu, Loader2, Mic, RotateCcw, Sparkles, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { TeachBot, type CompanionMode } from "@/components/companion/teachbot"
import { SpeechBubble } from "@/components/companion/speech-bubble"
import { Waveform } from "@/components/companion/waveform"
import { cn } from "@/lib/utils"

type RecognitionResult = {
  isFinal: boolean
  [index: number]: { transcript: string }
}

type RecognitionEvent = Event & {
  resultIndex: number
  results: { length: number; [index: number]: RecognitionResult }
}

type BrowserSpeechRecognition = {
  continuous: boolean
  interimResults: boolean
  lang: string
  onend: (() => void) | null
  onerror: ((event: Event & { error: string; message?: string }) => void) | null
  onresult: ((event: RecognitionEvent) => void) | null
  start: () => void
  stop: () => void
  abort: () => void
}

type BrowserSpeechRecognitionConstructor = new () => BrowserSpeechRecognition

type SpeechRecognitionWindow = Window & {
  SpeechRecognition?: BrowserSpeechRecognitionConstructor
  webkitSpeechRecognition?: BrowserSpeechRecognitionConstructor
}

const companionLines: Record<CompanionMode, string> = {
  idle: "Pick a topic and press the mic when you're ready to teach me.",
  listening: "I'm listening carefully. Take your time and explain it your way.",
  thinking: "Great explanation! Let me map out what you covered…",
  speaking: "Here's what I understood. When you're ready, ask me to analyze your teaching.",
  celebrating: "Fantastic teaching! You clearly know this well.",
}

/**
 * TODO: Replace with the real analysis request when the analysis service is available.
 * This intentionally produces no analysis or transcript content.
 */
async function analyzeTranscript(transcript: string): Promise<void> {
  void transcript
}

export default function StudioPage() {
  const [topic, setTopic] = useState("")
  const [mode, setMode] = useState<CompanionMode>("idle")
  const [transcript, setTranscript] = useState("")
  const [seconds, setSeconds] = useState(0)
  const [speechError, setSpeechError] = useState("")
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const finalTranscriptRef = useRef("")
  const stopRequestedRef = useRef(false)

  const recording = mode === "listening"
  const analyzing = mode === "thinking"

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  useEffect(() => {
    return () => {
      clearTimer()
      recognitionRef.current?.abort()
    }
  }, [])

  function stopRecording() {
    if (!recording) return

    stopRequestedRef.current = true
    clearTimer()
    recognitionRef.current?.stop()
  }

  function startRecording() {
    const SpeechRecognition = (window as SpeechRecognitionWindow).SpeechRecognition
      ?? (window as SpeechRecognitionWindow).webkitSpeechRecognition

    if (!SpeechRecognition) {
      setSpeechError("Speech recognition is not supported in this browser.")
      return
    }

    recognitionRef.current?.abort()
    stopRequestedRef.current = false
    finalTranscriptRef.current = ""
    setTranscript("")
    setSpeechError("")
    setSeconds(0)
    setMode("listening")

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = navigator.language || "en-US"

    recognition.onresult = (event) => {
      let finalText = finalTranscriptRef.current
      let interimText = ""

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index]
        const text = result[0].transcript

        if (result.isFinal) {
          finalText += `${text} `
        } else {
          interimText += text
        }
      }

      finalTranscriptRef.current = finalText
      setTranscript(`${finalText}${interimText}`.trim())
    }

   recognition.onerror = (event) => {
  clearTimer()
  stopRequestedRef.current = true

  const errorCode = event.error

  console.log("[SpeechRecognition] error code:", errorCode)
  console.log("[SpeechRecognition] language:", recognition.lang)
  console.log("[SpeechRecognition] origin:", window.location.origin)
  console.log("[SpeechRecognition] secure context:", window.isSecureContext)

  const errorMessages: Record<string, string> = {
    "not-allowed": "Chrome blocked microphone or speech-recognition access.",
    "service-not-allowed": "Chrome speech recognition is unavailable or blocked.",
    "audio-capture": "No usable microphone was found.",
    network: "Speech recognition needs a working internet connection.",
    "no-speech": "No speech was detected. Please try again.",
    aborted: "Speech recognition was stopped.",
    "language-not-supported": `Language ${recognition.lang} is not supported.`,
  }

  setSpeechError(
    errorMessages[errorCode] ??
      `Speech recognition failed: ${errorCode}`,
  )
  setMode("idle")
}

    recognition.onend = () => {
  clearTimer()

  console.log("[SpeechRecognition] ended", {
    transcript: finalTranscriptRef.current,
  })

  setMode("speaking")
}
    recognitionRef.current = recognition

    try {
      recognition.start()
      timerRef.current = setInterval(
        () => setSeconds((value) => value + 1),
        1000,
      )
    } catch (error) {
      console.error("[SpeechRecognition] start() threw", error)
      setSpeechError("Could not start speech recognition. Please try again.")
      setMode("idle")
    }
  }
    async function analyze() {
  if (!transcript.trim()) return

  setMode("thinking")

  try {
    await analyzeTranscript(transcript)

    // Placeholder has no real AI verdict yet,
    // so do not celebrate automatically.
    setMode("speaking")
  } catch {
    setMode("speaking")
  }
}

  function reset() {
    stopRequestedRef.current = true
    clearTimer()
    recognitionRef.current?.abort()
    recognitionRef.current = null
    finalTranscriptRef.current = ""
    setMode("idle")
    setTranscript("")
    setSeconds(0)
    setSpeechError("")
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0")
  const ss = String(seconds % 60).padStart(2, "0")

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-8 sm:px-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Badge className="gap-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/10">
              <Cpu className="size-3" /> On-Device
            </Badge>
            <span className="text-sm text-muted-foreground">TeachBack Studio</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Teach it in your own words</h1>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
          <div className="relative flex flex-col items-center overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-b from-primary/5 to-card p-8">
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
            <div className="relative"><TeachBot mode={mode} size="md" /></div>
            <SpeechBubble tail="left" className="relative mt-2 w-full max-w-sm">{companionLines[mode]}</SpeechBubble>
            <div className="relative mt-6 flex w-full items-center justify-around rounded-2xl border border-border/60 bg-card/60 py-3 text-center">
              {[{ k: "State", v: mode }, { k: "Topic", v: topic || "—" }, { k: "Privacy", v: "Local" }].map((stat) => (
                <div key={stat.k}>
                  <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{stat.k}</div>
                  <div className="mt-0.5 text-sm font-semibold capitalize">{stat.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5 rounded-3xl border border-border/70 bg-card p-6 sm:p-8">
            <div>
              <label htmlFor="topic" className="text-sm font-medium">Choose a topic</label>
              <input id="topic" value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="Enter any topic..." disabled={recording || analyzing} className="mt-3 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary disabled:cursor-not-allowed disabled:opacity-50" />
            </div>

            <div className="rounded-2xl border border-border/60 bg-muted/30 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span className={cn("size-2 rounded-full", recording ? "animate-pulse bg-destructive" : analyzing ? "bg-primary" : "bg-muted-foreground/40")} />
                  {recording ? "Recording" : analyzing ? "Analyzing" : mode === "speaking" ? "Ready to analyze" : mode === "celebrating" ? "Complete" : "Idle"}
                </div>
                <span className="font-mono text-sm text-muted-foreground">{mm}:{ss}</span>
              </div>

              <Waveform active={recording} className="my-5" />
              <div className="flex items-center justify-center gap-3">
                {(mode === "idle" || mode === "celebrating") && <Button size="lg" onClick={startRecording} className="h-14 gap-2 rounded-full px-8 text-base shadow-lg shadow-primary/25"><Mic className="size-5" /> Start teaching</Button>}
                {recording && <Button size="lg" variant="destructive" onClick={stopRecording} className="h-14 gap-2 rounded-full px-8 text-base"><Square className="size-4 fill-current" /> Stop</Button>}
                {(mode === "speaking" || analyzing || mode === "celebrating") && <>
                  <Button size="lg" variant="outline" onClick={reset} disabled={analyzing} className="h-14 gap-2 rounded-full px-6"><RotateCcw className="size-4" /> Redo</Button>
                  {mode !== "celebrating" && <Button size="lg" onClick={() => void analyze()} disabled={analyzing || !transcript.trim()} className="h-14 gap-2 rounded-full px-8 text-base shadow-lg shadow-primary/25">{analyzing ? <Loader2 className="size-5 animate-spin" /> : <Sparkles className="size-5" />}{analyzing ? "Analyzing…" : "Analyze my teaching"}</Button>}
                </>}
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-background p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Live transcript</span>
                {transcript && <span className="flex items-center gap-1 text-xs text-primary"><Check className="size-3" /> On-device transcription</span>}
              </div>
              <div className="mt-3 min-h-24 text-sm leading-relaxed text-foreground/90">
                {transcript ? <p>{transcript}{recording && <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-primary align-middle" />}</p> : <p className="text-muted-foreground">{speechError || "Your words will appear here as you teach. Speak naturally — explain the topic like you're teaching a curious friend."}</p>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
