// src/components/InteractiveMitroxLogo.tsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import logo from "../assets/logo.png";

type SceneState = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  points: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>;
  orbitPoints: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial> | null;
  geometry: THREE.BufferGeometry;
  orbitGeometry: THREE.BufferGeometry | null;
  positions: Float32Array;
  targetPositions: Float32Array;
  velocities: Float32Array;
  colors: Float32Array;
  orbitPositions: Float32Array | null;
  orbitTrailMix: Float32Array | null;
  noiseOffsets: Float32Array;
  mouse: THREE.Vector3;
  targetRotation: { x: number; y: number };
  currentRotation: { x: number; y: number };
  rotationSpeed: number;
  targetRotationSpeed: number;
  particleCount: number;
  interaction: number;
  isHovering: boolean;
  animationId: number;
  cleanup: () => void;
};

const IMAGE_SOURCE = logo;
const SAMPLE_BASE = 260;
const SAMPLE_STEP = 3;
const MAX_PARTICLES = 12000;

type SampleResult = {
  points: Array<[number, number]>;
};

async function sampleImagePoints(src: string): Promise<SampleResult> {
  if (typeof window === "undefined") {
    return { points: [] };
  }

  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = src;

  await new Promise((resolve, reject) => {
    image.onload = () => resolve(undefined);
    image.onerror = reject;
  });

  const aspect = image.width / image.height || 1;
  let sampleWidth = SAMPLE_BASE;
  let sampleHeight = Math.round(SAMPLE_BASE / aspect);

  if (sampleHeight > SAMPLE_BASE) {
    sampleHeight = SAMPLE_BASE;
    sampleWidth = Math.round(SAMPLE_BASE * aspect);
  }

  const canvas = document.createElement("canvas");
  canvas.width = sampleWidth;
  canvas.height = sampleHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return { points: [] };
  }

  ctx.drawImage(image, 0, 0, sampleWidth, sampleHeight);
  const imageData = ctx.getImageData(0, 0, sampleWidth, sampleHeight).data;

  const points: Array<[number, number]> = [];
  const brightnessThreshold = 50;

  for (let y = 0; y < sampleHeight; y += SAMPLE_STEP) {
    for (let x = 0; x < sampleWidth; x += SAMPLE_STEP) {
      const idx = (y * sampleWidth + x) * 4;
      const r = imageData[idx];
      const g = imageData[idx + 1];
      const b = imageData[idx + 2];
      const a = imageData[idx + 3];
      const brightness = (r + g + b) / 3;

      if (a > 15 && brightness > brightnessThreshold) {
        const nx = x / sampleWidth - 0.5;
        const ny = y / sampleHeight - 0.5;
        points.push([nx, ny]);
      }
    }
  }

  if (points.length > MAX_PARTICLES) {
    const ratio = MAX_PARTICLES / points.length;
    const filtered: Array<[number, number]> = [];
    for (let i = 0; i < points.length; i++) {
      if (Math.random() < ratio) {
        filtered.push(points[i]);
      }
    }
    return { points: filtered };
  }

  return { points };
}

