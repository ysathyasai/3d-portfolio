export interface Collaborator {
  name: string;
  role: string;
  rollNumber?: string;
  github?: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'ai-ml' | 'fullstack' | 'web3' | 'systems';
  categoryLabel: string;
  year: string;
  status: string;
  featured: boolean;
  badgeText: string;
  problem: string;
  summary: string;
  architecture: string[];
  techStack: string[];
  personalContribution: string;
  collaborators: Collaborator[];
  challengesAndLearnings: string[];
  githubUrl: string;
  liveUrl?: string;
  secondaryLiveUrl?: string;
  secondaryLiveLabel?: string;
  documentationUrl?: string;
  worldLandmark: {
    name: string;
    description: string;
    position: [number, number, number];
    accentColor: string;
    dioramaType: 'agritech' | 'kodex' | 'campus' | 'cyberlab' | 'web3' | 'media';
  };
}

export interface ChapterItem {
  id: string;
  index: number;
  numberLabel: string;
  title: string;
  kicker: string;
  headline: string;
  lead: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  islandCenter: [number, number, number];
  accentHex: string;
  ambientHex: string;
}

export interface JourneyMilestone {
  id: string;
  period: string;
  title: string;
  institutionOrEvent: string;
  category: 'education' | 'systems' | 'ai-ml' | 'hackathon';
  summary: string;
  verifiedDetail: string;
  sourceLabel: string;
  sourceUrl: string;
  coordinates: [number, number, number];
}

export interface WorkshopArtifact {
  id: string;
  name: string;
  stationLabel: string;
  domainTitle: string;
  summary: string;
  coreTechnologies: string[];
  verifiedEvidence: {
    projectTitle: string;
    proofPoint: string;
    repoUrl: string;
  }[];
  positionOffset: [number, number, number];
  accentColor: string;
}

export interface ConstellationNode {
  id: string;
  title: string;
  event: string;
  date: string;
  category: 'Hackathon Finalist' | 'AI Engineering' | 'Web3 Build' | 'Open Source' | 'Certification & Community';
  projectLinked: string;
  story: string;
  verifiedOutcome: string;
  sourceUrl: string;
  starPosition: [number, number, number];
  color: string;
}

export const OWNER_PROFILE = {
  fullName: 'Yejju Sathya Sai',
  displayName: 'Sathya Sai',
  rollNumber: '23054-AI-051',
  tagline: 'Building ideas into reality, one experiment at a time.',
  introLine: "Hey, I'm Sathya Sai. Welcome to the world behind my code.",
  roles: ['AI & ML Developer', 'Full-Stack Architect', 'Creative Technologist'],
  location: 'Hyderabad / Secunderabad, Telangana, India',
  institution: 'Government Institute of Electronics (GIOE), East Maredpally, Secunderabad',
  specialization: 'Department of Artificial Intelligence & Machine Learning (AI & ML)',
  cohort: '2023 – 2026 Academic Cohort',
  email: 'ysathyasai.dev@gmail.com',
  photoUrl: '/assets/portfolio/sathya-photo.webp',
  remotePhotoFallback: 'https://res.cloudinary.com/dlkksfa9e/image/upload/f_webp/v1741387661/yfhka4arlfhpkzatfb2p.webp',
  socialLinks: {
    github: 'https://github.com/ysathyasai',
    linkedin: 'https://www.linkedin.com/in/ysathyasai',
    twitter: 'https://x.com/ysathyasai',
    medium: 'https://medium.com/@ysathyasai',
    existingPortfolio: 'https://ysathyasai.netlify.app/',
    existingPortfolioRepo: 'https://github.com/ysathyasai/My-Portfolio',
    buyMeACoffee: 'https://buymeacoffee.com/ysathyasai',
    patreon: 'https://patreon.com/YejjuSathyaSai',
  },
  shortBio:
    'AI & ML student and full-stack builder at the Government Institute of Electronics, Secunderabad (23054-AI-051). From architecting direct farm-to-kitchen supply chains with Indic voice AI (SIH 2026 Finalist) and biomimetic memory code review agents (Kodex) to 32-bit x86 microkernels and Cardano dApps, I turn experimental ideas into working software.',
};

