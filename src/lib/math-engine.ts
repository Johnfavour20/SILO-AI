export type Fraction = {
  numerator: number;
  denominator: number;
};

export type QuestionType = 'simultaneous' | 'quadratic' | 'word-problem' | 'factorising';

export interface ScenarioVariant {
  id: string;
  title: string;
  context: string;
  variables: Array<{ name: string; meaning: string }>;
  equationText: string[];
  transcript: string[];
}

export interface QuestionTemplate {
  id: string;
  type: QuestionType;
  topic: string;
  difficulty: 'starter' | 'core' | 'stretch';
  prompt: string;
  answer: string;
  steps: string[];
  tags: string[];
  scenarioVariants?: ScenarioVariant[];
}

export function createFraction(numerator: number, denominator: number = 1): Fraction {
  if (denominator === 0) {
    throw new Error('Denominator cannot be zero');
  }

  const sign = denominator < 0 ? -1 : 1;
  numerator *= sign;
  denominator *= sign;

  const gcd = Math.abs(getGCD(numerator, denominator));

  return {
    numerator: numerator / gcd,
    denominator: denominator / gcd,
  };
}

export function addFractions(a: Fraction, b: Fraction): Fraction {
  return createFraction(a.numerator * b.denominator + b.numerator * a.denominator, a.denominator * b.denominator);
}

export function subtractFractions(a: Fraction, b: Fraction): Fraction {
  return createFraction(a.numerator * b.denominator - b.numerator * a.denominator, a.denominator * b.denominator);
}

export function multiplyFractions(a: Fraction, b: Fraction): Fraction {
  return createFraction(a.numerator * b.numerator, a.denominator * b.denominator);
}

export function divideFractions(a: Fraction, b: Fraction): Fraction {
  if (b.numerator === 0) {
    throw new Error('Division by zero is not allowed');
  }

  return createFraction(a.numerator * b.denominator, a.denominator * b.numerator);
}

export function fractionToString(value: Fraction): string {
  if (value.denominator === 1) {
    return String(value.numerator);
  }

  return `${value.numerator}/${value.denominator}`;
}

export function solveLinearSystem(
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number,
): { x: Fraction; y: Fraction } {
  const determinant = a * e - b * d;

  if (determinant === 0) {
    throw new Error('Linear system has no unique solution');
  }

  const xNum = c * e - b * f;
  const yNum = a * f - c * d;

  return {
    x: createFraction(xNum, determinant),
    y: createFraction(yNum, determinant),
  };
}

export function solveQuadraticExact(a: number, b: number, c: number): {
  roots: Fraction[];
  discriminant: number;
  vertexX: Fraction;
  formula: string;
} {
  if (a === 0) {
    throw new Error('This is not a quadratic equation because a = 0');
  }

  const discriminant = b * b - 4 * a * c;
  const vertexX = createFraction(-b, 2 * a);

  const sqrtDiscriminant = Math.sqrt(discriminant);
  const hasRationalRoots = Number.isInteger(sqrtDiscriminant) && discriminant >= 0;

  if (!hasRationalRoots) {
    return {
      roots: [],
      discriminant,
      vertexX,
      formula: `x = (-${b} ± √${discriminant}) / ${2 * a}`,
    };
  }

  const root1 = createFraction(-b + sqrtDiscriminant, 2 * a);
  const root2 = createFraction(-b - sqrtDiscriminant, 2 * a);

  return {
    roots: [root1, root2],
    discriminant,
    vertexX,
    formula: `x = (-${b} ± √${discriminant}) / ${2 * a}`,
  };
}

export function factoriseQuadratic(a: number, b: number, c: number): string | null {
  const discriminant = b * b - 4 * a * c;

  if (a === 0) {
    return null;
  }

  if (discriminant < 0) {
    return null;
  }

  const sqrtValue = Math.sqrt(discriminant);

  if (!Number.isInteger(sqrtValue)) {
    return null;
  }

  const root1 = (-b + sqrtValue) / (2 * a);
  const root2 = (-b - sqrtValue) / (2 * a);

  return `(${formatLinearTerm(a, root1)})(${formatLinearTerm(a, root2)})`;
}

function formatLinearTerm(a: number, root: number): string {
  const coefficient = a === 1 ? '' : String(a);
  const value = Number.isInteger(root) ? String(root) : root.toFixed(3).replace(/0+$/, '').replace(/\.$/, '');
  return `${coefficient}x - ${value}`;
}

function getGCD(a: number, b: number): number {
  if (b === 0) {
    return Math.abs(a);
  }

  return getGCD(b, a % b);
}

export function formatEquationStep(label: string, expression: string): string {
  return `${label}: ${expression}`;
}
