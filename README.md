# SATHYA — BEYOND THE SCREEN (Version 2.0)

**Interactive 14-Chapter 3D Portfolio & Engineering Universe of Yejju Sathya Sai (`@ysathyasai`)**

> *"Exploring technology, building projects, and documenting the journey."*

**Sathya — Beyond the Screen** is my spatial, story-driven 3D web experience built with **Three.js**, **React 19**, **TypeScript**, **Tailwind CSS**, and an **Express + Google Gemini High-Thinking Backend**. Instead of a static template, visitors travel across **14 interconnected 3D architectural islands**—from my command studio in Hyderabad and my dual-campus academic journey (**GIOE Secunderabad** ➔ **VNR VJIET**) to my **AI & ML Laboratory**, **9 miniature 3D project worlds**, **Engineering Case Studies**, **Open-Source Nexus**, **Hackathon Arena**, **Starlight Observatory**, **Interactive Playground**, and **Communication Portal**.

---

## 1. The 14 Narrative Chapters & 3D World Architecture

1. **Chapter 01 — Arrival: The World Awakens (`#arrival`)**: My developer command desk with custom procedural monitor textures, holographic gyroscope, and immediate entry into Guided Story Mode, Free 3D Drone Exploration, or my Recruiter Quick View Dossier.
2. **Chapter 02 — The Person Behind the Code (`#persona`)**: Interactive 3D pods showcasing my engineering identity—Linux & Android Termux tinkering (★ 30 stars), systems curiosity from x86 Assembly to LLMs, human-centric AI, and hackathon teamwork.
3. **Chapter 03 — Origins & Education (`#education`)**: Dual academic citadel towers connected by a glowing skybridge—honoring my **Diploma in AI & ML at GIOE Secunderabad (2023–2026)** and my **B.Tech in CSE (AI & ML) at VNR VJIET, Hyderabad**.
4. **Chapter 04 — The Evolution Timeline (`#timeline`)**: Six chronological milestone gates tracing my path from early Python/C foundations to SIH 2026 Finalist, HackwithHyderabad 3.0, and VNR VJIET systems architecture.
5. **Chapter 05 — The Engineer's Workshop (`#workshop`)**: Six interactive 3D workbenches (AI/ML Core, Backend Foundry, Frontend Studio, Web3 Node, Kernel & Termux Deck, and Java 17 / StarUML Station) where every skill is backed by shipped repository proof.
6. **Chapter 06 — The AI & Machine Learning Laboratory (`#ai-lab`)**: Interactive pipeline simulator where visitors switch between `Kodex`, `RAG-Bot`, and `Composite Behavioral Modeling` and toggle live configuration modes to compare stage metrics.
7. **Chapter 07 — The Project Universe (`#projects`)**: A central plaza of **9 distinct miniature 3D worlds** (`Khet2Kitchen`, `Kodex`, `YieldGrid`, `StudyHub`, `Composite Behavioral Modeling`, `ContribReady`, `Cardano & Monad Web3 Suite`, `Flask Video Downloader & RAG-Bot`, and `MicroKernel-OS & Sentinel AI`).
8. **Chapter 08 — Inside the Builds: Engineering Case Studies (`#case-studies`)**: Deep-dive architectural blueprints for `Khet2Kitchen`, `Kodex`, `YieldGrid`, and `CBM`.
9. **Chapter 09 — The Open-Source Universe (`#open-source`)**: Interactive network of my 28 public repositories on GitHub, led by my 30-star `Termux` guide.
10. **Chapter 10 — Hackathons & Collaborations (`#hackathons`)**: Five verified hackathon arenas (`SIH 2026`, `HackwithHyderabad 3.0`, `Hacktoberfest Hack Day`, `Cardano IndiaCodex'26`, and `Monad Blitz`).
11. **Chapter 11 — Experience & Technical Growth (`#experience`)**: Four honest engineering growth tracks backed by test suites and live deployments.
12. **Chapter 12 — Achievements & Certifications (`#achievements`)**: Starlight Observatory of verified honors, certifications, and automated test milestones (124/124 tests in `Khet2Kitchen`, 53/53 in `YieldGrid`).
13. **Chapter 13 — The Interactive Playground (`#playground`)**: Live 3-in-1 interactive sandbox featuring an interactive **Kodex Diff Cohort & YieldGrid Security** ordering puzzle, my **Workshop CLI**, and **Free 3D Scout Drone Flight**.
14. **Chapter 14 — The Next Frontier: Connect (`#frontier`)**: Departure stargate with direct social/coding links and a working, server-validated contact transmission terminal (`POST /api/contact`).

---

## 2. Mobile 3D Viewport Presence & Performance Architecture

- **Real, Unobstructed 3D on Mobile**: On portrait mobile viewports (`< 640px`), `interpolateCameraState(progress, isMobilePortrait)` uses dedicated portrait camera framing (`mobileCameraPosition` / `mobileCameraTarget`) while the narrative overlay docks as a sleek bottom sheet (`max-h-[43vh]`), leaving the **upper 52%+ of the mobile screen completely open to the live 3D WebGL scene**.
- **Touch-Swipe & 14-Chapter World Map**: Mobile visitors can swipe vertically directly on the 3D scene to travel between islands, tap 3D monuments to inspect them, or open the **14-Chapter World Map** popover to warp to any island.
- **Zero-GC Render Loop**: Pre-allocated `THREE.Vector3`, `THREE.Color`, and `THREE.Object3D` scratch helpers, `THREE.InstancedMesh` (320 cosmic shards in 1 draw call), procedural canvas textures, and automatic Software-WebGL (`SwiftShader`/`llvmpipe`) detection.

---

## 3. Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run pure-logic unit tests (14 chapters, mobile camera framing, filtering, validation, CLI)
npx tsx --test src/utils/worldLogic.test.ts

# 3. Start full-stack dev server on http://localhost:3000
npm run dev

# 4. Build for production
npm run build
```
