import React, { useState } from 'react';

interface PricingPageProps {
  onStartSession: () => void;
  onChoosePlus: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  onStartSession,
  onChoosePlus,
}) => {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({
    0: true, // Item 1 open by default as in HTML
    1: false,
    2: false,
  });

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    setWaitlistSuccess(true);
  };

  return (
    <div className="w-full max-w-[1120px] mx-auto px-4 md:px-12 py-16 space-y-20">
      {/* Header Section */}
      <section className="space-y-3 text-left">
        <h1 className="font-display text-[40px] font-semibold text-[#17201D] tracking-tight leading-[1.15]">
          Pricing
        </h1>
        <p className="font-body-lg text-[18px] text-[#4A5551] max-w-[680px] leading-relaxed">
          Start free. Upgrade only if you want more sessions and a longer history.
        </p>
      </section>

      {/* Plans Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Free Plan Card */}
        <div className="bg-[#FFFFFF] border border-[#DDD8CC]/70 rounded-[12px] p-[36px] flex flex-col justify-between transition-all duration-150 hover:-translate-y-[2px] shadow-sm hover:shadow-md">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-title text-[20px] font-semibold text-[#17201D]">Free</h2>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-[40px] font-semibold text-[#17201D] leading-none">
                  $0
                </span>
                <span className="font-body-sm text-[14px] text-[#4A5551]">/ month</span>
              </div>
              <p className="font-body-md text-[16px] text-[#4A5551] pt-1">
                Essential practice for individual study.
              </p>
            </div>
            <div className="h-[1px] w-full bg-[#EDE9E0]" />
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3 text-[16px] text-[#17201D]">
                <span className="material-symbols-outlined text-[#0E5A4B] text-[20px] shrink-0 select-none">
                  check
                </span>
                <span>3 practice sessions per week</span>
              </li>
              <li className="flex items-start gap-3 text-[16px] text-[#17201D]">
                <span className="material-symbols-outlined text-[#0E5A4B] text-[20px] shrink-0 select-none">
                  check
                </span>
                <span>Core maths topics</span>
              </li>
              <li className="flex items-start gap-3 text-[16px] text-[#17201D]">
                <span className="material-symbols-outlined text-[#0E5A4B] text-[20px] shrink-0 select-none">
                  check
                </span>
                <span>Hints and feedback on every step</span>
              </li>
              <li className="flex items-start gap-3 text-[16px] text-[#17201D]">
                <span className="material-symbols-outlined text-[#0E5A4B] text-[20px] shrink-0 select-none">
                  check
                </span>
                <span>Session summaries</span>
              </li>
              <li className="flex items-start gap-3 text-[16px] text-[#17201D]">
                <span className="material-symbols-outlined text-[#0E5A4B] text-[20px] shrink-0 select-none">
                  check
                </span>
                <span>30 days of history</span>
              </li>
            </ul>
          </div>
          <div className="pt-8">
            <button
              onClick={onStartSession}
              className="w-full h-[44px] rounded-[8px] bg-[#F4F1EA] hover:bg-[#EDE9E0] text-[#17201D] font-label text-[13px] font-medium inline-flex items-center justify-center transition-colors select-none cursor-pointer"
            >
              Start free session
            </button>
          </div>
        </div>

        {/* Plus Plan Card */}
        <div className="bg-[#FFFFFF] border border-[#DDD8CC]/70 rounded-[12px] p-[36px] flex flex-col justify-between transition-all duration-150 hover:-translate-y-[2px] shadow-sm hover:shadow-md">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-title text-[20px] font-semibold text-[#17201D]">Plus</h2>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-[40px] font-semibold text-[#17201D] leading-none">
                  $8
                </span>
                <span className="font-body-sm text-[14px] text-[#4A5551]">/ month</span>
              </div>
              <p className="font-label text-[13px] text-[#4A5551] pt-1">
                Placeholder price; subject to change before launch.
              </p>
            </div>
            <div className="h-[1px] w-full bg-[#EDE9E0]" />
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3 text-[16px] text-[#17201D]">
                <span className="material-symbols-outlined text-[#0E5A4B] text-[20px] shrink-0 select-none">
                  check
                </span>
                <span>Unlimited practice sessions</span>
              </li>
              <li className="flex items-start gap-3 text-[16px] text-[#17201D]">
                <span className="material-symbols-outlined text-[#0E5A4B] text-[20px] shrink-0 select-none">
                  check
                </span>
                <span>All available topics</span>
              </li>
              <li className="flex items-start gap-3 text-[16px] text-[#17201D]">
                <span className="material-symbols-outlined text-[#0E5A4B] text-[20px] shrink-0 select-none">
                  check
                </span>
                <span>Full session history</span>
              </li>
              <li className="flex items-start gap-3 text-[16px] text-[#17201D]">
                <span className="material-symbols-outlined text-[#0E5A4B] text-[20px] shrink-0 select-none">
                  check
                </span>
                <span>Progress overview across topics</span>
              </li>
              <li className="flex items-start gap-3 text-[16px] text-[#17201D]">
                <span className="material-symbols-outlined text-[#0E5A4B] text-[20px] shrink-0 select-none">
                  check
                </span>
                <span>Download your data any time</span>
              </li>
            </ul>
          </div>
          <div className="pt-8">
            <button
              onClick={onChoosePlus}
              className="w-full h-[44px] rounded-[8px] bg-[#0E5A4B] hover:bg-[#0A4A3E] text-[#FFFFFF] font-label text-[13px] font-medium inline-flex items-center justify-center transition-colors select-none cursor-pointer"
              type="button"
            >
              Choose Plus
            </button>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="space-y-6">
        <h2 className="font-headline text-[28px] font-semibold text-[#17201D]">
          Compare plans
        </h2>
        <div className="bg-[#FFFFFF] border border-[#DDD8CC]/70 rounded-[12px] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F4F1EA] text-[#17201D]">
                  <th className="py-4 px-6 font-title text-[13px] font-semibold uppercase tracking-wider text-[#4A5551] w-2/4">
                    Feature
                  </th>
                  <th className="py-4 px-6 font-title text-[18px] font-semibold text-[#17201D] w-1/4">
                    Free
                  </th>
                  <th className="py-4 px-6 font-title text-[18px] font-semibold text-[#17201D] w-1/4">
                    Plus
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE9E0] text-[16px]">
                <tr className="hover:bg-[#FAF8F4] transition-colors">
                  <td className="py-4 px-6 text-[#17201D] font-medium">Sessions per week</td>
                  <td className="py-4 px-6 text-[#4A5551]">3 sessions</td>
                  <td className="py-4 px-6 text-[#17201D] font-medium">Unlimited</td>
                </tr>
                <tr className="hover:bg-[#FAF8F4] transition-colors">
                  <td className="py-4 px-6 text-[#17201D] font-medium">Topics</td>
                  <td className="py-4 px-6 text-[#4A5551]">Core maths topics</td>
                  <td className="py-4 px-6 text-[#17201D] font-medium">All available topics</td>
                </tr>
                <tr className="hover:bg-[#FAF8F4] transition-colors">
                  <td className="py-4 px-6 text-[#17201D] font-medium">Hints and feedback</td>
                  <td className="py-4 px-6 text-[#17201D]">
                    <span className="inline-flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#0E5A4B] text-[18px] font-bold">
                        check
                      </span>
                      <span>On every step</span>
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[#17201D]">
                    <span className="inline-flex items-center gap-2 font-medium">
                      <span className="material-symbols-outlined text-[#0E5A4B] text-[18px] font-bold">
                        check
                      </span>
                      <span>On every step</span>
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-[#FAF8F4] transition-colors">
                  <td className="py-4 px-6 text-[#17201D] font-medium">Session summaries</td>
                  <td className="py-4 px-6 text-[#17201D]">
                    <span className="inline-flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#0E5A4B] text-[18px] font-bold">
                        check
                      </span>
                      <span>Included</span>
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[#17201D]">
                    <span className="inline-flex items-center gap-2 font-medium">
                      <span className="material-symbols-outlined text-[#0E5A4B] text-[18px] font-bold">
                        check
                      </span>
                      <span>Included</span>
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-[#FAF8F4] transition-colors">
                  <td className="py-4 px-6 text-[#17201D] font-medium">History</td>
                  <td className="py-4 px-6 text-[#4A5551]">30 days</td>
                  <td className="py-4 px-6 text-[#17201D] font-medium">Full history</td>
                </tr>
                <tr className="hover:bg-[#FAF8F4] transition-colors">
                  <td className="py-4 px-6 text-[#17201D] font-medium">Progress overview</td>
                  <td className="py-4 px-6 text-[#4A5551]">Basic session review</td>
                  <td className="py-4 px-6 text-[#17201D]">
                    <span className="inline-flex items-center gap-2 font-medium">
                      <span className="material-symbols-outlined text-[#0E5A4B] text-[18px] font-bold">
                        check
                      </span>
                      <span>Across all topics</span>
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-[#FAF8F4] transition-colors">
                  <td className="py-4 px-6 text-[#17201D] font-medium">Data download</td>
                  <td className="py-4 px-6 text-[#4A5551]">Not included</td>
                  <td className="py-4 px-6 text-[#17201D]">
                    <span className="inline-flex items-center gap-2 font-medium">
                      <span className="material-symbols-outlined text-[#0E5A4B] text-[18px] font-bold">
                        check
                      </span>
                      <span>Any time (JSON / CSV)</span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* For Tutors and Schools Panel */}
      <section className="bg-[#F4F1EA] border border-[#DDD8CC]/70 rounded-[12px] p-8 md:p-10 space-y-6 shadow-sm">
        <div className="space-y-2 max-w-[680px]">
          <h2 className="font-headline text-[28px] font-semibold text-[#17201D]">
            For tutors and schools
          </h2>
          <p className="font-body-md text-[16px] text-[#4A5551]">
            Tools for tutors and classes are planned for later. Join the waitlist and tell us what you need.
          </p>
        </div>
        <form
          className="space-y-3 max-w-[680px]"
          onSubmit={handleWaitlistSubmit}
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              className="h-[44px] px-4 rounded-[8px] bg-[#FFFFFF] border border-[#DDD8CC] text-[14px] text-[#17201D] placeholder:text-[#7D8883] focus:outline-none focus:ring-2 focus:ring-[#0E5A4B] flex-1 transition-all"
              placeholder="name@school.edu or tutor email"
              required
              type="email"
              value={waitlistEmail}
              onChange={(e) => setWaitlistEmail(e.target.value)}
            />
            <button
              className="h-[44px] px-6 rounded-[8px] bg-[#0E5A4B] hover:bg-[#0A4A3E] text-[#FFFFFF] font-label text-[13px] font-medium transition-colors shrink-0 cursor-pointer"
              type="submit"
            >
              Join the waitlist
            </button>
          </div>
          <p className="font-label text-[13px] text-[#7D8883]">
            We will only email when tutor and school features are ready to test.
          </p>
          {waitlistSuccess && (
            <div className="p-3 rounded-[8px] bg-[#DCEFE2] text-[#1E6B3A] font-body-sm text-[14px] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>Thank you. You have been added to the school and tutor preview list.</span>
            </div>
          )}
        </form>
      </section>

      {/* FAQ Accordion Section */}
      <section className="space-y-6">
        <h2 className="font-headline text-[28px] font-semibold text-[#17201D]">
          Frequently asked questions
        </h2>
        <div className="space-y-3">
          {/* Item 1 */}
          <div className="bg-[#FFFFFF] border border-[#DDD8CC]/70 rounded-[8px] overflow-hidden shadow-sm">
            <button
              className="w-full py-5 px-6 flex items-center justify-between text-left text-[#17201D] font-title text-[18px] font-semibold focus:outline-none cursor-pointer"
              onClick={() => toggleFaq(0)}
              type="button"
            >
              <span>Can I try Silo without paying?</span>
              <span
                className={`material-symbols-outlined text-[#4A5551] transition-transform duration-200 ${
                  openFaqs[0] ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            {openFaqs[0] && (
              <div className="px-6 pb-5 pt-0 border-t border-[#DDD8CC]/30">
                <p className="font-body-md text-[16px] text-[#4A5551] leading-relaxed max-w-[800px] mt-3">
                  Yes. The Free plan includes three complete practice sessions each week with full step-by-step reasoning feedback, progressive hints, and session summaries. No credit card is required to create an account.
                </p>
              </div>
            )}
          </div>

          {/* Item 2 */}
          <div className="bg-[#FFFFFF] border border-[#DDD8CC]/70 rounded-[8px] overflow-hidden shadow-sm">
            <button
              className="w-full py-5 px-6 flex items-center justify-between text-left text-[#17201D] font-title text-[18px] font-semibold focus:outline-none cursor-pointer"
              onClick={() => toggleFaq(1)}
              type="button"
            >
              <span>Can I cancel Plus at any time?</span>
              <span
                className={`material-symbols-outlined text-[#4A5551] transition-transform duration-200 ${
                  openFaqs[1] ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            {openFaqs[1] && (
              <div className="px-6 pb-5 pt-0 border-t border-[#DDD8CC]/30">
                <p className="font-body-md text-[16px] text-[#4A5551] leading-relaxed max-w-[800px] mt-3">
                  Yes. You can cancel your subscription at any time from your account settings. You will retain Plus access until the end of your current billing period, after which your account automatically reverts to the Free plan with your past data preserved.
                </p>
              </div>
            )}
          </div>

          {/* Item 3 */}
          <div className="bg-[#FFFFFF] border border-[#DDD8CC]/70 rounded-[8px] overflow-hidden shadow-sm">
            <button
              className="w-full py-5 px-6 flex items-center justify-between text-left text-[#17201D] font-title text-[18px] font-semibold focus:outline-none cursor-pointer"
              onClick={() => toggleFaq(2)}
              type="button"
            >
              <span>How will schools be able to use Silo?</span>
              <span
                className={`material-symbols-outlined text-[#4A5551] transition-transform duration-200 ${
                  openFaqs[2] ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            {openFaqs[2] && (
              <div className="px-6 pb-5 pt-0 border-t border-[#DDD8CC]/30">
                <p className="font-body-md text-[16px] text-[#4A5551] leading-relaxed max-w-[800px] mt-3">
                  Tutor and school features are not available yet. We are actively designing group licences, class scenario assignments, and cohort progress overviews for teachers and tutors. Join the waitlist above to be notified when school pilot trials open.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
