import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

export function SpeechBubble({
  children,
  className,
  tail = "bottom-left",
}: {
  children: ReactNode
  className?: string
  tail?: "bottom-left" | "bottom-right" | "left"
}) {
  // Studio passes a string. The key lets every new companion line animate in cleanly.
  const messageKey = typeof children === "string" ? children : "companion-message"

  return (
    <div
      className={cn(
        "speech-bubble relative max-w-xs rounded-2xl border border-border/70 bg-card/95 px-4 py-3 text-sm font-medium leading-snug text-foreground shadow-[0_18px_45px_-22px_rgba(16,60,40,0.38),0_8px_18px_-12px_rgba(16,60,40,0.24)] backdrop-blur-md",
        className,
      )}
    >
      <style>{`
        .speech-bubble { animation: speech-bubble-float 5.5s ease-in-out infinite; }
        .speech-bubble__message { animation: speech-bubble-message-in 420ms cubic-bezier(.22,1,.36,1) both; }
        .speech-bubble__status-dot { animation: speech-bubble-dot 2.4s ease-in-out infinite; }
        @keyframes speech-bubble-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes speech-bubble-message-in {
          from { opacity: 0; transform: translateY(5px); filter: blur(2px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes speech-bubble-dot {
          0%, 100% { transform: scale(.85); opacity: .65; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .speech-bubble, .speech-bubble__message, .speech-bubble__status-dot { animation: none !important; }
        }
      `}</style>

      <span className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
        <span className="speech-bubble__status-dot size-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />
        AI Companion
      </span>

      <div key={messageKey} className="speech-bubble__message">
        {children}
      </div>

      <span
        className={cn(
          "absolute size-3 rotate-45 border-border/70 bg-card shadow-[3px_3px_7px_-5px_rgba(16,60,40,0.28)]",
          tail === "bottom-left" && "-bottom-1.5 left-8 border-b border-r",
          tail === "bottom-right" && "-bottom-1.5 right-8 border-b border-r",
          tail === "left" && "-left-1.5 top-8 border-b border-l",
        )}
      />
    </div>
  )
}