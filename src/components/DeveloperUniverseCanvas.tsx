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
  PERSONAL_ARTIFACTS,
  EDUCATION_CAMPUSES,
  AI_LAB_PIPELINES,
  CASE_STUDIES,
  OPEN_SOURCE_REPOS,
  HACKATHON_ARENAS,
  EXPERIENCE_TRACKS,
} from '../data/portfolio';
import { interpolateCameraState } from '../utils/worldLogic';

export interface Interactive3DSelection {
  type:
    | 'project'
    | 'artifact'
    | 'constellation'
    | 'milestone'
    | 'persona'
    | 'education'
    | 'pipeline'
    | 'casestudy'
    | 'repo'
    | 'hackathon';
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

  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.fillRect(12, 12, 488, 36);

  ctx.fillStyle = accentHex;
  ctx.font = 'bold 23px monospace';
  ctx.fillText(title, 28, 92);

  ctx.fillStyle = '#E2E8F0';
  ctx.font = '18px sans-serif';
  ctx.fillText(subtitle, 28, 132);

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

  const hullGeo = new THREE.CylinderGeometry(radius * 0.86, radius * 0.28, 2.8, 8);
  const hullMat = new THREE.MeshStandardMaterial({
    color: 0x090f1d,
    roughness: 0.75,
    metalness: 0.3,
  });
  const hull = new THREE.Mesh(hullGeo, hullMat);
  hull.position.y = -2.0;
  group.add(hull);

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

