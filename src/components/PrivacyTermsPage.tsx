import React, { useEffect, useState } from 'react';

interface PrivacyTermsPageProps {
  onOpenPrivacyConcern: () => void;
  onOpenSettings: () => void;
}

const SECTIONS = [
  { id: 'summary', label: 'Summary', title: '1. Summary' },
  { id: 'what-we-collect', label: 'What we collect', title: '2. What we collect' },
  { id: 'how-we-use-it', label: 'How we use it', title: '3. How we use it' },
  { id: 'learners-under-18', label: 'Learners under 18', title: '4. Learners under 18' },
  { id: 'ai-feedback', label: 'AI-generated feedback', title: '5. AI-generated feedback' },
  { id: 'retention', label: 'How long we keep data', title: '6. How long we keep data' },
  { id: 'your-choices', label: 'Your choices', title: '7. Your choices' },
  { id: 'terms-of-use', label: 'Terms of use', title: '8. Terms of use' },
  { id: 'contact', label: 'Contact', title: '9. Contact' },
];

export const PrivacyTermsPage: React.FC<PrivacyTermsPageProps> = ({
  onOpenPrivacyConcern,
  onOpenSettings,
}) => {
  const [activeSection, setActiveSection] = useState<string>('summary');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const sectionId = SECTIONS[i].id;
        const el = document.getElementById(sectionId);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionId);
          return;
        }
      }
      setActiveSection(SECTIONS[0].id);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="max-w-[1120px] mx-auto px-4 md:px-12 py-12 md:py-16 w-full">
      {/* Page Header */}
      <header className="w-full pb-10 border-b border-[#DDD8CC]">
        <div className="max-w-[680px]">
          <h1 className="font-display text-[40px] font-semibold text-[#17201D] tracking-tight leading-[1.15]">
            Privacy and terms
          </h1>
          <p className="font-body-md text-[16px] text-[#4A5551] mt-3 leading-relaxed">
            Last updated 17 October 2026 · This page explains what Silo collects, why, and the choices you have.
          </p>
        </div>
      </header>

      {/* Mobile Navigation Drawer / Dropdown */}
      <div className="block lg:hidden my-6">
        <label
          className="block font-label text-[12px] text-[#4A5551] uppercase tracking-wider mb-2 font-semibold"
          htmlFor="section-select"
        >
          Jump to section
        </label>
        <div className="relative">
          <select
            id="section-select"
            value={`#${activeSection}`}
            onChange={(e) => {
              const targetId = e.target.value.replace('#', '');
              scrollToSection(targetId);
            }}
            className="w-full bg-white border border-[#DDD8CC] rounded-lg px-4 py-3 font-body-sm text-[14px] text-[#17201D] focus:outline-none focus:border-[#0E5A4B] appearance-none cursor-pointer"
          >
            {SECTIONS.map((sec) => (
              <option key={sec.id} value={`#${sec.id}`}>
                {sec.title}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#7D8883] text-[20px]">
            expand_more
          </span>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mt-8 lg:mt-12">
        {/* Sticky Sidebar (Table of Contents) */}
        <aside className="hidden lg:block w-[240px] shrink-0 sticky top-28 self-start">
          <nav aria-label="Table of contents" className="flex flex-col">
            <p className="font-label text-[12px] text-[#4A5551] uppercase tracking-wider font-semibold mb-4">
              On this page
            </p>
            <ul className="flex flex-col space-y-1 text-sm border-l border-[#DDD8CC]/60">
              {SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <li key={sec.id}>
                    <button
                      onClick={() => scrollToSection(sec.id)}
                      className={`block w-full text-left py-1.5 pl-3 -ml-[1px] border-l-2 text-[14px] transition-colors cursor-pointer ${
                        isActive
                          ? 'border-[#0E5A4B] text-[#0E5A4B] font-semibold'
                          : 'border-transparent text-[#4A5551] hover:text-[#17201D]'
                      }`}
                    >
                      {sec.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Reading Column (Strict 680px constraint) */}
        <article className="w-full max-w-[680px] flex flex-col space-y-12">
          {/* 1. Summary Box */}
          <section className="scroll-mt-28" id="summary">
            <div className="bg-[#F4F1EA] border border-[#DDD8CC] rounded-[12px] p-6 md:p-8">
              <h2 className="font-title text-[20px] text-[#17201D] font-semibold mb-4">
                Summary in plain language
              </h2>
              <ul className="flex flex-col space-y-3 font-body-md text-[16px] text-[#17201D]">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#0E5A4B] text-[20px] mt-0.5 shrink-0 select-none">
                    check_circle
                  </span>
                  <span>We collect only what is needed to run your practice sessions and track your progress.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#0E5A4B] text-[20px] mt-0.5 shrink-0 select-none">
                    check_circle
                  </span>
                  <span>We do not sell your data or license personal information to third-party advertisers.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#0E5A4B] text-[20px] mt-0.5 shrink-0 select-none">
                    check_circle
                  </span>
                  <span>Pedagogical feedback is generated by AI models and can occasionally contain errors.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#0E5A4B] text-[20px] mt-0.5 shrink-0 select-none">
                    check_circle
                  </span>
                  <span>Learners under 18 require parent or guardian consent before standard account use.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#0E5A4B] text-[20px] mt-0.5 shrink-0 select-none">
                    check_circle
                  </span>
                  <span>You can export a copy of your session data or delete your account at any time.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 2. What We Collect */}
          <section className="scroll-mt-28" id="what-we-collect">
            <h2 className="font-headline text-[28px] text-[#17201D] font-semibold mb-4">
              What we collect
            </h2>
            <div className="font-body-lg text-[18px] text-[#17201D] space-y-4 leading-relaxed">
              <p>
                Account details: your email address, an optional preferred display name, and your selected age band or study level. We do not ask for government IDs or home addresses.
              </p>
              <p>
                Practice session data: the questions you attempt, your step-by-step mathematical answers, hint requests, time spent on reasoning steps, and the generated feedback.
              </p>
              <p>
                Technical diagnostic data: browser type, basic error logs, and response latency to detect system outages and ensure stable service on low-bandwidth connections.
              </p>
            </div>
          </section>

          {/* 3. How We Use It */}
          <section className="scroll-mt-28" id="how-we-use-it">
            <h2 className="font-headline text-[28px] text-[#17201D] font-semibold mb-4">
              How we use it
            </h2>
            <div className="font-body-lg text-[18px] text-[#17201D] space-y-4 leading-relaxed">
              <p>
                To run your interactive practice sessions and provide immediate feedback on each line of mathematical reasoning.
              </p>
              <p>
                To maintain your personal history, topic mastery indicators, and session summaries so you know what to revisit.
              </p>
              <p>
                To diagnose service errors and refine prompt stability.
              </p>
              <p>
                Explicit negative constraint: Silo never uses student submissions for commercial behavioral advertising, and our feedback is never used to determine grades, university admissions, or any high-stakes academic decisions.
              </p>
            </div>
          </section>

          {/* 4. Learners Under 18 */}
          <section className="scroll-mt-28" id="learners-under-18">
            <h2 className="font-headline text-[28px] text-[#17201D] font-semibold mb-4">
              Learners under 18
            </h2>
            <div className="font-body-lg text-[18px] text-[#17201D] space-y-4 leading-relaxed">
              <p>
                A parent or legal guardian must review these terms and confirm consent during onboarding for learners under 18.
              </p>
              <p>
                Minimal data collection policy: we strictly limit data collection to learning inputs.
              </p>
              <p>
                Safeguarding: No learner profile is publicly indexed, no student data is shared with other learners, and no automated scores are published outside the individual learner's private account.
              </p>
            </div>
          </section>

          {/* 5. AI-Generated Feedback */}
          <section className="scroll-mt-28" id="ai-feedback">
            <h2 className="font-headline text-[28px] text-[#17201D] font-semibold mb-4">
              AI-generated feedback
            </h2>
            <div className="font-body-lg text-[18px] text-[#17201D] space-y-4 leading-relaxed">
              <p>
                Silo uses large language models calibrated specifically for secondary school mathematics. While designed to evaluate mathematical logic step by step, AI models can make mistakes, misinterpret unusual algebraic notation, or offer suboptimal hints.
              </p>
              <p>
                Accountability: Every feedback card includes a "Report a problem" link. When reported, our team reviews the flagged step to prevent similar errors in future sessions. Silo is a supportive study companion, not an official marking authority.
              </p>
            </div>
          </section>

          {/* 6. How Long We Keep Data */}
          <section className="scroll-mt-28" id="retention">
            <h2 className="font-headline text-[28px] text-[#17201D] font-semibold mb-4">
              How long we keep data
            </h2>
            <p className="font-body-lg text-[18px] text-[#17201D] mb-6 leading-relaxed">
              The retention windows below reflect our initial operational practices and are placeholders to be confirmed prior to public launch.
            </p>
            {/* Data Retention Table */}
            <div className="w-full bg-white border border-[#DDD8CC] rounded-lg overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-body-sm text-[14px]">
                  <thead>
                    <tr className="bg-[#F4F1EA] border-b border-[#DDD8CC] text-[#17201D] font-title font-semibold text-xs uppercase tracking-wider">
                      <th className="py-3 px-4 sm:px-6" scope="col">
                        Data type
                      </th>
                      <th className="py-3 px-4 sm:px-6" scope="col">
                        Kept for
                      </th>
                      <th className="py-3 px-4 sm:px-6" scope="col">
                        Deleted when
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DDD8CC] text-[#17201D]">
                    <tr>
                      <td className="py-3.5 px-4 sm:px-6 font-medium">Active session answers</td>
                      <td className="py-3.5 px-4 sm:px-6 text-[#4A5551]">30 days (Free) / Indefinite (Plus)</td>
                      <td className="py-3.5 px-4 sm:px-6 text-[#4A5551]">On account deletion or manual purge</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 sm:px-6 font-medium">Account credentials (email)</td>
                      <td className="py-3.5 px-4 sm:px-6 text-[#4A5551]">Duration of active account</td>
                      <td className="py-3.5 px-4 sm:px-6 text-[#4A5551]">Within 14 days of account deletion</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 sm:px-6 font-medium">Diagnostic and error logs</td>
                      <td className="py-3.5 px-4 sm:px-6 text-[#4A5551]">90 days</td>
                      <td className="py-3.5 px-4 sm:px-6 text-[#4A5551]">Automatically rotated and purged</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 sm:px-6 font-medium">Problem reports and flags</td>
                      <td className="py-3.5 px-4 sm:px-6 text-[#4A5551]">180 days</td>
                      <td className="py-3.5 px-4 sm:px-6 text-[#4A5551]">Anonymized after pedagogical review</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 7. Your Choices */}
          <section className="scroll-mt-28" id="your-choices">
            <h2 className="font-headline text-[28px] text-[#17201D] font-semibold mb-4">
              Your choices
            </h2>
            <div className="font-body-lg text-[18px] text-[#17201D] space-y-4 leading-relaxed">
              <p>
                Download your data: You can download a structured copy (JSON / CSV) of your full session history and answers at any time.
              </p>
              <p>
                Delete your account: You can initiate immediate account deletion, which wipes your email, profile, and session records.
              </p>
              <p>
                Accessibility and display: You can adjust type scale, language preferences, and enable reduced motion in your preferences.
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenSettings}
                  className="inline-flex items-center text-[#0E5A4B] font-medium underline underline-offset-4 hover:text-[#0A4A3E] font-label text-[13px] cursor-pointer"
                >
                  Open Settings and privacy
                </button>
              </div>
            </div>
          </section>

          {/* 8. Terms of Use */}
          <section className="scroll-mt-28" id="terms-of-use">
            <h2 className="font-headline text-[28px] text-[#17201D] font-semibold mb-4">
              Terms of use
            </h2>
            <div className="font-body-lg text-[18px] text-[#17201D] space-y-4 leading-relaxed">
              <p>
                Acceptable use: Silo is intended solely for personal educational practice. Automated scraping, reverse engineering of prompt chains, and abusive submissions are prohibited.
              </p>
              <p>
                No guarantee of exam results: Silo provides guided reasoning practice, but does not guarantee specific exam grades, qualifications, or standardized test scores.
              </p>
              <p>
                Not an official exam repository: Scenarios and practice questions are original pedagogical exercises and are not official past papers from any exam board.
              </p>
            </div>
          </section>

          {/* 9. Contact */}
          <section className="scroll-mt-28" id="contact">
            <h2 className="font-headline text-[28px] text-[#17201D] font-semibold mb-4">
              Contact
            </h2>
            <div className="font-body-lg text-[18px] text-[#17201D] space-y-4 leading-relaxed">
              <p>
                For privacy inquiries, data deletion requests, or questions regarding these terms, contact our team at{' '}
                <a
                  className="text-[#0E5A4B] underline underline-offset-4"
                  href="mailto:privacy@silo-maths.org"
                >
                  privacy@silo-maths.org
                </a>
                .
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenPrivacyConcern}
                  className="inline-flex items-center text-[#0E5A4B] font-medium underline underline-offset-4 hover:text-[#0A4A3E] font-label text-[13px] cursor-pointer"
                >
                  Report a privacy concern
                </button>
              </div>
            </div>
          </section>

          {/* Footer / Back to top actions */}
          <div className="pt-8 border-t border-[#DDD8CC] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              className="inline-flex items-center gap-2 text-[#0E5A4B] font-label text-[13px] hover:text-[#0A4A3E] transition-colors select-none w-fit cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                arrow_upward
              </span>
              <span>Back to top</span>
            </button>
            <span className="font-body-sm text-[14px] text-[#4A5551]">
              Document reference: SL-LEG-2026-V1
            </span>
          </div>
        </article>
      </div>
    </div>
  );
};
