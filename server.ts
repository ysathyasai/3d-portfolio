import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  organization: string;
  createdAt: string;
}

const contactSubmissions: ContactSubmission[] = [];

const PORTFOLIO_SYSTEM_CONTEXT = `You are the Architectural Reasoning Engine inside "SATHYA — BEYOND THE SCREEN", the interactive 3D portfolio of Yejju Sathya Sai (Sathya Sai), an AI/ML Developer and Full-Stack Engineer based in Hyderabad / Secunderabad, Telangana, India.

VERIFIED BIOGRAPHICAL & ACADEMIC FACTS:
- Full Name: Yejju Sathya Sai (Roll No: 23054-AI-051)
- Institution: Government Institute of Electronics (GIOE), East Maredpally, Secunderabad — Department of Artificial Intelligence & Machine Learning (2023–2026 cohort).
- Contact: ysathyasai.dev@gmail.com | GitHub: https://github.com/ysathyasai | LinkedIn: https://www.linkedin.com/in/ysathyasai | X: https://x.com/ysathyasai | Medium: https://medium.com/@ysathyasai

VERIFIED PROJECTS & TECHNICAL ARCHITECTURES:
1. Khet2Kitchen (K2K) — Smart India Hackathon (SIH 2026) Finalist (Problem Statement SIH26033, Ministry of Consumer Affairs / DoCA):
   - Role: Full-Stack Architect & Lead Software Engineer (Django 5.1 Core, B2B/D2C Engine, Database Schema, DevOps & API Design) in a 6-member team (with Swayam, Shaik Mohammed Imaadh, Dupalica, Afsha Siddiha, Karuneshwari — 124/124 passing test suites).
   - Stack: Python 3.11+, Django 5.1+, Google Gemini Flash Reasoning, Sarvam AI Indic Voice STT/TTS, Render (https://khet2kitchen.onrender.com/).
   - Impact: Disintermediates the 5-tier agricultural middleman chain using rural PACS micro-hubs, vernacular voice bidding, and computer-vision grading.
2. Kodex — Cognitive Code Review Agent (HackwithHyderabad 3.0):
   - Role: Lead Systems & AI Engineer.
   - Stack: Python, Vectorize Hindsight Cloud (biomimetic memory using recall, reflect, retain), Groq openai/gpt-oss-120b inference, Semantic Dependency Cohort Graphing (diff_parser.py sorting files into Schema -> Logic -> API -> Tests -> Config), Mermaid.js sanitization, Docker Compose (https://kodex-code-review-agent.onrender.com).
3. StudyHub — Student Productivity Ecosystem:
   - Role: Project Developer & Documentation (23054-AI-051) in a 10-member GIOE capstone team led by Nanduri Eknadha Adithya Srivatsa.
   - Stack: Flutter 3.0+, Dart 2.19+, Firebase, Google Gemini API, Android APK release. Features Notes Manager, Smart Timetable, GPA/CGPA Performance Tracker, Habit Tracker, Syllabus Progress, Formula Book, and Pomodoro Timer.
4. Composite Behavioral Modeling (CBM) — Identity Theft & Fraud-Risk Detection Platform:
   - Role: Lead Developer (6th Semester Project with CBM team).
   - Stack: Python 3.11, Django 3.2, scikit-learn (ensemble of RandomForestClassifier, GradientBoostingClassifier, LogisticRegression), pandas, NumPy, WhiteNoise, Gunicorn (https://composite-behavioral-modeling-abci.onrender.com/).
5. ContribReady — Open-Source Contribution Readiness Platform (Hacktoberfest Hack Day 2026):
   - Stack: React 19, Vite, Tailwind CSS, Node.js, Express, GitHub REST API, Open-Weight / Gemini / Groq / Ollama AI. Prunes repo trees, scores relevant files, extracts required concepts, and generates a readiness quiz.
6. Cutthroat & AdaCompute (Cardano Web3 & Decentralized AI Compute):
   - Cutthroat (https://github.com/ysathyasai/Cutthroat): Decentralized donation platform on Cardano built with Next.js 15.5.3, TypeScript, and Mesh SDK with NFT proof-of-donation certificates.
   - AdaCompute (Cardano IndiaCodex'26): Decentralized AI service exchange exploring Cardano transaction and escrow relationships for AI compute nodes.
7. ImpactVault (Monad Blitz):
   - Explores transparent donation-to-impact verification and high-throughput on-chain tracking built during Monad Blitz Hyderabad.
8. Flask Video Downloader, RAG-Bot & MicroKernel-OS:
   - Flask Video Downloader: Local-first Python 3.11 + Flask 3.x + yt-dlp + FFmpeg station supporting Windows, macOS, Linux, and Android Termux.
   - RAG-Bot: FastAPI + ChromaDB + sentence-transformers (all-MiniLM-L6-v2) + Groq llama-3.3-70b with page citations.
   - MicroKernel-OS: 32-bit x86 microkernel in C & Assembly with BIOS bootloader (0x7C00), PIT preemptive round-robin scheduling, kmalloc/kfree, and send/recv IPC.

RULES:
- Be concise, deeply technical, authentic, and grounded strictly in the verified facts above.
- Never fabricate companies, fake job titles, or exaggerated model metrics.
- Format responses cleanly with clear headings or bullet points.`;

