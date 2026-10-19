import type { ScenarioVariant } from './math-engine';

export interface ScenarioGenerationInput {
  question: string;
  answer: string;
  topic: string;
  difficulty: 'starter' | 'core' | 'stretch';
  teachingStyle?: string;
  model?: string;
}

export interface GuidedQuestionInteractionInput {
  question: string;
  given: string;
  studentAnswer: string;
  expectedStep?: string;
  topic?: string;
  teachingStyle?: 'supportive' | 'clear' | 'slow';
}

export interface GuidedQuestionInteractionResponse {
  status: 'correct' | 'mistake';
  whatWorked: string;
  whatToWorkOn: string;
  nextStep: string;
  hint: string;
}

export const huggingFaceScenarioPrompt = `
You are generating math lesson scenarios for a secondary-school learner experience.

Goal:
Generate real-life, concrete contexts for a single maths question while keeping the underlying mathematics exact.

Requirements:
- Keep the same core equation result and solution.
- Make the context feel believable and everyday.
- Use a calm, student-friendly tone.
- Prefer 1–2 variables with a clear real-world meaning.
- Include a title, context, variable meanings, equation text, and a short explanation transcript.
- Do not invent new answers or change the math.

Output JSON schema:
{
  "title": "string",
  "context": "string",
  "variables": [{ "name": "string", "meaning": "string" }],
  "equationText": ["string"],
  "transcript": ["string"],
  "explainAnotherWay": "string"
}

Use this question:
Question: {{QUESTION}}
Answer: {{ANSWER}}
Topic: {{TOPIC}}
Difficulty: {{DIFFICULTY}}
Teaching style: {{TEACHING_STYLE}}
`;

export function buildScenarioPrompt(input: ScenarioGenerationInput): string {
  return huggingFaceScenarioPrompt
    .replace('{{QUESTION}}', input.question)
    .replace('{{ANSWER}}', input.answer)
    .replace('{{TOPIC}}', input.topic)
    .replace('{{DIFFICULTY}}', input.difficulty)
    .replace('{{TEACHING_STYLE}}', input.teachingStyle ?? 'clear and practical');
}

export function buildGuidedQuestionPrompt(input: GuidedQuestionInteractionInput): string {
  return `
You are a supportive maths tutor helping a learner substitute into a simultaneous-equation problem.

Context:
Question: ${input.question}
Given: ${input.given}
Student answer: ${input.studentAnswer}
Expected step: ${input.expectedStep ?? 's + 3(7 - 2s) = 11'}
Topic: ${input.topic ?? 'Simultaneous equations'}
Teaching style: ${input.teachingStyle ?? 'supportive'}

Return valid JSON only with this structure:
{
  "status": "correct" | "mistake",
  "whatWorked": "string",
  "whatToWorkOn": "string",
  "nextStep": "string",
  "hint": "string"
}

Rules:
- Keep the same underlying maths exact.
- If the student has correctly substituted d = 7 - 2s into the second equation, status should be "correct".
- If they forgot to multiply the 3 by every term in brackets, status should be "mistake".
- Keep feedback short, encouraging, and specific.
`;
}

export function evaluateSubstitutionAnswer(studentAnswer: string): GuidedQuestionInteractionResponse {
  const normalised = studentAnswer.toLowerCase().replace(/\s+/g, '');

  const isCorrect =
    normalised.includes('s+3(7-2s)=11') ||
    normalised.includes('s+3(7−2s)=11') ||
    normalised.includes('s+21-6s=11') ||
    normalised.includes('s+21−6s=11') ||
    normalised.includes('s+3(7-2s)=11') ||
    normalised.includes('s+3(7-2s)=11');

  if (isCorrect) {
    return {
      status: 'correct',
      whatWorked: 'You replaced d with 7 − 2s and kept the equation balanced.',
      whatToWorkOn: 'You have the right substitution structure; now simplify the bracket and collect like terms.',
      nextStep: 'Now expand 3(7 − 2s) to 21 − 6s, then solve for s.',
      hint: 'Use the distributive law: 3(7 − 2s) = 21 − 6s.',
    };
  }

  return {
    status: 'mistake',
    whatWorked: 'You correctly substituted d = 7 − 2s into the second equation.',
    whatToWorkOn: 'The 3 must multiply every term inside the brackets, so 3(7 − 2s) becomes 21 − 6s, not 7 − 2s.',
    nextStep: 'Rewrite the equation as s + 3(7 − 2s) = 11 and then expand the bracket before collecting s terms.',
    hint: 'Multiply the 3 by both 7 and 2s. Remember: 3 × 7 = 21 and 3 × 2s = 6s.',
  };
}

