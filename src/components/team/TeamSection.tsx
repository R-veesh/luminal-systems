import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { teamMembers, teamLayout, type Position } from "../../data/team";
import WaveBackground from "./WaveBackground";
import TeamMember from "./TeamMember";

type Breakpoint = "mobile" | "tablet" | "desktop";

function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 768) setBp("mobile");
      else if (w < 1024) setBp("tablet");
      else setBp("desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return bp;
}

function useNormalizedMouse(ref: React.RefObject<HTMLElement | null>) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouse = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -(((e.clientY - rect.top) / rect.height) * 2 - 1),
      });
    },
    [ref]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouse);
    return () => el.removeEventListener("mousemove", handleMouse);
  }, [ref, handleMouse]);

  return mouse;
}

const vector2 = new THREE.Vector2();

export default function TeamSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const breakpoint = useBreakpoint();
  const mouse = useNormalizedMouse(sectionRef);

  const positions: Position[] = teamLayout[breakpoint];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#050816] select-none"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(6,182,212,0.08),transparent_60%)] pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(59,130,246,0.06),transparent_50%)] pointer-events-none z-[1]" />

      <Canvas
        className="absolute inset-0"
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <color attach="background" args={["#050816"]} />
        <WaveBackground mousePosition={vector2.set(mouse.x, mouse.y)} />
      </Canvas>

      <div className="absolute inset-x-0 top-0 z-20 pointer-events-none">
        <div className="pt-8 sm:pt-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            Meet The Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="mt-3 text-white/40 text-sm sm:text-base max-w-lg mx-auto px-4"
          >
            The minds behind the mission — building the future of intelligent
            systems.
          </motion.p>
        </div>
      </div>

      {teamMembers.map((member, i) => (
        <TeamMember
          key={member.id}
          member={member}
          position={positions[i]}
          index={i}
          mouseX={mouse.x}
          mouseY={mouse.y}
        />
      ))}

      <div className="absolute bottom-4 inset-x-0 text-center z-20">
        <p className="text-white/15 text-[10px] sm:text-xs tracking-widest uppercase">
          Scroll to explore
        </p>
      </div>
    </section>
  );
}
