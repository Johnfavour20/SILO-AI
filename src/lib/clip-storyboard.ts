import type { QuestionTemplate } from './math-engine';
import { questionBank } from '../data/questionBank';

export interface ClipScene {
  id: 'setup' | 'equation' | 'working' | 'result';
  startSecond: number;
  endSecond: number;
  title: string;
  caption: string;
  visual: 'bill-board' | 'equation' | 'working' | 'result';
  emphasis?: string[];
}

export interface ClipStoryboard {
  id: string;
  title: string;
  topic: string;
  difficulty: 'starter' | 'core' | 'stretch';
  durationSeconds: number;
  scenes: ClipScene[];
  transcript: string[];
  scenarioId?: string;
}

function getTimingProfile(type: QuestionTemplate['type']): number[] {
  if (type === 'quadratic') {
    return [0, 7, 15, 26, 32];
  }

  if (type === 'word-problem') {
    return [0, 6, 14, 24, 32];
  }

  return [0, 8, 17, 25, 32];
}

function selectScenarioVariant(question: QuestionTemplate) {
  const variants = question.scenarioVariants ?? [];

  return variants[0] ?? {
    id: 'default',
    title: question.topic,
    context: `We are solving a ${question.topic.toLowerCase()} question in context.`,
    variables: [],
    equationText: [question.prompt],
    transcript: [
      `Let the unknown values in ${question.topic.toLowerCase()} be variables, and write the equations clearly.`,
      'We frame the problem in context so the algebra reflects the real story.',
    ],
  };
}

export function buildClipStoryboard(question: QuestionTemplate, variantId?: string): ClipStoryboard {
  const variants = question.scenarioVariants ?? [];
  const variant = variants.find((item) => item.id === variantId) ?? selectScenarioVariant(question);
  const baseTitle = question.topic;
  const storyTitle = variant.title || question.topic;
  const timingProfile = getTimingProfile(question.type);

  const scenes: ClipScene[] = [
    {
      id: 'setup',
      startSecond: timingProfile[0],
      endSecond: timingProfile[1],
      title: 'Scene 1 · Story setup',
      caption: `${variant.context}`,
      visual: 'bill-board',
      emphasis: ['context', 'real world'],
    },
    {
      id: 'equation',
      startSecond: timingProfile[1],
      endSecond: timingProfile[2],
      title: 'Scene 2 · Turn words into equations',
      caption: `Let ${variant.variables.map((v) => `${v.name} be ${v.meaning.toLowerCase()}`).join(' and ')} and write the equations clearly.`,
      visual: 'equation',
      emphasis: ['variables', 'model'],
    },
    {
      id: 'working',
      startSecond: timingProfile[2],
      endSecond: timingProfile[3],
      title: 'Scene 3 · Solve step by step',
      caption: 'Use an algebraic method that matches the structure of the problem.',
      visual: 'working',
      emphasis: ['method', 'reasoning'],
    },
    {
      id: 'result',
      startSecond: timingProfile[3],
      endSecond: timingProfile[4],
      title: 'Scene 4 · Check the answer',
      caption: `The final answer is ${question.answer}. Check it against the original context.`,
      visual: 'result',
      emphasis: ['answer', 'check'],
    },
  ];

  const transcript = variant.transcript.length > 0
    ? variant.transcript
    : [
        `Let the unknown values in ${baseTitle.toLowerCase()} be variables, and write the equations clearly.`,
        'We frame the problem in context so the algebra reflects the real story.',
        `The key move is to ${question.steps[0]?.toLowerCase() ?? 'find the relation between the quantities'}.`,
        `Now solve the system step by step and keep the reasoning visible.`,
        `The final answer is ${question.answer}.`,
        'We check the result against the original problem to confirm it still makes sense.',
      ];

  return {
    id: question.id,
    title: storyTitle,
    topic: question.topic,
    difficulty: question.difficulty,
    durationSeconds: 32,
    scenes,
    transcript,
    scenarioId: variant.id,
  };
}

export function getSceneForTime(storyboard: ClipStoryboard, seconds: number): ClipScene | undefined {
  return storyboard.scenes.find(
    (scene) => seconds >= scene.startSecond && seconds <= scene.endSecond,
  );
}

export function getStoryboardById(id: string, variantId?: string): ClipStoryboard | undefined {
  const question = questionBank.find((item) => item.id === id);

  if (!question) {
    return undefined;
  }

  return buildClipStoryboard(question, variantId);
}