function getDefaultScenarioVariants(question: string, answer: string): ScenarioVariant[] {
  const baseQuestion = question.toLowerCase();

  return [
    {
      id: 'scenario-1',
      title: 'Two friends compare their lunch bills',
      context: 'Amara and Chidi compare their lunch bills. Amara paid $11 for two burgers and one drink, while Chidi paid $10 for one burger and two drinks.',
      variables: [
        { name: 'b', meaning: 'the price of one burger' },
        { name: 'd', meaning: 'the price of one drink' },
      ],
      equationText: ['2b + d = 11', 'b + 2d = 10'],
      transcript: [
        'Amara and Chidi compare their lunch bills.',
        'Let b be the price of one burger and d be the price of one drink.',
        'Amara paid $11 for two burgers and one drink, so 2b + d = 11.',
        'Chidi paid $10 for one burger and two drinks, so b + 2d = 10.',
        'The final answer is a burger costs $4 and a drink costs $3.',
      ],
    },
    {
      id: 'scenario-2',
      title: 'School ticket sales',
      context: 'A school event sold adult and child tickets. The total income and ticket count can be represented as a system of equations.',
      variables: [
        { name: 'a', meaning: 'the number of adult tickets' },
        { name: 'c', meaning: 'the number of child tickets' },
      ],
      equationText: ['a + c = 90', '12a + 8c = 920'],
      transcript: [
        'A school event sold adult and child tickets.',
        'Let a be the number of adult tickets and c be the number of child tickets.',
        'The total ticket count and revenue form a system of equations.',
        'The final answer is the event sold 50 adult tickets and 40 child tickets.',
      ],
    },
    {
      id: 'scenario-3',
      title: 'A simple comparison problem',
      context: `The problem begins with a clear comparison: ${baseQuestion}. We can model the quantities and solve them in context.`,
      variables: [
        { name: 'x', meaning: 'the first quantity' },
        { name: 'y', meaning: 'the second quantity' },
      ],
      equationText: ['x + y = 7', 'x - y = 3'],
      transcript: [
        'This scenario compares two quantities in a simple everyday setting.',
        'Let x and y stand for the two quantities.',
        'The problem gives two equations that describe the totals and the difference.',
        `The final answer is ${answer}.`,
      ],
    },
  ];
}

function normaliseScenarioArray(raw: unknown): ScenarioVariant[] | null {
  if (!Array.isArray(raw)) {
    return null;
  }

  return raw
    .filter((item): item is Record<string, unknown> => !!item && typeof item === 'object')
    .map((item, index) => ({
      id: typeof item.id === 'string' ? item.id : `scenario-${index + 1}`,
      title: typeof item.title === 'string' ? item.title : 'Real-life scenario',
      context: typeof item.context === 'string' ? item.context : 'A real-world scenario explains the mathematics in context.',
      variables: Array.isArray(item.variables)
        ? item.variables
            .filter((variable): variable is Record<string, unknown> => !!variable && typeof variable === 'object')
            .map((variable) => ({
              name: typeof variable.name === 'string' ? variable.name : 'x',
              meaning: typeof variable.meaning === 'string' ? variable.meaning : 'an unknown quantity',
            }))
        : [{ name: 'x', meaning: 'an unknown quantity' }],
      equationText: Array.isArray(item.equationText)
        ? item.equationText.filter((entry): entry is string => typeof entry === 'string')
        : [],
      transcript: Array.isArray(item.transcript)
        ? item.transcript.filter((entry): entry is string => typeof entry === 'string')
        : [],
    }));
}

function extractGeneratedText(payload: unknown): string {
  if (Array.isArray(payload)) {
    const first = payload[0];
    if (first && typeof first === 'object' && 'generated_text' in first && typeof first.generated_text === 'string') {
      return first.generated_text;
    }
  }

  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>;
    if (typeof record.generated_text === 'string') {
      return record.generated_text;
    }
    if (Array.isArray(record.choices)) {
      const firstChoice = record.choices[0] as Record<string, unknown> | undefined;
      const text = typeof firstChoice?.text === 'string' ? firstChoice.text : undefined;
      if (text) return text;
    }
  }

  return typeof payload === 'string' ? payload : '';
}

export async function generateGuidedQuestionFeedback(
  input: GuidedQuestionInteractionInput,
): Promise<GuidedQuestionInteractionResponse> {
  const fallback = evaluateSubstitutionAnswer(input.studentAnswer);

  try {
    const response = await fetch('/api/guided-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`Backend feedback request failed: ${response.status}`);
    }

    const parsed = (await response.json()) as Partial<GuidedQuestionInteractionResponse>;
    if (parsed && typeof parsed.status === 'string' && (parsed.status === 'correct' || parsed.status === 'mistake')) {
      return {
        status: parsed.status,
        whatWorked: typeof parsed.whatWorked === 'string' ? parsed.whatWorked : fallback.whatWorked,
        whatToWorkOn: typeof parsed.whatToWorkOn === 'string' ? parsed.whatToWorkOn : fallback.whatToWorkOn,
        nextStep: typeof parsed.nextStep === 'string' ? parsed.nextStep : fallback.nextStep,
        hint: typeof parsed.hint === 'string' ? parsed.hint : fallback.hint,
      };
    }
  } catch (error) {
    console.warn('Falling back to safe guided-question feedback because the backend request failed:', error);
  }

  return fallback;
}

export async function generateScenarioVariants(input: ScenarioGenerationInput): Promise<ScenarioVariant[]> {
  try {
    const response = await fetch('/api/scenario-variants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`Backend scenario request failed: ${response.status}`);
    }

    const parsed = (await response.json()) as ScenarioVariant[];
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (error) {
    console.warn('Falling back to default scenario variants because the backend request failed:', error);
  }

  return getDefaultScenarioVariants(input.question, input.answer);
}
