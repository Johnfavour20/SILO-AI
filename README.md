# Silo

Silo is a mathematics learning experience designed to help students practise real-world reasoning through guided scenario-based problems. Instead of treating maths as a collection of isolated answers, the platform teaches students to reason step by step, evaluate their working, and receive feedback that helps them improve.

## Problem

Many secondary school learners struggle with mathematics not because they lack effort, but because they do not get timely, specific feedback on their reasoning. Traditional worksheets and static resources often:

- focus on final answers rather than the process
- provide limited explanations when a learner is stuck
- fail to adapt to individual misconceptions
- do not connect abstract questions to real-world situations

This issue is especially common in senior secondary mathematics, where students need both conceptual understanding and procedural fluency.

## Solution

Silo gives learners a focused, supportive flow:

- choose a topic and lesson
- watch a short concept clip
- solve a guided problem with help
- receive structured feedback tied to their answer
- retry with hints or a worked example when needed
- progress to transfer questions and additional practise

The app is built around a learning-coach model: it does not simply grade answers, it helps a learner understand what they did well, what to fix, and what to try next.

## Value Proposition

Silo combines:

- realistic word-problem contexts
- mathematically valid feedback
- scaffolded hints and worked examples
- a clear progression from guided learning to independent work

This makes the product especially suitable for secondary mathematics support, revision, and formative practice.

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide icons

### Runtime / tooling
- Node.js
- npm
- Vite dev server and build tooling

### AI / backend readiness
- Google Gemini via the `@google/genai` SDK
- environment variables for API access (`GEMINI_API_KEY`, `APP_URL`)

The current repository is primarily a front-end prototype and learning experience shell. The AI feedback layer is designed for integration with Gemini-based evaluation and feedback generation, with the app prepared for secure API key handling in deployment.

## Project Structure

```bash
SILO-AI/
├── src/
│   ├── App.tsx
│   ├── components/
│   ├── data/
│   ├── types/
│   ├── index.css
│   └── main.tsx
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .env.example
├── screenshots/
└── README.md
```

## Setup and Installation

### Prerequisites
- Node.js 20+ recommended
- npm

### Install dependencies

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

The app will start using Vite and serve the frontend locally.

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## AI Methodology and Model / API Usage

### Core methodology

The product follows a rubric-driven learning approach rather than a simple “generate answer” pattern.

The key principle is:

- identify the learner’s current step
- compare their work to a structured mathematical rubric
- detect likely misconceptions
- generate feedback that is specific to their actual input
- provide targeted hints or worked support before continuing

This is designed to behave like a learning coach rather than an answer vending machine.

### Why this matters

For mathematics education, raw AI output is not enough. We need feedback that is:

- mathematically valid
- suited to the learner’s current step
- based on structured reasoning rather than only final-answer matching
- able to identify common misconceptions such as incorrect substitution, sign errors, or missing expansion

### Model / API usage

This project includes the Google Generative AI SDK:

```json
"@google/genai": "^2.4.0"
```

The environment file indicates the intended usage pattern:

```bash
GEMINI_API_KEY="MY_GEMINI_API_KEY"
APP_URL="MY_APP_URL"
```

This suggests the intended AI flow is:

- secure secret handling for Gemini API access
- a backend or server-side layer responsible for model calls
- structured feedback generation for scenario evaluation and hints
- API-based integration for educational reasoning tasks

In the current prototype, the front-end experience is implemented and the AI pipeline is prepared for integration as the next major technical step.

## Screenshots

The project is ready for demo capture. Add screenshots into the `screenshots/` folder and update the references below before final submission.

### Planned screenshot set
- Landing page / home screen
- Topic selection and lesson flow
- Clip player / worked-example screen
- Guided step screen
- Feedback and hint states
- Dashboard / progress view

Example structure:

```text
screenshots/
├── home.png
├── lesson-flow.png
├── clip-player.png
├── step-screen.png
├── feedback-state.png
└── dashboard.png
```

Then add them in markdown like:

```markdown
![Home screen](screenshots/home.png)
![Lesson flow](screenshots/lesson-flow.png)
```

## Team Member Contributions

Below is the recommended contribution breakdown for the project. Update names and responsibilities before submission.

### Team Lead / Product Direction
- Defines the product concept, learning journey, and learning-coach design
- Aligns the experience with the competition brief and user needs

### Frontend Engineer
- Builds the React + TypeScript interface
- Implements the lesson flow, navigation, and UI states
- Ensures the design matches the Silo design language

### AI / Logic Engineer
- Designs the rubric-based feedback methodology
- Defines evaluation logic for correct, partial, and incorrect reasoning
- Prepares the model integration strategy for Gemini-powered evaluation

### QA / Validation
- Tests user journeys, edge cases, and hint/feedback states
- Checks correctness across screen layouts and interaction logic
- Verifies the app works across common browser conditions

## Demo Flow

A typical product demo can follow this path:

1. Landing page and value proposition
2. Topic selection
3. Clip player / worked-example step
4. Guided equation question
5. Feedback and hint behaviour
6. Retry or continue flow
7. Progress and lesson momentum

## Future Roadmap

- connect the lesson experience to a real Gemini-backed evaluation service
- add persistent learner progress and session history
- expand to more topics and more practice banks
- support richer question generation with deterministic answer validation
- extend into teacher dashboards and analytics

## Summary

Silo is a focused educational product for secondary mathematics learners that combines realistic problem-solving, structured feedback, and guided practice. The current repository demonstrates the product vision and lesson flow, and it is positioned to scale into a full AI-assisted learning system using the Gemini API and a rubric-based evaluation model.

---

This README was prepared to support a competition submission and can be refined with final team names, screenshots, and exact deployment details before submission.
