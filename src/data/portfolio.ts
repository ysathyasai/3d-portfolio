export interface Collaborator {
  name: string;
  role: string;
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
    dioramaType: 'agritech' | 'kodex' | 'campus' | 'cyberlab' | 'web3' | 'media' | 'java-enterprise' | 'kernel';
  };
}

export interface ChapterItem {
  id: string;
  index: number;
  numberLabel: string;
  shortLabel: string;
  title: string;
  kicker: string;
  headline: string;
  lead: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  mobileCameraPosition: [number, number, number];
  mobileCameraTarget: [number, number, number];
  islandCenter: [number, number, number];
  accentHex: string;
  ambientHex: string;
  environmentType:
    | 'studio'
    | 'persona'
    | 'university'
    | 'timeline'
    | 'workshop'
    | 'ai-lab'
    | 'project-plaza'
    | 'case-study-deck'
    | 'open-source-nexus'
    | 'hackathon-arena'
    | 'experience-spire'
    | 'observatory'
    | 'playground'
    | 'stargate';
}

export interface PersonalArtifact {
  id: string;
  title: string;
  kicker: string;
  story: string;
  verifiedFact: string;
  accentHex: string;
}

export interface EducationCampus {
  id: string;
  institution: string;
  shortName: string;
  degree: string;
  department: string;
  period: string;
  location: string;
  highlights: string[];
  flagshipBuilds: string[];
  sourceUrl: string;
  accentHex: string;
}