const InteractiveMitroxLogo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<SceneState | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    let initFrameId: number | null = null;

    const init = async () => {
      if (!canvas) return;

      if (sceneRef.current) {
        sceneRef.current.cleanup();
        sceneRef.current = null;
      }

      const parent = canvas.parentElement;
      const rect = parent?.getBoundingClientRect();
      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(rect?.width ?? canvas.clientWidth ?? 640, 320);
      const height = Math.max(rect?.height ?? width, 320);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(devicePixelRatio);
      renderer.setSize(width, height, false);
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
      camera.position.set(0, 0, 1.75);
      camera.lookAt(0, 0, 0);

      const { points } = await sampleImagePoints(IMAGE_SOURCE);
      if (!points.length) {
        return;
      }

      const particleCount = points.length;
      const positions = new Float32Array(particleCount * 3);
      const targetPositions = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const noiseOffsets = new Float32Array(particleCount);

      const depthRange = 0.2;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const [nx, ny] = points[i];

        targetPositions[idx] = nx;
        targetPositions[idx + 1] = -ny;
        targetPositions[idx + 2] = (Math.random() - 0.5) * depthRange;

        const randomRadius = 0.15 + Math.random() * 0.35;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        positions[idx] = randomRadius * Math.sin(phi) * Math.cos(theta);
        positions[idx + 1] = randomRadius * Math.sin(phi) * Math.sin(theta);
        positions[idx + 2] = randomRadius * Math.cos(phi);

        velocities[idx] = 0;
        velocities[idx + 1] = 0;
        velocities[idx + 2] = 0;

        colors[idx] = 1;
        colors[idx + 1] = 1;
        colors[idx + 2] = 1;

        noiseOffsets[i] = Math.random() * Math.PI * 2;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const orbitCount = 2;
      const orbitPositions = new Float32Array(orbitCount * 3);
      const orbitColors = new Float32Array(orbitCount * 3);
      const orbitTrailMix = new Float32Array(orbitCount);
      for (let i = 0; i < orbitCount; i++) {
        const idx = i * 3;
        orbitPositions[idx] = 999;
        orbitPositions[idx + 1] = 999;
        orbitPositions[idx + 2] = 999;
        const brightness = 2.1 - i * 0.4;
        orbitColors[idx] = brightness;
        orbitColors[idx + 1] = brightness * 0.85;
        orbitColors[idx + 2] = brightness * 1.25;
        orbitTrailMix[i] = 0.65 + Math.random() * 0.2;
      }

      const orbitGeometry = new THREE.BufferGeometry();
      orbitGeometry.setAttribute("position", new THREE.BufferAttribute(orbitPositions, 3));
      orbitGeometry.setAttribute("color", new THREE.BufferAttribute(orbitColors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.004,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 1,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const pointsMesh = new THREE.Points(geometry, material);
      scene.add(pointsMesh);

      const orbitMaterial = new THREE.PointsMaterial({
        size: 0.006,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 1,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const orbitPoints = new THREE.Points(orbitGeometry, orbitMaterial);
      scene.add(orbitPoints);

      const mouse = new THREE.Vector3(0, 0, 0);
      const targetRotation = { x: 0, y: 0 };
      const currentRotation = { x: 0, y: 0 };

      const state: SceneState = {
        scene,
        camera,
        renderer,
        points: pointsMesh,
        orbitPoints,
        geometry,
        orbitGeometry,
        positions,
        targetPositions,
        velocities,
        colors,
        orbitPositions,
        orbitTrailMix,
        noiseOffsets,
        mouse,
        targetRotation,
        currentRotation,
        rotationSpeed: 0.003,
        targetRotationSpeed: 0.003,
        particleCount,
        interaction: 0,
        isHovering: false,
        animationId: 0,
        cleanup: () => {},
      };

      sceneRef.current = state;

      const handleMouseMove = (event: MouseEvent) => {
        const rectCanvas = canvas.getBoundingClientRect();
        const nx = ((event.clientX - rectCanvas.left) / rectCanvas.width) * 2 - 1;
        const ny = -((event.clientY - rectCanvas.top) / rectCanvas.height) * 2 + 1;

        state.mouse.set(nx * 0.8, ny * 0.8, 0);
        state.targetRotation.y = nx * 0.4;
        state.targetRotation.x = ny * 0.35;
        state.targetRotationSpeed = 0.003 + (Math.abs(nx) + Math.abs(ny)) * 0.0025;
        state.isHovering = true;
      };

      const handleMouseLeave = () => {
        state.mouse.set(0, 0, 0);
        state.targetRotation.x = 0;
        state.targetRotation.y = 0;
        state.targetRotationSpeed = 0.0025;
        state.isHovering = false;
      };

      const handleResize = () => {
        const parentRect = canvas.parentElement?.getBoundingClientRect();
        const newWidth = Math.max(parentRect?.width ?? canvas.clientWidth ?? width, 320);
        const newHeight = Math.max(parentRect?.height ?? newWidth, 320);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.style.width = `${newWidth}px`;
        canvas.style.height = `${newHeight}px`;
        canvas.width = newWidth * dpr;
        canvas.height = newHeight * dpr;

        renderer.setPixelRatio(dpr);
        renderer.setSize(newWidth, newHeight, false);

        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
      };

      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("resize", handleResize);

      const resizeObserver = typeof ResizeObserver !== "undefined" && canvas.parentElement
        ? new ResizeObserver(handleResize)
        : null;
      if (resizeObserver && canvas.parentElement) {
        resizeObserver.observe(canvas.parentElement);
      }

      handleResize();

      const positionAttribute = geometry.getAttribute("position") as THREE.BufferAttribute;
      const colorAttribute = geometry.getAttribute("color") as THREE.BufferAttribute;
      const positionArray = positionAttribute.array as Float32Array;
      const colorArray = colorAttribute.array as Float32Array;

      const orbitPositionAttribute = orbitGeometry.getAttribute("position") as THREE.BufferAttribute;
      const orbitPositionArray = orbitPositionAttribute.array as Float32Array;

      const animate = (timestamp: number) => {
        const current = sceneRef.current;
        if (!current) {
          return;
        }

        const time = timestamp * 0.001;

        current.currentRotation.x += (current.targetRotation.x - current.currentRotation.x) * 0.05;
        current.currentRotation.y += (current.targetRotation.y - current.currentRotation.y) * 0.05;
        current.rotationSpeed += (current.targetRotationSpeed - current.rotationSpeed) * 0.025;

        const hoverTarget = current.isHovering ? 1 : 0;
        current.interaction += (hoverTarget - current.interaction) * 0.05;
        const interaction = current.interaction;

        const pulseIdle = 0.004;
        const pulseHover = 0.02;
        const pulse = 1 + Math.sin(time * 0.5) * (pulseIdle + (pulseHover - pulseIdle) * interaction);

        const waveIdle = 0.003;
        const waveHover = 0.015;
        const wave = Math.sin(time * 1.1) * (waveIdle + (waveHover - waveIdle) * interaction);

        const swirlBase = 0.0015;
        const swirlHover = 0.012;
        const swirlStrength = swirlBase + (swirlHover - swirlBase) * interaction + current.rotationSpeed * (0.035 + interaction * 0.05);

        const { targetPositions, velocities, noiseOffsets, particleCount, mouse: mouseVec } = current;

        const mouseX = mouseVec.x * 0.9;
        const mouseY = mouseVec.y * 0.9;
        const mouseZ = mouseVec.z;
        const mouseRange = 0.45 + interaction * 0.25;

        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          const offset = noiseOffsets[i];

          const px = positionArray[idx];
          const py = positionArray[idx + 1];
          const pz = positionArray[idx + 2];

          const baseX = targetPositions[idx];
          const baseY = targetPositions[idx + 1];
          const baseZ = targetPositions[idx + 2];

          const wobbleScaleIdle = 0.0025;
          const wobbleScaleHover = 0.012;
          const wobbleDepthIdle = 0.008;
          const wobbleDepthHover = 0.028;
          const wobbleScale = wobbleScaleIdle + (wobbleScaleHover - wobbleScaleIdle) * interaction;
          const wobbleDepth = wobbleDepthIdle + (wobbleDepthHover - wobbleDepthIdle) * interaction;
          const wobbleX = Math.sin(time * 1.3 + offset * 3.1) * wobbleScale;
          const wobbleY = Math.cos(time * 1.1 + offset * 2.6) * wobbleScale;
          const wobbleZ = Math.sin(time * 1.6 + offset * 4.2) * wobbleDepth;

          const targetX = baseX * (pulse + wave) + wobbleX;
          const targetY = baseY * (pulse - wave) + wobbleY;
          const targetZ = baseZ + wobbleZ;

          let vx = velocities[idx];
          let vy = velocities[idx + 1];
          let vz = velocities[idx + 2];

          const settleStrength = 0.32 + interaction * 0.08;
          vx += (targetX - px) * settleStrength;
          vy += (targetY - py) * settleStrength;
          vz += (targetZ - pz) * (0.26 + interaction * 0.06);

          vx += -py * swirlStrength;
          vy += px * swirlStrength;
          vz += Math.sin(time * 0.7 + offset) * (0.0012 + interaction * 0.0015);

          const dx = px - mouseX;
          const dy = py - mouseY;
          const dz = pz - mouseZ;
          const mouseDist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.0001;

          let mouseInfluence = 0;
          if (mouseDist < mouseRange) {
            mouseInfluence = 1 - mouseDist / mouseRange;
            const force = mouseInfluence * (0.08 + interaction * 0.08);
            vx += (dx / mouseDist) * force;
            vy += (dy / mouseDist) * force;
            vz += (dz / mouseDist) * force * 0.7;
          }

          vx *= 0.7;
          vy *= 0.7;
          vz *= 0.7;

          const newPx = px + vx;
          const newPy = py + vy;
          const newPz = pz + vz;

          const relax = 0.7 + interaction * 0.07;
          const relaxZ = 0.55 + interaction * 0.07;
          positionArray[idx] = newPx + (targetX - newPx) * relax;
          positionArray[idx + 1] = newPy + (targetY - newPy) * relax;
          positionArray[idx + 2] = newPz + (targetZ - newPz) * relaxZ;

          velocities[idx] = vx;
          velocities[idx + 1] = vy;
          velocities[idx + 2] = vz;

          const speed = Math.sqrt(vx * vx + vy * vy + vz * vz);
          const centerDist = Math.sqrt(targetX * targetX + targetY * targetY);
          const density = 1 - Math.min(centerDist / 0.42, 1);
          const blaze = 1.0 + density * (1.5 + interaction * 0.6) + speed * 110 + mouseInfluence * (2.1 + interaction * 1.0);
          const flicker = Math.sin(time * 3.0 + offset * 5.0) * (0.28 + interaction * 0.25);

          const energy = blaze + flicker;
          colorArray[idx] = Math.min(energy * 1.0, 6.5 + interaction * 0.5);
          colorArray[idx + 1] = Math.min(energy * 1.02, 7.0 + interaction * 0.7);
          colorArray[idx + 2] = Math.min(energy * 1.3, 8.5 + interaction * 1.1);
        }

        const orbitBaseSpeed = 0.35;
        const orbitSpeed = orbitBaseSpeed + interaction * 0.25;
        const orbitTrailDecay = 0.68 - interaction * 0.15;
        const orbitTrailIntensity = 0.7 + interaction * 0.4;

        if (current.orbitPositions && current.orbitTrailMix && current.orbitPoints && current.orbitGeometry) {
          const orbitArray = orbitPositionArray;
          for (let i = 0; i < orbitCount; i++) {
            const idx = i * 3;
            const mix = current.orbitTrailMix ? current.orbitTrailMix[i] : 0.5;

            const laneOffset = i === 0 ? 0.1 : -0.1;
            const spawnDelay = i * 0.5;
            const progressRaw = Math.max(0, time * orbitSpeed - spawnDelay);
            const cycleLength = 2.6 - interaction * 0.6;
            const cyclePhase = progressRaw % cycleLength;
            const progress = Math.min(cyclePhase / cycleLength, 1);

            let baseX;
            let baseY;
            let baseZ;
            if (cyclePhase === 0 && progressRaw < spawnDelay) {
              baseX = 999;
              baseY = 999;
              baseZ = 999;
            } else {
              const speedFactor = 0.85 + interaction * 0.3;
              const t = progress * speedFactor;
              baseX = 0.48 - t * 1.05 + laneOffset * 0.1;
              baseY = 0.34 + Math.sin(progress * Math.PI) * (0.06 + interaction * 0.04);
              baseZ = Math.sin(progress * Math.PI * 1.5 + i) * (0.09 + interaction * 0.06);
            }

            const prevX = orbitArray[idx];
            const prevY = orbitArray[idx + 1];
            const prevZ = orbitArray[idx + 2];

            const tailMix = mix * orbitTrailIntensity;
            orbitArray[idx] = baseX + (prevX - baseX) * orbitTrailDecay * (0.6 + interaction * 0.2);
            orbitArray[idx + 1] = baseY + (prevY - baseY) * orbitTrailDecay * (0.6 + interaction * 0.2);
            orbitArray[idx + 2] = baseZ + (prevZ - baseZ) * orbitTrailDecay * (0.5 + interaction * 0.2);
          }
          orbitPositionAttribute.needsUpdate = true;
          current.orbitPoints.rotation.x = current.currentRotation.x * 0.6;
          current.orbitPoints.rotation.y = current.currentRotation.y * 0.6;
        }

        pointsMesh.rotation.x = current.currentRotation.x;
        pointsMesh.rotation.y = current.currentRotation.y;

        positionAttribute.needsUpdate = true;
        colorAttribute.needsUpdate = true;

        renderer.render(scene, camera);
        current.animationId = requestAnimationFrame(animate);
      };

      state.animationId = requestAnimationFrame(animate);

      state.cleanup = () => {
        cancelAnimationFrame(state.animationId);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
        window.removeEventListener("resize", handleResize);
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
        geometry.dispose();
        if (orbitGeometry) {
          orbitGeometry.dispose();
        }
        material.dispose();
        orbitMaterial.dispose();
        renderer.dispose();
        scene.clear();
      };
    };

    initFrameId = requestAnimationFrame(() => {
      init().catch((error) => {
        console.error("Error initializing InteractiveMitroxLogo", error);
      });
    });

    return () => {
      if (initFrameId) {
        cancelAnimationFrame(initFrameId);
      }
      if (sceneRef.current) {
        sceneRef.current.cleanup();
        sceneRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        className="w-full h-full max-w-full max-h-full"
        style={{ display: "block" }}
      />
    </div>
  );
};

export default InteractiveMitroxLogo;

