import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

class PerlinNoise {
  private readonly grad3: [number, number][];
  private readonly perm: Uint8Array;

  constructor() {
    this.grad3 = [
      [1, 1],
      [-1, 1],
      [1, -1],
      [-1, -1],
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = Math.floor(Math.random() * 256);
    this.perm = new Uint8Array(512);
    for (let i = 0; i < 512; i++) this.perm[i] = p[i & 255];
  }

  noise(x: number, y: number): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = xf * xf * (3 - 2 * xf);
    const v = yf * yf * (3 - 2 * yf);
    const aa = this.perm[this.perm[X] + Y];
    const ab = this.perm[this.perm[X] + Y + 1];
    const ba = this.perm[this.perm[X + 1] + Y];
    const bb = this.perm[this.perm[X + 1] + Y + 1];
    const x1 = this.lerp(
      this.dot2(aa, xf, yf),
      this.dot2(ba, xf - 1, yf),
      u
    );
    const x2 = this.lerp(
      this.dot2(ab, xf, yf - 1),
      this.dot2(bb, xf - 1, yf - 1),
      u
    );
    return (this.lerp(x1, x2, v) + 1) * 0.5;
  }

  private dot2(i: number, x: number, y: number): number {
    const g = this.grad3[i & 7];
    return g[0] * x + g[1] * y;
  }

  private lerp(a: number, b: number, t: number): number {
    return a + t * (b - a);
  }
}

interface CurveConfig {
  controlPoints: { x: number; y: number }[];
  speed: number;
  amplitude: number;
  noiseScale: number;
  phase: number;
  color: string;
  opacity: number;
}

interface WaveBackgroundProps {
  mousePosition: THREE.Vector2;
}

const SEGMENTS = 64;
const PARTICLES_PER_CURVE = 14;

const LINE_COLORS = [
  "#06b6d4",
  "#22d3ee",
  "#3b82f6",
  "#06b6d4",
  "#67e8f9",
];

const curveConfigs: CurveConfig[] = [
  {
    controlPoints: [
      { x: -0.48, y: 0.42 },
      { x: -0.3, y: 0.58 },
      { x: -0.1, y: 0.35 },
      { x: 0.12, y: 0.52 },
      { x: 0.3, y: 0.38 },
      { x: 0.48, y: 0.42 },
    ],
    speed: 0.18,
    amplitude: 0.14,
    noiseScale: 0.45,
    phase: 0,
    color: LINE_COLORS[0],
    opacity: 0.3,
  },
  {
    controlPoints: [
      { x: -0.48, y: 0.22 },
      { x: -0.25, y: 0.42 },
      { x: -0.05, y: 0.18 },
      { x: 0.15, y: 0.38 },
      { x: 0.35, y: 0.2 },
      { x: 0.48, y: 0.22 },
    ],
    speed: 0.3,
    amplitude: 0.1,
    noiseScale: 0.55,
    phase: 1.3,
    color: LINE_COLORS[1],
    opacity: 0.25,
  },
  {
    controlPoints: [
      { x: -0.48, y: 0.02 },
      { x: -0.2, y: 0.28 },
      { x: -0.02, y: -0.08 },
      { x: 0.18, y: 0.22 },
      { x: 0.35, y: -0.02 },
      { x: 0.48, y: 0.02 },
    ],
    speed: 0.22,
    amplitude: 0.16,
    noiseScale: 0.4,
    phase: 2.7,
    color: LINE_COLORS[2],
    opacity: 0.2,
  },
  {
    controlPoints: [
      { x: -0.48, y: -0.18 },
      { x: -0.25, y: -0.38 },
      { x: -0.05, y: -0.12 },
      { x: 0.15, y: -0.35 },
      { x: 0.35, y: -0.18 },
      { x: 0.48, y: -0.18 },
    ],
    speed: 0.28,
    amplitude: 0.12,
    noiseScale: 0.5,
    phase: 3.9,
    color: LINE_COLORS[3],
    opacity: 0.22,
  },
  {
    controlPoints: [
      { x: -0.48, y: -0.38 },
      { x: -0.3, y: -0.55 },
      { x: -0.08, y: -0.32 },
      { x: 0.12, y: -0.5 },
      { x: 0.32, y: -0.35 },
      { x: 0.48, y: -0.38 },
    ],
    speed: 0.2,
    amplitude: 0.13,
    noiseScale: 0.42,
    phase: 5.1,
    color: LINE_COLORS[4],
    opacity: 0.18,
  },
];