export interface JourneyMilestone {
  id: string;
  period: string;
  title: string;
  institutionOrEvent: string;
  category: 'education' | 'systems' | 'ai-ml' | 'hackathon' | 'fullstack';
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

export interface AiLabPipeline {
  id: string;
  name: string;
  projectLinked: string;
  summary: string;
  parameterLabel: string;
  parameterOptions: {
    label: string;
    value: string;
    stages: {
      stage: string;
      detail: string;
      metric: string;
    }[];
    engineeringTakeaway: string;
  }[];
  repoUrl: string;
}

export interface CaseStudyItem {
  id: string;
  projectId: string;
  title: string;
  subtitle: string;
  contextBadge: string;
  problemStatement: string;
  systemArchitecture: string[];
  keyDecisions: {
    decision: string;
    rationale: string;
  }[];
  verificationProof: string;
  myRole: string;
  githubUrl: string;
  liveUrl?: string;
}

export interface OpenSourceRepo {
  id: string;
  name: string;
  language: string;
  license: string;
  starsLabel: string;
  summary: string;
  highlights: string[];
  url: string;
}

export interface HackathonArena {
  id: string;
  event: string;
  year: string;
  distinction: string;
  projectBuilt: string;
  myRole: string;
  teamSummary: string;
  outcome: string;
  repoUrl: string;
  liveUrl?: string;
  accentHex: string;
}

export interface ExperienceTrack {
  id: string;
  category: 'Flagship Systems Architecture' | 'Collaborative Team Engineering' | 'Open-Source & Developer Tooling' | 'Academic & Enterprise Engineering';
  period: string;
  roleTitle: string;
  organizationOrContext: string;
  summary: string;
  deliverables: string[];
  proofUrl: string;
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
  tagline: 'Building ideas into reality, one experiment at a time.',
  introLine: "Hey, I'm Sathya Sai. Welcome to the 3D world I built behind my code.",
  roles: ['AI & ML Engineer', 'Full-Stack Architect', 'Systems & Open-Source Builder'],
  location: 'Hyderabad, Telangana, India',
  institution: 'VNR Vignana Jyothi Institute of Engineering & Technology (VNR VJIET), Hyderabad',
  previousInstitution: 'Government Institute of Electronics (GIOE), Secunderabad',
  specialization: 'B.Tech in Computer Science & Engineering (AI & ML) · Diploma in AI & ML',
  cohort: 'VNR VJIET (Current B.Tech) · GIOE (2023 – 2026 Diploma)',
  email: 'ysathyasai.dev@gmail.com',
  photoUrl: '/assets/portfolio/sathya-photo.webp',
  remotePhotoFallback: 'https://res.cloudinary.com/dlkksfa9e/image/upload/f_webp/v1741387661/yfhka4arlfhpkzatfb2p.webp',
  socialLinks: {
    github: 'https://github.com/ysathyasai',
    linkedin: 'https://www.linkedin.com/in/ysathyasai',
    twitter: 'https://x.com/ysathyasai',
    medium: 'https://medium.com/@ysathyasai',
    leetcode: 'https://leetcode.com/u/ysathyasai/',
    codechef: 'https://www.codechef.com/users/ysathyasai',
    hackerrank: 'https://www.hackerrank.com/yejjusatyasai201',
    kaggle: 'https://kaggle.com/ysathyasai',
    stackoverflow: 'https://stackoverflow.com/users/30141912/yejju-sathya-sai',
    devto: 'https://dev.to/ysathyasai',
    existingPortfolio: 'https://ysathyasai.netlify.app/',
    existingPortfolioRepo: 'https://github.com/ysathyasai/My-Portfolio',
    buyMeACoffee: 'https://buymeacoffee.com/ysathyasai',
    patreon: 'https://patreon.com/YejjuSathyaSai',
  },
  shortBio:
    'I am an AI & ML developer and full-stack builder pursuing my B.Tech in CSE (AI & ML) at VNR VJIET, Hyderabad after completing my Diploma in AI & ML at the Government Institute of Electronics, Secunderabad. From architecting direct farm-to-kitchen supply chains with Indic voice AI (SIH 2026 Finalist) and biomimetic memory code review agents (Kodex) to enterprise Java/MySQL systems (YieldGrid), 32-bit x86 microkernels, and Cardano dApps, I love turning ambitious technical experiments into reliable software.',
};

export const CHAPTERS: ChapterItem[] = [
  {
    id: 'arrival',
    index: 0,
    numberLabel: '01',
    shortLabel: 'Arrival',
    title: 'Arrival: The World Awakens',
    kicker: 'Chapter 01 · My Interactive Studio · Hyderabad, India',
    headline: 'Yejju Sathya Sai',
    lead: "Hey, I'm Sathya Sai. I built this interconnected 14-island 3D universe to take you inside how I think, experiment, and engineer software across AI/ML, full-stack web, enterprise Java, and low-level systems.",
    cameraPosition: [0, 5.2, 13.5],
    cameraTarget: [0, 1.4, 0],
    mobileCameraPosition: [0, 7.6, 17.5],
    mobileCameraTarget: [0, -1.2, 0],
    islandCenter: [0, 0, 0],
    accentHex: '#F59E0B',
    ambientHex: '#0EA5E9',
    environmentType: 'studio',
  },
  {
    id: 'persona',
    index: 1,
    numberLabel: '02',
    shortLabel: 'Persona',
    title: 'The Person Behind the Code',
    kicker: 'Chapter 02 · Curiosity, Linux & First Principles',
    headline: 'Why I Build & Automate Things',
    lead: 'Beyond frameworks and commit graphs, I am a Linux enthusiast, systems tinkerer, and open-source builder who learns best by taking things apart and automating repetitive workflows.',
    cameraPosition: [-22, 5.5, -6],
    cameraTarget: [-28, 1.6, -18],
    mobileCameraPosition: [-20, 8.0, -2],
    mobileCameraTarget: [-28, -1.0, -18],
    islandCenter: [-28, 0, -18],
    accentHex: '#38BDF8',
    ambientHex: '#F59E0B',
    environmentType: 'persona',
  },
  {
    id: 'education',
    index: 2,
    numberLabel: '03',
    shortLabel: 'Education',
    title: 'Origins & Education',
    kicker: 'Chapter 03 · GIOE Secunderabad ➔ VNR VJIET Hyderabad',
    headline: 'My Academic Architecture',
    lead: 'My academic journey bridges hands-on engineering at the Government Institute of Electronics (GIOE), Secunderabad with my current B.Tech in CSE (AI & ML) at VNR VJIET, Hyderabad.',
    cameraPosition: [22, 5.8, -18],
    cameraTarget: [28, 1.8, -30],
    mobileCameraPosition: [20, 8.4, -14],
    mobileCameraTarget: [28, -1.0, -30],
    islandCenter: [28, 0, -30],
    accentHex: '#10B981',
    ambientHex: '#38BDF8',
    environmentType: 'university',
  },
  {
    id: 'timeline',
    index: 3,
    numberLabel: '04',
    shortLabel: 'Timeline',
    title: 'The Evolution Timeline',
    kicker: 'Chapter 04 · Chronological Progression (2023 – 2026)',
    headline: 'From C Kernels to Agentic AI',
    lead: 'Step along my chronological causeway — tracing how each semester, Linux script, microkernel experiment, and national hackathon compounded into full-stack systems engineering.',
    cameraPosition: [-22, 6.2, -34],
    cameraTarget: [-28, 1.8, -46],
    mobileCameraPosition: [-20, 8.6, -30],
    mobileCameraTarget: [-28, -1.0, -46],
    islandCenter: [-28, 0, -46],
    accentHex: '#F59E0B',
    ambientHex: '#A855F7',
    environmentType: 'timeline',
  },
  {
    id: 'workshop',
    index: 4,
    numberLabel: '05',
    shortLabel: 'Workshop',
    title: "The Engineer's Workshop",
    kicker: 'Chapter 05 · Six Interactive Technical Stations',
    headline: 'Inside My Engineering Workbench',
    lead: 'Inspect the six core stations of my workshop. Every capability I list is backed directly by shipped repositories, automated test suites, and documented architectures.',
    cameraPosition: [22, 6.4, -50],
    cameraTarget: [28, 1.8, -62],
    mobileCameraPosition: [20, 8.8, -46],
    mobileCameraTarget: [28, -1.0, -62],
    islandCenter: [28, 0, -62],
    accentHex: '#10B981',
    ambientHex: '#0EA5E9',
    environmentType: 'workshop',
  },
  {
    id: 'ai-lab',
    index: 5,
    numberLabel: '06',
    shortLabel: 'AI Lab',
    title: 'The AI & Machine Learning Laboratory',
    kicker: 'Chapter 06 · Interactive Pipeline & Inference Simulator',
    headline: 'Applied AI, Memory & Ensembles',
    lead: 'Explore the actual AI pipelines behind my projects — from Kodex biomimetic memory and semantic diff cohorts to ChromaDB vector RAG and scikit-learn fraud ensembles.',
    cameraPosition: [-22, 6.5, -66],
    cameraTarget: [-28, 2.0, -78],
    mobileCameraPosition: [-20, 9.0, -62],
    mobileCameraTarget: [-28, -0.8, -78],
    islandCenter: [-28, 0, -78],
    accentHex: '#38BDF8',
    ambientHex: '#6366F1',
    environmentType: 'ai-lab',
  },
  {
    id: 'projects',
    index: 6,
    numberLabel: '07',
    shortLabel: 'Projects',
    title: 'The Project Universe',
    kicker: 'Chapter 07 · Nine Miniature Worlds of Real Software',
    headline: 'Systems I Have Built & Shipped',
    lead: 'Click any 3D architectural world in the plaza or select a build below to inspect its system design, live deployment, collaborator credits, and source repository.',
    cameraPosition: [0, 8.8, -82],
    cameraTarget: [0, 1.8, -98],
    mobileCameraPosition: [0, 11.8, -76],
    mobileCameraTarget: [0, -1.5, -98],
    islandCenter: [0, 0, -98],
    accentHex: '#F59E0B',
    ambientHex: '#38BDF8',
    environmentType: 'project-plaza',
  },
  {
    id: 'case-studies',
    index: 7,
    numberLabel: '08',
    shortLabel: 'Case Studies',
    title: 'Inside the Builds: Engineering Case Studies',
    kicker: 'Chapter 08 · Deep-Dive Architecture Console',
    headline: 'Architectural Trade-Offs & Proofs',
    lead: 'Dive beneath the surface of my four most rigorous builds — examining the exact problem statements, architectural decisions, edge-case mitigations, and verification suites.',
    cameraPosition: [24, 6.2, -104],
    cameraTarget: [30, 1.8, -116],
    mobileCameraPosition: [22, 8.8, -100],
    mobileCameraTarget: [30, -1.0, -116],
    islandCenter: [30, 0, -116],
    accentHex: '#06B6D4',
    ambientHex: '#F59E0B',
    environmentType: 'case-study-deck',
  },
  {
    id: 'open-source',
    index: 8,
    numberLabel: '09',
    shortLabel: 'Open Source',
    title: 'The Open-Source Universe',
    kicker: 'Chapter 09 · 28 Public Repositories & Community Tools',
    headline: 'Building in Public on GitHub',
    lead: 'From my 30-star Android Termux guide and cross-platform CLI utilities to Hacktoberfest contributor readiness tools and GPLv3 RAG pipelines, open source is how I share what I learn.',
    cameraPosition: [-24, 6.2, -120],
    cameraTarget: [-30, 1.8, -132],
    mobileCameraPosition: [-22, 8.8, -116],
    mobileCameraTarget: [-30, -1.0, -132],
    islandCenter: [-30, 0, -132],
    accentHex: '#10B981',
    ambientHex: '#A855F7',
    environmentType: 'open-source-nexus',
  },
  {
    id: 'hackathons',
    index: 9,
    numberLabel: '10',
    shortLabel: 'Hackathons',
    title: 'Hackathons & Collaborations',
    kicker: 'Chapter 10 · High-Velocity Builder Arenas',
    headline: 'Shipping Under Pressure With Great Teams',
    lead: 'Hackathons push me to turn raw ideas into tested deployments in 24 to 36 hours — across Smart India Hackathon 2026, HackwithHyderabad 3.0, Cardano IndiaCodex, and Monad Blitz.',
    cameraPosition: [24, 6.4, -136],
    cameraTarget: [30, 1.8, -148],
    mobileCameraPosition: [22, 9.0, -132],
    mobileCameraTarget: [30, -1.0, -148],
    islandCenter: [30, 0, -148],
    accentHex: '#F59E0B',
    ambientHex: '#EC4899',
    environmentType: 'hackathon-arena',
  },
  {
    id: 'experience',
    index: 10,
    numberLabel: '11',
    shortLabel: 'Experience',
    title: 'Experience & Technical Growth',
    kicker: 'Chapter 11 · Practical Engineering & Team Leadership',
    headline: 'How I Deliver Real Engineering Value',
    lead: 'An honest, transparent breakdown of my hands-on experience: architecting flagship systems, collaborating in 6-to-10 member engineering teams, and maintaining open-source tools.',
    cameraPosition: [-24, 6.4, -152],
    cameraTarget: [-30, 1.8, -164],
    mobileCameraPosition: [-22, 9.0, -148],
    mobileCameraTarget: [-30, -1.0, -164],
    islandCenter: [-30, 0, -164],
    accentHex: '#38BDF8',
    ambientHex: '#10B981',
    environmentType: 'experience-spire',
  },
  {
    id: 'achievements',
    index: 11,
    numberLabel: '12',
    shortLabel: 'Achievements',
    title: 'Achievements & Certifications',
    kicker: 'Chapter 12 · The Starlight Observatory',
    headline: 'Milestones, Credentials & Recognition',
    lead: 'Inspect the constellation nodes above my observatory — each star represents a verified hackathon distinction, certification, test milestone, or open-source community benchmark.',
    cameraPosition: [24, 6.8, -168],
    cameraTarget: [30, 2.2, -180],
    mobileCameraPosition: [22, 9.2, -164],
    mobileCameraTarget: [30, -0.8, -180],
    islandCenter: [30, 0, -180],
    accentHex: '#A855F7',
    ambientHex: '#38BDF8',
    environmentType: 'observatory',
  },
  {
    id: 'playground',
    index: 12,
    numberLabel: '13',
    shortLabel: 'Playground',
    title: 'The Interactive Playground',
    kicker: 'Chapter 13 · Live Coding Puzzle, CLI & Drone Flight',
    headline: 'Test My Systems Live',
    lead: 'Don’t just read about my work — solve the interactive Kodex Diff Cohort ordering challenge, run commands in my custom shell, or pilot the 3D Scout Drone across the archipelago.',
    cameraPosition: [-20, 6.5, -184],
    cameraTarget: [-26, 1.8, -196],
    mobileCameraPosition: [-18, 9.0, -180],
    mobileCameraTarget: [-26, -1.0, -196],
    islandCenter: [-26, 0, -196],
    accentHex: '#10B981',
    ambientHex: '#F59E0B',
    environmentType: 'playground',
  },
  {
    id: 'frontier',
    index: 13,
    numberLabel: '14',
    shortLabel: 'Connect',
    title: 'The Next Frontier: Connect',
    kicker: 'Chapter 14 · Open Transmission Portal',
    headline: 'Let’s Build What Comes Next',
    lead: 'Whether you are hiring for AI/ML and Full-Stack engineering roles, forming a hackathon squad, or collaborating on open-source software, send me a direct transmission below.',
    cameraPosition: [0, 7.2, -204],
    cameraTarget: [0, 2.2, -218],
    mobileCameraPosition: [0, 9.8, -200],
    mobileCameraTarget: [0, -0.8, -218],
    islandCenter: [0, 0, -218],
    accentHex: '#F59E0B',
    ambientHex: '#38BDF8',
    environmentType: 'stargate',
  },
];

export const PERSONAL_ARTIFACTS: PersonalArtifact[] = [
  {
    id: 'linux-termux-rig',
    title: 'Linux, Ubuntu & Android Termux Workflow',
    kicker: 'Artifact 01 · Daily Driver & Shell Automation',
    story:
      'I live in the terminal. From customizing .bashrc/.zshrc session scripts to writing a 30-star Termux guide that turns Android phones into portable Linux development stations, I love making developer environments fast and portable.',
    verifiedFact: 'Maintainer of ysathyasai/Termux (30 GitHub Stars) & motivational-quotes-script (Apache-2.0).',
    accentHex: '#F59E0B',
  },
  {
    id: 'systems-curiosity',
    title: 'First-Principles Systems Curiosity',
    kicker: 'Artifact 02 · From 0x7C00 Bootloaders to Cloud APIs',
    story:
      'Whenever a high-level framework feels like magic, I dig into the layer underneath — whether that means writing a 32-bit x86 microkernel in C and Assembly, or implementing salted PBKDF2-HMAC-SHA256 password hashing in pure Java.',
    verifiedFact: 'Verified in MicroKernel-OS (boot.asm, task.c, mm.c) and YieldGrid Java_CBP (PasswordUtil.java).',
    accentHex: '#38BDF8',
  },
  {
    id: 'human-centric-ai',
    title: 'AI That Solves Ground-Level Friction',
    kicker: 'Artifact 03 · Vernacular Voice & Cognitive Memory',
    story:
      'I believe AI is most valuable when it removes real human bottlenecks — like letting smallholder farmers register crop harvests in regional Indian languages via voice, or giving PR review bots persistent team memory.',
    verifiedFact: 'Demonstrated in Khet2Kitchen (Sarvam AI + Gemini) and Kodex (Vectorize Hindsight + Groq).',
    accentHex: '#10B981',
  },
  {
    id: 'collaborative-builder',
    title: 'High-Trust Team Architecture',
    kicker: 'Artifact 04 · Leading & Documenting Complex Builds',
    story:
      'Great software is a team sport. Across 6-member national hackathon squads and 10-developer academic capstones, I focus on clean API contracts, UML architecture diagrams, and automated test suites so everyone can ship with confidence.',
    verifiedFact: '124/124 passing tests in Khet2Kitchen, 53/53 in YieldGrid, and 8 StarUML diagrams in SAD_CBP.',
    accentHex: '#A855F7',
  },
];

export const EDUCATION_CAMPUSES: EducationCampus[] = [
  {
    id: 'vnrvjiet-btech',
    institution: 'Vallurupalli Nageswara Rao Vignana Jyothi Institute of Engineering & Technology (VNR VJIET)',
    shortName: 'VNR VJIET, Hyderabad',
    degree: 'Bachelor of Technology (B.Tech)',
    department: 'Department of Computer Science & Engineering (AI & ML)',
    period: 'Current (2nd Year B.Tech — AI & ML)',
    location: 'Bachupally, Hyderabad, Telangana',
    highlights: [
      'Advancing in Object-Oriented Programming through Java, System Analysis & Design, Data Structures, and Artificial Intelligence & Machine Learning.',
      'Architected YieldGrid (Course-Based Project in OOP Java & StarUML SAD) under the guidance of Ms. K. Anitha and HOD Dr. Sagar Yeruva.',
      'Actively representing in national hackathons, AI/ML builder sprints, and open-source software development.',
    ],
    flagshipBuilds: ['YieldGrid (Java 17 + MySQL 8.0 + 53/53 Tests)', 'YieldGrid System Analysis & Design (8 StarUML Diagrams)'],
    sourceUrl: 'https://github.com/ysathyasai/Java_CBP',
    accentHex: '#F59E0B',
  },
  {
    id: 'gioe-diploma',
    institution: 'Government Institute of Electronics (GIOE)',
    shortName: 'GIOE, Secunderabad',
    degree: 'Diploma in Engineering',
    department: 'Department of Artificial Intelligence & Machine Learning (AI & ML)',
    period: '2023 – 2026 Cohort',
    location: 'East Maredpally, Secunderabad, Telangana',
    highlights: [
      'Built a strong foundation in Python programming, machine learning classifiers, relational databases, computer networks, and operating systems.',
      'Led the 6th-semester machine learning project (Composite Behavioral Modeling for Identity Theft Detection) using Django and scikit-learn.',
      'Collaborated in a 10-member engineering team to ship StudyHub, a Flutter + Firebase + Gemini student productivity ecosystem.',
    ],
    flagshipBuilds: ['StudyHub (Flutter + Firebase + Gemini APK)', 'Composite Behavioral Modeling (Django + scikit-learn Ensemble)'],
    sourceUrl: 'https://github.com/ysathyasai/StudyHub',
    accentHex: '#38BDF8',
  },
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: 'milestone-gioe-foundations',
    period: '2023 – 2024',
    title: 'AI & ML Foundations & Linux Open-Source Beginning',
    institutionOrEvent: 'Government Institute of Electronics (GIOE), Secunderabad',
    category: 'education',
    summary:
      'Started my formal specialization in Artificial Intelligence & Machine Learning while publishing my first open-source Linux and Android Termux guides on GitHub.',
    verifiedDetail: 'GitHub account created June 2023; Termux repository grew to 30 stars.',
    sourceLabel: 'GitHub: ysathyasai/Termux',
    sourceUrl: 'https://github.com/ysathyasai/Termux',
    coordinates: [-32, 1.2, -42],
  },
  {
    id: 'milestone-systems-kernel',
    period: '2024 – 2025',
    title: '32-Bit x86 Microkernel & Local-First Python Tooling',
    institutionOrEvent: 'MicroKernel-OS · Flask Video Downloader · CLI Scripts',
    category: 'systems',
    summary:
      'Explored low-level OS internals with a 32-bit x86 C/Assembly microkernel (PIT preemptive scheduler, kmalloc/kfree, IPC) and built local-first Python/Flask media and terminal automation utilities.',
    verifiedDetail: 'Published MicroKernel-OS, Flask-Video-Downloader, and motivational-quotes-script.',
    sourceLabel: 'GitHub: MicroKernel-OS & Flask-Video-Downloader',
    sourceUrl: 'https://github.com/ysathyasai/MicroKernel-OS',
    coordinates: [-30, 1.5, -44],
  },
  {
    id: 'milestone-cbm-studyhub',
    period: '2025 – 2026',
    title: 'Ensemble Fraud Analytics (CBM) & StudyHub Mobile Capstone',
    institutionOrEvent: 'GIOE Secunderabad · 6th Semester & Capstone Builds',
    category: 'ai-ml',
    summary:
      'Engineered Composite Behavioral Modeling (scikit-learn RandomForest, GradientBoosting & LogisticRegression in Django) and co-developed StudyHub (Flutter + Firebase + Gemini) with a 10-member team.',
    verifiedDetail: 'Live Render deployment for CBM and Android APK release for StudyHub.',
    sourceLabel: 'GitHub: Composite_Behavioral_Modeling & StudyHub',
    sourceUrl: 'https://github.com/ysathyasai/Composite_Behavioral_Modeling',
    coordinates: [-28, 1.8, -46],
  },
  {
    id: 'milestone-web3-sprints',
    period: '2025 – 2026',
    title: 'Cardano IndiaCodex, Cutthroat & Monad Blitz Web3 Sprints',
    institutionOrEvent: 'Cardano Ecosystem · Monad Blitz Hyderabad',
    category: 'hackathon',
    summary:
      'Built Cutthroat (Next.js 15 + Cardano Mesh SDK donation platform with NFT proofs), explored decentralized AI compute with AdaCompute at Cardano IndiaCodex’26, and prototyped ImpactVault at Monad Blitz.',
    verifiedDetail: 'Shipped Cutthroat repository with Next.js 15.5.3 and Mesh SDK 1.9.0.',
    sourceLabel: 'GitHub: ysathyasai/Cutthroat',
    sourceUrl: 'https://github.com/ysathyasai/Cutthroat',
    coordinates: [-26, 2.1, -48],
  },
  {
    id: 'milestone-sih-kodex',
    period: '2026',
    title: 'SIH 2026 Finalist (Khet2Kitchen) & HackwithHyderabad 3.0 (Kodex)',
    institutionOrEvent: 'Smart India Hackathon 2026 · HackwithHyderabad 3.0 · Hacktoberfest',
    category: 'hackathon',
    summary:
      'Served as Full-Stack Architect on Khet2Kitchen (SIH26033 Finalist, 124/124 passing tests), built Kodex with biomimetic cognitive memory and Groq gpt-oss-120b, and shipped ContribReady & RAG-Bot.',
    verifiedDetail: 'Live cloud deployments on Render for both Khet2Kitchen and Kodex.',
    sourceLabel: 'GitHub: Khet2Kitchen & Kodex',
    sourceUrl: 'https://github.com/ysathyasai/Khet2Kitchen',
    coordinates: [-24, 2.4, -50],
  },
  {
    id: 'milestone-vnrvjiet-yieldgrid',
    period: '2026 – Present',
    title: 'B.Tech CSE (AI & ML) at VNR VJIET & YieldGrid Enterprise Java',
    institutionOrEvent: 'VNR VJIET, Hyderabad · Dept. of CSE (AI & ML)',
    category: 'fullstack',
    summary:
      'Transitioned into B.Tech CSE (AI & ML) at VNR VJIET and engineered YieldGrid — a D2C farm-to-retail inventory system in Java 17, Swing, MySQL 8.0, PBKDF2 security, 8 StarUML diagrams, and 53/53 passing tests.',
    verifiedDetail: 'Documented in Java_CBP (42-page report, 53/53 tests) and SAD_CBP (8 StarUML diagrams).',
    sourceLabel: 'GitHub: Java_CBP & SAD_CBP',
    sourceUrl: 'https://github.com/ysathyasai/Java_CBP',
    coordinates: [-22, 2.7, -52],
  },
];

