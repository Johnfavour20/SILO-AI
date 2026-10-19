import React from 'react';
import ctaImage from '../assets/images/pexels-tima-miroshnichenko-5303559.jpg';

interface CtaBannerProps {
  onStartSession: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onStartSession }) => {
  return (
    <section className="max-w-[1120px] mx-auto px-6 mb-20">
      <div className="rounded-xl p-6 sm:p-8 border border-[#DDD8CC] bg-[#EDE9E0]/50 flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
        <div className="flex-1 min-w-0 w-full lg:w-auto">
          <h3 className="font-headline text-[22px] font-semibold text-[#17201D]">
            Ready to explore a situation?
          </h3>
          <p className="font-body-sm text-[15px] text-[#4A5551] mt-1.5">
            Start your first scenario.
          </p>

          <button
            onClick={onStartSession}
            className="mt-5 h-11 px-6 bg-[#0E5A4B] hover:bg-[#0A4A3E] text-white font-body-sm text-[15px] font-medium rounded-lg flex items-center justify-center transition-colors shrink-0 cursor-pointer shadow-sm active:scale-[0.98]"
          >
            Start free session
          </button>
        </div>

        <div className="w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[360px] overflow-hidden rounded-xl border border-[#DDD8CC] bg-white shadow-sm lg:ml-auto">
          <img
            src={ctaImage}
            alt="Student working through a maths problem at a desk"
            className="h-[180px] sm:h-[200px] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
