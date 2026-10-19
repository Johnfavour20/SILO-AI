import type { QuestionTemplate, QuestionType } from './math-engine';
import { questionBank } from '../data/questionBank';

export interface LessonTemplateFeedback {
  whatWorked: string;
  whatToWorkOn: string;
  tryThisNext: string;
  isFullyCorrect?: boolean;
}

export interface LessonTemplateSampleAnswer {
  label: string;
  answer: string;
  feedback: LessonTemplateFeedback;
}

export interface LessonTemplateStep {
  stepNumber: number;
  totalSteps: number;
  title: string;
  prompt: string;
  contextSummary?: string;
  defaultAnswer?: string;
  hints: string[];
  sampleAnswers: LessonTemplateSampleAnswer[];
}

export interface LessonTemplate {
  id: string;
  type: QuestionType;
  topic: string;
  difficulty: 'starter' | 'core' | 'stretch';
  prompt: string;
  answer: string;
  summary: string;
  tags: string[];
  steps: LessonTemplateStep[];
}

export function buildLessonTemplateFromQuestion(question: QuestionTemplate): LessonTemplate {
  const totalSteps = Math.max(question.steps.length, 1);

  return {
    id: question.id,
    type: question.type,
    topic: question.topic,
    difficulty: question.difficulty,
    prompt: question.prompt,
    answer: question.answer,
    summary: `Structured lesson for ${question.topic.toLowerCase()} using a ${question.difficulty} task.`,
    tags: question.tags,
    steps: question.steps.map((stepText, index) => ({
      stepNumber: index + 1,
      totalSteps,
      title: `Step ${index + 1} of ${totalSteps}`,
      prompt: question.prompt,
      contextSummary: `${question.topic} · ${question.difficulty}`,
      defaultAnswer: question.answer,
      hints: [
        `Identify the key relationship in the question before starting the algebra.`,
        `Use this reasoning move: ${stepText}`,
        `Check the final answer against the exact solution and verify each step.`,
      ],
      sampleAnswers: [
        {
          label: 'Model solution',
          answer: question.answer,
          feedback: {
            whatWorked: 'This matches the expected mathematical structure and final answer.',
            whatToWorkOn: 'No further correction needed for the model answer.',
            tryThisNext: 'Use the step sequence to explain why the answer is valid.',
            isFullyCorrect: true,
          },
        },
      ],
    })),
  };
}

export function getQuestionsByType(type: QuestionType): QuestionTemplate[] {
  return questionBank.filter((question) => question.type === type);
}

export function getAllLessonTemplates(): LessonTemplate[] {
  return questionBank.map((question) => buildLessonTemplateFromQuestion(question));
}