export const CHAPTERS: ChapterItem[] = [
  {
    id: 'arrival',
    index: 0,
    numberLabel: '01',
    title: 'Arrival: The World of Sathya',
    kicker: 'Chapter 01 · Hyderabad, India · 23054-AI-051',
    headline: 'Yejju Sathya Sai',
    lead: "Hey, I'm Sathya Sai. Welcome to the world behind my code — an interconnected 3D workshop where AI reasoning, full-stack engineering, and systems experiments come alive.",
    cameraPosition: [0, 5.2, 13.5],
    cameraTarget: [0, 1.4, 0],
    islandCenter: [0, 0, 0],
    accentHex: '#F59E0B',
    ambientHex: '#0EA5E9',
  },
  {
    id: 'origins',
    index: 1,
    numberLabel: '02',
    title: 'Origins: The Journey',
    kicker: 'Chapter 02 · Academic & Engineering Progression',
    headline: 'From Electronics & C Kernels to Applied AI',
    lead: 'Rooted in the Department of Artificial Intelligence & Machine Learning at the Government Institute of Electronics, Secunderabad, every milestone bridges low-level computing with practical human-centric software.',
    cameraPosition: [-22, 6.0, -14],
    cameraTarget: [-28, 1.5, -26],
    islandCenter: [-28, 0, -26],
    accentHex: '#38BDF8',
    ambientHex: '#F59E0B',
  },
  {
    id: 'workshop',
    index: 2,
    numberLabel: '03',
    title: "The Creator's Workshop",
    kicker: 'Chapter 03 · Evidence-Backed Technical Domains',
    headline: 'Inside the Engineering Workbench',
    lead: 'Inspect the five core stations of the workshop. Every skill is backed by shipped repositories, live deployments, and documented system architectures — never arbitrary percentage bars.',
    cameraPosition: [22, 6.2, -20],
    cameraTarget: [28, 1.6, -32],
    islandCenter: [28, 0, -32],
    accentHex: '#10B981',
    ambientHex: '#38BDF8',
  },
  {
    id: 'projects',
    index: 3,
    numberLabel: '04',
    title: 'Project Universe',
    kicker: 'Chapter 04 · Interactive Architectural Showcase',
    headline: 'Miniature Worlds of Real Software',
    lead: 'Explore verified builds spanning Smart India Hackathon 2026 agritech disintermediation, biomimetic code review agents, student productivity ecosystems, fraud analytics, and Web3 protocols.',
    cameraPosition: [0, 8.5, -48],
    cameraTarget: [0, 1.8, -64],
    islandCenter: [0, 0, -64],
    accentHex: '#F59E0B',
    ambientHex: '#6366F1',
  },
  {
    id: 'beyond',
    index: 4,
    numberLabel: '05',
    title: 'Beyond the Code',
    kicker: 'Chapter 05 · Hackathons, Community & Milestones',
    headline: 'The Achievement Observatory',
    lead: 'Engineering thrives in high-velocity collaborative arenas — from Smart India Hackathon 2026 and HackwithHyderabad 3.0 to Cardano IndiaCodex, Monad Blitz, and Hacktoberfest Hack Day.',
    cameraPosition: [-24, 7.2, -78],
    cameraTarget: [-28, 2.2, -92],
    islandCenter: [-28, 0, -92],
    accentHex: '#A855F7',
    ambientHex: '#06B6D4',
  },
  {
    id: 'frontier',
    index: 5,
    numberLabel: '06',
    title: 'The Next Frontier',
    kicker: 'Chapter 06 · Open Transmission Portal',
    headline: 'Let’s Build What Comes Next',
    lead: 'Whether you are recruiting for AI/ML and Full-Stack roles, organizing a hackathon team, or collaborating on open-source developer tools, open a direct transmission below.',
    cameraPosition: [0, 7.0, -106],
    cameraTarget: [0, 2.2, -120],
    islandCenter: [0, 0, -120],
    accentHex: '#F59E0B',
    ambientHex: '#38BDF8',
  },
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: 'gioe-enrollment',
    period: '2023 – 2026',
    title: 'Specialization in Artificial Intelligence & Machine Learning',
    institutionOrEvent: 'Government Institute of Electronics (GIOE), East Maredpally, Secunderabad',
    category: 'education',
    summary:
      'Enrolled in the Department of AI & ML (Roll No: 23054-AI-051), building a rigorous foundation in Python, data structures, relational databases, computer networks, and machine learning algorithms.',
    verifiedDetail: 'Roll Number 23054-AI-051 verified via GIOE capstone documentation in the StudyHub repository.',
    sourceLabel: 'StudyHub & My-Portfolio Repositories',
    sourceUrl: 'https://github.com/ysathyasai/StudyHub',
    coordinates: [-32, 1.2, -22],
  },
  {
    id: 'systems-linux-c',
    period: '2024 – 2025',
    title: 'Low-Level Systems, Linux CLI & Microkernel Exploration',
    institutionOrEvent: 'Open-Source Repositories (MicroKernel-OS, Termux, motivational-quotes-script)',
    category: 'systems',
    summary:
      'Explored operating system internals with a 32-bit x86 C/Assembly microkernel (PIT round-robin scheduler, kmalloc/kfree, IPC) and authored cross-platform CLI automation tools for Linux, macOS, and Android Termux.',
    verifiedDetail: 'Documented in public repositories MicroKernel-OS, Termux guide, and Apache-2.0 CLI scripts.',
    sourceLabel: 'GitHub: MicroKernel-OS & Termux',
    sourceUrl: 'https://github.com/ysathyasai/MicroKernel-OS',
    coordinates: [-29, 1.8, -26],
  },
  {
    id: 'cbm-studyhub-capstones',
    period: '2025 – 2026',
    title: '6th Semester ML Fraud Detection & StudyHub Capstone Ecosystem',
    institutionOrEvent: 'Government Institute of Electronics, Secunderabad',
    category: 'ai-ml',
    summary:
      'Engineered Composite Behavioral Modeling (Django + scikit-learn ensemble fraud detection) for the 6th semester project and collaborated on StudyHub, a 10-member Flutter + Firebase + Gemini student productivity suite.',
    verifiedDetail: 'Live Render deployment for CBM and native Android APK release for StudyHub.',
    sourceLabel: 'GitHub: Composite_Behavioral_Modeling & StudyHub',
    sourceUrl: 'https://github.com/ysathyasai/Composite_Behavioral_Modeling',
    coordinates: [-25, 2.2, -29],
  },
  {
    id: 'sih-kodex-hackathons',
    period: '2026',
    title: 'SIH 2026 Finalist (Khet2Kitchen), HackwithHyderabad 3.0 (Kodex) & Web3 Sprints',
    institutionOrEvent: 'Smart India Hackathon 2026 · HackwithHyderabad 3.0 · Cardano IndiaCodex · Monad Blitz',
    category: 'hackathon',
    summary:
      'Served as Full-Stack Architect on Khet2Kitchen (SIH26033 Finalist, 124/124 passing test suites), built Kodex with biomimetic cognitive memory and Groq gpt-oss-120b, and shipped ContribReady and Cardano Mesh SDK dApps.',
    verifiedDetail: 'Verified via live Render deployments and comprehensive architectural documentation.',
    sourceLabel: 'GitHub: Khet2Kitchen & Kodex',
    sourceUrl: 'https://github.com/ysathyasai/Khet2Kitchen',
    coordinates: [-22, 2.6, -32],
  },
];

