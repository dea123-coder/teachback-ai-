"use client"

export const LOCAL_EMBEDDING_MODEL = "Xenova/all-MiniLM-L6-v2"

type FeatureExtractor = (
  text: string,
  options: { pooling: "mean"; normalize: true },
) => Promise<{ data: ArrayLike<number> }>

let extractorPromise: Promise<FeatureExtractor> | null = null

function cosineSimilarity(left: ArrayLike<number>, right: ArrayLike<number>): number {
  const length = Math.min(left.length, right.length)
  let dot = 0
  let leftMagnitude = 0
  let rightMagnitude = 0

  for (let index = 0; index < length; index += 1) {
    dot += left[index] * right[index]
    leftMagnitude += left[index] * left[index]
    rightMagnitude += right[index] * right[index]
  }

  if (!leftMagnitude || !rightMagnitude) return 0
  return Math.max(0, Math.min(1, dot / Math.sqrt(leftMagnitude * rightMagnitude)))
}

async function createExtractor(): Promise<FeatureExtractor> {
  if (typeof window === "undefined") {
    throw new Error("The local embedding model can only run in a browser.")
  }

  const { pipeline } = await import("@huggingface/transformers")
  const extractor = await pipeline("feature-extraction", LOCAL_EMBEDDING_MODEL)

  return extractor as unknown as FeatureExtractor
}

export async function loadLocalEmbeddingModel(): Promise<void> {
  if (!extractorPromise) extractorPromise = createExtractor()

  try {
    await extractorPromise
  } catch (error) {
    extractorPromise = null
    throw error
  }
}

/**
 * Runs MiniLM inference in the browser. Transformers.js downloads the model once
 * and relies on the browser cache for later sessions; no inference request leaves
 * the device.
 */
export async function getLocalSemanticSimilarity(topic: string, transcript: string): Promise<number> {
  await loadLocalEmbeddingModel()
  const extractor = await extractorPromise

  if (!extractor) throw new Error("The local embedding model is unavailable.")

  const [topicEmbedding, transcriptEmbedding] = await Promise.all([
    extractor(topic, { pooling: "mean", normalize: true }),
    extractor(transcript, { pooling: "mean", normalize: true }),
  ])

  return Math.round(cosineSimilarity(topicEmbedding.data, transcriptEmbedding.data) * 100)
}
