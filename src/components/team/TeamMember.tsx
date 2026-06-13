import { motion } from "framer-motion";
import { UserRound, AtSign, Code2, Globe } from "lucide-react";
import type { TeamMemberData, Position } from "../../data/team";

interface TeamMemberProps {
  member: TeamMemberData;
  position: Position;
  index: number;
  mouseX: number;
  mouseY: number;
}

const iconMap: Record<string, typeof UserRound> = {
  linkedin: UserRound,
  twitter: AtSign,
  github: Code2,
  website: Globe,
};

export default function TeamMember({
  member,
  position,
  index,
  mouseX,
  mouseY,
}: TeamMemberProps) {
  const parallaxX = mouseX * (2 + index * 0.5);
  const parallaxY = mouseY * (2 + index * 0.5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: 0.1 + index * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="absolute z-10"
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) translate(${parallaxX}px, ${parallaxY}px)`,
      }}
    >
      <motion.div
        whileHover={{ scale: 1.08 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="group relative"
      >
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-cyan-500/20 via-blue-500/10 to-transparent opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-5 sm:p-6 w-48 sm:w-56 transition-all duration-500 group-hover:border-cyan-400/30 group-hover:bg-white/[0.06]">
          <div className="flex flex-col items-center text-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
              className="relative"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-2 ring-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all duration-500 group-hover:ring-cyan-400/70 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-cyan-400/10 to-transparent pointer-events-none" />
            </motion.div>

            <div>
              <h3 className="text-white font-semibold text-base sm:text-lg tracking-tight">
                {member.name}
              </h3>
              <p className="text-cyan-400/70 text-xs sm:text-sm font-medium mt-0.5">
                {member.role}
              </p>
            </div>

            <p className="text-white/40 text-[10px] sm:text-xs leading-relaxed line-clamp-2">
              {member.bio}
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              {Object.entries(member.socials).map(([platform, url]) => {
                const Icon = iconMap[platform] ?? Globe;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/30 hover:text-cyan-400 transition-colors duration-300 hover:drop-shadow-[0_0_6px_rgba(6,182,212,0.6)]"
                    aria-label={`${member.name} ${platform}`}
                  >
                    <Icon size={14} className="sm:w-4 sm:h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
