import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  CHAPTERS,
  PROJECTS,
  WORKSHOP_ARTIFACTS,
  CONSTELLATION_NODES,
  JOURNEY_MILESTONES,
} from '../data/portfolio';
import { interpolateCameraState } from '../utils/worldLogic';

export interface Interactive3DSelection {
  type: 'project' | 'artifact' | 'constellation' | 'milestone';
  id: string;
  label: string;
}

interface DeveloperUniverseCanvasProps {
  scrollProgress: number;
  exploreMode: boolean;
  qualityMode: 'auto' | 'high' | 'eco';
  reducedMotion: boolean;
  selectedArtifactId: string;
  selectedConstellationId: string;
  onSelectObject: (selection: Interactive3DSelection) => void;
  onHoverObject: (selection: Interactive3DSelection | null) => void;
  onDroneMove?: (pos: [number, number, number]) => void;
  mobileJoystickVector?: { x: number; y: number };
}

// Pre-allocated module-scope math helpers (Zero GC in render loop)
const _targetCamPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();
const _currentLookAt = new THREE.Vector3(0, 1.4, 0);
const _droneForward = new THREE.Vector3();
const _droneRight = new THREE.Vector3();
const _scratchVec = new THREE.Vector3();
const _scratchColor = new THREE.Color();
const _dummyObj = new THREE.Object3D();

function createProceduralGridTexture(renderer: THREE.WebGLRenderer): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#0B1325';
  ctx.fillRect(0, 0, 512, 512);

  // Subtle concentric rings and technical grid lines
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.16)';
  ctx.lineWidth = 2;
  const step = 64;
  for (let i = 0; i <= 512; i += step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(256, 256, 180, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(256, 256, 96, 0, Math.PI * 2);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return texture;
}

function createMonitorScreenTexture(
  renderer: THREE.WebGLRenderer,
  title: string,
  subtitle: string,
  accentHex: string,
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#050914';
  ctx.fillRect(0, 0, 512, 256);

  ctx.strokeStyle = accentHex;
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, 496, 240);

  // Terminal header bar
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.fillRect(12, 12, 488, 36);

  ctx.fillStyle = accentHex;
  ctx.font = 'bold 24px monospace';
  ctx.fillText(title, 28, 92);

  ctx.fillStyle = '#E2E8F0';
  ctx.font = '18px sans-serif';
  ctx.fillText(subtitle, 28, 132);

  // Code wave bars
  const barColors = [accentHex, '#38BDF8', '#10B981', '#A855F7'];
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = barColors[i % barColors.length];
    ctx.fillRect(28, 160 + i * 12, 140 + ((i * 57) % 260), 6);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return texture;
}