export const WORKSHOP_ARTIFACTS: WorkshopArtifact[] = [
  {
    id: 'station-ai-ml',
    name: 'Neural & Agentic Core',
    stationLabel: 'Station 01 · AI/ML & Retrieval Systems',
    domainTitle: 'Applied AI, LLM Agents & Machine Learning',
    summary:
      'Designing multi-step agentic workflows, biomimetic cognitive memory pipelines, RAG knowledge assistants with vector citations, and ensemble classification models.',
    coreTechnologies: [
      'Python 3.11+',
      'Google Gemini API',
      'Groq (gpt-oss-120b / Llama 3.3)',
      'Vectorize Hindsight Cloud',
      'ChromaDB & Sentence-Transformers',
      'LangChain',
      'scikit-learn (RandomForest / GradientBoosting)',
      'Sarvam AI Indic STT/TTS',
    ],
    verifiedEvidence: [
      {
        projectTitle: 'Kodex (HackwithHyderabad 3.0)',
        proofPoint: 'Biomimetic cognitive memory (recall, reflect, retain) + Semantic Dependency Cohort Graphing for PR reviews.',
        repoUrl: 'https://github.com/ysathyasai/Kodex',
      },
      {
        projectTitle: 'RAG-Bot',
        proofPoint: 'Full-stack FastAPI + ChromaDB + all-MiniLM-L6-v2 semantic search with page-level document citations.',
        repoUrl: 'https://github.com/ysathyasai/RAG-Bot',
      },
      {
        projectTitle: 'Composite Behavioral Modeling',
        proofPoint: 'Ensemble fraud detection using RandomForestClassifier, GradientBoostingClassifier, and LogisticRegression.',
        repoUrl: 'https://github.com/ysathyasai/Composite_Behavioral_Modeling',
      },
    ],
    positionOffset: [-5.5, 1.2, 2.5],
    accentColor: '#F59E0B',
  },
  {
    id: 'station-backend',
    name: 'Monolith & API Server Rack',
    stationLabel: 'Station 02 · Backend & Cloud Architecture',
    domainTitle: 'Python Backends, APIs & Production DevOps',
    summary:
      'Architecting resilient Django and FastAPI backends, dual-channel B2B/D2C engines, REST APIs, automated test suites, and containerized cloud deployments.',
    coreTechnologies: [
      'Django 5.1 / 3.2',
      'FastAPI',
      'Flask 3.x',
      'Node.js & Express',
      'SQLite / PostgreSQL',
      'Firebase & Supabase',
      'Docker Compose',
      'Gunicorn & WhiteNoise',
    ],
    verifiedEvidence: [
      {
        projectTitle: 'Khet2Kitchen (SIH 2026 Finalist)',
        proofPoint: 'Full-Stack Architect for Django 5.1 B2B/D2C agritech platform with 124/124 passing automated tests.',
        repoUrl: 'https://github.com/ysathyasai/Khet2Kitchen',
      },
      {
        projectTitle: 'Flask Video Downloader',
        proofPoint: 'Local-first media processing pipeline with single-job queue protection, yt-dlp, and FFmpeg.',
        repoUrl: 'https://github.com/ysathyasai/Flask-Video-Downloader',
      },
    ],
    positionOffset: [-2.0, 1.5, -1.8],
    accentColor: '#38BDF8',
  },
  {
    id: 'station-frontend',
    name: 'Holographic Interface Rig',
    stationLabel: 'Station 03 · Modern Web & Cross-Platform UI',
    domainTitle: 'React, TypeScript, Next.js & Flutter Interfaces',
    summary:
      'Crafting responsive, accessible web and mobile interfaces that translate complex telemetry, repository trees, and academic workflows into intuitive experiences.',
    coreTechnologies: [
      'TypeScript 5+',
      'React 19',
      'Next.js 15',
      'Tailwind CSS',
      'Three.js / WebGL',
      'Flutter 3.0+ & Dart',
      'Vite',
      'Mermaid.js',
    ],
    verifiedEvidence: [
      {
        projectTitle: 'ContribReady',
        proofPoint: 'React 19 + Vite + Express platform converting GitHub issue URLs into interactive contributor roadmaps and readiness quizzes.',
        repoUrl: 'https://github.com/ysathyasai/ContribReady',
      },
      {
        projectTitle: 'StudyHub',
        proofPoint: 'Cross-platform Flutter + Firebase mobile companion with Notes, Timetable, CGPA analytics, and Pomodoro timer.',
        repoUrl: 'https://github.com/ysathyasai/StudyHub',
      },
    ],
    positionOffset: [2.2, 1.4, -1.8],
    accentColor: '#10B981',
  },
  {
    id: 'station-web3',
    name: 'Decentralized Ledger Node',
    stationLabel: 'Station 04 · Web3, Cardano & Verifiable Impact',
    domainTitle: 'Blockchain Transparency & Decentralized Compute',
    summary:
      'Building on-chain donation verification, NFT proof certificates, and decentralized AI service exchange concepts across Cardano and Monad.',
    coreTechnologies: [
      'Cardano Blockchain',
      'Mesh SDK (1.9.0)',
      'Next.js 15',
      'On-Chain Escrow & NFT Proofs',
      'Monad Ecosystem',
      'Wallet Integration (Yoroi / Nami / Eternl)',
    ],
    verifiedEvidence: [
      {
        projectTitle: 'Cutthroat & AdaCompute',
        proofPoint: 'Cardano donation transparency platform built with Next.js 15 & Mesh SDK + Cardano IndiaCodex decentralized AI compute exchange.',
        repoUrl: 'https://github.com/ysathyasai/Cutthroat',
      },
      {
        projectTitle: 'ImpactVault (Monad Blitz)',
        proofPoint: 'High-throughput donation-to-impact verification explored at Monad Blitz Hyderabad.',
        repoUrl: 'https://github.com/ysathyasai',
      },
    ],
    positionOffset: [5.5, 1.2, 2.5],
    accentColor: '#A855F7',
  },
  {
    id: 'station-systems',
    name: 'Kernel & Terminal Deck',
    stationLabel: 'Station 05 · Systems Programming & CLI Tooling',
    domainTitle: 'C/Assembly OS Kernels, Linux & Developer Ergonomics',
    summary:
      'Understanding computers from the metal up — BIOS bootloaders, protected-mode memory allocators, shell scripting, and Android Termux workflows.',
    coreTechnologies: [
      'C & x86 Assembly',
      'Linux / Ubuntu / Bash',
      'Android Termux',
      'Git & GitHub Actions',
      'Streamlit & Pillow',
    ],
    verifiedEvidence: [
      {
        projectTitle: 'MicroKernel-OS',
        proofPoint: '32-bit x86 microkernel with PIT preemptive round-robin scheduling, kmalloc/kfree physical memory management, and IPC.',
        repoUrl: 'https://github.com/ysathyasai/MicroKernel-OS',
      },
      {
        projectTitle: 'Termux & CLI Automation Suite',
        proofPoint: 'Comprehensive Android terminal guides and cross-platform shell session enhancements.',
        repoUrl: 'https://github.com/ysathyasai/Termux',
      },
    ],
    positionOffset: [0, 1.1, 4.2],
    accentColor: '#EC4899',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'khet2kitchen',
    slug: 'khet2kitchen',
    title: 'Khet2Kitchen (K2K)',
    subtitle: 'AI-Powered Direct Farm-to-Fork Supply Chain with Indic Voice Intelligence',
    category: 'ai-ml',
    categoryLabel: 'Agritech AI & Full-Stack · SIH 2026 Finalist',
    year: '2026',
    status: 'Live Platform · 124/124 Tests Passing',
    featured: true,
    badgeText: 'SIH 2026 Finalist (SIH26033)',
    problem:
      'Smallholder farmers in India lose up to 68% of consumer value to a 5-tier intermediary chain while 20–25% of fresh produce spoils in uncoordinated mandi logistics and arbitrary weighbridge deductions.',
    summary:
      'A phygital agricultural disintermediation platform developed for Smart India Hackathon 2026 (Problem Statement SIH26033, Ministry of Consumer Affairs / DoCA) that links rural farming collectives directly to bulk B2B buyers and residential RWAs via rural PACS micro-hubs.',
    architecture: [
      'Dual-Channel Marketplace Engine: Separate B2B wholesale bulk bidding and D2C community RWA group-buying pipelines built on Django 5.1+.',
      'Vernacular Indic Voice Intelligence: Integrates Sarvam AI Speech-to-Text (STT) and Text-to-Speech (TTS) so farmers can register harvest lots in regional Indian languages.',
      'Gemini Flash Reasoning & Grading: Uses Google Gemini reasoning models to synthesize fair price discovery, demand forecasting, and objective quality grading.',
      'Production Quality Assurance: Backed by 124/124 passing automated unit and integration test suites and deployed live on Render.',
    ],
    techStack: [
      'Python 3.11+',
      'Django 5.1+',
      'Google Gemini Flash',
      'Sarvam AI (Indic STT/TTS)',
      'SQLite / PostgreSQL',
      'Render Cloud',
      'ONDC-Ready Schema',
    ],
    personalContribution:
      'Served as Full-Stack Architect & Lead Software Engineer — designed the Django core architecture, dual-channel B2B/D2C transactional engine, relational database schema, REST APIs, and Render deployment pipeline.',
    collaborators: [
      { name: 'Yejju Sathya Sai', role: 'Full-Stack Architect • Lead Software Engineer', github: 'https://github.com/ysathyasai' },
      { name: 'Swayam', role: 'Team Lead • Product Strategy & Business Model Architecture' },
      { name: 'Shaik Mohammed Imaadh', role: 'AI/ML Engineer • Speech & Vision Systems' },
      { name: 'Dupalica', role: 'Frontend Architect • UI/UX & Design Systems' },
      { name: 'Afsha Siddiha', role: 'Supply Chain Specialist • Logistics & Policy' },
      { name: 'Karuneshwari', role: 'Quality Assurance & Testing Engineer (124 Suites)' },
    ],
    challengesAndLearnings: [
      'Designed zero-friction voice-first workflows for low-literacy rural users while maintaining strict transactional integrity across B2B and D2C inventory ledgers.',
      'Coordinated a 6-person multidisciplinary hackathon team across agritech policy, Indic voice AI, and full-stack engineering under SIH 2026 evaluation standards.',
    ],
    githubUrl: 'https://github.com/ysathyasai/Khet2Kitchen',
    liveUrl: 'https://khet2kitchen.onrender.com/',
    secondaryLiveUrl: 'https://k2k-intelligence-engine.onrender.com/',
    secondaryLiveLabel: 'K2K Intelligence Engine',
    worldLandmark: {
      name: 'K2K Smart Agritech Hub',
      description: 'Miniature solar-lit PACS micro-hub with voice-wave towers and farm-to-fork logistics rings.',
      position: [-10, 0, -58],
      accentColor: '#10B981',
      dioramaType: 'agritech',
    },
  },
  {
    id: 'kodex',
    slug: 'kodex',
    title: 'Kodex',
    subtitle: 'Biomimetic Cognitive Memory Code Review Agent',
    category: 'ai-ml',
    categoryLabel: 'Agentic AI & Developer Tools · HackwithHyderabad 3.0',
    year: '2026',
    status: 'Live Cloud Deployment · Dockerized',
    featured: true,
    badgeText: 'HackwithHyderabad 3.0',
    problem:
      'Conventional AI pull-request bots operate in a stateless vacuum: when a senior engineer rejects a suggestion, the bot forgets immediately and repeats the exact same noisy comment on the next PR.',
    summary:
      'Built for HackwithHyderabad 3.0, Kodex transforms code review into an institutional peer reviewer with long-term memory. It combines Vectorize Hindsight Cloud biomimetic memory with Groq ultra-low-latency openai/gpt-oss-120b inference.',
    architecture: [
      'Biomimetic Memory Triad: Exercises all three Vectorize Hindsight Cloud operations — recall() for historical team rules, reflect() for architectural synthesis, and retain() to learn from developer replies.',
      'Semantic Dependency Cohort Graphing (diff_parser.py): Parses raw git diffs and topologically orders files into Schema ➔ Logic ➔ API ➔ Tests ➔ Config cohorts to prevent LLM attention dilution.',
      'Resilience & Visual Telemetry: Uses Tenacity exponential backoff, Mermaid.js sequence diagram sanitization, and a 3-panel dark-mode Tailwind CSS inspection dashboard.',
    ],
    techStack: [
      'Python',
      'Vectorize Hindsight Cloud',
      'Groq API (openai/gpt-oss-120b)',
      'Tailwind CSS',
      'Mermaid.js',
      'Tenacity',
      'Docker Compose',
      'Pytest (5/5 Live Cloud Suite)',
    ],
    personalContribution:
      'Engineered the end-to-end cognitive review pipeline, semantic diff cohort grapher, Hindsight memory integration, Mermaid diagram sanitizer, and live 3-panel interactive web dashboard.',
    collaborators: [
      { name: 'Yejju Sathya Sai', role: 'Lead Systems & AI Engineer', github: 'https://github.com/ysathyasai' },
    ],
    challengesAndLearnings: [
      'Eliminated LLM attention drift on large multi-file pull requests by ordering file diffs along architectural dependency boundaries prior to inference.',
      'Built deterministic Mermaid.js syntax sanitization so dynamically generated architecture sequence diagrams never fail to render in the browser.',
    ],
    githubUrl: 'https://github.com/ysathyasai/Kodex',
    liveUrl: 'https://kodex-code-review-agent.onrender.com',
    worldLandmark: {
      name: 'Kodex Cognitive Memory Spire',
      description: 'Tri-core neural tower pulsing with recall, reflect, and retain memory rings.',
      position: [-4, 0, -64],
      accentColor: '#38BDF8',
      dioramaType: 'kodex',
    },
  },
  {
    id: 'studyhub',
    slug: 'studyhub',
    title: 'StudyHub',
    subtitle: 'Collaborative Student Productivity & AI Learning Ecosystem',
    category: 'fullstack',
    categoryLabel: 'Mobile & AI EdTech · GIOE Capstone',
    year: '2026',
    status: 'Android APK Released · Phase 2 Active',
    featured: true,
    badgeText: 'GIOE AI/ML Capstone',
    problem:
      'Students juggle fragmented apps for lecture notes, exam timetables, GPA calculation, habit tracking, and AI study assistance, leading to lost context and cognitive overload.',
    summary:
      'A privacy-centric, mobile-first academic companion built at the Government Institute of Electronics, Secunderabad that unifies structured notes, smart timetables, CGPA analytics, habit tracking, formula reference books, Pomodoro timers, and Google Gemini learning tools.',
    architecture: [
      'Cross-Platform Mobile Client: Built with Flutter 3.0+ and Dart 2.19+ for responsive, offline-capable mobile performance.',
      'Cloud Sync & Identity: Powered by Firebase Authentication and Firestore for secure, user-controlled academic record persistence.',
      'AI Study Companion: Integrates Google Gemini API for personalized quiz generation, smart flashcards, and study roadmap synthesis.',
    ],
    techStack: [
      'Flutter 3.0+',
      'Dart 2.19+',
      'Firebase Auth & Firestore',
      'Google Gemini API',
      'Android APK',
    ],
    personalContribution:
      'Project Developer & Documentation Lead (Roll No: 23054-AI-051) — contributed to application module implementation, workflow integration, and comprehensive academic capstone documentation.',
    collaborators: [
      { name: 'Yejju Sathya Sai', rollNumber: '23054-AI-051', role: 'Project Developer & Documentation', github: 'https://github.com/ysathyasai' },
      { name: 'Nanduri Eknadha Adithya Srivatsa', rollNumber: '23054-AI-033', role: 'Project Lead & Full-Stack Developer', github: 'https://github.com/adithyasrivatsa' },
      { name: 'Mantol Saketh', rollNumber: '23054-AI-027', role: 'Core Developer', github: 'https://github.com/saketh-nandu' },
      { name: 'Ventrapragada Purna Vikas', rollNumber: '23054-AI-025', role: 'UI/UX Design, Frontend & Documentation', github: 'https://github.com/Purnavikas08' },
      { name: 'Katta Tejeshwar', rollNumber: '23054-AI-053', role: 'Documentation & DevOps', github: 'https://github.com/KattaTejeshwar' },
      { name: 'Guttapalli Surya Prakash', rollNumber: '23054-AI-059', role: 'Mobile Optimization', github: 'https://github.com/SuryaGuttapalli' },
      { name: 'Koganti Sai Charan', rollNumber: '23054-AI-062', role: 'API Integration & Backend', github: 'https://github.com/KOGANTISAICHARAN' },
      { name: 'Kara Karthikeya', rollNumber: '23054-AI-023', role: 'App Testing', github: 'https://github.com/karakarthikeya26-beep' },
      { name: 'Vankodvath Yekeshwar Naik', rollNumber: '23054-AI-028', role: 'Database & Security', github: 'https://github.com/yekeshwar-naik' },
      { name: 'Neerati Sri Krishna Teja', rollNumber: '23054-AI-055', role: 'Feature Development', github: 'https://github.com/srikrishnateja55' },
    ],
    challengesAndLearnings: [
      'Coordinated Git branching, PR reviews, and module integration across a 10-developer student engineering team.',
      'Balanced rich multi-tool academic dashboards (GPA trends, syllabus trackers, Pomodoro cycles) within a clean mobile-first navigation hierarchy.',
    ],
    githubUrl: 'https://github.com/ysathyasai/StudyHub',
    liveUrl: 'https://github.com/ysathyasai/StudyHub/releases/download/StudyHub/StudyHub.apk',
    documentationUrl: 'https://raw.githubusercontent.com/ysathyasai/StudyHub/main/docs/Group%20Document.pdf',
    worldLandmark: {
      name: 'StudyHub Digital Campus',
      description: 'Miniature smart university dome with orbital schedule rings and AI study terminals.',
      position: [4, 0, -64],
      accentColor: '#F59E0B',
      dioramaType: 'campus',
    },
  },
  {
    id: 'composite-behavioral-modeling',
    slug: 'composite-behavioral-modeling',
    title: 'Composite Behavioral Modeling',
    subtitle: 'Ensemble Machine Learning Platform for Identity Theft & Fraud Detection',
    category: 'ai-ml',
    categoryLabel: 'Cybersecurity & ML Analytics · 6th Semester Project',
    year: '2026',
    status: 'Live Demo on Render · Academic Release',
    featured: true,
    badgeText: '6th Semester ML Project',
    problem:
      'Static rule-based security checks fail to catch sophisticated identity theft patterns that span subtle behavioral, transactional, and network-protocol anomalies.',
    summary:
      'A Django and scikit-learn fraud risk evaluation system separating Remote User real-time prediction workflows from a Service Provider ML training, model accuracy comparison, and statistical audit portal.',
    architecture: [
      'Ensemble Classification Core: Combines RandomForestClassifier, GradientBoostingClassifier, and LogisticRegression to evaluate account behavior, social connection ratios, and transaction metrics.',
      'Dual-Portal Django Monolith: Remote User portal (/login, /Predict_Fraud_Status) for instant risk checks + Service Provider portal (/Train_View_Model_Accuracy) for classifier benchmarking and .xls export.',
      'Cloud Blueprint Deployment: Automated Render deployment using Gunicorn, WhiteNoise static middleware, and SQLite/CSV datasets (with transparent documentation of Render 0.5 CPU free-tier compute ceilings during live training).',
    ],
    techStack: [
      'Python 3.11',
      'Django 3.2',
      'scikit-learn',
      'pandas & NumPy',
      'xlwt (.xls Audit Export)',
      'Gunicorn & WhiteNoise',
      'Render',
    ],
    personalContribution:
      'Lead Developer — implemented the scikit-learn feature preprocessing pipeline, ensemble classifier views, Django templates, and Render production blueprint.',
    collaborators: [
      { name: 'Yejju Sathya Sai', role: 'Lead Developer & ML Integrator', github: 'https://github.com/ysathyasai' },
      { name: 'CBM Academic Project Team', role: 'Dataset Curation & Documentation' },
    ],
    challengesAndLearnings: [
      'Diagnosed memory and CPU bottlenecks when training ensemble classifiers on constrained 0.5-CPU cloud containers, documenting clear local vs. cloud execution strategies.',
      'Built exportable .xls statistical reports so compliance reviewers can audit fraud ratio distributions offline.',
    ],
    githubUrl: 'https://github.com/ysathyasai/Composite_Behavioral_Modeling',
    liveUrl: 'https://composite-behavioral-modeling-abci.onrender.com/',
    documentationUrl:
      'https://github.com/ysathyasai/Composite_Behavioral_Modeling/blob/main/documentation/Documents_Composite%20Behavioral%20Modeling%20for%20Identity%20Theft%20Detection/Group%20Document.pdf',
    worldLandmark: {
      name: 'CBM Behavioral Cyber-Lab',
      description: 'Biometric scanner array and ensemble classification prism analyzing fraud telemetry.',
      position: [10, 0, -58],
      accentColor: '#06B6D4',
      dioramaType: 'cyberlab',
    },
  },
  {
    id: 'contribready',
    slug: 'contribready',
    title: 'ContribReady',
    subtitle: 'AI Open-Source Readiness Platform — From GitHub Issue to PR-Ready',
    category: 'fullstack',
    categoryLabel: 'Developer Tooling & AI · Hacktoberfest Hack Day 2026',
    year: '2026',
    status: 'Completed Hackathon Build',
    featured: true,
    badgeText: 'Hacktoberfest Hack Day 2026',
    problem:
      'New and intermediate open-source contributors often abandon GitHub issues because they cannot locate the right files in a large repository or figure out which prerequisite concepts to learn first.',
    summary:
      'An AI-powered contributor onboarding platform that ingests any GitHub issue URL, prunes the repository tree, scores relevant files, explains prerequisite concepts, and administers a readiness quiz before the developer opens a pull request.',
    architecture: [
      'Repository Context Engine: Fetches issue metadata and repo file trees via the GitHub REST API, pruning noise and scoring candidate files by relevance.',
      'Multi-Provider AI Layer: Supports Google Gemini, Groq, OpenRouter, local Ollama models, and a deterministic benchmark demo mode for live hackathon judging.',
      'Interactive Readiness Gate: Generates plain-English issue breakdowns, concept cards, a step-by-step roadmap, and an automated readiness quiz with gap remediation.',
    ],
    techStack: [
      'React 19',
      'Vite',
      'Tailwind CSS',
      'Node.js 20+',
      'Express',
      'GitHub REST API',
      'Google Gemini / Groq / Ollama',
    ],
    personalContribution:
      'Designed and built the full-stack React 19 + Express application, repository tree pruning engine, and interactive contributor readiness assessment flow for Hacktoberfest Hack Day 2026.',
    collaborators: [
      { name: 'Yejju Sathya Sai', role: 'Creator & Full-Stack Developer', github: 'https://github.com/ysathyasai' },
    ],
    challengesAndLearnings: [
      'Engineered repository tree pruning heuristics so large codebases fit cleanly within LLM context windows without losing critical module relationships.',
    ],
    githubUrl: 'https://github.com/ysathyasai/ContribReady',
    worldLandmark: {
      name: 'ContribReady Launchpad',
      description: 'Holographic Git tree analyzer and contributor readiness gate.',
      position: [-7, 0, -70],
      accentColor: '#A855F7',
      dioramaType: 'kodex',
    },
  },
  {
    id: 'cardano-web3-suite',
    slug: 'cardano-web3-suite',
    title: 'Cutthroat, AdaCompute & ImpactVault',
    subtitle: 'Cardano & Monad Web3 Explorations: On-Chain Impact & Decentralized AI Compute',
    category: 'web3',
    categoryLabel: 'Web3 & Blockchain · Cardano IndiaCodex’26 & Monad Blitz',
    year: '2025 – 2026',
    status: 'Public Repo (Cutthroat) & Hackathon Prototypes',
    featured: true,
    badgeText: 'Cardano IndiaCodex’26 · Monad Blitz',
    problem:
      'Centralized donation platforms and AI compute marketplaces suffer from opaque fund routing, high intermediary fees, and unverifiable service delivery.',
    summary:
      'A suite of Web3 builds spanning Cutthroat (a verified Next.js 15 + Cardano Mesh SDK decentralized donation platform with NFT proof certificates), AdaCompute (decentralized AI compute exchange explored for Cardano IndiaCodex’26), and ImpactVault (transparent donation-to-impact tracking explored at Monad Blitz).',
    architecture: [
      'Cutthroat (Verified Repository): Built with Next.js 15.5.3, TypeScript 5, Tailwind CSS, and Cardano Mesh SDK (1.9.0-beta.74) supporting Yoroi, Nami, and Eternl wallets with NFT donation certificates.',
      'AdaCompute (Cardano IndiaCodex’26): Explores decentralized AI service exchange where compute providers and requesters coordinate tasks through Cardano transaction and escrow flows.',
      'ImpactVault (Monad Blitz): Explores verifiable donation-to-impact audit trails and milestone-based release mechanics.',
    ],
    techStack: [
      'Next.js 15.5',
      'TypeScript 5',
      'Cardano Blockchain',
      'Mesh SDK',
      'Monad Ecosystem',
      'Tailwind CSS',
    ],
    personalContribution:
      'Developed the Next.js + Mesh SDK wallet and transaction interfaces in Cutthroat and participated in the Cardano IndiaCodex’26 (AdaCompute) and Monad Blitz (ImpactVault) hackathon builds.',
    collaborators: [
      { name: 'Yejju Sathya Sai', role: 'Web3 & Full-Stack Developer', github: 'https://github.com/ysathyasai' },
      { name: 'Hackathon Team Collaborators', role: 'Smart Contract & Protocol Design (IndiaCodex’26 / Monad Blitz)' },
    ],
    challengesAndLearnings: [
      'Integrated asynchronous Cardano wallet state management (Nami, Eternl, Yoroi) with modern Next.js 15 App Router components.',
    ],
    githubUrl: 'https://github.com/ysathyasai/Cutthroat',
    worldLandmark: {
      name: 'Web3 Escrow & Impact Vault',
      description: 'Interlocking cryptographic rings representing Cardano compute nodes and transparent impact vaults.',
      position: [7, 0, -70],
      accentColor: '#6366F1',
      dioramaType: 'web3',
    },
  },
  {
    id: 'flask-video-downloader',
    slug: 'flask-video-downloader',
    title: 'Flask Video Downloader & RAG-Bot',
    subtitle: 'Local-First Media Station & ChromaDB Document Intelligence',
    category: 'systems',
    categoryLabel: 'Local-First Python Tools & RAG Systems',
    year: '2025 – 2026',
    status: 'Open Source · Cross-Platform & Termux Ready',
    featured: false,
    badgeText: 'Local-First Python Suite',
    problem:
      'Ad-heavy cloud media converters and opaque document chatbots compromise user privacy and fail on mobile Linux environments like Android Termux.',
    summary:
      'A pair of self-hosted Python utilities: Flask Video Downloader provides a clean local-first web UI over yt-dlp and FFmpeg (running on Windows, macOS, Linux, and Android Termux), while RAG-Bot delivers local ChromaDB vector search with Groq Llama-3.3-70b source citations.',
    architecture: [
      'Flask Video Downloader: Python 3.11 + Flask 3.x + yt-dlp + FFmpeg with single-active-job queue locking to protect temporary files, MP3 audio extraction, and subtitle bundling.',
      'RAG-Bot Pipeline: FastAPI backend + persistent local ChromaDB + HuggingFace sentence-transformers (all-MiniLM-L6-v2) + LangChain RecursiveCharacterTextSplitter + Groq streaming.',
    ],
    techStack: [
      'Python 3.11+',
      'Flask 3.x & FastAPI',
      'yt-dlp & FFmpeg',
      'ChromaDB',
      'sentence-transformers',
      'Android Termux',
      'Docker',
    ],
    personalContribution:
      'Solo Creator & Maintainer — built both repositories from scratch, including cross-platform Termux installation scripts and FastAPI RAG endpoints.',
    collaborators: [
      { name: 'Yejju Sathya Sai', role: 'Creator & Maintainer', github: 'https://github.com/ysathyasai' },
    ],
    challengesAndLearnings: [
      'Solved concurrent file-lock corruption during multi-format FFmpeg muxing by designing a deterministic single-job queue with live progress polling.',
    ],
    githubUrl: 'https://github.com/ysathyasai/Flask-Video-Downloader',
    secondaryLiveUrl: 'https://github.com/ysathyasai/RAG-Bot',
    secondaryLiveLabel: 'RAG-Bot Repository',
    worldLandmark: {
      name: 'Local-First Media & RAG Station',
      description: 'Compact processing rig with audio waveform tubes and vector index cylinders.',
      position: [0, 0, -56],
      accentColor: '#EC4899',
      dioramaType: 'media',
    },
  },
  {
    id: 'microkernel-os',
    slug: 'microkernel-os',
    title: 'MicroKernel-OS & Sentinel AI',
    subtitle: '32-Bit x86 C/Assembly Microkernel & Mobile PWA AI Content Checker',
    category: 'systems',
    categoryLabel: 'OS Internals & Mobile PWA',
    year: '2025 – 2026',
    status: 'Educational Kernel & PWA Blueprint',
    featured: false,
    badgeText: 'x86 Kernel & PWA',
    problem:
      'High-level web frameworks abstract away how hardware interrupts, memory allocators, and mobile offline service workers actually operate.',
    summary:
      'MicroKernel-OS is an educational 32-bit x86 microkernel written in C and Assembly implementing BIOS bootloader protected-mode transitions, PIT preemptive round-robin task scheduling, kmalloc/kfree, and IPC. Paired with Sentinel AI, a mobile-first PWA for multimodal AI/scam content detection.',
    architecture: [
      'Real-to-Protected Mode Bootloader: boot.asm loads at 0x7C00 and transitions the CPU into 32-bit protected mode before jumping into main.c.',
      'Kernel Subsystems: Implements task.c (preemptive round-robin scheduler via PIT timer interrupts), mm.c (physical memory allocator), and ipc.c (send/recv message passing).',
      'Sentinel AI PWA: Mobile-optimized Progressive Web App using Gemini API and AssemblyAI to inspect images, video, audio, and text.',
    ],
    techStack: [
      'C',
      'x86 Assembly (NASM)',
      'QEMU / GCC Cross-Compiler',
      'PWA / Service Workers',
      'Gemini API & AssemblyAI',
    ],
    personalContribution:
      'Explored and maintained the kernel subsystems and build automation alongside open-source collaborators (ArchieTUX for MicroKernel-OS; Adithya Srivatsa for Sentinel AI).',
    collaborators: [
      { name: 'Yejju Sathya Sai', role: 'Systems & AI Contributor', github: 'https://github.com/ysathyasai' },
      { name: 'ArchieTUX / Adithya Srivatsa', role: 'Upstream / Collaborative Authors' },
    ],
    challengesAndLearnings: [
      'Gained deep intuition for CPU context switching, stack frame preservation during hardware interrupts, and physical page allocation.',
    ],
    githubUrl: 'https://github.com/ysathyasai/MicroKernel-OS',
    secondaryLiveUrl: 'https://github.com/ysathyasai/sentinel-ai',
    secondaryLiveLabel: 'Sentinel AI Repository',
    worldLandmark: {
      name: 'x86 Kernel Monolith',
      description: 'Precision silicon pillar visualizing interrupt rings and memory blocks.',
      position: [-10, 0, -68],
      accentColor: '#14B8A6',
      dioramaType: 'cyberlab',
    },
  },
];

