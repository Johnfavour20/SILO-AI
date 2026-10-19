import React, { useState } from 'react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const [reason, setReason] = useState<string>('notation');
  const [details, setDetails] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setDetails('');
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-[#FAF8F4] border border-[#DDD8CC] rounded-2xl w-full max-w-[500px] p-6 md:p-8 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-[#DDD8CC]">
          <h2 className="font-headline text-[20px] font-semibold text-[#17201D]">
            Report a problem
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-[#4A5551] hover:text-[#17201D] rounded-lg hover:bg-[#EDE9E0]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <span className="material-symbols-outlined text-[40px] text-[#1E6B3A]">
              check_circle
            </span>
            <h3 className="font-headline text-[18px] font-semibold text-[#17201D]">
              Thank you for flagging
            </h3>
            <p className="text-sm text-[#4A5551]">
              Our pedagogical review team audits every flagged step to improve reasoning feedback.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <p className="text-sm text-[#4A5551]">
              Help us refine Silo's feedback. What seemed unclear or incorrect?
            </p>

            <div className="space-y-2 text-sm text-[#17201D]">
              <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-[#DDD8CC] bg-white cursor-pointer hover:bg-[#F4F1EA]">
                <input
                  type="radio"
                  name="reportReason"
                  checked={reason === 'notation'}
                  onChange={() => setReason('notation')}
                  className="text-[#0E5A4B] focus:ring-[#0E5A4B]"
                />
                <span>Misinterpreted my algebraic notation or symbols</span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-[#DDD8CC] bg-white cursor-pointer hover:bg-[#F4F1EA]">
                <input
                  type="radio"
                  name="reportReason"
                  checked={reason === 'math'}
                  onChange={() => setReason('math')}
                  className="text-[#0E5A4B] focus:ring-[#0E5A4B]"
                />
                <span>Mathematical evaluation seemed incorrect</span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-[#DDD8CC] bg-white cursor-pointer hover:bg-[#F4F1EA]">
                <input
                  type="radio"
                  name="reportReason"
                  checked={reason === 'hint'}
                  onChange={() => setReason('hint')}
                  className="text-[#0E5A4B] focus:ring-[#0E5A4B]"
                />
                <span>Hint was confusing or gave away the answer prematurely</span>
              </label>
            </div>

            <div>
              <label className="text-xs font-medium text-[#4A5551] block mb-1">
                Additional notes (optional)
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Explain what happened or what step you intended..."
                rows={3}
                className="w-full p-3 bg-white border border-[#DDD8CC] rounded-lg text-sm text-[#17201D] focus:outline-none focus:border-[#0E5A4B]"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-[#4A5551] hover:text-[#17201D]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#0E5A4B] hover:bg-[#0A4A3E] text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
              >
                Submit report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
