import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

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
