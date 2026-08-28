"use client";
import { motion } from "framer-motion";

interface Props {
  stat: string;
  label: string;
}

export function BreatherSection({ stat, label }: Props) {
  return (
    <section
      className="relative py-24 px-6 flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ background: "#f4f4f2" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-[#111111]/10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#111111]/10" />

      <motion.span
        className="block text-[#111111]"
        style={{
          fontSize: "clamp(3.5rem, 12vw, 9rem)",
          fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif",
          fontWeight: 500,
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {stat}
      </motion.span>

      <motion.p
        className="mt-4 text-[#111111]/60 text-sm tracking-[0.3em] uppercase max-w-xs"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.25 }}
      >
        {label}
      </motion.p>
    </section>
  );
}
