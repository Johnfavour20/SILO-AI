import React, { useState } from 'react';
import { scenarios } from '../data/scenarios.ts';
import { StepFeedback } from '../types/index.ts';

interface FeedbackCloserLookProps {
  onReportProblem: () => void;
  onTryFullSession: () => void;
}

export const FeedbackCloserLookSection: React.FC<FeedbackCloserLookProps> = ({
  onReportProblem,
  onTryFullSession,
}) => {
  const stepOne = scenarios[0].steps[0];

  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);

  // Active answer text and feedback
  const activeAnswerText = isCustomMode
    ? customInput || 'Profit = ...'
    : stepOne.sampleAnswers[selectedPresetIndex].answer;

  const activeFeedback: StepFeedback = isCustomMode
    ? stepOne.evaluate(customInput)
    : stepOne.sampleAnswers[selectedPresetIndex].feedback;

  return (
    <section className="max-w-[1120px] mx-auto px-6 py-20" id="feedback-preview">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left column */}
        <div className="lg:col-span-4">
          <h2 className="font-headline text-[28px] font-semibold text-[#17201D] leading-tight">
            A closer look at feedback
          </h2>
          <p className="text-[#4A5551] text-[16px] leading-relaxed mt-4">
            Instead of simply marking answers right or wrong, Silo evaluates the logic inside your steps. You see exactly which assumptions were valid, where your calculation shifted, and the next algebraic step to try.
          </p>

          {/* Interactive Preset Buttons to explore how Silo reacts */}
          <div className="mt-8 pt-6 border-t border-[#DDD8CC]/60">
            <span className="font-label text-xs uppercase tracking-wider text-[#4A5551] font-semibold block mb-3">
              Test student reasoning variants:
            </span>
            <div className="space-y-2">
              {stepOne.sampleAnswers.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsCustomMode(false);
                    setSelectedPresetIndex(idx);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-[13px] transition-all cursor-pointer border flex items-center justify-between ${
                    !isCustomMode && selectedPresetIndex === idx
                      ? 'bg-[#EDE9E0] border-[#0E5A4B] text-[#17201D] font-medium shadow-xs'
                      : 'bg-white border-[#DDD8CC] text-[#4A5551] hover:border-[#0E5A4B]/40'
                  }`}
                >
                  <span className="truncate">{sample.label}</span>
                  {sample.feedback.isFullyCorrect ? (
                    <span className="material-symbols-outlined text-[16px] text-[#1E6B3A]">
                      check_circle
                    </span>
                  ) : (
                    <span className="material-symbols-outlined text-[16px] text-[#8A5300]">
                      help
                    </span>
                  )}
                </button>
              ))}

              <button
                onClick={() => {
                  setIsCustomMode(true);
                  if (!customInput) setCustomInput('Profit = (120 - 4p)(p - 2)');
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-[13px] transition-all cursor-pointer border flex items-center justify-between ${
                  isCustomMode
                    ? 'bg-[#EDE9E0] border-[#0E5A4B] text-[#17201D] font-medium'
                    : 'bg-white border-[#DDD8CC] text-[#4A5551] hover:border-[#0E5A4B]/40'
                }`}
              >
                <span>Write your own expression</span>
                <span className="material-symbols-outlined text-[16px] text-[#0E5A4B]">
                  edit
                </span>
              </button>
            </div>

            <div className="mt-6">
              <button
                onClick={onTryFullSession}
                className="w-full h-10 bg-[#0E5A4B] hover:bg-[#0A4A3E] text-white rounded-lg text-[14px] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Solve the entire 4-step scenario</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right column: High-fidelity feedback card (matches screenshot 1:1) */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-xl p-8 border border-[#DDD8CC] shadow-xs">
            {/* Top Header */}
            <div className="flex items-center justify-between pb-3">
              <span className="font-label text-[14px] font-medium text-[#4A5551]">
                The fundraiser stall · Step 1 of 4
              </span>
              <span className="bg-[#F6E3BE] text-[#8A5300] px-3 py-1 rounded-lg font-label text-[13px] font-medium">
                Hint used: 1 of 3
              </span>
            </div>

            {/* Question & Submitted Answer */}
            <div className="mt-4">
              <h3 className="font-headline text-[18px] font-semibold text-[#17201D]">
                Write an expression for the club's profit in terms of p.
              </h3>

              {isCustomMode ? (
                <div className="mt-3">
                  <input
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="e.g. Profit = (120 - 4p)(p - 2)"
                    className="w-full p-4 bg-[#FAF8F4] border border-[#0E5A4B] rounded-lg font-headline text-[16px] text-[#17201D] focus:outline-none"
                  />
                  <div className="flex gap-2 mt-2">
                    {['(120 - 4p)', '(p - 2)', 'p²', '-4p²', '128p', '-240'].map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => setCustomInput((prev) => prev + chip)}
                        className="px-2 py-1 bg-[#F4F1EA] text-[#17201D] text-xs rounded hover:bg-[#EDE9E0] transition-colors"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-3 p-4 bg-[#FAF8F4] border border-[#DDD8CC]/60 rounded-lg font-headline text-[16px] text-[#17201D] tracking-wide">
                  {activeAnswerText}
                </div>
              )}
            </div>

            {/* Feedback Breakdown */}
            <div className="mt-6 space-y-4">
              {/* What worked */}
              <div className="bg-[#DCEFE2]/60 rounded-lg p-4 border border-[#DCEFE2]">
                <div className="flex items-center gap-2 text-[#1E6B3A] font-title text-[14px] font-semibold">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>What worked</span>
                </div>
                <p className="font-body-sm text-[14px] text-[#17201D] mt-1.5 leading-relaxed">
                  {activeFeedback.whatWorked}
                </p>
              </div>

              {/* What to work on */}
              <div className="bg-[#F6E3BE]/50 rounded-lg p-4 border border-[#F6E3BE]">
                <div className="flex items-center gap-2 text-[#8A5300] font-title text-[14px] font-semibold">
                  <span className="material-symbols-outlined text-[16px]">info</span>
                  <span>What to work on</span>
                </div>
                <p className="font-body-sm text-[14px] text-[#17201D] mt-1.5 leading-relaxed">
                  {activeFeedback.whatToWorkOn}
                </p>
              </div>

              {/* Try this next */}
              <div className="bg-[#F4F1EA] rounded-lg p-4 border border-[#DDD8CC]/60">
                <div className="flex items-center gap-2 text-[#0E5A4B] font-title text-[14px] font-semibold">
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  <span>Try this next</span>
                </div>
                <p className="font-body-sm text-[14px] text-[#17201D] mt-1.5 leading-relaxed">
                  {activeFeedback.tryThisNext}
                </p>
              </div>
            </div>

            {/* Bottom quiet footer */}
            <div className="mt-6 pt-4 flex flex-col sm:flex-row sm:items-center justify-between text-[#4A5551] font-label text-[13px] gap-2 border-t border-[#DDD8CC]/60">
              <span>Feedback is AI-generated and may contain errors.</span>
              <button
                onClick={onReportProblem}
                className="text-[#4A5551] hover:text-[#0E5A4B] hover:underline text-left transition-colors cursor-pointer"
                type="button"
              >
                Report a problem
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
