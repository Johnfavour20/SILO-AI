import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, it, expect } from 'vitest';
import { solveLinearSystem, solveQuadraticExact, createFraction, addFractions, subtractFractions, multiplyFractions, divideFractions } from './math-engine.ts';
import { buildLessonTemplateFromQuestion, getQuestionsByType } from './lesson-templates.ts';
import { buildClipStoryboard, getStoryboardById } from './clip-storyboard.ts';
import { evaluateSubstitutionAnswer } from './scenario-generator.ts';
import { resolveLessonToQuestionId } from './lesson-routing.ts';
import { LessonClipPlayerPage } from '../components/LessonClipPlayerPage';

describe('fraction arithmetic', () => {
  it('adds fractions exactly', () => {
    expect(addFractions({ numerator: 1, denominator: 2 }, { numerator: 1, denominator: 3 })).toEqual({ numerator: 5, denominator: 6 });
  });

  it('subtracts fractions exactly', () => {
    expect(subtractFractions({ numerator: 3, denominator: 4 }, { numerator: 1, denominator: 2 })).toEqual({ numerator: 1, denominator: 4 });
  });

  it('multiplies fractions exactly', () => {
    expect(multiplyFractions({ numerator: 2, denominator: 3 }, { numerator: 3, denominator: 5 })).toEqual({ numerator: 2, denominator: 5 });
  });

  it('divides fractions exactly', () => {
    expect(divideFractions({ numerator: 3, denominator: 4 }, { numerator: 2, denominator: 5 })).toEqual({ numerator: 15, denominator: 8 });
  });

  it('creates a simplified fraction', () => {
    expect(createFraction(6, 8)).toEqual({ numerator: 3, denominator: 4 });
  });
});

describe('linear systems', () => {
  it('solves a basic simultaneous system', () => {
    const result = solveLinearSystem(1, 1, 7, 1, -1, 3);
    expect(result.x).toEqual({ numerator: 5, denominator: 1 });
    expect(result.y).toEqual({ numerator: 2, denominator: 1 });
  });
});

describe('quadratic solving', () => {
  it('solves factorable quadratics exactly', () => {
    const result = solveQuadraticExact(1, -5, 6);
    expect(result.roots).toHaveLength(2);
    expect(result.roots[0]).toEqual({ numerator: 3, denominator: 1 });
    expect(result.roots[1]).toEqual({ numerator: 2, denominator: 1 });
  });

  it('handles fractional roots', () => {
    const result = solveQuadraticExact(2, -3, -2);
    expect(result.roots).toHaveLength(2);
    expect(result.roots[0]).toEqual({ numerator: 2, denominator: 1 });
    expect(result.roots[1]).toEqual({ numerator: -1, denominator: 2 });
  });
});

describe('lesson player render', () => {
  it('renders the lesson player on a pinned early frame without crashing', () => {
    const html = renderToString(
      React.createElement(LessonClipPlayerPage, {
        lessonId: 'simultaneous-1',
        onExit: () => undefined,
        initialFrame: '2_playing_early',
      }),
    );

    expect(html).toContain('Solve');
    expect(html).toContain('Simultaneous equations');
  });
});

