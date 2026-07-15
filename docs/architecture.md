# System Architecture

## Overview

TeachBack AI follows a hybrid architecture that combines deterministic educational analysis with browser-based transformer inference.

The deterministic engine provides stable educational feedback while the browser-side transformer improves semantic understanding using sentence embeddings.

---

## High-Level Architecture

```text
                 User
                  │
                  ▼
      Browser (Next.js Frontend)
                  │
                  ▼
     Browser Speech Recognition
                  │
                  ▼
          Teaching Transcript
                  │
         ┌────────┴────────┐
         │                 │
         ▼                 ▼
Transformers.js      /api/analyze
(MiniLM Model)   Deterministic Engine
         │                 │
         └────────┬────────┘
                  ▼
          Combined Analysis
                  │
                  ▼
         Learning Feedback
```

---

## Components

### Frontend

- Next.js
- React
- TypeScript

Responsible for:

- Topic selection
- Voice recording
- Transcript display
- Analysis dashboard

---

### Local AI Layer

Runs completely inside the browser.

Model:

Xenova/all-MiniLM-L6-v2

Runtime:

Transformers.js

Purpose:

Generate sentence embeddings and calculate semantic similarity.

---

### Analysis Engine

Performs:

- Concept coverage
- Keyword matching
- Educational heuristics
- Learning score
- Follow-up questions

---

## Privacy

The transformer executes inside the user's browser.

No cloud AI inference is used.

The deterministic engine remains available as a fallback.

---

## Design Decisions

- Lightweight browser transformer
- Hybrid scoring
- Fast inference
- Privacy-first design
- Graceful fallback
