# TeachBack AI

## Privacy-First On-Device AI Learning Companion

TeachBack AI is an AI-powered learning companion that helps students build deeper conceptual understanding using the teach-back learning method.

Instead of simply evaluating whether an answer is correct, TeachBack AI encourages students to explain a topic in their own words. The application analyzes the explanation, identifies knowledge gaps, highlights strengths, and provides personalized feedback to improve learning.

The project combines a browser-based transformer model with a deterministic educational analysis engine to provide fast, privacy-focused feedback while keeping the primary AI functionality on the user's device.

---

## Demo Video

https://drive.google.com/file/d/1jCrxZdnYC6IGFj66IdSweKUv9KZnL3Sj/view?usp=sharing

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

- Browser-based transformer embeddings for semantic similarity
- Deterministic educational analysis for concept evaluation

This hybrid approach improves semantic understanding while ensuring the application remains functional even if the transformer model cannot be loaded.

## Privacy-Focused Design

The primary AI model executes locally inside the browser. The deterministic analysis engine remains available as a reliable fallback.

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
Deterministic Analysis Engine
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

The model generates sentence embeddings locally for the selected topic and the student's explanation. These embeddings are compared using semantic similarity and combined with the deterministic educational analysis to provide more meaningful learning feedback while preserving the existing scoring pipeline.

---

# On-Device AI Compliance

TeachBack AI follows the OSDHack 2026 objective of running the primary AI model locally on the user's device.

Local execution includes:

- Browser-side transformer inference
- Local embedding generation
- Local semantic similarity calculation

No cloud-based large language model is used during semantic analysis.

If the transformer model cannot be loaded, the deterministic educational analysis engine continues providing feedback without interrupting the user experience.

---

# System Architecture

The application consists of four primary layers.

### User Interface

Built using Next.js, React and TypeScript. It manages the learning workflow, transcript display and feedback presentation.

### Speech Input

The browser Speech Recognition API converts spoken explanations into text.

### Local AI Layer

Transformers.js loads the Xenova/all-MiniLM-L6-v2 embedding model directly inside the browser and performs local inference.

### Educational Analysis Engine

Semantic similarity from the local transformer is combined with deterministic concept analysis to generate educational feedback.

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

### Browser APIs

- Web Speech API (Speech Recognition)

---

# # Installation

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Create a production build:

```bash
npm run build
```

---

# Example Workflow

### Topic

```
Photosynthesis
```

### Student Explanation

```
Photosynthesis is the process by which green plants prepare their food using sunlight, water and carbon dioxide. Chlorophyll absorbs sunlight and oxygen is released as a by-product.
```

### Generated Feedback

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
- The user still receives complete educational feedback.

---

#Privacy

- Semantic inference is performed locally in the browser using Transformers.js.
- No cloud-based AI model is used for semantic analysis.
- No AI API keys are required.
- User speech is processed through the browser's Speech Recognition API.
- The application does not rely on external AI services for learning analysis.

---

# Current Limitations

- Browser speech recognition availability depends on the browser implementation.
- Speech recognition behavior may vary across operating systems.
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

# docs/
 └── screenshots/
      ├── home.png
      ├── studio.png
      ├── report.png
      ├── dashboard.png
      └── history.png

# License

This project is licensed under the MIT License. See the LICENSE file for details.
