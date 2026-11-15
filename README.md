# SATHYA — BEYOND THE SCREEN

**The Interactive 3D Developer Universe of Yejju Sathya Sai (`ysathyasai`)**

An original, full-viewport Three.js / WebGL interactive portfolio and engineering showcase built for **Yejju Sathya Sai** — AI/ML Developer, Full-Stack Architect, and Creative Technologist at the **Government Institute of Electronics, Secunderabad** (`23054-AI-051`).

All biographical facts, academic credentials, team attributions, and project architectures are verified from primary public repositories and documented in [`CONTENT_SOURCES.md`](./CONTENT_SOURCES.md).

---

## 1. Key Features & Architecture

- **Six Interconnected 3D Chapter Islands (`src/components/DeveloperUniverseCanvas.tsx`)**:
  1. **01. Arrival — The World of Sathya**: Floating kinetic developer command desk with dual custom-textured monitors, mechanical keyboard, liquid-cooled server tower, and overhead holographic gyroscope.
  2. **02. Origins — The Journey**: Spatial timeline archways tracing academic progression at Government Institute of Electronics, Secunderabad (`23054-AI-051`), Linux/C microkernel exploration, 6th semester ML fraud modeling, and national hackathons.
  3. **03. The Creator's Workshop**: Five interactive 3D domain stations (*Neural & Agentic Core*, *Monolith & API Server Rack*, *Holographic Interface Rig*, *Decentralized Ledger Node*, and *Kernel & Terminal Deck*) backed by shipped repository proof points.
  4. **04. Project Universe**: Miniature 3D architectural dioramas for **Khet2Kitchen (SIH 2026 Finalist)**, **Kodex (HackwithHyderabad 3.0)**, **StudyHub**, **Composite Behavioral Modeling**, **ContribReady**, **Cutthroat / AdaCompute / ImpactVault**, **Flask Video Downloader & RAG-Bot**, and **MicroKernel-OS**.
  5. **05. Beyond the Code**: Interactive Constellation Observatory mapping hackathons, open-source sprints, and certifications.
  6. **06. The Next Frontier**: Orbital communication portal with a server-validated transmission terminal (`POST /api/contact`) and direct `mailto:` dispatch.
- **Two Complementary Interaction Modes**:
  - **Guided Cinematic Journey (Default)**: Smooth deterministic spline camera choreography controlled by scroll wheel, keyboard (`ArrowUp` / `ArrowDown`), or chapter navigation buttons.
  - **Free Exploration Mode (`Explore World`)**: Fly a multi-part 3D Scout Drone across the miniature universe using `WASD` / `Arrow` keys, mouse orbit controls, or the mobile touch D-pad.
- **Recruiter Quick View (`?view=quick`)**: Instant access to a structured, printable executive engineering dossier with category filters, full team attribution tables, and repository links.
- **AI Architecture Lab & Workshop CLI**: Server-side `@google/genai` endpoint (`/api/gemini/analyze`) supporting `ThinkingLevel.HIGH` architectural reasoning alongside an interactive terminal with Easter egg commands (`whoami`, `roll`, `sih`, `kodex`, `kernel`, `brainteaser`).

---

## 2. Local Development & Build Instructions

### Install Dependencies
```bash
npm install
```

### Start Development Mode (Full-Stack Express + Vite on Port 3000)
```bash
npm run dev
```
Open `http://localhost:3000` (or `http://localhost:3000/?autostart=1` to skip the intro gate).

### Run Unit Tests
```bash
npx --yes tsx --test src/utils/worldLogic.test.ts
```

### Type-Check & Build for Production
```bash
npm run lint
npm run build
npm start
```

---

## 3. Content & 3D Customization Guide

- **Updating Biographical Info, Chapters & Projects**: Edit [`src/data/portfolio.ts`](./src/data/portfolio.ts). All UI overlays, Recruiter Quick View cards, and 3D landmarks read directly from `OWNER_PROFILE`, `CHAPTERS`, `PROJECTS`, `WORKSHOP_ARTIFACTS`, and `CONSTELLATION_NODES`.
- **Adding a New Project**: Append a `ProjectItem` entry to `PROJECTS` in `src/data/portfolio.ts` with a `worldLandmark` coordinate (`[x, y, z]`) and `dioramaType`. The 3D Project Universe plaza and Accessible Project Grid will render it automatically.
- **Customizing 3D Procedural Models & Materials**: Edit [`src/components/DeveloperUniverseCanvas.tsx`](./src/components/DeveloperUniverseCanvas.tsx).
- **Deploying to Netlify / Cloud Run**:
  - For full-stack deployment (Cloud Run / Render / Node server), `npm run build && npm start` serves the built `dist/` bundle and `/api/*` endpoints on port 3000.
  - For static preview hosting on Netlify, set the build command to `npm run build` and publish directory to `dist`.
