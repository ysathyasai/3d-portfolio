import React, { useState } from 'react';
import { X, Github, ExternalLink, Sparkles } from 'lucide-react';
import { PROJECTS, type ProjectItem } from '../data/portfolio';
import { filterProjects } from '../utils/worldLogic';

interface AccessibleProjectGridDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onAnalyzeWithAi: (projectTitle: string) => void;
}

export const AccessibleProjectGridDrawer: React.FC<AccessibleProjectGridDrawerProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onAnalyzeWithAi,
}) => {
  const [category, setCategory] = useState<'all' | 'ai-ml' | 'fullstack' | 'web3' | 'systems'>('all');
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = filterProjects(PROJECTS, category, query);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-grid-drawer-title"
      className="fixed inset-0 z-40 bg-black/80 flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-[#070B14] border-l border-slate-800 h-full overflow-y-auto p-6 sm:p-8 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="text-xs font-mono text-amber-400">
              Accessible Project Directory
            </div>
            <h2
              id="project-grid-drawer-title"
              className="text-2xl font-bold text-white font-display"
            >
              All Verified Projects ({filtered.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Project Directory"
            className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter & Search */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-b border-slate-800">
          <div className="flex items-center gap-1 p-1 bg-[#0B1221] border border-slate-800 rounded-lg">
            {(
              [
                ['all', 'All Systems'],
                ['ai-ml', 'AI & ML'],
                ['fullstack', 'Full-Stack'],
                ['web3', 'Web3'],
                ['systems', 'Systems & CLI'],
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects or tech..."
            aria-label="Search projects"
            className="px-3.5 py-1.5 rounded-lg bg-[#0B1221] border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          {filtered.map((proj) => (
            <article
              key={proj.id}
              className="bg-[#0B1221] border border-slate-800 rounded-xl p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-mono text-amber-400 mb-1.5">
                  <span>{proj.badgeText}</span>
                  <span className="text-slate-400 tabular-nums">{proj.year}</span>
                </div>
                <h3 className="text-lg font-bold text-white font-display">
                  {proj.title}
                </h3>
                <p className="text-xs text-sky-300 mt-0.5 mb-2.5">
                  {proj.subtitle}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {proj.summary}
                </p>
                <p className="text-[11px] font-mono text-slate-400">
                  {proj.techStack.join(' · ')}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => onSelectProject(proj)}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0"
                >
                  Inspect Architecture
                </button>
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 flex items-center gap-1 whitespace-nowrap shrink-0"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-emerald-400 flex items-center gap-1 whitespace-nowrap shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => onAnalyzeWithAi(proj.title)}
                  className="ml-auto p-1.5 rounded-lg bg-slate-900 text-amber-300 border border-amber-500/30 hover:border-amber-400 cursor-pointer"
                  title="Analyze Architecture with Gemini"
                  aria-label={`Analyze ${proj.title} with Gemini`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
