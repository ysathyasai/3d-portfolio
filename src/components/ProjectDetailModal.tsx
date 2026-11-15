import React, { useEffect } from 'react';
import {
  X,
  Github,
  ExternalLink,
  FileText,
  Users,
  Cpu,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import type { ProjectItem } from '../data/portfolio';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onAnalyzeWithAi: (projectTitle: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onAnalyzeWithAi,
}) => {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0B1221] border border-slate-800 rounded-2xl p-6 sm:p-8 text-slate-100 shadow-2xl my-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Metadata & Close Button */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-amber-400 font-mono mb-2">
              <span>{project.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
              <span aria-hidden="true">·</span>
              <span>{project.status}</span>
            </div>
            <h2
              id="project-modal-title"
              className="text-2xl sm:text-3xl font-bold text-white font-display"
            >
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-1">
              {project.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Project Details"
            className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Links Bar */}
        <div className="flex flex-wrap items-center gap-3 py-4 border-b border-slate-800/80">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-slate-100 text-slate-950 hover:bg-white text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
          >
            <Github className="w-4 h-4" />
            <span>View Source on GitHub</span>
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
            >
              <ExternalLink className="w-4 h-4" />
              <span>
                {project.liveUrl.endsWith('.apk') ? 'Download Android APK' : 'Open Live Deployment'}
              </span>
            </a>
          )}

          {project.secondaryLiveUrl && (
            <a
              href={project.secondaryLiveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-slate-900 text-slate-200 hover:bg-slate-800 border border-slate-700 text-xs font-medium flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{project.secondaryLiveLabel || 'Companion Resource'}</span>
            </a>
          )}

          {project.documentationUrl && (
            <a
              href={project.documentationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-slate-900 text-slate-200 hover:bg-slate-800 border border-slate-700 text-xs font-medium flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Project Documentation</span>
            </a>
          )}

          <button
            type="button"
            onClick={() => onAnalyzeWithAi(project.title)}
            className="ml-auto px-4 py-2 rounded-lg bg-slate-900 text-amber-300 border border-amber-500/40 hover:border-amber-400 text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Deep-Thinking Architecture Audit</span>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left 2 Columns: Problem, Overview & Architecture */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-amber-400 mb-2">
                01. The Problem Being Solved
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-amber-400 mb-2">
                02. Solution & System Overview
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.summary}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-sky-400 mb-2 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                <span>03. Technical Architecture & Implementation</span>
              </h3>
              <ul className="space-y-2.5">
                {project.architecture.map((point, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-slate-300 leading-relaxed flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-emerald-400 mb-2">
                04. Engineering Challenges & Learning Outcomes
              </h3>
              <ul className="space-y-2">
                {project.challengesAndLearnings.map((item, idx) => (
                  <li key={idx} className="text-sm text-slate-300 leading-relaxed">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Personal Contribution, Tech Stack & Verified Collaborators */}
          <div className="space-y-6 bg-[#070B14] border border-slate-800/90 rounded-xl p-5">
            <div>
              <h3 className="text-xs font-mono text-amber-400 mb-2">
                Verified Personal Contribution
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed">
                {project.personalContribution}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <h3 className="text-xs font-mono text-sky-400 mb-2">
                Technologies Used
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {project.techStack.join(' · ')}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <h3 className="text-xs font-mono text-slate-400 mb-3 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>Project Team & Attribution ({project.collaborators.length})</span>
              </h3>
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                {project.collaborators.map((collab, idx) => (
                  <div
                    key={idx}
                    className="text-xs border-b border-slate-800/70 pb-2 last:border-none"
                  >
                    <div className="font-semibold text-slate-200 flex items-center justify-between gap-2">
                      {collab.github ? (
                        <a
                          href={collab.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-amber-400 underline decoration-slate-700"
                        >
                          {collab.name}
                        </a>
                      ) : (
                        <span>{collab.name}</span>
                      )}
                      {collab.rollNumber && (
                        <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                          {collab.rollNumber}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 mt-0.5">{collab.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
