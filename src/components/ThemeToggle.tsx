import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

type Theme = "auto" | "light" | "dark";

const ORDER: Theme[] = ["auto", "light", "dark"];

const LABEL: Record<Theme, string> = {
  auto: "Auto",
  light: "Light",
  dark: "Dark",
};

function Sun() {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function Moon() {
  return (
    <svg
      width="15" height="15" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function System() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const ICON: Record<Theme, () => JSX.Element> = {
  auto: System,
  light: Sun,
  dark: Moon,
};

function applyTheme(theme: Theme) {
  if (theme === "auto") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
}

// Spring that settles fast with a barely-perceptible overshoot —
// feels physical without calling attention to itself.
const SLOT_SPRING = { type: "spring", stiffness: 380, damping: 30 } as const;
const ICON_SPRING = { type: "spring", stiffness: 400, damping: 28 } as const;

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("auto");
  const [expanded, setExpanded] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored && ORDER.includes(stored)) setTheme(stored);
    setIsTouch(!window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  function select(t: Theme) {
    setTheme(t);
    localStorage.setItem("theme", t);
    applyTheme(t);
    setExpanded(false);
  }

  function handleActiveClick() {
    if (isTouch) {
      const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      select(theme === "auto" ? (sysDark ? "light" : "dark") : "auto");
    }
  }

  const inactive = ORDER.filter((t) => t !== theme);
  const ActiveIcon = ICON[theme];

  return (
    <div
      className="theme-picker"
      onMouseEnter={() => !isTouch && setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Inactive options — spring in from the right, snap closed on exit */}
      <AnimatePresence initial={false}>
        {expanded &&
          inactive.map((t, i) => {
            const Icon = ICON[t];
            return (
              <motion.div
                key={t}
                style={{ overflow: "hidden", flexShrink: 0, display: "flex" }}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 34, opacity: 1 }}
                exit={{
                  width: 0,
                  opacity: 0,
                  transition: {
                    width: { duration: 0.14, ease: [0.4, 0, 1, 1] },
                    opacity: { duration: 0.1 },
                  },
                }}
                transition={{
                  width: { ...SLOT_SPRING, delay: i * 0.045 },
                  opacity: { duration: 0.1, delay: i * 0.045 },
                }}
              >
                <button
                  type="button"
                  className="theme-btn"
                  onClick={() => select(t)}
                  aria-label={LABEL[t]}
                  title={LABEL[t]}
                >
                  <Icon />
                </button>
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* Active icon — springs in when the selection changes */}
      <button
        type="button"
        className="theme-btn theme-btn--on"
        onClick={handleActiveClick}
        aria-label={`Theme: ${LABEL[theme]}`}
        title={`Theme: ${LABEL[theme]}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.08 } }}
            transition={ICON_SPRING}
          >
            <ActiveIcon />
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
