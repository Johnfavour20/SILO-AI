import React, { useState } from 'react';
import secondLandingImage from '../assets/images/pexels-silverkblack-39191019.jpg';

export const BenefitsSection: React.FC = () => {
  const [hintIndex, setHintIndex] = useState(0);

  const sampleHints = [
    { tag: 'Hint 1 of 3', desc: 'Reveals one step at a time' },
    { tag: 'Hint 2 of 3', desc: 'Unit profit is price minus production cost' },
    { tag: 'Hint 3 of 3', desc: 'Total Profit = (Quantity Sold) × (Margin per unit)' },
  ];

  const nextHint = () => {
    setHintIndex((prev) => (prev + 1) % sampleHints.length);
  };

  return (
    <section className="max-w-[1120px] mx-auto px-6 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Photograph with floating hint badge */}
        <div className="lg:col-span-6 relative">
          <img
            alt="High school students collaborating and working through mathematics textbook exercises"
            className="rounded-xl border border-[#DDD8CC] object-cover w-full h-[380px] bg-[#EDE9E0]"
            src={secondLandingImage}
          />
          <button
            onClick={nextHint}
            title="Click to cycle progressive hints"
            className="absolute bottom-6 right-6 bg-white border border-[#DDD8CC] rounded-lg px-3.5 py-2.5 flex items-center gap-2.5 overlay-shadow hover:border-[#0E5A4B]/40 transition-all cursor-pointer text-left"
          >
            <span className="text-[#8A5300] bg-[#F6E3BE] px-2 py-0.5 rounded text-xs font-semibold shrink-0">
              {sampleHints[hintIndex].tag}
            </span>
            <span className="text-xs text-[#4A5551] max-w-[200px] truncate">
              {sampleHints[hintIndex].desc}
            </span>
          </button>
        </div>

        {/* Right Column: Two-column checklist */}
        <div className="lg:col-span-6">
          <h2 className="font-headline text-[30px] font-semibold text-[#17201D] mb-8 leading-tight">
            Built to make you do the thinking
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#DCEBE6] text-[#0E5A4B] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[14px] font-bold">check</span>
              </div>
              <span className="text-[15px] text-[#17201D] leading-snug">
                Scenarios based on real situations.
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#DCEBE6] text-[#0E5A4B] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[14px] font-bold">check</span>
              </div>
              <span className="text-[15px] text-[#17201D] leading-snug">
                Hints that reveal one step at a time.
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#DCEBE6] text-[#0E5A4B] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[14px] font-bold">check</span>
              </div>
              <span className="text-[15px] text-[#17201D] leading-snug">
                Feedback that refers to your own answer.
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#DCEBE6] text-[#0E5A4B] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[14px] font-bold">check</span>
              </div>
              <span className="text-[15px] text-[#17201D] leading-snug">
                A follow-up question in a new situation.
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#DCEBE6] text-[#0E5A4B] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[14px] font-bold">check</span>
              </div>
              <span className="text-[15px] text-[#17201D] leading-snug">
                A summary of what to practise next.
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#DCEBE6] text-[#0E5A4B] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[14px] font-bold">check</span>
              </div>
              <span className="text-[15px] text-[#17201D] leading-snug">
                A way to report anything that looks wrong.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
