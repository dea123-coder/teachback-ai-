import { NextResponse } from "next/server"
import { analyzeRequestSchema, analyzeTeachBack } from "@/lib/teachback-analysis"

export const runtime = "nodejs"
export const maxDuration = 30

function errorResponse(status: number, code: string, message: string, details?: unknown) {
  return NextResponse.json(
    { error: { code, message, ...(details ? { details } : {}) } },
    { status },
  )
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return errorResponse(400, "INVALID_JSON", "Request body must be valid JSON.")
  }

  const parsedInput = analyzeRequestSchema.safeParse(body)
  if (!parsedInput.success) {
    return errorResponse(400, "VALIDATION_ERROR", "Please provide a valid topic and transcript.", parsedInput.error.flatten())
  }

  try {
    const analysis = await analyzeTeachBack(parsedInput.data)
    return NextResponse.json(analysis, { status: 200, headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    const message = error instanceof Error ? error.message : "The analysis service is temporarily unavailable."
    const status = error instanceof Error && "status" in error && typeof error.status === "number" ? error.status : 502
    const code = status === 500 ? "CONFIGURATION_ERROR" : status === 504 ? "UPSTREAM_TIMEOUT" : "ANALYSIS_UNAVAILABLE"
    return errorResponse(status, code, message)
  }
}
