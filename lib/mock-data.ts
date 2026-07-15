export type Session = {
  id: string
  topic: string
  subject: string
  score: number
  date: string
  duration: string
  gaps: number
}

export const sessions: Session[] = [
  { id: "s1", topic: "Photosynthesis", subject: "Biology", score: 84, date: "Today", duration: "4m 12s", gaps: 3 },
  { id: "s2", topic: "Neural Networks", subject: "AI", score: 76, date: "Yesterday", duration: "6m 03s", gaps: 4 },
  { id: "s3", topic: "Supply & Demand", subject: "Economics", score: 91, date: "2 days ago", duration: "3m 48s", gaps: 1 },
  { id: "s4", topic: "Newton's Laws", subject: "Physics", score: 68, date: "4 days ago", duration: "5m 21s", gaps: 5 },
  { id: "s5", topic: "The French Revolution", subject: "History", score: 82, date: "5 days ago", duration: "7m 10s", gaps: 3 },
  { id: "s6", topic: "Big-O Notation", subject: "CS", score: 88, date: "1 week ago", duration: "4m 55s", gaps: 2 },
  { id: "s7", topic: "Cellular Respiration", subject: "Biology", score: 73, date: "1 week ago", duration: "5m 32s", gaps: 4 },
  { id: "s8", topic: "Osmosis", subject: "Biology", score: 79, date: "2 weeks ago", duration: "3m 20s", gaps: 3 },
]

export const goals = [
  { label: "Weekly sessions", current: 5, target: 7 },
  { label: "Biology mastery", current: 78, target: 100 },
  { label: "Avg. understanding", current: 82, target: 90 },
]

export const weeklyScores = [52, 58, 61, 70, 74, 79, 84]
export const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
export const weekdayMinutes = [12, 18, 0, 22, 15, 28, 9]
