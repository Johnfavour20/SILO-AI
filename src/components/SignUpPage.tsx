import React, { useState } from 'react';

interface SignUpPageProps {
  onNavigateHome: () => void;
  onNavigateLogin: () => void;
  onNavigatePrivacyTerms: (section?: string) => void;
  onSignUpSuccess: (email: string) => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({
  onNavigateHome,
  onNavigateLogin,
  onNavigatePrivacyTerms,
  onSignUpSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Live validation rules
  const hasMinLength = password.length >= 8;

  const emailPrefix = email.trim().split('@')[0]?.toLowerCase() || '';
  const doesNotContainEmail = Boolean(
    password.length > 0 &&
      (emailPrefix.length < 3 || !password.toLowerCase().includes(emailPrefix)) &&
      (!email || !password.toLowerCase().includes(email.toLowerCase()))
  );

  const isFormValid = email.includes('@') && hasMinLength && doesNotContainEmail && agreedToTerms;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    onSignUpSuccess(email);
  };

  const handleGoogleSignIn = () => {
    onSignUpSuccess('student.demo@school.edu');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] flex flex-col justify-between selection:bg-[#EAF3F0] selection:text-[#0E5A4B] text-[#17201D]">
      <div className="flex-1 flex w-full">
        {/* LEFT HALF: Form Column */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between px-6 py-6 md:px-12 md:py-8 lg:px-16 min-h-screen">
          {/* Top Bar inside Left Column */}
          <header className="flex items-center justify-between w-full">
            <button
              onClick={onNavigateHome}
              aria-label="Silo Home"
              className="font-headline font-semibold text-[22px] tracking-tight text-[#17201D] hover:opacity-85 transition-opacity cursor-pointer text-left"
            >
              Silo
            </button>
            <div className="flex items-center gap-1.5 text-sm text-[#4A5551]">
              <span>Already have an account?</span>
              <button
                onClick={onNavigateLogin}
                className="text-[#0E5A4B] font-medium hover:underline focus-visible:underline underline-offset-4 cursor-pointer"
              >
                Log in
              </button>
            </div>
          </header>

          {/* Main Form Content */}
          <main className="my-auto py-10 flex justify-center w-full">
            <div className="w-full max-w-[400px]">
              <div className="mb-6">
                <h1 className="font-headline text-[28px] leading-tight font-semibold text-[#17201D] tracking-tight mb-2">
                  Create your account
                </h1>
                <p className="text-[#4A5551] text-base leading-relaxed">
                  Start practising maths with scenarios and feedback on your reasoning.
                </p>
              </div>

              {/* Google Auth Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full h-[44px] border border-[#DDD8CC] rounded-[8px] bg-white hover:bg-[#F4F1EA] active:bg-[#EDE9E0] text-[#17201D] font-medium text-sm flex items-center justify-center gap-3 transition-colors cursor-pointer"
              >
                <svg aria-hidden="true" className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.87c2.26-2.09 3.67-5.17 3.67-9.15z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.05c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.28v3.16C3.26 21.31 7.34 24 12 24z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.27 14.24A7.18 7.18 0 0 1 4.89 12c0-.78.14-1.54.38-2.24V6.6H1.28A11.967 11.967 0 0 0 0 12c0 1.92.45 3.74 1.28 5.4l3.99-3.16z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.69 1.28 6.6l3.99 3.16c.95-2.85 3.6-4.96 6.73-4.96z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Divider with lowercase "or" */}
              <div className="relative my-6 flex items-center justify-center">
                <div className="w-full border-t border-[#DDD8CC]" />
                <span className="absolute bg-[#FAF8F4] px-3 text-xs text-[#4A5551] font-medium">
                  or
                </span>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-[#17201D] mb-1.5" htmlFor="email">
                    Email
                  </label>
                  <input
                    autoComplete="email"
                    className="w-full h-[44px] px-3.5 bg-white text-[#17201D] placeholder:text-[#4A5551]/60 border border-[#DDD8CC] rounded-[8px] text-sm focus:border-[#0E5A4B] focus:outline-none transition-colors"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    type="email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#17201D] mb-1.5" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      autoComplete="new-password"
                      className="w-full h-[44px] pl-3.5 pr-11 bg-white text-[#17201D] placeholder:text-[#4A5551]/60 border border-[#DDD8CC] rounded-[8px] text-sm focus:border-[#0E5A4B] focus:outline-none transition-colors"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      required
                      type={showPassword ? 'text' : 'password'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#4A5551] hover:text-[#17201D] focus:outline-none cursor-pointer"
                    >
                      {showPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Password validation checklist */}
                <div className="py-2">
                  <span className="font-label text-xs uppercase tracking-wider text-[#4A5551] font-semibold block mb-2">
                    Password requirements
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#4A5551]">
                    <li className="flex items-center gap-2">
                      {hasMinLength ? (
                        <svg className="w-4 h-4 text-[#0E5A4B] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-[#DDD8CC] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="9" strokeWidth="2" />
                        </svg>
                      )}
                      <span className={hasMinLength ? 'text-[#0E5A4B] font-medium' : 'text-[#4A5551]'}>
                        At least 8 characters
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      {doesNotContainEmail ? (
                        <svg className="w-4 h-4 text-[#0E5A4B] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-[#DDD8CC] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="9" strokeWidth="2" />
                        </svg>
                      )}
                      <span className={doesNotContainEmail ? 'text-[#0E5A4B] font-medium' : 'text-[#4A5551]'}>
                        Does not contain your email address
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="pt-1 pb-1">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      className="mt-0.5 w-4 h-4 rounded border-[#DDD8CC] text-[#0E5A4B] focus:ring-[#0E5A4B] accent-[#0E5A4B] shrink-0"
                      id="terms"
                      name="terms"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      required
                      type="checkbox"
                    />
                    <span className="text-xs text-[#4A5551] leading-relaxed">
                      I agree to the{' '}
                      <button
                        type="button"
                        onClick={() => onNavigatePrivacyTerms('terms-of-use')}
                        className="text-[#0E5A4B] underline underline-offset-2 hover:opacity-85 font-medium cursor-pointer"
                      >
                        Terms
                      </button>{' '}
                      and the{' '}
                      <button
                        type="button"
                        onClick={() => onNavigatePrivacyTerms('summary')}
                        className="text-[#0E5A4B] underline underline-offset-2 hover:opacity-85 font-medium cursor-pointer"
                      >
                        Privacy policy
                      </button>
                    </span>
                  </label>
                </div>

                <button
                  className="w-full h-[44px] bg-[#0E5A4B] hover:bg-[#0A4337] active:bg-[#08362C] text-white font-medium text-sm rounded-[8px] transition-colors flex items-center justify-center mt-2 cursor-pointer shadow-xs"
                  type="submit"
                >
                  Create account
                </button>
              </form>

              <div className="mt-4 text-center">
                <p className="text-xs text-[#6B7571]">
                  We only ask for your age in the next step.
                </p>
              </div>
            </div>
          </main>

          {/* Minimal Bottom Footer */}
          <footer className="flex items-center justify-between w-full text-xs text-[#4A5551] pt-4">
            <span>&copy; 2025 Silo</span>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigatePrivacyTerms('summary')}
                className="hover:underline cursor-pointer"
              >
                Privacy
              </button>
              <button
                type="button"
                onClick={() => onNavigatePrivacyTerms('terms-of-use')}
                className="hover:underline cursor-pointer"
              >
                Terms
              </button>
              <button
                type="button"
                onClick={() => onNavigatePrivacyTerms('contact')}
                className="hover:underline cursor-pointer"
              >
                Contact
              </button>
            </div>
          </footer>
        </div>

        {/* RIGHT HALF: Photo Panel with Functional Topic Overlay Card (Screen 4: Simultaneous equations) */}
        <div className="hidden lg:block lg:w-1/2 p-4 min-h-screen sticky top-0 h-screen">
          <div className="relative w-full h-full min-h-[640px] rounded-[12px] overflow-hidden bg-[#F4F1EA] border border-[#DDD8CC]">
            <img
              alt="High school students studying mathematics collaboratively"
              className="absolute inset-0 w-full h-full object-cover object-center"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEb39MLI1GUc8vt95mviWkEtgZJFYVrKfdSxEOBPxuVtOpyYEWxIaLHMWlOOcdrBcxbiPDTccpYSvs0jL1snD0gFx7kaJ3qKGiNcGhJZ3Tkf3LMvovZ-OTdJgLOtWlXn0W8WeXuWHPTvtnDtf6Xxjp_rpKTTTaxGSSoPlZPA8V1lNIh9oKzoWI-ouzAy8ZZ3nfP7IY4_9qovqLj6m_uHqpMf6bY92fVAPLl151V7FGijqfFDVc-dy0"
              referrerPolicy="no-referrer"
            />
            {/* Functional Overlay Card: Bottom Left, 16px from panel edges, 280px wide */}
            <div className="absolute bottom-4 left-4 z-20 w-[290px] bg-white/95 backdrop-blur-md rounded-[12px] p-4 border border-[#DDD8CC]/80 shadow-lg">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#DDD8CC]/60 mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0E5A4B]">
                  Simultaneous equations
                </span>
                <span className="flex items-center gap-1 text-[11px] text-[#0E5A4B] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0E5A4B]" />
                  Active topic
                </span>
              </div>
              <p className="text-xs text-[#17201D] font-medium leading-snug">
                Substitution, elimination, and word problems with two unknowns.
              </p>
              <div className="mt-2.5 pt-2 border-t border-[#DDD8CC]/40 flex items-center justify-between text-[11px]">
                <span className="text-[#0E5A4B] font-medium">Substitution · Elimination · Word problems</span>
                <span className="text-[#4A5551]">3 lessons</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
