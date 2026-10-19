import React, { useEffect, useState } from 'react';
import { AlertCircle, ArrowLeft, Check, ChevronRight } from 'lucide-react';

export type LessonCompleteVariant =
  | 'default'
  | 'rating-chosen'
  | 'rating-sent'
  | 'preparing'
  | 'error'
  | 'no-hints'
  | 'lesson-not-finished'
  | 'mobile';

interface LessonCompletePageProps {
  onBackToDashboard: () => void;
  onStartPractice: () => void;
  onStartLesson3: () => void;
  variant?: LessonCompleteVariant;
}

export const LessonCompletePage: React.FC<LessonCompletePageProps> = ({
  onBackToDashboard,
  onStartPractice,
  onStartLesson3,
  variant = 'default',
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [activeVariant, setActiveVariant] = useState<LessonCompleteVariant>(variant);

  useEffect(() => {
    setActiveVariant(variant);
  }, [variant]);

  const isMobile = activeVariant === 'mobile';
  const isPreparing = activeVariant === 'preparing';
  const isError = activeVariant === 'error';
  const isNoHints = activeVariant === 'no-hints';
  const isLessonNotFinished = activeVariant === 'lesson-not-finished';
  const activeRating = activeVariant === 'rating-chosen' ? 4 : rating;
  const hintsUsed = isNoHints ? 0 : 2;
  const chipLabel = isLessonNotFinished ? 'Lesson not finished' : 'Lesson complete';
  const chipClasses = isLessonNotFinished
    ? 'bg-[#F4F1EA] text-[#141d1a] border border-[#DDD8CC]'
    : 'bg-[#DCEFE2] text-[#004135]';

  const skeletonClass = 'animate-pulse bg-[#EDE9E0] rounded-[12px]';

  const renderSkeletonMetricCard = (key: string) => (
    <div key={key} className={`${skeletonClass} h-[110px]`} />
  );

  const renderFeedbackCard = () => {
    if (activeVariant === 'rating-sent') {
      return (
        <div className="bg-[#DCEFE2] border border-[#1E6B3A]/20 rounded-[12px] p-5 flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-[#1E6B3A] flex items-center justify-center shrink-0 mt-0.5">
            <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <p className="text-[16px] text-[#002019] leading-relaxed">
            Thanks. Your feedback was saved with this session.
          </p>
        </div>
      );
    }

    if (activeVariant === 'error') {
      return (
        <div className="bg-[#F9DEDC] border border-[#B3261E]/40 rounded-[12px] p-5 flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#FCE8E6] flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle className="w-4 h-4 text-[#B3261E]" strokeWidth={2.5} />
            </div>
            <p className="text-[16px] text-[#410E0B] leading-relaxed">
              We could not prepare your summary. Your answers are saved.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="h-11 px-5 rounded-[8px] bg-[#004135] text-white text-[13px] font-medium hover:bg-[#0A4A3E] transition-colors cursor-pointer"
            >
              Try again
            </button>
            <button
              type="button"
              onClick={onBackToDashboard}
              className="text-[13px] text-[#004135] hover:underline font-medium cursor-pointer"
            >
              Back to dashboard
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-[12px] p-6" style={{ boxShadow: '0 0 0 1px #DDD8CC' }}>
        <h2 className="font-serif text-[20px] font-semibold text-[#141d1a] mb-4">
          Was this summary useful?
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <span className="text-[14px] text-[#4A5551] order-1 sm:order-none">Not useful</span>

          <div aria-label="Summary rating" className="flex items-center gap-2 order-2 sm:order-none" role="group">
            {[1, 2, 3, 4, 5].map((value) => {
              const isSelected = activeRating === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className={`w-11 h-11 rounded-[8px] text-[16px] font-medium transition-all duration-150 focus:outline-none cursor-pointer ${
                    isSelected
                      ? 'bg-[#DCEBE6] text-[#004135] border border-[#004135]/60'
                      : 'bg-white text-[#141d1a] hover:bg-[#FAF8F4] border border-[#DDD8CC]'
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>

          <span className="text-[14px] text-[#4A5551] order-3 sm:order-none">Very useful</span>
        </div>

        <form
          className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            aria-label="Feedback comments"
            type="text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Tell us what was confusing"
            className="h-11 flex-1 bg-white text-[#141d1a] rounded-[8px] px-3 text-[14px] outline-none focus:outline-none"
            style={{ boxShadow: '0 0 0 1px #7D8883' }}
          />
          <button
            type="submit"
            className={`h-11 px-5 rounded-[8px] text-[13px] font-medium transition-colors duration-150 shrink-0 cursor-pointer ${
              activeRating
                ? 'bg-[#004135] text-white hover:bg-[#0A4A3E]'
                : 'bg-[#EDE9E0] text-[#4A5551] cursor-not-allowed'
            }`}
            disabled={!activeRating}
          >
            Send
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#141d1a] font-sans antialiased">
      <header className="fixed top-0 left-0 w-full z-50 bg-[#FAF8F4] border-b border-[#DDD8CC]">
        <div className="h-16 max-w-[1120px] mx-auto px-4 md:px-12 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="font-serif text-[20px] font-semibold text-[#004135] tracking-tight">
              Silo
            </span>
          </button>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onBackToDashboard}
              className="inline-flex items-center gap-1.5 text-[#3F4945] hover:text-[#004135] transition-colors text-sm font-medium cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to dashboard</span>
            </button>

            <div className="w-8 h-8 rounded-full bg-[#004135] flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[18px] text-white">person</span>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full pt-16 bg-[#FAF8F4]">
        <div className="max-w-[1120px] mx-auto px-4 md:px-12 py-8">
          <div className="w-full max-w-[1120px] mx-auto py-8 sm:py-12 px-0 sm:px-2">
            {isPreparing && (
              <div className="mb-6">
                <div className="flex flex-col gap-2 ml-1">
                  <div className="text-[12px] text-[#4A5551]">Looking at your answers</div>
                  <div className="text-[12px] text-[#004135] font-medium">Writing the summary</div>
                  <div className="text-[12px] text-[#4A5551]">Checking it</div>
                </div>
              </div>
            )}

            <section className="flex flex-col items-start mb-8">
              <div className={`inline-flex items-center gap-1.5 rounded-[8px] px-3 py-1.5 text-[13px] font-medium ${chipClasses}`}>
                {!isLessonNotFinished && !isPreparing && !isError && (
                  <Check className="w-4 h-4 text-[#004135] shrink-0" strokeWidth={2.5} />
                )}
                {isError && <AlertCircle className="w-4 h-4 text-[#B3261E] shrink-0" strokeWidth={2.5} />}
                <span>{chipLabel}</span>
              </div>
              <h1 className="font-serif text-[40px] leading-[1.15] tracking-[-0.01em] text-[#141d1a] mt-3 mb-1">
                Substitution
              </h1>
              <p className="text-[16px] text-[#4A5551]">
                Simultaneous equations, lesson 2 of 4
              </p>
            </section>

            {isPreparing ? (
              <section className="mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {renderSkeletonMetricCard('time')}
                  {renderSkeletonMetricCard('questions')}
                  {renderSkeletonMetricCard('hints')}
                </div>
                <div className="mt-3 h-4 w-72 rounded-full animate-pulse bg-[#EDE9E0]" />
              </section>
            ) : (
              <section className="mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-[12px] p-5 shadow-sm" style={{ boxShadow: '0 0 0 1px #DDD8CC' }}>
                    <span className="block text-[14px] text-[#4A5551]">Time</span>
                    <span className="block font-serif text-[28px] font-semibold text-[#141d1a] mt-1">
                      14 min
                    </span>
                  </div>

                  <div className="bg-white rounded-[12px] p-5 shadow-sm" style={{ boxShadow: '0 0 0 1px #DDD8CC' }}>
                    <span className="block text-[14px] text-[#4A5551]">Questions</span>
                    <span className="block font-serif text-[28px] font-semibold text-[#141d1a] mt-1">
                      2
                    </span>
                  </div>

                  <div className="bg-white rounded-[12px] p-5 shadow-sm" style={{ boxShadow: '0 0 0 1px #DDD8CC' }}>
                    <span className="block text-[14px] text-[#4A5551]">Hints used</span>
                    <span className="block font-serif text-[28px] font-semibold text-[#141d1a] mt-1">
                      {hintsUsed}
                    </span>
                  </div>
                </div>

                <p className="text-[14px] text-[#4A5551] mt-3">
                  {isNoHints
                    ? 'Based on 2 questions. This is an early estimate, not a grade.'
                    : 'Based on your answers in this session. This is an early estimate, not a grade.'}
                </p>
              </section>
            )}

            <section className={`grid grid-cols-1 lg:grid-cols-12 gap-6 items-start ${isMobile ? 'max-w-[360px] mx-auto' : ''}`}>
              <div className={`flex flex-col gap-4 ${isMobile ? 'lg:col-span-12 w-full' : 'lg:col-span-7'}`}>
                {isPreparing ? (
                  <>
                    <div className={`${skeletonClass} h-[220px]`} />
                    <div className={`${skeletonClass} h-[180px]`} />
                  </>
                ) : (
                  <>
                    <article className="bg-white rounded-[12px] p-6" style={{ boxShadow: '0 0 0 1px #DDD8CC' }}>
                      <h2 className="font-serif text-[20px] font-semibold text-[#141d1a] mb-4">
                        What went well
                      </h2>

                      <div className="flex flex-col gap-3">
                        {isNoHints ? (
                          <>
                            <div className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-[#DCEFE2] flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3.5 h-3.5 text-[#004135]" strokeWidth={2.5} />
                              </div>
                              <p className="text-[16px] text-[#141d1a]">You selected the right substitution step in both questions.</p>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-[#DCEFE2] flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3.5 h-3.5 text-[#004135]" strokeWidth={2.5} />
                              </div>
                              <p className="text-[16px] text-[#141d1a]">You kept your algebra organised and worked steadily.</p>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-[#DCEFE2] flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3.5 h-3.5 text-[#004135]" strokeWidth={2.5} />
                              </div>
                              <p className="text-[16px] text-[#141d1a]">You solved the final question correctly without needing extra support.</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-[#DCEFE2] flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3.5 h-3.5 text-[#004135]" strokeWidth={2.5} />
                              </div>
                              <p className="text-[16px] text-[#141d1a]">
                                You chose the right substitution on both questions.
                              </p>
                            </div>

                            <div className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-[#DCEFE2] flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3.5 h-3.5 text-[#004135]" strokeWidth={2.5} />
                              </div>
                              <p className="text-[16px] text-[#141d1a]">
                                You solved the pens and notebooks problem on your first try.
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </article>

                    <article className="bg-white rounded-[12px] p-6" style={{ boxShadow: '0 0 0 1px #DDD8CC' }}>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-7 h-7 rounded-[8px] bg-[#F6E3BE] flex items-center justify-center shrink-0">
                          <div className="text-[#885200] text-[18px] font-bold">!</div>
                        </div>
                        <h2 className="font-serif text-[20px] font-semibold text-[#141d1a]">
                          {isNoHints ? 'Worth revisiting' : 'Worth revisiting'}
                        </h2>
                      </div>

                      <div>
                        {isNoHints ? (
                          <p className="text-[16px] text-[#4A5551] leading-relaxed">
                            Nothing stood out to revisit in this session.
                          </p>
                        ) : (
                          <>
                            <p className="text-[16px] text-[#141d1a] leading-relaxed">
                              Multiplying a number across brackets. In the samosa question, 3(7 − 2s)
                              needed a hint before it became 21 − 6s.
                            </p>
                            <button
                              type="button"
                              onClick={onStartPractice}
                              className="inline-flex items-center gap-1 mt-3 text-[#004135] hover:underline text-[16px] font-medium cursor-pointer"
                            >
                              <span>Practise this</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </article>
                  </>
                )}
              </div>

              {!isPreparing && (
                <div className={`lg:col-span-5 ${isMobile ? 'w-full' : ''}`}>
                  <aside className="bg-white rounded-[12px] p-6" style={{ boxShadow: '0 0 0 1px #DDD8CC' }}>
                    <h2 className="font-serif text-[20px] font-semibold text-[#141d1a] mb-4">
                      What to do next
                    </h2>
                    <div className="flex flex-col gap-4">
                      <div className="p-4 rounded-[8px] bg-[#F4F1EA] transition-colors duration-150">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <span className="text-[16px] font-semibold text-[#141d1a]">
                            {isLessonNotFinished ? 'Resume lesson' : 'Practise substitution'}
                          </span>
                          <ChevronRight className="w-5 h-5 text-[#4A5551] shrink-0 mt-0.5" />
                        </div>
                        <p className="text-[14px] text-[#4A5551] mb-4">
                          {isLessonNotFinished ? 'Continue from where you left off.' : 'Six questions, easy to hard.'}
                        </p>
                        <button
                          type="button"
                          onClick={isLessonNotFinished ? onStartLesson3 : onStartPractice}
                          className="w-full sm:w-auto h-11 px-4 rounded-[8px] text-[13px] font-medium transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer bg-[#004135] text-white"
                        >
                          {isLessonNotFinished ? 'Resume lesson' : 'Start practice'}
                        </button>
                      </div>

                      <div className="p-4 rounded-[8px] bg-[#F4F1EA] transition-colors duration-150">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <span className="text-[16px] font-semibold text-[#141d1a]">
                            {isLessonNotFinished ? 'Practise substitution' : 'Move on to elimination'}
                          </span>
                          <ChevronRight className="w-5 h-5 text-[#4A5551] shrink-0 mt-0.5" />
                        </div>
                        <p className="text-[14px] text-[#4A5551] mb-4">
                          {isLessonNotFinished ? 'Six questions, easy to hard.' : 'Lesson 3 of 4. About 10 minutes.'}
                        </p>
                        <button
                          type="button"
                          onClick={isLessonNotFinished ? onStartPractice : onStartLesson3}
                          className="w-full sm:w-auto h-11 px-4 rounded-[8px] text-[13px] font-medium hover:bg-[#FAF8F4] transition-colors duration-150 cursor-pointer bg-white text-[#141d1a]"
                          style={{ boxShadow: '0 0 0 1px #DDD8CC' }}
                        >
                          {isLessonNotFinished ? 'Start practice' : 'Start lesson 3'}
                        </button>
                      </div>
                    </div>
                  </aside>
                </div>
              )}
            </section>

            {!isPreparing && !isError && (
              <section className="mt-8">
                {renderFeedbackCard()}
              </section>
            )}

            {!isPreparing && !isError && (
              <p className="text-[14px] text-[#4A5551] mt-3">
                Summaries are AI-generated and may contain errors.{' '}
                <button
                  type="button"
                  className="text-[#004135] hover:underline font-medium cursor-pointer"
                  onClick={onBackToDashboard}
                >
                  Report a problem.
                </button>
              </p>
            )}
          </div>
        </div>
      </main>

      <footer className="w-full bg-[#FAF8F4] border-t border-[#DDD8CC] mt-auto">
        <div className="max-w-[1120px] mx-auto px-4 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[13px] text-[#4A5551]">
          <span>Silo Academic &amp; Research Workspace</span>
          <span>© 2024 Silo Archive. All rights reserved.</span>
        </div>
      </footer>

      <div className="fixed left-1/2 -translate-x-1/2 bottom-4 z-40">
        <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-[#DDD8CC] bg-white/95 px-2 py-1.5 shadow-lg backdrop-blur-sm">
          {[
            { id: 'default', label: 'Default' },
            { id: 'rating-chosen', label: 'Rating' },
            { id: 'rating-sent', label: 'Sent' },
            { id: 'preparing', label: 'Preparing' },
            { id: 'error', label: 'Error' },
            { id: 'no-hints', label: 'No hints' },
            { id: 'lesson-not-finished', label: 'Resume' },
            { id: 'mobile', label: 'Mobile' },
          ].map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setActiveVariant(option.id as LessonCompleteVariant)}
              className={`h-8 px-2.5 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                activeVariant === option.id
                  ? 'bg-[#004135] text-white'
                  : 'bg-[#FAF8F4] text-[#4A5551] hover:bg-[#EDE9E0]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
