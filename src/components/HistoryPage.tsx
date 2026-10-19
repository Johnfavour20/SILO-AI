import React, { useMemo, useState } from 'react';
import { AlertCircle, ChevronRight, Search } from 'lucide-react';

export type HistoryVariant =
  | 'default'
  | 'filter-applied'
  | 'no-results'
  | 'empty'
  | 'loading'
  | 'error'
  | 'drawer-open'
  | 'mobile';

interface HistoryPageProps {
  onBackToDashboard?: () => void;
  variant?: HistoryVariant;
}

interface SessionRow {
  concept: string;
  topic: string;
  date: string;
  time: string;
  hints: number;
  status: 'In progress' | 'Completed' | 'Not finished';
  feedback: string;
  resume?: boolean;
}

const historyRows: SessionRow[] = [
  {
    concept: 'Substitution',
    topic: 'Simultaneous equations',
    date: '17 Oct',
    time: '14 min',
    hints: 2,
    status: 'In progress',
    feedback: 'Not rated',
    resume: true,
  },
  {
    concept: 'Elimination',
    topic: 'Simultaneous equations',
    date: '15 Oct',
    time: '19 min',
    hints: 5,
    status: 'Completed',
    feedback: 'Rated 4',
  },
  {
    concept: 'Word problems',
    topic: 'Simultaneous equations',
    date: '13 Oct',
    time: '22 min',
    hints: 3,
    status: 'Completed',
    feedback: 'Rated 5',
  },
  {
    concept: 'Quadratic formula',
    topic: 'Quadratic equations',
    date: '10 Oct',
    time: '17 min',
    hints: 1,
    status: 'Completed',
    feedback: 'Rated 4',
  },
  {
    concept: 'Factorising',
    topic: 'Quadratic equations',
    date: '8 Oct',
    time: '9 min',
    hints: 2,
    status: 'Not finished',
    feedback: 'Not rated',
    resume: true,
  },
  {
    concept: 'Substitution',
    topic: 'Simultaneous equations',
    date: '6 Oct',
    time: '16 min',
    hints: 3,
    status: 'Completed',
    feedback: 'Rated 3',
  },
  {
    concept: 'What simultaneous equations are',
    topic: 'Simultaneous equations',
    date: '5 Oct',
    time: '8 min',
    hints: 0,
    status: 'Completed',
    feedback: 'Not rated',
  },
  {
    concept: 'Completing the square',
    topic: 'Quadratic equations',
    date: '3 Oct',
    time: '15 min',
    hints: 3,
    status: 'Completed',
    feedback: 'Rated 4',
  },
];

const statusClasses: Record<SessionRow['status'], string> = {
  'In progress': 'bg-[#F6E3BE] text-[#17201D]',
  Completed: 'bg-[#DCEFE2] text-[#0E5A4B]',
  'Not finished': 'bg-[#F4F1EA] text-[#4A5551] border border-[#DDD8CC]',
};

const allRows = [...historyRows];

