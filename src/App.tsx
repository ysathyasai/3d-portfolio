import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  CHAPTERS,
  PROJECTS,
  WORKSHOP_ARTIFACTS,
  CONSTELLATION_NODES,
  JOURNEY_MILESTONES,
  OWNER_PROFILE,
  type ProjectItem,
} from './data/portfolio';
import {
  clamp01,
  getChapterIndexFromProgress,
  getProgressFromChapterIndex,
  parseInitialUrlState,
} from './utils/worldLogic';
import { soundEngine } from './utils/soundEngine';
import {
  DeveloperUniverseCanvas,
  type Interactive3DSelection,
} from './components/DeveloperUniverseCanvas';
import { TopBar } from './components/TopBar';
import { BottomControlDock } from './components/BottomControlDock';
import { ChapterNarrativeOverlay } from './components/ChapterNarrativeOverlay';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { RecruiterQuickViewModal } from './components/RecruiterQuickViewModal';
import { AiArchitectureLabModal } from './components/AiArchitectureLabModal';
import { AccessibleProjectGridDrawer } from './components/AccessibleProjectGridDrawer';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Sparkles, Compass } from 'lucide-react';

export default function App() {
  const initialRoute = parseInitialUrlState(
    typeof window !== 'undefined' ? window.location.search : '',
    typeof window !== 'undefined' ? window.location.hash : '',
  );

  const [introDismissed, setIntroDismissed] = useState<boolean>(initialRoute.skipIntro);
  const [scrollProgress, setScrollProgress] = useState<number>(
    getProgressFromChapterIndex(initialRoute.initialChapterIndex, CHAPTERS.length),
  );
  const [exploreMode, setExploreMode] = useState<boolean>(initialRoute.exploreMode);
  const [quickViewOpen, setQuickViewOpen] = useState<boolean>(initialRoute.quickView);
  const [projectGridOpen, setProjectGridOpen] = useState<boolean>(false);
  const [aiLabOpen, setAiLabOpen] = useState<boolean>(false);
  const [aiLabInitialPrompt, setAiLabInitialPrompt] = useState<string | undefined>(undefined);
  const [dockCollapsed, setDockCollapsed] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [qualityMode, setQualityMode] = useState<'auto' | 'high' | 'eco'>('auto');
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Selected items inside chapters & modals
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(() =>
    initialRoute.selectedProjectId
      ? PROJECTS.find((p) => p.id === initialRoute.selectedProjectId) || null
      : null,
  );
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>(
    JOURNEY_MILESTONES[0].id,
  );
  const [selectedArtifactId, setSelectedArtifactId] = useState<string>(
    WORKSHOP_ARTIFACTS[0].id,
  );
  const [selectedConstellationId, setSelectedConstellationId] = useState<string>(
    CONSTELLATION_NODES[0].id,
  );
  const [hovered3DObject, setHovered3DObject] = useState<Interactive3DSelection | null>(null);
  const [mobileJoystick, setMobileJoystick] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const activeChapterIndex = getChapterIndexFromProgress(scrollProgress, CHAPTERS.length);
  const prevChapterRef = useRef<number>(activeChapterIndex);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Sync URL hash and audio chime when active chapter changes
  useEffect(() => {
    const chapter = CHAPTERS[activeChapterIndex];
    if (chapter && prevChapterRef.current !== activeChapterIndex) {
      prevChapterRef.current = activeChapterIndex;
      soundEngine.playChapterTransition(activeChapterIndex);
      if (window.history.replaceState) {
        window.history.replaceState(null, '', `#${chapter.id}`);
      }
    }
  }, [activeChapterIndex]);

  const handleSelectChapter = useCallback((index: number) => {
    const safeIdx = Math.max(0, Math.min(CHAPTERS.length - 1, index));
    const targetProgress = getProgressFromChapterIndex(safeIdx, CHAPTERS.length);
    setScrollProgress(targetProgress);
    setExploreMode(false);
    setQuickViewOpen(false);
    setIntroDismissed(true);
    soundEngine.playClick();
  }, []);

  // Wheel & Keyboard scroll navigation for Guided Mode
  useEffect(() => {
    const isModalActive =
      quickViewOpen || projectGridOpen || aiLabOpen || Boolean(selectedProject);

    const handleWheel = (e: WheelEvent) => {
      if (isModalActive || exploreMode) return;
      // Ignore wheel events inside scrollable inner containers
      const target = e.target as HTMLElement | null;
      if (target && target.closest('.overflow-y-auto')) {
        return;
      }
      if (!introDismissed && Math.abs(e.deltaY) > 10) {
        setIntroDismissed(true);
      }
      const delta = e.deltaY * 0.00045;
      setScrollProgress((prev) => clamp01(prev + delta));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalActive) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === 'h' || e.key === 'H') {
        setDockCollapsed((p) => !p);
        return;
      }

      if (!exploreMode) {
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
          e.preventDefault();
          setIntroDismissed(true);
          handleSelectChapter(Math.min(CHAPTERS.length - 1, activeChapterIndex + 1));
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
          e.preventDefault();
          handleSelectChapter(Math.max(0, activeChapterIndex - 1));
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    quickViewOpen,
    projectGridOpen,
    aiLabOpen,
    selectedProject,
    exploreMode,
    introDismissed,
    activeChapterIndex,
    handleSelectChapter,
  ]);

  // Handle clicking a 3D landmark in the canvas
  const handleSelect3DObject = useCallback(
    (selection: Interactive3DSelection) => {
      soundEngine.playClick();
      setIntroDismissed(true);
      if (selection.type === 'project') {
        const proj = PROJECTS.find((p) => p.id === selection.id);
        if (proj) setSelectedProject(proj);
      } else if (selection.type === 'artifact') {
        setSelectedArtifactId(selection.id);
        handleSelectChapter(2);
      } else if (selection.type === 'constellation') {
        setSelectedConstellationId(selection.id);
        handleSelectChapter(4);
      } else if (selection.type === 'milestone') {
        setSelectedMilestoneId(selection.id);
        handleSelectChapter(1);
      }
    },
    [handleSelectChapter],
  );

  const handleOpenAiLab = useCallback((initialPrompt?: string) => {
    soundEngine.playClick();
    setAiLabInitialPrompt(initialPrompt);
    setAiLabOpen(true);
  }, []);

  const handleCycleQuality = useCallback(() => {
    setQualityMode((prev) =>
      prev === 'auto' ? 'high' : prev === 'high' ? 'eco' : 'auto',
    );
  }, []);

  const handleToggleSound = useCallback(() => {
    const next = soundEngine.toggleSound();
    setSoundEnabled(next);
  }, []);

  return (
    <div
      data-chapter={CHAPTERS[activeChapterIndex]?.id || 'arrival'}
      data-mode={exploreMode ? 'explore' : 'guided'}
      className="relative w-screen h-screen overflow-hidden bg-[#070B14] text-slate-100 select-none"
    >
      {/* Full-Viewport 3D Developer Universe Canvas */}
      <DeveloperUniverseCanvas
        scrollProgress={scrollProgress}
        exploreMode={exploreMode}
        qualityMode={qualityMode}
        reducedMotion={reducedMotion}
        selectedArtifactId={selectedArtifactId}
        selectedConstellationId={selectedConstellationId}
        onSelectObject={handleSelect3DObject}
        onHoverObject={setHovered3DObject}
        mobileJoystickVector={mobileJoystick}
      />

      {/* Top Navigation Bar (Strict 3-Zone Contract) */}
      <TopBar
        activeChapterIndex={activeChapterIndex}
        isQuickViewOpen={quickViewOpen}
        onSelectChapter={handleSelectChapter}
        onToggleQuickView={() => {
          setIntroDismissed(true);
          setQuickViewOpen((prev) => !prev);
        }}
      />

      {/* Introductory Awakening Gate (Dismissible immediately or via ?autostart=1) */}
      {!introDismissed && !quickViewOpen && (
        <div
          role="region"
          aria-label="Welcome to Sathya — Beyond the Screen"
          className="fixed inset-0 z-30 flex items-center justify-center p-4 bg-[#070B14]/75"
        >
          <div className="max-w-xl w-full bg-[#0B1221] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-center space-y-5">
            <div className="text-xs font-mono text-amber-400">
              Interactive 3D Portfolio · Hyderabad, India
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-display">
              {OWNER_PROFILE.fullName.toUpperCase()}
            </h1>
            <p className="text-sm sm:text-base text-sky-300 font-medium">
              Developer · AI/ML Enthusiast · Creative Technologist
            </p>
            <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
              &ldquo;{OWNER_PROFILE.introLine}&rdquo;
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIntroDismissed(true);
                  soundEngine.playClick();
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Explore My World
              </button>
              <button
                type="button"
                onClick={() => handleSelectChapter(3)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-100 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Discover Projects
              </button>
              <button
                type="button"
                onClick={() => {
                  setIntroDismissed(true);
                  setQuickViewOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Skip to Quick Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Chapter Narrative & Interactive Overlay */}
      {introDismissed && !quickViewOpen && (
        <main>
          <ChapterNarrativeOverlay
            activeChapterIndex={activeChapterIndex}
            exploreMode={exploreMode}
            hovered3DObject={hovered3DObject}
            selectedMilestoneId={selectedMilestoneId}
            selectedArtifactId={selectedArtifactId}
            selectedConstellationId={selectedConstellationId}
            onSelectMilestone={setSelectedMilestoneId}
            onSelectArtifact={setSelectedArtifactId}
            onSelectConstellation={setSelectedConstellationId}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onSelectChapter={handleSelectChapter}
            onToggleExploreMode={() => setExploreMode((p) => !p)}
            onOpenProjectGrid={() => setProjectGridOpen(true)}
            onOpenAiLab={handleOpenAiLab}
            onOpenQuickView={() => setQuickViewOpen(true)}
          />

          {/* Free Exploration Mode Helper & Touch D-Pad */}
          {exploreMode && (
            <div className="fixed bottom-24 right-6 z-20 flex flex-col items-end gap-3 pointer-events-none">
              <div className="pointer-events-auto bg-[#0B1221]/95 border border-sky-500/40 rounded-xl px-4 py-2.5 text-xs text-slate-200 shadow-xl max-w-xs">
                <div className="font-mono text-sky-400 flex items-center gap-1.5 mb-1">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Free Exploration Mode Active</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Use <span className="text-white font-mono">WASD / Arrow Keys</span> or the touch pad to fly the Scout Drone, drag to orbit, and click any 3D monument.
                </p>
              </div>

              {/* Touch-Friendly Drone Pad for Mobile & Tablet */}
              <div className="pointer-events-auto grid grid-cols-3 gap-1.5 bg-[#0B1221]/95 border border-slate-800 p-2 rounded-xl">
                <div />
                <button
                  type="button"
                  aria-label="Fly Drone Forward"
                  onPointerDown={() => setMobileJoystick({ x: 0, y: 1 })}
                  onPointerUp={() => setMobileJoystick({ x: 0, y: 0 })}
                  onPointerLeave={() => setMobileJoystick({ x: 0, y: 0 })}
                  className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 active:bg-amber-500 active:text-slate-950 text-slate-200 border border-slate-800 cursor-pointer"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <div />
                <button
                  type="button"
                  aria-label="Fly Drone Left"
                  onPointerDown={() => setMobileJoystick({ x: -1, y: 0 })}
                  onPointerUp={() => setMobileJoystick({ x: 0, y: 0 })}
                  onPointerLeave={() => setMobileJoystick({ x: 0, y: 0 })}
                  className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 active:bg-amber-500 active:text-slate-950 text-slate-200 border border-slate-800 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Fly Drone Backward"
                  onPointerDown={() => setMobileJoystick({ x: 0, y: -1 })}
                  onPointerUp={() => setMobileJoystick({ x: 0, y: 0 })}
                  onPointerLeave={() => setMobileJoystick({ x: 0, y: 0 })}
                  className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 active:bg-amber-500 active:text-slate-950 text-slate-200 border border-slate-800 cursor-pointer"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Fly Drone Right"
                  onPointerDown={() => setMobileJoystick({ x: 1, y: 0 })}
                  onPointerUp={() => setMobileJoystick({ x: 0, y: 0 })}
                  onPointerLeave={() => setMobileJoystick({ x: 0, y: 0 })}
                  className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 active:bg-amber-500 active:text-slate-950 text-slate-200 border border-slate-800 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </main>
      )}

      {/* Unified Collapsible Bottom Control Dock */}
      <BottomControlDock
        activeChapterIndex={activeChapterIndex}
        scrollProgress={scrollProgress}
        exploreMode={exploreMode}
        soundEnabled={soundEnabled}
        qualityMode={qualityMode}
        dockCollapsed={dockCollapsed}
        onSelectChapter={handleSelectChapter}
        onToggleExploreMode={() => {
          setIntroDismissed(true);
          setExploreMode((prev) => !prev);
        }}
        onToggleSound={handleToggleSound}
        onCycleQuality={handleCycleQuality}
        onOpenAiLab={() => handleOpenAiLab()}
        onOpenProjectGrid={() => setProjectGridOpen(true)}
        onToggleDockCollapse={() => setDockCollapsed((prev) => !prev)}
      />

      {/* Project Detail Overlay Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onAnalyzeWithAi={(title) => {
          setSelectedProject(null);
          handleOpenAiLab(
            `Perform a deep architectural analysis of ${title} by Yejju Sathya Sai, covering its problem statement, technical stack, and engineering trade-offs.`,
          );
        }}
      />

      {/* Accessible Secondary Project Grid Drawer */}
      <AccessibleProjectGridDrawer
        isOpen={projectGridOpen}
        onClose={() => setProjectGridOpen(false)}
        onSelectProject={(proj) => {
          setProjectGridOpen(false);
          setSelectedProject(proj);
        }}
        onAnalyzeWithAi={(title) => {
          setProjectGridOpen(false);
          handleOpenAiLab(`Explain the architecture and key engineering innovations of ${title}.`);
        }}
      />

      {/* Recruiter Quick View Full Dossier Modal */}
      <RecruiterQuickViewModal
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
        onSelectProject={(proj) => setSelectedProject(proj)}
        onOpenAiLab={(promptText) => handleOpenAiLab(promptText)}
        onJumpToContact={() => handleSelectChapter(5)}
      />

      {/* Gemini High-Thinking Architecture Lab & Workshop CLI Modal */}
      <AiArchitectureLabModal
        isOpen={aiLabOpen}
        initialPrompt={aiLabInitialPrompt}
        onClose={() => setAiLabOpen(false)}
        onOpenProjectById={(id) => {
          const found = PROJECTS.find((p) => p.id === id);
          if (found) {
            setAiLabOpen(false);
            setSelectedProject(found);
          }
        }}
      />
    </div>
  );
}
