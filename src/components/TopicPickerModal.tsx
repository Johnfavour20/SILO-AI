import React from 'react';
import { scenarios } from '../data/scenarios.ts';

interface TopicPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScenario: (scenarioId: string) => void;
}

export const TopicPickerModal: React.FC<TopicPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectScenario,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-[#FAF8F4] border border-[#DDD8CC] rounded-2xl w-full max-w-[720px] max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-[#DDD8CC]">
          <div>
            <h2 className="font-headline text-[24px] font-semibold text-[#17201D]">
              Choose a maths scenario
            </h2>
            <p className="font-body-sm text-[14px] text-[#4A5551] mt-0.5">
              Work through real-world situations calibrated to secondary school mathematics.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#4A5551] hover:text-[#17201D] rounded-lg hover:bg-[#EDE9E0] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {scenarios.map((sc) => (
            <div
              key={sc.id}
              onClick={() => {
                onSelectScenario(sc.id);
                onClose();
              }}
              className="bg-white border border-[#DDD8CC] hover:border-[#0E5A4B] rounded-xl p-5 cursor-pointer transition-all hover:shadow-md group text-left"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-[#0E5A4B] bg-[#DCEBE6] px-2.5 py-0.5 rounded-full">
                      {sc.topic}
                    </span>
                    <span className="text-xs text-[#4A5551]">·</span>
                    <span className="text-xs text-[#4A5551]">{sc.curriculumLevel}</span>
                  </div>
                  <h3 className="font-headline text-[18px] font-semibold text-[#17201D] group-hover:text-[#0E5A4B] transition-colors">
                    {sc.title}
                  </h3>
                  <p className="font-body-sm text-[14px] text-[#4A5551] mt-1.5 leading-relaxed">
                    {sc.description}
                  </p>
                </div>
                <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-[#FAF8F4] group-hover:bg-[#0E5A4B] group-hover:text-white transition-all text-[#0E5A4B]">
                  <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-[#DDD8CC]/40 flex items-center justify-between text-xs text-[#4A5551]">
                <span>{sc.steps.length} reasoning steps</span>
                <span className="text-[#0E5A4B] font-medium group-hover:underline">
                  Start scenario →
                </span>
              </div>
            </div>
          ))}

          {/* Upcoming Curriculum modules */}
          <div className="bg-[#EDE9E0]/40 border border-dashed border-[#DDD8CC] rounded-xl p-5 text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#0E5A4B] bg-[#DCEBE6] px-2.5 py-0.5 rounded-full">
                Coming next
              </span>
              <span className="text-xs text-[#4A5551]">Quadratic equations · Word problems</span>
            </div>
            <h4 className="font-headline text-[16px] font-semibold text-[#17201D] mt-1">
              Parabolic projectile trajectory & boundary areas
            </h4>
            <p className="font-body-sm text-[13px] text-[#4A5551] mt-1">
              Quadratic word problems: solving for launch apex and ground intercepts through substitution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
