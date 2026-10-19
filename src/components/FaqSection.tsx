import React, { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export const FaqSection: React.FC = () => {
  const faqs: FaqItem[] = [
    {
      question: 'Is the feedback always right?',
      answer:
        'No. Feedback is AI-generated and may occasionally misinterpret unexpected notation or alternative methods. Silo is designed as a learning companion to guide your reasoning, not an infallible marking authority. You can flag any confusing or inaccurate response using the Report a problem link on every step.',
      defaultOpen: true,
    },
    {
      question: 'What happens to my data?',
      answer:
        'Your answers and session history are stored securely so you can track your progress over time. We do not sell your personal data, and we do not use student practice answers to train public AI models. Learners under 18 require parental or guardian awareness.',
    },
    {
      question: 'Can I use Silo to prepare for exams?',
      answer:
        'Yes. The scenarios focus on applied mathematics questions commonly tested in GCSE, A-Level, IB, and equivalent secondary curricula, especially multi-step word problems where algebraic formulation is required.',
    },
    {
      question: 'How do progressive hints work?',
      answer:
        'Each scenario provides up to 3 sequential hints per step. Rather than spoiling the full solution immediately, Hint 1 identifies the underlying relationship, Hint 2 isolates variables or margins, and Hint 3 outlines the algebraic step.',
    },
  ];

  const [openStates, setOpenStates] = useState<Record<number, boolean>>({
    0: true,
  });

  const toggle = (idx: number) => {
    setOpenStates((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <section className="max-w-[760px] mx-auto px-6 py-20">
      <h2 className="font-headline text-[28px] font-semibold text-[#17201D] text-center mb-10">
        Common questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = !!openStates[idx];
          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#DDD8CC] transition-all overflow-hidden"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-6 flex items-center justify-between text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E5A4B]"
                aria-expanded={isOpen}
              >
                <span className="font-title text-[16px] font-semibold text-[#17201D]">
                  {faq.question}
                </span>
                <span
                  className={`material-symbols-outlined text-[#4A5551] text-[20px] transition-transform duration-200 shrink-0 ml-4 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                >
                  keyboard_arrow_down
                </span>
              </button>
              {isOpen && (
                <div className="px-6 pb-6 pt-0 border-t border-[#DDD8CC]/30">
                  <p className="font-body-sm text-[14px] text-[#4A5551] mt-3 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