function createContactShadow(radius: number, opacity = 0.42): THREE.Mesh {
  const geo = new THREE.CircleGeometry(radius, 24);
  geo.rotateX(-Math.PI / 2);
  const mat = new THREE.MeshBasicMaterial({
    color: 0x02040a,
    transparent: true,
    opacity,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.y = 0.02;
  return mesh;
}

function createIslandPedestal(
  radius: number,
  accentHex: string,
  gridTex: THREE.CanvasTexture,
): THREE.Group {
  const group = new THREE.Group();

  // 1. Primary Silhouette: Octagonal upper deck
  const deckGeo = new THREE.CylinderGeometry(radius, radius * 0.92, 0.6, 8);
  const deckMat = new THREE.MeshStandardMaterial({
    color: 0x111a2e,
    map: gridTex,
    roughness: 0.45,
    metalness: 0.55,
  });
  const deck = new THREE.Mesh(deckGeo, deckMat);
  deck.position.y = -0.3;
  deck.receiveShadow = true;
  group.add(deck);

  // 2. Secondary Read: Tapered dark metallic under-hull
  const hullGeo = new THREE.CylinderGeometry(radius * 0.86, radius * 0.28, 2.8, 8);
  const hullMat = new THREE.MeshStandardMaterial({
    color: 0x090f1d,
    roughness: 0.75,
    metalness: 0.3,
  });
  const hull = new THREE.Mesh(hullGeo, hullMat);
  hull.position.y = -2.0;
  group.add(hull);

  // 3. Accent Detail: Glowing perimeter trim ring
  const rimGeo = new THREE.TorusGeometry(radius * 0.98, 0.08, 12, 32);
  rimGeo.rotateX(Math.PI / 2);
  const rimMat = new THREE.MeshStandardMaterial({
    color: accentHex,
    emissive: accentHex,
    emissiveIntensity: 1.4,
    roughness: 0.2,
    metalness: 0.8,
  });
  const rim = new THREE.Mesh(rimGeo, rimMat);
  rim.position.y = 0.02;
  group.add(rim);

  // 4. Lower stabilizer core tip
  const tipGeo = new THREE.ConeGeometry(radius * 0.25, 1.4, 6);
  tipGeo.rotateX(Math.PI);
  const tip = new THREE.Mesh(tipGeo, rimMat);
  tip.position.y = -4.0;
  group.add(tip);

  return group;
}

export const DeveloperUniverseCanvas: React.FC<DeveloperUniverseCanvasProps> = ({
  scrollProgress,
  exploreMode,
  qualityMode,
  reducedMotion,
  selectedArtifactId,
  selectedConstellationId,
  onSelectObject,
  onHoverObject,
  onDroneMove,
  mobileJoystickVector,
}) => {
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  // Store latest props in refs so React HUD updates never tear down the WebGL canvas
  const propsRef = useRef({
    scrollProgress,
    exploreMode,
    qualityMode,
    reducedMotion,
    selectedArtifactId,
    selectedConstellationId,
    onSelectObject,
    onHoverObject,
    onDroneMove,
    mobileJoystickVector,
  });

  useEffect(() => {
    propsRef.current = {
      scrollProgress,
      exploreMode,
      qualityMode,
      reducedMotion,
      selectedArtifactId,
      selectedConstellationId,
      onSelectObject,
      onHoverObject,
      onDroneMove,
      mobileJoystickVector,
    };
  }, [
    scrollProgress,
    exploreMode,
    qualityMode,
    reducedMotion,
    selectedArtifactId,
    selectedConstellationId,
    onSelectObject,
    onHoverObject,
    onDroneMove,
    mobileJoystickVector,
  ]);

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    // 1. Software-WebGL Guard & Capability Probe
    let isSoftwareGl = false;
    try {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    } catch {
      setWebglSupported(false);
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Handle WebGL context loss gracefully
    const handleContextLost = (e: Event) => {
      e.preventDefault();
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);

    // 2. Scene, Fog & Studio Environment Reflection (RoomEnvironment)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070b14);
    scene.fog = new THREE.FogExp2(0x070b14, 0.0082);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 3. Camera & OrbitControls (for Free Exploration Mode)
    const initialInterp = interpolateCameraState(propsRef.current.scrollProgress);
    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      260,
    );
    camera.position.set(...initialInterp.cameraPosition);
    _currentLookAt.set(...initialInterp.cameraTarget);
    camera.lookAt(_currentLookAt);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = false;
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI * 0.48;
    controls.minDistance = 4;
    controls.maxDistance = 45;

    // 4. Studio 3-Point Warm/Cool Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x0b132b, 0.9);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff1d0, 2.2);
    keyLight.position.set(18, 28, 16);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      const d = 24;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 90;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x818cf8, 1.1);
    rimLight.position.set(-20, 15, -30);
    scene.add(rimLight);

    const gridTex = createProceduralGridTexture(renderer);
    const interactables: THREE.Object3D[] = [];
    const animatedRings: THREE.Object3D[] = [];
    const floaters: { obj: THREE.Object3D; baseY: number; phase: number }[] = [];

    // =========================================================================
    // BUILD THE 6 INTERCONNECTED CHAPTER ISLANDS
    // =========================================================================

    // --- CHAPTER 01: ARRIVAL — THE WORLD OF SATHYA [0, 0, 0] ---
    const arrivalIsland = new THREE.Group();
    arrivalIsland.position.set(...CHAPTERS[0].islandCenter);
    arrivalIsland.add(createIslandPedestal(8.5, '#F59E0B', gridTex));

    // Developer Command Desk (Composite 9-part Group)
    const deskGroup = new THREE.Group();
    deskGroup.add(createContactShadow(4.2, 0.5));

    const deskTopMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.3,
      metalness: 0.7,
    });
    const deskLegMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.65,
      metalness: 0.4,
    });
    const amberGlowMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xf59e0b,
      emissiveIntensity: 1.5,
      roughness: 0.2,
      metalness: 0.8,
    });
    const cyanGlowMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 1.5,
      roughness: 0.2,
      metalness: 0.8,
    });

    // Desk main surface
    const deskSurface = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.16, 2.2), deskTopMat);
    deskSurface.position.set(0, 1.25, 0);
    deskSurface.castShadow = true;
    deskSurface.receiveShadow = true;
    deskGroup.add(deskSurface);

    // Desk LED edge strip
    const deskStrip = new THREE.Mesh(new THREE.BoxGeometry(5.24, 0.05, 2.24), amberGlowMat);
    deskStrip.position.set(0, 1.21, 0);
    deskGroup.add(deskStrip);

    // 4 Desk legs
    [
      [-2.3, -0.9],
      [2.3, -0.9],
      [-2.3, 0.9],
      [2.3, 0.9],
    ].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, 1.25, 12), deskLegMat);
      leg.position.set(lx, 0.625, lz);
      leg.castShadow = true;
      deskGroup.add(leg);
    });

    // Dual Monitors with custom CanvasTextures
    const monTexLeft = createMonitorScreenTexture(
      renderer,
      'YEJJU SATHYA SAI',
      'AI/ML • Full-Stack • 23054-AI-051',
      '#F59E0B',
    );
    const monTexRight = createMonitorScreenTexture(
      renderer,
      'SIH 2026 & KODEX',
      '124/124 Tests Passing • Active',
      '#38BDF8',
    );

    const createMonitor = (tex: THREE.CanvasTexture, x: number, rotY: number) => {
      const mGroup = new THREE.Group();
      mGroup.position.set(x, 1.33, -0.45);
      mGroup.rotation.y = rotY;

      const standBase = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 0.06, 16), deskLegMat);
      standBase.position.y = 0.03;
      mGroup.add(standBase);

      const neck = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.65, 0.12), deskLegMat);
      neck.position.set(0, 0.35, -0.08);
      mGroup.add(neck);

      const frame = new THREE.Mesh(new THREE.BoxGeometry(2.1, 1.15, 0.08), deskTopMat);
      frame.position.set(0, 0.82, 0);
      frame.castShadow = true;
      mGroup.add(frame);

      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(1.98, 1.03),
        new THREE.MeshBasicMaterial({ map: tex }),
      );
      screen.position.set(0, 0.82, 0.045);
      mGroup.add(screen);

      return mGroup;
    };

    deskGroup.add(createMonitor(monTexLeft, -1.15, 0.18));
    deskGroup.add(createMonitor(monTexRight, 1.15, -0.18));

    // Mechanical Keyboard
    const kbBody = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.07, 0.45), deskLegMat);
    kbBody.position.set(0, 1.36, 0.45);
    deskGroup.add(kbBody);

    const kbKeys = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.04, 0.36), cyanGlowMat);
    kbKeys.position.set(0, 1.39, 0.45);
    deskGroup.add(kbKeys);

    // Liquid-Cooled Server Chassis on right flank of desk
    const pcChassis = new THREE.Mesh(new THREE.BoxGeometry(0.75, 1.5, 1.4), deskTopMat);
    pcChassis.position.set(3.4, 0.75, -0.2);
    pcChassis.castShadow = true;
    deskGroup.add(pcChassis);

    const pcCore = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 1.2, 16), amberGlowMat);
    pcCore.position.set(3.4, 0.75, -0.18);
    deskGroup.add(pcCore);

    // Overhead Holographic Identity Gyroscope
    const holoRingOuter = new THREE.Mesh(
      new THREE.TorusGeometry(3.2, 0.045, 12, 48),
      amberGlowMat,
    );
    holoRingOuter.position.set(0, 4.2, -1.2);
    arrivalIsland.add(holoRingOuter);
    animatedRings.push(holoRingOuter);

    const holoRingInner = new THREE.Mesh(
      new THREE.TorusGeometry(2.4, 0.035, 12, 48),
      cyanGlowMat,
    );
    holoRingInner.position.set(0, 4.2, -1.2);
    holoRingInner.rotation.x = Math.PI / 3;
    arrivalIsland.add(holoRingInner);
    animatedRings.push(holoRingInner);

    arrivalIsland.add(deskGroup);
    scene.add(arrivalIsland);

    // --- CHAPTER 02: ORIGINS — THE JOURNEY [-28, 0, -26] ---
    const originsIsland = new THREE.Group();
    originsIsland.position.set(...CHAPTERS[1].islandCenter);
    originsIsland.add(createIslandPedestal(9.0, '#38BDF8', gridTex));

    JOURNEY_MILESTONES.forEach((m, idx) => {
      const archGroup = new THREE.Group();
      const angle = (idx - 1.5) * 0.55;
      const rx = Math.sin(angle) * 5.2;
      const rz = Math.cos(angle) * 3.2 - 1.5;
      archGroup.position.set(rx, 0, rz);
      archGroup.rotation.y = -angle;

      archGroup.add(createContactShadow(1.6, 0.4));

      const pillarMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.35,
        metalness: 0.7,
      });
      const nodeGlowMat = new THREE.MeshStandardMaterial({
        color: idx % 2 === 0 ? 0x38bdf8 : 0xf59e0b,
        emissive: idx % 2 === 0 ? 0x38bdf8 : 0xf59e0b,
        emissiveIntensity: 1.4,
        roughness: 0.2,
        metalness: 0.8,
      });

      const leftPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 2.8, 12), pillarMat);
      leftPillar.position.set(-0.9, 1.4, 0);
      archGroup.add(leftPillar);

      const rightPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 2.8, 12), pillarMat);
      rightPillar.position.set(0.9, 1.4, 0);
      archGroup.add(rightPillar);

      const topBeam = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.28, 0.4), nodeGlowMat);
      topBeam.position.set(0, 2.9, 0);
      archGroup.add(topBeam);

      const beaconCrystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.45, 0), nodeGlowMat);
      beaconCrystal.position.set(0, 1.6, 0);
      beaconCrystal.userData = {
        interactive: {
          type: 'milestone',
          id: m.id,
          label: `${m.period}: ${m.title}`,
        } as Interactive3DSelection,
      };
      interactables.push(beaconCrystal);
      floaters.push({ obj: beaconCrystal, baseY: 1.6, phase: idx * 1.3 });
      archGroup.add(beaconCrystal);

      originsIsland.add(archGroup);
    });
    scene.add(originsIsland);

    // --- CHAPTER 03: THE CREATOR'S WORKSHOP [28, 0, -32] ---
    const workshopIsland = new THREE.Group();
    workshopIsland.position.set(...CHAPTERS[2].islandCenter);
    workshopIsland.add(createIslandPedestal(9.5, '#10B981', gridTex));

    WORKSHOP_ARTIFACTS.forEach((artifact, idx) => {
      const stationGroup = new THREE.Group();
      stationGroup.position.set(
        artifact.positionOffset[0],
        0,
        artifact.positionOffset[2],
      );
      stationGroup.add(createContactShadow(1.9, 0.45));

      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x162036,
        roughness: 0.45,
        metalness: 0.6,
      });
      const accentMat = new THREE.MeshStandardMaterial({
        color: artifact.accentColor,
        emissive: artifact.accentColor,
        emissiveIntensity: 1.35,
        roughness: 0.2,
        metalness: 0.85,
      });

      // Pedestal Base
      const base = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.35, 0.7, 8), baseMat);
      base.position.y = 0.35;
      stationGroup.add(base);

      //Pedestal collar ring
      const collar = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.06, 10, 24), accentMat);
      collar.rotation.x = Math.PI / 2;
      collar.position.y = 0.72;
      stationGroup.add(collar);

      // Unique upper sculpture per station
      const sculpture = new THREE.Group();
      sculpture.position.y = 1.85;

      if (idx === 0) {
        // AI/ML Neural Core
        const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 1), accentMat);
        const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.05, 10, 28), baseMat);
        const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.04, 10, 28), accentMat);
        ring2.rotation.x = Math.PI / 2;
        sculpture.add(core, ring1, ring2);
      } else if (idx === 1) {
        // Backend Server Rack
        const rack = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.5, 0.9), baseMat);
        sculpture.add(rack);
        for (let b = -0.45; b <= 0.45; b += 0.3) {
          const blade = new THREE.Mesh(new THREE.BoxGeometry(1.14, 0.08, 0.94), accentMat);
          blade.position.y = b;
          sculpture.add(blade);
        }
      } else if (idx === 2) {
        // Frontend Holographic Screens
        const panel1 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.85, 0.08), accentMat);
        const panel2 = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.7, 0.08), baseMat);
        panel2.position.set(0.25, 0.2, -0.25);
        sculpture.add(panel1, panel2);
      } else if (idx === 3) {
        // Web3 Ledger Node
        const hex1 = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.1, 6, 6), accentMat);
        const hex2 = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.08, 6, 6), baseMat);
        hex2.rotation.y = Math.PI / 3;
        sculpture.add(hex1, hex2);
      } else {
        // Kernel & Terminal Deck
        const wafer = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.18, 16), baseMat);
        const chip = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.35, 0.7), accentMat);
        chip.position.y = 0.2;
        sculpture.add(wafer, chip);
      }

      // Invisible hit proxy for smooth raycasting
      const hitProxy = new THREE.Mesh(
        new THREE.CylinderGeometry(1.3, 1.3, 3.0, 12),
        new THREE.MeshBasicMaterial({ visible: false }),
      );
      hitProxy.position.y = 1.5;
      hitProxy.userData = {
        interactive: {
          type: 'artifact',
          id: artifact.id,
          label: `${artifact.name} (${artifact.domainTitle})`,
        } as Interactive3DSelection,
        sculptureRef: sculpture,
      };
      interactables.push(hitProxy);
      floaters.push({ obj: sculpture, baseY: 1.85, phase: idx * 1.1 });

      stationGroup.add(sculpture, hitProxy);
      workshopIsland.add(stationGroup);
    });
    scene.add(workshopIsland);

    // --- CHAPTER 04: PROJECT UNIVERSE [0, 0, -64] ---
    const projectsIsland = new THREE.Group();
    projectsIsland.position.set(...CHAPTERS[3].islandCenter);
    projectsIsland.add(createIslandPedestal(15.0, '#F59E0B', gridTex));

    PROJECTS.forEach((proj, idx) => {
      const pWorld = new THREE.Group();
      const [wx, , wz] = proj.worldLandmark.position;
      pWorld.position.set(wx, 0, wz - CHAPTERS[3].islandCenter[2]);
      pWorld.add(createContactShadow(2.2, 0.48));

      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x17223b,
        roughness: 0.4,
        metalness: 0.65,
      });
      const glowMat = new THREE.MeshStandardMaterial({
        color: proj.worldLandmark.accentColor,
        emissive: proj.worldLandmark.accentColor,
        emissiveIntensity: 1.4,
        roughness: 0.2,
        metalness: 0.85,
      });

      // Multi-part Diorama Pedestal
      const plinth = new THREE.Mesh(new THREE.CylinderGeometry(1.55, 1.8, 0.55, 8), baseMat);
      plinth.position.y = 0.275;
      pWorld.add(plinth);

      const plinthRing = new THREE.Mesh(new THREE.TorusGeometry(1.62, 0.06, 10, 28), glowMat);
      plinthRing.rotation.x = Math.PI / 2;
      plinthRing.position.y = 0.56;
      pWorld.add(plinthRing);

      // Diorama centerpiece based on project type
      const diorama = new THREE.Group();
      diorama.position.y = 1.65;

      if (proj.worldLandmark.dioramaType === 'agritech') {
        // Khet2Kitchen Agritech Micro-Hub
        const hubDome = new THREE.Mesh(new THREE.SphereGeometry(0.75, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), baseMat);
        hubDome.position.y = -0.4;
        const voiceTower = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.22, 1.4, 12), glowMat);
        voiceTower.position.y = 0.3;
        const waveRing = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.05, 10, 28), glowMat);
        waveRing.rotation.x = Math.PI / 3;
        diorama.add(hubDome, voiceTower, waveRing);
      } else if (proj.worldLandmark.dioramaType === 'kodex') {
        // Kodex Cognitive Memory Spire
        const spire = new THREE.Mesh(new THREE.ConeGeometry(0.65, 1.7, 6), baseMat);
        const memRing1 = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.05, 10, 24), glowMat);
        const memRing2 = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.04, 10, 24), glowMat);
        memRing1.rotation.x = Math.PI / 4;
        memRing2.rotation.y = Math.PI / 3;
        diorama.add(spire, memRing1, memRing2);
      } else if (proj.worldLandmark.dioramaType === 'campus') {
        // StudyHub Smart Campus
        const rotunda = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.85, 0.9, 12), baseMat);
        const roof = new THREE.Mesh(new THREE.ConeGeometry(0.95, 0.55, 12), glowMat);
        roof.position.y = 0.72;
        const orbit = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.04, 10, 28), glowMat);
        orbit.rotation.x = Math.PI / 2.4;
        diorama.add(rotunda, roof, orbit);
      } else if (proj.worldLandmark.dioramaType === 'cyberlab') {
        // CBM Fraud Analytics Prism
        const prism = new THREE.Mesh(new THREE.OctahedronGeometry(0.78, 0), glowMat);
        const cage = new THREE.Mesh(
          new THREE.OctahedronGeometry(1.05, 0),
          new THREE.MeshBasicMaterial({ color: proj.worldLandmark.accentColor, wireframe: true }),
        );
        diorama.add(prism, cage);
      } else {
        // Web3 / Media Station
        const vault = new THREE.Mesh(new THREE.TorusKnotGeometry(0.55, 0.16, 48, 12), glowMat);
        diorama.add(vault);
      }

      const hitBox = new THREE.Mesh(
        new THREE.CylinderGeometry(1.75, 1.75, 3.4, 12),
        new THREE.MeshBasicMaterial({ visible: false }),
      );
      hitBox.position.y = 1.7;
      hitBox.userData = {
        interactive: {
          type: 'project',
          id: proj.id,
          label: `${proj.title} — ${proj.badgeText}`,
        } as Interactive3DSelection,
      };
      interactables.push(hitBox);
      floaters.push({ obj: diorama, baseY: 1.65, phase: idx * 0.9 });

      pWorld.add(diorama, hitBox);
      projectsIsland.add(pWorld);
    });
    scene.add(projectsIsland);

    // --- CHAPTER 05: BEYOND THE CODE — CONSTELLATION OBSERVATORY [-28, 0, -92] ---
    const beyondIsland = new THREE.Group();
    beyondIsland.position.set(...CHAPTERS[4].islandCenter);
    beyondIsland.add(createIslandPedestal(9.5, '#A855F7', gridTex));

    // Central Astrolabe Observatory Dome
    const obsBase = new THREE.Mesh(
      new THREE.CylinderGeometry(2.2, 2.6, 1.1, 16),
      new THREE.MeshStandardMaterial({ color: 0x161f38, roughness: 0.4, metalness: 0.7 }),
    );
    obsBase.position.y = 0.55;
    beyondIsland.add(obsBase);

    const astrolabeRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.2, 0.08, 12, 40),
      new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        emissive: 0xa855f7,
        emissiveIntensity: 1.3,
        roughness: 0.2,
        metalness: 0.85,
      }),
    );
    astrolabeRing.position.y = 2.8;
    beyondIsland.add(astrolabeRing);
    animatedRings.push(astrolabeRing);

    // Constellation Star Nodes & Connecting Lines
    const starPoints: THREE.Vector3[] = [];
    CONSTELLATION_NODES.forEach((node, idx) => {
      const localPos = new THREE.Vector3(
        node.starPosition[0] - CHAPTERS[4].islandCenter[0],
        node.starPosition[1],
        node.starPosition[2] - CHAPTERS[4].islandCenter[2],
      );
      starPoints.push(localPos);

      const starGroup = new THREE.Group();
      starGroup.position.copy(localPos);

      const starMat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: 1.8,
        roughness: 0.15,
        metalness: 0.9,
      });

      const starCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.48, 0), starMat);
      const starHalo = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.04, 8, 24), starMat);
      starGroup.add(starCore, starHalo);

      const starHit = new THREE.Mesh(
        new THREE.SphereGeometry(0.95, 12, 12),
        new THREE.MeshBasicMaterial({ visible: false }),
      );
      starHit.userData = {
        interactive: {
          type: 'constellation',
          id: node.id,
          label: `${node.title} (${node.date})`,
        } as Interactive3DSelection,
      };
      interactables.push(starHit);
      starGroup.add(starHit);

      floaters.push({ obj: starGroup, baseY: localPos.y, phase: idx * 1.4 });
      beyondIsland.add(starGroup);
    });

    if (starPoints.length > 1) {
      const lineGeo = new THREE.BufferGeometry().setFromPoints([...starPoints, starPoints[0]]);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.55 });
      beyondIsland.add(new THREE.Line(lineGeo, lineMat));
    }
    scene.add(beyondIsland);

    // --- CHAPTER 06: THE NEXT FRONTIER — COMMUNICATION PORTAL [0, 0, -120] ---
    const frontierIsland = new THREE.Group();
    frontierIsland.position.set(...CHAPTERS[5].islandCenter);
    frontierIsland.add(createIslandPedestal(10.0, '#F59E0B', gridTex));

    const portalGroup = new THREE.Group();
    portalGroup.position.set(0, 3.8, -1.5);

    const portalOuter = new THREE.Mesh(
      new THREE.TorusGeometry(3.6, 0.24, 16, 48),
      new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.3,
        metalness: 0.85,
      }),
    );
    const portalInner = new THREE.Mesh(
      new THREE.TorusGeometry(3.1, 0.1, 16, 48),
      new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0xf59e0b,
        emissiveIntensity: 1.6,
        roughness: 0.2,
        metalness: 0.9,
      }),
    );
    const portalCore = new THREE.Mesh(
      new THREE.TorusGeometry(2.4, 0.06, 12, 40),
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x38bdf8,
        emissiveIntensity: 1.5,
      }),
    );
    animatedRings.push(portalInner, portalCore);
    portalGroup.add(portalOuter, portalInner, portalCore);
    frontierIsland.add(portalGroup);
    scene.add(frontierIsland);

    // --- INTER-ISLAND ENERGY PATHWAYS (TubeGeometry) ---
    const islandCenters = CHAPTERS.map((c) => new THREE.Vector3(...c.islandCenter));
    const pathCurve = new THREE.CatmullRomCurve3(islandCenters);
    const pathGeo = new THREE.TubeGeometry(pathCurve, 96, 0.12, 8, false);
    const pathMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.9,
      roughness: 0.3,
      metalness: 0.7,
    });
    const pathMesh = new THREE.Mesh(pathGeo, pathMat);
    pathMesh.position.y = -0.35;
    scene.add(pathMesh);

    // --- INSTANCED COSMIC DATA SHARDS (220 instances, 1 draw call) ---
    const shardCount = 220;
    const shardGeo = new THREE.OctahedronGeometry(0.18, 0);
    const shardMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.25,
      metalness: 0.8,
    });
    const instancedShards = new THREE.InstancedMesh(shardGeo, shardMat, shardCount);
    const palette = [0xf59e0b, 0x38bdf8, 0x10b981, 0xa855f7, 0xe2e8f0];

    for (let i = 0; i < shardCount; i++) {
      const t = i / shardCount;
      const spreadX = (Math.sin(i * 12.9898) * 45) + (i % 2 === 0 ? -10 : 10);
      const spreadY = (Math.cos(i * 78.233) * 14) + 4;
      const spreadZ = -t * 140 + 12;
      const scale = 0.6 + (i % 5) * 0.25;

      _dummyObj.position.set(spreadX, spreadY, spreadZ);
      _dummyObj.rotation.set(i * 0.4, i * 0.7, 0);
      _dummyObj.scale.setScalar(scale);
      _dummyObj.updateMatrix();
      instancedShards.setMatrixAt(i, _dummyObj.matrix);

      _scratchColor.setHex(palette[i % palette.length]);
      instancedShards.setColorAt(i, _scratchColor);
    }
    instancedShards.instanceMatrix.needsUpdate = true;
    if (instancedShards.instanceColor) instancedShards.instanceColor.needsUpdate = true;
    instancedShards.computeBoundingSphere();
    scene.add(instancedShards);

    // --- EXPLORATION SCOUT DRONE (Composite 6-part Group for Mode B) ---
    const droneGroup = new THREE.Group();
    droneGroup.position.set(0, 2.2, 4);

    const droneBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.45, 0.55, 0.28, 12),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3, metalness: 0.8 }),
    );
    const droneDome = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 1.1,
        roughness: 0.15,
        metalness: 0.9,
      }),
    );
    droneDome.position.y = 0.14;

    const droneRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.72, 0.06, 10, 24),
      new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0xf59e0b,
        emissiveIntensity: 1.4,
      }),
    );
    droneRing.rotation.x = Math.PI / 2;

    const droneShadow = createContactShadow(0.9, 0.35);
    droneShadow.position.y = -2.18;

    droneGroup.add(droneBody, droneDome, droneRing, droneShadow);
    scene.add(droneGroup);

    // Pre-warm shaders on GPU
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // =========================================================================
    // INPUT & RAYCASTING HANDLERS
    // =========================================================================
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const pointerParallax = { x: 0, y: 0 };
    const activeKeys: Record<string, boolean> = {};
    let lastRaycastTime = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      pointer.set(nx, ny);
      pointerParallax.x = nx * 0.65;
      pointerParallax.y = ny * 0.35;

      const now = performance.now();
      if (now - lastRaycastTime < 60) return;
      lastRaycastTime = now;

      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(interactables, false);
      if (hits.length > 0 && hits[0].object.userData?.interactive) {
        renderer.domElement.style.cursor = 'pointer';
        propsRef.current.onHoverObject(hits[0].object.userData.interactive);
      } else {
        renderer.domElement.style.cursor = propsRef.current.exploreMode ? 'grab' : 'default';
        propsRef.current.onHoverObject(null);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(interactables, false);
      if (hits.length > 0 && hits[0].object.userData?.interactive) {
        propsRef.current.onSelectObject(hits[0].object.userData.interactive);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      activeKeys[e.code] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      activeKeys[e.code] = false;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    };

    renderer.domElement.addEventListener('pointermove', handlePointerMove);
    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('resize', handleResize);

    // =========================================================================
    // CENTRAL ANIMATION LOOP (WITH SOFTWARE-WEBGL FENCE PACING)
    // =========================================================================
    const startTime = performance.now();
    let lastFrameTime = startTime;
    let lastScrollProg = propsRef.current.scrollProgress;
    let frameId = 0;
    let wasExploreMode = false;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (gl && typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 85);
          }
        };
        frameId = window.setTimeout(poll, 5);
      } else {
        frameId = window.setTimeout(cb, 85);
      }
    }

    function tick() {
      const now = performance.now();
      const rawDelta = (now - lastFrameTime) / 1000;
      lastFrameTime = now;
      const dt = Math.min(Math.max(rawDelta, 0.001), 0.1);
      const elapsed = (now - startTime) / 1000;
      const {
        scrollProgress: prog,
        exploreMode: isExplore,
        reducedMotion: isReduced,
        qualityMode: qMode,
        mobileJoystickVector: joyVec,
      } = propsRef.current;

      // Adjust pixel ratio if user toggled quality mode
      const desiredRatio =
        isSoftwareGl || qMode === 'eco'
          ? 1
          : Math.min(window.devicePixelRatio, 2);
      if (renderer.getPixelRatio() !== desiredRatio) {
        renderer.setPixelRatio(desiredRatio);
      }

      // Subtle environmental motion
      if (!isReduced) {
        for (let i = 0; i < animatedRings.length; i++) {
          animatedRings[i].rotation.z += dt * (0.25 + i * 0.08);
          animatedRings[i].rotation.y += dt * 0.18;
        }
        for (let i = 0; i < floaters.length; i++) {
          const f = floaters[i];
          f.obj.position.y = f.baseY + Math.sin(elapsed * 1.8 + f.phase) * 0.14;
          f.obj.rotation.y += dt * 0.45;
        }
      }

      // Camera & Mode Orchestration
      if (isExplore) {
        controls.enabled = true;
        droneGroup.visible = true;

        if (!wasExploreMode) {
          // Initialize drone near current camera target when entering Explore Mode
          const interp = interpolateCameraState(prog);
          droneGroup.position.set(
            interp.cameraTarget[0],
            2.2,
            interp.cameraTarget[2] + 4,
          );
          controls.target.copy(droneGroup.position);
          wasExploreMode = true;
        }

        // Move drone via WASD / Arrow keys or mobile touch joystick
        const moveSpeed = 14 * dt;
        camera.getWorldDirection(_droneForward);
        _droneForward.y = 0;
        if (_droneForward.lengthSq() > 0.0001) _droneForward.normalize();
        _droneRight.crossVectors(_droneForward, camera.up).normalize();

        let forwardInput = 0;
        let rightInput = 0;
        if (activeKeys['KeyW'] || activeKeys['ArrowUp']) forwardInput += 1;
        if (activeKeys['KeyS'] || activeKeys['ArrowDown']) forwardInput -= 1;
        if (activeKeys['KeyD'] || activeKeys['ArrowRight']) rightInput += 1;
        if (activeKeys['KeyA'] || activeKeys['ArrowLeft']) rightInput -= 1;

        if (joyVec) {
          rightInput += joyVec.x;
          forwardInput += joyVec.y;
        }

        if (Math.abs(forwardInput) > 0.01 || Math.abs(rightInput) > 0.01) {
          _scratchVec
            .set(0, 0, 0)
            .addScaledVector(_droneForward, forwardInput * moveSpeed)
            .addScaledVector(_droneRight, rightInput * moveSpeed);

          droneGroup.position.add(_scratchVec);
          camera.position.add(_scratchVec);
          controls.target.copy(droneGroup.position);
        }

        controls.update();
      } else {
        controls.enabled = false;
        wasExploreMode = false;
        droneGroup.visible = false;

        const interp = interpolateCameraState(prog);
        const px = isReduced ? 0 : pointerParallax.x;
        const py = isReduced ? 0 : pointerParallax.y;

        _targetCamPos.set(
          interp.cameraPosition[0] + px,
          interp.cameraPosition[1] + py,
          interp.cameraPosition[2],
        );
        _targetLookAt.set(...interp.cameraTarget);

        const jumpedChapter = Math.abs(prog - lastScrollProg) > 0.08;
        lastScrollProg = prog;

        const dampFactor =
          isReduced || isSoftwareGl || jumpedChapter
            ? 1
            : 1 - Math.exp(-8.5 * dt);
        camera.position.lerp(_targetCamPos, dampFactor);
        _currentLookAt.lerp(_targetLookAt, dampFactor);
        camera.lookAt(_currentLookAt);
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      gridTex.dispose();
      monTexLeft.dispose();
      monTexRight.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webglSupported) {
    return (
      <div
        data-testid="webgl-fallback"
        className="fixed inset-0 z-0 bg-[#070B14] flex flex-col items-center justify-center p-8 text-center"
      >
        <div className="max-w-lg border border-slate-800 bg-[#0B1221] p-8 rounded-2xl">
          <p className="text-xs font-mono text-amber-400 mb-2">
            Lightweight 2D Architectural View Active
          </p>
          <h2 className="text-2xl font-bold text-slate-100 mb-3">
            Sathya — Beyond the Screen
          </h2>
          <p className="text-sm text-slate-400">
            WebGL hardware acceleration is unavailable on this device. All chapters, verified projects, and interactive tools remain 100% accessible via the interface controls.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={canvasMountRef}
      data-testid="universe-canvas-container"
      aria-label="Interactive 3D Developer Universe of Yejju Sathya Sai"
      className="fixed inset-0 z-0 w-screen h-screen overflow-hidden"
    />
  );
};
