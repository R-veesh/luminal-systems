import { useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function seededRng(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s * 1664525 + 1013904223) | 0;
    return (s >>> 0) / 4294967296;
  };
}

class PerlinNoise {
  private readonly grad3: [number, number][];
  private readonly perm: Uint8Array;

  constructor(seed = 42) {
    this.grad3 = [
      [1, 1], [-1, 1], [1, -1], [-1, -1],
      [1, 0], [-1, 0], [0, 1], [0, -1],
    ];
    const rng = seededRng(seed);
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = Math.floor(rng() * 256);
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
    const x1 = this.lerp(this.dot2(aa, xf, yf), this.dot2(ba, xf - 1, yf), u);
    const x2 = this.lerp(this.dot2(ab, xf, yf - 1), this.dot2(bb, xf - 1, yf - 1), u);
    return (this.lerp(x1, x2, v) + 1) * 0.5;
  }

  private dot2(i: number, x: number, y: number): number {
    return this.grad3[i & 7][0] * x + this.grad3[i & 7][1] * y;
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

interface LayerConfig {
  color: string;
  opacity: number;
  z: number;
  speed: number;
  amplitude: number;
  noiseScale: number;
  parallaxFactor: number;
}

const SEGMENTS = 64;
const PARTICLE_COUNT = 180;

const CURVE_CONFIGS: CurveConfig[] = [
  {
    controlPoints: [
      { x: -0.48, y: 0.4 }, { x: -0.3, y: 0.55 }, { x: -0.1, y: 0.32 },
      { x: 0.12, y: 0.48 }, { x: 0.3, y: 0.36 }, { x: 0.48, y: 0.4 },
    ],
    speed: 0.15, amplitude: 0.12, noiseScale: 0.4, phase: 0,
    color: "#A8E6C0", opacity: 0.35,
  },
  {
    controlPoints: [
      { x: -0.48, y: 0.22 }, { x: -0.25, y: 0.4 }, { x: -0.05, y: 0.2 },
      { x: 0.15, y: 0.36 }, { x: 0.35, y: 0.18 }, { x: 0.48, y: 0.22 },
    ],
    speed: 0.25, amplitude: 0.1, noiseScale: 0.5, phase: 1.2,
    color: "#6FCF97", opacity: 0.3,
  },
  {
    controlPoints: [
      { x: -0.48, y: 0.05 }, { x: -0.2, y: 0.25 }, { x: -0.02, y: -0.05 },
      { x: 0.18, y: 0.2 }, { x: 0.35, y: 0.0 }, { x: 0.48, y: 0.05 },
    ],
    speed: 0.2, amplitude: 0.14, noiseScale: 0.35, phase: 2.5,
    color: "#A78BFA", opacity: 0.3,
  },
  {
    controlPoints: [
      { x: -0.48, y: -0.15 }, { x: -0.25, y: -0.35 }, { x: -0.05, y: -0.1 },
      { x: 0.15, y: -0.32 }, { x: 0.35, y: -0.15 }, { x: 0.48, y: -0.15 },
    ],
    speed: 0.3, amplitude: 0.11, noiseScale: 0.45, phase: 3.8,
    color: "#7C5CFC", opacity: 0.25,
  },
  {
    controlPoints: [
      { x: -0.48, y: -0.35 }, { x: -0.3, y: -0.5 }, { x: -0.08, y: -0.28 },
      { x: 0.12, y: -0.45 }, { x: 0.32, y: -0.32 }, { x: 0.48, y: -0.35 },
    ],
    speed: 0.18, amplitude: 0.13, noiseScale: 0.38, phase: 5.0,
    color: "#2FA084", opacity: 0.2,
  },
  {
    controlPoints: [
      { x: -0.48, y: -0.5 }, { x: -0.28, y: -0.65 }, { x: -0.06, y: -0.45 },
      { x: 0.14, y: -0.6 }, { x: 0.34, y: -0.48 }, { x: 0.48, y: -0.5 },
    ],
    speed: 0.22, amplitude: 0.09, noiseScale: 0.5, phase: 6.3,
    color: "#5B3FD4", opacity: 0.15,
  },
  {
    controlPoints: [
      { x: -0.48, y: 0.55 }, { x: -0.28, y: 0.7 }, { x: -0.08, y: 0.48 },
      { x: 0.16, y: 0.62 }, { x: 0.36, y: 0.5 }, { x: 0.48, y: 0.55 },
    ],
    speed: 0.12, amplitude: 0.15, noiseScale: 0.32, phase: 0.8,
    color: "#6FCF97", opacity: 0.2,
  },
  {
    controlPoints: [
      { x: -0.48, y: -0.55 }, { x: -0.26, y: -0.72 }, { x: -0.04, y: -0.5 },
      { x: 0.18, y: -0.68 }, { x: 0.38, y: -0.52 }, { x: 0.48, y: -0.55 },
    ],
    speed: 0.28, amplitude: 0.1, noiseScale: 0.48, phase: 4.5,
    color: "#A78BFA", opacity: 0.15,
  },
];

const LIQUID_LAYERS: LayerConfig[] = [
  {
    color: "#A8E6C0", opacity: 0.15, z: -2.0,
    speed: 0.12, amplitude: 0.35, noiseScale: 0.5, parallaxFactor: 0.15,
  },
  {
    color: "#A78BFA", opacity: 0.12, z: -0.8,
    speed: 0.18, amplitude: 0.3, noiseScale: 0.6, parallaxFactor: 0.1,
  },
  {
    color: "#6FCF97", opacity: 0.1, z: 0.5,
    speed: 0.25, amplitude: 0.25, noiseScale: 0.7, parallaxFactor: 0.05,
  },
  {
    color: "#7C5CFC", opacity: 0.08, z: 1.8,
    speed: 0.3, amplitude: 0.2, noiseScale: 0.8, parallaxFactor: 0.03,
  },
];

export default function AnimatedLiquidBackground({
  mousePosition,
}: {
  mousePosition: { x: number; y: number };
}) {
  const { viewport } = useThree();
  const noise = useMemo(() => new PerlinNoise(42), []);

  const sceneData = useMemo(() => {
    const vw = viewport.width * 0.5;
    const vh = viewport.height * 0.5;
    const planeW = viewport.width * 1.8;
    const planeH = viewport.height * 1.8;
    const rng = seededRng(42);

    const layers = LIQUID_LAYERS.map((cfg) => {
      const geo = new THREE.PlaneGeometry(planeW, planeH, 48, 48);
      const pos = geo.attributes.position.array as Float32Array;
      const original = new Float32Array(pos);

      const mat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: cfg.opacity,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.z = cfg.z;

      return { mesh, geo, pos, original, config: cfg };
    });

    const curves = CURVE_CONFIGS.map((cfg) => {
      const original = cfg.controlPoints.map(
        (p) => new THREE.Vector3(p.x * vw, p.y * vh, (rng() - 0.5) * 0.2),
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

    const particlePos = new Float32Array(PARTICLE_COUNT * 3);
    const particleVel = new Float32Array(PARTICLE_COUNT * 3);
    const particleColors = new Float32Array(PARTICLE_COUNT * 3);

    const spreadX = viewport.width * 0.8;
    const spreadY = viewport.height * 0.7;

    const green = new THREE.Color("#6FCF97");
    const purple = new THREE.Color("#A78BFA");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particlePos[i * 3] = (rng() - 0.5) * spreadX;
      particlePos[i * 3 + 1] = (rng() - 0.5) * spreadY;
      particlePos[i * 3 + 2] = (rng() - 0.5) * 4;
      particleVel[i * 3] = (rng() - 0.5) * 0.02;
      particleVel[i * 3 + 1] = (rng() - 0.5) * 0.02;
      particleVel[i * 3 + 2] = (rng() - 0.5) * 0.01;

      const c = rng() > 0.5 ? green : purple;
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);

    return { layers, curves, particleSystem, particlePos, particleVel, particleGeo, vw, vh };
  }, [viewport.width, viewport.height]);

  /* eslint-disable react-hooks/immutability */
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 0.05);
    const mx = mousePosition.x * sceneData.vw;
    const my = mousePosition.y * sceneData.vh;

    for (const layer of sceneData.layers) {
      const pos = layer.pos;
      const orig = layer.original;
      const cfg = layer.config;

      layer.mesh.position.x = mx * cfg.parallaxFactor;
      layer.mesh.position.y = my * cfg.parallaxFactor;

      for (let i = 0; i < pos.length; i += 3) {
        const ox = orig[i];
        const oy = orig[i + 1];
        const nx = noise.noise(
          ox * cfg.noiseScale + t * cfg.speed,
          oy * cfg.noiseScale + t * cfg.speed * 0.7,
        );
        const ny = noise.noise(
          ox * cfg.noiseScale + t * cfg.speed + 30,
          oy * cfg.noiseScale + t * cfg.speed * 0.7 + 30,
        );
        pos[i + 2] = (nx - 0.5) * 2 * cfg.amplitude + (ny - 0.5) * cfg.amplitude;
      }
      layer.geo.attributes.position.needsUpdate = true;
    }

    for (const curve of sceneData.curves) {
      for (let i = 0; i < curve.controls.length; i++) {
        const ox = curve.original[i].x;
        const oy = curve.original[i].y;
        const oz = curve.original[i].z;

        const nx = noise.noise(
          i * curve.config.noiseScale + t * curve.config.speed,
          curve.config.phase,
        );
        const ny = noise.noise(
          i * curve.config.noiseScale + t * curve.config.speed + 50,
          curve.config.phase + 50,
        );
        const nz = noise.noise(
          i * curve.config.noiseScale + t * curve.config.speed + 100,
          curve.config.phase + 100,
        );

        curve.controls[i].set(
          ox + (nx - 0.5) * 2 * curve.config.amplitude * sceneData.vw + mx * 0.08,
          oy + (ny - 0.5) * 2 * curve.config.amplitude * sceneData.vh + my * 0.08,
          oz + (nz - 0.5) * 0.12,
        );
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
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      pPos[i3] += sceneData.particleVel[i3] * dt * 15;
      pPos[i3 + 1] +=
        sceneData.particleVel[i3 + 1] * dt * 15 +
        noise.noise(t * 0.1 + i, i * 0.01) * 0.003;
      pPos[i3 + 2] += sceneData.particleVel[i3 + 2] * dt * 15;

      const sx = viewport.width * 0.9;
      const sy = viewport.height * 0.8;
      if (pPos[i3] > sx) pPos[i3] = -sx;
      if (pPos[i3] < -sx) pPos[i3] = sx;
      if (pPos[i3 + 1] > sy) pPos[i3 + 1] = -sy;
      if (pPos[i3 + 1] < -sy) pPos[i3 + 1] = sy;
    }
    sceneData.particleGeo.attributes.position.needsUpdate = true;
  });
  /* eslint-enable react-hooks/immutability */

  return (
    <group>
      {sceneData.layers.map((layer, i) => (
        <primitive key={`layer-${i}`} object={layer.mesh} />
      ))}
      {sceneData.curves.map((curve, i) => (
        <primitive key={`curve-${i}`} object={curve.line} />
      ))}
      <primitive object={sceneData.particleSystem} />
    </group>
  );
}
