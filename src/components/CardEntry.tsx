import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

/**
 * React island that replays the legacy `bounceIn` keyframe (from clothes.css)
 * using Motion's spring physics so the card has the same playful entry.
 * Respects `prefers-reduced-motion`: skips the animation entirely so the
 * card renders at its final state without scaling or fading.
 */
export default function CardEntry({ children }: Props) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { type: "spring", bounce: 0.45, duration: 1 }
      }
    >
      {children}
    </motion.div>
  );
}
