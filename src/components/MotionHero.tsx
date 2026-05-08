import { motion } from "motion/react";

export default function MotionHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
      className="text-balance"
    >
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
        Hi, I&rsquo;m
      </p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
        Rishi Gohil
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
        Senior Software Engineer. Ardent technologist, melomaniac, and
        gourmet &mdash; I spend most of my time writing code and listening to
        house music.
      </p>
    </motion.div>
  );
}
