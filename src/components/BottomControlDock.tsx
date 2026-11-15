import React from 'react';
import {
  Compass,
  Sparkles,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Layers,
  Gauge,
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
  const pct = Math.round(scrollProgress * 100);

  return (
    <div
      style={{
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: 'min(940px, 95vw)',
      }}
      className="fixed z-30 w-full flex flex-col items-center pointer-events-none"
    >
      {/* Collapse / Expand Handle */}
      <button
        type="button"
        onClick={onToggleDockCollapse}
        aria-expanded={!dockCollapsed}
        aria-label={dockCollapsed ? 'Show World Controls' : 'Hide World Controls'}
        className="pointer-events-auto mb-1.5 px-3.5 py-1 rounded-t-lg bg-[#0B1221] border border-b-0 border-slate-800 text-xs font-medium text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
      >
        {dockCollapsed ? (
          <>
            <ChevronUp className="w-3.5 h-3.5" />
            <span>Show Controls</span>
          </>
        ) : (
          <>
            <ChevronDown className="w-3.5 h-3.5" />
            <span>Hide Controls</span>
          </>
        )}
      </button>

      {!dockCollapsed && (
        <div className="pointer-events-auto w-full bg-[#0B1221]/95 border border-slate-800 rounded-xl px-4 py-2.5 shadow-2xl flex flex-wrap items-center justify-between gap-3">
          {/* Chapter Spatial Stepper */}
          <div className="flex items-center gap-1 overflow-x-auto py-0.5">
            {CHAPTERS.map((ch) => {
              const active = ch.index === activeChapterIndex;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => onSelectChapter(ch.index)}
                  title={ch.title}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-amber-500 text-slate-950 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/90 hover:text-white'
                  }`}
                >
                  {ch.numberLabel}. {ch.id.charAt(0).toUpperCase() + ch.id.slice(1)}
                </button>
              );
            })}
          </div>

          {/* Interactive World & Utility Controls */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-1.5 sm:gap-2 w-full sm:w-auto sm:ml-auto">
            <button
              type="button"
              onClick={onToggleExploreMode}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 border ${
                exploreMode
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/50'
                  : 'bg-slate-900 text-slate-200 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{exploreMode ? 'Guided Camera' : 'Explore World'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenProjectGrid}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium bg-slate-900 text-slate-200 border border-slate-800 hover:border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>All Projects</span>
            </button>

            <button
              type="button"
              onClick={onOpenAiLab}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium bg-slate-900 text-amber-300 border border-amber-500/30 hover:border-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Architecture Lab</span>
            </button>

            <button
              type="button"
              onClick={onCycleQuality}
              title="Cycle 3D rendering quality mode"
              aria-label={`Rendering Quality: ${qualityMode.toUpperCase()}`}
              className="px-2 sm:px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono bg-slate-900 text-slate-300 border border-slate-800 hover:text-white flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap shrink-0"
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
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {pct > 5 && (
              <button
                type="button"
                onClick={() => onSelectChapter(0)}
                aria-label="Return to Beginning"
                title="Return to Chapter 01"
                className="p-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 hover:text-amber-400 transition-colors cursor-pointer shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
