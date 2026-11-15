import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Terminal,
  Send,
  Cpu,
  Zap,
  Loader2,
} from 'lucide-react';
import { executeTerminalCommand } from '../utils/worldLogic';

interface AiArchitectureLabModalProps {
  isOpen: boolean;
  initialPrompt?: string;
  onClose: () => void;
  onOpenProjectById: (projectId: string) => void;
  onSelectChapterById?: (chapterId: string) => void;
}

export const AiArchitectureLabModal: React.FC<AiArchitectureLabModalProps> = ({
  isOpen,
  initialPrompt,
  onClose,
  onOpenProjectById,
  onSelectChapterById,
}) => {
  const [activeTab, setActiveTab] = useState<'gemini' | 'terminal'>('gemini');
  const [prompt, setPrompt] = useState(
    initialPrompt ||
      'Analyze how Khet2Kitchen (SIH 2026), Kodex (HackwithHyderabad 3.0), and YieldGrid (VNR VJIET) demonstrate my end-to-end AI, Java, and Full-Stack systems engineering.',
  );
  const [mode, setMode] = useState<'deep' | 'fast'>('deep');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    text: string;
    modelUsed: string;
    thinkingLevel: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Interactive Workshop CLI state
  const [termInput, setTermInput] = useState('');
  const [termHistory, setTermHistory] = useState<
    { cmd: string; out: string }[]
  >([
    {
      cmd: 'whoami',
      out: 'I am Yejju Sathya Sai (@ysathyasai) — AI/ML Engineer & Full-Stack Architect pursuing my B.Tech in CSE (AI & ML) at VNR VJIET, Hyderabad after completing my Diploma in AI & ML at GIOE Secunderabad.',
    },
    {
      cmd: 'help',
      out: 'Available commands: whoami, education, projects, sih, kodex, yieldgrid, kernel, stack, brainteaser, contact, open <project>, goto <chapter>, clear',
    },
  ]);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      setPrompt(initialPrompt);
      setActiveTab('gemini');
      runAnalysis(initialPrompt, 'deep');
    }
  }, [initialPrompt, isOpen]);

  if (!isOpen) return null;

  async function runAnalysis(queryText = prompt, selectedMode = mode) {
    const trimmed = queryText.trim();
    if (!trimmed) {
      setError('Please enter an architectural question or prompt.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const response = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: trimmed, mode: selectedMode }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Failed to analyze prompt.');
      } else {
        setResult(data);
      }
    } catch {
      setError('Network error communicating with my server-side reasoning endpoint.');
    } finally {
      setLoading(false);
    }
  }

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termInput.trim()) return;
    const out = executeTerminalCommand(termInput);
    if (out.action === 'clear') {
      setTermHistory([]);
    } else {
      setTermHistory((prev) => [...prev, { cmd: out.command, out: out.response }]);
      if (out.action === 'open-project' && out.targetId) {
        onOpenProjectById(out.targetId);
      } else if (out.action === 'jump-chapter' && out.targetId && onSelectChapterById) {
        onSelectChapterById(out.targetId);
        onClose();
      }
    }
    setTermInput('');
  };

  const presetPrompts = [
    'How does Kodex prevent AI pull-request bots from repeating rejected suggestions?',
    'Explain Khet2Kitchen’s SIH 2026 architecture and my role as Full-Stack Architect.',
    'How does YieldGrid combine Java 17, PBKDF2-HMAC-SHA256, MySQL 8.0, and 8 StarUML diagrams?',
    'Compare the ML fraud ensemble in Composite Behavioral Modeling with StudyHub’s AI stack.',
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-lab-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#0B1221] border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl max-h-[88vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="text-xs font-mono text-amber-400">
              My Interactive Engineering Workbench
            </div>
            <h2 id="ai-lab-title" className="text-xl font-bold text-white font-display">
              AI Architecture Lab & Workshop CLI
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center p-1 bg-[#070B14] border border-slate-800 rounded-lg">
              <button
                type="button"
                onClick={() => setActiveTab('gemini')}
                className={`px-3 py-1 text-xs font-medium rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'gemini'
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gemini Reasoning</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('terminal')}
                className={`px-3 py-1 text-xs font-medium rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'terminal'
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Workshop CLI</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close AI Architecture Lab"
              className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {activeTab === 'gemini' ? (
          <div className="flex-1 overflow-y-auto pt-4 space-y-4">
            {/* Thinking Mode Selector */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#070B14] border border-slate-800 rounded-xl p-3">
              <div className="text-xs text-slate-300">
                Select Reasoning Engine Depth:
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMode('deep')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 cursor-pointer border ${
                    mode === 'deep'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>High Thinking (ThinkingLevel.HIGH)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode('fast')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 cursor-pointer border ${
                    mode === 'fast'
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/50'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Fast Triage (Flash-Lite)</span>
                </button>
              </div>
            </div>

            {/* Preset Architecture Prompts */}
            <div className="flex flex-wrap gap-2">
              {presetPrompts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPrompt(p);
                    runAnalysis(p, mode);
                  }}
                  className="text-left px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Query Input */}
            <div className="space-y-2">
              <label
                htmlFor="ai-lab-prompt-input"
                className="block text-xs font-mono text-slate-400"
              >
                Ask about my system architectures, codebase choices, or hackathon builds:
              </label>
              <div className="flex gap-2">
                <input
                  id="ai-lab-prompt-input"
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') runAnalysis(prompt, mode);
                  }}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#070B14] border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-500"
                  placeholder="Ask about Khet2Kitchen, Kodex, YieldGrid, StudyHub, CBM, or MicroKernel-OS..."
                />
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => runAnalysis(prompt, mode)}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>Analyze</span>
                </button>
              </div>
              {error && <p className="text-xs text-rose-400">{error}</p>}
            </div>

            {/* Output Panel */}
            {result && (
              <div className="bg-[#070B14] border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400 pb-2 border-b border-slate-800/80">
                  <span>Model: {result.modelUsed}</span>
                  <span>Thinking Level: {result.thinkingLevel}</span>
                </div>
                <div className="text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                  {result.text}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Workshop CLI & Easter Egg Terminal */
          <div className="flex-1 flex flex-col pt-4 overflow-hidden">
            <div className="flex-1 bg-[#050811] border border-slate-800 rounded-xl p-4 font-mono text-xs overflow-y-auto space-y-3">
              {termHistory.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-amber-400">
                    sathya@vnrvjiet-workshop:~$ <span className="text-white">{item.cmd}</span>
                  </div>
                  <div className="text-slate-300 leading-relaxed pl-3">
                    {item.out}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleTerminalSubmit} className="mt-3 flex gap-2">
              <input
                type="text"
                value={termInput}
                onChange={(e) => setTermInput(e.target.value)}
                aria-label="Workshop Terminal Command Input"
                placeholder="Type a command (try: education, sih, kodex, yieldgrid, kernel, open yieldgrid, goto playground)..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#070B14] border border-slate-800 font-mono text-xs text-white focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs cursor-pointer shrink-0"
              >
                Execute
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
