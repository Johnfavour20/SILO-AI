import React, { useState } from 'react';

interface HeaderProps {
  currentPage: 'home' | 'pricing' | 'dashboard';
  userEmail?: string | null;
  onNavigateHome: () => void;
  onNavigatePricing: () => void;
  onNavigateDashboard?: () => void;
  onStartSession: () => void;
  onOpenLogin: () => void;
  onOpenTopics: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  userEmail,
  onNavigateHome,
  onNavigatePricing,
  onNavigateDashboard,
  onStartSession,
  onOpenLogin,
  onOpenTopics,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleHowItWorksClick = () => {
    setMobileMenuOpen(false);
    if (currentPage !== 'home') {
      onNavigateHome();
      setTimeout(() => {
        const el = document.getElementById('how-it-works');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('how-it-works');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#FAF8F4]/90 backdrop-blur-md border-b border-[#DDD8CC]/50">
      <div className="h-20 max-w-[1120px] mx-auto px-6 flex items-center justify-between">
        {/* Brand & Desktop Navigation */}
        <div className="flex items-center gap-10">
          <button
            onClick={onNavigateHome}
            className="font-headline text-[24px] font-semibold text-[#17201D] tracking-tight hover:text-[#0E5A4B] transition-colors cursor-pointer text-left"
          >
            Silo
          </button>
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={handleHowItWorksClick}
              className={`font-body-sm text-[15px] transition-colors cursor-pointer text-left ${
                currentPage === 'home'
                  ? 'text-[#4A5551] hover:text-[#17201D]'
                  : 'text-[#4A5551] hover:text-[#17201D]'
              }`}
            >
              How it works
            </button>
            <button
              onClick={onNavigatePricing}
              aria-current={currentPage === 'pricing' ? 'page' : undefined}
              className={`font-body-sm text-[15px] transition-colors cursor-pointer text-left ${
                currentPage === 'pricing'
                  ? 'text-[#0E5A4B] font-semibold'
                  : 'text-[#4A5551] hover:text-[#17201D]'
              }`}
            >
              Pricing
            </button>
            <button
              onClick={onOpenTopics}
              className="font-body-sm text-[15px] text-[#4A5551] hover:text-[#17201D] transition-colors cursor-pointer text-left"
            >
              Scenarios
            </button>
            {onNavigateDashboard && (
              <button
                onClick={onNavigateDashboard}
                className={`font-body-sm text-[15px] transition-colors cursor-pointer text-left ${
                  currentPage === 'dashboard'
                    ? 'text-[#0E5A4B] font-semibold'
                    : 'text-[#4A5551] hover:text-[#17201D]'
                }`}
              >
                Dashboard
              </button>
            )}
          </nav>
        </div>

        {/* Right side CTA actions */}
        <div className="hidden md:flex items-center gap-5">
          {userEmail && onNavigateDashboard ? (
            <button
              onClick={onNavigateDashboard}
              className="font-body-sm text-[14px] text-[#0E5A4B] font-medium bg-[#E8F2EF] px-3 py-1.5 rounded-lg border border-[#DDD8CC]/70 hover:bg-[#DCEBE6] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-[#0E5A4B]" />
              <span>Workspace</span>
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="font-body-sm text-[15px] text-[#17201D] hover:text-[#0E5A4B] font-medium transition-colors cursor-pointer"
            >
              Log in
            </button>
          )}
          <button
            onClick={onStartSession}
            className="h-11 px-6 bg-[#0E5A4B] hover:bg-[#0A4A3E] text-white font-body-sm text-[15px] font-medium rounded-lg flex items-center justify-center transition-colors cursor-pointer shadow-sm active:scale-[0.98]"
          >
            Start free session
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={onStartSession}
            className="h-9 px-4 bg-[#0E5A4B] text-white text-[13px] font-medium rounded-md cursor-pointer"
          >
            Start session
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#17201D] rounded-lg hover:bg-[#EDE9E0]"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F4] border-b border-[#DDD8CC] px-6 py-4 space-y-3">
          <button
            onClick={handleHowItWorksClick}
            className="block w-full text-left py-2 text-[15px] text-[#4A5551] hover:text-[#17201D]"
          >
            How it works
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigatePricing();
            }}
            className={`block w-full text-left py-2 text-[15px] ${
              currentPage === 'pricing'
                ? 'text-[#0E5A4B] font-semibold'
                : 'text-[#4A5551] hover:text-[#17201D]'
            }`}
          >
            Pricing
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTopics();
            }}
            className="block w-full text-left py-2 text-[15px] text-[#4A5551] hover:text-[#17201D]"
          >
            Browse Scenarios
          </button>
          {onNavigateDashboard && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateDashboard();
              }}
              className={`block w-full text-left py-2 text-[15px] ${
                currentPage === 'dashboard'
                  ? 'text-[#0E5A4B] font-semibold'
                  : 'text-[#4A5551] hover:text-[#17201D]'
              }`}
            >
              Dashboard & Workspace
            </button>
          )}
          <div className="pt-3 border-t border-[#DDD8CC]/60 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="text-[15px] text-[#17201D] font-medium"
            >
              Log in
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartSession();
              }}
              className="h-10 px-5 bg-[#0E5A4B] text-white text-[14px] font-medium rounded-lg"
            >
              Start free session
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