export const CONSTELLATION_NODES: ConstellationNode[] = [
  {
    id: 'node-sih-2026',
    title: 'Smart India Hackathon (SIH 2026) Finalist',
    event: 'Ministry of Consumer Affairs, Food & Public Distribution (Problem Statement SIH26033)',
    date: '2026',
    category: 'Hackathon Finalist',
    projectLinked: 'Khet2Kitchen (K2K)',
    story:
      'Architected the full-stack Django 5.1 core and dual-channel B2B/D2C marketplace engine for Khet2Kitchen, combining Sarvam AI Indic voice STT/TTS with Google Gemini reasoning to disintermediate agricultural supply chains.',
    verifiedOutcome: '124/124 passing automated tests and live cloud platform deployed on Render.',
    sourceUrl: 'https://github.com/ysathyasai/Khet2Kitchen',
    starPosition: [-34, 4.2, -90],
    color: '#F59E0B',
  },
  {
    id: 'node-hwh-3',
    title: 'HackwithHyderabad 3.0 — Cognitive Peer Reviewer',
    event: 'HackwithHyderabad 3.0',
    date: '2026',
    category: 'AI Engineering',
    projectLinked: 'Kodex',
    story:
      'Engineered Kodex using Vectorize Hindsight Cloud biomimetic memory (recall, reflect, retain) and Groq openai/gpt-oss-120b inference so AI code review bots remember team architectural decisions and never repeat rejected advice.',
    verifiedOutcome: 'Shipped with Semantic Dependency Cohort Graphing (diff_parser.py), 5/5 live cloud pytest suite, and Docker Compose.',
    sourceUrl: 'https://github.com/ysathyasai/Kodex',
    starPosition: [-30, 5.5, -94],
    color: '#38BDF8',
  },
  {
    id: 'node-cardano-indiacodex',
    title: "Cardano IndiaCodex'26 & Decentralized Donations",
    event: "Cardano IndiaCodex'26 & Cardano Ecosystem",
    date: '2025 – 2026',
    category: 'Web3 Build',
    projectLinked: 'AdaCompute & Cutthroat',
    story:
      'Explored decentralized AI compute exchange on Cardano with AdaCompute and built Cutthroat, a verified Next.js 15 + Mesh SDK platform for transparent on-chain donations with NFT proof certificates.',
    verifiedOutcome: 'Public Cutthroat repository shipped with Next.js 15.5.3, TypeScript 5, and Cardano Mesh SDK.',
    sourceUrl: 'https://github.com/ysathyasai/Cutthroat',
    starPosition: [-26, 4.8, -89],
    color: '#A855F7',
  },
  {
    id: 'node-monad-blitz',
    title: 'Monad Blitz Hyderabad — Transparent Impact Tracking',
    event: 'Monad Blitz Community Hackathon',
    date: '2026',
    category: 'Web3 Build',
    projectLinked: 'ImpactVault',
    story:
      'Collaborated in Hyderabad’s high-energy Monad Blitz builder sprint to explore transparent donation-to-impact verification flows and verifiable milestone accounting.',
    verifiedOutcome: 'Prototyped transparent vault verification architecture alongside Web3 builder peers.',
    sourceUrl: 'https://www.linkedin.com/in/ysathyasai',
    starPosition: [-22, 5.2, -93],
    color: '#6366F1',
  },
  {
    id: 'node-hacktoberfest-2026',
    title: 'Hacktoberfest Hack Day 2026 — Open-Source Onboarding',
    event: 'Hacktoberfest Hack Day 2026',
    date: '2026',
    category: 'Open Source',
    projectLinked: 'ContribReady',
    story:
      'Built ContribReady to bridge the gap between discovering a GitHub issue and submitting a confident pull request through automated repo tree pruning, file relevance scoring, and AI readiness quizzes.',
    verifiedOutcome: 'Full-stack React 19 + Node/Express + multi-provider AI repository published under MIT license.',
    sourceUrl: 'https://github.com/ysathyasai/ContribReady',
    starPosition: [-28, 3.3, -95],
    color: '#10B981',
  },
  {
    id: 'node-genai-outskill',
    title: 'Generative AI Mastermind & GIOE AI/ML Capstone',
    event: 'Outskill Generative AI Mastermind & Government Institute of Electronics',
    date: '2025 – 2026',
    category: 'Certification & Community',
    projectLinked: 'StudyHub & RAG-Bot',
    story:
      'Completed intensive Generative AI training (Outskill) and applied LLM orchestration, embeddings, and prompt engineering directly to StudyHub, RAG-Bot, and Khet2Kitchen.',
    verifiedOutcome: '25+ public repositories spanning Python, TypeScript, Dart, C, and Shell automation.',
    sourceUrl: 'https://github.com/ysathyasai',
    starPosition: [-24, 3.6, -88],
    color: '#EC4899',
  },
];

