"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { CHAPTERS } from "@/lib/chapters";

interface Props {
  activeChapter: number;
}

export function SideProgress({ activeChapter }: Props) {
  // Whole-page scroll progress, spring-smoothed
  const { scrollYProgress } = useScroll();
  const fill = useSpring(scrollYProgress, { stiffness: 150, damping: 30 });

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3 select-none pointer-events-none">
      {/* Track + fill driven directly by a motion value (no re-renders) */}
      <div className="relative w-px h-48 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-x-0 top-0 h-full bg-[#ff6b35] rounded-full origin-top"
          style={{ scaleY: fill }}
        />
      </div>

      {/* Chapter dots */}
      <div className="absolute inset-y-0 -left-2 flex flex-col justify-between">
        {CHAPTERS.map((ch, i) => (
          <motion.div
            key={ch.id}
            className="w-1.5 h-1.5 rounded-full"
            animate={{
              backgroundColor:
                i === activeChapter ? "#ff6b35" : "rgba(244,244,242,0.3)",
              scale: i === activeChapter ? 1.5 : 1,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* Active chapter numeral */}
      <motion.p
        key={activeChapter}
        className="text-[10px] tracking-[0.25em] uppercase mt-1 font-mono"
        style={{ color: "rgba(244,244,242,0.5)" }}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {CHAPTERS[activeChapter]?.numeral}
      </motion.p>
    </div>
  );
}
