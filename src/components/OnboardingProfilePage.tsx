import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  Info,
  Shield,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface OnboardingProfilePageProps {
  onNavigateHome: () => void;
  onNavigateLogin: () => void;
  onNavigatePrivacyTerms: (section?: string) => void;
  onCompleteOnboarding: (data: {
    role: string;
    ageRange: string;
    firstName: string;
    level: string;
    subject: string;
    purpose?: string;
    firstTopic: string;
    voiceover: boolean;
    parentEmail?: string;
    teachingLocation?: string;
  }) => void;
}

export const OnboardingProfilePage: React.FC<OnboardingProfilePageProps> = ({
  onNavigateHome,
  onNavigateLogin,
  onNavigatePrivacyTerms,
  onCompleteOnboarding,
}) => {
  // Navigation & Flow State
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1 State
  const [role, setRole] = useState<'student' | 'independent' | 'tutor'>('student');
  const [ageRange, setAgeRange] = useState<'under-14' | '14-17' | '18-plus'>('14-17');
  const [firstName, setFirstName] = useState('Amara');
  const [parentEmail, setParentEmail] = useState('');
  const [parentEmailError, setParentEmailError] = useState('');
  const [consentSent, setConsentSent] = useState(false);
  const [teachingLocation, setTeachingLocation] = useState<'A school' | 'Privately' | 'Online' | 'Other'>('A school');

  // Step 2 State
  const [level, setLevel] = useState<'Lower secondary' | 'Senior secondary' | 'University' | 'Other'>('Senior secondary');
  const [subject] = useState<'Mathematics'>('Mathematics');
  const [purpose, setPurpose] = useState<'School exams' | 'A national or international exam' | 'University coursework' | 'Personal learning'>('School exams');

  // Step 3 State
  const [selectedTopic, setSelectedTopic] = useState<
    'Simultaneous equations' | 'Quadratic equations'
  >('Simultaneous equations');
  const [voiceover, setVoiceover] = useState(false);
  const [emailTutorTools, setEmailTutorTools] = useState(true);

  // Submitting state for Step 3
  const [isSettingUp, setIsSettingUp] = useState(false);


  // Form Submissions
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'student' && ageRange === 'under-14') {
      if (!parentEmail || !parentEmail.includes('@')) {
        setParentEmailError('Please enter a valid parent or guardian email address.');
        return;
      }
      setParentEmailError('');
      setConsentSent(true);
      setTimeout(() => {
        setCurrentStep(2);
      }, 900);
      return;
    }
    setCurrentStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSettingUp) return;
    setIsSettingUp(true);

    setTimeout(() => {
      onCompleteOnboarding({
        role,
        ageRange,
        firstName,
        level,
        subject,
        purpose: role !== 'tutor' ? purpose : undefined,
        firstTopic: selectedTopic,
        voiceover,
        parentEmail: ageRange === 'under-14' ? parentEmail : undefined,
        teachingLocation: role === 'tutor' ? teachingLocation : undefined,
      });
    }, 1200);
  };

  const handleBack = () => {
    if (currentStep === 3) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(1);
    } else {
      onNavigateLogin();
    }
  };

  return (
    <div className="bg-[#FAF8F4] font-sans text-base text-[#141D1A] antialiased min-h-screen selection:bg-[#EAF3F0] selection:text-[#0E5A4B]">
      {/* Main Container: Two-Column Split (Matched with Screen 4, 5, 6, 8) */}
      <div className="min-h-screen w-full flex flex-col lg:flex-row">
        {/* LEFT HALF: Form Column */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between min-h-screen px-6 lg:px-12 py-6">
          {/* Header */}
          <header className="w-full flex items-center justify-between">
            <button
              onClick={onNavigateHome}
              aria-label="Silo Home"
              className="font-serif text-2xl font-semibold text-[#004135] tracking-tight hover:opacity-90 transition-opacity cursor-pointer text-left"
            >
              Silo
            </button>
            <div className="flex items-center gap-1.5 text-sm">
              <span className="text-[#4A5551]">Have an inquiry?</span>
              <button
                onClick={() => onNavigatePrivacyTerms('contact')}
                className="font-medium text-[#004135] hover:text-[#0A4A3E] underline underline-offset-4 transition-colors cursor-pointer"
              >
                Institutional Support
              </button>
            </div>
          </header>

          {/* Main Form Content (Centered Form Area - 400px wide directly on paper background) */}
          <main className="w-full max-w-[400px] mx-auto my-auto py-8 flex flex-col justify-center">
            {/* Progress & Step Indicator */}
            <div className="w-full mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0E5A4B]">
                  Step {currentStep} of 3
                </span>
                <span className="text-xs text-[#4A5551]">
                  {currentStep === 1
                    ? 'Profile setup'
                    : currentStep === 2
                    ? 'Curriculum & level'
                    : 'Pick a first topic'}
                </span>
              </div>
              {/* 3-Segment Progress Bar */}
              <div className="w-full grid grid-cols-3 gap-2 h-1.5">
                <div
                  className={`h-full rounded-full transition-colors ${
                    currentStep >= 1 ? 'bg-[#0E5A4B]' : 'bg-[#DDD8CC]'
                  }`}
                />
                <div
                  className={`h-full rounded-full transition-colors ${
                    currentStep >= 2 ? 'bg-[#0E5A4B]' : 'bg-[#DDD8CC]'
                  }`}
                />
                <div
                  className={`h-full rounded-full transition-colors ${
                    currentStep >= 3 ? 'bg-[#0E5A4B]' : 'bg-[#DDD8CC]'
                  }`}
                />
              </div>
            </div>

            {/* ================================================================ */}
            {/* STEP 1: Profile Setup (Learner or Tutor, Under 14 consent path)   */}
            {/* ================================================================ */}
            {currentStep === 1 && (
              <div>
                <h1 className="font-serif text-[28px] font-semibold text-[#141D1A] leading-tight mt-1 mb-2">
                  Tell us a little about you
                </h1>
                <p className="text-base text-[#4A5551] mb-6 leading-relaxed">
                  We use this to set up your first session. You can change it later in Settings.
                </p>

                <form className="w-full flex flex-col" onSubmit={handleStep1Submit}>
                  {/* Group 1: I am */}
                  <fieldset className="w-full mb-5">
                    <legend className="text-sm font-semibold text-[#141D1A] mb-2.5">
                      I am
                    </legend>
                    <div className="flex flex-col gap-2">
                      {/* A student */}
                      <label
                        onClick={() => setRole('student')}
                        className={`relative flex items-center justify-between p-3.5 rounded-lg cursor-pointer transition-all border ${
                          role === 'student'
                            ? 'border-[#0E5A4B] bg-[#ECF6F1]/50'
                            : 'bg-white border-[#DDD8CC] hover:bg-[#FAF8F4]'
                        }`}
                      >
                        <input
                          checked={role === 'student'}
                          onChange={() => setRole('student')}
                          className="sr-only"
                          name="role"
                          type="radio"
                          value="student"
                        />
                        <span
                          className={`text-base ${
                            role === 'student' ? 'font-semibold text-[#141D1A]' : 'text-[#141D1A]'
                          }`}
                        >
                          A student
                        </span>
                        {role === 'student' ? (
                          <span className="w-5 h-5 bg-[#0E5A4B] text-white rounded-full flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </span>
                        ) : (
                          <span className="w-5 h-5 rounded-full border border-[#DDD8CC] shrink-0" />
                        )}
                      </label>

                      {/* Learning on my own */}
                      <label
                        onClick={() => setRole('independent')}
                        className={`relative flex items-center justify-between p-3.5 rounded-lg cursor-pointer transition-all border ${
                          role === 'independent'
                            ? 'border-[#0E5A4B] bg-[#ECF6F1]/50'
                            : 'bg-white border-[#DDD8CC] hover:bg-[#FAF8F4]'
                        }`}
                      >
                        <input
                          checked={role === 'independent'}
                          onChange={() => setRole('independent')}
                          className="sr-only"
                          name="role"
                          type="radio"
                          value="independent"
                        />
                        <span
                          className={`text-base ${
                            role === 'independent' ? 'font-semibold text-[#141D1A]' : 'text-[#141D1A]'
                          }`}
                        >
                          Learning on my own
                        </span>
                        {role === 'independent' ? (
                          <span className="w-5 h-5 bg-[#0E5A4B] text-white rounded-full flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </span>
                        ) : (
                          <span className="w-5 h-5 rounded-full border border-[#DDD8CC] shrink-0" />
                        )}
                      </label>

                      {/* A tutor */}
                      <label
                        onClick={() => setRole('tutor')}
                        className={`relative flex items-center justify-between p-3.5 rounded-lg cursor-pointer transition-all border ${
                          role === 'tutor'
                            ? 'border-[#0E5A4B] bg-[#ECF6F1]/50'
                            : 'bg-white border-[#DDD8CC] hover:bg-[#FAF8F4]'
                        }`}
                      >
                        <input
                          checked={role === 'tutor'}
                          onChange={() => setRole('tutor')}
                          className="sr-only"
                          name="role"
                          type="radio"
                          value="tutor"
                        />
                        <span
                          className={`text-base ${
                            role === 'tutor' ? 'font-semibold text-[#141D1A]' : 'text-[#141D1A]'
                          }`}
                        >
                          A tutor
                        </span>
                        {role === 'tutor' ? (
                          <span className="w-5 h-5 bg-[#0E5A4B] text-white rounded-full flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </span>
                        ) : (
                          <span className="w-5 h-5 rounded-full border border-[#DDD8CC] shrink-0" />
                        )}
                      </label>
                    </div>
                  </fieldset>

                  {/* Group 2: Role-dependent section */}
                  {role === 'tutor' ? (
                    /* 2. Step 1, role "A tutor": field "Where do you teach?" with select: A school, Privately, Online, Other. No age note. */
                    <div className="w-full mb-5">
                      <label
                        className="block text-sm font-semibold text-[#141D1A] mb-2"
                        htmlFor="teaching-location"
                      >
                        Where do you teach?
                      </label>
                      <div className="relative">
                        <select
                          id="teaching-location"
                          name="teachingLocation"
                          value={teachingLocation}
                          onChange={(e) =>
                            setTeachingLocation(
                              e.target.value as 'A school' | 'Privately' | 'Online' | 'Other'
                            )
                          }
                          className="w-full h-11 px-3.5 bg-white text-[#141D1A] text-sm rounded-lg border border-[#DDD8CC] focus:outline-none focus:border-[#0E5A4B] appearance-none cursor-pointer pr-10"
                        >
                          <option value="A school">A school</option>
                          <option value="Privately">Privately</option>
                          <option value="Online">Online</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#4A5551]">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Learner: Group 2: Your age */
                    <>
                      <fieldset className="w-full mb-3.5">
                        <legend className="text-sm font-semibold text-[#141D1A] mb-2">
                          Your age
                        </legend>
                        <div className="h-11 bg-[#E0EAE5] p-1 rounded-lg grid grid-cols-3 gap-1 items-center">
                          <button
                            className={`h-9 text-sm rounded transition-colors flex items-center justify-center cursor-pointer ${
                              ageRange === 'under-14'
                                ? 'bg-white text-[#141D1A] font-semibold shadow-xs'
                                : 'text-[#4A5551] hover:text-[#141D1A] font-medium'
                            }`}
                            type="button"
                            onClick={() => {
                              setAgeRange('under-14');
                              setConsentSent(false);
                            }}
                          >
                            Under 14
                          </button>
                          <button
                            className={`h-9 text-sm rounded transition-colors flex items-center justify-center cursor-pointer ${
                              ageRange === '14-17'
                                ? 'bg-white text-[#141D1A] font-semibold shadow-xs'
                                : 'text-[#4A5551] hover:text-[#141D1A] font-medium'
                            }`}
                            type="button"
                            onClick={() => {
                              setAgeRange('14-17');
                              setConsentSent(false);
                            }}
                          >
                            14 to 17
                          </button>
                          <button
                            className={`h-9 text-sm rounded transition-colors flex items-center justify-center cursor-pointer ${
                              ageRange === '18-plus'
                                ? 'bg-white text-[#141D1A] font-semibold shadow-xs'
                                : 'text-[#4A5551] hover:text-[#141D1A] font-medium'
                            }`}
                            type="button"
                            onClick={() => {
                              setAgeRange('18-plus');
                              setConsentSent(false);
                            }}
                          >
                            18 or over
                          </button>
                        </div>
                      </fieldset>

                      {/* 1. Step 1, age "Under 14": note box in secondary-container colour with shield icon.
                          Text: "Silo needs a parent or guardian to set up accounts for learners under 14. Enter their email and we will send them a short consent request."
                          A field "Parent or guardian email". Continue button reads "Send consent request". */}
                      {ageRange === 'under-14' && (
                        <div className="space-y-4 mb-5 animate-fade-in">
                          <div className="w-full bg-[#F6E3BE] border border-[#E2BC7A] rounded-lg p-3.5 flex items-start gap-2.5">
                            <Shield className="w-5 h-5 text-[#885200] shrink-0 mt-0.5" />
                            <p className="text-[13px] leading-relaxed text-[#5C3800]">
                              Silo needs a parent or guardian to set up accounts for learners under 14. Enter their email and we will send them a short consent request.
                            </p>
                          </div>

                          <div>
                            <label
                              className="block text-sm font-semibold text-[#141D1A] mb-1.5"
                              htmlFor="parent-email"
                            >
                              Parent or guardian email
                            </label>
                            <input
                              className={`w-full h-11 px-3.5 bg-white text-[#141D1A] placeholder:text-[#7D8883] text-sm rounded-lg border focus:outline-none transition-colors ${
                                parentEmailError
                                  ? 'border-[#B3261E] focus:border-[#B3261E]'
                                  : 'border-[#DDD8CC] focus:border-[#0E5A4B]'
                              }`}
                              id="parent-email"
                              name="parentEmail"
                              placeholder="parent@example.com"
                              type="email"
                              value={parentEmail}
                              onChange={(e) => {
                                setParentEmail(e.target.value);
                                if (parentEmailError) setParentEmailError('');
                              }}
                              required
                            />
                            {parentEmailError && (
                              <p className="text-xs text-[#B3261E] mt-1">{parentEmailError}</p>
                            )}
                          </div>

                          {consentSent && (
                            <div className="p-3 bg-[#DCEFE2] border border-[#C5E6D0] text-[#1E6B3A] text-xs rounded-lg flex items-center gap-2">
                              <Check className="w-4 h-4 shrink-0" />
                              <span>Consent request sent to {parentEmail}! Moving to curriculum...</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Age 14-17 note */}
                      {ageRange === '14-17' && (
                        <div className="w-full bg-[#ECF6F1] border border-[#90D4C0]/60 rounded-lg p-3.5 flex items-start gap-2.5 mb-5 animate-fade-in">
                          <Info className="w-[18px] h-[18px] text-[#0E5A4B] shrink-0 mt-0.5" />
                          <p className="text-[13px] leading-relaxed text-[#141D1A]">
                            Because you are under 18, a parent or guardian needs to agree to how Silo uses your information. We collect only what is needed to run your sessions, and we never sell your data.{' '}
                            <button
                              type="button"
                              onClick={() => onNavigatePrivacyTerms('learners-under-18')}
                              className="text-[#0E5A4B] underline font-medium hover:text-[#0A4A3E] transition-colors cursor-pointer"
                            >
                              Read the privacy summary
                            </button>
                            .
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {/* Group 3: First name (Optional) */}
                  <div className="w-full mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <label className="text-sm font-semibold text-[#141D1A]" htmlFor="first-name">
                        First name
                      </label>
                      <span className="text-[11px] bg-[#DBE5E0] text-[#4A5551] px-2 py-0.5 rounded font-normal">
                        Optional
                      </span>
                    </div>
                    <input
                      className="w-full h-11 px-3.5 bg-white text-[#141D1A] placeholder:text-[#7D8883] text-base rounded-lg border border-[#DDD8CC] focus:outline-none focus:border-[#0E5A4B] transition-colors"
                      id="first-name"
                      name="firstName"
                      placeholder="Amara"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  {/* Action Row */}
                  <div className="w-full flex items-center justify-between gap-4 pt-2">
                    <button
                      className="text-sm font-medium text-[#7D8883] hover:text-[#141D1A] py-2 px-1 cursor-pointer transition-colors"
                      type="button"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                    <button
                      className="h-11 px-7 bg-[#0E5A4B] hover:bg-[#0A4A3E] text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs active:scale-[0.99]"
                      type="submit"
                    >
                      <span>
                        {role === 'student' && ageRange === 'under-14'
                          ? 'Send consent request'
                          : 'Continue'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ================================================================ */}
            {/* STEP 2: Curriculum & Goals                                        */}
            {/* 3. Learner: heading "What are you studying?". Level select,      */}
            {/*    Subject chips with "Soon", "What is it for?" optional cards.  */}
            {/* 4. Tutor: heading "What do you teach?". Same Level and Subject.  */}
            {/*    "What is it for?" group is removed.                          */}
            {/* ================================================================ */}
            {currentStep === 2 && (
              <div>
                <h1 className="font-serif text-[28px] font-semibold text-[#141D1A] leading-tight mt-1 mb-2">
                  {role === 'tutor' ? 'What do you teach?' : 'What are you studying?'}
                </h1>
                <p className="text-base text-[#4A5551] mb-6 leading-relaxed">
                  {role === 'tutor'
                    ? 'Choose your curriculum stage to align sample scenarios.'
                    : 'We will personalize practice situations to match your stage.'}
                </p>

                <form className="w-full flex flex-col" onSubmit={handleStep2Submit}>
                  {/* Field: Level */}
                  <div className="w-full mb-5">
                    <label className="block text-sm font-semibold text-[#141D1A] mb-2" htmlFor="level-select">
                      Level
                    </label>
                    <div className="relative">
                      <select
                        id="level-select"
                        name="level"
                        value={level}
                        onChange={(e) =>
                          setLevel(
                            e.target.value as
                              | 'Lower secondary'
                              | 'Senior secondary'
                              | 'University'
                              | 'Other'
                          )
                        }
                        className="w-full h-11 px-3.5 bg-white text-[#141D1A] text-sm rounded-lg border border-[#DDD8CC] focus:outline-none focus:border-[#0E5A4B] appearance-none cursor-pointer pr-10"
                      >
                        <option value="Lower secondary">Lower secondary</option>
                        <option value="Senior secondary">Senior secondary</option>
                        <option value="University">University</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#4A5551]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Group: Subject with selected chip "Mathematics" and three disabled chips with a "Soon" tag */}
                  <div className="w-full mb-5">
                    <label className="block text-sm font-semibold text-[#141D1A] mb-2">
                      Subject
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {/* Active Chip: Mathematics */}
                      <button
                        type="button"
                        className="h-10 px-4 bg-[#0E5A4B] text-white rounded-lg text-sm font-medium flex items-center gap-1.5 cursor-default shadow-xs"
                      >
                        <Check className="w-4 h-4 stroke-[2.5]" />
                        <span>Mathematics</span>
                      </button>

                      {/* Disabled Chips with Soon tag: Physics, Chemistry, Biology */}
                      {['Physics', 'Chemistry', 'Biology'].map((subj) => (
                        <div
                          key={subj}
                          className="h-10 px-3 bg-[#F4F1EA] text-[#7D8883] border border-[#DDD8CC] rounded-lg text-sm font-normal flex items-center gap-2 cursor-not-allowed opacity-60 select-none"
                          title={`${subj} is coming soon`}
                        >
                          <span>{subj}</span>
                          <span className="text-[10px] font-medium uppercase tracking-wider bg-[#EDE9E0] text-[#7D8883] px-1.5 py-0.5 rounded">
                            Soon
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Group "What is it for?" with tag "Optional" as four radio cards (Learner only) */}
                  {role !== 'tutor' && (
                    <fieldset className="w-full mb-6">
                      <div className="flex items-center gap-2 mb-2.5">
                        <legend className="text-sm font-semibold text-[#141D1A]">
                          What is it for?
                        </legend>
                        <span className="text-[11px] bg-[#DBE5E0] text-[#4A5551] px-2 py-0.5 rounded font-normal">
                          Optional
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        {(
                          [
                            'School exams',
                            'A national or international exam',
                            'University coursework',
                            'Personal learning',
                          ] as const
                        ).map((opt) => (
                          <label
                            key={opt}
                            onClick={() => setPurpose(opt)}
                            className={`relative flex items-center justify-between p-3.5 rounded-lg cursor-pointer transition-all border ${
                              purpose === opt
                                ? 'border-[#0E5A4B] bg-[#ECF6F1]/50'
                                : 'bg-white border-[#DDD8CC] hover:bg-[#FAF8F4]'
                            }`}
                          >
                            <input
                              checked={purpose === opt}
                              onChange={() => setPurpose(opt)}
                              className="sr-only"
                              name="purpose"
                              type="radio"
                              value={opt}
                            />
                            <span
                              className={`text-sm ${
                                purpose === opt
                                  ? 'font-semibold text-[#141D1A]'
                                  : 'text-[#141D1A]'
                              }`}
                            >
                              {opt}
                            </span>
                            {purpose === opt ? (
                              <span className="w-5 h-5 bg-[#0E5A4B] text-white rounded-full flex items-center justify-center shrink-0">
                                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                              </span>
                            ) : (
                              <span className="w-5 h-5 rounded-full border border-[#DDD8CC] shrink-0" />
                            )}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  )}

                  {/* Action Row */}
                  <div className="w-full flex items-center justify-between gap-4 pt-2">
                    <button
                      className="text-sm font-medium text-[#7D8883] hover:text-[#141D1A] py-2 px-1 cursor-pointer transition-colors"
                      type="button"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                    <button
                      className="h-11 px-7 bg-[#0E5A4B] hover:bg-[#0A4A3E] text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs active:scale-[0.99]"
                      type="submit"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ================================================================ */}
            {/* STEP 3: Topic Selection & Submitting                             */}
            {/* 5. Learner: heading "Pick a first topic", "You will watch three   */}
            {/*    short clips...", 4 cards 2x2, Voiceover toggle, "Watch your   */}
            {/*    first clip".                                                 */}
            {/* 6. Tutor: heading "Try a clip as a learner would", note          */}
            {/*    "Tutor tools are planned for later." & email checkbox.        */}
            {/* 7. Submitting: spinner and "Setting up", fields disabled.        */}
            {/* ================================================================ */}
            {currentStep === 3 && (
              <div className={isSettingUp ? 'opacity-60 pointer-events-none' : ''}>
                <h1 className="font-serif text-[28px] font-semibold text-[#141D1A] leading-tight mt-1 mb-2">
                  {role === 'tutor'
                    ? 'Try a clip as a learner would'
                    : 'Pick a first topic'}
                </h1>
                <p className="text-base text-[#4A5551] mb-5 leading-relaxed">
                  You will watch three short clips, then answer a few questions.
                </p>

                <form className="w-full flex flex-col" onSubmit={handleStep3Submit}>
                  {/* Two focused topic cards side by side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    {/* Topic 1: Simultaneous equations (Selected by default) */}
                    <div
                      onClick={() => !isSettingUp && setSelectedTopic('Simultaneous equations')}
                      className={`p-3.5 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
                        selectedTopic === 'Simultaneous equations'
                          ? 'border-[#0E5A4B] bg-[#ECF6F1]/40 shadow-xs ring-1 ring-[#0E5A4B]'
                          : 'bg-white border-[#DDD8CC] hover:border-[#0E5A4B]/60'
                      }`}
                    >
                      <div className="w-full h-20 bg-[#F4F1EA] rounded-md mb-2.5 flex items-center justify-center overflow-hidden border border-[#DDD8CC]/50">
                        {/* Intersecting lines illustration */}
                        <svg className="w-14 h-12" viewBox="0 0 48 40" fill="none">
                          <line x1="8" y1="32" x2="40" y2="8" stroke="#885200" strokeWidth="2.2" strokeLinecap="round" />
                          <line x1="8" y1="10" x2="40" y2="30" stroke="#0E5A4B" strokeWidth="2.2" strokeLinecap="round" />
                          <circle cx="24" cy="20" r="3.5" fill="#141D1A" />
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-[#141D1A] leading-snug">
                            Simultaneous equations
                          </span>
                          {selectedTopic === 'Simultaneous equations' && (
                            <span className="w-4 h-4 bg-[#0E5A4B] text-white rounded-full flex items-center justify-center shrink-0">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#0E5A4B] font-medium mt-1">
                          Substitution · Elimination · Word problems
                        </p>
                        <span className="text-[11px] text-[#4A5551] block mt-1">
                          3 short lessons
                        </span>
                      </div>
                    </div>

                    {/* Topic 2: Quadratic equations */}
                    <div
                      onClick={() => !isSettingUp && setSelectedTopic('Quadratic equations')}
                      className={`p-3.5 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
                        selectedTopic === 'Quadratic equations'
                          ? 'border-[#0E5A4B] bg-[#ECF6F1]/40 shadow-xs ring-1 ring-[#0E5A4B]'
                          : 'bg-white border-[#DDD8CC] hover:border-[#0E5A4B]/60'
                      }`}
                    >
                      <div className="w-full h-20 bg-[#F4F1EA] rounded-md mb-2.5 flex items-center justify-center overflow-hidden border border-[#DDD8CC]/50">
                        {/* Parabola illustration */}
                        <svg className="w-14 h-12 text-[#0E5A4B]" viewBox="0 0 48 40" fill="none">
                          <line x1="4" y1="36" x2="44" y2="36" stroke="#DDD8CC" strokeWidth="1.5" />
                          <line x1="24" y1="4" x2="24" y2="36" stroke="#DDD8CC" strokeWidth="1.5" />
                          <path d="M10 10 Q24 38 38 10" stroke="#0E5A4B" strokeWidth="2.4" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-[#141D1A] leading-snug">
                            Quadratic equations
                          </span>
                          {selectedTopic === 'Quadratic equations' && (
                            <span className="w-4 h-4 bg-[#0E5A4B] text-white rounded-full flex items-center justify-center shrink-0">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#0E5A4B] font-medium mt-1">
                          Substitution · Elimination · Word problems
                        </p>
                        <span className="text-[11px] text-[#4A5551] block mt-1">
                          3 short lessons
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Below cards for Learner: Toggle Voiceover (off by default) with helper text "Captions are always on." */}
                  {role !== 'tutor' && (
                    <div className="mb-6 p-3.5 bg-white border border-[#DDD8CC] rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#ECF6F1] text-[#0E5A4B] flex items-center justify-center shrink-0">
                          {voiceover ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                        </div>
                        <div>
                          <span className="font-semibold text-sm text-[#141D1A] block">Voiceover</span>
                          <span className="text-xs text-[#4A5551]">Captions are always on.</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={voiceover}
                        onClick={() => setVoiceover(!voiceover)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                          voiceover ? 'bg-[#0E5A4B]' : 'bg-[#DDD8CC]'
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                            voiceover ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  )}

                  {/* Below cards for Tutor: Note "Tutor tools are planned for later." and checkbox "Email me when tutor tools are available." */}
                  {role === 'tutor' && (
                    <div className="space-y-3 mb-6">
                      <div className="p-3 bg-[#F4F1EA] border border-[#DDD8CC] rounded-lg text-xs text-[#4A5551]">
                        <span className="font-semibold text-[#141D1A]">Note:</span> Tutor tools are planned for later.
                      </div>
                      <label className="flex items-start gap-2.5 text-xs text-[#141D1A] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={emailTutorTools}
                          onChange={(e) => setEmailTutorTools(e.target.checked)}
                          className="mt-0.5 rounded text-[#0E5A4B] focus:ring-[#0E5A4B]"
                        />
                        <span>Email me when tutor tools are available.</span>
                      </label>
                    </div>
                  )}

                  {/* Action Row */}
                  <div className="w-full flex items-center justify-between gap-4 pt-2">
                    <button
                      className="text-sm font-medium text-[#7D8883] hover:text-[#141D1A] py-2 px-1 cursor-pointer transition-colors"
                      type="button"
                      disabled={isSettingUp}
                      onClick={handleBack}
                    >
                      Back
                    </button>
                    <button
                      className="h-11 px-7 bg-[#0E5A4B] hover:bg-[#0A4A3E] text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.99] min-w-[190px]"
                      disabled={isSettingUp}
                      type="submit"
                    >
                      {isSettingUp ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path
                              className="opacity-75"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                              fill="currentColor"
                            />
                          </svg>
                          <span>Setting up</span>
                        </>
                      ) : (
                        <>
                          <span>Watch your first clip</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </main>
        </div>

        {/* RIGHT HALF: Photo Panel with Functional Dynamic Overlay Card */}
        {/* Hidden on mobile screens, visible on lg screens */}
        <div className="hidden lg:block lg:w-1/2 p-4 min-h-screen sticky top-0 h-screen">
          <div className="w-full h-full min-h-[640px] rounded-xl overflow-hidden relative bg-[#E6F0EB]">
            {/* Academic Environment Photo */}
            <img
              alt="Silo AI Academic Environment"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0R0wUqAmSfJkovYsXmmmptGnZltjbSrbPMub4I7FcCwvvTn3MurVUzKh1CQ_2t-pkzycaOBk6G1EFlVHhg1kCnlD6yCaD0uUF3p7sSypzsqdrpv-q2_k7LO9Xtk9tASWf5FAewiYr7tlweQEiFPz-07kv2DAuSNTVJOotbu7G9d0glwXvTfD8C41yuM5zux88NswxhdatdrTVCpHyPXDnjzRZbH555eaw5xuc-lDZhyH2w82ANBCB"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-[#004135]/20 backdrop-blur-[1px]" />

            {/* DYNAMIC FUNCTIONAL OVERLAY CARD (Bottom Left, 16px from panel edges, 280px wide) */}
            <div className="absolute bottom-6 left-6 z-20 w-[290px] bg-white/95 backdrop-blur-md rounded-[12px] p-4 shadow-xl border border-[#DDD8CC]/80 transition-all duration-200">
              {/* Frame 1: Step 1 Overlay Card */}
              {currentStep === 1 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#DDD8CC]/60">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0E5A4B]">
                      Session Profile
                    </span>
                    <span className="text-[10px] text-[#7D8883]">Step 1/3</span>
                  </div>
                  {role === 'tutor' ? (
                    <div className="space-y-1 text-xs text-[#141D1A]">
                      <div className="font-semibold text-sm text-[#0E5A4B]">Role: Tutor</div>
                      <div className="text-[#4A5551]">Teaching: {teachingLocation}</div>
                      <div className="text-[11px] text-[#7D8883] pt-1">Educator profile configured</div>
                    </div>
                  ) : ageRange === 'under-14' ? (
                    <div className="space-y-1 text-xs text-[#141D1A]">
                      <div className="font-semibold text-sm text-[#885200]">Consent: Guardian required</div>
                      <div className="text-[#4A5551]">Learner under 14</div>
                      <div className="text-[11px] text-[#7D8883] pt-1">
                        {parentEmail ? `Target: ${parentEmail}` : 'Awaiting guardian email'}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1 text-xs text-[#141D1A]">
                      <div className="font-semibold text-sm text-[#0E5A4B]">
                        Role: {role === 'student' ? 'Student' : 'Independent'}
                      </div>
                      <div className="text-[#4A5551]">Age: {ageRange === '14-17' ? '14 to 17' : '18 or over'}</div>
                      <div className="text-[11px] text-[#7D8883] pt-1">Learner: {firstName || 'Student'}</div>
                    </div>
                  )}
                </div>
              )}

              {/* Frame 2: Step 2 Overlay Card (Updates: Subject: Mathematics, Level: Senior secondary) */}
              {currentStep === 2 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#DDD8CC]/60">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0E5A4B]">
                      Curriculum Setup
                    </span>
                    <span className="text-[10px] text-[#7D8883]">Step 2/3</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-[#141D1A]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#4A5551]">Subject:</span>
                      <span className="font-semibold text-[#0E5A4B]">{subject}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#4A5551]">Level:</span>
                      <span className="font-semibold text-[#141D1A]">{level}</span>
                    </div>
                    {role !== 'tutor' && (
                      <div className="flex items-center justify-between pt-1 border-t border-[#DDD8CC]/40">
                        <span className="text-[#4A5551]">Focus:</span>
                        <span className="font-medium text-[#141D1A] text-[11px]">{purpose}</span>
                      </div>
                    )}
                    {role === 'tutor' && (
                      <div className="flex items-center justify-between pt-1 border-t border-[#DDD8CC]/40">
                        <span className="text-[#4A5551]">Role:</span>
                        <span className="font-medium text-[#0E5A4B]">Tutor ({teachingLocation})</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Frame 3: Step 3 Overlay Card (Updates: Clip thumbnail, Title, 3 short clips) */}
              {currentStep === 3 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between pb-1 border-b border-[#DDD8CC]/60">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0E5A4B]">
                      Selected Starter Clip
                    </span>
                    <span className="text-[10px] text-[#7D8883]">Step 3/3</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Small clip thumbnail in Silo style */}
                    <div className="w-12 h-10 rounded bg-[#F4F1EA] border border-[#DDD8CC] flex items-center justify-center shrink-0">
                      {selectedTopic === 'Simultaneous equations' ? (
                        <svg className="w-8 h-7" viewBox="0 0 48 40" fill="none">
                          <line x1="8" y1="32" x2="40" y2="8" stroke="#885200" strokeWidth="2.5" />
                          <line x1="8" y1="10" x2="40" y2="30" stroke="#0E5A4B" strokeWidth="2.5" />
                          <circle cx="24" cy="20" r="3" fill="#141D1A" />
                        </svg>
                      ) : (
                        <svg className="w-8 h-7 text-[#0E5A4B]" viewBox="0 0 48 40" fill="none">
                          <path d="M10 10 Q24 38 38 10" stroke="#0E5A4B" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-[#141D1A] leading-tight">
                        {selectedTopic}
                      </h4>
                      <p className="text-[11px] text-[#0E5A4B] font-medium mt-0.5">
                        Substitution · Elimination · Word problems
                      </p>
                      <p className="text-[10px] text-[#4A5551]">3 short clips</p>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#7D8883] pt-1.5 border-t border-[#DDD8CC]/40 flex items-center justify-between">
                    <span>Captions: Always on</span>
                    <span>Voiceover: {voiceover ? 'Enabled' : 'Off'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Quote Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-[#1F2926]/90 via-[#1F2926]/40 to-transparent pointer-events-none">
              <blockquote className="max-w-[680px] font-serif text-[28px] font-semibold text-[#E9F3EE] leading-snug">
                “Cultivating disciplined intelligence through foundational rigor and empirical research.”
              </blockquote>
              <p className="mt-2 text-xs text-[#E9F3EE]/80 uppercase tracking-widest font-medium">
                Silo Institute of Autonomous Systems
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