describe('lesson templates', () => {
  it('creates a structured lesson flow from a question template', () => {
    const lesson = buildLessonTemplateFromQuestion({
      id: 'simultaneous-1',
      type: 'simultaneous',
      topic: 'Simultaneous equations',
      difficulty: 'starter',
      prompt: 'Solve x + y = 7 and x - y = 3.',
      answer: 'x = 5, y = 2',
      steps: ['Add the equations', 'Solve for x', 'Substitute to find y'],
      tags: ['linear', 'elimination'],
    });

    expect(lesson.id).toBe('simultaneous-1');
    expect(lesson.steps.length).toBeGreaterThanOrEqual(3);
    expect(lesson.steps[0].title).toContain('Step 1');
    expect(lesson.steps[0].prompt).toContain('Solve x + y = 7 and x - y = 3.');
  });

  it('returns questions grouped by type', () => {
    const quadraticQuestions = getQuestionsByType('quadratic');
    expect(quadraticQuestions.length).toBeGreaterThan(0);
    expect(quadraticQuestions[0].type).toBe('quadratic');
  });

  it('creates a code-driven clip storyboard from the lesson narrative', () => {
    const storyboard = buildClipStoryboard({
      id: 'simultaneous-1',
      type: 'simultaneous',
      topic: 'Simultaneous equations',
      difficulty: 'starter',
      prompt: 'Solve x + y = 7 and x - y = 3.',
      answer: 'x = 5, y = 2',
      steps: ['Add the equations', 'Solve for x', 'Substitute to find y'],
      tags: ['linear', 'elimination'],
    });

    expect(storyboard.id).toBe('simultaneous-1');
    expect(storyboard.scenes.length).toBeGreaterThan(2);
    expect(storyboard.transcript[0]).toContain('Let');
  });

  it('retrieves a storyboard by id from the real question bank', () => {
    const storyboard = getStoryboardById('quadratic-1');
    expect(storyboard?.topic).toBe('Quadratic equations');
    expect(storyboard?.durationSeconds).toBeGreaterThan(0);
    expect(storyboard?.transcript.join(' ')).toContain('quadratic');
  });

  it('handles multiple real lesson families', () => {
    const simultaneous = getStoryboardById('simultaneous-1');
    const wordProblem = getStoryboardById('word-1');
    expect(simultaneous?.topic).toBe('Simultaneous equations');
    expect(wordProblem?.topic).toBe('Word problems');
  });

  it('uses a deliberate pacing profile per lesson type', () => {
    const simultaneous = getStoryboardById('simultaneous-1');
    const quadratic = getStoryboardById('quadratic-1');
    const wordProblem = getStoryboardById('word-1');

    expect(simultaneous?.scenes[1].startSecond).toBe(8);
    expect(quadratic?.scenes[1].startSecond).toBe(7);
    expect(wordProblem?.scenes[1].startSecond).toBe(6);
    expect(simultaneous?.scenes[2].startSecond).toBeGreaterThan(quadratic?.scenes[2].startSecond ?? 0);
  });

  it('uses a real-life scenario variant to explain the maths in context', () => {
    const storyboard = getStoryboardById('simultaneous-1');
    const transcript = storyboard?.transcript.join(' ');

    expect(transcript).toContain('burger');
    expect(transcript).toContain('drink');
  });

  it('recognises the correct substitution step for the guided question', () => {
    const feedback = evaluateSubstitutionAnswer('s + 3(7 - 2s) = 11');

    expect(feedback.status).toBe('correct');
    expect(feedback.hint).toContain('3(7');
    expect(feedback.hint).toContain('2s');
  });

  it('routes quadratic lesson ids to their correct question ids', () => {
    expect(resolveLessonToQuestionId('quad-2')).toBe('quadratic-2');
    expect(resolveLessonToQuestionId('quadratic-2')).toBe('quadratic-2');
    expect(resolveLessonToQuestionId('sim-2')).toBe('simultaneous-2');
  });

  it('gives step-specific quadratic substitution feedback', () => {
    const feedback = evaluateSubstitutionAnswer('x + 3(7 - 2x) = 11');

    expect(feedback.status).toBe('correct');
    expect(feedback.whatWorked.toLowerCase()).toContain('expand correctly');
    expect(feedback.whatToWorkOn.toLowerCase()).toContain('collect like terms');
    expect(feedback.nextStep.toLowerCase()).toContain('solve for x');
    expect(feedback.hint.toLowerCase()).toContain('check by substitution');
  });

  it('builds a Hugging Face prompt and falls back safely without an API key', async () => {
    const { buildScenarioPrompt, generateScenarioVariants } = await import('./scenario-generator.ts');
    const prompt = buildScenarioPrompt({
      question: 'Solve x + y = 7 and x - y = 3.',
      answer: 'x = 5, y = 2',
      topic: 'Simultaneous equations',
      difficulty: 'starter',
    });

    expect(prompt).toContain('Simultaneous equations');
    expect(prompt).toContain('x + y = 7 and x - y = 3.');

    const fallback = await generateScenarioVariants({
      question: 'Solve x + y = 7 and x - y = 3.',
      answer: 'x = 5, y = 2',
      topic: 'Simultaneous equations',
      difficulty: 'starter',
    });

    expect(fallback.length).toBeGreaterThan(0);
    expect(fallback[0].title).toContain('Two friends compare their lunch bills');
  });
});