export const WORKSHOP_ARTIFACTS: WorkshopArtifact[] = [
  {
    id: 'station-ai-ml',
    name: 'Neural Inference Core',
    stationLabel: 'Station 01 · Applied AI & Ensemble ML',
    domainTitle: 'LLM Reasoning, RAG Pipelines & Ensemble Classifiers',
    summary:
      'I design multi-step agentic workflows, vector retrieval pipelines with page-level citations, and scikit-learn ensemble models that combine tree-based and linear classifiers.',
    coreTechnologies: [
      'Python 3.11+',
      'Google Gemini API',
      'Groq (gpt-oss-120b / Llama 3.3)',
      'ChromaDB & Sentence-Transformers',
      'LangChain',
      'scikit-learn (RandomForest / GradientBoosting)',
    ],
    verifiedEvidence: [
      {
        projectTitle: 'RAG-Bot',
        proofPoint: 'FastAPI + ChromaDB + all-MiniLM-L6-v2 semantic search with page-level document citations.',
        repoUrl: 'https://github.com/ysathyasai/RAG-Bot',
      },
      {
        projectTitle: 'Composite Behavioral Modeling',
        proofPoint: 'Ensemble fraud detection using RandomForestClassifier, GradientBoostingClassifier, and LogisticRegression.',
        repoUrl: 'https://github.com/ysathyasai/Composite_Behavioral_Modeling',
      },
    ],
    positionOffset: [-6.0, 1.2, 2.6],
    accentColor: '#F59E0B',
  },
  {
    id: 'station-memory',
    name: 'Cognitive Memory Prism',
    stationLabel: 'Station 02 · Biomimetic Agent Memory & AST Cohorts',
    domainTitle: 'Stateful Code Review & Repository Context Pruning',
    summary:
      'Instead of stateless prompts that forget developer feedback, I build cognitive memory loops (recall, reflect, retain) and topological diff graphers that respect code dependency order.',
    coreTechnologies: [
      'Vectorize Hindsight Cloud',
      'Semantic Diff Cohort Graphing',
      'GitHub REST API Tree Pruning',
      'Mermaid.js AST Sanitization',
      'Tenacity Exponential Backoff',
      'Pytest Live Cloud Verification',
    ],
    verifiedEvidence: [
      {
        projectTitle: 'Kodex (HackwithHyderabad 3.0)',
        proofPoint: 'Biomimetic cognitive memory (recall, reflect, retain) + Semantic Dependency Cohort Graphing for PR reviews.',
        repoUrl: 'https://github.com/ysathyasai/Kodex',
      },
      {
        projectTitle: 'ContribReady',
        proofPoint: 'Prunes large GitHub repo trees and scores candidate files to onboard open-source contributors.',
        repoUrl: 'https://github.com/ysathyasai/ContribReady',
      },
    ],
    positionOffset: [-2.4, 1.5, -2.2],
    accentColor: '#38BDF8',
  },
  {
    id: 'station-voice',
    name: 'Indic Voice Transducer',
    stationLabel: 'Station 03 · Vernacular Speech & Multimodal AI',
    domainTitle: 'Regional Indian Language Voice AI & Media Pipelines',
    summary:
      'I integrate regional Speech-to-Text (STT) and Text-to-Speech (TTS) models with multimodal verification so rural and mobile users can interact naturally in their own language.',
    coreTechnologies: [
      'Sarvam AI (Indic STT / TTS)',
      'Gemini Flash Multimodal',
      'AssemblyAI',
      'yt-dlp & FFmpeg Audio Muxing',
      'Progressive Web Apps (PWA)',
    ],
    verifiedEvidence: [
      {
        projectTitle: 'Khet2Kitchen (SIH 2026 Finalist)',
        proofPoint: 'Vernacular voice lot registration and price discovery for smallholder farmers across India.',
        repoUrl: 'https://github.com/ysathyasai/Khet2Kitchen',
      },
      {
        projectTitle: 'Sentinel AI & Flask Video Downloader',
        proofPoint: 'Multimodal media inspection PWA and local-first FFmpeg audio/video processing queue.',
        repoUrl: 'https://github.com/ysathyasai/sentinel-ai',
      },
    ],
    positionOffset: [2.4, 1.5, -2.2],
    accentColor: '#10B981',
  },
  {
    id: 'station-fullstack',
    name: 'Django, React & Next.js Foundry',
    stationLabel: 'Station 04 · Full-Stack Web & Mobile Ecosystems',
    domainTitle: 'Production Web Architectures & Cross-Platform Apps',
    summary:
      'I architect end-to-end applications spanning Django 5.1 dual-channel marketplaces, React 19 + TypeScript + Three.js spatial interfaces, and Flutter + Firebase mobile companions.',
    coreTechnologies: [
      'Django 5.1 & FastAPI',
      'React 19 & Next.js 15',
      'TypeScript 5 & Tailwind CSS',
      'Three.js / WebGL',
      'Flutter 3.0+ & Dart',
      'Firebase & Docker Compose',
    ],
    verifiedEvidence: [
      {
        projectTitle: 'Khet2Kitchen (SIH 2026 Finalist)',
        proofPoint: 'Architected the Django 5.1 B2B/D2C marketplace engine with 124/124 passing automated tests.',
        repoUrl: 'https://github.com/ysathyasai/Khet2Kitchen',
      },
      {
        projectTitle: 'StudyHub',
        proofPoint: 'Cross-platform Flutter + Firebase mobile suite with Notes, Timetable, CGPA tracker, and Gemini tools.',
        repoUrl: 'https://github.com/ysathyasai/StudyHub',
      },
    ],
    positionOffset: [6.0, 1.2, 2.6],
    accentColor: '#EC4899',
  },
  {
    id: 'station-web3',
    name: 'Web3 Mesh Ledger',
    stationLabel: 'Station 05 · Cardano & On-Chain Transparency',
    domainTitle: 'Decentralized Escrow, NFT Proofs & Compute Markets',
    summary:
      'I build Web3 interfaces that bring cryptographic auditability to charitable donations and decentralized AI compute exchange on Cardano and Monad.',
    coreTechnologies: [
      'Cardano Blockchain',
      'Mesh SDK (1.9.0)',
      'Next.js 15 App Router',
      'NFT Proof Certificates',
      'Yoroi / Nami / Eternl Wallets',
      'Monad Ecosystem',
    ],
    verifiedEvidence: [
      {
        projectTitle: 'Cutthroat & AdaCompute',
        proofPoint: 'Next.js 15 + Cardano Mesh SDK donation platform with NFT proofs + IndiaCodex’26 AI compute exchange.',
        repoUrl: 'https://github.com/ysathyasai/Cutthroat',
      },
      {
        projectTitle: 'ImpactVault (Monad Blitz)',
        proofPoint: 'Milestone-based donation-to-impact verification prototyped at Monad Blitz Hyderabad.',
        repoUrl: 'https://github.com/ysathyasai',
      },
    ],
    positionOffset: [-2.8, 1.1, 4.5],
    accentColor: '#A855F7',
  },
  {
    id: 'station-systems',
    name: 'MicroKernel-OS & Enterprise Java Core',
    stationLabel: 'Station 06 · OS Kernels, Java/MySQL & Linux CLI',
    domainTitle: '32-Bit x86 C/Assembly, ACID JDBC & Cryptography',
    summary:
      'From writing BIOS bootloaders and preemptive PIT schedulers in C/Assembly to engineering ACID-compliant MySQL JDBC transactions with PBKDF2-HMAC-SHA256 in Java 17.',
    coreTechnologies: [
      'C & x86 Assembly (NASM)',
      'Java 17 (Swing / AWT / JDBC)',
      'MySQL 8.0 & ACID Transactions',
      'PBKDF2-HMAC-SHA256 Security',
      'StarUML System Modeling',
      'Linux / Bash / Termux',
    ],
    verifiedEvidence: [
      {
        projectTitle: 'YieldGrid (Java_CBP & SAD_CBP)',
        proofPoint: 'Java 17 + MySQL 8.0 D2C inventory system with PBKDF2 hashing, CWE-1236 CSV protection, 8 UML diagrams, and 53/53 tests.',
        repoUrl: 'https://github.com/ysathyasai/Java_CBP',
      },
      {
        projectTitle: 'MicroKernel-OS',
        proofPoint: '32-bit x86 microkernel with protected-mode transition, round-robin scheduler, kmalloc/kfree, and IPC.',
        repoUrl: 'https://github.com/ysathyasai/MicroKernel-OS',
      },
    ],
    positionOffset: [2.8, 1.1, 4.5],
    accentColor: '#06B6D4',
  },
];

