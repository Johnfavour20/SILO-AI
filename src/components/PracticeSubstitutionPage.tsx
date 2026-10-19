import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  RotateCw,
  Info,
  ChevronRight,
  BookOpen,
  User,
  Sparkles,
  Search,
} from 'lucide-react';

interface PracticeSubstitutionPageProps {
  onBackToTopic: () => void;
  onOpenQuestion?: (questionId: number) => void;
  onGoToOverview?: () => void;
}

interface QuestionItem {
  id: number;
  numberLabel: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'solved' | 'needed_solution' | 'not_tried';
  statusLabel?: string;
  eq1: string;
  eq2?: string;
  isWordProblem?: boolean;
  wordProblemText?: string;
  notes?: string;
  actionType: 'open' | 'similar';
}

export const PracticeSubstitutionPage: React.FC<PracticeSubstitutionPageProps> = ({
  onBackToTopic,
  onOpenQuestion,
  onGoToOverview,
}) => {
  const [activeTab, setActiveTab] = useState<'substitution' | 'elimination' | 'word_problems'>('substitution');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  const [questions, setQuestions] = useState<QuestionItem[]>([
    {
      id: 1,
      numberLabel: 'Question 1',
      difficulty: 'Easy',
      status: 'solved',
      statusLabel: 'Solved',
      eq1: 'x + y = 10',
      eq2: 'y = 2x + 1',
      notes: 'No hints used',
      actionType: 'open',
    },
    {
      id: 2,
      numberLabel: 'Question 2',
      difficulty: 'Easy',
      status: 'solved',
      statusLabel: 'Solved',
      eq1: 'y = 3x - 2',
      eq2: '2x + y = 13',
      notes: '1 hint used',
      actionType: 'open',
    },
    {
      id: 3,
      numberLabel: 'Question 3',
      difficulty: 'Medium',
      status: 'needed_solution',
      statusLabel: 'Needed the full solution',
      eq1: 'x = 4 - y',
      eq2: '3x + 2y = 9',
      notes: '3 hints used. A similar question is ready.',
      actionType: 'similar',
    },
    {
      id: 4,
      numberLabel: 'Question 4',
      difficulty: 'Medium',
      status: 'not_tried',
      statusLabel: 'Not tried',
      eq1: '2x + y = 11',
      eq2: '3x - 2y = 6',
      actionType: 'open',
    },
    {
      id: 5,
      numberLabel: 'Question 5',
      difficulty: 'Medium',
      status: 'not_tried',
      statusLabel: 'Not tried',
      eq1: '',
      isWordProblem: true,
      wordProblemText:
        '2 adult tickets and 3 child tickets cost $23. 1 adult ticket and 2 child tickets cost $13. Find the price of each ticket.',
      actionType: 'open',
    },
    {
      id: 6,
      numberLabel: 'Question 6',
      difficulty: 'Hard',
      status: 'not_tried',
      statusLabel: 'Not tried',
      eq1: '3x - 2y = 4',
      eq2: '2x + 5y = 9',
      actionType: 'open',
    },
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleGetNewQuestion = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const newId = questions.length + 1;
      const newQ: QuestionItem = {
        id: newId,
        numberLabel: `Question ${newId}`,
        difficulty: 'Medium',
        status: 'not_tried',
        statusLabel: 'Not tried',
        eq1: '4x + y = 18',
        eq2: '2x + 3y = 14',
        actionType: 'open',
      };
      setQuestions((prev) => [newQ, ...prev]);
    }, 400);
  };

  const filteredQuestions = questions.filter((q) => {
    if (difficultyFilter === 'all') return true;
    return q.difficulty.toLowerCase() === difficultyFilter;
  });

  return (
    <div className="bg-[#FAF8F4] font-sans text-[#17201D] antialiased min-h-screen flex flex-col selection:bg-[#DCEBE6] selection:text-[#004135]">
      {/* Fixed Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#FAF8F4] border-b border-[#DDD8CC]">
        <div className="h-16 max-w-[1120px] mx-auto px-6 sm:px-12 flex items-center justify-between">
          {/* Logo brand */}
          <button
            type="button"
            onClick={onGoToOverview || onBackToTopic}
            className="font-serif text-[20px] font-semibold text-[#17201D] tracking-tight hover:opacity-85 cursor-pointer"
          >
            Silo
          </button>

          {/* Right actions */}
          <nav className="flex items-center gap-6">
            <button
              type="button"
              onClick={onBackToTopic}
              className="group inline-flex items-center gap-2 text-[#4A5551] hover:text-[#17201D] transition-colors text-[14px] font-medium cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#4A5551] group-hover:text-[#17201D] transition-transform group-hover:-translate-x-0.5" />
              <span>Back to topic</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#004135] flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full pt-16 bg-[#FAF8F4] flex-1">
        <div className="max-w-[1120px] mx-auto py-10 sm:py-12 px-6 sm:px-12">
          <div className="flex flex-col w-full">
            {/* Page Header */}
            <header className="w-full mb-8">
              <h1 className="font-serif text-[32px] font-semibold text-[#17201D] tracking-[-0.01em] leading-tight">
                Practice: Substitution
              </h1>
              <p className="text-[16px] text-[#4A5551] mt-2 leading-relaxed">
                Work through these on your own. If you get stuck, open a question and choose I'm stuck.
              </p>
            </header>

            {/* Concept Tabs */}
            <div className="w-full mb-8 border-b border-[#DDD8CC]">
              <nav aria-label="Concept tabs" className="flex items-center gap-8 -mb-[1px]">
                <button
                  type="button"
                  onClick={() => setActiveTab('substitution')}
                  className={`text-[15px] font-semibold pb-3 border-b-2 tracking-normal focus:outline-none transition-colors cursor-pointer ${
                    activeTab === 'substitution'
                      ? 'text-[#0E5A4B] border-[#0E5A4B]'
                      : 'text-[#4A5551] border-transparent hover:text-[#17201D]'
                  }`}
                >
                  Substitution
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('elimination')}
                  className={`text-[15px] font-medium pb-3 border-b-2 tracking-normal focus:outline-none transition-colors cursor-pointer ${
                    activeTab === 'elimination'
                      ? 'text-[#0E5A4B] border-[#0E5A4B]'
                      : 'text-[#4A5551] border-transparent hover:text-[#17201D]'
                  }`}
                >
                  Elimination
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('word_problems')}
                  className={`text-[15px] font-medium pb-3 border-b-2 tracking-normal focus:outline-none transition-colors cursor-pointer ${
                    activeTab === 'word_problems'
                      ? 'text-[#0E5A4B] border-[#0E5A4B]'
                      : 'text-[#4A5551] border-transparent hover:text-[#17201D]'
                  }`}
                >
                  Word problems
                </button>
              </nav>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column (8 cols desktop) */}
              <section aria-label="Practice questions" className="lg:col-span-8 flex flex-col w-full">
                {/* Filter Row */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-5">
                  {/* Filter Chips */}
                  <div aria-label="Filter difficulty" className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0" role="group">
                    {(['all', 'easy', 'medium', 'hard'] as const).map((diff) => {
                      const isActive = difficultyFilter === diff;
                      return (
                        <button
                          key={diff}
                          type="button"
                          onClick={() => setDifficultyFilter(diff)}
                          className={`inline-flex items-center justify-center h-[32px] px-[14px] text-[14px] font-medium rounded-[8px] focus:outline-none transition-colors shrink-0 capitalize cursor-pointer ${
                            isActive
                              ? 'bg-[#DCEBE6] text-[#0E5A4B] border border-[#0E5A4B]'
                              : 'bg-white text-[#4A5551] border border-[#DDD8CC] hover:bg-[#F4F1EA]'
                          }`}
                        >
                          {diff}
                        </button>
                      );
                    })}
                  </div>

                  {/* Refresh Button */}
                  <button
                    type="button"
                    onClick={handleGetNewQuestion}
                    disabled={isRefreshing}
                    className="inline-flex items-center justify-center gap-2 h-[40px] px-4 text-[14px] font-medium rounded-[8px] bg-[#0E5A4B] text-white hover:bg-[#0a4338] hover:-translate-y-[2px] transition-all focus:outline-none shrink-0 cursor-pointer shadow-xs active:translate-y-0"
                  >
                    <RotateCw className={`w-4 h-4 text-white stroke-[1.5] ${isRefreshing ? 'animate-spin' : ''}`} />
                    <span>Get a new question</span>
                  </button>
                </div>

                {/* Question Cards Stack */}
                <div className="flex flex-col gap-4">
                  {filteredQuestions.map((q) => (
                    <article
                      key={q.id}
                      className="bg-white border border-[#DDD8CC] rounded-[12px] p-5 sm:p-6 hover:-translate-y-[2px] transition-all flex flex-col shadow-xs"
                    >
                      {/* Top status bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2.5">
                          <span className="text-[13px] font-semibold text-[#7D8883] tracking-wide">
                            {q.numberLabel}
                          </span>
                          <span
                            className={`inline-flex items-center rounded-[8px] px-[10px] py-[4px] text-[12px] font-semibold ${
                              q.difficulty === 'Easy'
                                ? 'bg-[#DCEFE2] text-[#1E4620]'
                                : q.difficulty === 'Medium'
                                ? 'bg-[#F6E3BE] text-[#854D0E]'
                                : 'bg-[#DCEBE6] text-[#0E5A4B]'
                            }`}
                          >
                            {q.difficulty}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          {q.status === 'solved' && (
                            <span className="inline-flex items-center gap-1.5 rounded-[8px] px-[10px] py-[4px] text-[12px] font-semibold bg-[#DCEFE2] text-[#1E4620]">
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                              <span>Solved</span>
                            </span>
                          )}

                          {q.status === 'needed_solution' && (
                            <span className="inline-flex items-center gap-1.5 rounded-[8px] px-[10px] py-[4px] text-[12px] font-semibold bg-[#F6E3BE] text-[#854D0E]">
                              <Info className="w-3.5 h-3.5 stroke-[2]" />
                              <span>Needed the full solution</span>
                            </span>
                          )}

                          {q.status === 'not_tried' && (
                            <span className="inline-flex items-center rounded-[8px] px-[10px] py-[4px] text-[12px] font-semibold bg-[#F4F1EA] text-[#4A5551] border border-[#DDD8CC]">
                              Not tried
                            </span>
                          )}

                          {q.actionType === 'similar' ? (
                            <button
                              type="button"
                              onClick={() => onOpenQuestion && onOpenQuestion(q.id)}
                              className="inline-flex items-center justify-center h-[36px] px-[14px] text-[13px] font-semibold rounded-[8px] bg-[#F4F1EA] text-[#0E5A4B] border border-[#DDD8CC] hover:bg-[#DCEBE6] transition-colors focus:outline-none cursor-pointer"
                            >
                              Try the similar question
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => onOpenQuestion && onOpenQuestion(q.id)}
                              className="inline-flex items-center justify-center h-[36px] px-[18px] text-[13px] font-semibold rounded-[8px] bg-white text-[#17201D] border border-[#DDD8CC] hover:bg-[#F4F1EA] transition-colors focus:outline-none cursor-pointer"
                            >
                              Open
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Mathematical problem display */}
                      <div className="py-1">
                        {q.isWordProblem ? (
                          <p className="font-serif text-[16px] text-[#17201D] leading-[1.6]">
                            {q.wordProblemText}
                          </p>
                        ) : (
                          <>
                            <p className="font-serif italic text-[18px] text-[#17201D] tracking-normal leading-relaxed">
                              {q.eq1.split(' ').map((token, i) => {
                                if (token.includes('x')) {
                                  return (
                                    <span key={i}>
                                      <span className="text-[#0E5A4B] font-semibold">
                                        {token}
                                      </span>{' '}
                                    </span>
                                  );
                                }
                                if (token.includes('y')) {
                                  return (
                                    <span key={i}>
                                      <span className="text-[#B45309] font-semibold">
                                        {token}
                                      </span>{' '}
                                    </span>
                                  );
                                }
                                return <span key={i}>{token} </span>;
                              })}
                            </p>
                            {q.eq2 && (
                              <p className="font-serif italic text-[18px] text-[#17201D] tracking-normal leading-relaxed mt-1">
                                {q.eq2.split(' ').map((token, i) => {
                                  if (token.includes('x')) {
                                    return (
                                      <span key={i}>
                                        <span className="text-[#0E5A4B] font-semibold">
                                          {token}
                                        </span>{' '}
                                      </span>
                                    );
                                  }
                                  if (token.includes('y')) {
                                    return (
                                      <span key={i}>
                                        <span className="text-[#B45309] font-semibold">
                                          {token}
                                        </span>{' '}
                                      </span>
                                    );
                                  }
                                  return <span key={i}>{token} </span>;
                                })}
                              </p>
                            )}
                          </>
                        )}
                      </div>

                      {/* Bottom notes line if present */}
                      {q.notes && (
                        <div className="mt-3 pt-[10px] border-t border-[#F4F1EA] flex items-center justify-between text-[13px] text-[#7D8883]">
                          <span>{q.notes}</span>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>

              {/* Right Column (4 cols desktop) */}
              <aside className="lg:col-span-4 flex flex-col gap-5 w-full">
                {/* Card: Your practice here */}
                <div className="bg-white border border-[#DDD8CC] rounded-[12px] p-6 flex flex-col shadow-xs">
                  <h2 className="font-serif text-[18px] font-semibold text-[#17201D] mb-4">
                    Your practice here
                  </h2>
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between text-[15px]">
                      <span className="text-[#4A5551]">Questions tried</span>
                      <span className="font-semibold text-[#17201D] font-mono">
                        3 of 12
                      </span>
                    </div>
                    <div className="w-full h-[1px] bg-[#F4F1EA] my-3" />
                    <div className="flex items-center justify-between text-[15px]">
                      <span className="text-[#4A5551] pr-2">
                        Solved without the full solution
                      </span>
                      <span className="font-semibold text-[#17201D] shrink-0 font-mono">
                        2
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card: If you get stuck */}
                <div className="bg-white border border-[#DDD8CC] rounded-[12px] p-6 flex flex-col shadow-xs">
                  <h2 className="font-serif text-[18px] font-semibold text-[#17201D] mb-5">
                    If you get stuck
                  </h2>

                  {/* Vertical Timeline Steps */}
                  <div className="relative flex flex-col pl-1">
                    {/* Step 1 */}
                    <div className="relative flex items-start gap-3.5 pb-6">
                      <div className="absolute left-[11px] top-[24px] bottom-0 w-[1.5px] bg-[#DDD8CC]" />
                      <div className="relative z-10 flex items-center justify-center w-[24px] h-[24px] rounded-full bg-[#F4F1EA] text-[#17201D] text-[12px] font-semibold shrink-0">
                        1
                      </div>
                      <div className="flex flex-col pt-0.5">
                        <h3 className="text-[14px] font-semibold text-[#17201D] leading-tight">
                          Try it yourself
                        </h3>
                        <p className="text-[13px] text-[#4A5551] mt-1 leading-normal">
                          Work through the algebra on paper or in the text area.
                        </p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative flex items-start gap-3.5 pb-6">
                      <div className="absolute left-[11px] top-[24px] bottom-0 w-[1.5px] bg-[#DDD8CC]" />
                      <div className="relative z-10 flex items-center justify-center w-[24px] h-[24px] rounded-full bg-[#F4F1EA] text-[#17201D] text-[12px] font-semibold shrink-0">
                        2
                      </div>
                      <div className="flex flex-col pt-0.5">
                        <h3 className="text-[14px] font-semibold text-[#17201D] leading-tight">
                          Get a hint
                        </h3>
                        <p className="text-[13px] text-[#4A5551] mt-1 leading-normal">
                          Three progressive hints help nudge your next step.
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative flex items-start gap-3.5 pb-6">
                      <div className="absolute left-[11px] top-[24px] bottom-0 w-[1.5px] bg-[#DDD8CC]" />
                      <div className="relative z-10 flex items-center justify-center w-[24px] h-[24px] rounded-full bg-[#F4F1EA] text-[#17201D] text-[12px] font-semibold shrink-0">
                        3
                      </div>
                      <div className="flex flex-col pt-0.5">
                        <h3 className="text-[14px] font-semibold text-[#17201D] leading-tight">
                          See the first step
                        </h3>
                        <p className="text-[13px] text-[#4A5551] mt-1 leading-normal">
                          Reveal the initial substitution line and take it from there.
                        </p>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="relative flex items-start gap-3.5">
                      <div className="relative z-10 flex items-center justify-center w-[24px] h-[24px] rounded-full bg-[#F4F1EA] text-[#17201D] text-[12px] font-semibold shrink-0">
                        4
                      </div>
                      <div className="flex flex-col pt-0.5">
                        <h3 className="text-[14px] font-semibold text-[#17201D] leading-tight">
                          Solve it together
                        </h3>
                        <p className="text-[13px] text-[#4A5551] mt-1 leading-normal">
                          We work through it with you, then give you a similar question.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
