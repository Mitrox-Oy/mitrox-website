import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ScrollTrigger } from "../lib/smoothScroll";

const vertexShader = `
  uniform float uTime;
  uniform float uDisplace;
  varying vec3 vNormal;
  varying vec3 vPosition;

  // simple 3D noise (Ashima-style, trimmed)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  void main() {
    vNormal = normalize(normalMatrix * normal);
    float n = snoise(position * 1.2 + uTime * 0.08);
    vec3 displaced = position + normal * n * uDisplace;
    vPosition = displaced;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 2.0);
    vec3 base = mix(uColorA, uColorB, fresnel);
    float alpha = 0.35 + fresnel * 0.5;
    gl_FragColor = vec4(base, alpha);
  }
`;

function createGlassMaterial(colorA: string, colorB: string) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uDisplace: { value: 0.12 },
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
}

export default function FullScene({ onReady }: { onReady: () => void }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const meshes: THREE.Mesh[] = [];

    const icosahedron = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.6, 4),
      createGlassMaterial("#8a5cff", "#00ffd1")
    );
    icosahedron.position.set(-2.4, 1, -2);
    scene.add(icosahedron);
    meshes.push(icosahedron);

    const torusKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1, 0.32, 180, 24),
      createGlassMaterial("#ff5c7a", "#8a5cff")
    );
    torusKnot.position.set(2.6, -0.8, -4);
    scene.add(torusKnot);
    meshes.push(torusKnot);

    const blobSphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 96, 96),
      createGlassMaterial("#00ffd1", "#ff5c7a")
    );
    blobSphere.position.set(0.4, -2.2, -3);
    scene.add(blobSphere);
    meshes.push(blobSphere);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(3, 4, 5);
    scene.add(dirLight);

    let frameId: number;
    const clock = new THREE.Clock();

    const scrollState = { progress: 0 };
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        scrollState.progress = self.progress;
      },
    });

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      meshes.forEach((mesh, i) => {
        const material = mesh.material as THREE.ShaderMaterial;
        material.uniforms.uTime.value = elapsed;
        mesh.rotation.x = elapsed * 0.08 + scrollState.progress * Math.PI * (i % 2 === 0 ? 1 : -1);
        mesh.rotation.y = elapsed * 0.1 + scrollState.progress * Math.PI * 1.5;
      });

      camera.position.x = Math.sin(scrollState.progress * Math.PI * 2) * 0.6;
      camera.position.y = -scrollState.progress * 2.5;
      camera.lookAt(0, -scrollState.progress * 2, -3);

      dirLight.intensity = 0.6 + scrollState.progress * 0.6;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    try {
      renderer.compile(scene, camera);
    } finally {
      onReady();
    }

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      trigger.kill();
      meshes.forEach((mesh) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [onReady]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    />
  );
}
