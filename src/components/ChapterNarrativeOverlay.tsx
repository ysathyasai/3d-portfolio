import React, { useState } from 'react';
import {
  ArrowRight,
  Compass,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Send,
  Terminal,
  CheckCircle2,
  Minimize2,
  Maximize2,
  Layers,
  Cpu,
  RotateCcw,
  Star,
  Code2,
} from 'lucide-react';
import {
  OWNER_PROFILE,
  CHAPTERS,
  PERSONAL_ARTIFACTS,
  EDUCATION_CAMPUSES,
  JOURNEY_MILESTONES,
  WORKSHOP_ARTIFACTS,
  AI_LAB_PIPELINES,
  PROJECTS,
  CASE_STUDIES,
  OPEN_SOURCE_REPOS,
  HACKATHON_ARENAS,
  EXPERIENCE_TRACKS,
  CONSTELLATION_NODES,
  PLAYGROUND_CHALLENGES,
  type ProjectItem,
} from '../data/portfolio';
import { validateContactInput } from '../utils/worldLogic';
import type { Interactive3DSelection } from './DeveloperUniverseCanvas';

interface ChapterNarrativeOverlayProps {
  activeChapterIndex: number;
  exploreMode: boolean;
  hovered3DObject: Interactive3DSelection | null;
  selectedMilestoneId: string;
  selectedArtifactId: string;
  selectedConstellationId: string;
  onSelectMilestone: (id: string) => void;
  onSelectArtifact: (id: string) => void;
  onSelectConstellation: (id: string) => void;
  onSelectProject: (project: ProjectItem) => void;
  onSelectChapter: (index: number) => void;
  onToggleExploreMode: () => void;
  onOpenProjectGrid: () => void;
  onOpenAiLab: (initialPrompt?: string) => void;
  onOpenQuickView: () => void;
}

