import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  Play,
} from 'lucide-react';

interface TopicPageProps {
  onBackToDashboard: () => void;
  onSelectLesson: (scenarioId: string) => void;
  onOpenPractice?: () => void;
}

interface LessonItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  status: 'done' | 'current' | 'upcoming';
  scenarioId: string;
}

export const TopicPage: React.FC<TopicPageProps> = ({
  onBackToDashboard,
  onSelectLesson,
  onOpenPractice,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<'simultaneous' | 'quadratic'>('simultaneous');

  const simultaneousLessons: LessonItem[] = [
    {
      id: 'sim-1',
      title: 'What simultaneous equations are',
      desc: 'Two unknowns, two clues. Meet the lunch bills.',
      time: 'About 8 min',
      status: 'done',
      scenarioId: 'simultaneous-lunch',
    },
    {
      id: 'sim-2',
      title: 'Substitution',
      desc: 'Replace one unknown with an expression and solve.',
      time: 'About 10 min',
      status: 'current',
      scenarioId: 'simultaneous-lunch',
    },
    {
      id: 'sim-3',
      title: 'Elimination',
      desc: 'Add or subtract equations to remove an unknown.',
      time: 'About 10 min',
      status: 'upcoming',
      scenarioId: 'community-bakery',
    },
    {
      id: 'sim-4',
      title: 'Word problems',
      desc: 'Turn a short story into two equations.',
      time: 'About 12 min',
      status: 'upcoming',
      scenarioId: 'community-bakery',
    },
  ];

  const quadraticLessons: LessonItem[] = [
    {
      id: 'quad-1',
      title: 'What quadratic equations are',
      desc: 'Curves, symmetry and squaring unknowns.',
      time: 'About 8 min',
      status: 'done',
      scenarioId: 'fundraiser-stall',
    },
    {
      id: 'quad-2',
      title: 'Substitution in quadratics',
      desc: 'Substitute linear expressions into quadratic relations.',
      time: 'About 10 min',
      status: 'current',
      scenarioId: 'fundraiser-stall',
    },
    {
      id: 'quad-3',
      title: 'Elimination in quadratic systems',
      desc: 'Align terms and eliminate variables to solve quadratic systems.',
      time: 'About 10 min',
      status: 'upcoming',
      scenarioId: 'fundraiser-stall',
    },
    {
      id: 'quad-4',
      title: 'Word problems',
      desc: 'Model trajectory, revenue, and geometry from real stories.',
      time: 'About 12 min',
      status: 'upcoming',
      scenarioId: 'fundraiser-stall',
    },
  ];

  const activeLessons = selectedTopic === 'simultaneous' ? simultaneousLessons : quadraticLessons;

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#17201D] font-sans flex flex-col">
      {/* Top bar: wordmark "Silo" on the left and "Back to dashboard" with left-arrow on the right. 1px bottom border. */}
      <header className="sticky top-0 z-40 bg-[#FAF8F4] border-b border-[#DDD8CC]">
        <div className="max-w-[1120px] mx-auto px-6 lg:px-[48px] h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="font-serif text-[24px] font-semibold text-[#17201D] tracking-tight hover:text-[#0E5A4B] transition-colors cursor-pointer"
          >
            Silo
          </button>

          <button
            type="button"
            onClick={onBackToDashboard}
            className="flex items-center gap-2 text-[14px] text-[#4A5551] hover:text-[#17201D] font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 shrink-0 text-[#7D8883]" strokeWidth={1.5} />
            <span>Back to dashboard</span>
          </button>
        </div>
      </header>

      {/* Main content in a 1120px container with 48px margins */}
      <main className="w-full max-w-[1120px] mx-auto p-6 lg:p-[48px] space-y-8 flex-1">
        {/* Header: title "Choose a topic" in serif, one sentence in body-md */}
        <section>
          <h1 className="font-serif text-[32px] font-semibold text-[#17201D] tracking-tight">
            Choose a topic
          </h1>
          <p className="text-[16px] text-[#4A5551] mt-1">
            Each topic is split into short lessons. Every lesson has a clip, an example we solve together, and questions for you.
          </p>
        </section>

        {/* Topic tabs: two large selectable cards side by side, white, 1px border, 12px radius */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Tab 1: Simultaneous equations */}
          <button
            type="button"
            onClick={() => setSelectedTopic('simultaneous')}
            className={`text-left rounded-[12px] p-5 sm:p-6 transition-colors cursor-pointer bg-[#FFFFFF] ${
              selectedTopic === 'simultaneous'
                ? 'border-2 border-[#0E5A4B]'
                : 'border border-[#DDD8CC] hover:border-[#7D8883]'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-[17px] font-semibold text-[#17201D]">
                  Simultaneous equations
                </h2>
                <p className="text-[14px] text-[#4A5551] mt-1">
                  4 lessons, 1 done
                </p>
              </div>
              {selectedTopic === 'simultaneous' && (
                <div className="w-6 h-6 rounded-[8px] bg-[#DCEBE6] text-[#0E5A4B] flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" strokeWidth={2} />
                </div>
              )}
            </div>
          </button>

          {/* Tab 2: Quadratic equations */}
          <button
            type="button"
            onClick={() => setSelectedTopic('quadratic')}
            className={`text-left rounded-[12px] p-5 sm:p-6 transition-colors cursor-pointer bg-[#FFFFFF] ${
              selectedTopic === 'quadratic'
                ? 'border-2 border-[#0E5A4B]'
                : 'border border-[#DDD8CC] hover:border-[#7D8883]'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-[17px] font-semibold text-[#17201D]">
                  Quadratic equations
                </h2>
                <p className="text-[14px] text-[#4A5551] mt-1">
                  4 lessons, not started
                </p>
              </div>
              {selectedTopic === 'quadratic' && (
                <div className="w-6 h-6 rounded-[8px] bg-[#DCEBE6] text-[#0E5A4B] flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" strokeWidth={2} />
                </div>
              )}
            </div>
          </button>
        </section>

        {/* Main area: two columns under the tabs. At 360px the columns stack with lesson path first and lesson card below it */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left column (about 7 columns): vertical lesson path inside one white card */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#DDD8CC] rounded-[12px] p-6">
            <div className="relative space-y-2">
              {/* Single continuous vertical connector line behind all radio markers */}
              <div
                aria-hidden="true"
                className="absolute top-[28px] bottom-[28px] left-[28px] -translate-x-1/2 w-[2px] bg-[#DDD8CC] z-0 pointer-events-none"
              />

              {activeLessons.map((lesson, idx) => {
                const isCurrent = lesson.status === 'current';

                return (
                  <div
                    key={lesson.id}
                    onClick={() => onSelectLesson(lesson.id)}
                    className={`relative px-4 py-3.5 rounded-[8px] transition-colors cursor-pointer hover:bg-[#F4F1EA]/70 ${
                      isCurrent ? 'bg-[#DCEBE6] hover:bg-[#DCEBE6]' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Marker Column: exactly 24px wide, mathematically centers both the line and marker */}
                      <div className="relative w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                        {/* Marker: Done (green check) */}
                        {lesson.status === 'done' && (
                          <div className="relative z-10 w-6 h-6 rounded-full bg-[#0E5A4B] text-[#FFFFFF] flex items-center justify-center shadow-none">
                            <Check className="w-3.5 h-3.5" strokeWidth={2.2} />
                          </div>
                        )}

                        {/* Marker: Current (green ring with green inner dot, opaque container background masking the line underneath) */}
                        {lesson.status === 'current' && (
                          <div className="relative z-10 w-6 h-6 rounded-full border-2 border-[#0E5A4B] bg-[#DCEBE6] flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#0E5A4B]" />
                          </div>
                        )}

                        {/* Marker: Upcoming (empty outline circle with solid white opaque background masking the line underneath) */}
                        {lesson.status === 'upcoming' && (
                          <div className="relative z-10 w-6 h-6 rounded-full border border-[#DDD8CC] bg-[#FFFFFF]" />
                        )}
                      </div>

                      {/* Lesson title, description, badge, time */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <h3
                              className={`text-[15px] font-medium ${
                                isCurrent ? 'text-[#0E5A4B]' : 'text-[#17201D]'
                              }`}
                            >
                              {lesson.title}
                            </h3>
                            {isCurrent && (
                              <span className="text-[11px] font-medium bg-[#FFFFFF] text-[#0E5A4B] border border-[#DDD8CC] px-2 py-0.5 rounded-[8px]">
                                Continue
                              </span>
                            )}
                          </div>
                          <span
                            className={`text-[12px] shrink-0 font-medium ${
                              isCurrent ? 'text-[#0E5A4B]' : 'text-[#4A5551]'
                            }`}
                          >
                            {lesson.time}
                          </span>
                        </div>
                        <p
                          className={`text-[13px] mt-0.5 ${
                            isCurrent ? 'text-[#17201D]' : 'text-[#4A5551]'
                          }`}
                        >
                          {lesson.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column (about 5 columns): white card, 12px radius, 1px border */}
          <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#DDD8CC] rounded-[12px] p-6 space-y-5">
            {/* Title */}
            <h2 className="font-serif text-[20px] font-semibold text-[#17201D]">
              {selectedTopic === 'simultaneous'
                ? 'Lesson 2: Substitution'
                : 'Lesson 2: Substitution in quadratics'}
            </h2>

            {/* Illustrated 16:9 clip thumbnail in the Silo style (flat illustration of two lunch receipts with handwritten equations) */}
            <div className="w-full aspect-[16/9] bg-[#FAF8F4] border border-[#DDD8CC] rounded-[8px] overflow-hidden p-3 flex items-center justify-center">
              <svg
                viewBox="0 0 220 124"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="220" height="124" fill="#FAF8F4" />
                {/* Lunch Receipt 1 */}
                <g transform="rotate(-3 55 60)">
                  <rect
                    x="20"
                    y="14"
                    width="75"
                    height="92"
                    rx="4"
                    fill="#FFFFFF"
                    stroke="#DDD8CC"
                    strokeWidth="1"
                  />
                  <line x1="28" y1="26" x2="65" y2="26" stroke="#4A5551" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="28" y1="34" x2="52" y2="34" stroke="#DDD8CC" strokeWidth="1" />
                  <text x="28" y="52" fill="#17201D" fontFamily="Georgia, serif" fontSize="10" fontWeight="600">
                    {selectedTopic === 'simultaneous' ? '2s + j = 8' : 'y = x² - 4'}
                  </text>
                  <line x1="28" y1="62" x2="80" y2="62" stroke="#DDD8CC" strokeWidth="1" strokeDasharray="2 2" />
                  <text x="28" y="76" fill="#4A5551" fontFamily="sans-serif" fontSize="7">
                    Receipt #104
                  </text>
                  <text x="28" y="88" fill="#0E5A4B" fontFamily="Georgia, serif" fontSize="8" fontWeight="500">
                    {selectedTopic === 'simultaneous' ? 's = 4 - 0.5j' : 'x² - y = 4'}
                  </text>
                </g>
                {/* Lunch Receipt 2 */}
                <g transform="rotate(2 145 60)">
                  <rect
                    x="115"
                    y="16"
                    width="75"
                    height="92"
                    rx="4"
                    fill="#FFFFFF"
                    stroke="#DDD8CC"
                    strokeWidth="1"
                  />
                  <line x1="123" y1="28" x2="160" y2="28" stroke="#4A5551" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="123" y1="36" x2="148" y2="36" stroke="#DDD8CC" strokeWidth="1" />
                  <text x="123" y="54" fill="#17201D" fontFamily="Georgia, serif" fontSize="10" fontWeight="600">
                    {selectedTopic === 'simultaneous' ? 's + 3j = 9' : 'y = 2x + 1'}
                  </text>
                  <line x1="123" y1="64" x2="175" y2="64" stroke="#DDD8CC" strokeWidth="1" strokeDasharray="2 2" />
                  <text x="123" y="78" fill="#4A5551" fontFamily="sans-serif" fontSize="7">
                    Receipt #105
                  </text>
                  <text x="123" y="90" fill="#0E5A4B" fontFamily="Georgia, serif" fontSize="8" fontWeight="500">
                    substitute into (1)
                  </text>
                </g>
              </svg>
            </div>

            {/* "How it works" section: list of four numbered steps */}
            <div className="space-y-3 pt-1">
              <h3 className="font-serif text-[16px] font-semibold text-[#17201D]">
                How it works
              </h3>

              <ol className="space-y-2.5">
                {[
                  'Watch a short clip',
                  'We solve one together',
                  'You try one with guidance',
                  'You try one on your own',
                ].map((stepText, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[14px] text-[#17201D]">
                    <span className="w-5 h-5 rounded-[8px] bg-[#FAF8F4] border border-[#DDD8CC] text-[12px] font-medium text-[#4A5551] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{stepText}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Action buttons */}
            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={() =>
                  onSelectLesson(
                    selectedTopic === 'simultaneous' ? 'simultaneous-lunch' : 'fundraiser-stall'
                  )
                }
                className="w-full py-2.5 bg-[#0E5A4B] hover:bg-[#0A4337] text-white rounded-[8px] text-[14px] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Resume lesson 2</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onOpenPractice) {
                    onOpenPractice();
                  } else {
                    onSelectLesson(
                      selectedTopic === 'simultaneous' ? 'community-bakery' : 'fundraiser-stall'
                    );
                  }
                }}
                className="w-full text-center text-[14px] text-[#0E5A4B] hover:underline font-medium cursor-pointer py-1"
              >
                Practice questions for this topic
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