export default function WaveBackground({ mousePosition }: WaveBackgroundProps) {
  const { viewport } = useThree();
  const noise = useMemo(() => new PerlinNoise(), []);
  const mouseRef = useRef(mousePosition);
  mouseRef.current = mousePosition;

  const sceneData = useMemo(() => {
    const vw = viewport.width * 0.5;
    const vh = viewport.height * 0.5;

    const curves = curveConfigs.map((cfg) => {
      const original = cfg.controlPoints.map(
        (p) => new THREE.Vector3(p.x * vw, p.y * vh, (Math.random() - 0.5) * 0.3)
      );
      const controls = original.map((p) => p.clone());

      const positions = new Float32Array((SEGMENTS + 1) * 3);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const curve = new THREE.CatmullRomCurve3(controls);
      curve.getPoints(SEGMENTS).forEach((p, i) => {
        positions[i * 3] = p.x;
        positions[i * 3 + 1] = p.y;
        positions[i * 3 + 2] = p.z;
      });

      const material = new THREE.LineBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: cfg.opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const line = new THREE.Line(geometry, material);

      return { original, controls, curve, geometry, line, config: cfg };
    });

    const totalParticles = curves.length * PARTICLES_PER_CURVE;
    const particlePos = new Float32Array(totalParticles * 3);
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: "#67e8f9",
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    const particleData: { progress: number; speed: number }[] = [];

    curves.forEach((curve) => {
      for (let i = 0; i < PARTICLES_PER_CURVE; i++) {
        const idx = curveConfigs.indexOf(curve.config) * PARTICLES_PER_CURVE + i;
        const progress = Math.random();
        const pt = curve.curve.getPoint(progress);
        particlePos[idx * 3] = pt.x;
        particlePos[idx * 3 + 1] = pt.y;
        particlePos[idx * 3 + 2] = pt.z;
        particleData.push({ progress, speed: 0.06 + Math.random() * 0.04 });
      }
    });
    particleGeo.attributes.position.needsUpdate = true;

    return {
      curves,
      particleSystem,
      particleGeo,
      particlePos,
      particleData,
      vw,
      vh,
    };
  }, [viewport.width, viewport.height]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const mouse = mouseRef.current;
    const dt = Math.min(delta, 0.05);

    for (const curve of sceneData.curves) {
      for (let i = 0; i < curve.controls.length; i++) {
        const ox = curve.original[i].x;
        const oy = curve.original[i].y;
        const oz = curve.original[i].z;

        const nx = noise.noise(
          i * curve.config.noiseScale + t * curve.config.speed,
          curve.config.phase
        );
        const ny = noise.noise(
          i * curve.config.noiseScale + t * curve.config.speed + 50,
          curve.config.phase + 50
        );
        const nz = noise.noise(
          i * curve.config.noiseScale + t * curve.config.speed + 100,
          curve.config.phase + 100
        );

        curve.controls[i].set(
          ox + (nx - 0.5) * 2 * curve.config.amplitude * sceneData.vw,
          oy + (ny - 0.5) * 2 * curve.config.amplitude * sceneData.vh,
          oz + (nz - 0.5) * 0.15
        );
      }

      if (mouse.x !== 0 || mouse.y !== 0) {
        const mx = mouse.x * sceneData.vw;
        const my = mouse.y * sceneData.vh;
        for (const cp of curve.controls) {
          const dx = mx - cp.x;
          const dy = my - cp.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 4) {
            const influence = (1 - Math.sqrt(distSq) / 2) * 0.3;
            cp.x += dx * influence * dt * 3;
            cp.y += dy * influence * dt * 3;
          }
        }
      }

      curve.curve.points = curve.controls;
      const pts = curve.curve.getPoints(SEGMENTS);
      const pos = curve.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pts.length; i++) {
        pos[i * 3] = pts[i].x;
        pos[i * 3 + 1] = pts[i].y;
        pos[i * 3 + 2] = pts[i].z;
      }
      curve.geometry.attributes.position.needsUpdate = true;
    }

    const pPos = sceneData.particlePos;
    for (let c = 0; c < sceneData.curves.length; c++) {
      const curve = sceneData.curves[c];
      for (let p = 0; p < PARTICLES_PER_CURVE; p++) {
        const idx = c * PARTICLES_PER_CURVE + p;
        const data = sceneData.particleData[idx];
        data.progress += dt * data.speed;
        if (data.progress > 1) data.progress -= 1;
        const pt = curve.curve.getPoint(data.progress);
        pPos[idx * 3] = pt.x;
        pPos[idx * 3 + 1] = pt.y;
        pPos[idx * 3 + 2] = pt.z;
      }
    }
    sceneData.particleGeo.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      {sceneData.curves.map((curve, i) => (
        <primitive key={i} object={curve.line} />
      ))}
      <primitive object={sceneData.particleSystem} />
    </group>
  );
}
