import React, { useState } from 'react';
import { ListChecks, CheckCircle2 } from 'lucide-react';
import { scenarios } from '../data/scenarios.ts';
import { Scenario, StepFeedback } from '../types/index.ts';

interface SessionRunnerProps {
  initialScenarioId?: string;
  onClose: () => void;
  onOpenReport: () => void;
  onSelectAnotherScenario: () => void;
}

export const SessionRunner: React.FC<SessionRunnerProps> = ({
  initialScenarioId = 'fundraiser-stall',
  onClose,
  onOpenReport,
  onSelectAnotherScenario,
}) => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(initialScenarioId);
  const currentScenario: Scenario =
    scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [revealedHints, setRevealedHints] = useState<number>(1);
  const [userInput, setUserInput] = useState<string>('Profit = (120 - 4p)(p)');
  const [feedback, setFeedback] = useState<StepFeedback | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showContextStory, setShowContextStory] = useState<boolean>(true);

  const currentStep = currentScenario.steps[currentStepIndex];

  // Initialize or reset when step changes
  const handleCheckReasoning = () => {
    if (!userInput.trim()) return;
    const result = currentStep.evaluate(userInput);
    setFeedback(result);
  };

  const handleNextStep = () => {
    if (currentStepIndex < currentScenario.steps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      setUserInput(currentScenario.steps[nextIdx].defaultAnswer || '');
      setFeedback(null);
      setRevealedHints(0);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      setUserInput(currentScenario.steps[prevIdx].defaultAnswer || '');
      setFeedback(null);
      setRevealedHints(0);
    }
  };

  const handleRevealNextHint = () => {
    if (revealedHints < currentStep.hints.length) {
      setRevealedHints((prev) => prev + 1);
    }
  };

  const insertSymbol = (sym: string) => {
    setUserInput((prev) => prev + sym);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#17201D] pb-24">
      {/* Session Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#FAF8F4]/95 backdrop-blur-md border-b border-[#DDD8CC]">
        <div className="max-w-[1120px] mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="text-[#4A5551] hover:text-[#17201D] p-2 rounded-lg hover:bg-[#EDE9E0] transition-colors cursor-pointer flex items-center gap-1.5 text-sm"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span className="hidden sm:inline">Back to overview</span>
            </button>
            <div className="h-5 w-[1px] bg-[#DDD8CC]" />
            <div>
              <span className="font-headline text-[18px] font-semibold text-[#17201D]">
                {currentScenario.title}
              </span>
              <span className="text-xs text-[#4A5551] block hidden sm:inline sm:ml-2">
                ({currentScenario.curriculumLevel})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onSelectAnotherScenario}
              className="px-3.5 py-1.5 border border-[#DDD8CC] bg-white hover:bg-[#F4F1EA] text-[#17201D] rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              Change scenario
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#4A5551] hover:text-[#17201D] rounded-md hover:bg-[#EDE9E0]"
              title="Close session"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto px-6 pt-8">
        {/* Scenario Background / Context Drawer */}
        <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0E5A4B] text-[20px]">
                auto_stories
              </span>
              <h2 className="font-title text-[15px] font-semibold text-[#17201D]">
                Scenario Context: {currentScenario.tagline}
              </h2>
            </div>
            <button
              onClick={() => setShowContextStory(!showContextStory)}
              className="text-xs text-[#0E5A4B] hover:underline font-medium cursor-pointer"
            >
              {showContextStory ? 'Hide details' : 'Show context'}
            </button>
          </div>

          {showContextStory && (
            <div className="mt-3 pt-3 border-t border-[#DDD8CC]/50 text-sm text-[#4A5551] leading-relaxed">
              <p>{currentScenario.contextStory}</p>
              <div className="mt-3 flex flex-wrap gap-2 pt-2 border-t border-[#DDD8CC]/40">
                {currentScenario.variables.map((v, i) => (
                  <span
                    key={i}
                    className="text-xs bg-[#FAF8F4] border border-[#DDD8CC] px-2.5 py-1 rounded-md text-[#17201D]"
                  >
                    <strong className="font-headline italic text-[#0E5A4B]">{v.symbol}</strong>:{' '}
                    {v.meaning} {v.unit ? `(${v.unit})` : ''}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* COMPLETED VIEW */}
        {isCompleted ? (
          <div className="bg-white rounded-xl border border-[#DDD8CC] p-8 md:p-10 shadow-xs">
            <div className="max-w-[700px] mx-auto text-center">
              <div className="w-14 h-14 bg-[#DCEFE2] text-[#1E6B3A] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-[32px] font-bold">
                  verified
                </span>
              </div>
              <h2 className="font-headline text-[28px] font-semibold text-[#17201D]">
                Session complete: {currentScenario.title}
              </h2>
              <p className="font-body-sm text-[15px] text-[#4A5551] mt-2">
                You worked through all {currentScenario.steps.length} reasoning steps for this scenario.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {/* Strengths summary */}
              <div className="bg-[#DCEFE2]/50 border border-[#DCEFE2] rounded-xl p-6">
                <div className="flex items-center gap-2 text-[#1E6B3A] font-title text-[15px] font-semibold mb-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1E6B3A]" />
                  <span>Strengths demonstrated</span>
                </div>
                <ul className="space-y-2 text-sm text-[#17201D]">
                  {currentScenario.strengthsTaught.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#1E6B3A] font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What to practise next */}
              <div className="bg-[#F6E3BE]/40 border border-[#F6E3BE] rounded-xl p-6">
                <div className="flex items-center gap-2 text-[#8A5300] font-title text-[15px] font-semibold mb-1">
                  <ListChecks className="w-5 h-5 text-[#8A5300]" />
                  <span>Review what to practise</span>
                </div>
                <p className="text-xs text-[#4A5551] mb-3">
                  Finish with a concise summary of strengths and specific concepts to revisit in your next study session.
                </p>
                <ul className="space-y-2 text-sm text-[#17201D]">
                  {currentScenario.revisitConcepts.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#8A5300] font-bold">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Follow-up question in a new situation */}
            <div className="mt-8 bg-[#FAF8F4] border border-[#DDD8CC] rounded-xl p-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0E5A4B] block mb-1">
                Follow-up question in a new situation
              </span>
              <p className="font-body-lg text-[16px] text-[#17201D] leading-relaxed">
                {currentScenario.followUpQuestion}
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#DDD8CC]/60">
              <button
                onClick={() => {
                  setCurrentStepIndex(0);
                  setIsCompleted(false);
                  setFeedback(null);
                  setUserInput(currentScenario.steps[0].defaultAnswer || '');
                }}
                className="text-sm text-[#4A5551] hover:text-[#17201D] underline cursor-pointer"
              >
                Restart this scenario
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={onSelectAnotherScenario}
                  className="h-10 px-5 bg-white border border-[#DDD8CC] text-[#17201D] hover:bg-[#F4F1EA] text-sm font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Pick another scenario
                </button>
                <button
                  onClick={onClose}
                  className="h-10 px-5 bg-[#0E5A4B] hover:bg-[#0A4A3E] text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Return to home
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* STEP REASONING WORKSPACE */
          <div className="bg-white rounded-xl border border-[#DDD8CC] p-6 sm:p-8 shadow-xs">
            {/* Step header and hint status */}
            <div className="flex items-center justify-between pb-4 border-b border-[#DDD8CC]/60">
              <div className="flex items-center gap-2">
                <span className="font-label text-[14px] font-medium text-[#4A5551]">
                  {currentStep.title}
                </span>
                <span className="text-xs text-[#4A5551]/60">·</span>
                <span className="text-xs text-[#0E5A4B] font-medium">
                  Step {currentStepIndex + 1} of {currentScenario.steps.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-[#F6E3BE] text-[#8A5300] px-3 py-1 rounded-lg font-label text-[12px] font-medium">
                  {revealedHints > 0 ? `Hint used: ${revealedHints} of ${currentStep.hints.length}` : 'No hints used'}
                </span>
                {revealedHints < currentStep.hints.length && (
                  <button
                    onClick={handleRevealNextHint}
                    className="text-xs text-[#0E5A4B] hover:underline font-medium cursor-pointer"
                  >
                    + Reveal hint
                  </button>
                )}
              </div>
            </div>

            {/* Revealed Hints Box */}
            {revealedHints > 0 && (
              <div className="mt-4 p-4 bg-[#FAF8F4] border border-[#DDD8CC] rounded-lg space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8A5300] uppercase tracking-wide">
                  <span className="material-symbols-outlined text-[15px]">lightbulb</span>
                  <span>Progressive Guidance</span>
                </div>
                {currentStep.hints.slice(0, revealedHints).map((hint, idx) => (
                  <div key={idx} className="text-xs text-[#4A5551] leading-relaxed flex items-start gap-2">
                    <span className="font-semibold text-[#8A5300] shrink-0">Hint {idx + 1}:</span>
                    <span>{hint}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Step prompt */}
            <div className="mt-6">
              <h3 className="font-headline text-[20px] font-semibold text-[#17201D] leading-snug">
                {currentStep.prompt}
              </h3>
              {currentStep.contextSummary && (
                <p className="text-xs text-[#4A5551] mt-1.5 italic">
                  Note: {currentStep.contextSummary}
                </p>
              )}
            </div>

            {/* Student reasoning input */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-[#4A5551]">
                  Your mathematical formula or reasoning:
                </label>
                <span className="text-xs text-[#4A5551]/60">Supports algebraic notation</span>
              </div>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCheckReasoning();
                }}
                placeholder="Type your algebraic step or expression..."
                className="w-full p-4 bg-[#FAF8F4] border border-[#DDD8CC] focus:border-[#0E5A4B] rounded-lg font-headline text-[17px] text-[#17201D] tracking-wide focus:outline-none transition-colors"
              />

              {/* Math palette chips */}
              <div className="mt-2.5 flex items-center flex-wrap gap-1.5">
                <span className="text-[11px] text-[#4A5551] mr-1">Insert symbol:</span>
                {['p', 'q', '²', '³', '(', ')', '+', '-', '×', '/', '=', '£'].map((sym) => (
                  <button
                    key={sym}
                    type="button"
                    onClick={() => insertSymbol(sym)}
                    className="px-2.5 py-1 bg-white border border-[#DDD8CC] hover:bg-[#EDE9E0] text-[#17201D] text-xs font-medium rounded transition-colors cursor-pointer"
                  >
                    {sym}
                  </button>
                ))}
              </div>

              {/* Sample pre-fill options */}
              <div className="mt-3 pt-3 border-t border-[#DDD8CC]/40 flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-[#4A5551]">Test preset answer:</span>
                {currentStep.sampleAnswers.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setUserInput(sample.answer);
                      setFeedback(sample.feedback);
                    }}
                    className="text-xs px-2.5 py-1 bg-[#F4F1EA] hover:bg-[#EDE9E0] text-[#17201D] rounded transition-colors cursor-pointer border border-[#DDD8CC]/60"
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Check Button */}
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={handleCheckReasoning}
                className="h-11 px-6 bg-[#0E5A4B] hover:bg-[#0A4A3E] text-white font-body-sm text-[15px] font-medium rounded-lg flex items-center justify-center transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
              >
                Check my reasoning
              </button>
              {currentStepIndex > 0 && (
                <button
                  onClick={handlePreviousStep}
                  className="h-11 px-4 text-[#4A5551] hover:text-[#17201D] text-sm cursor-pointer"
                >
                  Previous step
                </button>
              )}
            </div>

            {/* EVALUATED FEEDBACK CARD */}
            {feedback && (
              <div className="mt-8 pt-6 border-t border-[#DDD8CC] space-y-4">
                {/* What worked */}
                <div className="bg-[#DCEFE2]/60 rounded-lg p-4 border border-[#DCEFE2]">
                  <div className="flex items-center gap-2 text-[#1E6B3A] font-title text-[14px] font-semibold">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span>What worked</span>
                  </div>
                  <p className="font-body-sm text-[14px] text-[#17201D] mt-1.5 leading-relaxed">
                    {feedback.whatWorked}
                  </p>
                </div>

                {/* What to work on */}
                <div className="bg-[#F6E3BE]/50 rounded-lg p-4 border border-[#F6E3BE]">
                  <div className="flex items-center gap-2 text-[#8A5300] font-title text-[14px] font-semibold">
                    <span className="material-symbols-outlined text-[16px]">info</span>
                    <span>What to work on</span>
                  </div>
                  <p className="font-body-sm text-[14px] text-[#17201D] mt-1.5 leading-relaxed">
                    {feedback.whatToWorkOn}
                  </p>
                </div>

                {/* Try this next */}
                <div className="bg-[#F4F1EA] rounded-lg p-4 border border-[#DDD8CC]/60">
                  <div className="flex items-center gap-2 text-[#0E5A4B] font-title text-[14px] font-semibold">
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    <span>Try this next</span>
                  </div>
                  <p className="font-body-sm text-[14px] text-[#17201D] mt-1.5 leading-relaxed">
                    {feedback.tryThisNext}
                  </p>
                </div>

                {/* Step navigation & report */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between text-[#4A5551] font-label text-[13px] gap-3 border-t border-[#DDD8CC]/60">
                  <span>Feedback is AI-generated and calibrated to your steps.</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={onOpenReport}
                      className="text-[#4A5551] hover:text-[#0E5A4B] hover:underline cursor-pointer"
                      type="button"
                    >
                      Report a problem
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="px-4 py-2 bg-[#0E5A4B] hover:bg-[#0A4A3E] text-white text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>
                        {currentStepIndex < currentScenario.steps.length - 1
                          ? 'Next Step'
                          : 'Complete Session'}
                      </span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
