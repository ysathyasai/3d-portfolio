import React from 'react';
import { CHAPTERS } from '../data/portfolio';

interface TopBarProps {
  activeChapterIndex: number;
  isQuickViewOpen: boolean;
  onSelectChapter: (index: number) => void;
  onToggleQuickView: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeChapterIndex,
  isQuickViewOpen,
  onSelectChapter,
  onToggleQuickView,
}) => {
  // Strictly follows the 3-Zone Top Bar Contract:
  // Zone 1: Single text element wordmark
  // Zone 2: 5 concise single-line text navigation links
  // Zone 3: 1 primary action button
  const navChapters = [
    { label: 'Origins', index: 1, href: '#origins' },
    { label: 'Workshop', index: 2, href: '#workshop' },
    { label: 'Projects', index: 3, href: '#projects' },
    { label: 'Observatory', index: 4, href: '#beyond' },
    { label: 'Contact', index: 5, href: '#frontier' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between gap-2 sm:gap-8 px-3 sm:px-6 py-3 bg-[#070B14]/90 border-b border-slate-800/80">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#arrival"
        onClick={(e) => {
          e.preventDefault();
          onSelectChapter(0);
        }}
        className="text-sm sm:text-lg font-bold tracking-tight text-slate-100 hover:text-amber-400 transition-colors whitespace-nowrap truncate font-display"
      >
        Sathya — Beyond the Screen
      </a>

      {/* Zone 2: 5 clean single-line text navigation links */}
      <nav
        aria-label="Story Chapters"
        className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300"
      >
        {navChapters.map((item) => {
          const isActive = activeChapterIndex === item.index && !isQuickViewOpen;
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                onSelectChapter(item.index);
              }}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                isActive
                  ? 'text-amber-400 border-amber-400'
                  : 'text-slate-300 border-transparent hover:text-white hover:border-slate-600'
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center shrink-0">
        <button
          type="button"
          onClick={onToggleQuickView}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            isQuickViewOpen
              ? 'bg-slate-800 text-amber-300 border border-amber-500/40'
              : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
          }`}
        >
          {isQuickViewOpen ? 'Return to 3D World' : 'Recruiter Quick View'}
        </button>
      </div>
    </header>
  );
};