export const ChapterNarrativeOverlay: React.FC<ChapterNarrativeOverlayProps> = ({
  activeChapterIndex,
  exploreMode,
  hovered3DObject,
  selectedMilestoneId,
  selectedArtifactId,
  selectedConstellationId,
  onSelectMilestone,
  onSelectArtifact,
  onSelectConstellation,
  onSelectProject,
  onSelectChapter,
  onToggleExploreMode,
  onOpenProjectGrid,
  onOpenAiLab,
  onOpenQuickView,
}) => {
  const [minimized, setMinimized] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Interactive selections for new chapters
  const [selectedPersonaId, setSelectedPersonaId] = useState(PERSONAL_ARTIFACTS[0].id);
  const [selectedCampusId, setSelectedCampusId] = useState(EDUCATION_CAMPUSES[0].id);
  const [selectedPipelineId, setSelectedPipelineId] = useState(AI_LAB_PIPELINES[0].id);
  const [pipelineOptionIdx, setPipelineOptionIdx] = useState(0);
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState(CASE_STUDIES[0].id);
  const [selectedHackathonId, setSelectedHackathonId] = useState(HACKATHON_ARENAS[0].id);
  const [selectedExpId, setSelectedExpId] = useState(EXPERIENCE_TRACKS[0].id);

  // Interactive Playground Challenge State (Chapter 13)
  const [selectedChallengeId, setSelectedChallengeId] = useState(PLAYGROUND_CHALLENGES[0].id);
  const [userOrderedSteps, setUserOrderedSteps] = useState<string[]>([]);

  // Contact form state (Chapter 14)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    organization: '',
    subject: 'AI / Full-Stack Engineering Opportunity',
    message: '',
    websiteHoneypot: '',
  });
  const [contactErrors, setContactErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitReceipt, setSubmitReceipt] = useState<{
    id: string;
    createdAt: string;
    directMailto: string;
  } | null>(null);
  const [submitServerError, setSubmitServerError] = useState<string | null>(null);

  const chapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];
  const activePersona =
    PERSONAL_ARTIFACTS.find((p) => p.id === selectedPersonaId) || PERSONAL_ARTIFACTS[0];
  const activeCampus =
    EDUCATION_CAMPUSES.find((c) => c.id === selectedCampusId) || EDUCATION_CAMPUSES[0];
  const activeMilestone =
    JOURNEY_MILESTONES.find((m) => m.id === selectedMilestoneId) ||
    JOURNEY_MILESTONES[0];
  const activeArtifact =
    WORKSHOP_ARTIFACTS.find((a) => a.id === selectedArtifactId) ||
    WORKSHOP_ARTIFACTS[0];
  const activePipeline =
    AI_LAB_PIPELINES.find((p) => p.id === selectedPipelineId) || AI_LAB_PIPELINES[0];
  const activePipelineOpt =
    activePipeline.parameterOptions[pipelineOptionIdx] ||
    activePipeline.parameterOptions[0];
  const activeCaseStudy =
    CASE_STUDIES.find((c) => c.id === selectedCaseStudyId) || CASE_STUDIES[0];
  const activeHackathon =
    HACKATHON_ARENAS.find((h) => h.id === selectedHackathonId) || HACKATHON_ARENAS[0];
  const activeExperience =
    EXPERIENCE_TRACKS.find((e) => e.id === selectedExpId) || EXPERIENCE_TRACKS[0];
  const activeConstellation =
    CONSTELLATION_NODES.find((c) => c.id === selectedConstellationId) ||
    CONSTELLATION_NODES[0];
  const activeChallenge =
    PLAYGROUND_CHALLENGES.find((c) => c.id === selectedChallengeId) ||
    PLAYGROUND_CHALLENGES[0];

  const isChallengeComplete =
    userOrderedSteps.length === activeChallenge.items.length;
  const isChallengeCorrect =
    isChallengeComplete &&
    userOrderedSteps.every((stepId, idx) => stepId === activeChallenge.correctOrder[idx]);

  const handleToggleChallengeStep = (stepId: string) => {
    if (userOrderedSteps.includes(stepId)) {
      setUserOrderedSteps((prev) => prev.filter((id) => id !== stepId));
    } else if (userOrderedSteps.length < activeChallenge.items.length) {
      setUserOrderedSteps((prev) => [...prev, stepId]);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitServerError(null);

    const validation = validateContactInput(contactForm);
    if (!validation.valid) {
      setContactErrors(validation.errors);
      return;
    }
    setContactErrors({});
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitServerError(data.error || 'Could not send transmission.');
      } else {
        setSubmitReceipt({
          id: data.receipt.id,
          createdAt: data.receipt.createdAt,
          directMailto: data.directMailto,
        });
        setContactForm((prev) => ({ ...prev, name: '', email: '', message: '' }));
      }
    } catch {
      setSubmitServerError('Network error while dispatching message.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <aside
      aria-label={`Chapter ${chapter.numberLabel}: ${chapter.title}`}
      className="fixed bottom-[3.75rem] left-2.5 right-2.5 sm:top-16 sm:bottom-auto sm:left-6 sm:right-auto z-20 sm:w-[445px] max-h-[43vh] sm:max-h-[calc(100vh-9.5rem)] flex flex-col pointer-events-none transition-all duration-200"
    >
      {/* Contextual 3D Hover Tooltip Banner */}
      {hovered3DObject && (
        <div className="mb-1.5 px-3.5 py-1.5 rounded-xl bg-[#0B1221]/95 border border-amber-500/50 text-xs font-mono text-amber-300 shadow-lg flex items-center justify-between">
          <span className="truncate">3D Target: {hovered3DObject.label}</span>
          <span className="text-[11px] text-slate-400 ml-2 shrink-0">Tap to inspect</span>
        </div>
      )}

      {/* Main Narrative Card */}
      <div className="pointer-events-auto bg-[#0B1221]/92 backdrop-blur-md border border-slate-800/90 rounded-2xl p-3.5 sm:p-5 shadow-2xl overflow-y-auto">
        {/* Card Header & Minimize Toggle */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="text-[11px] sm:text-xs font-mono text-amber-400 truncate">
            {chapter.kicker}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-mono text-slate-400">
              {chapter.numberLabel}/14
            </span>
            <button
              type="button"
              onClick={() => setMinimized((prev) => !prev)}
              aria-label={minimized ? 'Expand Chapter Story Card' : 'Minimize Chapter Story Card'}
              title={minimized ? 'Expand Story Card' : 'Minimize Story Card to view full 3D scene'}
              className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 cursor-pointer shrink-0"
            >
              {minimized ? (
                <Maximize2 className="w-3.5 h-3.5" />
              ) : (
                <Minimize2 className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight font-display leading-snug">
          {chapter.headline}
        </h1>

        {!minimized && (
          <div className="mt-2.5 sm:mt-3 space-y-3">
            {/* CHAPTER 01: ARRIVAL */}
            {activeChapterIndex === 0 && (
              <>
                <div className="flex items-center gap-3 pt-0.5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shrink-0 flex items-center justify-center">
                    {!imgError ? (
                      <img
                        src={OWNER_PROFILE.photoUrl}
                        alt={OWNER_PROFILE.fullName}
                        referrerPolicy="no-referrer"
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-base font-bold text-amber-400 font-display">YS</span>
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-sky-300">
                      AI/ML Engineer · Full-Stack Builder · Systems Explorer
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {OWNER_PROFILE.specialization}
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {chapter.lead}
                </p>

                <div className="text-[11px] text-slate-400 font-mono">
                  Motto: &ldquo;{OWNER_PROFILE.tagline}&rdquo;
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  <button
                    type="button"
                    onClick={() => onSelectChapter(6)}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Discover My Builds</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={onToggleExploreMode}
                    className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-sky-300 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>{exploreMode ? 'Guided Journey' : 'Explore My World'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={onOpenQuickView}
                    className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Quick Dossier
                  </button>
                </div>

                <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs text-slate-400">
                  <span className="truncate">Swipe, scroll, or pick any chapter below</span>
                  <button
                    type="button"
                    onClick={() => onSelectChapter(1)}
                    className="text-amber-400 hover:underline font-medium cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Next: 02. Persona →
                  </button>
                </div>
              </>
            )}

            {/* CHAPTER 02: THE PERSON BEHIND THE CODE */}
            {activeChapterIndex === 1 && (
              <>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {chapter.lead}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {PERSONAL_ARTIFACTS.map((pArt, idx) => {
                    const isSelected = pArt.id === activePersona.id;
                    return (
                      <button
                        key={pArt.id}
                        type="button"
                        onClick={() => setSelectedPersonaId(pArt.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-sky-500 text-slate-950 font-semibold'
                            : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white'
                        }`}
                      >
                        0{idx + 1}. {pArt.title.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>

                <div className="bg-[#070B14] border border-slate-800 rounded-xl p-3.5 space-y-2">
                  <div className="text-[11px] font-mono text-sky-400">
                    {activePersona.kicker}
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-white">
                    {activePersona.title}
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activePersona.story}
                  </p>
                  <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-emerald-400">
                    Proof: {activePersona.verifiedFact}
                  </div>
                </div>
              </>
            )}

            {/* CHAPTER 03: ORIGINS & EDUCATION */}
            {activeChapterIndex === 2 && (
              <>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {chapter.lead}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {EDUCATION_CAMPUSES.map((campus) => {
                    const isSelected = campus.id === activeCampus.id;
                    return (
                      <button
                        key={campus.id}
                        type="button"
                        onClick={() => setSelectedCampusId(campus.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-500 text-white font-semibold'
                            : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white'
                        }`}
                      >
                        {campus.shortName}
                      </button>
                    );
                  })}
                </div>

                <div className="bg-[#070B14] border border-slate-800 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-indigo-400">
                    <span>{activeCampus.period}</span>
                    <span>{activeCampus.location}</span>
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-white">
                    {activeCampus.degree}
                  </h2>
                  <div className="text-xs text-sky-300 font-medium">
                    {activeCampus.institution} · {activeCampus.department}
                  </div>
                  <ul className="space-y-1 pt-1">
                    {activeCampus.highlights.map((h, i) => (
                      <li key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-1.5 border-t border-slate-800/80 text-[11px] font-mono text-emerald-400">
                    Flagship Builds: {activeCampus.flagshipBuilds.join(' · ')}
                  </div>
                  <a
                    href={activeCampus.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-amber-400 hover:underline font-medium pt-0.5"
                  >
                    <span>Verify Academic Build Repository</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </>
            )}

            {/* CHAPTER 04: THE EVOLUTION TIMELINE */}
            {activeChapterIndex === 3 && (
              <>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {chapter.lead}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {JOURNEY_MILESTONES.map((m, idx) => {
                    const isSelected = m.id === activeMilestone.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => onSelectMilestone(m.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-sky-500 text-slate-950 font-semibold'
                            : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white'
                        }`}
                      >
                        0{idx + 1}. {m.period}
                      </button>
                    );
                  })}
                </div>

                <div className="bg-[#070B14] border border-slate-800 rounded-xl p-3.5 space-y-2">
                  <div className="text-[11px] font-mono text-sky-400">
                    {activeMilestone.period} · {activeMilestone.institutionOrEvent}
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-white">
                    {activeMilestone.title}
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeMilestone.summary}
                  </p>
                  <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                    {activeMilestone.verifiedDetail}
                  </div>
                  <a
                    href={activeMilestone.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-amber-400 hover:underline font-medium pt-0.5"
                  >
                    <span>Verify Source ({activeMilestone.sourceLabel})</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </>
            )}

            {/* CHAPTER 05: THE ENGINEER'S WORKSHOP */}
            {activeChapterIndex === 4 && (
              <>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {chapter.lead}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {WORKSHOP_ARTIFACTS.map((art, idx) => {
                    const isSelected = art.id === activeArtifact.id;
                    return (
                      <button
                        key={art.id}
                        type="button"
                        onClick={() => onSelectArtifact(art.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-500 text-slate-950 font-semibold'
                            : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white'
                        }`}
                      >
                        0{idx + 1}. {art.name.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>

                <div className="bg-[#070B14] border border-slate-800 rounded-xl p-3.5 space-y-2">
                  <div className="text-[11px] font-mono text-emerald-400">
                    {activeArtifact.stationLabel}
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-white">
                    {activeArtifact.domainTitle}
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeArtifact.summary}
                  </p>
                  <div className="text-[11px] font-mono text-sky-300 leading-relaxed">
                    {activeArtifact.coreTechnologies.join(' · ')}
                  </div>

                  <div className="pt-2 border-t border-slate-800 space-y-1">
                    <div className="text-[11px] font-mono text-slate-400">
                      My Shipped Repository Proof:
                    </div>
                    {activeArtifact.verifiedEvidence.map((ev, i) => (
                      <a
                        key={i}
                        href={ev.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-xs text-slate-200 hover:text-amber-400 transition-colors"
                      >
                        <span className="font-semibold text-amber-300">
                          {ev.projectTitle}:
                        </span>{' '}
                        <span className="text-slate-300">{ev.proofPoint}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenAiLab()}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-xs font-medium text-amber-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Open My Workshop CLI & Architecture Lab</span>
                </button>
              </>
            )}

            {/* CHAPTER 06: THE AI & MACHINE LEARNING LABORATORY */}
            {activeChapterIndex === 5 && (
              <>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {chapter.lead}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {AI_LAB_PIPELINES.map((pipe) => {
                    const isSelected = pipe.id === activePipeline.id;
                    return (
                      <button
                        key={pipe.id}
                        type="button"
                        onClick={() => {
                          setSelectedPipelineId(pipe.id);
                          setPipelineOptionIdx(0);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-purple-500 text-slate-950 font-semibold'
                            : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white'
                        }`}
                      >
                        {pipe.projectLinked.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>

                <div className="bg-[#070B14] border border-slate-800 rounded-xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-purple-400 truncate">
                      {activePipeline.projectLinked}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setPipelineOptionIdx((prev) =>
                          prev === 0 && activePipeline.parameterOptions.length > 1 ? 1 : 0,
                        )
                      }
                      className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-purple-500/40 text-[11px] font-mono text-amber-300 cursor-pointer shrink-0"
                    >
                      Toggle Pipeline Mode ⇄
                    </button>
                  </div>

                  <h2 className="text-sm font-bold text-white">
                    {activePipeline.name}
                  </h2>

                  <div className="text-[11px] font-mono text-sky-300">
                    Active Config: {activePipelineOpt.label}
                  </div>

                  <div className="space-y-1.5">
                    {activePipelineOpt.stages.map((st) => (
                      <div
                        key={st.stage}
                        className="p-2 rounded-lg bg-slate-900/90 border border-slate-800/80 flex items-start justify-between gap-2"
                      >
                        <div>
                          <div className="text-xs font-semibold text-white">
                            {st.stage}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {st.detail}
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-emerald-400 shrink-0">
                          {st.metric}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-1.5 border-t border-slate-800 text-[11px] text-slate-300">
                    <span className="text-amber-400 font-semibold">My Takeaway: </span>
                    {activePipelineOpt.engineeringTakeaway}
                  </div>
                </div>
              </>
            )}

            {/* CHAPTER 07: THE PROJECT UNIVERSE */}
            {activeChapterIndex === 6 && (
              <>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Tap any 3D project monument in the plaza or select one of my {PROJECTS.length} builds below to inspect its architecture, team credits, and live code.
                </p>

                <div className="space-y-2 max-h-52 sm:max-h-60 overflow-y-auto pr-1">
                  {PROJECTS.map((proj) => (
                    <div
                      key={proj.id}
                      className="bg-[#070B14] border border-slate-800 hover:border-slate-700 rounded-xl p-3 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-amber-400 mb-0.5">
                        <span className="truncate">{proj.badgeText}</span>
                        <span className="text-slate-400 shrink-0">{proj.year}</span>
                      </div>
                      <h2 className="text-sm font-bold text-white">
                        {proj.title}
                      </h2>
                      <p className="text-xs text-slate-300 line-clamp-2 mt-0.5 mb-2">
                        {proj.subtitle}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onSelectProject(proj)}
                          className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                        >
                          Inspect Architecture
                        </button>
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
                        >
                          <Github className="w-3 h-3" />
                          <span>Repo</span>
                        </a>
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-emerald-400 flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Live</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={onOpenProjectGrid}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Open Full Accessible Project Grid ({PROJECTS.length} Builds)</span>
                </button>
              </>
            )}

            {/* CHAPTER 08: ENGINEERING CASE STUDIES */}
            {activeChapterIndex === 7 && (
              <>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {chapter.lead}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {CASE_STUDIES.map((cs) => {
                    const isSelected = cs.id === activeCaseStudy.id;
                    return (
                      <button
                        key={cs.id}
                        type="button"
                        onClick={() => setSelectedCaseStudyId(cs.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-sky-500 text-slate-950 font-semibold'
                            : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white'
                        }`}
                      >
                        {cs.title.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>

                <div className="bg-[#070B14] border border-slate-800 rounded-xl p-3.5 space-y-2">
                  <div className="text-[11px] font-mono text-sky-400">
                    {activeCaseStudy.contextBadge}
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-white">
                    {activeCaseStudy.title}
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <span className="text-amber-300 font-semibold">Problem: </span>
                    {activeCaseStudy.problemStatement}
                  </p>
                  <ul className="space-y-1 pt-0.5">
                    {activeCaseStudy.keyDecisions.map((dec, i) => (
                      <li key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                        <span className="text-sky-400 mt-0.5">▸</span>
                        <span>
                          <strong className="text-white">{dec.decision}:</strong> {dec.rationale}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-emerald-400">
                    Proof: {activeCaseStudy.verificationProof}
                  </div>
                  <a
                    href={activeCaseStudy.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-amber-400 hover:underline font-medium pt-0.5"
                  >
                    <span>Inspect Source Repository</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </>
            )}

            {/* CHAPTER 09: THE OPEN-SOURCE UNIVERSE */}
            {activeChapterIndex === 8 && (
              <>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {chapter.lead}
                </p>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {OPEN_SOURCE_REPOS.map((repo) => (
                    <a
                      key={repo.name}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-[#070B14] border border-slate-800 hover:border-emerald-500/50 rounded-xl p-3 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                          <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                          {repo.name}
                        </span>
                        <div className="flex items-center gap-2 text-[11px] font-mono">
                          <span className="text-sky-300">{repo.language}</span>
                          <span className="text-amber-400 flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-amber-400" />
                            {repo.starsLabel}
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                        {repo.summary}
                      </p>
                    </a>
                  ))}
                </div>
              </>
            )}

            {/* CHAPTER 10: HACKATHONS & COLLABORATIONS */}
            {activeChapterIndex === 9 && (
              <>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {chapter.lead}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {HACKATHON_ARENAS.map((h, idx) => {
                    const isSelected = h.id === activeHackathon.id;
                    return (
                      <button
                        key={h.id}
                        type="button"
                        onClick={() => setSelectedHackathonId(h.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-orange-500 text-slate-950 font-semibold'
                            : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white'
                        }`}
                      >
                        0{idx + 1}. {h.projectBuilt.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>

                <div className="bg-[#070B14] border border-slate-800 rounded-xl p-3.5 space-y-2">
                  <div className="text-[11px] font-mono text-orange-400">
                    {activeHackathon.distinction} · {activeHackathon.year}
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-white">
                    {activeHackathon.event}
                  </h2>
                  <div className="text-xs text-sky-300 font-medium">
                    Built: {activeHackathon.projectBuilt} · Role: {activeHackathon.myRole}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeHackathon.outcome}
                  </p>
                  <div className="text-[11px] font-mono text-slate-400">
                    Team: {activeHackathon.teamSummary}
                  </div>
                  <a
                    href={activeHackathon.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-amber-400 hover:underline font-medium pt-0.5"
                  >
                    <span>Inspect Hackathon Repository</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </>
            )}

            {/* CHAPTER 11: EXPERIENCE & TECHNICAL GROWTH */}
            {activeChapterIndex === 10 && (
              <>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {chapter.lead}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {EXPERIENCE_TRACKS.map((exp, idx) => {
                    const isSelected = exp.id === activeExperience.id;
                    return (
                      <button
                        key={exp.id}
                        type="button"
                        onClick={() => setSelectedExpId(exp.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-pink-500 text-slate-950 font-semibold'
                            : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white'
                        }`}
                      >
                        0{idx + 1}. {exp.category.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>

                <div className="bg-[#070B14] border border-slate-800 rounded-xl p-3.5 space-y-2">
                  <div className="text-[11px] font-mono text-pink-400">
                    {activeExperience.period} · {activeExperience.organizationOrContext}
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-white">
                    {activeExperience.roleTitle}
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeExperience.summary}
                  </p>
                  <ul className="space-y-1 pt-0.5">
                    {activeExperience.deliverables.map((d, i) => (
                      <li key={i} className="text-[11px] text-emerald-300 flex items-start gap-1.5">
                        <span>✓</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* CHAPTER 12: ACHIEVEMENTS & CERTIFICATIONS */}
            {activeChapterIndex === 11 && (
              <>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {chapter.lead}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {CONSTELLATION_NODES.map((node, idx) => {
                    const isSelected = node.id === activeConstellation.id;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => onSelectConstellation(node.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-purple-500 text-slate-950 font-semibold'
                            : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white'
                        }`}
                      >
                        ★ 0{idx + 1}. {node.projectLinked.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>

                <div className="bg-[#070B14] border border-slate-800 rounded-xl p-3.5 space-y-2">
                  <div className="text-[11px] font-mono text-purple-400">
                    {activeConstellation.category} · {activeConstellation.date}
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-white">
                    {activeConstellation.title}
                  </h2>
                  <div className="text-xs text-sky-300">
                    {activeConstellation.event}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeConstellation.story}
                  </p>
                  <div className="pt-2 border-t border-slate-800/80 text-xs font-mono text-emerald-400">
                    Verified Outcome: {activeConstellation.verifiedOutcome}
                  </div>
                  <a
                    href={activeConstellation.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-amber-400 hover:underline font-medium pt-0.5"
                  >
                    <span>Inspect Primary Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </>
            )}

            {/* CHAPTER 13: THE INTERACTIVE PLAYGROUND */}
            {activeChapterIndex === 12 && (
              <>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {chapter.lead}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {PLAYGROUND_CHALLENGES.map((ch) => {
                    const isSelected = ch.id === activeChallenge.id;
                    return (
                      <button
                        key={ch.id}
                        type="button"
                        onClick={() => {
                          setSelectedChallengeId(ch.id);
                          setUserOrderedSteps([]);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-teal-400 text-slate-950 font-semibold'
                            : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white'
                        }`}
                      >
                        <Cpu className="w-3 h-3 inline mr-1" />
                        {ch.title.split(':')[0]}
                      </button>
                    );
                  })}
                </div>

                <div className="bg-[#070B14] border border-slate-800 rounded-xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-teal-400">
                      Architecture Mini-Challenge ({userOrderedSteps.length}/{activeChallenge.items.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => setUserOrderedSteps([])}
                      className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed">
                    {activeChallenge.subtitle}
                  </p>

                  <div className="space-y-1.5">
                    {activeChallenge.items.map((st) => {
                      const stepOrderIdx = userOrderedSteps.indexOf(st.id);
                      const isPicked = stepOrderIdx !== -1;
                      return (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => handleToggleChallengeStep(st.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg border text-xs flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                            isPicked
                              ? 'bg-teal-500/20 border-teal-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span>{st.label}</span>
                          {isPicked && (
                            <span className="px-2 py-0.5 rounded bg-teal-400 text-slate-950 font-mono font-bold text-[10px] shrink-0">
                              #{stepOrderIdx + 1}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {isChallengeComplete && (
                    <div
                      className={`p-2.5 rounded-lg border text-xs ${
                        isChallengeCorrect
                          ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                          : 'bg-amber-950/60 border-amber-500/50 text-amber-200'
                      }`}
                    >
                      <div className="font-bold mb-1">
                        {isChallengeCorrect
                          ? '✓ Exact Pipeline Match!'
                          : 'Almost! Tap Reset to try the exact production sequence:'}
                      </div>
                      <p className="text-[11px] leading-relaxed">
                        {activeChallenge.successMessage}
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenAiLab()}
                    className="py-2 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-amber-300 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Launch CLI</span>
                  </button>
                  <button
                    type="button"
                    onClick={onToggleExploreMode}
                    className="py-2 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-sky-300 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>{exploreMode ? 'Exit Drone' : 'Fly 3D Drone'}</span>
                  </button>
                </div>
              </>
            )}

            {/* CHAPTER 14: THE NEXT FRONTIER — WORKING CONTACT TERMINAL */}
            {activeChapterIndex === 13 && (
              <>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {chapter.lead}
                </p>

                <div className="flex flex-wrap items-center gap-1.5">
                  <a
                    href={OWNER_PROFILE.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 flex items-center gap-1.5 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={OWNER_PROFILE.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 flex items-center gap-1.5 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={`mailto:${OWNER_PROFILE.email}`}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-amber-300 flex items-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{OWNER_PROFILE.email}</span>
                  </a>
                </div>

                {submitReceipt ? (
                  <div className="bg-[#070B14] border border-emerald-500/40 rounded-xl p-3.5 space-y-2.5">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Transmission Logged ({submitReceipt.id})</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Your message has been validated and recorded on my portfolio server. You can also launch your email app below to send a direct copy to{' '}
                      <span className="text-white font-mono">{OWNER_PROFILE.email}</span>.
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={submitReceipt.directMailto}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Open in Email App</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setSubmitReceipt(null)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white text-xs border border-slate-800 cursor-pointer"
                      >
                        Send Another
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} noValidate className="space-y-2 pt-0.5">
                    <input
                      type="text"
                      name="websiteHoneypot"
                      value={contactForm.websiteHoneypot}
                      onChange={(e) =>
                        setContactForm((p) => ({ ...p, websiteHoneypot: e.target.value }))
                      }
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden="true"
                    />

                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-[11px] font-mono text-slate-400 mb-0.5"
                      >
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={contactForm.name}
                        onChange={(e) =>
                          setContactForm((p) => ({ ...p, name: e.target.value }))
                        }
                        placeholder="e.g. Priya Sharma"
                        className="w-full px-3 py-1.5 rounded-lg bg-[#070B14] border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                      {contactErrors.name && (
                        <p className="text-[11px] text-rose-400 mt-0.5">
                          {contactErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-[11px] font-mono text-slate-400 mb-0.5"
                      >
                        Your Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) =>
                          setContactForm((p) => ({ ...p, email: e.target.value }))
                        }
                        placeholder="you@organization.com"
                        className="w-full px-3 py-1.5 rounded-lg bg-[#070B14] border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                      {contactErrors.email && (
                        <p className="text-[11px] text-rose-400 mt-0.5">
                          {contactErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-[11px] font-mono text-slate-400 mb-0.5"
                      >
                        Message to Sathya *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={2}
                        value={contactForm.message}
                        onChange={(e) =>
                          setContactForm((p) => ({ ...p, message: e.target.value }))
                        }
                        placeholder="Tell me about an engineering role, collaboration, or project idea..."
                        className="w-full px-3 py-1.5 rounded-lg bg-[#070B14] border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                      {contactErrors.message && (
                        <p className="text-[11px] text-rose-400 mt-0.5">
                          {contactErrors.message}
                        </p>
                      )}
                    </div>

                    {submitServerError && (
                      <p className="text-xs text-rose-400">{submitServerError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{submitting ? 'Transmitting...' : 'Send Message to Sathya'}</span>
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