    const isMobileDevice = window.innerWidth < 768;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.16;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, isMobileDevice ? 1.5 : 2),
    );
    renderer.shadowMap.enabled = !isSoftwareGl && !isMobileDevice;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070b14);
    scene.fog = new THREE.FogExp2(0x070b14, 0.0072);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    const aspect = window.innerWidth / window.innerHeight;
    const isPortrait = aspect < 0.85;
    const initialInterp = interpolateCameraState(propsRef.current.scrollProgress, isPortrait);
    const camera = new THREE.PerspectiveCamera(
      isPortrait ? 60 : 52,
      aspect,
      0.1,
      300,
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
    controls.maxDistance = 48;

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x0b132b, 0.95);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff1d0, 2.2);
    keyLight.position.set(18, 28, 16);
    if (!isSoftwareGl && !isMobileDevice) {
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

    const rimLight = new THREE.DirectionalLight(0x818cf8, 1.15);
    rimLight.position.set(-20, 18, -40);
    scene.add(rimLight);

    const gridTex = createProceduralGridTexture(renderer);
    const interactables: THREE.Object3D[] = [];
    const animatedRings: THREE.Object3D[] = [];
    const floaters: { obj: THREE.Object3D; baseY: number; phase: number }[] = [];

    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x162036,
      roughness: 0.4,
      metalness: 0.65,
    });
    const slateMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.32,
      metalness: 0.72,
    });
    const amberGlowMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xf59e0b,
      emissiveIntensity: 1.5,
      roughness: 0.2,
      metalness: 0.85,
    });
    const cyanGlowMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 1.5,
      roughness: 0.2,
      metalness: 0.85,
    });
    const emeraldGlowMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x10b981,
      emissiveIntensity: 1.45,
      roughness: 0.2,
      metalness: 0.85,
    });
    const purpleGlowMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0xa855f7,
      emissiveIntensity: 1.45,
      roughness: 0.2,
      metalness: 0.85,
    });

    // =========================================================================
    // BUILD ALL 14 INTERCONNECTED CHAPTER ISLANDS
    // =========================================================================

    // --- CH 01: ARRIVAL — THE WORLD AWAKENS [0, 0, 0] ---
    const ch01Island = new THREE.Group();
    ch01Island.position.set(...CHAPTERS[0].islandCenter);
    ch01Island.add(createIslandPedestal(8.5, '#F59E0B', gridTex));

    const deskGroup = new THREE.Group();
    deskGroup.add(createContactShadow(4.2, 0.5));

    const deskSurface = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.16, 2.2), slateMat);
    deskSurface.position.set(0, 1.25, 0);
    deskGroup.add(deskSurface);

    const deskStrip = new THREE.Mesh(new THREE.BoxGeometry(5.24, 0.05, 2.24), amberGlowMat);
    deskStrip.position.set(0, 1.21, 0);
    deskGroup.add(deskStrip);

    [
      [-2.3, -0.9],
      [2.3, -0.9],
      [-2.3, 0.9],
      [2.3, 0.9],
    ].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, 1.25, 10), darkMetalMat);
      leg.position.set(lx, 0.625, lz);
      deskGroup.add(leg);
    });

    const monTexLeft = createMonitorScreenTexture(
      renderer,
      'YEJJU SATHYA SAI',
      'B.Tech CSE (AI & ML) • VNR VJIET',
      '#F59E0B',
    );
    const monTexRight = createMonitorScreenTexture(
      renderer,
      'SIH 2026 & KODEX',
      '177+ Verified Tests Passing',
      '#38BDF8',
    );

    const createMonitor = (tex: THREE.CanvasTexture, x: number, rotY: number) => {
      const mGroup = new THREE.Group();
      mGroup.position.set(x, 1.33, -0.45);
      mGroup.rotation.y = rotY;

      const standBase = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 0.06, 12), darkMetalMat);
      standBase.position.y = 0.03;
      mGroup.add(standBase);

      const neck = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.65, 0.12), darkMetalMat);
      neck.position.set(0, 0.35, -0.08);
      mGroup.add(neck);

      const frame = new THREE.Mesh(new THREE.BoxGeometry(2.1, 1.15, 0.08), slateMat);
      frame.position.set(0, 0.82, 0);
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

    const kbBody = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.07, 0.45), darkMetalMat);
    kbBody.position.set(0, 1.36, 0.45);
    deskGroup.add(kbBody);

    const kbKeys = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.04, 0.36), cyanGlowMat);
    kbKeys.position.set(0, 1.39, 0.45);
    deskGroup.add(kbKeys);

    const pcChassis = new THREE.Mesh(new THREE.BoxGeometry(0.75, 1.5, 1.4), slateMat);
    pcChassis.position.set(3.4, 0.75, -0.2);
    deskGroup.add(pcChassis);

    const pcCore = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 1.2, 12), amberGlowMat);
    pcCore.position.set(3.4, 0.75, -0.18);
    deskGroup.add(pcCore);

    const holoRingOuter = new THREE.Mesh(
      new THREE.TorusGeometry(3.2, 0.045, 10, 40),
      amberGlowMat,
    );
    holoRingOuter.position.set(0, 4.2, -1.2);
    ch01Island.add(holoRingOuter);
    animatedRings.push(holoRingOuter);

    const holoRingInner = new THREE.Mesh(
      new THREE.TorusGeometry(2.4, 0.035, 10, 40),
      cyanGlowMat,
    );
    holoRingInner.position.set(0, 4.2, -1.2);
    holoRingInner.rotation.x = Math.PI / 3;
    ch01Island.add(holoRingInner);
    animatedRings.push(holoRingInner);

    ch01Island.add(deskGroup);
    scene.add(ch01Island);

    // --- CH 02: THE PERSON BEHIND THE CODE [-22, 0, -18] ---
    const ch02Island = new THREE.Group();
    ch02Island.position.set(...CHAPTERS[1].islandCenter);
    ch02Island.add(createIslandPedestal(8.0, '#38BDF8', gridTex));

    const personaCore = new THREE.Mesh(new THREE.IcosahedronGeometry(1.15, 1), cyanGlowMat);
    personaCore.position.set(0, 2.2, 0);
    ch02Island.add(personaCore);
    floaters.push({ obj: personaCore, baseY: 2.2, phase: 0.4 });

    PERSONAL_ARTIFACTS.forEach((pArt, idx) => {
      const angle = (idx / PERSONAL_ARTIFACTS.length) * Math.PI * 2;
      const rx = Math.cos(angle) * 4.4;
      const rz = Math.sin(angle) * 4.4;
      const pod = new THREE.Group();
      pod.position.set(rx, 0, rz);
      pod.add(createContactShadow(1.3, 0.4));

      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 1.05, 0.55, 8), darkMetalMat);
      base.position.y = 0.275;
      pod.add(base);

      const pMat = new THREE.MeshStandardMaterial({
        color: pArt.accentHex,
        emissive: pArt.accentHex,
        emissiveIntensity: 1.4,
        roughness: 0.2,
        metalness: 0.85,
      });
      const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.55, 0), pMat);
      crystal.position.y = 1.5;
      pod.add(crystal);
      floaters.push({ obj: crystal, baseY: 1.5, phase: idx * 1.2 });

      const hit = new THREE.Mesh(
        new THREE.CylinderGeometry(1.1, 1.1, 2.6, 8),
        new THREE.MeshBasicMaterial({ visible: false }),
      );
      hit.position.y = 1.3;
      hit.userData = {
        interactive: {
          type: 'persona',
          id: pArt.id,
          label: `${pArt.title} — ${pArt.kicker}`,
        } as Interactive3DSelection,
      };
      interactables.push(hit);
      pod.add(hit);

      ch02Island.add(pod);
    });
    scene.add(ch02Island);

    // --- CH 03: ORIGINS & EDUCATION [22, 0, -34] ---
    const ch03Island = new THREE.Group();
    ch03Island.position.set(...CHAPTERS[2].islandCenter);
    ch03Island.add(createIslandPedestal(8.8, '#818CF8', gridTex));

    // Dual Academic Citadel Towers: GIOE (Left) & VNR VJIET (Right) bridged by glowing arch
    EDUCATION_CAMPUSES.forEach((edu, idx) => {
      const tx = idx === 0 ? 2.6 : -2.6;
      const towerGroup = new THREE.Group();
      towerGroup.position.set(tx, 0, -0.5);
      towerGroup.add(createContactShadow(2.1, 0.45));

      const tMat = new THREE.MeshStandardMaterial({
        color: edu.accentHex,
        emissive: edu.accentHex,
        emissiveIntensity: 1.35,
        roughness: 0.2,
        metalness: 0.85,
      });

      const plinth = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.8, 0.7, 8), slateMat);
      plinth.position.y = 0.35;
      towerGroup.add(plinth);

      const spireHeight = idx === 0 ? 3.2 : 2.6;
      const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 1.1, spireHeight, 8), darkMetalMat);
      spire.position.y = 0.7 + spireHeight / 2;
      towerGroup.add(spire);

      const crownRing = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.07, 10, 24), tMat);
      crownRing.rotation.x = Math.PI / 2;
      crownRing.position.y = 0.7 + spireHeight;
      towerGroup.add(crownRing);
      animatedRings.push(crownRing);

      const beacon = new THREE.Mesh(new THREE.OctahedronGeometry(0.52, 0), tMat);
      beacon.position.y = 1.45 + spireHeight;
      towerGroup.add(beacon);
      floaters.push({ obj: beacon, baseY: 1.45 + spireHeight, phase: idx * 1.6 });

      const hit = new THREE.Mesh(
        new THREE.CylinderGeometry(1.6, 1.6, 4.8, 8),
        new THREE.MeshBasicMaterial({ visible: false }),
      );
      hit.position.y = 2.4;
      hit.userData = {
        interactive: {
          type: 'education',
          id: edu.id,
          label: `${edu.shortName} — ${edu.degree}`,
        } as Interactive3DSelection,
      };
      interactables.push(hit);
      towerGroup.add(hit);

      ch03Island.add(towerGroup);
    });

    // Connecting Skybridge between GIOE and VNR VJIET
    const eduBridge = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.22, 0.65), cyanGlowMat);
    eduBridge.position.set(0, 2.6, -0.5);
    ch03Island.add(eduBridge);
    scene.add(ch03Island);

    // --- CH 04: THE EVOLUTION TIMELINE [-22, 0, -50] ---
    const ch04Island = new THREE.Group();
    ch04Island.position.set(...CHAPTERS[3].islandCenter);
    ch04Island.add(createIslandPedestal(9.2, '#06B6D4', gridTex));

    JOURNEY_MILESTONES.forEach((m, idx) => {
      const archGroup = new THREE.Group();
      const angle = (idx - 2.5) * 0.46;
      const rx = Math.sin(angle) * 5.8;
      const rz = Math.cos(angle) * 3.6 - 1.5;
      archGroup.position.set(rx, 0, rz);
      archGroup.rotation.y = -angle;
      archGroup.add(createContactShadow(1.4, 0.4));

      const nodeGlowMat = idx % 2 === 0 ? cyanGlowMat : amberGlowMat;
      const leftPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.22, 2.7, 10), slateMat);
      leftPillar.position.set(-0.82, 1.35, 0);
      archGroup.add(leftPillar);

      const rightPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.22, 2.7, 10), slateMat);
      rightPillar.position.set(0.82, 1.35, 0);
      archGroup.add(rightPillar);

      const topBeam = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.25, 0.36), nodeGlowMat);
      topBeam.position.set(0, 2.78, 0);
      archGroup.add(topBeam);

      const beaconCrystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0), nodeGlowMat);
      beaconCrystal.position.set(0, 1.55, 0);
      beaconCrystal.userData = {
        interactive: {
          type: 'milestone',
          id: m.id,
          label: `${m.period}: ${m.title}`,
        } as Interactive3DSelection,
      };
      interactables.push(beaconCrystal);
      floaters.push({ obj: beaconCrystal, baseY: 1.55, phase: idx * 1.1 });
      archGroup.add(beaconCrystal);

      ch04Island.add(archGroup);
    });
    scene.add(ch04Island);

    // --- CH 05: THE ENGINEER'S WORKSHOP [24, 0, -66] ---
    const ch05Island = new THREE.Group();
    ch05Island.position.set(...CHAPTERS[4].islandCenter);
    ch05Island.add(createIslandPedestal(9.6, '#10B981', gridTex));

    WORKSHOP_ARTIFACTS.forEach((artifact, idx) => {
      const stationGroup = new THREE.Group();
      stationGroup.position.set(
        artifact.positionOffset[0],
        0,
        artifact.positionOffset[2],
      );
      stationGroup.add(createContactShadow(1.8, 0.45));

      const accentMat = new THREE.MeshStandardMaterial({
        color: artifact.accentColor,
        emissive: artifact.accentColor,
        emissiveIntensity: 1.35,
        roughness: 0.2,
        metalness: 0.85,
      });

      const base = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.3, 0.68, 8), darkMetalMat);
      base.position.y = 0.34;
      stationGroup.add(base);

      const collar = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.06, 10, 24), accentMat);
      collar.rotation.x = Math.PI / 2;
      collar.position.y = 0.7;
      stationGroup.add(collar);

      const sculpture = new THREE.Group();
      sculpture.position.y = 1.8;

      if (idx === 0) {
        const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 1), accentMat);
        const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.88, 0.05, 10, 24), darkMetalMat);
        const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.04, 10, 24), accentMat);
        ring2.rotation.x = Math.PI / 2;
        sculpture.add(core, ring1, ring2);
      } else if (idx === 1) {
        const rack = new THREE.Mesh(new THREE.BoxGeometry(1.05, 1.45, 0.85), darkMetalMat);
        sculpture.add(rack);
        for (let b = -0.42; b <= 0.42; b += 0.28) {
          const blade = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.08, 0.9), accentMat);
          blade.position.y = b;
          sculpture.add(blade);
        }
      } else if (idx === 2) {
        const panel1 = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.8, 0.08), accentMat);
        const panel2 = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.68, 0.08), darkMetalMat);
        panel2.position.set(0.22, 0.18, -0.22);
        sculpture.add(panel1, panel2);
      } else if (idx === 3) {
        const hex1 = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.09, 6, 6), accentMat);
        const hex2 = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.07, 6, 6), darkMetalMat);
        hex2.rotation.y = Math.PI / 3;
        sculpture.add(hex1, hex2);
      } else if (idx === 4) {
        const wafer = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 0.18, 14), darkMetalMat);
        const chip = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.34, 0.68), accentMat);
        chip.position.y = 0.2;
        sculpture.add(wafer, chip);
      } else {
        // Java & StarUML Architecture Pillar
        const cube = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.78, 0.78), accentMat);
        const orbit = new THREE.Mesh(new THREE.TorusGeometry(0.92, 0.05, 10, 24), darkMetalMat);
        orbit.rotation.x = Math.PI / 3;
        sculpture.add(cube, orbit);
      }

      const hitProxy = new THREE.Mesh(
        new THREE.CylinderGeometry(1.25, 1.25, 3.0, 10),
        new THREE.MeshBasicMaterial({ visible: false }),
      );
      hitProxy.position.y = 1.5;
      hitProxy.userData = {
        interactive: {
          type: 'artifact',
          id: artifact.id,
          label: `${artifact.name} (${artifact.domainTitle})`,
        } as Interactive3DSelection,
      };
      interactables.push(hitProxy);
      floaters.push({ obj: sculpture, baseY: 1.8, phase: idx * 1.1 });

      stationGroup.add(sculpture, hitProxy);
      ch05Island.add(stationGroup);
    });
    scene.add(ch05Island);

    // --- CH 06: THE AI & MACHINE LEARNING LABORATORY [-24, 0, -82] ---
    const ch06Island = new THREE.Group();
    ch06Island.position.set(...CHAPTERS[5].islandCenter);
    ch06Island.add(createIslandPedestal(9.2, '#A855F7', gridTex));

    // Central Tensor Core & 3 Pipeline Conduits (Kodex, RAG-Bot, CBM)
    const tensorCore = new THREE.Mesh(new THREE.TorusKnotGeometry(1.1, 0.24, 64, 12), purpleGlowMat);
    tensorCore.position.set(0, 2.7, -0.5);
    ch06Island.add(tensorCore);
    animatedRings.push(tensorCore);

    AI_LAB_PIPELINES.forEach((pipe, idx) => {
      const px = (idx - 1) * 4.4;
      const pNode = new THREE.Group();
      pNode.position.set(px, 0, 2.2);
      pNode.add(createContactShadow(1.5, 0.4));

      const pColor = idx === 0 ? '#38BDF8' : idx === 1 ? '#10B981' : '#A855F7';
      const pMat = new THREE.MeshStandardMaterial({
        color: pColor,
        emissive: pColor,
        emissiveIntensity: 1.4,
        roughness: 0.2,
        metalness: 0.85,
      });
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.15, 0.6, 8), slateMat);
      base.position.y = 0.3;
      pNode.add(base);

      const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(0.58, 1), pMat);
      orb.position.y = 1.65;
      pNode.add(orb);
      floaters.push({ obj: orb, baseY: 1.65, phase: idx * 1.3 });

      const hit = new THREE.Mesh(
        new THREE.CylinderGeometry(1.2, 1.2, 2.8, 8),
        new THREE.MeshBasicMaterial({ visible: false }),
      );
      hit.position.y = 1.4;
      hit.userData = {
        interactive: {
          type: 'pipeline',
          id: pipe.id,
          label: `${pipe.name} (${pipe.projectLinked})`,
        } as Interactive3DSelection,
      };
      interactables.push(hit);
      pNode.add(hit);

      ch06Island.add(pNode);
    });
    scene.add(ch06Island);

    // --- CH 07: THE PROJECT UNIVERSE [0, 0, -102] ---
    const ch07Island = new THREE.Group();
    ch07Island.position.set(...CHAPTERS[6].islandCenter);
    ch07Island.add(createIslandPedestal(15.5, '#F59E0B', gridTex));

    PROJECTS.forEach((proj, idx) => {
      const pWorld = new THREE.Group();
      const [wx, , wz] = proj.worldLandmark.position;
      pWorld.position.set(wx, 0, wz - CHAPTERS[6].islandCenter[2]);
      pWorld.add(createContactShadow(2.1, 0.48));

      const glowMat = new THREE.MeshStandardMaterial({
        color: proj.worldLandmark.accentColor,
        emissive: proj.worldLandmark.accentColor,
        emissiveIntensity: 1.4,
        roughness: 0.2,
        metalness: 0.85,
      });

      const plinth = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.75, 0.55, 8), darkMetalMat);
      plinth.position.y = 0.275;
      pWorld.add(plinth);

      const plinthRing = new THREE.Mesh(new THREE.TorusGeometry(1.56, 0.06, 10, 28), glowMat);
      plinthRing.rotation.x = Math.PI / 2;
      plinthRing.position.y = 0.56;
      pWorld.add(plinthRing);

      const diorama = new THREE.Group();
      diorama.position.y = 1.65;

      if (proj.worldLandmark.dioramaType === 'agritech') {
        const hubDome = new THREE.Mesh(
          new THREE.SphereGeometry(0.75, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2),
          darkMetalMat,
        );
        hubDome.position.y = -0.4;
        const voiceTower = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.22, 1.4, 12), glowMat);
        voiceTower.position.y = 0.3;
        const waveRing = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.05, 10, 24), glowMat);
        waveRing.rotation.x = Math.PI / 3;
        diorama.add(hubDome, voiceTower, waveRing);
      } else if (proj.worldLandmark.dioramaType === 'kodex') {
        const spire = new THREE.Mesh(new THREE.ConeGeometry(0.65, 1.7, 6), darkMetalMat);
        const memRing1 = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.05, 10, 24), glowMat);
        const memRing2 = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.04, 10, 24), glowMat);
        memRing1.rotation.x = Math.PI / 4;
        memRing2.rotation.y = Math.PI / 3;
        diorama.add(spire, memRing1, memRing2);
      } else if (proj.worldLandmark.dioramaType === 'campus') {
        const rotunda = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.85, 0.9, 12), darkMetalMat);
        const roof = new THREE.Mesh(new THREE.ConeGeometry(0.95, 0.55, 12), glowMat);
        roof.position.y = 0.72;
        const orbit = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.04, 10, 24), glowMat);
        orbit.rotation.x = Math.PI / 2.4;
        diorama.add(rotunda, roof, orbit);
      } else if (proj.worldLandmark.dioramaType === 'cyberlab') {
        const prism = new THREE.Mesh(new THREE.OctahedronGeometry(0.78, 0), glowMat);
        const cage = new THREE.Mesh(
          new THREE.OctahedronGeometry(1.05, 0),
          new THREE.MeshBasicMaterial({ color: proj.worldLandmark.accentColor, wireframe: true }),
        );
        diorama.add(prism, cage);
      } else {
        const vault = new THREE.Mesh(new THREE.TorusKnotGeometry(0.52, 0.15, 40, 10), glowMat);
        diorama.add(vault);
      }

      const hitBox = new THREE.Mesh(
        new THREE.CylinderGeometry(1.7, 1.7, 3.4, 10),
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
      floaters.push({ obj: diorama, baseY: 1.65, phase: idx * 0.85 });

      pWorld.add(diorama, hitBox);
      ch07Island.add(pWorld);
    });
    scene.add(ch07Island);

    // --- CH 08: ENGINEERING CASE STUDIES [24, 0, -122] ---
    const ch08Island = new THREE.Group();
    ch08Island.position.set(...CHAPTERS[7].islandCenter);
    ch08Island.add(createIslandPedestal(8.8, '#38BDF8', gridTex));

    // Blueprint Table + 4 Holographic Architectural Pillars
    const holoTable = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.8, 0.7, 12), slateMat);
    holoTable.position.y = 0.35;
    ch08Island.add(holoTable);

    const tableRing = new THREE.Mesh(new THREE.TorusGeometry(3.5, 0.07, 10, 32), cyanGlowMat);
    tableRing.rotation.x = Math.PI / 2;
    tableRing.position.y = 0.72;
    ch08Island.add(tableRing);

    CASE_STUDIES.forEach((cs, idx) => {
      const angle = (idx / CASE_STUDIES.length) * Math.PI * 2 + Math.PI / 4;
      const cx = Math.cos(angle) * 2.2;
      const cz = Math.sin(angle) * 2.2;
      const csColors = ['#10B981', '#38BDF8', '#F59E0B', '#A855F7'];
      const csHex = csColors[idx % csColors.length];
      const csMat = new THREE.MeshStandardMaterial({
        color: csHex,
        emissive: csHex,
        emissiveIntensity: 1.4,
        roughness: 0.2,
        metalness: 0.85,
      });
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.75, 1.8, 0.75), csMat);
      pillar.position.set(cx, 1.8, cz);
      ch08Island.add(pillar);
      floaters.push({ obj: pillar, baseY: 1.8, phase: idx * 1.2 });

      const hit = new THREE.Mesh(
        new THREE.BoxGeometry(1.1, 2.4, 1.1),
        new THREE.MeshBasicMaterial({ visible: false }),
      );
      hit.position.set(cx, 1.8, cz);
      hit.userData = {
        interactive: {
          type: 'casestudy',
          id: cs.id,
          label: `${cs.title}: ${cs.subtitle}`,
        } as Interactive3DSelection,
      };
      interactables.push(hit);
      ch08Island.add(hit);
    });
    scene.add(ch08Island);

    // --- CH 09: THE OPEN-SOURCE UNIVERSE [-24, 0, -138] ---
    const ch09Island = new THREE.Group();
    ch09Island.position.set(...CHAPTERS[8].islandCenter);
    ch09Island.add(createIslandPedestal(9.2, '#10B981', gridTex));

    const hubSphere = new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 1), emeraldGlowMat);
    hubSphere.position.set(0, 2.4, 0);
    ch09Island.add(hubSphere);
    animatedRings.push(hubSphere);

    OPEN_SOURCE_REPOS.forEach((repo, idx) => {
      const angle = (idx / OPEN_SOURCE_REPOS.length) * Math.PI * 2;
      const rx = Math.cos(angle) * 5.2;
      const rz = Math.sin(angle) * 5.2;
      const rGroup = new THREE.Group();
      rGroup.position.set(rx, 0, rz);

      const repoColors = ['#10B981', '#38BDF8', '#F59E0B', '#A855F7', '#EC4899'];
      const rHex = repoColors[idx % repoColors.length];
      const rMat = new THREE.MeshStandardMaterial({
        color: rHex,
        emissive: rHex,
        emissiveIntensity: 1.35,
        roughness: 0.2,
        metalness: 0.85,
      });
      const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.82, 0.5, 8), darkMetalMat);
      pedestal.position.y = 0.25;
      rGroup.add(pedestal);

      const node = new THREE.Mesh(new THREE.DodecahedronGeometry(0.46, 0), rMat);
      node.position.y = 1.45;
      rGroup.add(node);
      floaters.push({ obj: node, baseY: 1.45, phase: idx * 0.9 });

      const hit = new THREE.Mesh(
        new THREE.CylinderGeometry(0.9, 0.9, 2.2, 8),
        new THREE.MeshBasicMaterial({ visible: false }),
      );
      hit.position.y = 1.1;
      hit.userData = {
        interactive: {
          type: 'repo',
          id: repo.name,
          label: `${repo.name} (${repo.language} • ${repo.starsLabel})`,
        } as Interactive3DSelection,
      };
      interactables.push(hit);
      rGroup.add(hit);

      ch09Island.add(rGroup);
    });
    scene.add(ch09Island);

    // --- CH 10: HACKATHONS & COLLABORATIONS [22, 0, -154] ---
    const ch10Island = new THREE.Group();
    ch10Island.position.set(...CHAPTERS[9].islandCenter);
    ch10Island.add(createIslandPedestal(9.0, '#F97316', gridTex));

    // Central Trophy Core + 5 Stadium Arches
    const trophyCore = new THREE.Mesh(new THREE.OctahedronGeometry(1.15, 0), amberGlowMat);
    trophyCore.position.set(0, 2.4, 0);
    ch10Island.add(trophyCore);
    floaters.push({ obj: trophyCore, baseY: 2.4, phase: 0.5 });

    HACKATHON_ARENAS.forEach((h, idx) => {
      const angle = (idx / HACKATHON_ARENAS.length) * Math.PI * 2;
      const hx = Math.cos(angle) * 4.8;
      const hz = Math.sin(angle) * 4.8;
      const hGroup = new THREE.Group();
      hGroup.position.set(hx, 0, hz);
      hGroup.rotation.y = -angle;

      const hMat = new THREE.MeshStandardMaterial({
        color: h.accentHex,
        emissive: h.accentHex,
        emissiveIntensity: 1.35,
        roughness: 0.2,
        metalness: 0.85,
      });
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.65, 2.2, 8), slateMat);
      pillar.position.y = 1.1;
      hGroup.add(pillar);

      const crown = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.08, 8, 20), hMat);
      crown.position.y = 2.4;
      hGroup.add(crown);
      animatedRings.push(crown);

      const hit = new THREE.Mesh(
        new THREE.CylinderGeometry(0.95, 0.95, 2.8, 8),
        new THREE.MeshBasicMaterial({ visible: false }),
      );
      hit.position.y = 1.4;
      hit.userData = {
        interactive: {
          type: 'hackathon',
          id: h.id,
          label: `${h.event} — ${h.projectBuilt}`,
        } as Interactive3DSelection,
      };
      interactables.push(hit);
      hGroup.add(hit);

      ch10Island.add(hGroup);
    });
    scene.add(ch10Island);

    // --- CH 11: EXPERIENCE & TECHNICAL GROWTH [-22, 0, -170] ---
    const ch11Island = new THREE.Group();
    ch11Island.position.set(...CHAPTERS[10].islandCenter);
    ch11Island.add(createIslandPedestal(8.6, '#EC4899', gridTex));

    // Ascending Spire of 4 Experience Tracks
    EXPERIENCE_TRACKS.forEach((_exp, idx) => {
      const tierRadius = 3.8 - idx * 0.72;
      const tierY = 0.5 + idx * 0.95;
      const expColors = ['#EC4899', '#38BDF8', '#10B981', '#F59E0B'];
      const eHex = expColors[idx % expColors.length];
      const eMat = new THREE.MeshStandardMaterial({
        color: eHex,
        emissive: eHex,
        emissiveIntensity: 1.35,
        roughness: 0.2,
        metalness: 0.85,
      });
      const tierCyl = new THREE.Mesh(
        new THREE.CylinderGeometry(tierRadius * 0.9, tierRadius, 0.55, 12),
        slateMat,
      );
      tierCyl.position.y = tierY;
      ch11Island.add(tierCyl);

      const tierRing = new THREE.Mesh(
        new THREE.TorusGeometry(tierRadius * 0.96, 0.06, 10, 28),
        eMat,
      );
      tierRing.rotation.x = Math.PI / 2;
      tierRing.position.y = tierY + 0.28;
      ch11Island.add(tierRing);
      animatedRings.push(tierRing);
    });
    scene.add(ch11Island);

    // --- CH 12: ACHIEVEMENTS & CERTIFICATIONS [20, 0, -186] ---
    const ch12Island = new THREE.Group();
    ch12Island.position.set(...CHAPTERS[11].islandCenter);
    ch12Island.add(createIslandPedestal(9.5, '#A855F7', gridTex));

    const obsBase = new THREE.Mesh(
      new THREE.CylinderGeometry(2.2, 2.6, 1.1, 16),
      darkMetalMat,
    );
    obsBase.position.y = 0.55;
    ch12Island.add(obsBase);

    const astrolabeRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.2, 0.08, 12, 40),
      purpleGlowMat,
    );
    astrolabeRing.position.y = 2.8;
    ch12Island.add(astrolabeRing);
    animatedRings.push(astrolabeRing);

    const starPoints: THREE.Vector3[] = [];
    CONSTELLATION_NODES.forEach((node, idx) => {
      const localPos = new THREE.Vector3(
        node.starPosition[0] - CHAPTERS[11].islandCenter[0],
        node.starPosition[1],
        node.starPosition[2] - CHAPTERS[11].islandCenter[2],
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

      const starCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.46, 0), starMat);
      const starHalo = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.04, 8, 24), starMat);
      starGroup.add(starCore, starHalo);

      const starHit = new THREE.Mesh(
        new THREE.SphereGeometry(0.95, 10, 10),
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
      ch12Island.add(starGroup);
    });

    if (starPoints.length > 1) {
      const lineGeo = new THREE.BufferGeometry().setFromPoints([...starPoints, starPoints[0]]);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.55 });
      ch12Island.add(new THREE.Line(lineGeo, lineMat));
    }
    scene.add(ch12Island);

    // --- CH 13: THE INTERACTIVE PLAYGROUND [-18, 0, -202] ---
    const ch13Island = new THREE.Group();
    ch13Island.position.set(...CHAPTERS[12].islandCenter);
    ch13Island.add(createIslandPedestal(9.2, '#14B8A6', gridTex));

    // Kinetic Drone Rings & Puzzle Gyroscope
    for (let r = 0; r < 3; r++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.8 - r * 0.65, 0.09, 12, 36),
        r % 2 === 0 ? emeraldGlowMat : cyanGlowMat,
      );
      ring.position.set(0, 2.6, 0);
      ring.rotation.set(r * 0.6, r * 0.4, 0);
      ch13Island.add(ring);
      animatedRings.push(ring);
    }
    const puzzleCube = new THREE.Mesh(new THREE.OctahedronGeometry(0.9, 0), amberGlowMat);
    puzzleCube.position.set(0, 2.6, 0);
    ch13Island.add(puzzleCube);
    floaters.push({ obj: puzzleCube, baseY: 2.6, phase: 0.9 });
    scene.add(ch13Island);

    // --- CH 14: THE NEXT FRONTIER — CONNECT [0, 0, -218] ---
    const ch14Island = new THREE.Group();
    ch14Island.position.set(...CHAPTERS[13].islandCenter);
    ch14Island.add(createIslandPedestal(10.2, '#F59E0B', gridTex));

    const portalGroup = new THREE.Group();
    portalGroup.position.set(0, 3.8, -1.5);

    const portalOuter = new THREE.Mesh(
      new THREE.TorusGeometry(3.6, 0.24, 16, 48),
      slateMat,
    );
    const portalInner = new THREE.Mesh(
      new THREE.TorusGeometry(3.1, 0.1, 16, 48),
      amberGlowMat,
    );
    const portalCore = new THREE.Mesh(
      new THREE.TorusGeometry(2.4, 0.06, 12, 40),
      cyanGlowMat,
    );
    animatedRings.push(portalInner, portalCore);
    portalGroup.add(portalOuter, portalInner, portalCore);
    ch14Island.add(portalGroup);
    scene.add(ch14Island);

    // --- INTER-ISLAND ENERGY PATHWAY & ANIMATED PULSE RINGS ---
    const islandCenters = CHAPTERS.map((c) => new THREE.Vector3(...c.islandCenter));
    const pathCurve = new THREE.CatmullRomCurve3(islandCenters);
    const pathGeo = new THREE.TubeGeometry(pathCurve, 180, 0.12, 8, false);
    const pathMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.95,
      roughness: 0.3,
      metalness: 0.7,
    });
    const pathMesh = new THREE.Mesh(pathGeo, pathMat);
    pathMesh.position.y = -0.35;
    scene.add(pathMesh);

    // Energy Pulse Rings traveling along the spline highway
    const highwayPulses: { mesh: THREE.Mesh; offset: number }[] = [];
    const pulseGeo = new THREE.SphereGeometry(0.28, 10, 10);
    for (let p = 0; p < 14; p++) {
      const pulseMesh = new THREE.Mesh(pulseGeo, p % 2 === 0 ? amberGlowMat : cyanGlowMat);
      scene.add(pulseMesh);
      highwayPulses.push({ mesh: pulseMesh, offset: p / 14 });
    }

    // --- INSTANCED COSMIC DATA SHARDS (320 instances across z = 12 to -235, 1 draw call) ---
    const shardCount = 320;
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
      const spreadX = Math.sin(i * 12.9898) * 44 + (i % 2 === 0 ? -9 : 9);
      const spreadY = Math.cos(i * 78.233) * 14 + 4;
      const spreadZ = -t * 245 + 14;
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

    // --- EXPLORATION SCOUT DRONE (Mode B) ---
    const droneGroup = new THREE.Group();
    droneGroup.position.set(0, 2.2, 4);

    const droneBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.45, 0.55, 0.28, 12),
      slateMat,
    );
    const droneDome = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2),
      cyanGlowMat,
    );
    droneDome.position.y = 0.14;

    const droneRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.72, 0.06, 10, 24),
      amberGlowMat,
    );
    droneRing.rotation.x = Math.PI / 2;

    const droneShadow = createContactShadow(0.9, 0.35);
    droneShadow.position.y = -2.18;

    droneGroup.add(droneBody, droneDome, droneRing, droneShadow);
    scene.add(droneGroup);

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
      pointerParallax.x = nx * 0.55;
      pointerParallax.y = ny * 0.3;

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
      const newAspect = window.innerWidth / window.innerHeight;
      camera.aspect = newAspect;
      camera.fov = newAspect < 0.85 ? 60 : 52;
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

      const desiredRatio =
        isSoftwareGl || qMode === 'eco'
          ? 1
          : Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.5 : 2);
      if (renderer.getPixelRatio() !== desiredRatio) {
        renderer.setPixelRatio(desiredRatio);
      }

      if (!isReduced) {
        for (let i = 0; i < animatedRings.length; i++) {
          animatedRings[i].rotation.z += dt * (0.24 + (i % 4) * 0.07);
          animatedRings[i].rotation.y += dt * 0.18;
        }
        for (let i = 0; i < floaters.length; i++) {
          const f = floaters[i];
          f.obj.position.y = f.baseY + Math.sin(elapsed * 1.85 + f.phase) * 0.14;
          f.obj.rotation.y += dt * 0.45;
        }
        for (let i = 0; i < highwayPulses.length; i++) {
          const hp = highwayPulses[i];
          const t = (elapsed * 0.032 + hp.offset) % 1;
          pathCurve.getPointAt(t, hp.mesh.position);
          hp.mesh.position.y -= 0.35;
        }
      }

      const isMobilePortrait = camera.aspect < 0.85;

      if (isExplore) {
        controls.enabled = true;
        droneGroup.visible = true;

        if (!wasExploreMode) {
          const interp = interpolateCameraState(prog, isMobilePortrait);
          droneGroup.position.set(
            interp.cameraTarget[0],
            2.2,
            interp.cameraTarget[2] + 4,
          );
          controls.target.copy(droneGroup.position);
          wasExploreMode = true;
        }

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

        const interp = interpolateCameraState(prog, isMobilePortrait);
        const px = isReduced || isMobilePortrait ? 0 : pointerParallax.x;
        const py = isReduced || isMobilePortrait ? 0 : pointerParallax.y;

        _targetCamPos.set(
          interp.cameraPosition[0] + px,
          interp.cameraPosition[1] + py,
          interp.cameraPosition[2],
        );
        _targetLookAt.set(...interp.cameraTarget);

        const jumpedChapter = Math.abs(prog - lastScrollProg) > 0.05;
        lastScrollProg = prog;

        const dampFactor =
          isReduced || isSoftwareGl || jumpedChapter
            ? 1
            : 1 - Math.exp(-9.0 * dt);
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
            WebGL hardware acceleration is unavailable on this device. All 14 chapters, verified projects, and interactive tools remain 100% accessible via the interface controls.
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
