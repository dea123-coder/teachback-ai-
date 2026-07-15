# TeachBack AI

## Privacy-First On-Device AI Learning Companion

TeachBack AI is an AI-powered learning companion that helps students build deeper conceptual understanding using the teach-back learning method.

Instead of only evaluating whether an answer is correct, TeachBack AI encourages students to explain a topic in their own words. The application analyzes the explanation, identifies knowledge gaps, highlights strengths, and provides personalized feedback to improve learning.

The project combines a browser-based transformer model with a deterministic educational analysis engine to provide fast, privacy-focused feedback while keeping the primary AI functionality on the user's device.

---

# Problem Statement

Many students rely on memorization instead of developing conceptual understanding.

Traditional learning platforms primarily evaluate final answers or quiz scores, making it difficult to determine whether a student can confidently explain a concept, identify missing ideas, or recognize misconceptions.

The ability to teach a concept is often a better indicator of understanding than simply selecting the correct answer.

---

# Solution

TeachBack AI transforms learning into an active teaching experience.

Students select a topic and explain it naturally using their own voice. The system evaluates the explanation and provides constructive feedback that helps learners understand what they explained well and what requires further improvement.

The application generates:

- Learning Score
- Strong Concepts
- Missing Concepts
- Weak Areas
- Follow-up Questions
- Personalized Encouragement

---

# Key Features

## Voice-Based Learning

Students explain concepts naturally using speech instead of typing responses.

## On-Device AI Analysis

Semantic understanding is enhanced using a browser-based transformer model that generates sentence embeddings locally.

## Hybrid Analysis Engine

TeachBack AI combines:

- Local transformer embeddings for semantic similarity
- Deterministic concept analysis for educational feedback

This hybrid approach improves reliability while ensuring the application remains functional even if the transformer model cannot be loaded.

## Privacy-Focused Design

The primary AI reasoning runs locally in the browser without relying on cloud AI inference services.

---

# On-Device AI Pipeline

```text
Student Voice
      │
      ▼
Browser Speech Recognition
      │
      ▼
Teaching Transcript
      │
      ▼
Transformers.js Runtime
      │
      ▼
Xenova/all-MiniLM-L6-v2
      │
      ▼
Sentence Embeddings
      │
      ▼
Semantic Similarity
      │
      ▼
TeachBack Analysis
      │
      ▼
Learning Feedback
```

---

# AI Model

**Model**

Xenova/all-MiniLM-L6-v2

**Runtime**

Transformers.js

**Purpose**

The transformer model generates sentence embeddings locally for:

- Selected learning topic
- Student explanation transcript

The semantic similarity score is combined with the existing deterministic analysis to improve concept understanding without replacing the original scoring engine.

---

# On-Device AI Compliance

The project follows the OSDHack 2026 on-device AI objective by ensuring that the primary AI model executes locally within the user's browser.

Local execution includes:

- Browser-side transformer inference
- Local embedding generation
- Local semantic similarity calculation

No cloud-based large language model is used during semantic analysis.

The existing deterministic analysis engine remains available as a fallback if the transformer model cannot be loaded successfully.

---

# System Design

The application consists of four primary components:

### User Interface

Built with Next.js and React, providing the teaching workflow, transcript display, and feedback dashboard.

### Speech Input

Uses the browser's Speech Recognition API to convert spoken explanations into text.

### Local AI Layer

Runs the Xenova/all-MiniLM-L6-v2 embedding model through Transformers.js directly in the browser.

### Educational Analysis Engine

Combines semantic similarity from the local transformer with deterministic concept analysis to generate meaningful learning feedback.

---

# Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### AI

- Transformers.js
- Xenova/all-MiniLM-L6-v2

### Speech

- Browser Speech Recognition API

---

# Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/teachback-ai.git
```

Navigate to the project:

```bash
cd teachback-ai
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the application:

```text
http://localhost:3000
```

Create a production build:

```bash
npm run build
```

---

# Example Workflow

**Topic**

```text
Photosynthesis
```

**Student Explanation**

```text
Photosynthesis is the process by which green plants prepare their food using sunlight, water and carbon dioxide. Chlorophyll absorbs sunlight and oxygen is released as a by-product.
```

**Generated Feedback**

- Learning Score
- Strong Concepts
- Missing Concepts
- Weak Areas
- Follow-up Questions
- Personalized Encouragement

---

# Fallback Behaviour

If the browser-based transformer model cannot be loaded:

- The application continues running normally.
- The deterministic educational analysis engine performs the evaluation.
- The user experience remains uninterrupted.

---

# Privacy

- The transformer model performs semantic inference locally in the browser.
- No cloud AI model is used for semantic understanding.
- No API keys are required for AI inference.
- Speech recognition depends on browser support and implementation.

---

# Current Limitations

- Browser speech recognition availability depends on the user's browser.
- Speech recognition behavior may vary across platforms.
- Fully offline speech recognition is outside the current project scope.

---

# Future Improvements

- Offline speech-to-text support
- Multilingual learning assistance
- Personalized learning history
- Adaptive learning recommendations
- Student progress analytics

---

# Attribution

## AI Model

- Xenova/all-MiniLM-L6-v2

## Libraries

- Transformers.js
- Next.js
- React
- Tailwind CSS

## Browser APIs

- Web Speech API (Speech Recognition)

---

# License

This project was developed for OSDHack 2026 as an educational demonstration of privacy-focused on-device AI.
