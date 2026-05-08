import { motion } from "motion/react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

/**
 * React island that replays the legacy `bounceIn` keyframe (from clothes.css)
 * using Motion's spring physics so the card has the same playful entry.
 */
export default function CardEntry({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        bounce: 0.45,
        duration: 1,
      }}
    >
      {children}
    </motion.div>
  );
}