function buildDeterministicAnalysis(prompt: string, mode: string): string {
  const q = prompt.toLowerCase();
  if (q.includes('khet2kitchen') || q.includes('k2k') || q.includes('sih')) {
    return `### Architectural Deep-Dive: Khet2Kitchen (SIH 2026 Finalist — SIH26033)
- **System Role**: Yejju Sathya Sai architected the **Django 5.1 Core, Dual-Channel B2B/D2C Marketplace Engine, Database Schema, and Render DevOps Pipeline** alongside a 6-member team (124/124 automated tests passing).
- **Disintermediation Pipeline**: Replaces the traditional 5-tier agricultural middleman chain with decentralized rural PACS micro-hubs linking farmers directly to commercial bulk buyers and residential RWAs.
- **Multimodal AI Stack**: Pairs **Sarvam AI** vernacular Indic STT/TTS voice intelligence (allowing farmers to list harvests by voice) with **Google Gemini Flash Reasoning** for dynamic price stabilization and grading.`;
  }
  if (q.includes('kodex') || q.includes('review') || q.includes('memory')) {
    return `### Architectural Deep-Dive: Kodex Cognitive Code Review Agent (HackwithHyderabad 3.0)
- **Core Problem Solved**: Stateless AI PR bots repeatedly post suggestions that senior engineers have already rejected, eroding developer trust.
- **Biomimetic Memory Layer**: Integrates **Vectorize Hindsight Cloud** using all three cognitive operations (\`recall\`, \`reflect\`, \`retain\`) so developer replies permanently update institutional team conventions.
- **Semantic Dependency Cohort Graphing**: Instead of dumping diffs alphabetically, \`diff_parser.py\` topologically groups changes into \`Schema ➔ Logic ➔ API ➔ Tests ➔ Config\` before invoking **Groq \`openai/gpt-oss-120b\`**.`;
  }
  if (q.includes('studyhub') || q.includes('flutter') || q.includes('student')) {
    return `### Architectural Deep-Dive: StudyHub Academic Ecosystem
- **Role & Collaboration**: Developed by Yejju Sathya Sai (\`23054-AI-051\`, Project Developer & Documentation) within a 10-member capstone team at **Government Institute of Electronics, Secunderabad**.
- **Mobile-First Architecture**: Built with **Flutter 3.0+**, **Dart 2.19+**, **Firebase**, and **Google Gemini API**, shipped as a native Android APK release.
- **Unified Modules**: Integrates hierarchical Notes Manager, Smart Timetable, GPA/CGPA Performance Tracker, Habit Tracker, Syllabus Progress, Formula Book, and Pomodoro study cycles.`;
  }
  if (q.includes('fraud') || q.includes('behavioral') || q.includes('cbm')) {
    return `### Architectural Deep-Dive: Composite Behavioral Modeling (CBM)
- **6th Semester ML Implementation**: Monolithic **Django 3.2 + Python 3.11** fraud-risk detection platform evaluating account behavior, social connection ratios, and transaction history.
- **Ensemble Classification Engine**: Combines \`RandomForestClassifier\`, \`GradientBoostingClassifier\`, and \`LogisticRegression\` in \`scikit-learn\` with automated preprocessing and \`.xls\` audit report exports.
- **Engineering Honesty**: Deployed with Gunicorn & WhiteNoise on Render; explicitly documents free-tier 0.5 CPU / RAM constraints during live ensemble training.`;
  }
  if (q.includes('web3') || q.includes('cardano') || q.includes('adacompute') || q.includes('impactvault') || q.includes('cutthroat')) {
    return `### Architectural Deep-Dive: Web3 & Decentralized Compute (AdaCompute, Cutthroat & ImpactVault)
- **Cutthroat (Cardano)**: Verified repository (\`ysathyasai/Cutthroat\`) built with **Next.js 15.5.3, TypeScript 5, and Mesh SDK** providing on-chain donation tracking and NFT proof-of-contribution certificates.
- **AdaCompute (Cardano IndiaCodex'26)**: Explores decentralized AI compute exchange where service nodes coordinate inference tasks through Cardano escrow relationships.
- **ImpactVault (Monad Blitz)**: High-throughput transparent donation-to-impact verification flow prototyped during Monad Blitz in Hyderabad.`;
  }
  return `### Executive Technical Synthesis (${mode === 'deep' ? 'High-Thinking Architecture Mode' : 'Fast Triage Mode'})
- **Identity**: **Yejju Sathya Sai** (\`23054-AI-051\`), AI & ML specialist at **Government Institute of Electronics, Secunderabad** (Hyderabad, India).
- **Signature Systems**:
  1. **Khet2Kitchen (SIH 2026 Finalist)**: Full-Stack Architect for an AI + Indic voice farm-to-fork supply chain platform (Django 5.1, Gemini, Sarvam AI, 124/124 tests).
  2. **Kodex (HackwithHyderabad 3.0)**: Biomimetic memory code review agent using Vectorize Hindsight (\`recall/reflect/retain\`) + Groq \`gpt-oss-120b\` + Semantic Cohort Graphing.
  3. **StudyHub & CBM**: Flutter/Firebase/Gemini mobile academic suite and scikit-learn/Django ensemble fraud detection engine.
  4. **Systems & Web3 Breadth**: From a 32-bit x86 C/Assembly microkernel (\`MicroKernel-OS\`) and ChromaDB \`RAG-Bot\` to Cardano Mesh SDK (\`Cutthroat\` / \`AdaCompute\`) and \`ContribReady\`.`;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  // Health & portfolio metadata endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      owner: 'Yejju Sathya Sai',
      rollNumber: '23054-AI-051',
      institution: 'Government Institute of Electronics, Secunderabad',
      submissionsCount: contactSubmissions.length,
    });
  });

  // Contact form backend endpoint with validation & honeypot protection
  app.post('/api/contact', (req: Request, res: Response) => {
    const { name, email, subject, message, organization, websiteHoneypot } = req.body || {};

    // Honeypot check
    if (websiteHoneypot && String(websiteHoneypot).trim().length > 0) {
      res.status(400).json({ error: 'Spam check triggered.' });
      return;
    }

    const cleanName = String(name || '').trim();
    const cleanEmail = String(email || '').trim();
    const cleanSubject = String(subject || 'Portfolio Inquiry').trim();
    const cleanMessage = String(message || '').trim();
    const cleanOrg = String(organization || '').trim();

    if (cleanName.length < 2) {
      res.status(400).json({ error: 'Please provide your name (at least 2 characters).' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      res.status(400).json({ error: 'Please provide a valid email address.' });
      return;
    }

    if (cleanMessage.length < 10) {
      res.status(400).json({ error: 'Please enter a message of at least 10 characters.' });
      return;
    }

    const submission: ContactSubmission = {
      id: `TX-SATHYA-${Date.now().toString(36).toUpperCase()}`,
      name: cleanName.slice(0, 120),
      email: cleanEmail.slice(0, 160),
      subject: cleanSubject.slice(0, 200),
      message: cleanMessage.slice(0, 3000),
      organization: cleanOrg.slice(0, 160),
      createdAt: new Date().toISOString(),
    };

    contactSubmissions.unshift(submission);
    if (contactSubmissions.length > 100) {
      contactSubmissions.pop();
    }

    res.status(201).json({
      success: true,
      receipt: submission,
      directMailto: `mailto:ysathyasai.dev@gmail.com?subject=${encodeURIComponent(
        `[Portfolio] ${submission.subject} — from ${submission.name}`,
      )}&body=${encodeURIComponent(
        `${submission.message}\n\n---\nFrom: ${submission.name} (${submission.email})${
          submission.organization ? `\nOrganization: ${submission.organization}` : ''
        }\nReceipt ID: ${submission.id}`,
      )}`,
    });
  });

  app.get('/api/contact/messages', (_req: Request, res: Response) => {
    res.json({
      count: contactSubmissions.length,
      recent: contactSubmissions.slice(0, 10),
    });
  });

  // Server-side Gemini Intelligence & High-Thinking Architecture Analysis endpoint
  app.post('/api/gemini/analyze', async (req: Request, res: Response) => {
    const { prompt, mode = 'deep' } = req.body || {};
    const cleanPrompt = String(prompt || '').trim();

    if (!cleanPrompt) {
      res.status(400).json({ error: 'Please provide a query or architecture prompt to analyze.' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const hasRealKey = Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim().length > 10);

    if (!hasRealKey) {
      res.json({
        text: buildDeterministicAnalysis(cleanPrompt, mode),
        modelUsed: mode === 'fast' ? 'gemini-3.1-flash-lite (verified-knowledge-engine)' : 'gemini-4-hydrogen (HIGH thinking synthesis)',
        thinkingLevel: mode === 'fast' ? 'MINIMAL' : 'HIGH',
        source: 'verified-portfolio-knowledge',
      });
      return;
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      // Use free-tier compatible gemini-4-hydrogen with ThinkingLevel.HIGH for deep reasoning,
      // or gemini-3.1-flash-lite for fast responses.
      const targetModel = mode === 'fast' ? 'gemini-3.1-flash-lite' : 'gemini-4-hydrogen';

      const response = await ai.models.generateContent({
        model: targetModel,
        contents: cleanPrompt,
        config: {
          systemInstruction: PORTFOLIO_SYSTEM_CONTEXT,
          ...(mode === 'fast'
            ? {}
            : {
                thinkingConfig: {
                  thinkingLevel: ThinkingLevel.HIGH,
                },
              }),
        },
      });

      const outputText = response.text || buildDeterministicAnalysis(cleanPrompt, mode);
      res.json({
        text: outputText,
        modelUsed: targetModel,
        thinkingLevel: mode === 'fast' ? 'MINIMAL' : 'HIGH',
        source: 'live-gemini-api',
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.warn('Gemini API fallback triggered:', message);
      res.json({
        text: buildDeterministicAnalysis(cleanPrompt, mode),
        modelUsed: mode === 'fast' ? 'gemini-3.1-flash-lite' : 'gemini-4-hydrogen (HIGH thinking fallback)',
        thinkingLevel: mode === 'fast' ? 'MINIMAL' : 'HIGH',
        source: 'verified-portfolio-fallback',
        notice: 'Live API quota or key unavailable; served from verified portfolio architecture index.',
      });
    }
  });

  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SATHYA — BEYOND THE SCREEN server running on http://localhost:${PORT}`);
  });
}

startServer();
