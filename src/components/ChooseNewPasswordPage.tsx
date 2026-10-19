import React, { useState } from 'react';
import {
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
} from 'lucide-react';

interface ChooseNewPasswordPageProps {
  onNavigateHome: () => void;
  onNavigateLogin: () => void;
  onNavigatePrivacyTerms: (section?: string) => void;
  onPasswordResetSuccess?: (message: string) => void;
}

type AuthFrameState =
  | 'link_sent'
  | 'choose_password'
  | 'submitting'
  | 'password_changed'
  | 'link_expired';

export const ChooseNewPasswordPage: React.FC<ChooseNewPasswordPageProps> = ({
  onNavigateHome,
  onNavigateLogin,
  onNavigatePrivacyTerms,
  onPasswordResetSuccess,
}) => {
  // Frame state: default to filled & valid Choose Password as requested
  const [activeFrame, setActiveFrame] = useState<AuthFrameState>('choose_password');

  // Form field states
  const [newPassword, setNewPassword] = useState('CorrectHorseBattery!');
  const [confirmPassword, setConfirmPassword] = useState('CorrectHorseBattery!');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countdown, setCountdown] = useState(30);

  // Live validation
  const hasMinLength = newPassword.length >= 8;
  const matchesConfirmation = Boolean(
    newPassword.length >= 8 && newPassword === confirmPassword
  );
  const isFormValid = hasMinLength && matchesConfirmation;

  const handleSavePassword = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isFormValid) return;

    setActiveFrame('submitting');
    setTimeout(() => {
      setActiveFrame('password_changed');
      if (onPasswordResetSuccess) {
        onPasswordResetSuccess('Your password has been changed.');
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#17201D] font-sans antialiased selection:bg-[#DCEBE6] selection:text-[#0E5A4B]">
      {/* Top Frame Switcher Bar to preview all four requested states */}
      <div className="w-full bg-[#FFFFFF] border-b border-[#DDD8CC] px-4 py-2 flex items-center justify-between text-xs overflow-x-auto z-30">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[#4A5551] font-medium mr-2">Password reset states:</span>
          {(
            [
              { id: 'link_sent', label: '1. Link sent' },
              { id: 'choose_password', label: '2. Set password (valid)' },
              { id: 'submitting', label: '2. Submitting' },
              { id: 'password_changed', label: '3. Password changed' },
              { id: 'link_expired', label: '4. Link expired' },
            ] as const
          ).map((frame) => {
            const isActive = activeFrame === frame.id;
            return (
              <button
                key={frame.id}
                type="button"
                onClick={() => setActiveFrame(frame.id)}
                className={`px-2.5 py-1 rounded-[8px] font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#DCEBE6] text-[#0E5A4B]'
                    : 'text-[#4A5551] hover:text-[#17201D] hover:bg-[#FAF8F4]'
                }`}
              >
                {frame.label}
              </button>
            );
          })}
        </div>
        <div className="text-[#4A5551] text-[11px] hidden sm:block shrink-0">
          Screen 7 · Split desktop 1280px
        </div>
      </div>

      {/* Main Container: Two-Column Split */}
      <div className="flex-1 flex w-full">
        {/* LEFT HALF: Form Column */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between px-6 py-6 md:px-12 md:py-8 lg:px-16 min-h-[calc(100vh-41px)]">
          {/* Top Bar inside Left Column */}
          <header className="flex items-center justify-between w-full">
            <button
              onClick={onNavigateHome}
              aria-label="Silo Home"
              className="font-serif text-2xl font-semibold text-[#17201D] tracking-tight hover:opacity-90 transition-opacity cursor-pointer text-left"
            >
              Silo
            </button>
            <button
              onClick={onNavigateLogin}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#4A5551] hover:text-[#17201D] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#7D8883]" strokeWidth={1.5} />
              <span>Back to log in</span>
            </button>
          </header>

          {/* Center Form Area: Identical 400px width and vertical position in every frame */}
          <main className="my-auto py-12 flex justify-center w-full">
            <div className="w-full max-w-[400px]">
              {/* ========================================================
                  FRAME 1: LINK SENT
                 ======================================================== */}
              {activeFrame === 'link_sent' && (
                <div className="space-y-6">
                  <div>
                    <h1 className="font-serif text-[30px] font-semibold text-[#17201D] tracking-tight">
                      Check your email
                    </h1>
                    <p className="text-[15px] text-[#4A5551] mt-2 leading-relaxed">
                      If an account exists for <span className="text-[#17201D] font-medium">amara.okafor@example.com</span>, we have sent a link to reset your password. The link works for 30 minutes.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveFrame('choose_password')}
                      className="w-full h-11 bg-white border border-[#DDD8CC] hover:bg-[#FAF8F4] text-[#17201D] text-sm font-medium rounded-[8px] transition-colors cursor-pointer flex items-center justify-center"
                    >
                      Open email app
                    </button>

                    <button
                      type="button"
                      disabled
                      className="w-full text-center text-sm text-[#4A5551] font-medium py-1.5 cursor-not-allowed opacity-75"
                    >
                      Resend in 0:{countdown < 10 ? `0${countdown}` : countdown}
                    </button>
                  </div>

                  <div className="pt-2">
                    <p className="text-[13px] text-[#4A5551] leading-relaxed">
                      Not there? Check your spam folder or{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setNewPassword('');
                          setConfirmPassword('');
                          setActiveFrame('choose_password');
                        }}
                        className="text-[#0E5A4B] hover:underline font-medium cursor-pointer"
                      >
                        try a different address
                      </button>
                      .
                    </p>
                  </div>
                </div>
              )}

              {/* ========================================================
                  FRAME 2: CHOOSE A NEW PASSWORD (FILLED & VALID) & SUBMITTING
                 ======================================================== */}
              {(activeFrame === 'choose_password' || activeFrame === 'submitting') && (
                <div>
                  <div className="mb-6">
                    <h1 className="font-serif text-[30px] font-semibold text-[#17201D] tracking-tight">
                      Choose a new password
                    </h1>
                    <p className="text-[15px] text-[#4A5551] mt-2 leading-relaxed">
                      Use a password you have not used on Silo before.
                    </p>
                  </div>

                  <form onSubmit={handleSavePassword} className="space-y-4">
                    {/* New password field */}
                    <div>
                      <label
                        className="block text-sm font-medium text-[#17201D] mb-1.5"
                        htmlFor="new-password"
                      >
                        New password
                      </label>
                      <div className="relative flex items-center">
                        <input
                          id="new-password"
                          name="new-password"
                          type={showNewPassword ? 'text' : 'password'}
                          placeholder="Create a password"
                          value={newPassword}
                          disabled={activeFrame === 'submitting'}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className={`w-full h-11 pl-3.5 pr-10 border rounded-[8px] text-sm text-[#17201D] placeholder:text-[#7D8883] transition-colors focus:outline-none ${
                            activeFrame === 'submitting'
                              ? 'bg-[#FAF8F4] border-[#DDD8CC] opacity-60 cursor-not-allowed'
                              : 'bg-white border-[#DDD8CC] focus:border-[#0E5A4B]'
                          }`}
                        />
                        <button
                          type="button"
                          disabled={activeFrame === 'submitting'}
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 text-[#7D8883] hover:text-[#17201D] transition-colors focus:outline-none cursor-pointer disabled:opacity-50"
                          aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-4 h-4" strokeWidth={1.5} />
                          ) : (
                            <Eye className="w-4 h-4" strokeWidth={1.5} />
                          )}
                        </button>
                      </div>

                      {/* Live rules checklist under first field */}
                      <div className="flex flex-col gap-2 mt-3">
                        <div
                          className={`flex items-center gap-2 text-xs font-medium transition-colors ${
                            hasMinLength ? 'text-[#0E5A4B]' : 'text-[#4A5551]'
                          }`}
                        >
                          {hasMinLength ? (
                            <div className="w-4 h-4 rounded-full bg-[#DCEFE2] text-[#0E5A4B] flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3" strokeWidth={2.4} />
                            </div>
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-[#DDD8CC] bg-white shrink-0" />
                          )}
                          <span>At least 8 characters</span>
                        </div>

                        <div
                          className={`flex items-center gap-2 text-xs font-medium transition-colors ${
                            matchesConfirmation ? 'text-[#0E5A4B]' : 'text-[#4A5551]'
                          }`}
                        >
                          {matchesConfirmation ? (
                            <div className="w-4 h-4 rounded-full bg-[#DCEFE2] text-[#0E5A4B] flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3" strokeWidth={2.4} />
                            </div>
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-[#DDD8CC] bg-white shrink-0" />
                          )}
                          <span>Matches the confirmation</span>
                        </div>
                      </div>
                    </div>

                    {/* Confirm new password field */}
                    <div className="pt-1">
                      <label
                        className="block text-sm font-medium text-[#17201D] mb-1.5"
                        htmlFor="confirm-password"
                      >
                        Confirm new password
                      </label>
                      <div className="relative flex items-center">
                        <input
                          id="confirm-password"
                          name="confirm-password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Repeat password"
                          value={confirmPassword}
                          disabled={activeFrame === 'submitting'}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`w-full h-11 pl-3.5 pr-10 border rounded-[8px] text-sm text-[#17201D] placeholder:text-[#7D8883] transition-colors focus:outline-none ${
                            activeFrame === 'submitting'
                              ? 'bg-[#FAF8F4] border-[#DDD8CC] opacity-60 cursor-not-allowed'
                              : 'bg-white border-[#DDD8CC] focus:border-[#0E5A4B]'
                          }`}
                        />
                        <button
                          type="button"
                          disabled={activeFrame === 'submitting'}
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 text-[#7D8883] hover:text-[#17201D] transition-colors focus:outline-none cursor-pointer disabled:opacity-50"
                          aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" strokeWidth={1.5} />
                          ) : (
                            <Eye className="w-4 h-4" strokeWidth={1.5} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Primary Button, full width */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={!isFormValid || activeFrame === 'submitting'}
                        className="w-full h-11 bg-[#0E5A4B] hover:bg-[#0A4337] active:bg-[#08362C] text-white rounded-[8px] text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {activeFrame === 'submitting' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                            <span>Saving</span>
                          </>
                        ) : (
                          <span>Save new password</span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ========================================================
                  FRAME 3: PASSWORD CHANGED
                 ======================================================== */}
              {activeFrame === 'password_changed' && (
                <div className="space-y-6">
                  {/* Success block with green check icon in pale green tile */}
                  <div className="w-10 h-10 rounded-[8px] bg-[#DCEFE2] text-[#0E5A4B] flex items-center justify-center">
                    <Check className="w-5 h-5" strokeWidth={2.2} />
                  </div>

                  <div>
                    <h1 className="font-serif text-[30px] font-semibold text-[#17201D] tracking-tight">
                      Your password has been changed
                    </h1>
                    <p className="text-[15px] text-[#4A5551] mt-2 leading-relaxed">
                      You can now log in with your new password. We have signed you out of other devices.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={onNavigateLogin}
                      className="w-full h-11 bg-[#0E5A4B] hover:bg-[#0A4337] text-white rounded-[8px] text-sm font-medium transition-colors cursor-pointer flex items-center justify-center"
                    >
                      Log in
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================
                  FRAME 4: LINK EXPIRED OR ALREADY USED
                 ======================================================== */}
              {activeFrame === 'link_expired' && (
                <div className="space-y-6">
                  {/* Alert icon in a pale red tile */}
                  <div className="w-10 h-10 rounded-[8px] bg-[#FCE8E6] text-[#C5221F] flex items-center justify-center">
                    <AlertCircle className="w-5 h-5" strokeWidth={2} />
                  </div>

                  <div>
                    <h1 className="font-serif text-[30px] font-semibold text-[#17201D] tracking-tight">
                      This link has expired
                    </h1>
                    <p className="text-[15px] text-[#4A5551] mt-2 leading-relaxed">
                      Reset links work once and expire after 30 minutes. Request a new one to continue.
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveFrame('link_sent')}
                      className="w-full h-11 bg-[#0E5A4B] hover:bg-[#0A4337] text-white rounded-[8px] text-sm font-medium transition-colors cursor-pointer flex items-center justify-center"
                    >
                      Request a new link
                    </button>

                    <button
                      type="button"
                      onClick={onNavigateLogin}
                      className="w-full text-center text-sm font-medium text-[#0E5A4B] hover:underline cursor-pointer"
                    >
                      Back to log in
                    </button>
                  </div>
                </div>
              )}
            </div>
          </main>

          {/* Minimal Bottom Footer in Left Column */}
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

        {/* RIGHT HALF: Photo Panel with Overlay Card (stays unchanged in every frame) */}
        <div className="hidden lg:block lg:w-1/2 p-4 min-h-[calc(100vh-41px)] sticky top-[41px] h-[calc(100vh-41px)]">
          <div className="relative w-full h-full min-h-[640px] rounded-[12px] overflow-hidden bg-[#F4F1EA] border border-[#DDD8CC]">
            {/* Editorial Documentary Photo */}
            <img
              alt="Student studying with notepad and phone at desk"
              className="absolute inset-0 w-full h-full object-cover object-center"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEb39MLI1GUc8vt95mviWkEtgZJFYVrKfdSxEOBPxuVtOpyYEWxIaLHMWlOOcdrBcxbiPDTccpYSvs0jL1snD0gFx7kaJ3qKGiNcGhJZ3Tkf3LMvovZ-OTdJgLOtWlXn0W8WeXuWHPTvtnDtf6Xxjp_rpKTTTaxGSSoPlZPA8V1lNIh9oKzoWI-ouzAy8ZZ3nfP7IY4_9qovqLj6m_uHqpMf6bY92fVAPLl151V7FGijqfFDVc-dy0"
              referrerPolicy="no-referrer"
            />
            {/* Overlay Card: Bottom Left, 12px from panel edges, 280px wide */}
            <div className="absolute bottom-3 left-3 z-20 w-[280px] bg-white/95 backdrop-blur-md rounded-[8px] p-3.5 border border-[#DDD8CC]/80">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#DDD8CC]/60 mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0E5A4B]">
                  Account Security
                </span>
                <span className="flex items-center gap-1 text-[11px] text-[#0E5A4B] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0E5A4B]" />
                  Verified link
                </span>
              </div>
              <p className="text-xs text-[#17201D] font-medium leading-snug">
                Choose a strong password to protect your study notes and problem history across Simultaneous and Quadratic equations.
              </p>
              <div className="mt-2 pt-1.5 border-t border-[#DDD8CC]/40 flex items-center justify-between text-[11px]">
                <span className="text-[#0E5A4B] font-medium">Substitution · Elimination · Word problems</span>
                <span className="text-[#4A5551]">Step 2/2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
