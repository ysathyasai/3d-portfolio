import React, { useState } from 'react';
import {
  ArrowRight,
  Compass,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Send,
  Sparkles,
  Terminal,
  CheckCircle2,
  Minimize2,
  Maximize2,
  Layers,
} from 'lucide-react';
import {
  OWNER_PROFILE,
  CHAPTERS,
  JOURNEY_MILESTONES,
  WORKSHOP_ARTIFACTS,
  PROJECTS,
  CONSTELLATION_NODES,
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

  // Contact form state (Chapter 06)
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
  const activeMilestone =
    JOURNEY_MILESTONES.find((m) => m.id === selectedMilestoneId) ||
    JOURNEY_MILESTONES[0];
  const activeArtifact =
    WORKSHOP_ARTIFACTS.find((a) => a.id === selectedArtifactId) ||
    WORKSHOP_ARTIFACTS[0];
  const activeConstellation =
    CONSTELLATION_NODES.find((c) => c.id === selectedConstellationId) ||
    CONSTELLATION_NODES[0];

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
      className="fixed top-16 left-4 sm:left-6 z-20 w-[calc(100vw-2rem)] sm:w-[430px] max-h-[calc(100vh-9.5rem)] flex flex-col pointer-events-none"
    >
      {/* Contextual 3D Hover Tooltip Banner */}
      {hovered3DObject && (
        <div className="mb-2 px-3.5 py-2 rounded-xl bg-[#0B1221] border border-amber-500/50 text-xs font-mono text-amber-300 shadow-lg flex items-center justify-between">
          <span className="truncate">3D Target: {hovered3DObject.label}</span>
          <span className="text-[11px] text-slate-400 ml-2 shrink-0">Click to inspect</span>
        </div>
      )}

      {/* Main Narrative Card */}
      <div className="pointer-events-auto bg-[#0B1221]/95 border border-slate-800/90 rounded-2xl p-5 shadow-2xl overflow-y-auto">
        {/* Card Header & Minimize Toggle */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="text-xs font-mono text-amber-400">
            {chapter.kicker}
          </div>
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

        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
          {chapter.headline}
        </h1>

        {!minimized && (
          <div className="mt-3 space-y-4">
            {/* CHAPTER 01: ARRIVAL */}
            {activeChapterIndex === 0 && (
              <>
                <div className="flex items-center gap-3.5 pt-1">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shrink-0 flex items-center justify-center">
                    {!imgError ? (
                      <img
                        src={OWNER_PROFILE.photoUrl}
                        alt={OWNER_PROFILE.fullName}
                        referrerPolicy="no-referrer"
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-bold text-amber-400 font-display">YS</span>
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-sky-300">
                      Developer · AI/ML Enthusiast · Creative Technologist
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {OWNER_PROFILE.institution}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {chapter.lead}
                </p>

                <div className="text-xs text-slate-400 font-mono">
                  Tagline: &ldquo;{OWNER_PROFILE.tagline}&rdquo;
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => onSelectChapter(3)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Discover Projects</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={onToggleExploreMode}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-sky-300 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>{exploreMode ? 'Guided Journey' : 'Explore My World'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={onOpenQuickView}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Quick Dossier
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs text-slate-400">
                  <span className="truncate">Scroll or use chapter buttons to travel</span>
                  <button
                    type="button"
                    onClick={() => onSelectChapter(1)}
                    className="text-amber-400 hover:underline font-medium cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Next: 02. Origins →
                  </button>
                </div>
              </>
            )}

            {/* CHAPTER 02: ORIGINS — THE JOURNEY */}
            {activeChapterIndex === 1 && (
              <>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {chapter.lead}
                </p>

                {/* Spatial Milestone Selector */}
                <div className="flex flex-wrap gap-1.5 pt-1">
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

                <div className="bg-[#070B14] border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-mono text-sky-400">
                    {activeMilestone.period} · {activeMilestone.institutionOrEvent}
                  </div>
                  <h2 className="text-base font-bold text-white">
                    {activeMilestone.title}
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeMilestone.summary}
                  </p>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
                    <span>{activeMilestone.verifiedDetail}</span>
                  </div>
                  <a
                    href={activeMilestone.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-amber-400 hover:underline font-medium pt-1"
                  >
                    <span>Verify Source ({activeMilestone.sourceLabel})</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </>
            )}

            {/* CHAPTER 03: THE CREATOR'S WORKSHOP */}
            {activeChapterIndex === 2 && (
              <>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {chapter.lead}
                </p>

                {/* 5 Workbench Domain Tabs */}
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

                <div className="bg-[#070B14] border border-slate-800 rounded-xl p-4 space-y-2.5">
                  <div className="text-xs font-mono text-emerald-400">
                    {activeArtifact.stationLabel}
                  </div>
                  <h2 className="text-base font-bold text-white">
                    {activeArtifact.domainTitle}
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeArtifact.summary}
                  </p>
                  <div className="text-xs font-mono text-sky-300 leading-relaxed">
                    {activeArtifact.coreTechnologies.join(' · ')}
                  </div>

                  <div className="pt-2 border-t border-slate-800 space-y-1.5">
                    <div className="text-[11px] font-mono text-slate-400">
                      Shipped Repository Proof:
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

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onOpenAiLab()}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-xs font-medium text-amber-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Open Interactive Workshop Terminal & Gemini Lab</span>
                  </button>
                </div>
              </>
            )}

            {/* CHAPTER 04: PROJECT UNIVERSE */}
            {activeChapterIndex === 3 && (
              <>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Click any 3D project world in the plaza or select a flagship system below to inspect its architecture, team credits, and live deployment.
                </p>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {PROJECTS.map((proj) => (
                    <div
                      key={proj.id}
                      className="bg-[#070B14] border border-slate-800 hover:border-slate-700 rounded-xl p-3.5 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-amber-400 mb-1">
                        <span>{proj.badgeText}</span>
                        <span className="text-slate-400">{proj.year}</span>
                      </div>
                      <h2 className="text-sm font-bold text-white">
                        {proj.title}
                      </h2>
                      <p className="text-xs text-slate-300 line-clamp-2 mt-0.5 mb-2.5">
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

            {/* CHAPTER 05: BEYOND THE CODE — CONSTELLATION OBSERVATORY */}
            {activeChapterIndex === 4 && (
              <>
                <p className="text-sm text-slate-300 leading-relaxed">
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

                <div className="bg-[#070B14] border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-mono text-purple-400">
                    {activeConstellation.category} · {activeConstellation.date}
                  </div>
                  <h2 className="text-base font-bold text-white">
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
                    className="inline-flex items-center gap-1 text-xs text-amber-400 hover:underline font-medium pt-1"
                  >
                    <span>Inspect Primary Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </>
            )}

            {/* CHAPTER 06: THE NEXT FRONTIER — WORKING CONTACT TERMINAL */}
            {activeChapterIndex === 5 && (
              <>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {chapter.lead}
                </p>

                {/* Direct Verified Links */}
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={OWNER_PROFILE.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 flex items-center gap-1.5 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={OWNER_PROFILE.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 flex items-center gap-1.5 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={`mailto:${OWNER_PROFILE.email}`}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-amber-300 flex items-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{OWNER_PROFILE.email}</span>
                  </a>
                </div>

                {/* Working Contact Form with Server Validation & Receipt */}
                {submitReceipt ? (
                  <div className="bg-[#070B14] border border-emerald-500/40 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Transmission Logged ({submitReceipt.id})</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Your message has been validated and recorded on the portfolio server. You can also launch your email client directly below to send an immediate copy to{' '}
                      <span className="text-white font-mono">{OWNER_PROFILE.email}</span>.
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={submitReceipt.directMailto}
                        className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Open in Email App (mailto:)</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setSubmitReceipt(null)}
                        className="px-3 py-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white text-xs border border-slate-800 cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} noValidate className="space-y-2.5 pt-1">
                    {/* Honeypot field hidden from screen/users */}
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
                        className="block text-[11px] font-mono text-slate-400 mb-1"
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
                        className="w-full px-3 py-2 rounded-lg bg-[#070B14] border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                      {contactErrors.name && (
                        <p className="text-[11px] text-rose-400 mt-1">
                          {contactErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-[11px] font-mono text-slate-400 mb-1"
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
                        className="w-full px-3 py-2 rounded-lg bg-[#070B14] border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                      {contactErrors.email && (
                        <p className="text-[11px] text-rose-400 mt-1">
                          {contactErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-[11px] font-mono text-slate-400 mb-1"
                      >
                        Transmission Message *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={3}
                        value={contactForm.message}
                        onChange={(e) =>
                          setContactForm((p) => ({ ...p, message: e.target.value }))
                        }
                        placeholder="Tell Sathya about a role, project collaboration, or technical inquiry..."
                        className="w-full px-3 py-2 rounded-lg bg-[#070B14] border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                      {contactErrors.message && (
                        <p className="text-[11px] text-rose-400 mt-1">
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
                      className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{submitting ? 'Transmitting...' : 'Send Transmission'}</span>
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
