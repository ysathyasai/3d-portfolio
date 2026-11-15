import React, { useState } from 'react';
import {
  X,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  GraduationCap,
  Award,
  Code2,
  MapPin,
  Printer,
  Sparkles,
} from 'lucide-react';
import {
  OWNER_PROFILE,
  PROJECTS,
  WORKSHOP_ARTIFACTS,
  CONSTELLATION_NODES,
  type ProjectItem,
} from '../data/portfolio';
import { filterProjects } from '../utils/worldLogic';

interface RecruiterQuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onOpenAiLab: (initialPrompt?: string) => void;
  onJumpToContact: () => void;
}

export const RecruiterQuickViewModal: React.FC<RecruiterQuickViewModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onOpenAiLab,
  onJumpToContact,
}) => {
  const [category, setCategory] = useState<'all' | 'ai-ml' | 'fullstack' | 'web3' | 'systems'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [imgFallback, setImgFallback] = useState(false);

  if (!isOpen) return null;

  const filteredProjects = filterProjects(PROJECTS, category, searchQuery);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
      className="fixed inset-0 z-40 bg-[#070B14] text-slate-100 overflow-y-auto pt-16 pb-20"
    >
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Top Executive Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shrink-0 flex items-center justify-center">
              {!imgFallback ? (
                <img
                  src={OWNER_PROFILE.photoUrl}
                  alt={OWNER_PROFILE.fullName}
                  referrerPolicy="no-referrer"
                  onError={() => setImgFallback(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-amber-400 font-display">
                  YS
                </span>
              )}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-amber-400 mb-1">
                <span>Recruiter & Engineering Dossier</span>
                <span aria-hidden="true">·</span>
                <span>Roll No: {OWNER_PROFILE.rollNumber}</span>
              </div>
              <h1
                id="quick-view-title"
                className="text-3xl sm:text-4xl font-bold text-white font-display"
              >
                {OWNER_PROFILE.fullName}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 mt-1">
                {OWNER_PROFILE.roles.join(' · ')}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {OWNER_PROFILE.location}
                </span>
                <span aria-hidden="true">·</span>
                <a
                  href={`mailto:${OWNER_PROFILE.email}`}
                  className="hover:text-amber-400 underline decoration-slate-700"
                >
                  {OWNER_PROFILE.email}
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={OWNER_PROFILE.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={OWNER_PROFILE.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Printer className="w-4 h-4 text-sky-400" />
              <span>Print / Save CV Summary</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onJumpToContact();
              }}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Sathya</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Recruiter Quick View"
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Executive Summary & Education Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-8 border-b border-slate-800">
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-lg font-semibold text-white font-display">
              01. Executive Engineering Summary
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {OWNER_PROFILE.shortBio}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  onOpenAiLab(
                    'Summarize why Yejju Sathya Sai is a strong candidate for an AI/ML & Full-Stack Engineering role based on Khet2Kitchen, Kodex, StudyHub, and CBM.',
                  )
                }
                className="px-3.5 py-2 rounded-lg bg-slate-900 text-amber-300 border border-amber-500/40 hover:border-amber-400 text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate AI Recruiter Brief (Gemini High-Thinking)</span>
              </button>
            </div>
          </div>

          <div className="bg-[#0B1221] border border-slate-800 rounded-xl p-5">
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>Verified Education</span>
            </div>
            <h3 className="text-base font-bold text-white">
              {OWNER_PROFILE.institution}
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              {OWNER_PROFILE.specialization}
            </p>
            <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400 font-mono space-y-1 tabular-nums">
              <div>Roll Number: {OWNER_PROFILE.rollNumber}</div>
              <div>Cohort: {OWNER_PROFILE.cohort}</div>
              <div>Location: East Maredpally, Secunderabad</div>
            </div>
          </div>
        </div>

        {/* Verified Skills by Domain (Evidence-Backed) */}
        <div className="py-8 border-b border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-400" />
                <span>02. Verified Technical Domains & Repository Evidence</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Every technical capability is linked directly to shipped repositories rather than arbitrary percentage bars.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WORKSHOP_ARTIFACTS.map((domain) => (
              <div
                key={domain.id}
                className="bg-[#0B1221] border border-slate-800 rounded-xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-amber-400 mb-1">
                    {domain.stationLabel}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {domain.domainTitle}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {domain.summary}
                  </p>
                  <div className="text-xs font-mono text-sky-300 leading-relaxed mb-4">
                    {domain.coreTechnologies.join(' · ')}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-1.5">
                  <div className="text-[11px] font-mono text-slate-400">
                    Verified Evidence:
                  </div>
                  {domain.verifiedEvidence.map((ev, i) => (
                    <a
                      key={i}
                      href={ev.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-xs text-slate-300 hover:text-amber-400 transition-colors"
                    >
                      <span className="font-semibold">{ev.projectTitle}:</span>{' '}
                      <span className="text-slate-400">{ev.proofPoint}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Projects Matrix with Filter Controls */}
        <div className="py-8 border-b border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-white font-display">
                03. Featured Engineering Projects ({filteredProjects.length})
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Click any project to inspect full system architecture, personal role, and team attribution.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 p-1 bg-[#0B1221] border border-slate-800 rounded-lg">
                {(
                  [
                    ['all', 'All'],
                    ['ai-ml', 'AI & ML'],
                    ['fullstack', 'Full-Stack'],
                    ['web3', 'Web3'],
                    ['systems', 'Systems'],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCategory(key)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      category === key
                        ? 'bg-amber-500 text-slate-950 font-semibold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by stack or keyword..."
                aria-label="Filter projects by technology or keyword"
                className="px-3 py-1.5 rounded-lg bg-[#0B1221] border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-[#0B1221] border border-slate-800 hover:border-slate-700 rounded-xl p-6 flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-amber-400 mb-2">
                    <span>{proj.badgeText}</span>
                    <span className="text-slate-400 tabular-nums">{proj.year}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-display">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-sky-300 mt-0.5 mb-3">
                    {proj.subtitle}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {proj.summary}
                  </p>
                  <div className="text-xs text-slate-400 mb-4">
                    <span className="font-semibold text-slate-200">Role: </span>
                    {proj.personalContribution}
                  </div>
                  <p className="text-xs font-mono text-slate-400">
                    {proj.techStack.join(' · ')}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-5 pt-4 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => onSelectProject(proj)}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Inspect Architecture
                  </button>
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-emerald-400 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live / Release</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hackathons, Certifications & Milestones */}
        <div className="py-8">
          <h2 className="text-xl font-bold text-white font-display flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-amber-400" />
            <span>04. Hackathons, Community Builds & Milestones</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CONSTELLATION_NODES.map((node) => (
              <div
                key={node.id}
                className="bg-[#0B1221] border border-slate-800 rounded-xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-amber-400 mb-1">
                    {node.category} · {node.date}
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">
                    {node.title}
                  </h3>
                  <p className="text-xs text-sky-300 mb-3">{node.event}</p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {node.story}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800/80 text-xs text-emerald-400 font-mono">
                  Outcome: {node.verifiedOutcome}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