export const AI_LAB_PIPELINES: AiLabPipeline[] = [
  {
    id: 'pipeline-kodex',
    name: 'Kodex Cognitive Memory & Cohort Grapher',
    projectLinked: 'Kodex (HackwithHyderabad 3.0)',
    summary:
      'Interactive simulation of how I prevent LLM attention drift and repeated rejected PR advice by combining topological file cohort ordering with Vectorize Hindsight biomimetic memory.',
    parameterLabel: 'Select PR Diff Ordering & Memory Mode',
    parameterOptions: [
      {
        label: 'Topological Cohort Order + Hindsight Memory (My Kodex Pipeline)',
        value: 'cohort-memory',
        stages: [
          {
            stage: '01. diff_parser.py Cohort Grapher',
            detail: 'Orders raw git hunks into Schema ➔ Logic ➔ API ➔ Tests ➔ Config so foundational data models are in context before endpoints.',
            metric: '5 Cohorts Ordered · Zero Context Drift',
          },
          {
            stage: '02. Hindsight recall() & reflect()',
            detail: 'Queries Vectorize Hindsight Cloud for prior team rejections and synthesizes repository-specific architectural invariants.',
            metric: 'Institutional Memory Active',
          },
          {
            stage: '03. Groq openai/gpt-oss-120b + retain()',
            detail: 'Executes low-latency review inference, sanitizes Mermaid.js sequence diagrams, and retains new developer feedback.',
            metric: '5/5 Live Cloud Pytest Passing',
          },
        ],
        engineeringTakeaway:
          'Ordering diffs by architectural dependency layer ensures the model understands schema mutations before judging controller logic, while retain() guarantees rejected advice is never repeated.',
      },
      {
        label: 'Baseline Stateless Alphabetical Diff (Conventional PR Bot)',
        value: 'stateless-alphabetical',
        stages: [
          {
            stage: '01. Alphabetical File Dump',
            detail: 'Processes api_routes.py before models.py simply because "a" comes before "m", causing false-positive type warnings.',
            metric: 'High Attention Dilution',
          },
          {
            stage: '02. Stateless Prompt Vacuum',
            detail: 'No historical memory of team conventions or previously rejected suggestions from earlier pull requests.',
            metric: '0% Institutional Recall',
          },
          {
            stage: '03. Unsanitized Output',
            detail: 'Repeats noisy style nitpicks and frequently breaks Mermaid diagram rendering on unescaped special characters.',
            metric: 'Repeated False Positives',
          },
        ],
        engineeringTakeaway:
          'Without topological cohort sorting and persistent memory, PR bots lose developer trust within a few sprints.',
      },
    ],
    repoUrl: 'https://github.com/ysathyasai/Kodex',
  },
  {
    id: 'pipeline-ragbot',
    name: 'RAG-Bot Semantic Vector & Citation Pipeline',
    projectLinked: 'RAG-Bot (FastAPI + ChromaDB + Groq)',
    summary:
      'Inspect the stage-by-stage document ingestion, local embedding generation, and grounded citation synthesis I built from scratch in RAG-Bot.',
    parameterLabel: 'Select Retrieval Strategy',
    parameterOptions: [
      {
        label: 'Dense Vector Top-K + Page Citation Grounding (RAG-Bot Default)',
        value: 'dense-grounded',
        stages: [
          {
            stage: '01. RecursiveCharacterTextSplitter',
            detail: 'Splits uploaded PDFs/docs into overlapping semantic chunks while preserving exact document name and page metadata.',
            metric: 'Chunk Overlap Preserved',
          },
          {
            stage: '02. all-MiniLM-L6-v2 + Persistent ChromaDB',
            detail: 'Generates 384-dimensional local sentence-transformer embeddings and queries persistent ChromaDB cosine similarity.',
            metric: '384-Dim Local Embeddings',
          },
          {
            stage: '03. Groq Llama-3.3-70b Grounded Synthesis',
            detail: 'Streams answers strictly anchored to retrieved chunks and attaches expandable source cards with page numbers.',
            metric: 'Page-Level Verifiable Citations',
          },
        ],
        engineeringTakeaway:
          'Running embeddings locally with sentence-transformers and ChromaDB keeps document indexing private and zero-cost while Groq handles fast cited synthesis.',
      },
      {
        label: 'Uncited Raw LLM Completion (No Vector Grounding)',
        value: 'uncited-raw',
        stages: [
          {
            stage: '01. No Document Indexing',
            detail: 'Relies purely on parametric model weights with zero access to private PDFs or updated technical manuals.',
            metric: 'No Local Knowledge Base',
          },
          {
            stage: '02. Unverifiable Claims',
            detail: 'Cannot provide page numbers, file names, or expandable source passages for user auditing.',
            metric: '0 Source Citations',
          },
        ],
        engineeringTakeaway:
          'Retrieval-Augmented Generation bridges private user documents with deterministic source attribution.',
      },
    ],
    repoUrl: 'https://github.com/ysathyasai/RAG-Bot',
  },
  {
    id: 'pipeline-cbm',
    name: 'CBM Ensemble Fraud Classification Pipeline',
    projectLinked: 'Composite Behavioral Modeling (6th Semester ML)',
    summary:
      'Explore how my Django + scikit-learn fraud detection platform combines multiple classifiers to evaluate behavioral, transactional, and network anomalies.',
    parameterLabel: 'Select Classifier Configuration',
    parameterOptions: [
      {
        label: 'Multi-Model Ensemble (RandomForest + GradientBoosting + LogisticRegression)',
        value: 'ensemble-triad',
        stages: [
          {
            stage: '01. Behavioral & Network Feature Extraction',
            detail: 'Ingests account age, social connection ratios, login velocity, and transaction telemetry via pandas & NumPy.',
            metric: 'Multi-Dimensional Behavioral Vector',
          },
          {
            stage: '02. Ensemble Classifier Benchmarking',
            detail: 'Trains RandomForestClassifier, GradientBoostingClassifier, and LogisticRegression side-by-side in the Service Provider portal.',
            metric: '3-Classifier Cross-Validation',
          },
          {
            stage: '03. Real-Time Prediction & .xls Audit Export',
            detail: 'Serves instant fraud status predictions to Remote Users and exports statistical ratio tables via xlwt.',
            metric: 'Live Render Deployment + .xls Audit',
          },
        ],
        engineeringTakeaway:
          'Combining bagging (Random Forest), boosting (Gradient Boosting), and linear baselines prevents single-classifier blind spots on skewed fraud datasets.',
      },
      {
        label: 'Single Static Rule Threshold (Legacy Fraud Check)',
        value: 'static-rule',
        stages: [
          {
            stage: '01. Rigid Single-Field Rules',
            detail: 'Flags transactions based only on static amount limits while missing coordinated behavioral identity theft.',
            metric: 'High False-Negative Rate',
          },
        ],
        engineeringTakeaway:
          'Static rules fail when attackers stay just below numeric thresholds; composite behavioral features catch subtle cross-signal anomalies.',
      },
    ],
    repoUrl: 'https://github.com/ysathyasai/Composite_Behavioral_Modeling',
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
      'A phygital agricultural disintermediation platform we developed for Smart India Hackathon 2026 (Problem Statement SIH26033, Ministry of Consumer Affairs / DoCA) that links rural farming collectives directly to bulk B2B buyers and residential RWAs via rural PACS micro-hubs.',
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
      'I served as Full-Stack Architect & Lead Software Engineer — I designed the Django 5.1 core architecture, dual-channel B2B/D2C transactional engine, relational database schema, REST APIs, and Render deployment pipeline.',
    collaborators: [
      { name: 'Yejju Sathya Sai (Me)', role: 'Full-Stack Architect • Lead Software Engineer', github: 'https://github.com/ysathyasai' },
      { name: 'Swayam', role: 'Team Lead • Product Strategy & Business Model Architecture' },
      { name: 'Shaik Mohammed Imaadh', role: 'AI/ML Engineer • Speech & Vision Systems' },
      { name: 'Dupalica', role: 'Frontend Architect • UI/UX & Design Systems' },
      { name: 'Afsha Siddiha', role: 'Supply Chain Specialist • Logistics & Policy' },
      { name: 'Karuneshwari', role: 'Quality Assurance & Testing Engineer (124 Suites)' },
    ],
    challengesAndLearnings: [
      'Designed zero-friction voice-first workflows for low-literacy rural users while maintaining strict transactional integrity across B2B and D2C inventory ledgers.',
      'Coordinated our 6-person multidisciplinary hackathon team across agritech policy, Indic voice AI, and full-stack engineering under SIH 2026 evaluation standards.',
    ],
    githubUrl: 'https://github.com/ysathyasai/Khet2Kitchen',
    liveUrl: 'https://khet2kitchen.onrender.com/',
    secondaryLiveUrl: 'https://k2k-intelligence-engine.onrender.com/',
    secondaryLiveLabel: 'K2K Intelligence Engine',
    worldLandmark: {
      name: 'K2K Smart Agritech Hub',
      description: 'Miniature solar-lit PACS micro-hub with voice-wave towers and farm-to-fork logistics rings.',
      position: [-10, 0, -92],
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
      'Built for HackwithHyderabad 3.0, Kodex transforms code review into an institutional peer reviewer with long-term memory. I combined Vectorize Hindsight Cloud biomimetic memory with Groq ultra-low-latency openai/gpt-oss-120b inference.',
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
      'I engineered the end-to-end cognitive review pipeline, semantic diff cohort grapher, Hindsight memory integration, Mermaid diagram sanitizer, and live 3-panel interactive web dashboard.',
    collaborators: [
      { name: 'Yejju Sathya Sai (Me)', role: 'Lead Systems & AI Engineer', github: 'https://github.com/ysathyasai' },
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
      position: [-5, 0, -96],
      accentColor: '#38BDF8',
      dioramaType: 'kodex',
    },
  },
  {
    id: 'yieldgrid',
    slug: 'yieldgrid',
    title: 'YieldGrid (Java & StarUML CBP)',
    subtitle: 'ACID-Compliant Farm-to-Retail Inventory System in Java 17, Swing & MySQL 8.0',
    category: 'fullstack',
    categoryLabel: 'Enterprise Java, Cryptography & System Design · VNR VJIET',
    year: '2026',
    status: '53/53 Verification Tests Passed · 8 StarUML Diagrams',
    featured: true,
    badgeText: 'VNR VJIET B.Tech CBP',
    problem:
      'Local agricultural producers lack a transparent, cryptographically secure desktop inventory and order-fulfillment ledger that enforces strict database atomicity without middleman markups.',
    summary:
      'Engineered at VNR VJIET for Object-Oriented Programming through Java and System Analysis & Design, YieldGrid is a native Java 17 Swing + MySQL 8.0 (Type-4 JDBC) D2C marketplace with salted PBKDF2-HMAC-SHA256 authentication, ACID rollback guarantees, and 8 StarUML architectural models.',
    architecture: [
      'ACID Transactional Inventory Engine: Uses explicit JDBC transaction boundaries (setAutoCommit(false) with atomic rollback on stock shortage) and 100% PreparedStatement parameter binding.',
      'Cryptographic Security & CSV Hardening: Implements salted PBKDF2WithHmacSHA256 (10,000 iterations, 16-byte SecureRandom salt) with legacy migration, plus CWE-1236 spreadsheet formula injection mitigation.',
      'Complete StarUML System Blueprint (SAD_CBP): Accompanied by 8 editable StarUML (.mdj) diagrams — Use Case, Activity, Class, Sequence, Communication, State Chart, Component, and Deployment.',
      'Automated Verification Suite: 53/53 passing integration and security tests in WorkflowVerificationTest.java.',
    ],
    techStack: [
      'Java 17+',
      'Java Swing & AWT (Nimbus UI)',
      'MySQL 8.0+',
      'JDBC Type-4',
      'PBKDF2-HMAC-SHA256',
      'StarUML (8 System Diagrams)',
    ],
    personalContribution:
      'I led the system architecture, PBKDF2 cryptographic security layer, CWE-1236 CSV export protection, Swing GUI implementation, StarUML modeling, and the 42-page technical report.',
    collaborators: [
      { name: 'Yejju Sathya Sai (Me)', role: 'Architecture, Security, GUI Development & Documentation', github: 'https://github.com/ysathyasai' },
      { name: 'Pervala Yashwanth', role: 'Full-Stack Java Development & Database Architecture' },
      { name: 'Shaik Abdul Rasheed', role: 'UI/UX Swing Engineering, QA & Verification Testing' },
    ],
    challengesAndLearnings: [
      'Designed seamless backward-compatible password migration that transparently upgrades legacy credentials to 10,000-iteration salted PBKDF2 hashes on login.',
      'Mapped 108 syllabus concepts across Units I–V directly to working production classes and a 53-test automated verification harness.',
    ],
    githubUrl: 'https://github.com/ysathyasai/Java_CBP',
    secondaryLiveUrl: 'https://github.com/ysathyasai/SAD_CBP',
    secondaryLiveLabel: 'StarUML Diagrams Repo (SAD_CBP)',
    documentationUrl: 'https://github.com/ysathyasai/Java_CBP/blob/main/YieldGrid_CBP_Project_Report.pdf',
    worldLandmark: {
      name: 'YieldGrid Java & UML Citadel',
      description: 'Interlocking crystalline database vaults and 8 orbital UML diagram plates.',
      position: [0, 0, -92],
      accentColor: '#F59E0B',
      dioramaType: 'java-enterprise',
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
      'A privacy-centric, mobile-first academic companion we built at the Government Institute of Electronics, Secunderabad that unifies structured notes, smart timetables, CGPA analytics, habit tracking, formula reference books, Pomodoro timers, and Google Gemini learning tools.',
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
      'As Project Developer & Documentation Lead, I implemented core application modules, workflow integration, and authored the capstone architectural documentation.',
    collaborators: [
      { name: 'Yejju Sathya Sai (Me)', role: 'Project Developer & Documentation', github: 'https://github.com/ysathyasai' },
      { name: 'Nanduri Eknadha Adithya Srivatsa', role: 'Project Lead & Full-Stack Developer', github: 'https://github.com/adithyasrivatsa' },
      { name: 'Mantol Saketh', role: 'Core Developer', github: 'https://github.com/saketh-nandu' },
      { name: 'Ventrapragada Purna Vikas', role: 'UI/UX Design, Frontend & Documentation', github: 'https://github.com/Purnavikas08' },
      { name: 'Katta Tejeshwar', role: 'Documentation & DevOps', github: 'https://github.com/KattaTejeshwar' },
      { name: 'Guttapalli Surya Prakash', role: 'Mobile Optimization', github: 'https://github.com/SuryaGuttapalli' },
      { name: 'Koganti Sai Charan', role: 'API Integration & Backend', github: 'https://github.com/KOGANTISAICHARAN' },
      { name: 'Kara Karthikeya', role: 'App Testing', github: 'https://github.com/karakarthikeya26-beep' },
      { name: 'Vankodvath Yekeshwar Naik', role: 'Database & Security', github: 'https://github.com/yekeshwar-naik' },
      { name: 'Neerati Sri Krishna Teja', role: 'Feature Development', github: 'https://github.com/srikrishnateja55' },
    ],
    challengesAndLearnings: [
      'Coordinated Git branching, pull-request reviews, and module integration across our 10-developer student engineering team.',
      'Balanced rich multi-tool academic dashboards (GPA trends, syllabus trackers, Pomodoro cycles) within a clean mobile-first navigation hierarchy.',
    ],
    githubUrl: 'https://github.com/ysathyasai/StudyHub',
    liveUrl: 'https://github.com/ysathyasai/StudyHub/releases/download/StudyHub/StudyHub.apk',
    documentationUrl: 'https://raw.githubusercontent.com/ysathyasai/StudyHub/main/docs/Group%20Document.pdf',
    worldLandmark: {
      name: 'StudyHub Smart Campus',
      description: 'Miniature smart university rotunda with orbital schedule rings and AI study terminals.',
      position: [5, 0, -96],
      accentColor: '#10B981',
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
      'A Django and scikit-learn fraud risk evaluation system I built that separates Remote User real-time prediction workflows from a Service Provider ML training, model accuracy comparison, and statistical audit portal.',
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
      'I served as Lead Developer — I implemented the scikit-learn feature preprocessing pipeline, ensemble classifier views, Django templates, and Render production blueprint.',
    collaborators: [
      { name: 'Yejju Sathya Sai (Me)', role: 'Lead Developer & ML Integrator', github: 'https://github.com/ysathyasai' },
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
      position: [10, 0, -92],
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
      'An AI-powered contributor onboarding platform I built that ingests any GitHub issue URL, prunes the repository tree, scores relevant files, explains prerequisite concepts, and administers a readiness quiz before the developer opens a pull request.',
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
      'I designed and built the full-stack React 19 + Express application, repository tree pruning engine, and interactive contributor readiness assessment flow for Hacktoberfest Hack Day 2026.',
    collaborators: [
      { name: 'Yejju Sathya Sai (Me)', role: 'Creator & Full-Stack Developer', github: 'https://github.com/ysathyasai' },
    ],
    challengesAndLearnings: [
      'Engineered repository tree pruning heuristics so large codebases fit cleanly within LLM context windows without losing critical module relationships.',
    ],
    githubUrl: 'https://github.com/ysathyasai/ContribReady',
    worldLandmark: {
      name: 'ContribReady Launchpad',
      description: 'Holographic Git tree analyzer and contributor readiness gate.',
      position: [-8, 0, -104],
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
      'My suite of Web3 builds spanning Cutthroat (a verified Next.js 15 + Cardano Mesh SDK decentralized donation platform with NFT proof certificates), AdaCompute (decentralized AI compute exchange explored for Cardano IndiaCodex’26), and ImpactVault (transparent donation-to-impact tracking explored at Monad Blitz).',
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
      'I developed the Next.js + Mesh SDK wallet and transaction interfaces in Cutthroat and collaborated on the Cardano IndiaCodex’26 (AdaCompute) and Monad Blitz (ImpactVault) hackathon builds.',
    collaborators: [
      { name: 'Yejju Sathya Sai (Me)', role: 'Web3 & Full-Stack Developer', github: 'https://github.com/ysathyasai' },
      { name: 'Hackathon Team Collaborators', role: 'Smart Contract & Protocol Design (IndiaCodex’26 / Monad Blitz)' },
    ],
    challengesAndLearnings: [
      'Integrated asynchronous Cardano wallet state management (Nami, Eternl, Yoroi) with modern Next.js 15 App Router components.',
    ],
    githubUrl: 'https://github.com/ysathyasai/Cutthroat',
    worldLandmark: {
      name: 'Web3 Escrow & Impact Vault',
      description: 'Interlocking cryptographic rings representing Cardano compute nodes and transparent impact vaults.',
      position: [8, 0, -104],
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
      'A pair of self-hosted Python utilities I created: Flask Video Downloader provides a clean local-first web UI over yt-dlp and FFmpeg (running on Windows, macOS, Linux, and Android Termux), while RAG-Bot delivers local ChromaDB vector search with Groq Llama-3.3-70b source citations.',
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
      'I built and maintain both repositories from scratch, including cross-platform Termux installation scripts and FastAPI RAG endpoints.',
    collaborators: [
      { name: 'Yejju Sathya Sai (Me)', role: 'Creator & Maintainer', github: 'https://github.com/ysathyasai' },
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
      position: [-3, 0, -104],
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
      'I explored and maintained the kernel subsystems and build automation alongside open-source collaborators (ArchieTUX for MicroKernel-OS; Adithya Srivatsa for Sentinel AI).',
    collaborators: [
      { name: 'Yejju Sathya Sai (Me)', role: 'Systems & AI Contributor', github: 'https://github.com/ysathyasai' },
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
      position: [3, 0, -104],
      accentColor: '#14B8A6',
      dioramaType: 'kernel',
    },
  },
];

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'cs-khet2kitchen',
    projectId: 'khet2kitchen',
    title: 'Khet2Kitchen (K2K) — SIH 2026 Finalist Architecture',
    subtitle: 'Disintermediating the 5-Tier Mandi Chain with Django 5.1, Sarvam AI & Gemini Flash',
    contextBadge: 'SIH26033 Finalist · 124/124 Tests Passing',
    problemStatement:
      'Indian smallholder farmers lose up to 68% of the final consumer price across 5 intermediary layers while facing language barriers on text-heavy digital marketplaces.',
    systemArchitecture: [
      'Dual-Channel Transactional Core: Unified Django 5.1 relational schema supporting both high-volume B2B commercial bidding and D2C residential RWA group aggregation.',
      'Vernacular Voice Ingestion: Sarvam AI STT/TTS allows farmers to list crop lots and receive price advisories in regional Indian languages.',
      'Gemini Flash Price & Grade Synthesis: Evaluates market supply-demand signals to recommend fair floor prices.',
    ],
    keyDecisions: [
      {
        decision: 'Modular Monolith in Django 5.1 over Fragmented Microservices',
        rationale:
          'Guaranteed strict ACID inventory consistency between B2B and D2C channels and enabled our team to maintain 124/124 passing automated tests under hackathon deadlines.',
      },
      {
        decision: 'Dedicated Intelligence Engine Service (k2k-intelligence-engine)',
        rationale:
          'Decoupled heavy AI price/vision inference from core checkout transactions so marketplace orders remain responsive.',
      },
    ],
    verificationProof: '124/124 automated unit and integration tests passing; live on Render.',
    myRole: 'Full-Stack Architect & Lead Software Engineer (Django Core, B2B/D2C Engine, DB Schema, APIs & DevOps).',
    githubUrl: 'https://github.com/ysathyasai/Khet2Kitchen',
    liveUrl: 'https://khet2kitchen.onrender.com/',
  },
  {
    id: 'cs-kodex',
    projectId: 'kodex',
    title: 'Kodex — Stateful Cognitive PR Review Engine',
    subtitle: 'Solving Stateless AI Review Amnesia with Vectorize Hindsight & AST Cohort Graphing',
    contextBadge: 'HackwithHyderabad 3.0 · 5/5 Live Cloud Pytest',
    problemStatement:
      'Developers mute conventional AI code review bots because they process files alphabetically (losing cross-file context) and forget immediately when a team rejects a rule.',
    systemArchitecture: [
      'Topological Diff Parser (diff_parser.py): Classifies git diff hunks into Schema ➔ Logic ➔ API ➔ Tests ➔ Config cohorts before prompt construction.',
      'Biomimetic Memory Loop: Calls Vectorize Hindsight recall() before review, reflect() during synthesis, and retain() when engineers reply.',
      'Deterministic Mermaid Sanitizer: Validates and repairs LLM-generated Mermaid.js sequence diagrams prior to UI rendering.',
    ],
    keyDecisions: [
      {
        decision: 'Dependency-Ordered Cohorts over Raw Diffs',
        rationale:
          'Ensures the LLM sees database schema changes before evaluating service logic or API controllers, eliminating false-positive hallucinations.',
      },
      {
        decision: 'Groq openai/gpt-oss-120b + Tenacity Retry Layer',
        rationale:
          'Delivers sub-second multi-cohort reasoning with exponential backoff resilience against rate spikes.',
      },
    ],
    verificationProof: '5/5 live cloud pytest verification suite passing; Dockerized and live on Render.',
    myRole: 'Lead Systems & AI Engineer (end-to-end architecture, diff cohort parser, Hindsight integration, UI).',
    githubUrl: 'https://github.com/ysathyasai/Kodex',
    liveUrl: 'https://kodex-code-review-agent.onrender.com',
  },
  {
    id: 'cs-yieldgrid',
    projectId: 'yieldgrid',
    title: 'YieldGrid — Enterprise Java 17 & StarUML System Design',
    subtitle: 'ACID Inventory Management with Salted PBKDF2-HMAC-SHA256 & CWE-1236 Protection',
    contextBadge: 'VNR VJIET CBP · 53/53 Tests · 8 UML Models',
    problemStatement:
      'Academic desktop CRUD projects often cut corners on security and concurrency — storing plaintext passwords, concatenating SQL strings, and allowing partial inventory writes on failure.',
    systemArchitecture: [
      'Layered DAO + Service + Swing Architecture: Clean separation between MySQL 8.0 JDBC Type-4 DAOs, transactional business services, and the custom Nimbus Swing GUI.',
      'Cryptographic Credential Layer (PasswordUtil.java): 10,000-iteration PBKDF2WithHmacSHA256 with 16-byte random salt and automatic legacy account upgrade.',
      '8 StarUML Architectural Diagrams (SAD_CBP): Full forward and reverse engineering alignment across Use Case, Class, Sequence, State Chart, and Deployment views.',
    ],
    keyDecisions: [
      {
        decision: 'Explicit JDBC Transaction Rollbacks (setAutoCommit(false))',
        rationale:
          'Prevents phantom order creation or negative crop stock if a multi-item checkout fails midway.',
      },
      {
        decision: 'CWE-1236 Formula Injection Escaping in CSV Exports',
        rationale:
          'Sanitizes leading =, +, -, and @ characters in exported financial ledgers so malicious crop names cannot execute formulas in Excel.',
      },
    ],
    verificationProof: '53/53 automated checks passing in WorkflowVerificationTest.java + 42-page engineering report.',
    myRole: 'Architecture, Security, GUI Development, StarUML Modeling & Documentation.',
    githubUrl: 'https://github.com/ysathyasai/Java_CBP',
  },
  {
    id: 'cs-cbm',
    projectId: 'composite-behavioral-modeling',
    title: 'Composite Behavioral Modeling — Fraud Analytics',
    subtitle: 'Benchmarking Ensemble Classifiers on Behavioral & Network Telemetry',
    contextBadge: '6th Semester ML · Live Render Deployment',
    problemStatement:
      'Single-classifier fraud models either overfit on historical noise or miss coordinated identity theft across behavioral and social-graph dimensions.',
    systemArchitecture: [
      'Dual-Role Django Architecture: Dedicated Remote User prediction views and Service Provider model-training/audit dashboards.',
      'Scikit-Learn Ensemble Triad: Evaluates RandomForestClassifier, GradientBoostingClassifier, and LogisticRegression on preprocessed behavioral vectors.',
      'Offline Compliance Export: Generates downloadable .xls statistical audit workbooks via xlwt.',
    ],
    keyDecisions: [
      {
        decision: 'Transparent Cloud Compute Documentation (0.5 CPU Render Limit)',
        rationale:
          'Documented exact memory/CPU trade-offs when running live ensemble training on free-tier cloud containers vs. local execution.',
      },
    ],
    verificationProof: 'Live production blueprint deployed on Render + full academic project report.',
    myRole: 'Lead Developer & ML Integrator.',
    githubUrl: 'https://github.com/ysathyasai/Composite_Behavioral_Modeling',
    liveUrl: 'https://composite-behavioral-modeling-abci.onrender.com/',
  },
];

export const OPEN_SOURCE_REPOS: OpenSourceRepo[] = [
  {
    id: 'repo-termux',
    name: 'Termux',
    language: 'Shell / Linux',
    license: 'Apache-2.0',
    starsLabel: '30 ★ on GitHub',
    summary: 'My comprehensive open-source guide to Android Termux fundamentals, terminal customization, package management, and mobile Linux workflows.',
    highlights: ['Most-starred repository on my GitHub profile (30 stars)', 'Covers shell setup, SSH, and CLI tooling on Android'],
    url: 'https://github.com/ysathyasai/Termux',
  },
  {
    id: 'repo-khet2kitchen',
    name: 'Khet2Kitchen & K2K',
    language: 'Python / Django 5.1',
    license: 'MIT',
    starsLabel: 'SIH 2026 Finalist',
    summary: 'Full-stack farm-to-kitchen supply chain platform with Sarvam AI Indic voice STT/TTS, Gemini Flash reasoning, and 124 passing test suites.',
    highlights: ['Dual B2B & D2C marketplace engine', 'Companion k2k-intelligence-engine microservice'],
    url: 'https://github.com/ysathyasai/Khet2Kitchen',
  },
  {
    id: 'repo-kodex',
    name: 'Kodex',
    language: 'Python',
    license: 'MIT',
    starsLabel: 'HackwithHyderabad 3.0',
    summary: 'Biomimetic cognitive memory code review agent using Vectorize Hindsight Cloud and Groq openai/gpt-oss-120b.',
    highlights: ['Semantic Dependency Cohort Graphing (diff_parser.py)', '5/5 live cloud pytest verification'],
    url: 'https://github.com/ysathyasai/Kodex',
  },
  {
    id: 'repo-java-cbp',
    name: 'Java_CBP & SAD_CBP (YieldGrid)',
    language: 'Java 17 / StarUML',
    license: 'Academic Open Source',
    starsLabel: '53/53 Tests · 8 UML Models',
    summary: 'ACID-compliant D2C farm-to-retail inventory management desktop suite in Java Swing & MySQL 8.0 paired with 8 StarUML system design diagrams.',
    highlights: ['Salted PBKDF2-HMAC-SHA256 authentication', '42-page engineering report & 108-topic syllabus map'],
    url: 'https://github.com/ysathyasai/Java_CBP',
  },
  {
    id: 'repo-studyhub',
    name: 'StudyHub',
    language: 'Dart / Flutter',
    license: 'GPL-3.0',
    starsLabel: '3 ★ · Android APK Release',
    summary: 'Unified student productivity ecosystem featuring Notes, Timetable, GPA/CGPA tracking, Habit Tracker, Pomodoro, and Gemini study tools.',
    highlights: ['Built with a 10-member engineering team', 'Native Android APK release published on GitHub'],
    url: 'https://github.com/ysathyasai/StudyHub',
  },
  {
    id: 'repo-rag-bot',
    name: 'RAG-Bot',
    language: 'Python / FastAPI',
    license: 'GPL-3.0',
    starsLabel: 'Full-Stack Vector RAG',
    summary: 'Retrieval-Augmented Generation assistant built from scratch with FastAPI, ChromaDB, sentence-transformers, and Groq Llama-3.3-70b.',
    highlights: ['384-dim local embeddings (all-MiniLM-L6-v2)', 'Expandable page-level source citations'],
    url: 'https://github.com/ysathyasai/RAG-Bot',
  },
  {
    id: 'repo-contribready',
    name: 'ContribReady',
    language: 'JavaScript / React 19',
    license: 'MIT',
    starsLabel: 'Hacktoberfest Hack Day',
    summary: 'Converts any GitHub issue URL into a pruned repo tree, file relevance scores, concept cards, and an interactive contributor readiness quiz.',
    highlights: ['Multi-provider AI (Gemini, Groq, Ollama)', 'Built for Hacktoberfest Hack Day 2026'],
    url: 'https://github.com/ysathyasai/ContribReady',
  },
  {
    id: 'repo-quotes-cli',
    name: 'motivational-quotes-script',
    language: 'Python / Shell',
    license: 'Apache-2.0',
    starsLabel: '3 ★ · Cross-Platform CLI',
    summary: 'Terminal session startup script for .bashrc and .zshrc with local JSON caching, API fetching, and colorama styling across Linux, macOS, Windows, and Termux.',
    highlights: ['Zero-latency offline cache fallback', 'Interactive CLI flags for adding and listing quotes'],
    url: 'https://github.com/ysathyasai/motivational-quotes-script',
  },
];

export const HACKATHON_ARENAS: HackathonArena[] = [
  {
    id: 'arena-sih-2026',
    event: 'Smart India Hackathon (SIH 2026)',
    year: '2026',
    distinction: 'National Finalist — Problem Statement SIH26033 (Ministry of Consumer Affairs / DoCA)',
    projectBuilt: 'Khet2Kitchen (K2K)',
    myRole: 'Full-Stack Architect & Lead Software Engineer',
    teamSummary: '6-member team: Yejju Sathya Sai (Me), Swayam, Shaik Mohammed Imaadh, Dupalica, Afsha Siddiha, Karuneshwari.',
    outcome: 'Shipped dual-channel B2B/D2C Django 5.1 platform + Sarvam AI Indic voice + Gemini Flash grading with 124/124 passing automated tests.',
    repoUrl: 'https://github.com/ysathyasai/Khet2Kitchen',
    liveUrl: 'https://khet2kitchen.onrender.com/',
    accentHex: '#F59E0B',
  },
  {
    id: 'arena-hwh-3',
    event: 'HackwithHyderabad 3.0',
    year: '2026',
    distinction: 'Shipped Live Cloud Agentic Build',
    projectBuilt: 'Kodex — Cognitive Code Review Agent',
    myRole: 'Lead Systems & AI Engineer',
    teamSummary: 'Designed and engineered the complete biomimetic memory and AST diff cohort pipeline.',
    outcome: 'Integrated Vectorize Hindsight Cloud (recall, reflect, retain) + Groq openai/gpt-oss-120b with 5/5 passing live cloud pytest suite.',
    repoUrl: 'https://github.com/ysathyasai/Kodex',
    liveUrl: 'https://kodex-code-review-agent.onrender.com',
    accentHex: '#38BDF8',
  },
  {
    id: 'arena-hacktoberfest',
    event: 'Hacktoberfest Hack Day 2026',
    year: '2026',
    distinction: 'Open-Source Developer Tooling Sprint',
    projectBuilt: 'ContribReady',
    myRole: 'Creator & Full-Stack Developer',
    teamSummary: 'Solo full-stack build in React 19, Vite, Tailwind CSS, and Node.js/Express.',
    outcome: 'Built automated GitHub issue context pruning, candidate file scoring, and interactive contributor readiness quizzes.',
    repoUrl: 'https://github.com/ysathyasai/ContribReady',
    accentHex: '#10B981',
  },
  {
    id: 'arena-cardano',
    event: "Cardano IndiaCodex'26 & Ecosystem Builds",
    year: '2025 – 2026',
    distinction: 'Web3 & Decentralized Compute Exploration',
    projectBuilt: 'AdaCompute & Cutthroat',
    myRole: 'Web3 & Full-Stack Developer',
    teamSummary: 'Built Cutthroat (Next.js 15 + Mesh SDK) and collaborated on AdaCompute for Cardano IndiaCodex’26.',
    outcome: 'Implemented Cardano wallet integration (Nami, Eternl, Yoroi), smart contract escrow flows, and NFT donation certificates.',
    repoUrl: 'https://github.com/ysathyasai/Cutthroat',
    accentHex: '#A855F7',
  },
  {
    id: 'arena-monad',
    event: 'Monad Blitz Hyderabad',
    year: '2026',
    distinction: 'High-Throughput Web3 Builder Sprint',
    projectBuilt: 'ImpactVault',
    myRole: 'Full-Stack & Protocol Collaborator',
    teamSummary: 'Collaborated with Hyderabad Web3 builders during the Monad Blitz sprint.',
    outcome: 'Prototyped transparent donation-to-impact milestone verification and audit trails.',
    repoUrl: 'https://github.com/ysathyasai/Cutthroat',
    accentHex: '#6366F1',
  },
];

export const EXPERIENCE_TRACKS: ExperienceTrack[] = [
  {
    id: 'exp-flagship-architect',
    category: 'Flagship Systems Architecture',
    period: '2025 – 2026',
    roleTitle: 'Full-Stack Architect & Lead AI Systems Engineer (Hackathon & Capstone Builds)',
    organizationOrContext: 'Khet2Kitchen (SIH 2026 Finalist) · Kodex (HackwithHyderabad 3.0)',
    summary:
      'Rather than claiming unverified corporate titles, my strongest engineering track record comes from architecting production-grade hackathon and academic systems from zero to live cloud deployment.',
    deliverables: [
      'Architected Khet2Kitchen’s Django 5.1 B2B/D2C core, database schema, and Render deployment backed by 124/124 automated tests.',
      'Designed Kodex’s topological diff cohort grapher (diff_parser.py) and Vectorize Hindsight cognitive memory integration.',
    ],
    proofUrl: 'https://github.com/ysathyasai/Khet2Kitchen',
  },
  {
    id: 'exp-team-engineering',
    category: 'Collaborative Team Engineering',
    period: '2025 – Present',
    roleTitle: 'Core Developer, Security Lead & System Modeler in Multi-Engineer Teams',
    organizationOrContext: 'VNR VJIET (YieldGrid 3-Member Team) · GIOE (StudyHub 10-Member Team)',
    summary:
      'Experienced in coordinating Git workflows, StarUML architectural specifications, database schemas, and QA test suites across 3-to-10 person student engineering teams.',
    deliverables: [
      'Engineered PBKDF2-HMAC-SHA256 authentication, ACID JDBC rollbacks, and 8 StarUML diagrams for YieldGrid at VNR VJIET (53/53 passing tests).',
      'Co-developed StudyHub’s Flutter + Firebase + Gemini mobile modules and capstone documentation across a 10-developer team at GIOE.',
    ],
    proofUrl: 'https://github.com/ysathyasai/Java_CBP',
  },
  {
    id: 'exp-open-source',
    category: 'Open-Source & Developer Tooling',
    period: '2023 – Present',
    roleTitle: 'Open-Source Author & Maintainer (28 Public Repositories)',
    organizationOrContext: 'GitHub (@ysathyasai) · Linux / Termux / Python / React Community',
    summary:
      'Consistently building and documenting free, local-first tools, terminal enhancements, and educational guides for developers and students.',
    deliverables: [
      'Authored the 30-star Termux open-source guide and Apache-2.0 cross-platform CLI scripts.',
      'Published RAG-Bot (GPL-3.0), Flask Video Downloader (MIT), and ContribReady (MIT).',
    ],
    proofUrl: 'https://github.com/ysathyasai?tab=repositories',
  },
  {
    id: 'exp-academic-research',
    category: 'Academic & Enterprise Engineering',
    period: '2023 – Present',
    roleTitle: 'Undergraduate AI & ML Researcher & Builder',
    organizationOrContext: 'VNR VJIET (B.Tech CSE AI & ML) · GIOE Secunderabad (Diploma AI & ML)',
    summary:
      'Bridging formal coursework in machine learning, object-oriented Java, operating systems, and software engineering with deployed software.',
    deliverables: [
      'Built Composite Behavioral Modeling (ensemble ML fraud detection in Django + scikit-learn) for my 6th-semester project.',
      'Explored 32-bit x86 protected-mode OS internals in MicroKernel-OS.',
    ],
    proofUrl: 'https://github.com/ysathyasai/Composite_Behavioral_Modeling',
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
      'I architected the full-stack Django 5.1 core and dual-channel B2B/D2C marketplace engine for Khet2Kitchen, combining Sarvam AI Indic voice STT/TTS with Google Gemini reasoning to disintermediate agricultural supply chains.',
    verifiedOutcome: '124/124 passing automated tests and live cloud platform deployed on Render.',
    sourceUrl: 'https://github.com/ysathyasai/Khet2Kitchen',
    starPosition: [24, 4.2, -178],
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
      'I engineered Kodex using Vectorize Hindsight Cloud biomimetic memory (recall, reflect, retain) and Groq openai/gpt-oss-120b inference so AI code review bots remember team architectural decisions and never repeat rejected advice.',
    verifiedOutcome: 'Shipped with Semantic Dependency Cohort Graphing (diff_parser.py), 5/5 live cloud pytest suite, and Docker Compose.',
    sourceUrl: 'https://github.com/ysathyasai/Kodex',
    starPosition: [28, 5.5, -182],
    color: '#38BDF8',
  },
  {
    id: 'node-yieldgrid-vnrvjiet',
    title: 'VNR VJIET Enterprise Java & StarUML Benchmark',
    event: 'VNR Vignana Jyothi Institute of Engineering & Technology (CSE AI & ML)',
    date: '2026',
    category: 'Certification & Community',
    projectLinked: 'YieldGrid (Java_CBP & SAD_CBP)',
    story:
      'I engineered YieldGrid’s salted PBKDF2-HMAC-SHA256 security layer, ACID MySQL transaction engine, and 8 StarUML system diagrams, mapping 108 OOP syllabus concepts into a verified desktop application.',
    verifiedOutcome: '53/53 automated verification tests passed + 42-page technical report.',
    sourceUrl: 'https://github.com/ysathyasai/Java_CBP',
    starPosition: [32, 4.8, -177],
    color: '#10B981',
  },
  {
    id: 'node-cardano-indiacodex',
    title: "Cardano IndiaCodex'26 & Decentralized Donations",
    event: "Cardano IndiaCodex'26 & Monad Blitz Hyderabad",
    date: '2025 – 2026',
    category: 'Web3 Build',
    projectLinked: 'Cutthroat, AdaCompute & ImpactVault',
    story:
      'I explored decentralized AI compute exchange on Cardano with AdaCompute, prototyped ImpactVault at Monad Blitz, and built Cutthroat with Next.js 15 and Cardano Mesh SDK.',
    verifiedOutcome: 'Public Cutthroat repository shipped with Next.js 15.5.3, TypeScript 5, and Cardano Mesh SDK.',
    sourceUrl: 'https://github.com/ysathyasai/Cutthroat',
    starPosition: [35, 5.2, -181],
    color: '#A855F7',
  },
  {
    id: 'node-termux-opensource',
    title: '30+ GitHub Stars on Termux Guide & Hacktoberfest Build',
    event: 'GitHub Open-Source Community & Hacktoberfest Hack Day 2026',
    date: '2024 – 2026',
    category: 'Open Source',
    projectLinked: 'Termux & ContribReady',
    story:
      'My open-source Android Termux guide earned 30 stars from developers worldwide, and I built ContribReady to help new contributors navigate large GitHub repositories.',
    verifiedOutcome: '28 public repositories maintained across Python, TypeScript, Java, Dart, and C.',
    sourceUrl: 'https://github.com/ysathyasai/Termux',
    starPosition: [27, 3.3, -183],
    color: '#EC4899',
  },
  {
    id: 'node-genai-outskill',
    title: 'Generative AI Mastermind & GIOE AI/ML Capstone',
    event: 'Outskill Generative AI Mastermind & Government Institute of Electronics',
    date: '2025 – 2026',
    category: 'Certification & Community',
    projectLinked: 'StudyHub & Composite Behavioral Modeling',
    story:
      'Completed the Outskill Generative AI Mastermind certification while shipping StudyHub (Flutter + Firebase + Gemini APK) and Composite Behavioral Modeling (scikit-learn fraud detection).',
    verifiedOutcome: 'Verified Android APK release and live Render ML deployment.',
    sourceUrl: 'https://github.com/ysathyasai/StudyHub',
    starPosition: [33, 3.6, -179],
    color: '#06B6D4',
  },
];

export const PLAYGROUND_CHALLENGES = [
  {
    id: 'challenge-kodex-cohorts',
    title: 'Challenge 01: Kodex Semantic Diff Cohort Sorter',
    subtitle: 'Order a scrambled Pull Request diff into the exact topological sequence my diff_parser.py uses so the LLM never hallucinates.',
    correctOrder: ['schema', 'logic', 'api', 'tests', 'config'],
    items: [
      { id: 'api', label: 'controllers/order_api.py (REST Endpoint)', hint: 'Depends on business service logic' },
      { id: 'config', label: 'docker-compose.yml (Deployment Config)', hint: 'Evaluated last after all code & tests pass' },
      { id: 'schema', label: 'models/crop_lot.py (Database Schema)', hint: 'Foundational data structure — must be read first!' },
      { id: 'tests', label: 'tests/test_orders.py (Verification Suite)', hint: 'Verifies the API and service logic' },
      { id: 'logic', label: 'services/pricing_engine.py (Domain Logic)', hint: 'Transforms schema models before exposing to API' },
    ],
    successMessage:
      'Optimal Cohort Sequence Unlocked! Ordering diffs into Schema ➔ Logic ➔ API ➔ Tests ➔ Config is how my Kodex agent prevents context dilution on multi-file pull requests.',
  },
  {
    id: 'challenge-yieldgrid-security',
    title: 'Challenge 02: YieldGrid Security & ACID Audit',
    subtitle: 'Assemble the three security and transactional layers in the exact sequence executed during a farmer login & crop checkout in YieldGrid.',
    correctOrder: ['pbkdf2', 'prepared', 'acid'],
    items: [
      { id: 'acid', label: '03. JDBC setAutoCommit(false) & Atomic Commit/Rollback', hint: 'Finalizes stock decrement and order creation atomically' },
      { id: 'pbkdf2', label: '01. Salted PBKDF2WithHmacSHA256 (10,000 Iterations)', hint: 'Verifies user credentials at login before session access' },
      { id: 'prepared', label: '02. Typed PreparedStatement Parameter Binding', hint: 'Prevents SQL injection when querying crop catalog' },
    ],
    successMessage:
      'ACID & Cryptographic Pipeline Verified! This exact 3-stage pipeline powers all 53 passing tests in my YieldGrid Java_CBP repository.',
  },
];

export const TERMINAL_EASTER_EGGS: Record<string, string> = {
  help: 'Available commands: whoami, education, vnrvjiet, gioe, projects, sih, kodex, yieldgrid, kernel, stack, brainteaser, contact, open <project>, clear',
  whoami:
    'I am Yejju Sathya Sai (@ysathyasai) — AI/ML Developer & Full-Stack Engineer in Hyderabad, India. Currently pursuing my B.Tech in CSE (AI & ML) at VNR VJIET after completing my Diploma in AI & ML at GIOE Secunderabad.',
  education:
    '1) B.Tech in CSE (AI & ML) at VNR VJIET, Hyderabad (Current, 2nd Year). 2) Diploma in AI & ML at Government Institute of Electronics (GIOE), Secunderabad (2023–2026).',
  vnrvjiet:
    'VNR Vignana Jyothi Institute of Engineering & Technology, Hyderabad — Department of CSE (AI & ML). Flagship CBP: YieldGrid (Java 17, Swing, MySQL 8.0, PBKDF2 security, 8 StarUML diagrams, 53/53 passing tests).',
  gioe:
    'Government Institute of Electronics, Secunderabad — Department of AI & ML (2023–2026). Flagship builds: StudyHub (10-member Flutter + Firebase + Gemini APK) & Composite Behavioral Modeling (Django + scikit-learn fraud ensemble).',
  projects:
    'Featured builds: [1] Khet2Kitchen (SIH 2026 Finalist) [2] Kodex (HackwithHyderabad 3.0) [3] YieldGrid (Java 17 & StarUML CBP) [4] StudyHub (Flutter APK) [5] Composite Behavioral Modeling (ML Fraud Detection) [6] ContribReady [7] Cutthroat / AdaCompute / ImpactVault [8] Flask Video Downloader & RAG-Bot [9] MicroKernel-OS. Type "open khet2kitchen", "open kodex", or "open yieldgrid" to inspect!',
  sih:
    'Khet2Kitchen (SIH26033 Finalist): I architected the Django 5.1 B2B/D2C engine, database schema, and Render pipeline alongside my 6-member team, integrating Sarvam AI Indic voice STT/TTS and Gemini Flash (124/124 passing test suites).',
  kodex:
    'Kodex (HackwithHyderabad 3.0): My cognitive PR review agent using Vectorize Hindsight Cloud (recall, reflect, retain), Semantic Dependency Cohort Graphing (Schema -> Logic -> API -> Tests -> Config), and Groq openai/gpt-oss-120b.',
  yieldgrid:
    'YieldGrid (Java_CBP & SAD_CBP at VNR VJIET): My D2C farm-to-retail inventory system in Java 17 Swing & MySQL 8.0 with salted PBKDF2-HMAC-SHA256 hashing, CWE-1236 CSV protection, 8 StarUML diagrams, and 53/53 passing tests.',
  kernel:
    'MicroKernel-OS: 32-bit x86 educational microkernel in C & Assembly featuring a 0x7C00 BIOS bootloader, protected-mode transition, PIT preemptive round-robin task scheduler, kmalloc/kfree, and IPC.',
  stack:
    'Languages & Frameworks: Python (Django 5.1, FastAPI, Flask, scikit-learn), Java 17 (Swing, JDBC, MySQL 8.0), TypeScript/React 19/Next.js 15/Three.js, Dart/Flutter, C & x86 Assembly, Linux/Bash/Termux.',
  brainteaser:
    'Easter Egg Unlocked! On my GitHub profile README (ysathyasai/ysathyasai), "A Little Brain Teaser" links to my secret Gists: gist.github.com/ysathyasai/4791099196b95935e18c8752e4346fb5 & 8b0ef6dcc56565adaacabc3984731300 🧠',
  contact:
    'Reach me directly at ysathyasai.dev@gmail.com | GitHub: github.com/ysathyasai | LinkedIn: linkedin.com/in/ysathyasai',
  sudo: 'Nice try! Root access to my 32-bit x86 MicroKernel-OS requires passing ring-0 interrupt verification ;)',
};
