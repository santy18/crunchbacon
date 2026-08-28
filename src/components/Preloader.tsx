"use client";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: () => void;
  progress: number; // 0–100
}

export function Preloader({ onComplete, progress }: Props) {
  const pathRef = useRef<SVGPathElement>(null);
  const done = progress >= 100;

  // Draw the SVG path as progress increases
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length * (1 - progress / 100));
  }, [progress]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* Logo — circuit-trace SVG that draws itself */}
          <svg viewBox="0 0 120 60" className="w-32 h-16 mb-8" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path
              ref={pathRef}
              d="M10 45 L10 30 L30 30 L30 15 L50 15 L50 40 L70 40 L70 20 L90 20 L90 45 L110 45"
              stroke="#ff6b35"
              strokeWidth="2"
              style={{ transition: "stroke-dashoffset 0.3s ease" }}
            />
            <circle cx="10" cy="45" r="2.5" fill="#ff6b35" opacity="0.8" />
            <circle cx="110" cy="45" r="2.5" fill="#ff6b35" opacity="0.8" />
            <path d="M5 52 H115" stroke="rgba(244,244,242,0.3)" strokeWidth="1" />
          </svg>

          <p className="text-[#f4f4f2] text-xs tracking-[0.3em] uppercase mb-6 opacity-60 font-mono">
            CrunchBacon
          </p>

          {/* Percentage counter */}
          <motion.div
            className="flex items-end gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span
              className="text-[#ff6b35] font-light"
              style={{ fontSize: "clamp(2rem, 6vw, 4rem)", fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif" }}
            >
              {Math.round(progress)}
            </span>
            <span className="text-[#f4f4f2] opacity-40 text-lg mb-2">%</span>
          </motion.div>

          {/* Loading bar */}
          <div className="mt-6 w-48 h-px bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-[#ff6b35]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
