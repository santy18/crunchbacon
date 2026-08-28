"use client";
import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const wordVariants: Variants = {
  hidden: { y: "115%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const sublineVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 0.6,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.4 },
  },
};

const numeralVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 0.8,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

interface Props {
  numeral: string;
  headline: string;
  subline?: string;
  active: boolean;
}

export function ChapterText({ numeral, headline, subline, active }: Props) {
  const isInView = active;
  const lines = headline.split("\n");

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      {/* Chapter numeral */}
      <motion.p
        className="text-[#ff6b35] text-xs tracking-[0.4em] uppercase mb-6 font-mono"
        variants={numeralVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {numeral}
      </motion.p>

      {/* Headline — word-by-word mask reveal */}
      <motion.h2
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          fontSize: "clamp(2rem, 5vw, 4.5rem)",
          fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif",
          fontWeight: 500,
          lineHeight: 1.15,
          maxWidth: "22ch",
          color: "#f4f4f2",
        }}
      >
        {lines.map((line, li) => (
          <span key={li} className="block">
            {line.split(" ").map((word, wi) => (
              <span
                key={wi}
                style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.25em" }}
              >
                <motion.span
                  style={{ display: "inline-block" }}
                  variants={wordVariants}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
        ))}
      </motion.h2>

      {/* Subline */}
      {subline && (
        <motion.p
          className="mt-5 text-[#f4f4f2] tracking-widest text-sm uppercase"
          variants={sublineVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {subline}
        </motion.p>
      )}
    </div>
  );
}
