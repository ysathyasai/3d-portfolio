import {
  CHAPTERS,
  PROJECTS,
  TERMINAL_EASTER_EGGS,
  type ProjectItem,
} from '../data/portfolio';

export function clamp01(val: number): number {
  if (Number.isNaN(val)) return 0;
  return Math.max(0, Math.min(1, val));
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0 || 1));
  return t * t * (3 - 2 * t);
}

export function lerpNumber(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function lerpVec3(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  return [
    lerpNumber(a[0], b[0], t),
    lerpNumber(a[1], b[1], t),
    lerpNumber(a[2], b[2], t),
  ];
}

export function getChapterIndexFromProgress(
  progress: number,
  totalChapters = CHAPTERS.length,
): number {
  if (totalChapters <= 1) return 0;
  const clamped = clamp01(progress);
  const rawIdx = Math.round(clamped * (totalChapters - 1));
  return Math.max(0, Math.min(totalChapters - 1, rawIdx));
}

export function getProgressFromChapterIndex(
  index: number,
  totalChapters = CHAPTERS.length,
): number {
  if (totalChapters <= 1) return 0;
  const safeIndex = Math.max(0, Math.min(totalChapters - 1, Math.floor(index)));
  return safeIndex / (totalChapters - 1);
}

export interface InterpolatedWorldState {
  progress: number;
  activeChapterIndex: number;
  segmentIndex: number;
  segmentT: number;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  accentHex: string;
}

export function interpolateCameraState(progress: number): InterpolatedWorldState {
  const p = clamp01(progress);
  const count = CHAPTERS.length;
  const scaled = p * (count - 1);
  const segmentIndex = Math.min(count - 2, Math.max(0, Math.floor(scaled)));
  const rawLocalT = scaled - segmentIndex;
  const segmentT = smoothstep(0, 1, rawLocalT);

  const chA = CHAPTERS[segmentIndex];
  const chB = CHAPTERS[segmentIndex + 1] || chA;

  // Add a subtle arc on Y during transitions between islands for cinematic sweep
  const basePos = lerpVec3(chA.cameraPosition, chB.cameraPosition, segmentT);
  const arcBoost = Math.sin(segmentT * Math.PI) * 1.4;
  const cameraPosition: [number, number, number] = [
    basePos[0],
    basePos[1] + arcBoost,
    basePos[2],
  ];

  const cameraTarget = lerpVec3(chA.cameraTarget, chB.cameraTarget, segmentT);
  const activeChapterIndex = getChapterIndexFromProgress(p, count);

  return {
    progress: p,
    activeChapterIndex,
    segmentIndex,
    segmentT,
    cameraPosition,
    cameraTarget,
    accentHex: CHAPTERS[activeChapterIndex].accentHex,
  };
}

export function filterProjects(
  projects: ProjectItem[],
  category: 'all' | 'ai-ml' | 'fullstack' | 'web3' | 'systems',
  searchQuery = '',
): ProjectItem[] {
  const q = searchQuery.trim().toLowerCase();
  return projects.filter((proj) => {
    const matchesCategory = category === 'all' || proj.category === category;
    if (!matchesCategory) return false;
    if (!q) return true;
    const haystack = [
      proj.title,
      proj.subtitle,
      proj.summary,
      proj.badgeText,
      ...proj.techStack,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}

export interface ContactValidationResult {
  valid: boolean;
  errors: {
    name?: string;
    email?: string;
    message?: string;
  };
}

export function validateContactInput(input: {
  name: string;
  email: string;
  message: string;
}): ContactValidationResult {
  const errors: ContactValidationResult['errors'] = {};
  const cleanName = (input.name || '').trim();
  const cleanEmail = (input.email || '').trim();
  const cleanMsg = (input.message || '').trim();

  if (cleanName.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (cleanMsg.length < 10) {
    errors.message = 'Please write a message of at least 10 characters.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface TerminalCommandOutput {
  command: string;
  response: string;
  action?: 'clear' | 'jump-chapter' | 'open-project';
  targetId?: string;
}

export function executeTerminalCommand(rawInput: string): TerminalCommandOutput {
  const trimmed = rawInput.trim();
  const lower = trimmed.toLowerCase();

  if (!lower) {
    return { command: '', response: 'Type "help" to list available workshop commands.' };
  }

  if (lower === 'clear' || lower === 'cls') {
    return { command: trimmed, response: '', action: 'clear' };
  }

  if (TERMINAL_EASTER_EGGS[lower]) {
    return {
      command: trimmed,
      response: TERMINAL_EASTER_EGGS[lower],
    };
  }

  if (lower.startsWith('open ')) {
    const slug = lower.replace('open ', '').trim();
    const matched = PROJECTS.find(
      (p) =>
        p.id.toLowerCase().includes(slug) ||
        p.title.toLowerCase().includes(slug),
    );
    if (matched) {
      return {
        command: trimmed,
        response: `Opening architectural dossier for ${matched.title}...`,
        action: 'open-project',
        targetId: matched.id,
      };
    }
  }

  return {
    command: trimmed,
    response: `Unknown command "${trimmed}". Type "help" for available commands (whoami, roll, projects, sih, kodex, kernel, stack, brainteaser, contact).`,
  };
}

export interface InitialRouteState {
  skipIntro: boolean;
  quickView: boolean;
  exploreMode: boolean;
  initialChapterIndex: number;
  selectedProjectId: string | null;
}

export function parseInitialUrlState(
  search: string,
  hash: string,
): InitialRouteState {
  const params = new URLSearchParams(search || '');
  const cleanHash = (hash || '').replace(/^#/, '').toLowerCase();

  const autostart =
    params.get('autostart') === '1' ||
    params.get('skipIntro') === '1' ||
    Boolean(cleanHash);
  const quickView =
    params.get('view') === 'quick' ||
    params.get('mode') === 'recruiter' ||
    cleanHash === 'quick-view';
  const exploreMode = params.get('mode') === 'explore';

  let initialChapterIndex = 0;
  const chapterParam = params.get('chapter')?.toLowerCase() || cleanHash;

  if (chapterParam) {
    const foundIdx = CHAPTERS.findIndex(
      (c) =>
        c.id === chapterParam ||
        `chapter-${c.numberLabel}` === chapterParam ||
        `0${c.index + 1}` === chapterParam,
    );
    if (foundIdx >= 0) {
      initialChapterIndex = foundIdx;
    }
  }

  const projectParam = params.get('project');
  const matchedProj = projectParam
    ? PROJECTS.find((p) => p.id === projectParam || p.slug === projectParam)
    : undefined;

  return {
    skipIntro: autostart || quickView || exploreMode || Boolean(matchedProj),
    quickView,
    exploreMode,
    initialChapterIndex,
    selectedProjectId: matchedProj ? matchedProj.id : null,
  };
}
