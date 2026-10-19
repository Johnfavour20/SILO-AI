import React, { useState } from 'react';

interface ForgotPasswordPageProps {
  onNavigateHome: () => void;
  onNavigateLogin: () => void;
  onNavigateChooseNewPassword: () => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({
  onNavigateHome,
  onNavigateLogin,
  onNavigateChooseNewPassword,
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] flex flex-col justify-between selection:bg-[#EAF3F0] selection:text-[#0E5A4B] text-[#17201D]">
      {/* Top Header */}
      <header className="w-full border-b border-[#DDD8CC]/70 bg-[#FAF8F4]">
        <div className="max-w-[1120px] mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            aria-label="Silo Home"
            className="font-headline font-semibold text-[22px] tracking-tight text-[#17201D] hover:opacity-85 transition-opacity cursor-pointer text-left"
          >
            Silo
          </button>
          <div className="flex items-center gap-1.5 text-sm text-[#4A5551]">
            <span>Remember your password?</span>
            <button
              onClick={onNavigateLogin}
              className="text-[#0E5A4B] font-medium hover:underline focus-visible:underline underline-offset-4 cursor-pointer"
            >
              Log in
            </button>
          </div>
        </div>
      </header>

      {/* Main Content: Centered on Paper Background (No image, No box/card border) */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 md:py-16">
        <div className="w-full max-w-[400px] mx-auto">
          <div className="mb-8">
            <h1 className="font-headline text-[30px] leading-tight font-semibold text-[#17201D] mb-2">
              Reset your password
            </h1>
            <p className="text-base text-[#4A5551] font-normal leading-relaxed">
              Enter the email you signed up with. If an account exists, we will send you a link to set a new password.
            </p>
          </div>

          {submitted ? (
            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-[30px] font-semibold text-[#17201D] tracking-tight">
                  Check your email
                </h1>
                <p className="text-[15px] text-[#4A5551] mt-2 leading-relaxed">
                  If an account exists for <span className="text-[#17201D] font-medium">{email || 'amara.okafor@example.com'}</span>, we have sent a link to reset your password. The link works for 30 minutes.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={onNavigateChooseNewPassword}
                  className="w-full h-11 bg-white border border-[#DDD8CC] hover:bg-[#FAF8F4] text-[#17201D] text-sm font-medium rounded-[8px] transition-colors cursor-pointer flex items-center justify-center"
                >
                  Open email app
                </button>

                <button
                  type="button"
                  disabled
                  className="w-full text-center text-sm text-[#4A5551] font-medium py-1.5 cursor-not-allowed opacity-75"
                >
                  Resend in 0:30
                </button>
              </div>

              <div className="pt-2">
                <p className="text-[13px] text-[#4A5551] leading-relaxed">
                  Not there? Check your spam folder or{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setEmail('');
                    }}
                    className="text-[#0E5A4B] hover:underline font-medium cursor-pointer"
                  >
                    try a different address
                  </button>
                  .
                </p>
              </div>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-[#17201D] mb-1.5" htmlFor="reset-email">
                  Email
                </label>
                <input
                  autoComplete="email"
                  className="w-full h-11 px-3.5 bg-white border border-[#DDD8CC] rounded-[8px] text-sm text-[#17201D] placeholder:text-[#9A978E] focus:outline-none focus:border-[#0E5A4B] transition-colors"
                  id="reset-email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  type="email"
                  autoFocus
                />
              </div>

              <button
                className="w-full h-11 bg-[#0E5A4B] hover:bg-[#0A4337] active:bg-[#08362C] text-white text-sm font-medium rounded-[8px] transition-colors flex items-center justify-center cursor-pointer shadow-xs"
                type="submit"
              >
                Send reset link
              </button>
            </form>
          )}

          <div className="text-center mt-6">
            <button
              onClick={onNavigateLogin}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0E5A4B] hover:underline cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              <span>Back to log in</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
