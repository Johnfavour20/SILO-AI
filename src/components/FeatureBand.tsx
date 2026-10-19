import React from 'react';
import { BookOpen, FileText, CheckCircle2, ListChecks } from 'lucide-react';

interface FeatureBandProps {
  onStartSession: () => void;
  onOpenTopics: () => void;
  onExploreFeedback: () => void;
}

export const FeatureBand: React.FC<FeatureBandProps> = ({
  onStartSession,
  onOpenTopics,
  onExploreFeedback,
}) => {
  return (
    <section className="w-full bg-[#0E5A4B] py-20 text-white" id="how-it-works">
      <div className="max-w-[1120px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column */}
        <div className="lg:col-span-5">
          <h2 className="font-headline text-[32px] font-semibold text-white tracking-tight leading-tight">
            How a session works
          </h2>
          <p className="text-white/80 text-[16px] leading-relaxed mt-4 mb-8">
            Work through genuine applied problems with guidance calibrated to your reasoning. Every step tests how you think, not just what you memorised.
          </p>
          <button
            onClick={onStartSession}
            className="inline-flex items-center justify-center border border-white/60 text-white rounded-lg px-6 py-3 text-[15px] font-medium hover:bg-white/10 transition-colors cursor-pointer"
          >
            Try a free session
          </button>
        </div>

        {/* Right column: 2x2 Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card 1 */}
          <div
            onClick={onOpenTopics}
            className="bg-white rounded-xl p-6 border border-[#DDD8CC] text-[#17201D] cursor-pointer hover:shadow-md transition-all group"
          >
            <div className="bg-[#DCEBE6] text-[#0E5A4B] rounded-lg w-10 h-10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5 text-[#0E5A4B]" strokeWidth={2} />
            </div>
            <h3 className="font-title text-[16px] font-semibold text-[#17201D]">
              Pick a topic
            </h3>
            <p className="font-body-sm text-[14px] text-[#4A5551] mt-2 leading-relaxed">
              Simultaneous equations and quadratic equations, covering substitution, elimination, and word problems.
            </p>
          </div>

          {/* Card 2 */}
          <div
            onClick={onStartSession}
            className="bg-white rounded-xl p-6 border border-[#DDD8CC] text-[#17201D] cursor-pointer hover:shadow-md transition-all group"
          >
            <div className="bg-[#DCEBE6] text-[#0E5A4B] rounded-lg w-10 h-10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5 text-[#0E5A4B]" strokeWidth={2} />
            </div>
            <h3 className="font-title text-[16px] font-semibold text-[#17201D]">
              Work through a scenario
            </h3>
            <p className="font-body-sm text-[14px] text-[#4A5551] mt-2 leading-relaxed">
              Read a concrete problem based on real events, trade, science, or community planning.
            </p>
          </div>

          {/* Card 3 */}
          <div
            onClick={onExploreFeedback}
            className="bg-white rounded-xl p-6 border border-[#DDD8CC] text-[#17201D] cursor-pointer hover:shadow-md transition-all group"
          >
            <div className="bg-[#DCEBE6] text-[#0E5A4B] rounded-lg w-10 h-10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-5 h-5 text-[#0E5A4B]" strokeWidth={2} />
            </div>
            <h3 className="font-title text-[16px] font-semibold text-[#17201D]">
              Get feedback on your reasoning
            </h3>
            <p className="font-body-sm text-[14px] text-[#4A5551] mt-2 leading-relaxed">
              Receive line-by-line feedback on where your logic holds up and where a step needs tightening.
            </p>
          </div>

          {/* Card 4 */}
          <div
            onClick={onStartSession}
            className="bg-white rounded-xl p-6 border border-[#DDD8CC] text-[#17201D] cursor-pointer hover:shadow-md transition-all group"
          >
            <div className="bg-[#DCEBE6] text-[#0E5A4B] rounded-lg w-10 h-10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <ListChecks className="w-5 h-5 text-[#0E5A4B]" strokeWidth={2} />
            </div>
            <h3 className="font-title text-[16px] font-semibold text-[#17201D]">
              Review what to practise
            </h3>
            <p className="font-body-sm text-[14px] text-[#4A5551] mt-2 leading-relaxed">
              Finish with a concise summary of strengths and specific concepts to revisit in your next study session.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
