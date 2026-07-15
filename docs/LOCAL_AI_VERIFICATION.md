# Local AI Verification

## Runs On Device

- Transformers.js
- Xenova/all-MiniLM-L6-v2
- Sentence embedding generation
- Semantic similarity computation

These operations execute locally inside the user's browser.

---

## Requires Browser Support

- Speech Recognition API

Depending on browser implementation, speech recognition may require network connectivity.

---

## Does Not Leave Device

- Transformer inference
- Embedding generation
- Semantic similarity

---

## Fallback

If the transformer cannot be loaded, the deterministic educational analysis engine continues working normally.

No cloud AI model is required for application functionality.
