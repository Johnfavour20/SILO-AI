import express from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3005);
const apiKey = process.env.HUGGINGFACE_API_KEY || process.env.VITE_HUGGINGFACE_API_KEY;
const modelId = process.env.HUGGINGFACE_MODEL || process.env.VITE_HUGGINGFACE_MODEL || 'mistralai/Mistral-7B-Instruct-v0.2';

app.use(express.json({ limit: '1mb' }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

function buildGuidedQuestionPrompt(input) {
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

function buildScenarioPrompt(input) {
  return `
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
Question: ${input.question}
Answer: ${input.answer}
Topic: ${input.topic}
Difficulty: ${input.difficulty}
Teaching style: ${input.teachingStyle ?? 'clear and practical'}
`;
}

function extractGeneratedText(payload) {
  if (Array.isArray(payload)) {
    const first = payload[0];
    if (first && typeof first === 'object' && 'generated_text' in first && typeof first.generated_text === 'string') {
      return first.generated_text;
    }
  }

  if (payload && typeof payload === 'object') {
    const record = payload;
    if (typeof record.generated_text === 'string') {
      return record.generated_text;
    }
    if (Array.isArray(record.choices)) {
      const firstChoice = record.choices[0];
      const text = typeof firstChoice?.text === 'string' ? firstChoice.text : undefined;
      if (text) return text;
    }
  }

  return typeof payload === 'string' ? payload : '';
}

function normaliseScenarioArray(raw) {
  if (!Array.isArray(raw)) {
    return null;
  }

  return raw
    .filter((item) => !!item && typeof item === 'object')
    .map((item, index) => ({
      id: typeof item.id === 'string' ? item.id : `scenario-${index + 1}`,
      title: typeof item.title === 'string' ? item.title : 'Real-life scenario',
      context: typeof item.context === 'string' ? item.context : 'A real-world scenario explains the mathematics in context.',
      variables: Array.isArray(item.variables)
        ? item.variables
            .filter((variable) => !!variable && typeof variable === 'object')
            .map((variable) => ({
              name: typeof variable.name === 'string' ? variable.name : 'x',
              meaning: typeof variable.meaning === 'string' ? variable.meaning : 'an unknown quantity',
            }))
        : [{ name: 'x', meaning: 'an unknown quantity' }],
      equationText: Array.isArray(item.equationText)
        ? item.equationText.filter((entry) => typeof entry === 'string')
        : [],
      transcript: Array.isArray(item.transcript)
        ? item.transcript.filter((entry) => typeof entry === 'string')
        : [],
    }));
}

async function callHuggingFace(prompt, maxTokens = 250, temperature = 0.3) {
  if (!apiKey) {
    throw new Error('Missing HUGGINGFACE_API_KEY');
  }

  const response = await fetch(`https://api-inference.huggingface.co/models/${modelId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: maxTokens,
        temperature,
        return_full_text: false,
      },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Hugging Face request failed (${response.status}): ${text}`);
  }

  const payload = await response.json();
  const text = extractGeneratedText(payload).trim();
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
  return JSON.parse(cleaned);
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, status: 'backend-ready' });
});

app.post('/api/guided-feedback', async (req, res) => {
  const input = req.body || {};
  const fallback = {
    status: 'mistake',
    whatWorked: 'You correctly replaced d with 7 − 2s in the second equation.',
    whatToWorkOn: 'The 3 must multiply every term inside the brackets, so 3(7 − 2s) becomes 21 − 6s, not 7 − 2s.',
    nextStep: 'Rewrite the equation as s + 3(7 − 2s) = 11 and then expand the bracket before collecting s terms.',
    hint: 'Multiply the 3 by both 7 and 2s. Remember: 3 × 7 = 21 and 3 × 2s = 6s.',
  };

  try {
    const prompt = buildGuidedQuestionPrompt({
      question: input.question ?? 'At the school fair, 2 samosas and 1 drink cost $7. 1 samosa and 3 drinks cost $11. Let s be the price of a samosa and d the price of a drink.',
      given: input.given ?? 'd = 7 − 2s',
      studentAnswer: input.studentAnswer ?? 's + 7 − 2s = 11',
      expectedStep: input.expectedStep ?? 's + 3(7 − 2s) = 11',
      topic: input.topic ?? 'Simultaneous equations',
      teachingStyle: input.teachingStyle ?? 'supportive',
    });

    const parsed = await callHuggingFace(prompt, 250, 0.3);
    if (parsed && typeof parsed.status === 'string' && (parsed.status === 'correct' || parsed.status === 'mistake')) {
      return res.json({
        status: parsed.status,
        whatWorked: typeof parsed.whatWorked === 'string' ? parsed.whatWorked : fallback.whatWorked,
        whatToWorkOn: typeof parsed.whatToWorkOn === 'string' ? parsed.whatToWorkOn : fallback.whatToWorkOn,
        nextStep: typeof parsed.nextStep === 'string' ? parsed.nextStep : fallback.nextStep,
        hint: typeof parsed.hint === 'string' ? parsed.hint : fallback.hint,
      });
    }
  } catch (error) {
    console.warn('HF guided-feedback failed, using fallback:', error);
  }

  return res.json(fallback);
});

app.post('/api/scenario-variants', async (req, res) => {
  const input = req.body || {};
  const fallback = [
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
  ];

  try {
    const prompt = buildScenarioPrompt({
      question: input.question ?? 'Solve x + y = 7 and x - y = 3.',
      answer: input.answer ?? 'x = 5, y = 2',
      topic: input.topic ?? 'Simultaneous equations',
      difficulty: input.difficulty ?? 'starter',
      teachingStyle: input.teachingStyle ?? 'clear and practical',
    });

    const parsed = await callHuggingFace(prompt, 500, 0.7);
    const normalized = normaliseScenarioArray(parsed);
    if (normalized && normalized.length > 0) {
      return res.json(normalized);
    }
  } catch (error) {
    console.warn('HF scenario generation failed, using fallback:', error);
  }

  return res.json(fallback);
});

app.listen(PORT, () => {
  console.log(`AI backend listening on http://localhost:${PORT}`);
});
