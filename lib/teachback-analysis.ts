import { z } from "zod"

const MIN_TRANSCRIPT_WORDS = 12
const MAX_TOPIC_CHARACTERS = 200
const MAX_TRANSCRIPT_CHARACTERS = 12_000

export const analyzeRequestSchema = z.object({
  topic: z.string().trim().min(1, "Topic is required.").max(MAX_TOPIC_CHARACTERS),
  transcript: z.string().trim().min(1, "Transcript is required.").max(MAX_TRANSCRIPT_CHARACTERS),
}).superRefine(({ transcript }, context) => {
  const wordCount = transcript.split(/\s+/).filter(Boolean).length

  if (wordCount < MIN_TRANSCRIPT_WORDS) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["transcript"],
      message: `Please provide at least ${MIN_TRANSCRIPT_WORDS} words before analysis.`,
    })
  }
})

export const teachBackAnalysisSchema = z.object({
  learningScore: z.number().min(0).max(100),
  confidence: z.number().min(0).max(100),
  summary: z.string().min(1).max(1_500),
  strongConcepts: z.array(z.string().min(1).max(300)).max(8),
  weakConcepts: z.array(z.string().min(1).max(300)).max(8),
  missingConcepts: z.array(z.string().min(1).max(300)).max(8),
  misconceptions: z.array(z.string().min(1).max(400)).max(8),
  followUpQuestions: z.array(z.string().min(1).max(500)).min(1).max(5),
  encouragement: z.string().min(1).max(500),
}).strict()

export type AnalyzeRequest = z.infer<typeof analyzeRequestSchema>
export type TeachBackAnalysis = z.infer<typeof teachBackAnalysisSchema>

const teachBackResponseJsonSchema = {
  type: "OBJECT",
  properties: {
    learningScore: { type: "NUMBER", minimum: 0, maximum: 100 },
    confidence: { type: "NUMBER", minimum: 0, maximum: 100 },
    summary: { type: "STRING" },
    strongConcepts: { type: "ARRAY", items: { type: "STRING" } },
    weakConcepts: { type: "ARRAY", items: { type: "STRING" } },
    missingConcepts: { type: "ARRAY", items: { type: "STRING" } },
    misconceptions: { type: "ARRAY", items: { type: "STRING" } },
    followUpQuestions: { type: "ARRAY", items: { type: "STRING" } },
    encouragement: { type: "STRING" },
  },
  required: ["learningScore", "confidence", "summary", "strongConcepts", "weakConcepts", "missingConcepts", "misconceptions", "followUpQuestions", "encouragement"],
  propertyOrdering: ["learningScore", "confidence", "summary", "strongConcepts", "weakConcepts", "missingConcepts", "misconceptions", "followUpQuestions", "encouragement"],
  additionalProperties: false,
} as const

class GeminiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message)
    this.name = "GeminiError"
  }
}

type GeminiGenerateContentResponse = {
  candidates?: Array<{ content?: { parts?: Array<{ text?: string }> }; finishReason?: string }>
  error?: { message?: string; status?: string }
}

function createPrompt({ topic, transcript }: AnalyzeRequest): string {
  return `You are TeachBack AI, an expert and supportive learning coach. Evaluate a student's explanation using the Teach-Back method.

Topic: ${topic}

Student transcript:
"""
${transcript}
"""

Evaluation rules:
- Judge only the supplied transcript; never invent details the student did not state.
- learningScore is 0-100 for correctness, completeness, causal reasoning, and clarity.
- confidence is 0-100 for how confident the evaluation is given the transcript evidence, not the student's self-confidence.
- Distinguish weak concepts (mentioned but unclear/incomplete), missing concepts (important but absent), and misconceptions (claims that are incorrect or misleading).
- Use empty arrays when there is no evidence for a category.
- Give 2-4 specific follow-up questions that would test or deepen understanding.
- Be encouraging, precise, and age-neutral.
- Return only the JSON object that matches the required schema; no Markdown or commentary.`
}

export async function analyzeTeachBack(input: AnalyzeRequest): Promise<TeachBackAnalysis> {
  const apiKey = process.env.GEMINI_API_KEY
  const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash"

  if (!apiKey) throw new GeminiError("The Gemini API key is not configured.", 500)

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 25_000)

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: createPrompt(input) }] }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: "application/json",
            responseSchema: teachBackResponseJsonSchema,
          },
        }),
      },
    )

    const payload = (await response.json().catch(() => null)) as GeminiGenerateContentResponse | null
    if (!response.ok) {
      console.error("Gemini request failed", { status: response.status, providerStatus: payload?.error?.status })
      throw new GeminiError("The analysis service is temporarily unavailable.", 502)
    }

    const text = payload?.candidates?.[0]?.content?.parts?.find((part) => typeof part.text === "string")?.text
    if (!text) {
      console.error("Gemini returned no analyzable content", { finishReason: payload?.candidates?.[0]?.finishReason })
      throw new GeminiError("The analysis service returned an empty response.", 502)
    }

    let parsed: unknown
    try {
      parsed = JSON.parse(text)
    } catch {
      console.error("Gemini returned invalid JSON")
      throw new GeminiError("The analysis service returned an invalid response.", 502)
    }

    const result = teachBackAnalysisSchema.safeParse(parsed)
    if (!result.success) {
      console.error("Gemini response failed schema validation", result.error.flatten())
      throw new GeminiError("The analysis service returned an invalid response.", 502)
    }

    return result.data
  } catch (error) {
    if (error instanceof GeminiError) throw error
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new GeminiError("The analysis request timed out. Please try again.", 504)
    }
    console.error("Unexpected Gemini request error", error)
    throw new GeminiError("The analysis service is temporarily unavailable.", 502)
  } finally {
    clearTimeout(timeout)
  }
}
