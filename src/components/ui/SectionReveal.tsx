"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  once?: boolean;
}

export function SectionReveal({ children, className = "", delay = 0, direction = "up", once = true }: SectionRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const initial = {
    opacity: 0,
    y: direction === "up" ? 40 : 0,
    x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