export const TERMINAL_EASTER_EGGS: Record<string, string> = {
  help: 'Available commands: whoami, roll, projects, sih, kodex, kernel, stack, brainteaser, contact, clear',
  whoami: 'Yejju Sathya Sai (ysathyasai) — AI/ML Developer & Full-Stack Architect at Government Institute of Electronics, Secunderabad.',
  roll: 'Verified Academic Roll Number: 23054-AI-051 (Dept. of Artificial Intelligence & Machine Learning, GIOE Secunderabad).',
  projects: 'Featured Worlds: [1] Khet2Kitchen (SIH 2026) [2] Kodex (HackwithHyderabad 3.0) [3] StudyHub [4] Composite Behavioral Modeling [5] ContribReady [6] Cutthroat/AdaCompute/ImpactVault',
  sih: 'SIH26033 Finalist: Khet2Kitchen disintermediates the 5-tier mandi chain using Django 5.1, Sarvam AI Indic Voice STT/TTS, and Gemini Flash (124/124 tests passing).',
  kodex: 'Kodex uses Vectorize Hindsight Cloud (recall, reflect, retain) + Groq gpt-oss-120b + Semantic Dependency Cohort Graphing so PR bots never repeat rejected suggestions.',
  kernel: 'MicroKernel-OS boots at 0x7C00 in real mode, switches to 32-bit x86 protected mode, and runs a PIT preemptive round-robin scheduler with kmalloc/kfree.',
  stack: 'Core Stack: Python 3.11+, TypeScript 5, React 19, Next.js 15, Django 5.1, FastAPI, Flutter/Dart, Three.js/WebGL, Gemini API, Groq, ChromaDB, Cardano Mesh SDK.',
  brainteaser: 'Easter Egg Unlocked! In Sathya’s GitHub README, curious minds are challenged with Gist 4791099196b95935e18c8752e4346fb5 — keep experimenting beyond the screen!',
  contact: 'Direct channel: ysathyasai.dev@gmail.com | GitHub: github.com/ysathyasai | LinkedIn: linkedin.com/in/ysathyasai',
};
