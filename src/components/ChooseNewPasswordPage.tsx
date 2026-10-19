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
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF8F4] text-[#17201D] font-sans antialiased selection:bg-[#DCEBE6] selection:text-[#0E5A4B]">
      {/* Top Header */}
      <header className="w-full border-b border-[#DDD8CC]/70 bg-[#FAF8F4]">
        <div className="max-w-[1120px] mx-auto px-6 h-16 flex items-center justify-between">
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
        </div>
      </header>

      {/* Main Content: Centered on Paper Background (No RHS panel) */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 md:py-16">
        <div className="w-full max-w-[400px] mx-auto">
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
