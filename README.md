# TeachBack AI

TeachBack AI is an on-device learning assistant designed to evaluate conceptual understanding instead of memorization.

## Problem

Students often believe they have understood a topic after reading notes or watching lectures. In reality, understanding can only be verified when they are able to explain the concept in their own words. Existing AI learning tools primarily provide answers, summaries, or explanations, but they rarely evaluate whether a learner has genuinely understood the topic.

## Solution

TeachBack AI introduces a learning approach based on active recall and learning by teaching.

Users explain a concept using their own words. The application analyzes the explanation locally on the user's device, identifies missing concepts, evaluates conceptual coverage, and generates follow-up questions based on the detected knowledge gaps.

The objective is not to provide answers, but to measure genuine understanding.

## Why On-Device AI

The core AI processing is performed locally on the user's device.

This approach offers:

- Privacy for spoken explanations
- Offline functionality
- Faster inference without cloud latency
- Reduced dependence on external AI services

## Planned Features

- Voice-based explanation
- Concept coverage analysis
- Understanding Map
- Adaptive follow-up questions
- Offline AI inference

## Planned Technology Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Transformers.js
- ONNX Runtime Web

## Development Status

The project is currently under active development as part of OSDHack 2026.

The repository currently contains the initial project structure. Additional features and implementation will be added throughout the hackathon.

## License

MIT License
