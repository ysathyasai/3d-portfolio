import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Layers,
  Gauge,
  Map,
} from 'lucide-react';
import { CHAPTERS } from '../data/portfolio';

interface BottomControlDockProps {
  activeChapterIndex: number;
  scrollProgress: number;
  exploreMode: boolean;
  soundEnabled: boolean;
  qualityMode: 'auto' | 'high' | 'eco';
  dockCollapsed: boolean;
  onSelectChapter: (index: number) => void;
  onToggleExploreMode: () => void;
  onToggleSound: () => void;
  onCycleQuality: () => void;
  onOpenAiLab: () => void;
  onOpenProjectGrid: () => void;
  onToggleDockCollapse: () => void;
}

export const BottomControlDock: React.FC<BottomControlDockProps> = ({
  activeChapterIndex,
  scrollProgress,
  exploreMode,
  soundEnabled,
  qualityMode,
  dockCollapsed,
  onSelectChapter,
  onToggleExploreMode,
  onToggleSound,
  onCycleQuality,
  onOpenAiLab,
  onOpenProjectGrid,
  onToggleDockCollapse,
}) => {
  const [mapOpen, setMapOpen] = useState(false);
  const pct = Math.round(scrollProgress * 100);
  const currentChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];

  const handlePrev = () => {
    onSelectChapter(Math.max(0, activeChapterIndex - 1));
  };

  const handleNext = () => {
    onSelectChapter(Math.min(CHAPTERS.length - 1, activeChapterIndex + 1));
  };

  return (
    <div className="fixed bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 max-w-[min(1080px,96vw)] z-30 w-full flex flex-col items-center pointer-events-none">
      {/* 14-Chapter World Map Grid Popover */}
      {mapOpen && !dockCollapsed && (
        <div
          aria-label="14-Chapter World Map"
          className="pointer-events-auto mb-2 w-full max-w-2xl bg-[#0B1221]/98 border border-slate-700 rounded-2xl p-3.5 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-amber-400">
              14-Chapter World Map — Select any island to warp
            </span>
            <button
              type="button"
              onClick={() => setMapOpen(false)}
              className="text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              Close ✕
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 max-h-56 overflow-y-auto">
            {CHAPTERS.map((ch) => {
              const isCurrent = ch.index === activeChapterIndex;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => {
                    onSelectChapter(ch.index);
                    setMapOpen(false);
                  }}
                  className={`text-left px-2.5 py-2 rounded-lg text-xs font-mono transition-colors cursor-pointer truncate ${
                    isCurrent
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-slate-600 hover:text-white'
                  }`}
                >
                  {ch.numberLabel}. {ch.shortLabel}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Collapse / Expand Handle (Desktop only to keep mobile clean) */}
      <button
        type="button"
        onClick={onToggleDockCollapse}
        aria-expanded={!dockCollapsed}
        aria-label={dockCollapsed ? 'Show World Controls' : 'Hide World Controls'}
        className="pointer-events-auto hidden sm:flex mb-1 px-3 py-0.5 rounded-t-lg bg-[#0B1221] border border-b-0 border-slate-800 text-[11px] font-medium text-slate-300 hover:text-amber-400 transition-colors items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
      >
        {dockCollapsed ? (
          <>
            <ChevronUp className="w-3 h-3" />
            <span>Show Controls</span>
          </>
        ) : (
          <>
            <ChevronDown className="w-3 h-3" />
            <span>Hide Controls</span>
          </>
        )}
      </button>

      {!dockCollapsed && (
        <div className="pointer-events-auto w-full bg-[#0B1221]/95 backdrop-blur-md border border-slate-800 rounded-xl px-2.5 sm:px-3.5 py-2 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-2">
          {/* Desktop 14-Chapter Horizontal Stepper + Prev/Next */}
          <div className="hidden sm:flex items-center gap-1 w-full lg:w-auto overflow-x-auto py-0.5">
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeChapterIndex === 0}
              aria-label="Previous Chapter"
              className="p-1.5 rounded-lg bg-slate-900 text-slate-300 disabled:opacity-40 hover:text-white border border-slate-800 cursor-pointer shrink-0"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-1 overflow-x-auto max-w-[540px] px-0.5">
              {CHAPTERS.map((ch) => {
                const active = ch.index === activeChapterIndex;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => onSelectChapter(ch.index)}
                    title={`${ch.numberLabel}. ${ch.title}`}
                    className={`px-2 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-amber-500 text-slate-950 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800/90 hover:text-white'
                    }`}
                  >
                    {ch.numberLabel}.{ch.shortLabel}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleNext}
              disabled={activeChapterIndex === CHAPTERS.length - 1}
              aria-label="Next Chapter"
              className="p-1.5 rounded-lg bg-slate-900 text-slate-300 disabled:opacity-40 hover:text-white border border-slate-800 cursor-pointer shrink-0"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Compact Chapter Bar + Utility Actions */}
          <div className="flex items-center justify-between sm:justify-end gap-1.5 w-full lg:w-auto">
            {/* Mobile Prev / Map / Next */}
            <div className="flex sm:hidden items-center gap-1">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeChapterIndex === 0}
                aria-label="Previous Chapter"
                className="p-1.5 rounded-lg bg-slate-900 text-slate-200 disabled:opacity-40 border border-slate-800 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setMapOpen((prev) => !prev)}
                className="px-2.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-mono font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <Map className="w-3.5 h-3.5" />
                <span>
                  {currentChapter.numberLabel}/14 {currentChapter.shortLabel}
                </span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={activeChapterIndex === CHAPTERS.length - 1}
                aria-label="Next Chapter"
                className="p-1.5 rounded-lg bg-slate-900 text-slate-200 disabled:opacity-40 border border-slate-800 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Shared / Desktop Utility Buttons */}
            <div className="flex items-center gap-1.5 ml-auto">
              <button
                type="button"
                onClick={() => setMapOpen((prev) => !prev)}
                className="hidden sm:flex px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-900 text-amber-300 border border-slate-800 hover:border-amber-500/40 items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Map className="w-3.5 h-3.5" />
                <span>Map (14)</span>
              </button>

              <button
                type="button"
                onClick={onToggleExploreMode}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap shrink-0 border ${
                  exploreMode
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/50'
                    : 'bg-slate-900 text-slate-200 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">
                  {exploreMode ? 'Guided' : '3D Drone'}
                </span>
              </button>

              <button
                type="button"
                onClick={onOpenProjectGrid}
                className="px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium bg-slate-900 text-slate-200 border border-slate-800 hover:border-slate-700 flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Projects</span>
              </button>

              <button
                type="button"
                onClick={onOpenAiLab}
                className="hidden md:flex px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-900 text-amber-300 border border-amber-500/30 hover:border-amber-400 items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>CLI & AI Lab</span>
              </button>

              <button
                type="button"
                onClick={onCycleQuality}
                title="Cycle 3D rendering quality mode"
                aria-label={`Rendering Quality: ${qualityMode.toUpperCase()}`}
                className="hidden sm:flex px-2 py-1.5 rounded-lg text-xs font-mono bg-slate-900 text-slate-300 border border-slate-800 hover:text-white items-center gap-1 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Gauge className="w-3.5 h-3.5" />
                <span>{qualityMode.toUpperCase()}</span>
              </button>

              <button
                type="button"
                onClick={onToggleSound}
                aria-label={soundEnabled ? 'Mute Ambient Audio' : 'Enable Ambient Audio'}
                title={soundEnabled ? 'Mute Ambient Audio' : 'Enable Ambient Audio'}
                className={`p-1.5 rounded-lg border transition-colors cursor-pointer shrink-0 ${
                  soundEnabled
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>

              {pct > 5 && (
                <button
                  type="button"
                  onClick={() => onSelectChapter(0)}
                  aria-label="Return to Beginning"
                  title="Return to Chapter 01"
                  className="hidden sm:flex p-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 hover:text-amber-400 transition-colors cursor-pointer shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
