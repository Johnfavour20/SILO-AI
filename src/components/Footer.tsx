import React from 'react';

interface FooterProps {
  onNavigateHome: () => void;
  onOpenPrivacyTerms: (section?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onOpenPrivacyTerms,
}) => {
  return (
    <footer className="w-full bg-[#FAF8F4] border-t border-[#DDD8CC] py-8 text-[#4A5551] text-[14px]">
      <div className="max-w-[1120px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-headline text-[20px] font-semibold text-[#17201D]">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#0E5A4B] transition-colors cursor-pointer text-left"
          >
            Silo
          </button>
        </div>
        <nav className="flex items-center gap-6">
          <button
            onClick={() => onOpenPrivacyTerms('summary')}
            className="hover:text-[#17201D] transition-colors cursor-pointer text-left"
          >
            Privacy
          </button>
          <button
            onClick={() => onOpenPrivacyTerms('terms-of-use')}
            className="hover:text-[#17201D] transition-colors cursor-pointer text-left"
          >
            Terms
          </button>
          <button
            onClick={() => onOpenPrivacyTerms('contact')}
            className="hover:text-[#17201D] transition-colors cursor-pointer text-left"
          >
            Contact
          </button>
        </nav>
      </div>
    </footer>
  );
};
