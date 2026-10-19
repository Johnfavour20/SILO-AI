import React, { useState } from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  LineChart,
  History,
  Settings,
  Play,
  ChevronRight,
  Split,
  RotateCcw,
  BookOpen,
  Menu,
  X,
  Info,
  LogOut,
} from 'lucide-react';

interface DashboardPageProps {
  userEmail?: string | null;
  onNavigateHome?: () => void;
  onStartSession?: (scenarioId: string) => void;
  onOpenTopicPicker?: () => void;
  onOpenReportModal?: () => void;
  onSignOut?: () => void;
}

interface SessionBarData {
  date: string;
  hints: number;
  concept: string;
}

interface ConceptProgressItem {
  id: string;
  name: string;
  topic: string;
  sessionsCount: number;
  lastPractised: string;
  status: 'Needs practice' | 'Getting there' | 'Secure' | 'Not enough data yet';
  statusType: 'primary' | 'secondary' | 'success' | 'neutral';
  hasEarlyEstimate: boolean;
  factualLine: string;
  actionType: 'practise' | 'resume';
  scenarioId: string;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  userEmail,
  onNavigateHome,
  onStartSession,
  onOpenTopicPicker,
  onSignOut,
}) => {
  // Navigation active tab: Dashboard by default
  const [activeNav, setActiveNav] = useState<'dashboard' | 'practise' | 'progress' | 'history' | 'settings'>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Screen 10 Progress State
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);
  const [hoveredInfoId, setHoveredInfoId] = useState<string | null>(null);
  const [selectedConceptFilter, setSelectedConceptFilter] = useState<'All' | 'Needs practice' | 'Getting there' | 'Secure'>('All');
  const [sortBy, setSortBy] = useState<'last-practised' | 'alphabetical' | 'sessions'>('last-practised');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'practise', label: 'Practise', icon: GraduationCap },
    { id: 'progress', label: 'Progress', icon: LineChart },
    { id: 'history', label: 'History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  const handleStart = (scenarioId: string = 'fundraiser-stall') => {
    if (onStartSession) {
      onStartSession(scenarioId);
    }
  };

  const handleOpenTopics = () => {
    if (onOpenTopicPicker) {
      onOpenTopicPicker();
    }
  };

  // Screen 10 Chart data: 8 sessions with dates and hints used (values: 3, 3, 2, 3, 2, 1, 1, 2)
  const chartData: SessionBarData[] = [
    { date: '3 Oct', hints: 3, concept: 'Word problems' },
    { date: '5 Oct', hints: 3, concept: 'Elimination' },
    { date: '8 Oct', hints: 2, concept: 'Substitution' },
    { date: '10 Oct', hints: 3, concept: 'Word problems' },
    { date: '13 Oct', hints: 2, concept: 'Word problems' },
    { date: '15 Oct', hints: 1, concept: 'Elimination' },
    { date: '16 Oct', hints: 1, concept: 'Substitution' },
    { date: '17 Oct', hints: 2, concept: 'Substitution' },
  ];

  // Screen 10 Concepts list (Strictly: Simultaneous & Quadratic equations, covering Substitution, Elimination, Word problems)
  const conceptsData: ConceptProgressItem[] = [
    {
      id: 'substitution-sim',
      name: 'Substitution',
      topic: 'Simultaneous equations',
      sessionsCount: 2,
      lastPractised: '17 Oct',
      status: 'Getting there',
      statusType: 'primary',
      hasEarlyEstimate: true,
      factualLine: 'The first step needed a hint in 1 of 3 practice questions.',
      actionType: 'practise',
      scenarioId: 'simultaneous-lunch',
    },
    {
      id: 'elimination-sim',
      name: 'Elimination',
      topic: 'Simultaneous equations',
      sessionsCount: 1,
      lastPractised: '15 Oct',
      status: 'Needs practice',
      statusType: 'secondary',
      hasEarlyEstimate: true,
      factualLine: 'The full solution was needed on 2 of 2 practice questions.',
      actionType: 'practise',
      scenarioId: 'simultaneous-lunch',
    },
    {
      id: 'word-problems-sim',
      name: 'Word problems',
      topic: 'Simultaneous equations',
      sessionsCount: 1,
      lastPractised: '13 Oct',
      status: 'Not enough data yet',
      statusType: 'neutral',
      hasEarlyEstimate: false,
      factualLine: 'A lesson is in progress.',
      actionType: 'resume',
      scenarioId: 'simultaneous-lunch',
    },
    {
      id: 'substitution-quad',
      name: 'Substitution',
      topic: 'Quadratic equations',
      sessionsCount: 1,
      lastPractised: '8 Oct',
      status: 'Needs practice',
      statusType: 'secondary',
      hasEarlyEstimate: true,
      factualLine: 'The lesson was not finished.',
      actionType: 'practise',
      scenarioId: 'fundraiser-stall',
    },
    {
      id: 'word-problems-quad',
      name: 'Word problems',
      topic: 'Quadratic equations',
      sessionsCount: 3,
      lastPractised: '10 Oct',
      status: 'Secure',
      statusType: 'success',
      hasEarlyEstimate: false,
      factualLine: 'No hints needed in the last 2 sessions.',
      actionType: 'practise',
      scenarioId: 'fundraiser-stall',
    },
  ];

  const filteredConcepts = conceptsData.filter((item) => {
    if (selectedConceptFilter === 'All') return true;
    return item.status === selectedConceptFilter;
  });

  const sortedConcepts = [...filteredConcepts].sort((a, b) => {
    if (sortBy === 'alphabetical') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'sessions') {
      return b.sessionsCount - a.sessionsCount;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#17201D] font-sans flex flex-col">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-[#FAF8F4] border-b border-[#DDD8CC]">
        <div className="max-w-[1120px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between gap-6">
          {/* Left: Brand Wordmark & Nav items */}
          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={onNavigateHome}
              className="font-serif text-[24px] font-semibold text-[#17201D] tracking-tight hover:text-[#0E5A4B] transition-colors cursor-pointer"
            >
              Silo
            </button>

            {/* Desktop Navigation Items */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveNav(item.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-[8px] text-[14px] font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#DCEBE6] text-[#0E5A4B]'
                        : 'text-[#4A5551] hover:text-[#17201D] hover:bg-[#FAF8F4]'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: User Profile & Actions */}
          <div className="flex items-center gap-4">
            {/* User pill */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#DCEBE6] text-[#0E5A4B] font-semibold text-[13px] flex items-center justify-center border border-[#DDD8CC]">
                AO
              </div>
              <div className="text-left hidden lg:block leading-tight">
                <div className="text-[13px] font-medium text-[#17201D]">Amara Okafor</div>
                <div className="text-[11px] text-[#4A5551]">Senior secondary</div>
              </div>
            </div>

            {onSignOut && (
              <button
                type="button"
                onClick={onSignOut}
                className="text-[13px] text-[#4A5551] hover:text-[#17201D] transition-colors cursor-pointer flex items-center gap-1.5"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" strokeWidth={1.5} />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-[8px] text-[#4A5551] hover:bg-[#FAF8F4] cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" strokeWidth={1.5} />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#DDD8CC] bg-[#FAF8F4] px-6 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveNav(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-[14px] font-medium text-left ${
                    isActive
                      ? 'bg-[#DCEBE6] text-[#0E5A4B]'
                      : 'text-[#4A5551] hover:text-[#17201D]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </nav>

      {/* Main Content Area: 48px margins on desktop, max-w 1120px */}
      <main className="w-full max-w-[1120px] mx-auto p-6 lg:p-12 space-y-8 flex-1">
        {/* ========================================================
            SCREEN 9: LEARNER DASHBOARD VIEW
           ======================================================== */}
        {activeNav === 'dashboard' && (
          <>
            {/* Header: title "Hello, Amara" in serif, subtitle in body-md */}
            <header>
              <h1 className="font-serif text-[32px] font-semibold text-[#17201D] tracking-tight">
                Hello, Amara
              </h1>
              <p className="text-[16px] text-[#4A5551] mt-1">
                Pick up where you left off.
              </p>
            </header>

            {/* Row 1: Two cards side by side (about 8 and 4 columns) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Continue card (wide, ~8 cols) */}
              <section className="lg:col-span-8 bg-[#FFFFFF] border border-[#DDD8CC] rounded-[12px] p-6 flex flex-col justify-between">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {/* 16:9 Illustrated clip thumbnail in Silo style */}
                  <div className="w-full sm:w-[220px] aspect-[16/9] shrink-0 bg-[#FAF8F4] border border-[#DDD8CC] rounded-[8px] overflow-hidden relative p-3 flex items-center justify-center">
                    <svg
                      viewBox="0 0 220 124"
                      className="w-full h-full"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="220" height="124" fill="#FAF8F4" />
                      {/* Lunch Receipt 1 */}
                      <g transform="rotate(-3 55 60)">
                        <rect
                          x="20"
                          y="14"
                          width="75"
                          height="92"
                          rx="4"
                          fill="#FFFFFF"
                          stroke="#DDD8CC"
                          strokeWidth="1"
                        />
                        <line x1="28" y1="26" x2="65" y2="26" stroke="#4A5551" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="28" y1="34" x2="52" y2="34" stroke="#DDD8CC" strokeWidth="1" />
                        <text x="28" y="52" fill="#17201D" fontFamily="Georgia, serif" fontSize="10" fontWeight="600">
                          2x + y = 14
                        </text>
                        <line x1="28" y1="62" x2="80" y2="62" stroke="#DDD8CC" strokeWidth="1" strokeDasharray="2 2" />
                        <text x="28" y="76" fill="#4A5551" fontFamily="sans-serif" fontSize="7">
                          Receipt #104
                        </text>
                        <text x="28" y="88" fill="#0E5A4B" fontFamily="Georgia, serif" fontSize="8" fontWeight="500">
                          y = 14 - 2x
                        </text>
                      </g>
                      {/* Lunch Receipt 2 */}
                      <g transform="rotate(2 145 60)">
                        <rect
                          x="115"
                          y="16"
                          width="75"
                          height="92"
                          rx="4"
                          fill="#FFFFFF"
                          stroke="#DDD8CC"
                          strokeWidth="1"
                        />
                        <line x1="123" y1="28" x2="160" y2="28" stroke="#4A5551" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="123" y1="36" x2="148" y2="36" stroke="#DDD8CC" strokeWidth="1" />
                        <text x="123" y="54" fill="#17201D" fontFamily="Georgia, serif" fontSize="10" fontWeight="600">
                          x + 3y = 22
                        </text>
                        <line x1="123" y1="64" x2="175" y2="64" stroke="#DDD8CC" strokeWidth="1" strokeDasharray="2 2" />
                        <text x="123" y="78" fill="#4A5551" fontFamily="sans-serif" fontSize="7">
                          Receipt #105
                        </text>
                        <text x="123" y="90" fill="#0E5A4B" fontFamily="Georgia, serif" fontSize="8" fontWeight="500">
                          substitute y
                        </text>
                      </g>
                    </svg>
                  </div>

                  {/* Right content of Continue card */}
                  <div className="flex-1 space-y-2 min-w-0">
                    <span className="text-[12px] text-[#4A5551] font-medium block">
                      Continue
                    </span>
                    <h2 className="font-serif text-[22px] font-semibold text-[#17201D] leading-tight">
                      Substitution
                    </h2>
                    <p className="text-[14px] text-[#4A5551]">
                      Simultaneous equations, lesson 2 of 4
                    </p>

                    <div className="pt-2 flex items-center gap-3">
                      <div className="flex-1 h-[6px] bg-[#FAF8F4] border border-[#DDD8CC] rounded-full overflow-hidden">
                        <div className="h-full bg-[#0E5A4B] rounded-full w-1/2" />
                      </div>
                      <span className="text-[12px] text-[#4A5551] font-medium shrink-0">
                        Step 2 of 4
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#DDD8CC] flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleStart('simultaneous-lunch')}
                    className="px-4 py-2 bg-[#0E5A4B] hover:bg-[#0A4337] text-[#FFFFFF] rounded-[8px] text-[14px] font-medium flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Resume</span>
                  </button>
                </div>
              </section>

              {/* Your topics card (narrow, ~4 cols) */}
              <section className="lg:col-span-4 bg-[#FFFFFF] border border-[#DDD8CC] rounded-[12px] p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <h2 className="font-serif text-[18px] font-semibold text-[#17201D]">
                    Your topics
                  </h2>

                  {/* Topic Row 1: Simultaneous equations */}
                  <div className="space-y-1.5">
                    <div className="text-[15px] font-medium text-[#17201D]">
                      Simultaneous equations
                    </div>
                    <div className="text-[13px] text-[#4A5551]">
                      1 of 4 lessons done
                    </div>
                    <div className="h-[6px] w-full bg-[#FAF8F4] border border-[#DDD8CC] rounded-full overflow-hidden mt-1.5">
                      <div className="h-full bg-[#0E5A4B] rounded-full w-1/4" />
                    </div>
                  </div>

                  {/* Topic Row 2: Quadratic equations */}
                  <div className="pt-4 border-t border-[#DDD8CC] flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[15px] font-medium text-[#17201D]">
                        Quadratic equations
                      </div>
                      <div className="text-[13px] text-[#4A5551]">
                        Not started
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleStart('fundraiser-stall')}
                      className="px-3.5 py-1.5 bg-[#FFFFFF] border border-[#DDD8CC] hover:bg-[#FAF8F4] text-[#17201D] rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer shrink-0"
                    >
                      Start
                    </button>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#DDD8CC]">
                  <button
                    type="button"
                    onClick={handleOpenTopics}
                    className="text-[13px] text-[#0E5A4B] hover:underline font-medium cursor-pointer"
                  >
                    See all lessons
                  </button>
                </div>
              </section>
            </div>

            {/* Row 2: Worth revisiting section */}
            <section className="space-y-3">
              <div>
                <h2 className="font-serif text-[20px] font-semibold text-[#17201D]">
                  Worth revisiting
                </h2>
                <p className="text-[14px] text-[#4A5551]">
                  Based on your last 8 sessions.
                </p>
              </div>

              <div className="bg-[#FFFFFF] border border-[#DDD8CC] rounded-[12px] divide-y divide-[#DDD8CC]">
                {/* Item 1: Elimination */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[8px] bg-[#F6E3BE] text-[#17201D] flex items-center justify-center shrink-0">
                      <Split className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[15px] font-medium text-[#17201D]">
                        Elimination
                      </div>
                      <div className="text-[13px] text-[#4A5551]">
                        You needed the full solution on 2 of 2 practice questions.
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleStart('simultaneous-lunch')}
                    className="px-3.5 py-1.5 bg-[#FFFFFF] border border-[#DDD8CC] hover:bg-[#FAF8F4] text-[#17201D] rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer self-start sm:self-center shrink-0"
                  >
                    Practise
                  </button>
                </div>

                {/* Item 2: Word problems */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[8px] bg-[#F6E3BE] text-[#17201D] flex items-center justify-center shrink-0">
                      <RotateCcw className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[15px] font-medium text-[#17201D]">
                        Word problems
                      </div>
                      <div className="text-[13px] text-[#4A5551]">
                        The last lesson was not finished.
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleStart('fundraiser-stall')}
                    className="px-3.5 py-1.5 bg-[#FFFFFF] border border-[#DDD8CC] hover:bg-[#FAF8F4] text-[#17201D] rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer self-start sm:self-center shrink-0"
                  >
                    Practise
                  </button>
                </div>

                {/* Item 3: Substitution */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[8px] bg-[#F6E3BE] text-[#17201D] flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[15px] font-medium text-[#17201D]">
                        Substitution
                      </div>
                      <div className="text-[13px] text-[#4A5551]">
                        The first step needed a hint in 1 of 3 practice questions.
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleStart('simultaneous-lunch')}
                    className="px-3.5 py-1.5 bg-[#FFFFFF] border border-[#DDD8CC] hover:bg-[#FAF8F4] text-[#17201D] rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer self-start sm:self-center shrink-0"
                  >
                    Practise
                  </button>
                </div>
              </div>
            </section>

            {/* Row 3: Recent sessions section */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-[20px] font-semibold text-[#17201D]">
                  Recent sessions
                </h2>
                <button
                  type="button"
                  onClick={handleOpenTopics}
                  className="text-[13px] text-[#0E5A4B] hover:underline font-medium cursor-pointer"
                >
                  View all
                </button>
              </div>

              <div className="bg-[#FFFFFF] border border-[#DDD8CC] rounded-[12px] overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#DDD8CC] text-[12px] font-medium text-[#4A5551]">
                      <th className="py-3 px-5 font-medium">Concept</th>
                      <th className="py-3 px-4 font-medium hidden sm:table-cell">Date</th>
                      <th className="py-3 px-4 font-medium">Status</th>
                      <th className="py-3 px-4 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DDD8CC] text-[14px]">
                    {/* 1. Substitution */}
                    <tr
                      onClick={() => handleStart('simultaneous-lunch')}
                      className="hover:bg-[#FAF8F4] transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-5">
                        <div className="font-medium text-[#17201D]">Substitution</div>
                        <div className="text-[12px] text-[#4A5551]">Simultaneous equations</div>
                      </td>
                      <td className="py-3.5 px-4 text-[13px] text-[#4A5551] hidden sm:table-cell">
                        17 Oct
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-block bg-[#F6E3BE] text-[#17201D] text-[12px] px-2.5 py-0.5 rounded-[8px] font-medium">
                          In progress
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right text-[#4A5551]">
                        <ChevronRight className="w-4 h-4 inline-block" strokeWidth={1.5} />
                      </td>
                    </tr>

                    {/* 2. Elimination */}
                    <tr
                      onClick={() => handleStart('simultaneous-lunch')}
                      className="hover:bg-[#FAF8F4] transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-5">
                        <div className="font-medium text-[#17201D]">Elimination</div>
                        <div className="text-[12px] text-[#4A5551]">Simultaneous equations</div>
                      </td>
                      <td className="py-3.5 px-4 text-[13px] text-[#4A5551] hidden sm:table-cell">
                        15 Oct
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-block bg-[#DCEFE2] text-[#0E5A4B] text-[12px] px-2.5 py-0.5 rounded-[8px] font-medium">
                          Completed
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right text-[#4A5551]">
                        <ChevronRight className="w-4 h-4 inline-block" strokeWidth={1.5} />
                      </td>
                    </tr>

                    {/* 3. Word problems */}
                    <tr
                      onClick={() => handleStart('simultaneous-lunch')}
                      className="hover:bg-[#FAF8F4] transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-5">
                        <div className="font-medium text-[#17201D]">Word problems</div>
                        <div className="text-[12px] text-[#4A5551]">Simultaneous equations</div>
                      </td>
                      <td className="py-3.5 px-4 text-[13px] text-[#4A5551] hidden sm:table-cell">
                        13 Oct
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-block bg-[#DCEFE2] text-[#0E5A4B] text-[12px] px-2.5 py-0.5 rounded-[8px] font-medium">
                          Completed
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right text-[#4A5551]">
                        <ChevronRight className="w-4 h-4 inline-block" strokeWidth={1.5} />
                      </td>
                    </tr>

                    {/* 4. Word problems */}
                    <tr
                      onClick={() => handleStart('fundraiser-stall')}
                      className="hover:bg-[#FAF8F4] transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-5">
                        <div className="font-medium text-[#17201D]">Word problems</div>
                        <div className="text-[12px] text-[#4A5551]">Quadratic equations</div>
                      </td>
                      <td className="py-3.5 px-4 text-[13px] text-[#4A5551] hidden sm:table-cell">
                        10 Oct
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-block bg-[#DCEFE2] text-[#0E5A4B] text-[12px] px-2.5 py-0.5 rounded-[8px] font-medium">
                          Completed
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right text-[#4A5551]">
                        <ChevronRight className="w-4 h-4 inline-block" strokeWidth={1.5} />
                      </td>
                    </tr>

                    {/* 5. Substitution */}
                    <tr
                      onClick={() => handleStart('fundraiser-stall')}
                      className="hover:bg-[#FAF8F4] transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-5">
                        <div className="font-medium text-[#17201D]">Substitution</div>
                        <div className="text-[12px] text-[#4A5551]">Quadratic equations</div>
                      </td>
                      <td className="py-3.5 px-4 text-[13px] text-[#4A5551] hidden sm:table-cell">
                        8 Oct
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-block bg-[#FAF8F4] border border-[#DDD8CC] text-[#4A5551] text-[12px] px-2.5 py-0.5 rounded-[8px] font-medium">
                          Not finished
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right text-[#4A5551]">
                        <ChevronRight className="w-4 h-4 inline-block" strokeWidth={1.5} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {/* ========================================================
            SCREEN 10: PROGRESS VIEW
           ======================================================== */}
        {activeNav === 'progress' && (
          <>
            <header>
              <h1 className="font-serif text-[32px] font-semibold text-[#17201D] tracking-tight">
                Progress
              </h1>
              <p className="text-[16px] text-[#4A5551] mt-1">
                What your sessions show so far. This can change as you practise.
              </p>
            </header>

            {/* Row 1: Three summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-[#FFFFFF] border border-[#DDD8CC] rounded-[12px] p-5 sm:p-6 flex flex-col justify-between">
                <span className="text-[14px] text-[#4A5551]">Lessons completed</span>
                <span className="font-serif text-[36px] font-semibold text-[#17201D] mt-2 leading-none">
                  7
                </span>
              </div>

              <div className="bg-[#FFFFFF] border border-[#DDD8CC] rounded-[12px] p-5 sm:p-6 flex flex-col justify-between">
                <span className="text-[14px] text-[#4A5551]">Concepts practised</span>
                <span className="font-serif text-[36px] font-semibold text-[#17201D] mt-2 leading-none">
                  5
                </span>
              </div>

              <div className="bg-[#FFFFFF] border border-[#DDD8CC] rounded-[12px] p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[14px] text-[#4A5551] block">Hints used per session</span>
                  <span className="font-serif text-[36px] font-semibold text-[#17201D] mt-2 block leading-none">
                    1.9
                  </span>
                </div>
                <span className="text-[12px] text-[#4A5551] mt-2 block">Last 8 sessions</span>
              </div>
            </div>

            {/* Row 2: Bar chart card */}
            <section className="bg-[#FFFFFF] border border-[#DDD8CC] rounded-[12px] p-6">
              <div className="mb-6">
                <h2 className="font-serif text-[18px] font-semibold text-[#17201D]">
                  Hints used per session
                </h2>
                <p className="text-[13px] text-[#4A5551] mt-0.5">
                  Based on 8 sessions
                </p>
              </div>

              <div className="overflow-x-auto pb-2">
                <div className="min-w-[500px]">
                  <div className="relative h-[160px] flex flex-col justify-between">
                    {[3, 2, 1, 0].map((level) => (
                      <div key={level} className="w-full flex items-center text-[11px] text-[#4A5551]">
                        <span className="w-4 shrink-0 text-right pr-2">{level}</span>
                        <div className="flex-1 border-b border-[#DDD8CC]" />
                      </div>
                    ))}

                    <div className="absolute inset-0 left-6 right-2 bottom-0 top-2 flex items-end justify-between px-2">
                      {chartData.map((bar, idx) => {
                        const heightPercent = (bar.hints / 3) * 100;
                        const isHovered = hoveredBarIndex === idx;
                        const isLastBar = idx === chartData.length - 1;

                        return (
                          <div
                            key={idx}
                            className="relative flex-1 flex flex-col items-center h-full justify-end px-2 group cursor-pointer"
                            onMouseEnter={() => setHoveredBarIndex(idx)}
                            onMouseLeave={() => setHoveredBarIndex(null)}
                          >
                            {isHovered && (
                              <div
                                className={`absolute bottom-[calc(100%+8px)] z-30 bg-[#17201D] text-white text-[13px] px-3 py-1.5 rounded-[8px] shadow-md whitespace-nowrap pointer-events-none ${
                                  isLastBar ? 'right-0' : 'left-1/2 -translate-x-1/2'
                                }`}
                              >
                                <div className="font-medium">{bar.date} · {bar.concept}</div>
                                <div className="text-[12px] text-[#DCEBE6]">{bar.hints} of 3 hints used</div>
                              </div>
                            )}

                            <div
                              style={{ height: `${heightPercent}%` }}
                              className="w-full max-w-[36px] bg-[#0E5A4B] rounded-t-[4px] transition-opacity hover:opacity-90"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pl-6 pr-2 mt-2.5 text-[12px] text-[#4A5551]">
                    {chartData.map((bar, idx) => (
                      <div key={idx} className="flex-1 text-center font-medium">
                        {bar.date}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-[13px] text-[#4A5551] mt-4 pt-4 border-t border-[#DDD8CC]">
                Fewer hints can mean more confidence, or an easier concept. Read it alongside the list below.
              </div>
            </section>

            {/* Row 3: Concepts list */}
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DDD8CC] pb-3">
                <div className="flex flex-wrap items-center gap-6">
                  <h2 className="font-serif text-[20px] font-semibold text-[#17201D]">
                    Concepts
                  </h2>

                  <div className="flex items-center gap-4 text-[14px]">
                    {(['All', 'Needs practice', 'Getting there', 'Secure'] as const).map((tab) => {
                      const isActive = selectedConceptFilter === tab;
                      return (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setSelectedConceptFilter(tab)}
                          className={`pb-1 transition-colors cursor-pointer ${
                            isActive
                              ? 'border-b-2 border-[#0E5A4B] text-[#0E5A4B] font-medium'
                              : 'text-[#4A5551] hover:text-[#17201D]'
                          }`}
                        >
                          {tab}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <label htmlFor="concept-sort" className="text-[13px] text-[#4A5551]">
                    Sort by:
                  </label>
                  <select
                    id="concept-sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="border border-[#DDD8CC] bg-[#FFFFFF] text-[13px] text-[#17201D] rounded-[8px] px-2.5 py-1.5 focus:outline-none cursor-pointer"
                  >
                    <option value="last-practised">Last practised</option>
                    <option value="alphabetical">Concept name</option>
                    <option value="sessions">Sessions count</option>
                  </select>
                </div>
              </div>

              <div className="bg-[#FFFFFF] border border-[#DDD8CC] rounded-[12px] divide-y divide-[#DDD8CC]">
                {sortedConcepts.map((concept) => (
                  <div
                    key={concept.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 min-w-0 max-w-[620px]">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[15px] font-medium text-[#17201D]">
                          {concept.name}
                        </span>

                        <div className="relative inline-flex items-center">
                          <span
                            className={`inline-flex items-center gap-1 text-[12px] px-2.5 py-0.5 rounded-[8px] font-medium ${
                              concept.statusType === 'primary'
                                ? 'bg-[#DCEBE6] text-[#0E5A4B]'
                                : concept.statusType === 'secondary'
                                ? 'bg-[#F6E3BE] text-[#17201D]'
                                : concept.statusType === 'success'
                                ? 'bg-[#DCEFE2] text-[#0E5A4B]'
                                : 'bg-[#FAF8F4] border border-[#DDD8CC] text-[#4A5551]'
                            }`}
                          >
                            <span>{concept.status}</span>
                            <button
                              type="button"
                              className="focus:outline-none cursor-help"
                              onMouseEnter={() => setHoveredInfoId(concept.id)}
                              onMouseLeave={() => setHoveredInfoId(null)}
                              aria-label="Info about status estimate"
                            >
                              <Info className="w-3.5 h-3.5 opacity-80" strokeWidth={1.5} />
                            </button>
                          </span>

                          {hoveredInfoId === concept.id && (
                            <div className="absolute left-0 bottom-[calc(100%+6px)] z-30 bg-[#17201D] text-white text-[12px] px-3 py-1.5 rounded-[8px] shadow-md w-64 pointer-events-none leading-relaxed">
                              Based on your answers, hints and transfer questions in 3 sessions. It is an estimate, not a grade.
                            </div>
                          )}
                        </div>

                        {concept.hasEarlyEstimate && (
                          <span className="text-[11px] bg-[#FAF8F4] border border-[#DDD8CC] text-[#4A5551] px-2 py-0.5 rounded-[8px] font-medium">
                            Early estimate
                          </span>
                        )}
                      </div>

                      <div className="text-[12px] text-[#4A5551]">
                        {concept.topic} · {concept.sessionsCount} {concept.sessionsCount === 1 ? 'session' : 'sessions'}, last practised {concept.lastPractised}
                      </div>

                      <p className="text-[13px] text-[#4A5551] pt-0.5">
                        {concept.factualLine}
                      </p>
                    </div>

                    <div className="self-start sm:self-center shrink-0">
                      {concept.actionType === 'resume' ? (
                        <button
                          type="button"
                          onClick={() => handleStart(concept.scenarioId)}
                          className="px-4 py-2 bg-[#0E5A4B] hover:bg-[#0A4337] text-white rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Resume</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleStart(concept.scenarioId)}
                          className="px-4 py-1.5 bg-[#FFFFFF] border border-[#DDD8CC] hover:bg-[#FAF8F4] text-[#17201D] rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer"
                        >
                          Practise
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {sortedConcepts.length === 0 && (
                  <div className="p-8 text-center text-[13px] text-[#4A5551]">
                    No concepts match the selected filter.
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {/* Practise tab */}
        {activeNav === 'practise' && (
          <div className="bg-[#FFFFFF] border border-[#DDD8CC] rounded-[12px] p-8 text-center space-y-4">
            <h2 className="font-serif text-[24px] font-semibold text-[#17201D]">
              Practise Scenarios
            </h2>
            <p className="text-[14px] text-[#4A5551] max-w-[500px] mx-auto">
              Engage with multi-step applied reasoning scenarios in Simultaneous and Quadratic equations.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => handleStart('simultaneous-lunch')}
                className="px-5 py-2.5 bg-[#0E5A4B] hover:bg-[#0A4337] text-white rounded-[8px] text-[14px] font-medium cursor-pointer"
              >
                Launch Substitution
              </button>
              <button
                type="button"
                onClick={handleOpenTopics}
                className="px-4 py-2.5 bg-[#FFFFFF] border border-[#DDD8CC] hover:bg-[#FAF8F4] text-[#17201D] rounded-[8px] text-[14px] font-medium cursor-pointer"
              >
                Browse all lessons
              </button>
            </div>
          </div>
        )}

        {/* History tab */}
        {activeNav === 'history' && (
          <div className="bg-[#FFFFFF] border border-[#DDD8CC] rounded-[12px] p-6 space-y-4">
            <h2 className="font-serif text-[20px] font-semibold text-[#17201D]">
              Session History
            </h2>
            <p className="text-[14px] text-[#4A5551]">
              A complete audit of your past problem-solving sessions and reasoning steps.
            </p>
            <div className="divide-y divide-[#DDD8CC]">
              {chartData.map((session, i) => (
                <div key={i} className="py-3 flex items-center justify-between text-[14px]">
                  <div>
                    <span className="font-medium text-[#17201D]">{session.concept}</span>
                    <span className="text-[12px] text-[#4A5551] ml-2">({session.date})</span>
                  </div>
                  <span className="text-[12px] text-[#4A5551]">{session.hints} of 3 hints used</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings tab */}
        {activeNav === 'settings' && (
          <div className="bg-[#FFFFFF] border border-[#DDD8CC] rounded-[12px] p-6 space-y-4">
            <h2 className="font-serif text-[20px] font-semibold text-[#17201D]">
              Preferences & Settings
            </h2>
            <p className="text-[14px] text-[#4A5551]">
              Academic level: Senior secondary Mathematics · Term 2.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onNavigateHome}
                className="text-[13px] text-[#0E5A4B] hover:underline font-medium cursor-pointer"
              >
                Return to Silo Home
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
