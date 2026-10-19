import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  AlertCircle,
  RotateCcw,
  Layers,
  X,
  Smartphone,
  Monitor,
} from 'lucide-react';
import { questionBank } from '../data/questionBank';
import { getStoryboardById } from '../lib/clip-storyboard';
import { generateScenarioVariants } from '../lib/scenario-generator';
import type { ScenarioVariant } from '../lib/math-engine';

export type FrameId =
  | 'interactive'
  | '1_not_started'
  | '2_playing_early'
  | '3_paused'
  | '4_ended'
  | '5_explain_menu'
  | '6_voice_on'
  | '7_preparing'
  | '8_error'
  | '9_mobile';

interface LessonClipPlayerPageProps {
  lessonId?: string;
  onExit: () => void;
  onOpenReport?: () => void;
  onNextStep?: () => void;
  initialFrame?: FrameId;
}

export const LessonClipPlayerPage: React.FC<LessonClipPlayerPageProps> = ({
  lessonId = 'simultaneous-1',
  onExit,
  onOpenReport,
  onNextStep,
  initialFrame = 'interactive',
}) => {
  // Current active frame selection
  const [activeFrame, setActiveFrame] = useState<FrameId>(initialFrame);
  // Playback simulation states
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = 32;
  const [speed, setSpeed] = useState<'0.75x' | '1x' | '1.25x'>('1x');
  const [captionsOn, setCaptionsOn] = useState(true);
  const [voiceOn, setVoiceOn] = useState(false);
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const [isLessonOutlineOpenMobile, setIsLessonOutlineOpenMobile] = useState(true);
  const [isExplainMenuOpen, setIsExplainMenuOpen] = useState(false);
  const [selectedExample, setSelectedExample] = useState<
    'food' | 'tickets' | 'slow_breakdown'
  >('food');
  const [currentStepIndex, setCurrentStepIndex] = useState(2); // Step 2: Solve one together
  const [alternateScenario, setAlternateScenario] = useState<ScenarioVariant | null>(null);
  const [isGeneratingAlternateScenario, setIsGeneratingAlternateScenario] = useState(false);
  const storyboard = getStoryboardById(lessonId) ?? getStoryboardById('simultaneous-1');
  const selectedQuestion = questionBank.find((item) => item.id === lessonId) ?? questionBank[0];
  const defaultScenario = selectedQuestion.scenarioVariants?.[0] ?? null;
  const activeScenario = alternateScenario ?? defaultScenario;
  const lessonTitle = storyboard?.title ?? selectedQuestion.topic;
  const lessonTopic = storyboard?.topic ?? selectedQuestion.topic;

  const effectiveTime =
    activeFrame === '1_not_started'
      ? 0
      : activeFrame === '2_playing_early'
      ? 6
      : activeFrame === '3_paused'
      ? 21
      : activeFrame === '4_ended'
      ? 32
      : activeFrame === '7_preparing' || activeFrame === '8_error'
      ? 0
      : currentTime;

  const currentScene = storyboard
    ? storyboard.scenes.find(
        (scene) => effectiveTime >= scene.startSecond && effectiveTime <= scene.endSecond,
      ) ?? storyboard.scenes[0]
    : undefined;

  const transcriptLines = activeScenario?.transcript ?? storyboard?.transcript ?? [
    'Let the unknown values be variables and write the equations clearly.',
    'Solve the system step by step and keep the reasoning visible.',
    'Check the result against the original problem to confirm it still makes sense.',
  ];

  const questionDisplay = selectedQuestion.type === 'quadratic'
    ? ['x² - 5x + 6 = 0', '(x - 2)(x - 3) = 0']
    : selectedQuestion.type === 'word-problem'
    ? ['Let n be the integer', 'n(n + 1) = 42']
    : ['2b + d = 11', 'b + 2d = 10'];

  const workingDisplay = selectedQuestion.type === 'quadratic'
    ? ['x² - 5x + 6 = 0', 'x = 2 or x = 3']
    : selectedQuestion.type === 'word-problem'
    ? ['Let n and n + 1 be consecutive integers', 'n² + n - 42 = 0']
    : ['d = 11 - 2b', 'b = 4 and d = 3'];

  useEffect(() => {
    setActiveFrame('interactive');
    setCurrentTime(2);
    setIsPlaying(true);
    setVoiceOn(false);
    setIsExplainMenuOpen(false);
    setIsTranscriptOpen(false);
    setCurrentStepIndex(2);
  }, [lessonId]);

  // Automatically configure state variables when pinned to a specific frame
  useEffect(() => {
    switch (activeFrame) {
      case '1_not_started':
        setIsPlaying(false);
        setCurrentTime(0);
        setVoiceOn(false);
        setIsExplainMenuOpen(false);
        setIsTranscriptOpen(false);
        setCurrentStepIndex(2);
        break;
      case '2_playing_early':
        setIsPlaying(true);
        setCurrentTime(6);
        setVoiceOn(false);
        setIsExplainMenuOpen(false);
        setIsTranscriptOpen(false);
        setCurrentStepIndex(2);
        break;
      case '3_paused':
        setIsPlaying(false);
        setCurrentTime(21);
        setVoiceOn(false);
        setIsExplainMenuOpen(false);
        setIsTranscriptOpen(false);
        setCurrentStepIndex(2);
        break;
      case '4_ended':
        setIsPlaying(false);
        setCurrentTime(32);
        setVoiceOn(false);
        setIsExplainMenuOpen(false);
        setIsTranscriptOpen(false);
        setCurrentStepIndex(3);
        break;
      case '5_explain_menu':
        setIsPlaying(false);
        setCurrentTime(17);
        setVoiceOn(false);
        setIsExplainMenuOpen(true);
        setIsTranscriptOpen(false);
        setCurrentStepIndex(2);
        break;
      case '6_voice_on':
        setIsPlaying(true);
        setCurrentTime(17);
        setVoiceOn(true);
        setIsExplainMenuOpen(false);
        setIsTranscriptOpen(false);
        setCurrentStepIndex(2);
        break;
      case '7_preparing':
        setIsPlaying(false);
        setCurrentTime(0);
        setVoiceOn(false);
        setIsExplainMenuOpen(false);
        setIsTranscriptOpen(false);
        setCurrentStepIndex(2);
        break;
      case '8_error':
        setIsPlaying(false);
        setCurrentTime(0);
        setVoiceOn(false);
        setIsExplainMenuOpen(false);
        setIsTranscriptOpen(true); // Open transcript accordion for Error state
        setCurrentStepIndex(2);
        break;
      case '9_mobile':
        setIsPlaying(false);
        setCurrentTime(17);
        setVoiceOn(false);
        setIsExplainMenuOpen(false);
        setIsTranscriptOpen(false);
        setCurrentStepIndex(2);
        break;
      case 'interactive':
        setIsPlaying(true);
        setCurrentTime(0);
        setVoiceOn(false);
        setIsExplainMenuOpen(false);
        setIsTranscriptOpen(false);
        setCurrentStepIndex(2);
        break;
      default:
        // leave dynamic
        break;
    }
  }, [activeFrame]);

  // Dynamic playback timer effect (runs only in interactive mode or when actively playing)
  useEffect(() => {
    if (activeFrame !== 'interactive' && activeFrame !== '2_playing_early' && activeFrame !== '6_voice_on') {
      return;
    }
    if (!isPlaying) return;

    const intervalTime = speed === '0.75x' ? 1333 : speed === '1.25x' ? 800 : 1000;
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= totalDuration) {
          setIsPlaying(false);
          if (activeFrame === 'interactive') {
            setActiveFrame('4_ended');
          }
          return totalDuration;
        }
        return prev + 1;
      });
    }, intervalTime);
    return () => clearInterval(interval);
  }, [isPlaying, speed, activeFrame]);

  const effectiveIsPlaying =
    activeFrame === '1_not_started'
      ? false
      : activeFrame === '2_playing_early'
      ? true
      : activeFrame === '3_paused'
      ? false
      : activeFrame === '4_ended'
      ? false
      : activeFrame === '7_preparing' || activeFrame === '8_error'
      ? false
      : isPlaying;

  const effectiveVoiceOn = activeFrame === '6_voice_on' ? true : voiceOn;
  const effectiveIsExplainMenuOpen =
    activeFrame === '5_explain_menu' ? true : isExplainMenuOpen;
  const effectiveIsTranscriptOpen =
    activeFrame === '8_error' ? true : isTranscriptOpen;

  const progressPercent = Math.min(
    100,
    Math.max(0, (effectiveTime / totalDuration) * 100)
  );

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeFrame === '7_preparing' || activeFrame === '8_error') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const fraction = Math.max(0, Math.min(1, clickX / rect.width));
    const target = Math.round(fraction * totalDuration);
    setCurrentTime(target);
    if (activeFrame !== 'interactive') {
      setActiveFrame('interactive');
    }
  };

  const handlePlayClipFromPoster = () => {
    setActiveFrame('interactive');
    setCurrentTime(2);
    setIsPlaying(true);
  };

  const handleReplay = () => {
    setActiveFrame('interactive');
    setCurrentTime(2);
    setIsPlaying(true);
  };

  const handleNext = () => {
    // If at beginning / poster or early intro, advance to working/equations milestone
    if (activeFrame === '1_not_started' || effectiveTime < 10) {
      setActiveFrame('3_paused');
      setCurrentTime(21);
      setIsPlaying(false);
      setCurrentStepIndex(2);
    } else if (
      activeFrame === '2_playing_early' ||
      activeFrame === '3_paused' ||
      activeFrame === '5_explain_menu' ||
      activeFrame === '6_voice_on' ||
      activeFrame === '7_preparing' ||
      (effectiveTime >= 10 && effectiveTime < totalDuration)
    ) {
      // Advance to completed clip milestone
      setActiveFrame('4_ended');
      setCurrentTime(32);
      setIsPlaying(false);
      setIsExplainMenuOpen(false);
      setCurrentStepIndex(3);
    } else {
      // Completed clip -> proceed to Step 3
      if (onNextStep) {
        onNextStep();
      }
    }
  };

  // Caption text selection based on active frame / time
  const getCaptionText = () => {
    const scene = storyboard?.scenes.find(
      (item) => effectiveTime >= item.startSecond && effectiveTime <= item.endSecond,
    );

    if (scene) {
      return scene.caption;
    }

    if (activeScenario?.context) {
      return activeScenario.context;
    }

    if (selectedExample === 'tickets') {
      return 'Let a be adult tickets and c be child tickets. From the family pass, c = 28 − 2a.';
    }

    return storyboard?.transcript[0] ?? 'Let the unknown values be variables and write the equations clearly.';
  };

  const handleExplainAlternativeScenario = async (style: 'different-example' | 'slow-breakdown' = 'different-example') => {
    setIsGeneratingAlternateScenario(true);
    try {
      const variants = await generateScenarioVariants({
        question: selectedQuestion.prompt,
        answer: selectedQuestion.answer,
        topic: selectedQuestion.topic,
        difficulty: selectedQuestion.difficulty,
        teachingStyle: style === 'slow-breakdown' ? 'slow and careful' : 'practical and conversational',
      });

      const nextVariant = variants.find((variant) => variant.id !== (alternateScenario?.id ?? '')) ?? variants[0];
      if (nextVariant) {
        setAlternateScenario(nextVariant);
        setSelectedExample(style === 'slow-breakdown' ? 'slow_breakdown' : 'tickets');
      }
    } catch (error) {
      console.warn('Unable to generate a new scenario for this lesson:', error);
    } finally {
      setIsGeneratingAlternateScenario(false);
      setIsExplainMenuOpen(false);
    }
  };

  // Content for the stage depending on frame
  const renderStageContent = (isMobileView = false) => {
    // FRAME 7: PREPARING A CLIP
    if (activeFrame === '7_preparing') {
      return (
        <div className="w-full h-full relative flex flex-col items-center justify-center p-6 bg-[#F4F1EA] select-none">
          {/* Pulsing skeleton layout */}
          <div className="absolute inset-4 rounded-[8px] border border-[#DDD8CC]/60 bg-[#EDE9E0]/50 animate-pulse pointer-events-none" />
          <div className="absolute top-8 left-8 w-32 h-20 rounded-[6px] bg-[#EDE9E0] animate-pulse pointer-events-none" />
          <div className="absolute top-8 right-8 w-36 h-20 rounded-[6px] bg-[#EDE9E0] animate-pulse pointer-events-none" />

          {/* Three plain status lines in the middle */}
          <div className="relative z-10 bg-white border border-[#DDD8CC] rounded-[10px] p-5 shadow-xs max-w-sm w-full space-y-3 text-left">
            {/* 1. Reading your topic (done) */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#17201D] font-medium">Reading your topic</span>
              <span className="inline-flex items-center gap-1 text-[#0E5A4B] font-medium">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>(done)</span>
              </span>
            </div>

            {/* 2. Writing the steps (current) */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#0E5A4B] font-medium">Writing the steps</span>
              <span className="inline-flex items-center gap-1.5 text-[#0E5A4B] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#0E5A4B] animate-ping" />
                <span>(current)</span>
              </span>
            </div>

            {/* 3. Checking the numbers (pending) */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#7D8883]">Checking the numbers</span>
              <span className="text-[#7D8883] text-[11px]">waiting</span>
            </div>
          </div>
        </div>
      );
    }

    // FRAME 8: COULD NOT LOAD (ERROR)
    if (activeFrame === '8_error') {
      return (
        <div className="w-full h-full relative flex items-center justify-center p-6 bg-[#F4F1EA]">
          {/* Error container block (Use error colour only for errors) */}
          <div className="bg-[#F9DEDC] border border-[#B3261E]/30 rounded-[12px] p-6 text-center max-w-sm w-full shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#FCE8E6] text-[#B3261E] flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#410E0B] tracking-tight">
              We could not load this clip.
            </h3>
            <p className="text-xs text-[#410E0B]/80 mt-1.5 mb-5 leading-relaxed">
              Check your connection or review the full transcript steps on the right.
            </p>
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => setActiveFrame('interactive')}
                className="w-full py-2.5 bg-[#0E5A4B] hover:bg-[#0A4A3E] text-white text-xs font-medium rounded-[8px] transition-colors cursor-pointer"
              >
                Try again
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsTranscriptOpen(true);
                  const el = document.getElementById('transcript-heading');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full text-center text-xs font-medium text-[#0E5A4B] hover:underline cursor-pointer py-1"
              >
                Read the transcript instead
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Standard Stage: 16:9 flat visual explainer on #F4F1EA
    return (
      <div className="w-full h-full relative flex items-center justify-center p-2 sm:p-4 md:p-6 select-none bg-[#F4F1EA] overflow-hidden">
        {/* FRAME 1: NOT STARTED (Poster overlay on the stage) */}
        {activeFrame === '1_not_started' && (
          <div className="absolute inset-0 z-30 bg-[#F4F1EA] flex flex-col items-center justify-center p-6 text-center">
            <span className="text-xs font-medium text-[#4A5551] uppercase tracking-wider mb-1.5">
              Step 2 of 4
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#17201D] mb-2 tracking-tight">
              Solve one together
            </h2>
            <p className="text-sm text-[#4A5551] mb-6">
              About 30 seconds. Captions are on.
            </p>
            <button
              type="button"
              onClick={handlePlayClipFromPoster}
              className="inline-flex items-center gap-2.5 bg-[#0E5A4B] hover:bg-[#0A4A3E] text-white text-sm font-medium px-6 py-2.5 rounded-[8px] transition-colors shadow-xs cursor-pointer active:translate-y-0.5"
            >
              <Play className="w-4 h-4 fill-current ml-0.5" />
              <span>Play clip</span>
            </button>
          </div>
        )}

        {/* FRAME 4: ENDED (Dimmed stage with centered completion card) */}
        {activeFrame === '4_ended' && (
          <div className="absolute inset-0 z-30 bg-[#17201D]/40 backdrop-blur-[2px] flex items-center justify-center p-4">
            <div className="bg-white border border-[#DDD8CC] rounded-[12px] p-6 text-center max-w-xs w-full shadow-lg">
              {/* Green check in circle */}
              <div className="w-10 h-10 rounded-full bg-[#DCEFE2] text-[#0E5A4B] flex items-center justify-center mx-auto mb-3">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="font-serif text-base font-semibold text-[#17201D] mb-4">
                You have seen the whole clip
              </h3>

              <div className="space-y-2">
                {/* Primary button: Go to questions */}
                <button
                  type="button"
                  onClick={onNextStep}
                  className="w-full py-2 bg-[#0E5A4B] hover:bg-[#0A4A3E] text-white text-xs font-medium rounded-[8px] transition-colors cursor-pointer"
                >
                  Go to questions
                </button>
                {/* Secondary button: Replay */}
                <button
                  type="button"
                  onClick={handleReplay}
                  className="w-full py-2 border border-[#DDD8CC] bg-white hover:bg-[#F4F1EA] text-[#17201D] text-xs font-medium rounded-[8px] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#4A5551]" />
                  <span>Replay</span>
                </button>
                {/* Text link: Explain it differently */}
                <button
                  type="button"
                  onClick={() => setIsExplainMenuOpen(true)}
                  className="w-full text-center text-xs font-medium text-[#0E5A4B] hover:underline cursor-pointer pt-1"
                >
                  Explain it differently
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VISUAL STAGE ELEMENTS */}
        <div
          className={`flex items-center justify-center origin-center transition-all ${
            isMobileView
              ? 'scale-[0.82] gap-4'
              : 'gap-6 sm:gap-10 md:gap-14 scale-95 sm:scale-100 md:scale-105'
          }`}
        >
          <div className="flex flex-col gap-3 w-40 sm:w-48 shrink-0 z-10">
            <div className="bg-white border border-[#DDD8CC] rounded-[8px] p-3 text-xs shadow-xs">
              <div className="flex items-center justify-between text-[#4A5551] font-medium pb-2 border-b border-[#DDD8CC]">
                <span>{selectedQuestion.topic}</span>
                <span className="font-serif text-[#17201D] font-semibold text-sm">
                  {selectedQuestion.type === 'quadratic' ? 'x²' : selectedQuestion.type === 'word-problem' ? 'n' : 'eq'}
                </span>
              </div>
              <div className="mt-2.5 flex flex-col gap-1.5 text-[#17201D]">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[#4A5551]">Prompt</span>
                  <span className="font-mono text-[11px] text-[#0E5A4B]">{selectedQuestion.difficulty}</span>
                </div>
                <div className="text-[11px] leading-relaxed text-[#17201D]">
                  {selectedQuestion.prompt.slice(0, 55)}{selectedQuestion.prompt.length > 55 ? '…' : ''}
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#DDD8CC] rounded-[8px] p-3 text-xs shadow-xs">
              <div className="flex items-center justify-between text-[#4A5551] font-medium pb-2 border-b border-[#DDD8CC]">
                <span>Goal</span>
                <span className="font-serif text-[#17201D] font-semibold text-sm">{selectedQuestion.answer.split(' ').slice(0, 2).join(' ') || 'solve'}</span>
              </div>
              <div className="mt-2.5 text-[11px] leading-relaxed text-[#17201D]">
                {selectedQuestion.answer}
              </div>
            </div>
          </div>

          {activeFrame === '2_playing_early' ? (
            <div className="w-52 h-40 border border-dashed border-[#DDD8CC]/50 rounded-[8px] flex items-center justify-center text-xs text-[#7D8883] italic">
              {currentScene?.title ?? selectedQuestion.topic}
            </div>
          ) : (
            <>
              {currentScene?.id === 'setup' && (
                <div className="max-w-[320px] rounded-[12px] border border-[#DDD8CC] bg-white p-5 shadow-xs">
                  <div className="text-[11px] uppercase tracking-[0.12em] text-[#4A5551]">Context</div>
                  <div className="mt-3 font-serif text-[24px] leading-tight text-[#17201D]">
                    {selectedQuestion.prompt}
                  </div>
                  <div className="mt-4 text-[12px] text-[#4A5551] font-medium">
                    Solve for the unknowns and check the answer against the original story.
                  </div>
                </div>
              )}

              {currentScene?.id === 'equation' && (
                <div className="flex flex-col items-center justify-center font-serif italic font-normal text-2xl sm:text-3xl tracking-wide gap-3 shrink-0 text-[#17201D]">
                  {questionDisplay.map((line, index) => (
                    <div key={`${line}-${index}`} className="flex items-center gap-1.5 whitespace-nowrap leading-none">
                      <span className={index === 0 ? 'text-[#0E5A4B]' : 'text-[#B45309]'}>{line}</span>
                    </div>
                  ))}
                </div>
              )}

              {currentScene?.id === 'working' && (
                <div className="bg-white border border-[#DDD8CC] rounded-[8px] p-3.5 sm:p-4 w-44 sm:w-52 shrink-0 z-10 shadow-xs">
                  <span className="text-xs font-medium text-[#4A5551] block mb-2">
                    Working
                  </span>
                  <div className="bg-[#DCEBE6] border border-[#0E5A4B]/20 rounded-[8px] px-3 py-2.5 text-xs sm:text-sm font-serif text-[#0E5A4B] font-medium leading-tight space-y-1">
                    {workingDisplay.map((line, index) => (
                      <span key={`${line}-${index}`} className="block text-sm font-serif font-semibold">
                        {line}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {currentScene?.id === 'result' && (
                <div className="max-w-[320px] rounded-[12px] border border-[#DDD8CC] bg-white p-5 shadow-xs">
                  <div className="text-[11px] uppercase tracking-[0.12em] text-[#4A5551]">Answer</div>
                  <div className="mt-3 font-serif text-[28px] leading-tight text-[#17201D]">
                    {selectedQuestion.answer}
                  </div>
                  <div className="mt-4 text-[12px] text-[#4A5551] font-medium">
                    This satisfies the original equation and keeps the reasoning consistent.
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  // Right column: Lesson steps and Transcript accordion
  const renderRightColumnContent = () => {
    // In Frame 4 (Ended): Step 2 is done, Step 3 is current
    const isStep2Done =
      activeFrame === '4_ended' || currentStepIndex > 2;
    const isStep3Current =
      activeFrame === '4_ended' || currentStepIndex === 3;

    return (
      <div className="bg-white border border-[#DDD8CC] rounded-[12px] p-6 shadow-xs">
        <h2 className="font-serif text-lg font-medium text-[#17201D] mb-6">
          In this lesson
        </h2>

        {/* Vertical Timeline Steps with continuous rail behind markers */}
        <div className="relative flex flex-col">
          {/* Continuous vertical rail line strictly behind markers */}
          <div className="absolute left-3 top-3 bottom-8 w-[1px] bg-[#DDD8CC] z-0 pointer-events-none" />

          {/* Step 1: Watch a short clip */}
          <div
            onClick={() => setCurrentStepIndex(1)}
            className="relative z-10 flex items-start gap-3.5 pb-6 cursor-pointer group"
          >
            <div className="w-6 h-6 rounded-full bg-[#DCEFE2] text-[#0E5A4B] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[#17201D] group-hover:text-[#0E5A4B] transition-colors">
                1. Watch a short clip
              </span>
              <span className="text-xs text-[#4A5551] mt-0.5">
                Identify the two orders and variables
              </span>
            </div>
          </div>

          {/* Step 2: Solve one together */}
          <div
            onClick={() => setCurrentStepIndex(2)}
            className="relative z-10 flex items-start gap-3.5 pb-6 cursor-pointer"
          >
            {isStep2Done ? (
              <div className="w-6 h-6 rounded-full bg-[#DCEFE2] text-[#0E5A4B] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4 stroke-[2.5]" />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full border-2 border-[#0E5A4B] bg-white flex items-center justify-center shrink-0 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#0E5A4B]" />
              </div>
            )}
            <div
              className={`flex-1 p-3 rounded-[8px] border transition-colors ${
                !isStep2Done
                  ? 'bg-[#DCEBE6] border-[#0E5A4B]/20'
                  : 'bg-white border-[#DDD8CC]/70'
              }`}
            >
              <span
                className={`text-sm font-medium block leading-tight ${
                  !isStep2Done ? 'text-[#0E5A4B]' : 'text-[#17201D]'
                }`}
              >
                2. Solve one together
              </span>
              <span className="text-xs text-[#4A5551] mt-1 block">
                Rearrange bill 1 to isolate d
              </span>
            </div>
          </div>

          {/* Step 3: Guided question */}
          <div
            onClick={() => setCurrentStepIndex(3)}
            className="relative z-10 flex items-start gap-3.5 pb-6 cursor-pointer group"
          >
            {isStep3Current ? (
              <div className="w-6 h-6 rounded-full border-2 border-[#0E5A4B] bg-white flex items-center justify-center shrink-0 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#0E5A4B]" />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full border-2 border-[#DDD8CC] bg-white shrink-0 mt-0.5 group-hover:border-[#0E5A4B] transition-colors" />
            )}
            <div
              className={`flex-1 ${
                isStep3Current
                  ? 'bg-[#DCEBE6] p-3 rounded-[8px] border border-[#0E5A4B]/20'
                  : 'flex flex-col'
              }`}
            >
              <span
                className={`text-sm font-medium transition-colors ${
                  isStep3Current
                    ? 'text-[#0E5A4B]'
                    : 'text-[#4A5551] group-hover:text-[#17201D]'
                }`}
              >
                3. Guided question
              </span>
              <span
                className={`text-xs mt-0.5 ${
                  isStep3Current ? 'text-[#4A5551]' : 'text-[#7D8883]'
                }`}
              >
                Substitute into bill 2 and solve for b
              </span>
            </div>
          </div>

          {/* Step 4: Your turn */}
          <div
            onClick={() => setCurrentStepIndex(4)}
            className="relative z-10 flex items-start gap-3.5 pb-2 cursor-pointer group"
          >
            <div className="w-6 h-6 rounded-full border-2 border-[#DDD8CC] bg-white shrink-0 mt-0.5 group-hover:border-[#0E5A4B] transition-colors" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[#4A5551] group-hover:text-[#17201D] transition-colors">
                4. Your turn
              </span>
              <span className="text-xs text-[#7D8883] mt-0.5">
                Check the solution in both bills
              </span>
            </div>
          </div>
        </div>

        {/* Divider & Transcript Accordion */}
        <div className="border-t border-[#DDD8CC] mt-4 pt-1">
          <button
            type="button"
            id="transcript-heading"
            onClick={() => setIsTranscriptOpen(!effectiveIsTranscriptOpen)}
            className="w-full text-sm font-medium text-[#17201D] flex items-center justify-between py-3 cursor-pointer group text-left"
          >
            <span className="flex items-center gap-2">
              <span>Transcript</span>
              {activeFrame === '8_error' && (
                <span className="text-[11px] font-normal text-[#0E5A4B] bg-[#DCEBE6] px-1.5 py-0.5 rounded">
                  Open
                </span>
              )}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-[#4A5551] transition-transform duration-200 group-hover:text-[#17201D] ${
                effectiveIsTranscriptOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {effectiveIsTranscriptOpen && (
            <div className="text-xs text-[#4A5551] leading-relaxed pb-2 border-t border-[#DDD8CC]/50 pt-2.5 space-y-2.5">
              {/* Three timed lines as requested */}
              {transcriptLines.map((line, index) => (
                <p key={`${line}-${index}`}>
                  <strong className="text-[#17201D] font-mono mr-1.5">
                    {index === 0 ? '0:00' : index === 1 ? '0:09' : '0:17'}
                  </strong>
                  <span>{line}</span>
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // =========================================================================
  // SIMPLE FRAME SWITCHER: only the 4 lesson steps remain visible
  // =========================================================================


  // =========================================================================
  // FRAME 9: MOBILE VIEW RENDERING (360px viewport simulation or native mobile)
  // =========================================================================
  if (activeFrame === '9_mobile') {
    return (
      <div className="min-h-screen bg-[#EDE9E0]/40 flex flex-col items-center justify-start py-4 px-2 font-sans text-[#17201D] antialiased">
        {/* 360px Mobile Frame Shell */}
        <div className="w-full max-w-[360px] bg-[#FAF8F4] border border-[#DDD8CC] rounded-[16px] shadow-lg overflow-hidden flex flex-col my-auto">
          {/* 1. Compact Header (back arrow, title, "Step 2 of 4") */}
          <header className="w-full bg-[#FAF8F4] border-b border-[#DDD8CC] px-4 h-12 flex items-center justify-between sticky top-0 z-20">
            <button
              type="button"
              onClick={onExit}
              className="inline-flex items-center text-[#4A5551] hover:text-[#0E5A4B] transition-colors p-1"
              aria-label="Exit lesson"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="font-serif text-base font-medium text-[#17201D] tracking-tight">
              {lessonTitle}
            </h1>
            <span className="text-xs text-[#4A5551] font-medium">
              Step 2 of 4
            </span>
          </header>

          <main className="w-full flex flex-col">
            {/* 2. Stage at full width */}
            <div className="w-full bg-[#F4F1EA] aspect-[16/9] border-b border-[#DDD8CC] relative overflow-hidden">
              {renderStageContent(true)}
            </div>

            {/* 3. Caption below stage */}
            <div className="px-4 py-3 bg-white border-b border-[#DDD8CC]">
              <p className="font-serif text-[15px] text-[#17201D] leading-snug">
                {getCaptionText()}
              </p>
            </div>

            {/* 4. Controls wrapping into two rows */}
            <div className="px-4 py-3 bg-white border-b border-[#DDD8CC] flex flex-col gap-2.5">
              {/* Row 1: Play, timeline and time */}
              <div className="flex items-center gap-2.5 w-full">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-9 h-9 rounded-[6px] bg-[#0E5A4B] text-white flex items-center justify-center shrink-0 cursor-pointer shadow-xs"
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  )}
                </button>

                {/* Timeline */}
                <div
                  onClick={handleTimelineClick}
                  className="relative flex-1 flex items-center h-5 cursor-pointer"
                >
                  <div className="w-full h-1.5 rounded-full bg-[#DDD8CC] relative">
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-[#0E5A4B] rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 -ml-1 w-2.5 h-2.5 rounded-full bg-[#0E5A4B] border border-white shadow-xs"
                      style={{ left: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Time */}
                <span className="text-[11px] font-mono text-[#4A5551] tabular-nums whitespace-nowrap">
                  {formatTime(effectiveTime)} / {formatTime(totalDuration)}
                </span>
              </div>

              {/* Row 2: Speed and Voice */}
              <div className="flex items-center justify-between pt-1">
                {/* Speed selector */}
                <div className="inline-flex rounded-[6px] border border-[#DDD8CC] p-0.5 bg-white text-[11px]">
                  {(['0.75x', '1x', '1.25x'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSpeed(s)}
                      className={`px-1.5 py-0.5 rounded-[4px] ${
                        speed === s
                          ? 'bg-[#DCEBE6] text-[#0E5A4B] font-medium'
                          : 'text-[#4A5551]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Voice toggle */}
                <div className="flex items-center gap-1.5 text-xs text-[#4A5551]">
                  {effectiveVoiceOn && (
                    <Volume2 className="w-3.5 h-3.5 text-[#0E5A4B]" />
                  )}
                  <span>Voice</span>
                  <button
                    type="button"
                    onClick={() => setVoiceOn(!voiceOn)}
                    className={`w-8 h-4 rounded-full p-0.5 flex items-center transition-colors ${
                      effectiveVoiceOn ? 'bg-[#0E5A4B]' : 'bg-[#DDD8CC]'
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full bg-white transition-transform ${
                        effectiveVoiceOn ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* 5. "Explain it differently" as full-width secondary button */}
            <div className="px-4 py-3 bg-[#FAF8F4] border-b border-[#DDD8CC]">
              <button
                type="button"
                onClick={() => setIsExplainMenuOpen(!effectiveIsExplainMenuOpen)}
                className="w-full border border-[#DDD8CC] bg-white text-[#17201D] text-xs font-medium py-2 px-3 rounded-[8px] hover:bg-[#F4F1EA] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Explain it differently</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#4A5551] transition-transform ${
                    effectiveIsExplainMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {effectiveIsExplainMenuOpen && (
                <div className="mt-2 bg-white border border-[#DDD8CC] rounded-[8px] shadow-md p-2 space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      void handleExplainAlternativeScenario('different-example');
                    }}
                    disabled={isGeneratingAlternateScenario}
                    className="w-full text-left p-2 rounded hover:bg-[#FAF8F4] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <div className="text-xs font-medium text-[#17201D]">
                      {isGeneratingAlternateScenario ? 'Generating another example…' : 'Use a different example'}
                    </div>
                    <div className="text-[11px] text-[#4A5551] mt-0.5">
                      Work through isolating a variable with a new real-world context.
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      void handleExplainAlternativeScenario('slow-breakdown');
                    }}
                    disabled={isGeneratingAlternateScenario}
                    className="w-full text-left p-2 rounded hover:bg-[#FAF8F4] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <div className="text-xs font-medium text-[#17201D]">
                      {isGeneratingAlternateScenario ? 'Preparing a slower breakdown…' : 'Go through it more slowly'}
                    </div>
                    <div className="text-[11px] text-[#4A5551] mt-0.5">
                      Adds pause points after every algebraic manipulation.
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Next Action Button */}
            <div className="px-4 py-2.5 bg-[#FAF8F4] border-b border-[#DDD8CC]">
              <button
                type="button"
                onClick={handleNext}
                className="w-full bg-[#0E5A4B] hover:bg-[#0A4A3E] text-white text-xs font-medium py-2.5 px-4 rounded-[8px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:translate-y-0.5"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 6. "In this lesson" and "Transcript" as accordions below */}
            <div className="divide-y divide-[#DDD8CC] bg-white">
              {/* Accordion 1: In this lesson */}
              <div className="px-4 py-2.5">
                <button
                  type="button"
                  onClick={() =>
                    setIsLessonOutlineOpenMobile(!isLessonOutlineOpenMobile)
                  }
                  className="w-full flex items-center justify-between text-xs font-semibold text-[#17201D] py-1 cursor-pointer"
                >
                  <span>In this lesson</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#4A5551] transition-transform ${
                      isLessonOutlineOpenMobile ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isLessonOutlineOpenMobile && (
                  <div className="pt-2 pb-1">
                    {renderRightColumnContent()}
                  </div>
                )}
              </div>

              {/* Accordion 2: Transcript */}
              <div className="px-4 py-2.5">
                <button
                  type="button"
                  onClick={() => setIsTranscriptOpen(!effectiveIsTranscriptOpen)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-[#17201D] py-1 cursor-pointer"
                >
                  <span>Transcript</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#4A5551] transition-transform ${
                      effectiveIsTranscriptOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {effectiveIsTranscriptOpen && (
                  <div className="pt-2 text-[11px] text-[#4A5551] space-y-2">
                    {transcriptLines.map((line, index) => (
                      <p key={`${line}-${index}`}>
                        <strong className="text-[#17201D]">
                          {index === 0 ? '0:00' : index === 1 ? '0:09' : '0:17'}
                        </strong>{' '}
                        {line}
                      </p>
                    ))}
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
    <div className="w-full min-h-screen bg-[#FAF8F4] text-[#17201D] font-sans antialiased selection:bg-[#DCEBE6] selection:text-[#0E5A4B] flex flex-col justify-between relative pb-16">
      <div>
        {/* Top Navigation Bar (64px) - Stays identical in every desktop frame */}
        <header className="w-full bg-[#FAF8F4] border-b border-[#DDD8CC] h-16 sticky top-0 z-20">
          <div className="max-w-[1120px] mx-auto px-6 h-full flex items-center justify-between">
            {/* Left: Exit link */}
            <button
              type="button"
              onClick={onExit}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#4A5551] hover:text-[#0E5A4B] transition-colors group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 text-[#4A5551] group-hover:text-[#0E5A4B]" />
              <span>Exit lesson</span>
            </button>

            {/* Centre: Lesson title & subline */}
            <div className="text-center flex flex-col items-center justify-center">
              <h1 className="font-serif text-lg font-medium leading-none text-[#17201D]">
                {lessonTitle}
              </h1>
              <p className="text-xs text-[#4A5551] mt-1 leading-none">
                {lessonTopic}
              </p>
            </div>

            {/* Right: Step indicator & Segmented progress bar */}
            <div className="flex items-center gap-3.5">
              <span className="text-sm text-[#4A5551] hidden sm:inline">
                Step 2 of 4: Solve one together
              </span>
              {/* 4-segment indicator: 1 filled, 2 half, 3 empty, 4 empty */}
              <div
                aria-label="Progress: step 2 of 4"
                className="w-28 sm:w-32 h-1.5 flex gap-1 items-center"
              >
                {/* Segment 1: Completed */}
                <div className="h-full flex-1 rounded-[2px] bg-[#0E5A4B]" />
                {/* Segment 2: In-progress */}
                <div className="h-full flex-1 rounded-[2px] flex overflow-hidden">
                  <span className="w-1/2 h-full bg-[#0E5A4B]" />
                  <span className="w-1/2 h-full bg-[#DDD8CC]" />
                </div>
                {/* Segment 3: Not started */}
                <div className="h-full flex-1 rounded-[2px] bg-[#DDD8CC]" />
                {/* Segment 4: Not started */}
                <div className="h-full flex-1 rounded-[2px] bg-[#DDD8CC]" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Stage & Navigation Area */}
        <main className="w-full max-w-[1120px] mx-auto px-6 pt-8 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Primary Clip Player (8 cols) */}
            <div className="lg:col-span-8 flex flex-col">
              {/* Player Container Card */}
              <div className="bg-white border border-[#DDD8CC] rounded-[12px] overflow-hidden flex flex-col shadow-xs">
                {/* 1. Stage (16:9 flat visual explainer on #F4F1EA) */}
                <div className="w-full bg-[#F4F1EA] aspect-[16/9] relative select-none overflow-hidden">
                  {renderStageContent(false)}
                </div>

                {/* 2. Caption Bar Under Stage */}
                <div className="border-t border-[#DDD8CC] px-6 py-4 bg-white">
                  <p className="font-serif text-[18px] text-[#17201D] leading-relaxed">
                    {getCaptionText()}
                  </p>
                </div>

                {/* 3. Control Row */}
                <div
                  className={`px-6 py-3.5 bg-white border-t border-[#DDD8CC] flex flex-wrap items-center justify-between gap-4 transition-opacity ${
                    activeFrame === '7_preparing'
                      ? 'opacity-40 pointer-events-none select-none'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-[280px]">
                    {/* Play / Pause Button */}
                    <button
                      type="button"
                      disabled={activeFrame === '7_preparing'}
                      onClick={() => {
                        if (activeFrame === '1_not_started') {
                          handlePlayClipFromPoster();
                        } else if (activeFrame === '3_paused') {
                          setIsPlaying(true);
                          setActiveFrame('interactive');
                        } else {
                          setIsPlaying(!isPlaying);
                        }
                      }}
                      aria-label={effectiveIsPlaying ? 'Pause' : 'Play'}
                      className="w-11 h-11 rounded-[8px] bg-[#0E5A4B] text-white flex items-center justify-center hover:bg-[#0A4A3E] transition-transform active:translate-y-0.5 shrink-0 cursor-pointer shadow-xs disabled:cursor-not-allowed"
                    >
                      {effectiveIsPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>

                    {/* Timeline Bar */}
                    <div
                      onClick={handleTimelineClick}
                      className="relative flex-1 flex items-center h-6 cursor-pointer group"
                      id="timelineContainer"
                    >
                      <div className="w-full h-1.5 rounded-full bg-[#DDD8CC] relative overflow-visible">
                        {/* Progress Fill */}
                        <div
                          className="absolute left-0 top-0 bottom-0 bg-[#0E5A4B] rounded-full transition-all duration-150"
                          style={{ width: `${progressPercent}%` }}
                        />
                        {/* Playhead Knob */}
                        <div
                          className="absolute top-1/2 -translate-y-1/2 -ml-1.5 w-3 h-3 rounded-full bg-[#0E5A4B] border-2 border-white ring-1 ring-[#0E5A4B]/20 transition-all duration-150"
                          style={{ left: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Time Display */}
                    <span className="text-xs font-mono text-[#4A5551] whitespace-nowrap tabular-nums">
                      {formatTime(effectiveTime)} / {formatTime(totalDuration)}
                    </span>

                    {/* FRAME 3 REQUIREMENT: Small "Paused" label in the control row */}
                    {activeFrame === '3_paused' && (
                      <span className="text-xs font-medium text-[#4A5551] bg-[#F4F1EA] border border-[#DDD8CC] px-2 py-0.5 rounded-[4px] select-none">
                        Paused
                      </span>
                    )}
                  </div>

                  {/* Right Controls: Speed, Captions, Voice Toggle */}
                  <div className="flex items-center gap-5 shrink-0">
                    {/* Three-option Speed Segment */}
                    <div
                      aria-label="Playback speed"
                      className="inline-flex rounded-[8px] border border-[#DDD8CC] p-0.5 bg-white text-xs select-none"
                      role="radiogroup"
                    >
                      {(['0.75x', '1x', '1.25x'] as const).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSpeed(s)}
                          aria-checked={speed === s}
                          className={`px-2 py-1 rounded-[6px] transition-colors cursor-pointer ${
                            speed === s
                              ? 'bg-[#DCEBE6] text-[#0E5A4B] font-medium border border-[#0E5A4B]/30'
                              : 'text-[#4A5551] hover:text-[#17201D]'
                          }`}
                          role="radio"
                        >
                          {s}
                        </button>
                      ))}
                    </div>

                    {/* Captions Status */}
                    <button
                      type="button"
                      onClick={() => setCaptionsOn(!captionsOn)}
                      className="flex items-center gap-1.5 text-xs text-[#17201D] font-medium cursor-pointer"
                    >
                      {captionsOn && (
                        <Check className="w-4 h-4 text-[#0E5A4B] stroke-[2.5]" />
                      )}
                      <span
                        className={captionsOn ? 'text-[#17201D]' : 'text-[#7D8883]'}
                      >
                        Captions {captionsOn ? 'on' : 'off'}
                      </span>
                    </button>

                    {/* Voice Switch (Frame 6: speaker icon beside it) */}
                    <div className="flex items-center gap-2 text-xs text-[#4A5551]">
                      {effectiveVoiceOn && (
                        <Volume2 className="w-3.5 h-3.5 text-[#0E5A4B] shrink-0" />
                      )}
                      <span>Voice</span>
                      <button
                        type="button"
                        onClick={() => setVoiceOn(!effectiveVoiceOn)}
                        aria-checked={effectiveVoiceOn}
                        role="switch"
                        className={`w-9 h-5 rounded-full p-0.5 flex items-center transition-colors focus:outline-none cursor-pointer ${
                          effectiveVoiceOn ? 'bg-[#0E5A4B]' : 'bg-[#DDD8CC]'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white transition-transform ${
                            effectiveVoiceOn ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* FRAME 6 REQUIREMENT: Line under controls when Voice is on */}
                {effectiveVoiceOn && (
                  <div className="px-6 py-2 bg-[#F4F1EA]/70 border-t border-[#DDD8CC]/70 text-xs text-[#4A5551]">
                    Voice is a recording. Captions stay on.
                  </div>
                )}

                {/* 4. Action Row Under Controls */}
                <div className="px-6 py-4 bg-[#FAF8F4] border-t border-[#DDD8CC] flex items-center justify-between relative">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setIsExplainMenuOpen(!effectiveIsExplainMenuOpen)
                      }
                      className="inline-flex items-center gap-2 border border-[#DDD8CC] bg-white text-[#17201D] text-sm font-medium px-4 py-2 rounded-[8px] hover:bg-[#F4F1EA] transition-all active:translate-y-0.5 cursor-pointer shadow-xs"
                    >
                      <span>Explain it differently</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#4A5551] transition-transform ${
                          effectiveIsExplainMenuOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* FRAME 5: Popover above button with two options and soft overlay shadow */}
                    {effectiveIsExplainMenuOpen && (
                      <div className="absolute left-0 bottom-full mb-2 w-80 bg-white border border-[#DDD8CC] rounded-[8px] shadow-lg p-2 z-30">
                        {/* Option 1: Use a different example */}
                        <button
                          type="button"
                          onClick={() => {
                            void handleExplainAlternativeScenario('different-example');
                          }}
                          disabled={isGeneratingAlternateScenario}
                          className={`w-full text-left p-2.5 rounded-[6px] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
                            selectedExample === 'tickets'
                              ? 'bg-[#DCEBE6] border border-[#0E5A4B]/30'
                              : 'hover:bg-[#FAF8F4]'
                          }`}
                        >
                          <div className="text-xs font-semibold text-[#17201D] flex items-center justify-between">
                            <span>{isGeneratingAlternateScenario ? 'Generating another example…' : 'Use a different example'}</span>
                            {selectedExample === 'tickets' && !isGeneratingAlternateScenario && (
                              <Check className="w-3.5 h-3.5 text-[#0E5A4B] stroke-[2.5]" />
                            )}
                          </div>
                          <p className="text-[11px] text-[#4A5551] mt-1 leading-snug">
                            Work through isolating a variable with a new real-world context.
                          </p>
                        </button>

                        {/* Option 2: Go through it more slowly */}
                        <button
                          type="button"
                          onClick={() => {
                            void handleExplainAlternativeScenario('slow-breakdown');
                          }}
                          disabled={isGeneratingAlternateScenario}
                          className={`w-full text-left p-2.5 rounded-[6px] transition-colors cursor-pointer mt-1 disabled:opacity-60 disabled:cursor-not-allowed ${
                            selectedExample === 'slow_breakdown'
                              ? 'bg-[#DCEBE6] border border-[#0E5A4B]/30'
                              : 'hover:bg-[#FAF8F4]'
                          }`}
                        >
                          <div className="text-xs font-semibold text-[#17201D] flex items-center justify-between">
                            <span>{isGeneratingAlternateScenario ? 'Preparing a slower breakdown…' : 'Go through it more slowly'}</span>
                            {selectedExample === 'slow_breakdown' && !isGeneratingAlternateScenario && (
                              <Check className="w-3.5 h-3.5 text-[#0E5A4B] stroke-[2.5]" />
                            )}
                          </div>
                          <p className="text-[11px] text-[#4A5551] mt-1 leading-snug">
                            Adds pause points after every algebraic manipulation.
                          </p>
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 bg-[#0E5A4B] hover:bg-[#0A4A3E] text-white text-sm font-medium px-5 py-2 rounded-[8px] transition-colors cursor-pointer shadow-xs active:translate-y-0.5"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4 stroke-[2]" />
                  </button>
                </div>
              </div>

              {/* Meta Line Below Player */}
              <div className="mt-3 text-xs text-[#4A5551] flex items-center gap-1.5 px-1">
                <span>Generated explanation.</span>
                <button
                  type="button"
                  onClick={onOpenReport}
                  className="text-[#0E5A4B] hover:underline underline-offset-2 cursor-pointer font-medium"
                >
                  Report a problem
                </button>
              </div>
            </div>

            {/* Right Column: Lesson Outline (4 cols) */}
            <aside className="lg:col-span-4 w-full">
              {renderRightColumnContent()}
            </aside>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-[#DDD8CC]/70 py-6 bg-[#FAF8F4] mt-auto">
        <div className="max-w-[1120px] mx-auto px-6 flex items-center justify-between text-xs text-[#4A5551]">
          <span>&copy; 2025 Silo</span>
          <span>Simultaneous equations &middot; Step 2 of 4</span>
        </div>
      </footer>
    </div>
  );
};


