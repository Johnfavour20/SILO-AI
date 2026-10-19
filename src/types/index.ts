export interface StepFeedback {
  whatWorked: string;
  whatToWorkOn: string;
  tryThisNext: string;
  isFullyCorrect?: boolean;
}

export interface ScenarioStep {
  stepNumber: number;
  totalSteps: number;
  title: string;
  prompt: string;
  contextSummary?: string;
  defaultAnswer?: string;
  hints: string[];
  sampleAnswers: {
    label: string;
    answer: string;
    feedback: StepFeedback;
  }[];
  evaluate: (input: string) => StepFeedback;
}

export interface Scenario {
  id: string;
  title: string;
  topic: string;
  curriculumLevel: string;
  tagline: string;
  description: string;
  contextStory: string;
  variables: { symbol: string; meaning: string; unit?: string }[];
  steps: ScenarioStep[];
  strengthsTaught: string[];
  revisitConcepts: string[];
  followUpQuestion: string;
}
