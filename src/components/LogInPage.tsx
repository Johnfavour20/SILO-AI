import React, { useState } from 'react';

interface LogInPageProps {
  onNavigateHome: () => void;
  onNavigateSignUp: () => void;
  onNavigateForgotPassword: () => void;
  onNavigatePrivacyTerms: (section?: string) => void;
  onLogInSuccess: (email: string) => void;
}

export const LogInPage: React.FC<LogInPageProps> = ({
  onNavigateHome,
  onNavigateSignUp,
  onNavigateForgotPassword,
  onNavigatePrivacyTerms,
  onLogInSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onLogInSuccess(email);
  };

  const handleGoogleSignIn = () => {
    onLogInSuccess('student.demo@school.edu');
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
            <span>New to Silo?</span>
            <button
              onClick={onNavigateSignUp}
              className="text-[#0E5A4B] font-medium hover:underline focus-visible:underline underline-offset-4 cursor-pointer"
            >
              Create an account
            </button>
          </div>
        </div>
      </header>

      {/* Main Form Content: Centered */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 md:py-16">
        <div className="w-full max-w-[400px] mx-auto">
              <div className="mb-6">
                <h1 className="font-headline text-[30px] leading-tight font-semibold text-[#17201D] tracking-tight mb-2">
                  Log in to your account
                </h1>
                <p className="text-[#4A5551] text-base leading-relaxed">
                  Continue your mathematical practice with scenario feedback and step-by-step guidance.
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
                  <label className="block text-sm font-medium text-[#17201D] mb-1.5" htmlFor="login-email">
                    Email
                  </label>
                  <input
                    autoComplete="email"
                    className="w-full h-[44px] px-3.5 bg-white text-[#17201D] placeholder:text-[#4A5551]/60 border border-[#DDD8CC] rounded-[8px] text-sm focus:border-[#0E5A4B] focus:outline-none transition-colors"
                    id="login-email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    type="email"
                  />
                </div>

                <div>
                  <div className="mb-1.5">
                    <label className="block text-sm font-medium text-[#17201D]" htmlFor="login-password">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="current-password"
                      className="w-full h-[44px] pl-3.5 pr-11 bg-white text-[#17201D] placeholder:text-[#4A5551]/60 border border-[#DDD8CC] rounded-[8px] text-sm focus:border-[#0E5A4B] focus:outline-none transition-colors"
                      id="login-password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
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

                <button
                  className="w-full h-[44px] bg-[#0E5A4B] hover:bg-[#0A4337] active:bg-[#08362C] text-white font-medium text-sm rounded-[8px] transition-colors flex items-center justify-center mt-3 cursor-pointer shadow-xs"
                  type="submit"
                >
                  Log in
                </button>
              </form>
            </div>
          </main>

      {/* Minimal Bottom Footer */}
      <footer className="w-full border-t border-[#DDD8CC]/70 py-6 bg-[#FAF8F4]">
        <div className="max-w-[1120px] mx-auto px-6 flex items-center justify-between text-xs text-[#4A5551]">
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
        </div>
      </footer>
    </div>
  );
};
