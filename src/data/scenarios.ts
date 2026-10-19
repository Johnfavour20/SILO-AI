import { Scenario, StepFeedback } from '../types/index.ts';

export const scenarios: Scenario[] = [
  {
    id: 'fundraiser-stall',
    title: 'The fundraiser stall',
    topic: 'Quadratic equations',
    curriculumLevel: 'GCSE / Year 11 / IB MYP',
    tagline: 'Price elasticity, demand curves and net profit maximization',
    description:
      'A student club is manufacturing engraved silicone wristbands for charity. Market testing reveals demand falls linearly as price rises, and every band costs money to produce.',
    contextStory:
      'The robotics club is selling custom silicone wristbands. If they set the unit price to p dollars, market polling shows they will sell exactly (120 - 4p) wristbands. Each wristband costs £2 to manufacture and ship.',
    variables: [
      { symbol: 'p', meaning: 'Selling price per wristband', unit: '£' },
      { symbol: 'q', meaning: 'Quantity sold: q = 120 - 4p', unit: 'units' },
      { symbol: 'c', meaning: 'Production cost per unit = 2', unit: '£' },
      { symbol: 'Profit', meaning: 'Net earnings after manufacturing costs', unit: '£' },
    ],
    strengthsTaught: [
      'Multiplied sales quantity by unit margin rather than gross price',
      'Understood that maximum price is bounded by zero demand (p = 30)',
      'Identified vertex symmetry of quadratic profit function',
    ],
    revisitConcepts: [
      'Distinguishing revenue p·q from profit (p - c)·q in verbal prompts',
      'Expanding factored quadratic forms into standard ax² + bx + c notation',
      'Calculating economic pass-through rate when cost increases',
    ],
    followUpQuestion:
      'A drama society sells play tickets with demand q = 200 - 5t, and ticket programmes cost £1.50 each to print. Predict the profit expression and compare the vertex symmetry.',
    steps: [
      {
        stepNumber: 1,
        totalSteps: 4,
        title: 'Step 1 of 4 · Net Profit Expression',
        prompt: "Write an expression for the club's profit in terms of p.",
        contextSummary: 'Demand equation: Quantity = 120 - 4p. Production cost per band = £2.',
        defaultAnswer: 'Profit = (120 - 4p)(p)',
        hints: [
          'Recall that Total Profit = Total Revenue - Total Costs, or equivalently: (Number of items sold) × (Profit made on each item).',
          'If each wristband sells for p dollars and costs 2 dollars to produce, what is the profit earned on a single wristband?',
          'Multiply the quantity sold (120 - 4p) by the net profit per item (p - 2).',
        ],
        sampleAnswers: [
          {
            label: 'Screenshot answer (Missing unit cost)',
            answer: 'Profit = (120 - 4p)(p)',
            feedback: {
              whatWorked:
                'You correctly multiplied the number of wristbands sold by the earnings per item. The overall product structure is sound.',
              whatToWorkOn:
                'You used p for the profit per wristband, but p is the gross selling price. Because each band costs 2 dollars to make, the net profit on each is strictly p - 2.',
              tryThisNext:
                'Rewrite the expression with the adjusted net profit term, then expand to verify the quadratic form.',
              isFullyCorrect: false,
            },
          },
          {
            label: 'Factored correct answer',
            answer: 'Profit = (120 - 4p)(p - 2)',
            feedback: {
              whatWorked:
                'Spot on! You accurately factored in both the quantity sold (120 - 4p) and the net margin per item (p - 2).',
              whatToWorkOn:
                'No issues with your reasoning or formula structure.',
              tryThisNext:
                'Expand the brackets: -4p² + 128p - 240, which makes it straightforward to find the turning point in Step 2.',
              isFullyCorrect: true,
            },
          },
          {
            label: 'Expanded polynomial',
            answer: 'Profit = -4p^2 + 128p - 240',
            feedback: {
              whatWorked:
                'Excellent algebraic expansion. The leading negative coefficient -4 confirms a downward-opening parabola with a distinct maximum.',
              whatToWorkOn:
                'Nothing to correct here; your expansion from (120 - 4p)(p - 2) is mathematically rigorous.',
              tryThisNext:
                'Identify the axis of symmetry p = -b / (2a) to locate the optimal selling price.',
              isFullyCorrect: true,
            },
          },
          {
            label: 'Gross revenue only',
            answer: 'Profit = 120p - 4p^2',
            feedback: {
              whatWorked:
                'You expanded the revenue equation p × (120 - 4p) accurately.',
              whatToWorkOn:
                'This represents total sales income (Revenue), not net profit. The club spent £2 per band to produce them.',
              tryThisNext:
                'Subtract total production costs: 2 × (120 - 4p) from your revenue expression.',
              isFullyCorrect: false,
            },
          },
        ],
        evaluate: (input: string): StepFeedback => {
          const clean = input.toLowerCase().replace(/\s+/g, '');
          if (
            clean.includes('(120-4p)(p-2)') ||
            clean.includes('(p-2)(120-4p)') ||
            clean.includes('-4p^2+128p-240') ||
            clean.includes('-4p²+128p-240') ||
            clean.includes('-4(p-16)^2+784') ||
            clean.includes('-4(p-16)²+784')
          ) {
            return {
              whatWorked:
                'Spot on! You accurately factored in both the quantity sold (120 - 4p) and the net margin per item (p - 2).',
              whatToWorkOn: 'No issues with your reasoning or formula structure.',
              tryThisNext:
                'Expand the brackets into standard quadratic form: Profit = -4p² + 128p - 240 to prepare for Step 2.',
              isFullyCorrect: true,
            };
          }

          if (
            clean.includes('(120-4p)(p)') ||
            clean.includes('p(120-4p)') ||
            clean.includes('120p-4p^2') ||
            clean.includes('120p-4p²')
          ) {
            return {
              whatWorked:
                'You correctly multiplied the number of wristbands sold by the earnings per item. The overall product structure is sound.',
              whatToWorkOn:
                'You used p for the profit per wristband, but p is the gross selling price. Because each band costs 2 dollars to make, the net profit on each is strictly p - 2.',
              tryThisNext:
                'Rewrite the expression with the adjusted net profit term (p - 2), then expand to verify the quadratic form.',
              isFullyCorrect: false,
            };
          }

          if (clean.includes('120-4p-2') || clean.includes('118-4p')) {
            return {
              whatWorked: 'You noticed that the £2 cost must be accounted for.',
              whatToWorkOn:
                'You subtracted £2 from the total quantity rather than the price per wristband. The cost applies to every single band sold, so it reduces the margin on each item.',
              tryThisNext:
                'Think of it as (Quantity) × (Price - Cost), where Quantity is (120 - 4p) and net margin is (p - 2).',
              isFullyCorrect: false,
            };
          }

          if (clean.length < 3) {
            return {
              whatWorked: 'Your input is ready to be evaluated.',
              whatToWorkOn: 'Please enter an algebraic expression relating Profit to price p.',
              tryThisNext: 'Try entering Profit = (120 - 4p)(p - 2).',
              isFullyCorrect: false,
            };
          }

          return {
            whatWorked: 'You are setting up an algebraic model relating profit to price p.',
            whatToWorkOn:
              'Check whether your expression multiplies the quantity (120 - 4p) by the net profit per wristband (p - 2).',
            tryThisNext:
              'Ensure both the linear demand curve and the £2 unit cost are included in the product.',
            isFullyCorrect: false,
          };
        },
      },
      {
        stepNumber: 2,
        totalSteps: 4,
        title: 'Step 2 of 4 · Optimal Price Calculation',
        prompt: 'Find the selling price p that maximises the club’s profit.',
        contextSummary: 'Profit expression: P(p) = -4p² + 128p - 240.',
        defaultAnswer: 'p = 16',
        hints: [
          'For a parabola y = ax² + bx + c with a < 0, the maximum vertex occurs at the axis of symmetry: p = -b / (2a).',
          'Here, a = -4 and b = 128. Calculate -128 / (2 × -4). Alternatively, complete the square or differentiate P\'(p) = -8p + 128 = 0.',
          'Solve -8p + 128 = 0: 8p = 128, giving p = 16.',
        ],
        sampleAnswers: [
          {
            label: 'Correct optimal price',
            answer: 'p = £16 (or 16)',
            feedback: {
              whatWorked:
                'Spot on. You correctly calculated the vertex of the quadratic: p = -128 / (-8) = 16.',
              whatToWorkOn: 'Flawless reasoning.',
              tryThisNext:
                'Now evaluate Step 3: how many bands will the club sell at £16, and what is their total profit?',
              isFullyCorrect: true,
            },
          },
          {
            label: 'Vertex using revenue without cost',
            answer: 'p = 15',
            feedback: {
              whatWorked:
                'You found the vertex of the revenue curve 120p - 4p², where -b/(2a) = -120 / (-8) = 15.',
              whatToWorkOn:
                'Because unit costs shift the profit function down and right, revenue maximisation (£15) is lower than profit maximisation (£16).',
              tryThisNext:
                'Use the profit quadratic -4p² + 128p - 240 where b = 128.',
              isFullyCorrect: false,
            },
          },
        ],
        evaluate: (input: string): StepFeedback => {
          const clean = input.toLowerCase().replace(/\s+/g, '');
          if (clean.includes('16') && !clean.includes('160')) {
            return {
              whatWorked:
                'Exact solution. You correctly determined the vertex axis p = -b/(2a) = -128 / (2 × -4) = 16.',
              whatToWorkOn: 'No gaps detected in your calculation.',
              tryThisNext:
                'Proceed to calculate the maximum profit and quantity sold at £16.',
              isFullyCorrect: true,
            };
          }
          if (clean.includes('15')) {
            return {
              whatWorked:
                'You found the maximum of the revenue function y = 120p - 4p² (vertex at p = 15).',
              whatToWorkOn:
                'We want to maximise net profit, not revenue. The £2 production cost shifts the optimal price up to £16.',
              tryThisNext: 'Compute p = -b / (2a) using b = 128 and a = -4.',
              isFullyCorrect: false,
            };
          }
          return {
            whatWorked: 'You are working to locate the vertex of the downward parabola.',
            whatToWorkOn:
              'Check your formula: the vertex occurs at p = -b / (2a), with a = -4 and b = 128.',
            tryThisNext: 'Evaluate -128 / (2 × -4) to find the optimal price p in pounds.',
            isFullyCorrect: false,
          };
        },
      },
      {
        stepNumber: 3,
        totalSteps: 4,
        title: 'Step 3 of 4 · Maximum Profit & Volume',
        prompt:
          'Calculate the maximum profit achievable and the number of wristbands sold at this price.',
        contextSummary: 'Optimal price: p = £16. Quantity = 120 - 4p. Margin per band = p - 2.',
        defaultAnswer: 'Profit = £784, Quantity = 56 bands',
        hints: [
          'Substitute p = 16 into the quantity equation: q = 120 - 4(16).',
          'q = 120 - 64 = 56 wristbands sold.',
          'Profit = 56 × (16 - 2) = 56 × 14 = £784. Alternatively, substitute p = 16 into -4(16)² + 128(16) - 240.',
        ],
        sampleAnswers: [
          {
            label: 'Complete correct values',
            answer: 'Quantity = 56, Profit = £784',
            feedback: {
              whatWorked:
                'Both calculations are completely correct: 56 wristbands sold at a net margin of £14 each yields £784 in charity profit.',
              whatToWorkOn: 'Clear, substantiated arithmetic throughout.',
              tryThisNext:
                'Consider Step 4: what happens if the manufacturer raises cost per unit from £2 to £3?',
              isFullyCorrect: true,
            },
          },
        ],
        evaluate: (input: string): StepFeedback => {
          const clean = input.toLowerCase().replace(/\s+/g, '');
          const has784 = clean.includes('784');
          const has56 = clean.includes('56');
          if (has784 && has56) {
            return {
              whatWorked:
                'Both calculations are exact: 56 wristbands sold at a £14 margin yields £784 profit.',
              whatToWorkOn: 'No errors found.',
              tryThisNext:
                'Take on the final analytical extension in Step 4.',
              isFullyCorrect: true,
            };
          }
          if (has784) {
            return {
              whatWorked: 'You successfully calculated the maximum profit of £784.',
              whatToWorkOn: 'Also state the number of wristbands sold: q = 120 - 4(16).',
              tryThisNext: 'Compute 120 - 64 = 56 wristbands.',
              isFullyCorrect: false,
            };
          }
          return {
            whatWorked: 'You are substituting the optimal price p = 16 back into the model.',
            whatToWorkOn:
              'Calculate Quantity = 120 - 4(16) = 56, and Profit = 56 × (16 - 2).',
            tryThisNext: 'Check if 56 × 14 = 784.',
            isFullyCorrect: false,
          };
        },
      },
      {
        stepNumber: 4,
        totalSteps: 4,
        title: 'Step 4 of 4 · Cost Shock & Pass-Through Reasoning',
        prompt:
          'The supplier increases manufacturing cost from £2 to £3. Predict whether the club should raise the price by £1, more than £1, or less than £1, and justify mathematically.',
        contextSummary: 'New unit cost: c = £3. Demand curve remains q = 120 - 4p.',
        defaultAnswer:
          'The club should raise price by £0.50 (less than £1), because the pass-through rate for linear demand is 50%.',
        hints: [
          'Set up the new profit function: P_new = (120 - 4p)(p - 3) = -4p² + 132p - 360.',
          'Find the new vertex: p = -132 / (2 × -4) = 132 / 8 = 16.50.',
          'Comparing £16.50 to £16.00: the price increases by only £0.50, exactly half of the £1 cost increase!',
        ],
        sampleAnswers: [
          {
            label: 'Mathematical pass-through justification',
            answer:
              'Less than £1: the new optimal price is £16.50 (an increase of £0.50). For a linear demand curve, exactly 50% of a cost increase is passed to buyers.',
            feedback: {
              whatWorked:
                'Outstanding economic and mathematical reasoning! You showed that the new vertex is p = 16.50 and identified the 50% linear pass-through principle.',
              whatToWorkOn:
                'Exceptional synthesis. This is a university-level microeconomics insight solved with secondary school quadratic calculus.',
              tryThisNext:
                'You have completed all 4 steps of this scenario! Review your session summary below.',
              isFullyCorrect: true,
            },
          },
        ],
        evaluate: (input: string): StepFeedback => {
          const clean = input.toLowerCase();
          if (
            clean.includes('less') ||
            clean.includes('16.5') ||
            clean.includes('0.5') ||
            clean.includes('half') ||
            clean.includes('50%')
          ) {
            return {
              whatWorked:
                'Spot on! You recognized that price increases by £0.50 (to £16.50), which is strictly less than the £1 cost increase.',
              whatToWorkOn: 'Great mathematical justification.',
              tryThisNext: 'Review your session performance summary and practice concepts.',
              isFullyCorrect: true,
            };
          }
          if (clean.includes('1') && !clean.includes('less')) {
            return {
              whatWorked: 'Intuitive guess: passing the full £1 cost to buyers.',
              whatToWorkOn:
                'If the club raises the price by a full £1 to £17, demand drops by 4 bands, resulting in lower total profit than if they absorb half the cost.',
              tryThisNext:
                'Compute the vertex of P = (120 - 4p)(p - 3) = -4p² + 132p - 360 to see that p = 16.50.',
              isFullyCorrect: false,
            };
          }
          return {
            whatWorked: 'You are analyzing how price responds to a cost shock.',
            whatToWorkOn:
              'Calculate the new profit vertex with unit cost c = 3: p = 132 / 8 = £16.50.',
            tryThisNext:
              'Compare £16.50 with the original £16.00: the price rose by £0.50, which is less than £1.',
            isFullyCorrect: false,
          };
        },
      },
    ],
  },
  {
    id: 'simultaneous-lunch',
    title: 'The lunch receipts',
    topic: 'Simultaneous equations',
    curriculumLevel: 'GCSE / Year 10 / High School',
    tagline: 'Substitution and elimination with two unknowns',
    description:
      'Two students compare cafeteria receipts: two sandwiches and one juice cost £8, while one sandwich and three juices cost £9. Determine the price of each item using substitution.',
    contextStory:
      'Amara bought 2 sandwiches (s) and 1 juice (j) for £8. Her friend Kemi bought 1 sandwich and 3 juices for £9. We want to find the exact cost of each sandwich and each juice using substitution.',
    variables: [
      { symbol: 's', meaning: 'Price of one sandwich', unit: '£' },
      { symbol: 'j', meaning: 'Price of one juice', unit: '£' },
    ],
    strengthsTaught: [
      'Expressing one variable in terms of another from a linear equation',
      'Substituting the expression into the second equation to solve for one unknown',
      'Solving simultaneous linear systems via elimination and substitution',
    ],
    revisitConcepts: [
      'Checking solutions in both original equations',
      'Signs and bracket expansion during algebraic substitution',
    ],
    followUpQuestion:
      'If juice price increases by 50p, how much will 3 sandwiches and 2 juices cost?',
    steps: [
      {
        stepNumber: 1,
        totalSteps: 3,
        title: 'Step 1 of 3 · Isolate One Variable (Substitution)',
        prompt:
          'From the second receipt s + 3j = 9, express s in terms of j.',
        defaultAnswer: 's = 9 - 3j',
        hints: [
          'Subtract 3j from both sides of the equation s + 3j = 9.',
          'This isolates s on the left-hand side: s = 9 - 3j.',
          'You can now substitute this expression for s into the first equation 2s + j = 8.',
        ],
        sampleAnswers: [
          {
            label: 'Isolated variable',
            answer: 's = 9 - 3j',
            feedback: {
              whatWorked:
                'Spot on! You correctly isolated s by subtracting 3j from both sides.',
              whatToWorkOn: 'None. Clean algebraic manipulation.',
              tryThisNext: 'Substitute (9 - 3j) in place of s in 2s + j = 8.',
              isFullyCorrect: true,
            },
          },
        ],
        evaluate: (input: string) => {
          const clean = input.toLowerCase().replace(/\s+/g, '');
          if (clean.includes('s=9-3j') || clean.includes('s=-3j+9') || clean.includes('9-3j')) {
            return {
              whatWorked: 'Spot on! You isolated s = 9 - 3j correctly.',
              whatToWorkOn: 'No gaps found.',
              tryThisNext: 'Substitute into 2s + j = 8 in Step 2.',
              isFullyCorrect: true,
            };
          }
          return {
            whatWorked: 'Identifying the target variable.',
            whatToWorkOn: 'Subtract 3j from both sides of s + 3j = 9 to get s = 9 - 3j.',
            tryThisNext: 'Write s = 9 - 3j.',
            isFullyCorrect: false,
          };
        },
      },
      {
        stepNumber: 2,
        totalSteps: 3,
        title: 'Step 2 of 3 · Solve for Juice Price (j)',
        prompt:
          'Substitute s = 9 - 3j into 2s + j = 8 and solve for j.',
        defaultAnswer: 'j = 2',
        hints: [
          'Replace s with (9 - 3j): 2(9 - 3j) + j = 8.',
          'Expand: 18 - 6j + j = 8, which simplifies to 18 - 5j = 8.',
          'Subtract 18: -5j = -10, so j = 2.',
        ],
        sampleAnswers: [
          {
            label: 'Correct juice price',
            answer: 'j = 2',
            feedback: {
              whatWorked:
                'Excellent! Expanding 2(9 - 3j) + j = 8 yields 18 - 5j = 8, giving j = £2.',
              whatToWorkOn: 'None.',
              tryThisNext: 'Back-substitute j = 2 to find sandwich price s in Step 3.',
              isFullyCorrect: true,
            },
          },
        ],
        evaluate: (input: string) => {
          const clean = input.toLowerCase().replace(/\s+/g, '');
          if (clean.includes('j=2') || clean === '2' || clean.includes('£2')) {
            return {
              whatWorked: 'Correct! Each juice costs £2.',
              whatToWorkOn: 'None.',
              tryThisNext: 'Find sandwich cost s.',
              isFullyCorrect: true,
            };
          }
          return {
            whatWorked: 'Setting up the single-variable equation.',
            whatToWorkOn: 'Expand 2(9 - 3j) + j = 8 -> 18 - 5j = 8 -> 5j = 10 -> j = 2.',
            tryThisNext: 'Solve for j = 2.',
            isFullyCorrect: false,
          };
        },
      },
      {
        stepNumber: 3,
        totalSteps: 3,
        title: 'Step 3 of 3 · Back-Substitute for Sandwich Price (s)',
        prompt:
          'Use j = 2 in s = 9 - 3j to calculate the price of a sandwich.',
        defaultAnswer: 's = 3',
        hints: [
          'Calculate s = 9 - 3(2) = 9 - 6 = 3.',
          'Check both equations: 2(3) + 2 = 8 (true) and 3 + 3(2) = 9 (true).',
        ],
        sampleAnswers: [
          {
            label: 'Accurate sandwich price',
            answer: 's = 3',
            feedback: {
              whatWorked:
                'Spot on! s = 9 - 3(2) = 3. Sandwich is £3, juice is £2. Both equations verify perfectly.',
              whatToWorkOn: 'None. Complete simultaneous solution.',
              tryThisNext: 'All steps completed for this scenario.',
              isFullyCorrect: true,
            },
          },
        ],
        evaluate: (input: string) => {
          const clean = input.toLowerCase().replace(/\s+/g, '');
          if (clean.includes('s=3') || clean === '3' || clean.includes('£3')) {
            return {
              whatWorked: 'Accurate! Sandwich cost is £3.',
              whatToWorkOn: 'None.',
              tryThisNext: 'Review your session summary.',
              isFullyCorrect: true,
            };
          }
          return {
            whatWorked: 'Back-substituting into expression.',
            whatToWorkOn: 'Calculate s = 9 - 3(2) = 3.',
            tryThisNext: 'Write s = 3.',
            isFullyCorrect: false,
          };
        },
      },
    ],
  },
  {
    id: 'community-bakery',
    title: 'Community bakery production',
    topic: 'Simultaneous equations',
    curriculumLevel: 'GCSE / Year 10 / High School',
    tagline: 'Elimination and word problems with resource constraints',
    description:
      'A community artisan bakery makes Sourdough loaves and Brioche buns with finite organic flour and baker labour hours.',
    contextStory:
      'Every day, the bakery has 60 kg of flour and 24 hours of total baker bench time. Each Sourdough loaf takes 0.6 kg flour and 0.2 hours labour. Each Brioche batch takes 1.2 kg flour and 0.6 hours labour.',
    variables: [
      { symbol: 's', meaning: 'Number of sourdough loaves', unit: 'loaves' },
      { symbol: 'b', meaning: 'Number of brioche batches', unit: 'batches' },
    ],
    strengthsTaught: [
      'Translating verbal resource constraints into linear inequalities',
      'Solving simultaneous linear systems via elimination',
    ],
    revisitConcepts: [
      'Feasible region corner points',
      'Shadow pricing of bottleneck resources',
    ],
    followUpQuestion:
      'If the price of organic flour doubles, how should the bakery shift its product mix?',
    steps: [
      {
        stepNumber: 1,
        totalSteps: 3,
        title: 'Step 1 of 3 · System of Equations',
        prompt:
          'Write a pair of linear equations representing the total flour and total labour hours if all resources are fully utilized.',
        defaultAnswer: '0.6s + 1.2b = 60 and 0.2s + 0.6b = 24',
        hints: [
          'For flour: (flour per sourdough) × s + (flour per brioche) × b = 60.',
          'For labour: (labour per sourdough) × s + (labour per brioche) × b = 24.',
          'System: 0.6s + 1.2b = 60 and 0.2s + 0.6b = 24.',
        ],
        sampleAnswers: [
          {
            label: 'Exact system',
            answer: '0.6s + 1.2b = 60; 0.2s + 0.6b = 24',
            feedback: {
              whatWorked:
                'Both constraint equations accurately pair unit resource consumption with total availability.',
              whatToWorkOn: 'None.',
              tryThisNext: 'Solve the system simultaneously in Step 2.',
              isFullyCorrect: true,
            },
          },
        ],
        evaluate: (input: string) => {
          const clean = input.toLowerCase().replace(/\s+/g, '');
          if (clean.includes('0.6s+1.2b=60') || (clean.includes('60') && clean.includes('24'))) {
            return {
              whatWorked: 'Both resource equations formulated accurately.',
              whatToWorkOn: 'Sound algebraic reasoning.',
              tryThisNext: 'Proceed to Step 2 to solve for s and b.',
              isFullyCorrect: true,
            };
          }
          return {
            whatWorked: 'Constructing resource lines.',
            whatToWorkOn: 'Combine 0.6s + 1.2b = 60 with 0.2s + 0.6b = 24.',
            tryThisNext: 'Check coefficients for flour and labour.',
            isFullyCorrect: false,
          };
        },
      },
      {
        stepNumber: 2,
        totalSteps: 3,
        title: 'Step 2 of 3 · Full Utilization Batch Quantities',
        prompt:
          'Solve the simultaneous equations to find the exact number of sourdough loaves (s) and brioche batches (b) that use all flour and labour.',
        defaultAnswer: 's = 60 loaves, b = 20 batches',
        hints: [
          'Multiply the second equation by 2: 2(0.2s + 0.6b = 24) gives 0.4s + 1.2b = 48.',
          'Subtract from equation 1: (0.6s + 1.2b) - (0.4s + 1.2b) = 60 - 48, so 0.2s = 12, s = 60.',
          'Substitute s = 60 into equation 2: 0.2(60) + 0.6b = 24 => 12 + 0.6b = 24 => 0.6b = 12 => b = 20.',
        ],
        sampleAnswers: [
          {
            label: 'Solved values',
            answer: 's = 60, b = 20',
            feedback: {
              whatWorked:
                'Spot on elimination. Substituting s = 60 confirms both constraints are matched to the exact gram and minute.',
              whatToWorkOn: 'None.',
              tryThisNext: 'Proceed to Step 3 for revenue optimization.',
              isFullyCorrect: true,
            },
          },
        ],
        evaluate: (input: string) => {
          const clean = input.toLowerCase().replace(/\s+/g, '');
          if (clean.includes('s=60') || (clean.includes('60') && clean.includes('20'))) {
            return {
              whatWorked: 'Correct solution: s = 60 sourdough and b = 20 brioche batches.',
              whatToWorkOn: 'Flawless elimination.',
              tryThisNext: 'Step 3.',
              isFullyCorrect: true,
            };
          }
          return {
            whatWorked: 'Solving simultaneously.',
            whatToWorkOn: 'Eliminate b by multiplying the labour equation by 2, then subtracting.',
            tryThisNext: 'Check if s = 60 and b = 20.',
            isFullyCorrect: false,
          };
        },
      },
      {
        stepNumber: 3,
        totalSteps: 3,
        title: 'Step 3 of 3 · Revenue Calculation',
        prompt:
          'If sourdough sells for £4.50 per loaf and a brioche batch sells for £18, calculate the bakery’s daily gross revenue.',
        defaultAnswer: '£630',
        hints: [
          'Revenue = 4.50 × s + 18 × b.',
          'Substitute s = 60 and b = 20: 4.50(60) + 18(20) = £270 + £360 = £630.',
        ],
        sampleAnswers: [
          {
            label: 'Total revenue',
            answer: '£630',
            feedback: {
              whatWorked: 'Accurate arithmetic: 270 + 360 = £630 revenue.',
              whatToWorkOn: 'None.',
              tryThisNext: 'Review your session summary.',
              isFullyCorrect: true,
            },
          },
        ],
        evaluate: (input: string) => {
          const clean = input.toLowerCase().replace(/\s+/g, '');
          if (clean.includes('630')) {
            return {
              whatWorked: 'Spot on: £270 from sourdough + £360 from brioche = £630.',
              whatToWorkOn: 'None.',
              tryThisNext: 'Completed!',
              isFullyCorrect: true,
            };
          }
          return {
            whatWorked: 'Multiplying prices by quantities.',
            whatToWorkOn: 'Evaluate 4.50 × 60 + 18 × 20 = 270 + 360 = 630.',
            tryThisNext: 'Check total.',
            isFullyCorrect: false,
          };
        },
      },
    ],
  },
];