export const HistoryPage: React.FC<HistoryPageProps> = ({ onBackToDashboard, variant = 'default' }) => {
  const [query, setQuery] = useState(variant === 'no-results' ? 'ratios' : '');
  const [topicFilter, setTopicFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState(variant === 'filter-applied' ? 'not_finished' : 'all');
  const [sortBy, setSortBy] = useState('newest');
  const [activeVariant, setActiveVariant] = useState<HistoryVariant>(variant);
  const [isDrawerOpen, setIsDrawerOpen] = useState(activeVariant === 'drawer-open');

  const isFilterApplied = activeVariant === 'filter-applied';
  const isNoResults = activeVariant === 'no-results';
  const isEmpty = activeVariant === 'empty';
  const isLoading = activeVariant === 'loading';
  const isError = activeVariant === 'error';
  const isDrawerVariant = activeVariant === 'drawer-open';
  const isMobileFrame = activeVariant === 'mobile';

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const rows = allRows.filter((row) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        row.concept.toLowerCase().includes(normalizedQuery) ||
        row.topic.toLowerCase().includes(normalizedQuery);

      const matchesTopic =
        topicFilter === 'all' ||
        (topicFilter === 'simultaneous' && row.topic === 'Simultaneous equations') ||
        (topicFilter === 'quadratic' && row.topic === 'Quadratic equations');

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'in_progress' && row.status === 'In progress') ||
        (statusFilter === 'completed' && row.status === 'Completed') ||
        (statusFilter === 'not_finished' && row.status === 'Not finished');

      return matchesQuery && matchesTopic && matchesStatus;
    });

    const sorted = [...rows];
    if (sortBy === 'oldest') {
      return sorted.reverse();
    }
    if (sortBy === 'time') {
      return sorted.sort((a, b) => b.hints - a.hints);
    }
    return sorted;
  }, [query, sortBy, statusFilter, topicFilter]);

  const tableRows = useMemo(() => {
    if (isFilterApplied) return allRows.filter((row) => row.status === 'Not finished');
    if (isNoResults) return [];
    if (isDrawerVariant) return allRows.filter((row) => row.concept === 'Substitution' && row.date === '17 Oct');
    return filteredRows;
  }, [filteredRows, isDrawerVariant, isFilterApplied, isNoResults]);

  const renderRowDesktop = (row: SessionRow) => (
    <tr key={`${row.concept}-${row.date}`} className="group hover:bg-[#F4F1EA] transition-colors">
      <td className="py-4 pl-6 pr-4">
        <div className="font-medium text-[#17201D]">{row.concept}</div>
        <div className="text-[13px] text-[#4A5551]">{row.topic}</div>
      </td>
      <td className="py-4 px-4 text-[#4A5551]">{row.date}</td>
      <td className="py-4 px-4 text-[#17201D]">{row.time}</td>
      <td className="py-4 px-4 text-[#17201D]">{row.hints}</td>
      <td className="py-4 px-4">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-[8px] text-[12px] font-medium ${statusClasses[row.status]}`}>
          {row.status}
        </span>
      </td>
      <td className="py-4 px-4 text-[#17201D]">{row.feedback}</td>
      <td className="py-4 pl-4 pr-6 text-right whitespace-nowrap">
        {row.resume ? (
          <div className="inline-flex items-center gap-2">
            <button type="button" className="text-[13px] font-medium text-[#0E5A4B] hover:underline focus:outline-none py-1 px-1.5 rounded">
              Resume
            </button>
            <ChevronRight className="w-4 h-4 text-[#4A5551] group-hover:text-[#17201D] transition-colors" strokeWidth={2} />
          </div>
        ) : (
          <button type="button" onClick={() => setIsDrawerOpen(true)} className="cursor-pointer focus:outline-none">
            <ChevronRight className="w-4 h-4 text-[#4A5551] group-hover:text-[#17201D] transition-colors" strokeWidth={2} />
          </button>
        )}
      </td>
    </tr>
  );

  const renderRowMobile = (row: SessionRow) => (
    <div key={`${row.concept}-${row.date}-mobile`} className="p-4 hover:bg-[#F4F1EA] transition-colors">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <h3 className="font-medium text-[#17201D] text-[15px]">{row.concept}</h3>
          <p className="text-[13px] text-[#4A5551]">{row.topic}</p>
        </div>
        <span className={`inline-flex items-center px-2 py-0.5 rounded-[8px] text-[12px] font-medium shrink-0 ${statusClasses[row.status]}`}>
          {row.status}
        </span>
      </div>
      <div className="flex items-center justify-between text-[13px] text-[#4A5551] pt-1">
        <span>
          {row.date} · {row.time}
        </span>
        <span>
          {row.hints} hint{row.hints === 1 ? '' : 's'} used
        </span>
      </div>
      <div className="flex items-center justify-between text-[13px] pt-3 border-t border-[#DDD8CC]/60 mt-2">
        <span className={row.status === 'Completed' ? 'text-[#17201D] font-medium' : 'text-[#4A5551]'}>{row.feedback}</span>
        {row.resume ? (
          <div className="flex items-center gap-1.5">
            <button type="button" className="text-[13px] font-medium text-[#0E5A4B] py-0.5 px-1">Resume</button>
            <ChevronRight className="w-4 h-4 text-[#4A5551]" strokeWidth={2} />
          </div>
        ) : (
          <button type="button" onClick={() => setIsDrawerOpen(true)} className="cursor-pointer focus:outline-none">
            <ChevronRight className="w-4 h-4 text-[#4A5551]" strokeWidth={2} />
          </button>
        )}
      </div>
    </div>
  );

  const renderToolbar = () => {
    if (isEmpty) return null;

    return (
      <section className="mb-6" aria-label="Filters and sorting">
        <div className={`flex flex-col ${isMobileFrame ? 'gap-3' : 'md:flex-row md:items-center justify-between'} gap-3`}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 max-w-[760px]">
            <div className="relative flex-1 min-w-[220px]">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#4A5551]">
                <Search className="w-4 h-4" strokeWidth={2} />
              </div>
              <input
                type="text"
                value={isNoResults ? 'ratios' : query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by concept"
                className="w-full h-[44px] pl-10 pr-3.5 bg-white border border-[#DDD8CC] rounded-[8px] text-[15px] text-[#17201D] placeholder-[#4A5551] focus:border-[#0E5A4B] focus:ring-0 transition-colors"
              />
            </div>

            <div className="relative min-w-[170px]">
              <select
                value={topicFilter}
                onChange={(event) => setTopicFilter(event.target.value)}
                className="w-full h-[44px] pl-3.5 pr-8 bg-white border border-[#DDD8CC] rounded-[8px] text-[14px] text-[#17201D] appearance-none focus:border-[#0E5A4B] transition-colors cursor-pointer"
              >
                <option value="all">Topic: All</option>
                <option value="simultaneous">Simultaneous equations</option>
                <option value="quadratic">Quadratic equations</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#4A5551]">
                <ChevronDownIcon />
              </div>
            </div>

            <div className="relative min-w-[160px]">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="w-full h-[44px] pl-3.5 pr-8 bg-white border border-[#DDD8CC] rounded-[8px] text-[14px] text-[#17201D] appearance-none focus:border-[#0E5A4B] transition-colors cursor-pointer"
              >
                <option value="all">Status: All</option>
                <option value="in_progress">In progress</option>
                <option value="completed">Completed</option>
                <option value="not_finished">Not finished</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#4A5551]">
                <ChevronDownIcon />
              </div>
            </div>
          </div>

          <div className="relative min-w-[150px]">
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="w-full h-[44px] pl-3.5 pr-8 bg-white border border-[#DDD8CC] rounded-[8px] text-[14px] text-[#17201D] appearance-none focus:border-[#0E5A4B] transition-colors cursor-pointer"
            >
              <option value="newest">Sort by: Newest</option>
              <option value="oldest">Sort by: Oldest</option>
              <option value="time">Sort by: Time spent</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#4A5551]">
              <ChevronDownIcon />
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderTableCard = () => {
    if (isError) {
      return (
        <div className="bg-white border border-[#DDD8CC] rounded-[12px] p-6">
          <div className="max-w-[420px] mx-auto flex flex-col items-center justify-center text-center py-12">
            <div className="w-11 h-11 rounded-full bg-[#F9DEDC] border border-[#B3261E]/30 flex items-center justify-center mb-4">
              <AlertCircle className="w-5 h-5 text-[#B3261E]" strokeWidth={2.5} />
            </div>
            <p className="text-[18px] text-[#17201D] font-medium mb-4">We could not load your history.</p>
            <button
              type="button"
              className="h-11 px-5 rounded-[8px] bg-[#004135] text-white text-[13px] font-medium hover:bg-[#0A4A3E] transition-colors cursor-pointer"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="bg-white border border-[#DDD8CC] rounded-[12px] overflow-hidden">
          <div className="animate-pulse">
            <div className="h-[44px] border-b border-[#DDD8CC] bg-[#F4F1EA]" />
            {[...Array(8)].map((_, index) => (
              <div key={index} className="h-[68px] border-b border-[#DDD8CC] bg-[#FAF8F4] last:border-b-0 px-6 flex items-center gap-4">
                <div className="h-4 w-28 rounded bg-[#EDE9E0]" />
                <div className="h-4 w-16 rounded bg-[#EDE9E0]" />
                <div className="h-4 w-16 rounded bg-[#EDE9E0]" />
                <div className="h-4 w-12 rounded bg-[#EDE9E0]" />
                <div className="h-4 w-20 rounded bg-[#EDE9E0]" />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (isEmpty) {
      return (
        <div className="bg-white border border-[#DDD8CC] rounded-[12px] min-h-[240px] flex items-center justify-center">
          <div className="text-center px-6 py-12">
            <p className="text-[16px] text-[#4A5551] mb-4">Your sessions will appear here once you start a lesson.</p>
            <button
              type="button"
              className="h-11 px-5 rounded-[8px] bg-[#004135] text-white text-[13px] font-medium hover:bg-[#0A4A3E] transition-colors cursor-pointer"
            >
              Browse topics
            </button>
          </div>
        </div>
      );
    }

    if (isNoResults) {
      return (
        <div className="bg-white border border-[#DDD8CC] rounded-[12px] min-h-[180px] flex items-center justify-center">
          <div className="text-center px-6 py-12">
            <p className="text-[16px] text-[#17201D]">No sessions match your search.</p>
            <button type="button" className="mt-4 inline-flex items-center text-[13px] font-medium text-[#0E5A4B] hover:underline">
              Clear search
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className={`bg-white border border-[#DDD8CC] rounded-[12px] overflow-hidden ${isDrawerOpen ? 'opacity-40' : ''}`}>
        <div className={`${isMobileFrame ? 'block sm:hidden' : 'hidden sm:block'} overflow-x-auto`}>
          <table className="w-full text-left border-collapse" aria-label="Session history list">
            <thead>
              <tr className="border-b border-[#DDD8CC] bg-[#FAF8F4]/50 text-[13px] text-[#4A5551] font-medium">
                <th scope="col" className="py-3.5 pl-6 pr-4">Concept</th>
                <th scope="col" className="py-3.5 px-4">Date</th>
                <th scope="col" className="py-3.5 px-4">Time</th>
                <th scope="col" className="py-3.5 px-4">Hints used</th>
                <th scope="col" className="py-3.5 px-4">Status</th>
                <th scope="col" className="py-3.5 px-4">Feedback rating</th>
                <th scope="col" className="py-3.5 pl-4 pr-6 text-right"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD8CC] text-[14px]">
              {tableRows.map(renderRowDesktop)}
            </tbody>
          </table>
        </div>

        <div className={`${isMobileFrame ? 'block sm:hidden' : 'hidden'} divide-y divide-[#DDD8CC]`}>
          {tableRows.map(renderRowMobile)}
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#17201D] px-6 md:px-12 py-6 md:py-10">
      <div className="w-full max-w-[1120px] mx-auto pt-2 pb-16">
        <header className="mb-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold text-[#17201D] font-serif tracking-tight mb-2">
                History
              </h1>
              <p className="text-base text-[#4A5551]">Every session you have started.</p>
            </div>

            {onBackToDashboard && (
              <button
                type="button"
                onClick={onBackToDashboard}
                className="hidden md:inline-flex items-center justify-center h-10 px-3 rounded-[8px] border border-[#DDD8CC] bg-white text-[13px] font-medium text-[#17201D] hover:bg-[#F4F1EA] transition-colors cursor-pointer"
              >
                Back to dashboard
              </button>
            )}
          </div>
        </header>

        {!isEmpty && renderToolbar()}

        {isFilterApplied && (
          <div className="mb-4 flex items-center justify-between gap-3 text-[13px] text-[#4A5551]">
            <span>1 session</span>
            <button type="button" className="text-[#0E5A4B] hover:underline font-medium cursor-pointer">
              Clear filters
            </button>
          </div>
        )}

        {renderTableCard()}

        {!isEmpty && !isLoading && !isError && !isNoResults && !isFilterApplied && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[13px] text-[#4A5551]">
              Showing 1 to {Math.min(8, tableRows.length)} of {allRows.length} sessions
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled
                className="h-[40px] px-4 rounded-[8px] border border-[#DDD8CC] bg-[#FAF8F4] text-[#7D8883] text-[14px] font-medium cursor-not-allowed opacity-60"
              >
                Previous
              </button>
              <button
                type="button"
                className="h-[40px] px-4 rounded-[8px] border border-[#DDD8CC] bg-white hover:bg-[#F4F1EA] text-[#17201D] text-[14px] font-medium transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {isDrawerOpen && (
        <div className="fixed inset-0 z-40 bg-[#17201D]/10 backdrop-blur-[1px]" aria-hidden="true" />
      )}

      {isDrawerOpen && (
        <aside className="fixed right-0 top-0 bottom-0 z-50 w-[400px] bg-white border-l border-[#DDD8CC] shadow-[0_0_30px_rgba(23,32,29,0.12)] p-6 flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h2 className="font-serif text-[32px] leading-tight tracking-[-0.02em] text-[#17201D]">Substitution</h2>
              <p className="text-[14px] text-[#4A5551] mt-2">17 Oct, 14 min</p>
            </div>
            <button type="button" onClick={() => setIsDrawerOpen(false)} className="text-[13px] text-[#0E5A4B] hover:underline font-medium cursor-pointer">
              Close
            </button>
          </div>

          <div className="mt-4">
            <p className="text-[14px] font-medium text-[#17201D] mb-4">Summary</p>
            <div className="space-y-3 text-[15px] text-[#17201D] leading-relaxed">
              <p>Chose the right substitution on both questions.</p>
              <p>A hint was needed for 3(7 − 2s).</p>
              <p>Hints used: 2</p>
            </div>
          </div>

          <div className="mt-auto pt-6 flex flex-col gap-3">
            <button type="button" className="h-11 px-5 rounded-[8px] bg-[#004135] text-white text-[13px] font-medium hover:bg-[#0A4A3E] transition-colors cursor-pointer">
              Open summary
            </button>
            <button type="button" onClick={() => setIsDrawerOpen(false)} className="text-[13px] font-medium text-[#0E5A4B] hover:underline cursor-pointer">
              Close
            </button>
          </div>
        </aside>
      )}

      <div className="fixed left-1/2 -translate-x-1/2 bottom-4 z-40">
        <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-[#DDD8CC] bg-white/95 px-2 py-1.5 shadow-lg backdrop-blur-sm">
          {[
            { id: 'default', label: 'Default' },
            { id: 'filter-applied', label: 'Filter' },
            { id: 'no-results', label: 'No results' },
            { id: 'empty', label: 'Empty' },
            { id: 'loading', label: 'Loading' },
            { id: 'error', label: 'Error' },
            { id: 'drawer-open', label: 'Drawer' },
            { id: 'mobile', label: 'Mobile' },
          ].map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                setActiveVariant(option.id as HistoryVariant);
                setIsDrawerOpen(option.id === 'drawer-open');
              }}
              className={`h-8 px-2.5 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                activeVariant === option.id
                  ? 'bg-[#004135] text-white'
                  : 'bg-[#FAF8F4] text-[#4A5551] hover:bg-[#EDE9E0]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

function ChevronDownIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
