import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  AlertCircle,
  RotateCcw,
  Loader2,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Layers,
  X,
  LifeBuoy,
} from 'lucide-react';

export type GuidedFrameId =
  | 'interactive'
  | '1_typing'
  | '2_checking'
  | '3_mistake_feedback'
  | '4_hint_2'
  | '5_correct'
  | '6_still_stuck'
  | '7_could_not_check'
  | '8_your_turn'
  | '9_mobile';

interface GuidedQuestionPageProps {
  onExit: () => void;
  onOpenReport?: () => void;
  onNextStep?: () => void;
  onBackToClip?: () => void;
  onOpenPractice?: () => void;
  initialFrame?: GuidedFrameId;
}

export const GuidedQuestionPage: React.FC<GuidedQuestionPageProps> = ({
  onExit,
  onOpenReport,
  onNextStep,
  onBackToClip,
  onOpenPractice,
  initialFrame = 'interactive',
}) => {
  const [activeFrame, setActiveFrame] = useState<GuidedFrameId>(initialFrame);
  const [isDockOpen, setIsDockOpen] = useState(true);

  // Form & Interaction states
  const [inputValue, setInputValue] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [isHintCardOpen, setIsHintCardOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'mistake' | 'correct' | null>(null);
  const [isStuckCardOpen, setIsStuckCardOpen] = useState(false);
  const [isCouldNotCheckOpen, setIsCouldNotCheckOpen] = useState(false);
  const [isLessonAccordionOpenMobile, setIsLessonAccordionOpenMobile] = useState(true);
  const [isStatsAccordionOpenMobile, setIsStatsAccordionOpenMobile] = useState(true);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Frame definition metadata for the switcher dock
  const FRAME_OPTIONS: { id: GuidedFrameId; num: string; title: string; hint: string }[] = [
    { id: 'interactive', num: 'Live', title: 'Interactive', hint: 'Live working question with active evaluation' },
    { id: '1_typing', num: '1', title: 'Typing', hint: 'Input with 2px green border, enabled Check' },
    { id: '2_checking', num: '2', title: 'Checking', hint: 'Spinner button, disabled & dimmed textarea' },
    { id: '3_mistake_feedback', num: '3', title: 'Feedback on mistake', hint: '3 labelled feedback blocks & Try again' },
    { id: '4_hint_2', num: '4', title: 'Hint 2 of 3', hint: 'Amber hint card above textarea with 2 dots' },
    { id: '5_correct', num: '5', title: 'Correct answer', hint: 's + 21 − 6s = 11, Continue to your turn' },
    { id: '6_still_stuck', num: '6', title: 'Still stuck', hint: '2 options with chevrons after 3 hints' },
    { id: '7_could_not_check', num: '7', title: 'Could not check', hint: 'Error container with alert & Try again' },
    { id: '8_your_turn', num: '8', title: 'Your turn (Step 4)', hint: 'Step 4 of 4: bookstall p & n problem' },
    { id: '9_mobile', num: '9', title: 'Mobile (360px)', hint: 'Stacked buttons & bottom accordions' },
  ];

  // Configure state variables automatically when pinning to specific frames
  useEffect(() => {
    switch (activeFrame) {
      case '1_typing':
        setInputValue('s + 7 − 2s = 11');
        setIsChecking(false);
        setAttempts(0);
        setHintsUsed(0);
        setIsHintCardOpen(false);
        setIsFeedbackOpen(false);
        setFeedbackType(null);
        setIsStuckCardOpen(false);
        setIsCouldNotCheckOpen(false);
        break;
      case '2_checking':
        setInputValue('s + 7 − 2s = 11');
        setIsChecking(true);
        setAttempts(0);
        setHintsUsed(0);
        setIsHintCardOpen(false);
        setIsFeedbackOpen(false);
        setFeedbackType(null);
        setIsStuckCardOpen(false);
        setIsCouldNotCheckOpen(false);
        break;
      case '3_mistake_feedback':
        setInputValue('s + 7 − 2s = 11');
        setIsChecking(false);
        setAttempts(1);
        setHintsUsed(0);
        setIsHintCardOpen(false);
        setIsFeedbackOpen(true);
        setFeedbackType('mistake');
        setIsStuckCardOpen(false);
        setIsCouldNotCheckOpen(false);
        break;
      case '4_hint_2':
        setInputValue('s + 7 − 2s = 11');
        setIsChecking(false);
        setAttempts(1);
        setHintsUsed(2);
        setIsHintCardOpen(true);
        setIsFeedbackOpen(false);
        setFeedbackType(null);
        setIsStuckCardOpen(false);
        setIsCouldNotCheckOpen(false);
        break;
      case '5_correct':
        setInputValue('s + 21 − 6s = 11');
        setIsChecking(false);
        setAttempts(2);
        setHintsUsed(1);
        setIsHintCardOpen(false);
        setIsFeedbackOpen(true);
        setFeedbackType('correct');
        setIsStuckCardOpen(false);
        setIsCouldNotCheckOpen(false);
        break;
      case '6_still_stuck':
        setInputValue('s + 7 − 2s = 11');
        setIsChecking(false);
        setAttempts(2);
        setHintsUsed(3);
        setIsHintCardOpen(true);
        setIsFeedbackOpen(false);
        setFeedbackType(null);
        setIsStuckCardOpen(true);
        setIsCouldNotCheckOpen(false);
        break;
      case '7_could_not_check':
        setInputValue('s + 7 − 2s = 11');
        setIsChecking(false);
        setAttempts(0);
        setHintsUsed(0);
        setIsHintCardOpen(false);
        setIsFeedbackOpen(false);
        setFeedbackType(null);
        setIsStuckCardOpen(false);
        setIsCouldNotCheckOpen(true);
        break;
      case '8_your_turn':
        setInputValue('');
        setIsChecking(false);
        setAttempts(0);
        setHintsUsed(0);
        setIsHintCardOpen(false);
        setIsFeedbackOpen(false);
        setFeedbackType(null);
        setIsStuckCardOpen(false);
        setIsCouldNotCheckOpen(false);
        break;
      case '9_mobile':
        setInputValue('s + 7 − 2s = 11');
        setIsChecking(false);
        setAttempts(1);
        setHintsUsed(0);
        setIsHintCardOpen(false);
        setIsFeedbackOpen(true);
        setFeedbackType('mistake');
        setIsStuckCardOpen(false);
        setIsCouldNotCheckOpen(false);
        break;
      case 'interactive':
      default:
        // leave interactive
        break;
    }
  }, [activeFrame]);

  // Insert mathematical symbol into textarea
  const insertSymbol = (symbol: string) => {
    if (activeFrame === '2_checking') return;
    const textarea = textareaRef.current;
    if (!textarea) {
      setInputValue((prev) => prev + symbol);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    let updated = '';
    let newCursor = start;

    if (symbol === '()') {
      const selected = text.substring(start, end);
      updated = text.substring(0, start) + `(${selected})` + text.substring(end);
      newCursor = selected.length > 0 ? end + 2 : start + 1;
    } else {
      updated = text.substring(0, start) + symbol + text.substring(end);
      newCursor = start + symbol.length;
    }

    setInputValue(updated);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursor, newCursor);
    }, 10);
  };

  // Interactive Check Answer handler
  const handleCheckAnswer = () => {
    if (activeFrame !== 'interactive') return;
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      setAttempts((prev) => prev + 1);
      const clean = inputValue.trim().replace(/\s+/g, '');
      if (clean.includes('21-6s') || clean.includes('s+21-6s=11')) {
        setFeedbackType('correct');
        setIsFeedbackOpen(true);
      } else {
        setFeedbackType('mistake');
        setIsFeedbackOpen(true);
      }
    }, 600);
  };

  // Switcher dock navigation
  const currentIdx = FRAME_OPTIONS.findIndex((f) => f.id === activeFrame);
  const handlePrevFrame = () => {
    const prevIdx = currentIdx > 0 ? currentIdx - 1 : FRAME_OPTIONS.length - 1;
    setActiveFrame(FRAME_OPTIONS[prevIdx].id);
  };
  const handleNextFrame = () => {
    const nextIdx = currentIdx < FRAME_OPTIONS.length - 1 ? currentIdx + 1 : 0;
    setActiveFrame(FRAME_OPTIONS[nextIdx].id);
  };

  // =========================================================================
  // FLOATING FRAME DOCK (Allows quick viewing of all 9 frames)
  // =========================================================================
  const renderFloatingFrameDock = () => {
    if (!isDockOpen) {
      return (
        <aside
          aria-label="Screen preview bar"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-in fade-in zoom-in-95 duration-200"
        >
          <button
            type="button"
            onClick={() => setIsDockOpen(true)}
            className="flex items-center gap-2.5 bg-[#004135] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#0A4A3E] transition-all text-xs font-semibold tracking-wide border border-white/20 hover:scale-105 active:scale-95 cursor-pointer"
            title="Click to view all 9 generated screens and states"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Switch Screens (1–9)</span>
            <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-full font-mono">
              {activeFrame === 'interactive' ? 'Live' : FRAME_OPTIONS[currentIdx]?.num || '1-9'}
            </span>
          </button>
        </aside>
      );
    }

    return (
      <aside
        aria-label="Screen preview bar"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[96vw] bg-white/95 backdrop-blur-md border border-[#DDD8CC] rounded-2xl shadow-2xl p-2.5 flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200"
      >
        {/* Header row with navigation & close */}
        <div className="flex items-center justify-between gap-4 px-1 pb-1 border-b border-[#DDD8CC]/50 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[#004135] font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>Step 3 &amp; 4 Frames (1–9)</span>
            </span>
            <span className="text-[11px] text-[#7D8883] font-medium hidden sm:inline">
              (Click any screen to view)
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrevFrame}
              className="p-1 text-[#4A5551] hover:text-[#004135] hover:bg-[#EDE9E0] rounded cursor-pointer transition-colors"
              title="Previous screen"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono text-[#141d1a] px-1">
              {currentIdx + 1} / {FRAME_OPTIONS.length}
            </span>
            <button
              type="button"
              onClick={handleNextFrame}
              className="p-1 text-[#4A5551] hover:text-[#004135] hover:bg-[#EDE9E0] rounded cursor-pointer transition-colors"
              title="Next screen"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="h-3.5 w-px bg-[#DDD8CC] mx-1" />
            {onBackToClip && (
              <button
                type="button"
                onClick={onBackToClip}
                className="px-2 py-0.5 text-[11px] text-[#004135] hover:bg-[#DCEBE6] rounded font-medium transition-colors flex items-center gap-1 cursor-pointer"
                title="Back to Step 2 clip player"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Step 2</span>
              </button>
            )}
            {onOpenPractice && (
              <button
                type="button"
                onClick={onOpenPractice}
                className="px-2 py-0.5 text-[11px] text-[#0E5A4B] hover:bg-[#DCEBE6] rounded font-medium transition-colors flex items-center gap-1 cursor-pointer"
                title="Practice: Substitution"
              >
                <span>Practice</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsDockOpen(false)}
              className="p-1 text-[#7D8883] hover:text-[#141d1a] hover:bg-[#EDE9E0] rounded cursor-pointer transition-colors ml-1"
              title="Minimize bar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Buttons pill bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar max-w-[92vw]">
          {FRAME_OPTIONS.map((f) => {
            const isCurrent = activeFrame === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFrame(f.id)}
                className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#004135] text-white shadow-xs font-semibold'
                    : 'bg-[#FAF8F4] hover:bg-[#EDE9E0] text-[#3f4945] border border-[#DDD8CC]/70'
                }`}
                title={f.hint}
              >
                <span
                  className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                    isCurrent ? 'bg-white/20 text-white' : 'bg-[#EDE9E0] text-[#141d1a]'
                  }`}
                >
                  {f.num}
                </span>
                <span>{f.title}</span>
              </button>
            );
          })}
        </div>
      </aside>
    );
  };

  // =========================================================================
  // SUB-COMPONENTS: HEADER, WORKSPACE, ACCORDIONS
  // =========================================================================
  const isStep4 = activeFrame === '8_your_turn';
  const effectiveAttempts =
    activeFrame === '3_mistake_feedback' || activeFrame === '4_hint_2' || activeFrame === '9_mobile'
      ? 1
      : activeFrame === '5_correct' || activeFrame === '6_still_stuck'
      ? 2
      : 0;

  const effectiveHintsUsed =
    activeFrame === '4_hint_2'
      ? '2 of 3'
      : activeFrame === '6_still_stuck'
      ? '3 of 3'
      : activeFrame === '5_correct'
      ? '1 of 3'
      : '0 of 3';

  // Desktop Header
  const renderHeader = () => (
    <header className="w-full bg-white border-b border-[#DDD8CC] sticky top-0 z-20">
      <div className="max-w-[1120px] mx-auto h-16 px-6 lg:px-12 flex items-center justify-between">
        {/* Left: Exit Action */}
        <div className="flex-1 flex items-center justify-start">
          <button
            type="button"
            onClick={onExit}
            className="inline-flex items-center gap-1.5 text-[#3f4945] hover:text-[#004135] transition-colors text-sm group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Exit lesson</span>
          </button>
        </div>

        {/* Center: Lesson Identity */}
        <div className="flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-serif text-lg leading-tight font-semibold text-[#141d1a]">
            Substitution
          </h1>
          <span className="text-xs text-[#3f4945]">
            Simultaneous equations
          </span>
        </div>

        {/* Right: Step Progress Counter & Bar */}
        <div className="flex-1 flex flex-col items-end justify-center gap-1.5">
          <span className="text-xs text-[#3f4945]">
            {isStep4 ? 'Step 4 of 4: Your turn' : 'Step 3 of 4: Guided question'}
          </span>
          <div aria-hidden="true" className="flex items-center gap-1.5 w-36">
            {/* Step 1: Complete */}
            <div className="h-1.5 flex-1 rounded-[2px] bg-[#004135]" />
            {/* Step 2: Complete */}
            <div className="h-1.5 flex-1 rounded-[2px] bg-[#004135]" />
            {/* Step 3 */}
            <div
              className={`h-1.5 flex-1 rounded-[2px] ${
                isStep4 ? 'bg-[#004135]' : 'overflow-hidden flex bg-[#DDD8CC]'
              }`}
            >
              {!isStep4 && <div className="w-1/2 h-full bg-[#004135]" />}
            </div>
            {/* Step 4 */}
            <div
              className={`h-1.5 flex-1 rounded-[2px] overflow-hidden flex ${
                isStep4 ? 'bg-[#DDD8CC]' : 'bg-[#DDD8CC]'
              }`}
            >
              {isStep4 && <div className="w-1/2 h-full bg-[#004135]" />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  // Right Column: Lesson Path and Stats
  const renderRightColumn = () => (
    <div className="w-full flex flex-col gap-6">
      {/* Card 1: Lesson Roadmap Path */}
      <div className="w-full bg-white rounded-xl border border-[#DDD8CC] p-5 flex flex-col gap-4 shadow-xs">
        <h2 className="font-serif text-lg font-semibold text-[#141d1a]">
          In this lesson
        </h2>
        <div className="relative flex flex-col">
          {/* Vertical Sequence Connecting Rule */}
          <div
            aria-hidden="true"
            className="absolute left-[15px] top-4 bottom-4 w-px bg-[#DDD8CC]"
          />

          {/* Path Step 1 (Completed) */}
          <div className="relative flex items-start gap-3 py-2 z-10">
            <div className="w-8 h-8 rounded-full bg-[#DCEFE2] flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-[#1E6B3A] stroke-[2.5]" />
            </div>
            <div className="flex flex-col min-w-0 pt-0.5">
              <span className="text-xs font-semibold text-[#141d1a]">
                1. Watch a short clip
              </span>
              <span className="text-xs text-[#3f4945] truncate">
                Identify the two orders and variables
              </span>
            </div>
          </div>

          {/* Path Step 2 (Completed) */}
          <div className="relative flex items-start gap-3 py-2 z-10">
            <div className="w-8 h-8 rounded-full bg-[#DCEFE2] flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-[#1E6B3A] stroke-[2.5]" />
            </div>
            <div className="flex flex-col min-w-0 pt-0.5">
              <span className="text-xs font-semibold text-[#141d1a]">
                2. Solve one together
              </span>
              <span className="text-xs text-[#3f4945] truncate">
                Rearrange bill 1 to isolate d
              </span>
            </div>
          </div>

          {/* Path Step 3 (Completed if on Step 4; otherwise active) */}
          {isStep4 ? (
            <div className="relative flex items-start gap-3 py-2 z-10">
              <div className="w-8 h-8 rounded-full bg-[#DCEFE2] flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-[#1E6B3A] stroke-[2.5]" />
              </div>
              <div className="flex flex-col min-w-0 pt-0.5">
                <span className="text-xs font-semibold text-[#141d1a]">
                  3. Guided question
                </span>
                <span className="text-xs text-[#3f4945] truncate">
                  Substitute into bill 2 and solve for s
                </span>
              </div>
            </div>
          ) : (
            <div className="relative flex items-start gap-3 p-2.5 -mx-1.5 rounded-lg bg-[#DCEBE6] z-10">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-[#004135] flex items-center justify-center shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-[#004135]" />
              </div>
              <div className="flex flex-col min-w-0 pt-0.5">
                <span className="text-xs font-bold text-[#004135]">
                  3. Guided question
                </span>
                <span className="text-xs text-[#3f4945] truncate">
                  Substitute into bill 2 and solve for s
                </span>
              </div>
            </div>
          )}

          {/* Path Step 4 (Current if Step 4; otherwise pending) */}
          {isStep4 ? (
            <div className="relative flex items-start gap-3 p-2.5 -mx-1.5 rounded-lg bg-[#DCEBE6] z-10">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-[#004135] flex items-center justify-center shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-[#004135]" />
              </div>
              <div className="flex flex-col min-w-0 pt-0.5">
                <span className="text-xs font-bold text-[#004135]">
                  4. Your turn
                </span>
                <span className="text-xs text-[#3f4945] truncate">
                  Check the solution in both bills
                </span>
              </div>
            </div>
          ) : (
            <div className="relative flex items-start gap-3 py-2 z-10">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-[#DDD8CC] shrink-0" />
              <div className="flex flex-col min-w-0 pt-0.5">
                <span className="text-xs font-medium text-[#141d1a]">
                  4. Your turn
                </span>
                <span className="text-xs text-[#3f4945] truncate">
                  Check the solution in both bills
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card 2: Question Performance Metrics */}
      <div className="w-full bg-white rounded-xl border border-[#DDD8CC] p-5 flex flex-col gap-3 shadow-xs">
        <h2 className="font-serif text-base font-semibold text-[#141d1a]">
          This question
        </h2>
        <div className="flex flex-col divide-y divide-[#DDD8CC]">
          <div className="flex items-center justify-between py-2.5 text-sm">
            <span className="text-[#3f4945]">Attempts</span>
            <span className="font-semibold text-[#141d1a] font-mono">
              {effectiveAttempts}
            </span>
          </div>
          <div className="flex items-center justify-between py-2.5 text-sm">
            <span className="text-[#3f4945]">Hints used</span>
            <span className="font-semibold text-[#141d1a] font-mono">
              {effectiveHintsUsed}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // FRAME 9: MOBILE VIEW RENDERING (360px viewport simulation)
  // =========================================================================
  if (activeFrame === '9_mobile') {
    return (
      <div className="min-h-screen bg-[#EDE9E0]/40 flex flex-col items-center justify-start py-4 px-2 font-sans text-[#141d1a] antialiased pb-20">
        {renderFloatingFrameDock()}

        {/* 360px Mobile Shell */}
        <div className="w-full max-w-[360px] bg-white border border-[#DDD8CC] rounded-[16px] shadow-lg overflow-hidden flex flex-col my-auto">
          {/* 1. Compact Header (back arrow, title, "Step 3 of 4") */}
          <header className="w-full bg-white border-b border-[#DDD8CC] px-4 h-12 flex items-center justify-between sticky top-0 z-20">
            <button
              type="button"
              onClick={onExit}
              className="inline-flex items-center text-[#3f4945] hover:text-[#004135] p-1"
              aria-label="Exit lesson"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="font-serif text-base font-semibold text-[#141d1a]">
              Substitution
            </h1>
            <span className="text-xs text-[#3f4945] font-medium">
              Step 3 of 4
            </span>
          </header>

          <main className="w-full flex flex-col p-4 gap-4">
            {/* Context scenario */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-[#3f4945]">Question 1 of 2</span>
              <p className="font-serif text-sm text-[#141d1a] leading-relaxed">
                At the school fair, 2 samosas and 1 drink cost $7. 1 samosa and 3 drinks cost $11. Let{' '}
                <span className="italic text-[#004135] font-semibold">s</span> be samosa and{' '}
                <span className="italic text-[#885200] font-semibold">d</span> drink.
              </p>
            </div>

            {/* Sunken equations panel */}
            <div className="w-full bg-[#F4F1EA] rounded-lg p-3 border border-[#DDD8CC] flex flex-col gap-2 font-serif text-sm">
              <div className="flex flex-col gap-0.5 italic">
                <div>
                  2<span className="text-[#004135]">s</span> +{' '}
                  <span className="text-[#885200]">d</span> = 7
                </div>
                <div>
                  <span className="text-[#004135]">s</span> + 3
                  <span className="text-[#885200]">d</span> = 11
                </div>
              </div>
              <div className="pt-1.5 border-t border-[#DDD8CC] text-xs text-[#3f4945]">
                Given: <span className="font-serif italic text-[#141d1a]"><span className="text-[#885200]">d</span> = 7 − 2<span className="text-[#004135]">s</span></span>
              </div>
            </div>

            {/* Question prompt */}
            <div>
              <h2 className="font-serif text-base font-semibold text-[#141d1a]">
                Substitute this into the second equation. What do you get?
              </h2>
            </div>

            {/* Toolbar scrolls horizontally */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
              {['( )', 'a/b', 'x²', '√', '±'].map((sym) => (
                <button
                  key={sym}
                  type="button"
                  onClick={() => insertSymbol(sym)}
                  className="px-2.5 h-7 rounded border border-[#DDD8CC] bg-[#FAF8F4] text-xs hover:bg-[#EDE9E0] shrink-0"
                >
                  {sym}
                </button>
              ))}
            </div>

            {/* Textarea */}
            <textarea
              rows={3}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-2.5 text-sm bg-white border border-[#7D8883] rounded-lg focus:outline-none focus:border-[#004135] font-mono resize-none"
              placeholder="Write your next line of working"
            />

            {/* Preview line */}
            <div className="text-xs text-[#3f4945]">
              <span className="font-medium text-[#141d1a]">Preview: </span>
              <span className="font-serif italic text-[#141d1a]">{inputValue}</span>
            </div>

            {/* Full-width stacked buttons */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                className="w-full h-11 rounded-lg bg-[#004135] text-white text-sm font-medium hover:bg-[#0A4A3E] transition-colors"
              >
                Check answer
              </button>
              <button
                type="button"
                className="w-full h-11 rounded-lg border border-[#DDD8CC] bg-white text-[#141d1a] text-sm font-medium hover:bg-[#F4F1EA] transition-colors"
              >
                Get a hint
              </button>
              <button
                type="button"
                className="w-full py-2 text-center text-xs text-[#004135] font-medium hover:underline"
              >
                I'm stuck
              </button>
            </div>

            {/* Feedback card follows below on mobile */}
            <div className="p-3 rounded-lg bg-[#FAF8F4] border border-[#DDD8CC] flex flex-col gap-2.5">
              <div className="text-xs text-[#3f4945]">
                Your answer: <span className="font-serif italic text-[#141d1a]">{inputValue}</span>
              </div>
              <div className="p-2.5 rounded bg-[#DCEFE2] text-xs text-[#002019] flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#1E6B3A] shrink-0 mt-0.5" />
                <div>
                  <strong>What worked:</strong> You replaced d with 7 − 2s in the second equation.
                </div>
              </div>
              <div className="p-2.5 rounded bg-[#FFF8E6] text-xs text-[#754600] flex items-start gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-[#885200] shrink-0 mt-0.5" />
                <div>
                  <strong>What to work on:</strong> 3(7 − 2s) is 21 − 6s, not 7 − 2s.
                </div>
              </div>
            </div>

            {/* Mobile Accordions: In this lesson & This question */}
            <div className="border-t border-[#DDD8CC] pt-2 flex flex-col gap-2">
              <div className="border border-[#DDD8CC] rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsLessonAccordionOpenMobile(!isLessonAccordionOpenMobile)}
                  className="w-full px-3 py-2.5 bg-[#FAF8F4] text-xs font-semibold flex items-center justify-between text-[#141d1a]"
                >
                  <span>In this lesson</span>
                  {isLessonAccordionOpenMobile ? (
                    <ChevronUp className="w-4 h-4 text-[#7D8883]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#7D8883]" />
                  )}
                </button>
                {isLessonAccordionOpenMobile && (
                  <div className="p-3 bg-white text-xs border-t border-[#DDD8CC] space-y-2">
                    <div className="flex items-center gap-2 text-[#1E6B3A]">
                      <Check className="w-3.5 h-3.5" /> 1. Watch a short clip (Done)
                    </div>
                    <div className="flex items-center gap-2 text-[#1E6B3A]">
                      <Check className="w-3.5 h-3.5" /> 2. Solve one together (Done)
                    </div>
                    <div className="flex items-center gap-2 text-[#004135] font-semibold">
                      <span className="w-2 h-2 rounded-full bg-[#004135]" /> 3. Guided question (Current)
                    </div>
                    <div className="flex items-center gap-2 text-[#7D8883]">
                      <span className="w-2 h-2 rounded-full border border-[#DDD8CC]" /> 4. Your turn (Upcoming)
                    </div>
                  </div>
                )}
              </div>

              <div className="border border-[#DDD8CC] rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsStatsAccordionOpenMobile(!isStatsAccordionOpenMobile)}
                  className="w-full px-3 py-2.5 bg-[#FAF8F4] text-xs font-semibold flex items-center justify-between text-[#141d1a]"
                >
                  <span>This question</span>
                  {isStatsAccordionOpenMobile ? (
                    <ChevronUp className="w-4 h-4 text-[#7D8883]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#7D8883]" />
                  )}
                </button>
                {isStatsAccordionOpenMobile && (
                  <div className="p-3 bg-white text-xs border-t border-[#DDD8CC] flex justify-between">
                    <span>Attempts: <strong>1</strong></span>
                    <span>Hints used: <strong>0 of 3</strong></span>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // =========================================================================
  // STANDARD DESKTOP VIEW (Frames 1-8 and Interactive)
  // =========================================================================
  return (
    <div className="min-h-full bg-[#FAF8F4] text-[#141d1a] font-sans antialiased selection:bg-[#DCEBE6] selection:text-[#004135] flex flex-col justify-between relative pb-16">
      {renderFloatingFrameDock()}

      <div>
        {renderHeader()}

        {/* Main Workspace Layout */}
        <main className="w-full max-w-[1120px] mx-auto px-6 lg:px-12 py-10">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Primary Column (Left: ~68% / 8 cols) */}
            <div className="w-full lg:w-[68%] flex flex-col">
              <div className="w-full bg-white rounded-xl border border-[#DDD8CC] p-6 sm:p-7 flex flex-col gap-6 shadow-xs">
                {/* ------------------------------------------------------------- */}
                {/* FRAME 8: YOUR TURN (Step 4 of 4) SPECIFIC HEADER & PROBLEM     */}
                {/* ------------------------------------------------------------- */}
                {isStep4 ? (
                  <>
                    <div className="flex flex-col gap-2">
                      {/* Chip "New situation" with sparkle-free arrow-right icon */}
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 bg-[#FAF8F4] border border-[#DDD8CC] text-[#141d1a] text-xs font-medium px-3 py-1 rounded-full">
                          <ArrowRight className="w-3.5 h-3.5 text-[#004135]" />
                          <span>New situation</span>
                        </span>
                        <span className="text-xs text-[#3f4945]">
                          Same idea, a different setting.
                        </span>
                      </div>

                      {/* Problem Statement */}
                      <p className="font-serif text-[17px] text-[#141d1a] leading-[1.6] mt-1">
                        A school bookstall sells pens and notebooks. 3 pens and 2 notebooks cost $12.
                        1 pen and 1 notebook cost $5.
                      </p>
                    </div>

                    {/* Sunken Panel (No "Given" line) */}
                    <div className="w-full bg-[#F4F1EA] rounded-lg p-4 border border-[#DDD8CC] flex flex-col gap-2 font-serif italic text-[18px] leading-relaxed">
                      <div>
                        3<span className="text-[#004135] font-semibold">p</span> + 2
                        <span className="text-[#885200] font-semibold">n</span> = 12
                      </div>
                      <div>
                        <span className="text-[#004135] font-semibold">p</span> +{' '}
                        <span className="text-[#885200] font-semibold">n</span> = 5
                      </div>
                    </div>

                    {/* Question Prompt */}
                    <div>
                      <h2 className="font-serif text-[20px] font-semibold text-[#141d1a] leading-snug">
                        Find the price of one pen and one notebook.
                      </h2>
                    </div>
                  </>
                ) : (
                  /* ------------------------------------------------------------- */
                  /* FRAMES 1-7: GUIDED QUESTION (Step 3 of 4)                     */
                  /* ------------------------------------------------------------- */
                  <>
                    {/* Context / Scenario */}
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-semibold text-[#3f4945] tracking-wide uppercase">
                        Question 1 of 2
                      </span>
                      <p className="font-serif text-[17px] text-[#141d1a] leading-[1.6]">
                        At the school fair, 2 samosas and 1 drink cost $7. 1 samosa and 3 drinks cost $11. Let{' '}
                        <span className="font-serif italic font-semibold text-[#004135]">s</span> be the price of a samosa and{' '}
                        <span className="font-serif italic font-semibold text-[#885200]">d</span> the price of a drink.
                      </p>
                    </div>

                    {/* Sunken Formula Context Panel */}
                    <div className="w-full bg-[#F4F1EA] rounded-lg p-4 border border-[#DDD8CC] flex flex-col gap-3">
                      <div className="flex flex-col gap-1 font-serif italic text-[18px] leading-relaxed select-text">
                        <div className="flex items-center">
                          <span>
                            2<span className="text-[#004135] font-semibold">s</span>
                          </span>
                          <span className="text-[#141d1a] font-normal font-sans">&nbsp;+&nbsp;</span>
                          <span className="text-[#885200] font-semibold">d</span>
                          <span className="text-[#141d1a] font-normal font-sans">&nbsp;=&nbsp;7</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-[#004135] font-semibold">s</span>
                          <span className="text-[#141d1a] font-normal font-sans">&nbsp;+&nbsp;</span>
                          <span>
                            3<span className="text-[#885200] font-semibold">d</span>
                          </span>
                          <span className="text-[#141d1a] font-normal font-sans">&nbsp;=&nbsp;11</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#DDD8CC] text-sm text-[#3f4945] flex items-center flex-wrap gap-x-1.5">
                        <span>Given: from the first equation,</span>
                        <span className="font-serif italic text-[17px] text-[#141d1a] font-semibold">
                          <span className="text-[#885200]">d</span> = 7 − 2<span className="text-[#004135]">s</span>
                        </span>
                      </div>
                    </div>

                    {/* Active Question Prompt */}
                    <div>
                      <h2 className="font-serif text-[20px] font-semibold text-[#141d1a] leading-snug">
                        Substitute this into the second equation. What do you get?
                      </h2>
                    </div>
                  </>
                )}

                {/* ------------------------------------------------------------- */}
                {/* FRAME 4 & 6: HINT CARD (secondary-container above text area)   */}
                {/* ------------------------------------------------------------- */}
                {(activeFrame === '4_hint_2' || activeFrame === '6_still_stuck') && (
                  <div className="p-4 bg-[#FFF8E6] border border-[#feb561]/60 rounded-xl flex flex-col gap-2.5 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#754600]">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-[#885200]" />
                        <span>Hint 2 of 3</span>
                      </div>
                      {/* Small dots showing hints used: two filled, one empty */}
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#885200]" />
                        <span className="w-2 h-2 rounded-full bg-[#885200]" />
                        <span className="w-2 h-2 rounded-full border border-[#885200] bg-white" />
                      </div>
                    </div>
                    <p className="text-sm text-[#754600] leading-relaxed">
                      Multiply the 3 by each term inside the brackets: 3 times 7, and 3 times 2s.
                    </p>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* FRAME 6: STILL STUCK SELECTION CARD (After all 3 hints)        */}
                {/* ------------------------------------------------------------- */}
                {activeFrame === '6_still_stuck' && (
                  <div className="p-5 bg-white border border-[#DDD8CC] rounded-xl shadow-xs flex flex-col gap-3.5 animate-in fade-in duration-200">
                    <h3 className="font-serif text-base font-semibold text-[#141d1a]">
                      Still stuck? Choose how much help you want.
                    </h3>

                    <div className="flex flex-col gap-2">
                      {/* Option 1 */}
                      <button
                        type="button"
                        onClick={() => {
                          setInputValue('s + 3(7 − 2s) = 11');
                          setActiveFrame('1_typing');
                        }}
                        className="w-full text-left p-3.5 rounded-lg border border-[#DDD8CC] hover:border-[#004135] bg-[#FAF8F4] hover:bg-white transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="text-sm font-semibold text-[#141d1a] group-hover:text-[#004135]">
                            Show me the first step
                          </div>
                          <div className="text-xs text-[#3f4945] mt-0.5">
                            We show one line and you finish it.
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#7D8883] group-hover:text-[#004135] group-hover:translate-x-0.5 transition-all" />
                      </button>

                      {/* Option 2 */}
                      <button
                        type="button"
                        onClick={onBackToClip}
                        className="w-full text-left p-3.5 rounded-lg border border-[#DDD8CC] hover:border-[#004135] bg-[#FAF8F4] hover:bg-white transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="text-sm font-semibold text-[#141d1a] group-hover:text-[#004135]">
                            Solve this one together
                          </div>
                          <div className="text-xs text-[#3f4945] mt-0.5">
                            We work through it with a short clip, then give you a similar question to try.
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#7D8883] group-hover:text-[#004135] group-hover:translate-x-0.5 transition-all" />
                      </button>
                    </div>

                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => setActiveFrame('1_typing')}
                        className="text-xs text-[#004135] hover:underline font-medium cursor-pointer"
                      >
                        Back to my answer
                      </button>
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* INPUT WORKING AREA                                            */}
                {/* ------------------------------------------------------------- */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="formula-input" className="text-sm font-medium text-[#141d1a]">
                      Your answer
                    </label>

                    {/* Math Helper Toolbar */}
                    <div aria-label="Mathematical formula helpers" className="flex items-center gap-1" role="toolbar">
                      {['( )', 'a/b', 'x²', '√', '±'].map((sym) => (
                        <button
                          key={sym}
                          type="button"
                          disabled={activeFrame === '2_checking'}
                          onClick={() => insertSymbol(sym)}
                          className="w-8 h-8 rounded-lg border border-[#DDD8CC] bg-white text-[#141d1a] flex items-center justify-center text-xs hover:bg-[#F4F1EA] transition-colors active:translate-y-px cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {sym}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Multi-line Text Area Input */}
                  <textarea
                    id="formula-input"
                    ref={textareaRef}
                    disabled={activeFrame === '2_checking'}
                    rows={isStep4 ? 6 : 3}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={
                      isStep4
                        ? 'Show your working, one step per line'
                        : 'Write your next line of working'
                    }
                    className={`w-full p-3 bg-white rounded-lg text-sm text-[#141d1a] placeholder:text-[#7D8883] transition-colors resize-none font-mono ${
                      isStep4 ? 'h-40' : 'h-24'
                    } ${
                      activeFrame === '1_typing'
                        ? 'border-2 border-[#1E6B3A] shadow-xs'
                        : activeFrame === '2_checking'
                        ? 'opacity-60 bg-[#F4F1EA] cursor-not-allowed border border-[#DDD8CC]'
                        : 'border border-[#7D8883] focus:outline-none focus:border-[#004135]'
                    }`}
                  />

                  {/* Typeset Formula Preview */}
                  <div className="flex items-baseline gap-2 pt-1 text-sm text-[#3f4945]">
                    <span className="font-medium text-[#141d1a]">Preview:</span>
                    {inputValue.trim().length > 0 ? (
                      <div className="font-serif italic text-[#141d1a] text-[17px] font-medium bg-[#F4F1EA] px-2.5 py-0.5 rounded border border-[#DDD8CC]">
                        {inputValue}
                      </div>
                    ) : (
                      <div className="italic text-[#7D8883] text-sm">
                        Type your working above to see formula preview
                      </div>
                    )}
                  </div>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* FRAME 7: COULD NOT CHECK (Error container under textarea)      */}
                {/* ------------------------------------------------------------- */}
                {activeFrame === '7_could_not_check' && (
                  <div className="p-4 rounded-lg bg-[#F9DEDC] border border-[#B3261E]/40 flex flex-col gap-3 animate-in fade-in duration-150">
                    <div className="flex items-start gap-2.5 text-[#410E0B]">
                      <AlertCircle className="w-5 h-5 text-[#B3261E] shrink-0 mt-0.5" />
                      <div className="text-sm font-medium">
                        We could not check your answer. Your answer is saved.
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={handleCheckAnswer}
                        className="h-9 px-4 rounded-lg bg-[#B3261E] hover:bg-[#8f1e18] text-white text-xs font-semibold cursor-pointer transition-colors shadow-xs"
                      >
                        Try again
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveFrame('1_typing')}
                        className="text-xs text-[#410E0B] hover:underline font-medium cursor-pointer"
                      >
                        Keep working
                      </button>
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* BOTTOM ACTION CONTROLS ROW                                    */}
                {/* ------------------------------------------------------------- */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-3">
                    {/* Primary Evaluation CTA */}
                    {activeFrame === '2_checking' ? (
                      /* Frame 2: Checking State */
                      <button
                        type="button"
                        disabled
                        className="h-11 px-5 rounded-lg bg-[#004135] text-white text-sm font-medium min-w-[130px] flex items-center justify-center gap-2 opacity-80 cursor-wait select-none"
                      >
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Checking</span>
                      </button>
                    ) : (
                      /* Frames 1, 3, 4, 5, 6, 7, 8 */
                      <button
                        type="button"
                        disabled={inputValue.trim().length === 0}
                        onClick={handleCheckAnswer}
                        className={`h-11 px-5 rounded-lg text-sm font-medium transition-all select-none min-w-[130px] ${
                          inputValue.trim().length > 0
                            ? 'bg-[#004135] hover:bg-[#0A4A3E] text-white cursor-pointer hover:-translate-y-0.5 shadow-xs'
                            : 'bg-[#004135] text-white opacity-50 cursor-not-allowed'
                        }`}
                      >
                        Check answer
                      </button>
                    )}

                    {/* Secondary Hint System */}
                    <button
                      type="button"
                      onClick={() => setActiveFrame('4_hint_2')}
                      className="h-11 px-4 rounded-lg border border-[#DDD8CC] bg-white text-[#141d1a] text-sm font-medium hover:bg-[#F4F1EA] transition-all select-none hover:-translate-y-0.5 cursor-pointer"
                    >
                      {activeFrame === '4_hint_2' ? 'Get hint 3' : 'Get a hint'}
                    </button>
                    <span className="text-sm text-[#3f4945]">
                      {effectiveHintsUsed} used
                    </span>
                  </div>

                  {/* Escalation Assistance CTA */}
                  <button
                    type="button"
                    onClick={() => setActiveFrame('6_still_stuck')}
                    className="inline-flex items-center gap-1.5 text-[#004135] hover:underline text-sm font-medium focus:outline-none cursor-pointer"
                  >
                    <LifeBuoy className="w-4 h-4 text-[#004135]" />
                    <span>I'm stuck</span>
                  </button>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* FRAME 3: FEEDBACK ON A MISTAKE (Under Action Row)             */}
                {/* ------------------------------------------------------------- */}
                {activeFrame === '3_mistake_feedback' && (
                  <div className="p-5 bg-white border border-[#DDD8CC] rounded-xl shadow-xs flex flex-col gap-4 animate-in fade-in duration-150">
                    <div className="text-sm text-[#3f4945]">
                      Your answer:{' '}
                      <span className="font-serif italic font-semibold text-[#141d1a] text-base ml-1">
                        s + 7 − 2s = 11
                      </span>
                    </div>

                    <div className="flex flex-col gap-3">
                      {/* Block 1: What worked (success-container, check icon) */}
                      <div className="p-3.5 rounded-lg bg-[#DCEFE2] border border-[#1E6B3A]/20 flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#1E6B3A] text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <div className="text-sm text-[#002019] leading-relaxed">
                          <strong className="block text-[#1E6B3A] font-semibold mb-0.5">
                            What worked
                          </strong>
                          You replaced d with 7 − 2s in the second equation. That is the right substitution.
                        </div>
                      </div>

                      {/* Block 2: What to work on (secondary-container, alert-circle icon) */}
                      <div className="p-3.5 rounded-lg bg-[#FFF8E6] border border-[#feb561]/50 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-[#885200] shrink-0 mt-0.5" />
                        <div className="text-sm text-[#754600] leading-relaxed">
                          <strong className="block text-[#885200] font-semibold mb-0.5">
                            What to work on
                          </strong>
                          The 3 multiplies everything inside the brackets. 3(7 − 2s) is 21 − 6s, not 7 − 2s.
                        </div>
                      </div>

                      {/* Block 3: Try this next (sunken, arrow icon) */}
                      <div className="p-3.5 rounded-lg bg-[#F4F1EA] border border-[#DDD8CC] flex items-start gap-3">
                        <ArrowRight className="w-5 h-5 text-[#004135] shrink-0 mt-0.5" />
                        <div className="text-sm text-[#141d1a] leading-relaxed">
                          <strong className="block text-[#141d1a] font-semibold mb-0.5">
                            Try this next
                          </strong>
                          Rewrite the line with the 3 applied to both terms, then collect the s terms.
                        </div>
                      </div>
                    </div>

                    {/* Under the blocks: Try again & Get a hint */}
                    <div className="flex items-center gap-4 pt-1">
                      <button
                        type="button"
                        onClick={() => setActiveFrame('1_typing')}
                        className="h-10 px-5 rounded-lg bg-[#004135] hover:bg-[#0A4A3E] text-white text-xs font-semibold cursor-pointer shadow-xs transition-colors"
                      >
                        Try again
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveFrame('4_hint_2')}
                        className="text-xs text-[#004135] hover:underline font-semibold cursor-pointer"
                      >
                        Get a hint
                      </button>
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* FRAME 5: CORRECT ANSWER (Under Action Row)                     */}
                {/* ------------------------------------------------------------- */}
                {activeFrame === '5_correct' && (
                  <div className="p-5 bg-white border border-[#DDD8CC] rounded-xl shadow-xs flex flex-col gap-4 animate-in fade-in duration-150">
                    {/* One block: What worked (success-container) */}
                    <div className="p-3.5 rounded-lg bg-[#DCEFE2] border border-[#1E6B3A]/20 flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#1E6B3A] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <div className="text-sm text-[#002019] leading-relaxed">
                        <strong className="block text-[#1E6B3A] font-semibold mb-0.5">
                          What worked
                        </strong>
                        You applied the 3 to both terms and kept the equation balanced.
                      </div>
                    </div>

                    <div className="text-sm text-[#141d1a] font-medium">
                      Next, collect the s terms and solve.
                    </div>

                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => setActiveFrame('8_your_turn')}
                        className="h-10 px-5 rounded-lg bg-[#004135] hover:bg-[#0A4A3E] text-white text-xs font-semibold cursor-pointer shadow-xs transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>Continue to your turn</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Academic Disclaimer Footnote */}
              <p className="text-xs text-[#3f4945] mt-3 px-1">
                Feedback is AI-generated and may contain errors.{' '}
                <button
                  type="button"
                  onClick={onOpenReport}
                  className="text-[#004135] hover:underline font-medium cursor-pointer"
                >
                  Report a problem.
                </button>
              </p>
            </div>

            {/* Secondary Column (Right: ~32% / 4 cols) */}
            <aside className="w-full lg:w-[32%] flex flex-col">
              {renderRightColumn()}
            </aside>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-[#DDD8CC]/70 py-6 bg-[#FAF8F4] mt-auto pb-16">
        <div className="max-w-[1120px] mx-auto px-6 lg:px-12 flex items-center justify-between text-xs text-[#3f4945]">
          <span>&copy; 2025 Silo</span>
          <span>
            Simultaneous equations &middot;{' '}
            {isStep4 ? 'Step 4 of 4' : 'Step 3 of 4'}
          </span>
        </div>
      </footer>
    </div>
  );
};
