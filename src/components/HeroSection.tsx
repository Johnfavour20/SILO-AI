import React from 'react';
import heroImage from '../assets/images/pexels-silverkblack-39190799.jpg';

interface HeroSectionProps {
  onStartSession: () => void;
  onExploreFeedback: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartSession,
  onExploreFeedback,
}) => {
  return (
    <section className="max-w-[1120px] mx-auto px-6 pt-16 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column */}
        <div className="lg:col-span-6 max-w-[540px]">
          <h1 className="font-display text-[40px] font-semibold text-[#17201D] tracking-tight leading-[1.15] text-balance">
            Practise maths by working through real situations
          </h1>
          <p className="font-body-lg text-[18px] text-[#4A5551] mt-6 leading-relaxed">
            Silo gives you a realistic scenario, checks your reasoning step by step, and shows you what to practise next.
          </p>
          <div className="mt-8 flex items-center gap-6">
            <button
              onClick={onStartSession}
              className="h-11 px-6 bg-[#0E5A4B] hover:bg-[#0A4A3E] text-white font-body-sm text-[15px] font-medium rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-[0.98]"
            >
              Try a free session
            </button>
            <a
              href="#how-it-works"
              className="text-[#0E5A4B] font-body-sm text-[15px] font-medium hover:underline flex items-center gap-1 cursor-pointer"
            >
              See how it works
            </a>
          </div>

          {/* Value statements */}
          <div className="mt-10 pt-8 border-t border-[#DDD8CC]/60 space-y-3">
            <div className="flex items-center gap-2.5 text-[14px] text-[#4A5551]">
              <svg
                className="w-4 h-4 text-[#0E5A4B] shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Feedback on your reasoning, not just right or wrong</span>
            </div>
            <div className="flex items-center gap-2.5 text-[14px] text-[#4A5551]">
              <svg
                className="w-4 h-4 text-[#0E5A4B] shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Hints before answers</span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Photograph with Overlapping Floating Cards */}
        <div className="lg:col-span-6 relative pt-4 pb-4 sm:p-4">
          <div className="relative">
            <img
              alt="High school student studying intently with notebook and laptop at a wooden table"
              className="rounded-xl border border-[#DDD8CC] object-cover w-full h-[420px] bg-[#EDE9E0]"
              src={heroImage}
            />

            {/* Upper Right Floating Card */}
            <div
              onClick={onExploreFeedback}
              className="absolute -top-5 -right-2 sm:-top-6 sm:-right-4 bg-white border border-[#DDD8CC] rounded-xl p-4 overlay-shadow max-w-[270px] cursor-pointer hover:border-[#0E5A4B]/40 transition-all group"
              title="Click to inspect this feedback sample below"
            >
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#0E5A4B] mb-2">
                Quadratic equations · Substitution
              </div>
              <div className="flex items-start gap-2.5 mb-2.5">
                <span className="w-2 h-2 rounded-full bg-[#1E6B3A] mt-1.5 shrink-0" />
                <div>
                  <span className="font-label text-[12px] font-semibold text-[#17201D] block">
                    What worked
                  </span>
                  <p className="font-body-sm text-[12px] text-[#4A5551] leading-tight">
                    Correctly multiplied items by margin
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#8A5300] mt-1.5 shrink-0" />
                <div>
                  <span className="font-label text-[12px] font-semibold text-[#8A5300] block">
                    What to work on
                  </span>
                  <p className="font-body-sm text-[12px] text-[#4A5551] leading-tight">
                    Unit profit is p - 2 rather than p
                  </p>
                </div>
              </div>
            </div>

            {/* Lower Left Floating Card */}
            <div
              onClick={onStartSession}
              className="absolute -bottom-5 -left-2 sm:-bottom-6 sm:-left-4 bg-white border border-[#DDD8CC] rounded-xl p-4 overlay-shadow max-w-[290px] cursor-pointer hover:border-[#0E5A4B]/40 transition-all group"
              title="Click to launch interactive scenario"
            >
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#0E5A4B] mb-1">
                Quadratic equations · Word problems
              </div>
              <span className="font-label text-[12px] text-[#4A5551] font-medium block">
                Write an expression for the club's profit in terms of p
              </span>
              <div className="mt-2 flex items-center justify-between pt-1">
                <div className="font-headline italic text-[15px] text-[#17201D] group-hover:text-[#0E5A4B] transition-colors">
                  Profit = (120 - 4p)(p - 2)
                </div>
                <span className="material-symbols-outlined text-[#1E6B3A] text-[18px] ml-2 font-bold">
                  check
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
