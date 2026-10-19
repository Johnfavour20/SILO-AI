/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { FeatureBand } from './components/FeatureBand.tsx';
import { BenefitsSection } from './components/BenefitsSection.tsx';
import { FeedbackCloserLookSection } from './components/FeedbackCloserLookSection.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { CtaBanner } from './components/CtaBanner.tsx';
import { Footer } from './components/Footer.tsx';
import { PricingPage } from './components/PricingPage.tsx';
import { PrivacyTermsPage } from './components/PrivacyTermsPage.tsx';
import { SignUpPage } from './components/SignUpPage.tsx';
import { LogInPage } from './components/LogInPage.tsx';
import { ForgotPasswordPage } from './components/ForgotPasswordPage.tsx';
import { ChooseNewPasswordPage } from './components/ChooseNewPasswordPage.tsx';
import { OnboardingProfilePage } from './components/OnboardingProfilePage.tsx';
import { DashboardPage } from './components/DashboardPage.tsx';
import { TopicPage } from './components/TopicPage.tsx';
import { LessonClipPlayerPage } from './components/LessonClipPlayerPage.tsx';
import { GuidedQuestionPage } from './components/GuidedQuestionPage.tsx';
import { PracticeSubstitutionPage } from './components/PracticeSubstitutionPage.tsx';
import { TopicPickerModal } from './components/TopicPickerModal.tsx';
import { ReportModal } from './components/ReportModal.tsx';

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    | 'home'
    | 'pricing'
    | 'privacy-terms'
    | 'signup'
    | 'login'
    | 'forgot-password'
    | 'choose-new-password'
    | 'onboarding'
    | 'dashboard'
    | 'topic-page'
    | 'lesson-clip'
    | 'guided-question'
    | 'practice-substitution'
  >('home');
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleStartSession = (_scenarioId?: string) => {
    setIsTopicModalOpen(false);
    setCurrentPage('topic-page');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreFeedback = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById('feedback-preview');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('feedback-preview');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChoosePlus = () => {
    showToast('Silo Plus preview: Subscription checkout will open prior to official release.');
  };

  const handleOpenPrivacyTerms = (section?: string) => {
    setCurrentPage('privacy-terms');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (section) {
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  const handleAuthSuccess = (email: string, message: string) => {
    setUserEmail(email);
    showToast(message);
    setCurrentPage('dashboard');
  };

  // Standalone full screen for Sign-up (Screen 4)
  if (currentPage === 'signup') {
    return (
      <>
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#17201D] text-white text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
            <span className="material-symbols-outlined text-[16px] text-[#1E6B3A]">
              check_circle
            </span>
            <span>{toastMessage}</span>
          </div>
        )}
        <SignUpPage
          onNavigateHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateLogin={() => {
            setCurrentPage('login');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigatePrivacyTerms={handleOpenPrivacyTerms}
          onSignUpSuccess={(email) => {
            setUserEmail(email);
            setCurrentPage('onboarding');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showToast('Account created! Tell us a little about you.');
          }}
        />
      </>
    );
  }

  // Standalone full screen for Log-in
  if (currentPage === 'login') {
    return (
      <>
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#17201D] text-white text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
            <span className="material-symbols-outlined text-[16px] text-[#1E6B3A]">
              check_circle
            </span>
            <span>{toastMessage}</span>
          </div>
        )}
        <LogInPage
          onNavigateHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateSignUp={() => {
            setCurrentPage('signup');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateForgotPassword={() => {
            setCurrentPage('forgot-password');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigatePrivacyTerms={handleOpenPrivacyTerms}
          onLogInSuccess={(email) => {
            handleAuthSuccess(email, `Welcome back, ${email}!`);
          }}
        />
      </>
    );
  }

  // Standalone full screen for Forgot Password (Screen 6)
  if (currentPage === 'forgot-password') {
    return (
      <>
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#17201D] text-white text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
            <span className="material-symbols-outlined text-[16px] text-[#1E6B3A]">
              check_circle
            </span>
            <span>{toastMessage}</span>
          </div>
        )}
        <ForgotPasswordPage
          onNavigateHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateLogin={() => {
            setCurrentPage('login');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateChooseNewPassword={() => {
            setCurrentPage('choose-new-password');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </>
    );
  }

  // Standalone full screen for Choose a new password (Screen 7)
  if (currentPage === 'choose-new-password') {
    return (
      <>
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#17201D] text-white text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
            <span className="material-symbols-outlined text-[16px] text-[#1E6B3A]">
              check_circle
            </span>
            <span>{toastMessage}</span>
          </div>
        )}
        <ChooseNewPasswordPage
          onNavigateHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateLogin={() => {
            setCurrentPage('login');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigatePrivacyTerms={handleOpenPrivacyTerms}
          onPasswordResetSuccess={(msg) => {
            showToast(msg);
          }}
        />
      </>
    );
  }

  // Standalone full screen for Onboarding Step 1 (Profile Setup)
  if (currentPage === 'onboarding') {
    return (
      <>
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#17201D] text-white text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
            <span className="material-symbols-outlined text-[16px] text-[#1E6B3A]">
              check_circle
            </span>
            <span>{toastMessage}</span>
          </div>
        )}
        <OnboardingProfilePage
          onNavigateHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateLogin={() => {
            setCurrentPage('login');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigatePrivacyTerms={handleOpenPrivacyTerms}
          onCompleteOnboarding={(data) => {
            showToast(`Profile configured! Welcome, ${data.firstName || 'Student'}`);
            setCurrentPage('dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </>
    );
  }

  // Standalone full screen for Learner Dashboard & Workspace (Screen 10 with 240px sidebar)
  if (currentPage === 'dashboard') {
    return (
      <>
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#17201D] text-white text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
            <span className="material-symbols-outlined text-[16px] text-[#1E6B3A]">
              check_circle
            </span>
            <span>{toastMessage}</span>
          </div>
        )}
        <DashboardPage
          userEmail={userEmail}
          onNavigateHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onStartSession={(id) => handleStartSession(id)}
          onOpenTopicPicker={() => {
            setCurrentPage('topic-page');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenReportModal={() => setIsReportModalOpen(true)}
          onSignOut={() => {
            setUserEmail(null);
            showToast('Signed out of Silo');
            setCurrentPage('home');
          }}
        />
        <TopicPickerModal
          isOpen={isTopicModalOpen}
          onClose={() => setIsTopicModalOpen(false)}
          onSelectScenario={(id) => handleStartSession(id)}
        />
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
        />
      </>
    );
  }

  // Standalone Screen 11: Focused Topic Page (Screen 11 with top bar wordmark & Back to dashboard)
  if (currentPage === 'topic-page') {
    return (
      <>
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#17201D] text-white text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
            <span className="material-symbols-outlined text-[16px] text-[#1E6B3A]">
              check_circle
            </span>
            <span>{toastMessage}</span>
          </div>
        )}
        <TopicPage
          onBackToDashboard={() => {
            setCurrentPage('dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectLesson={(_id) => {
            setCurrentPage('lesson-clip');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenPractice={() => {
            setCurrentPage('practice-substitution');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </>
    );
  }

  // Standalone Screen 12: Focused Lesson Clip Player (Substitution clip player)
  if (currentPage === 'lesson-clip') {
    return (
      <>
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#17201D] text-white text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
            <span className="material-symbols-outlined text-[16px] text-[#1E6B3A]">
              check_circle
            </span>
            <span>{toastMessage}</span>
          </div>
        )}
        <LessonClipPlayerPage
          onExit={() => {
            setCurrentPage('topic-page');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenReport={() => setIsReportModalOpen(true)}
          onNextStep={() => {
            showToast('Advancing to Step 3: Guided question');
            setCurrentPage('guided-question');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
        />
      </>
    );
  }

  // Standalone Screen: Step 3 Guided Question (Substitution)
  if (currentPage === 'guided-question') {
    return (
      <>
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#17201D] text-white text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
            <span className="material-symbols-outlined text-[16px] text-[#1E6B3A]">
              check_circle
            </span>
            <span>{toastMessage}</span>
          </div>
        )}
        <GuidedQuestionPage
          onExit={() => {
            setCurrentPage('topic-page');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onBackToClip={() => {
            setCurrentPage('lesson-clip');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenPractice={() => {
            setCurrentPage('practice-substitution');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenReport={() => setIsReportModalOpen(true)}
          onNextStep={() => {
            showToast('Step 3 completed! Ready for Step 4 (Your turn).');
            setCurrentPage('topic-page');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
        />
      </>
    );
  }

  // Standalone Screen: Practice: Substitution
  if (currentPage === 'practice-substitution') {
    return (
      <>
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#17201D] text-white text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
            <span className="material-symbols-outlined text-[16px] text-[#1E6B3A]">
              check_circle
            </span>
            <span>{toastMessage}</span>
          </div>
        )}
        <PracticeSubstitutionPage
          onBackToTopic={() => {
            setCurrentPage('topic-page');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onGoToOverview={() => {
            setCurrentPage('topic-page');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenQuestion={(qId) => {
            showToast(`Opening Question ${qId} in solver`);
            setCurrentPage('guided-question');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#17201D] font-body-md antialiased selection:bg-[#DCEBE6] selection:text-[#0E5A4B]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#17201D] text-white text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
          <span className="material-symbols-outlined text-[16px] text-[#1E6B3A]">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Logged in student notice */}
      {userEmail && (
        <div className="bg-[#DCEBE6] text-[#083D32] text-xs py-1.5 px-6 text-center border-b border-[#DDD8CC]/50 flex items-center justify-center gap-3">
          <span>Signed in as <strong>{userEmail}</strong></span>
          <button
            onClick={() => {
              setUserEmail(null);
              showToast('Logged out');
            }}
            className="underline text-xs hover:text-black cursor-pointer"
          >
            Sign out
          </button>
        </div>
      )}

      {/* 1. Top Navigation Bar */}
      <Header
        currentPage={currentPage === 'pricing' ? 'pricing' : 'home'}
        userEmail={userEmail}
        onNavigateHome={() => {
          setCurrentPage('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigatePricing={() => {
          setCurrentPage('pricing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateDashboard={() => {
          setCurrentPage('dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onStartSession={() => handleStartSession('fundraiser-stall')}
        onOpenLogin={() => {
          setCurrentPage('login');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenTopics={() => {
          setCurrentPage('topic-page');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="w-full pt-20 min-h-screen">
        {currentPage === 'pricing' ? (
          /* Dedicated Pricing Page */
          <PricingPage
            onStartSession={() => handleStartSession('fundraiser-stall')}
            onChoosePlus={handleChoosePlus}
          />
        ) : currentPage === 'privacy-terms' ? (
          /* Dedicated Privacy and terms Page */
          <PrivacyTermsPage
            onOpenPrivacyConcern={() => setIsReportModalOpen(true)}
            onOpenSettings={() => showToast('Student privacy & data controls: Session history export is ready.')}
          />
        ) : (
          /* Home / Landing Page */
          <>
            <HeroSection
              onStartSession={() => {
                setCurrentPage('topic-page');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreFeedback={handleExploreFeedback}
            />

            <FeatureBand
              onStartSession={() => handleStartSession('fundraiser-stall')}
              onOpenTopics={() => {
                setCurrentPage('topic-page');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreFeedback={handleExploreFeedback}
            />

            <BenefitsSection />

            <FeedbackCloserLookSection
              onReportProblem={() => setIsReportModalOpen(true)}
              onTryFullSession={() => handleStartSession('fundraiser-stall')}
            />

            <FaqSection />

            <CtaBanner onStartSession={() => handleStartSession('fundraiser-stall')} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigateHome={() => {
          setCurrentPage('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPrivacyTerms={handleOpenPrivacyTerms}
      />

      {/* Modals & Dialogs */}
      <TopicPickerModal
        isOpen={isTopicModalOpen}
        onClose={() => setIsTopicModalOpen(false)}
        onSelectScenario={(id) => handleStartSession(id)}
      />

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
}
