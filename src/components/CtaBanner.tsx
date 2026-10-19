import React from 'react';

interface CtaBannerProps {
  onStartSession: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onStartSession }) => {
  return (
    <section className="max-w-[1120px] mx-auto px-6 mb-20">
      <div className="rounded-xl p-10 border border-[#DDD8CC] bg-[#EDE9E0]/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h3 className="font-headline text-[22px] font-semibold text-[#17201D]">
            Ready to explore a situation?
          </h3>
          <p className="font-body-sm text-[15px] text-[#4A5551] mt-1.5">
            Start your first scenario.
          </p>
        </div>
        <button
          onClick={onStartSession}
          className="h-11 px-6 bg-[#0E5A4B] hover:bg-[#0A4A3E] text-white font-body-sm text-[15px] font-medium rounded-lg flex items-center justify-center transition-colors shrink-0 cursor-pointer shadow-sm active:scale-[0.98]"
        >
          Start free session
        </button>
      </div>
    </section>
  );
};
