import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import useScrollReveal from "../hooks/useScrollReveal";
import {
  React,
  NextJs,
  NodeJs,
  TailwindCSS,
  JavaScript,
  TypeScript,
  FramerDark,
  FramerLight,
  Supabase,
  Git,
  Firebase,
} from "developer-icons";

const techItems = [
  {
    id: "react",
    name: "React",
    icon: React,
    ring: "inner",
    speed: 18,
    direction: "cw",
    angle: 15,
  },
  {
    id: "nextjs",
    name: "NextJs",
    icon: NextJs,
    ring: "inner",
    speed: 18,
    direction: "cw",
    angle: 140,
  },
  {
    id: "nodejs",
    name: "NodeJs",
    icon: NodeJs,
    ring: "inner",
    speed: 18,
    direction: "cw",
    angle: 250,
  },
  {
    id: "tailwind",
    name: "TailwindCSS",
    icon: TailwindCSS,
    ring: "middle",
    speed: 26,
    direction: "ccw",
    angle: 30,
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: JavaScript,
    ring: "middle",
    speed: 26,
    direction: "ccw",
    angle: 150,
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: TypeScript,
    ring: "middle",
    speed: 26,
    direction: "ccw",
    angle: 270,
  },
  {
    id: "framer",
    name: "Framer",
    icon: { light: FramerDark, dark: FramerLight },
    ring: "outer",
    speed: 34,
    direction: "cw",
    angle: 20,
  },
  {
    id: "supabase",
    name: "Supabase",
    icon: Supabase,
    ring: "outer",
    speed: 34,
    direction: "cw",
    angle: 130,
  },
  {
    id: "git",
    name: "Git",
    icon: Git,
    ring: "outer",
    speed: 34,
    direction: "cw",
    angle: 220,
  },
  {
    id: "firebase",
    name: "Firebase",
    icon: Firebase,
    ring: "outer",
    speed: 34,
    direction: "cw",
    angle: 310,
  },
];

const ringConfig = {
  inner: { size: "48%", line: "border-gray-400/60 dark:border-neutral-700/60" },
  middle: {
    size: "78%",
    line: "border-gray-400/50 dark:border-neutral-700/50",
  },
  outer: {
    size: "108%",
    line: "border-gray-400/40 dark:border-neutral-700/40",
  },
};

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (event) => setReduced(event.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return reduced;
};

const TechOrbitSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [activeId, setActiveId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const updateTheme = () => setIsDarkMode(root.classList.contains("dark"));

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const rings = useMemo(() => {
    const grouped = { inner: [], middle: [], outer: [] };
    techItems.forEach((item) => {
      if (grouped[item.ring]) {
        grouped[item.ring].push(item);
      }
    });
    return grouped;
  }, []);

  const handlePointerDown = (event, id) => {
    if (event.pointerType === "mouse") return;
    setActiveId((prev) => (prev === id ? null : id));
  };

  const renderIcon = (item) => {
    const isActive = activeId === item.id;
    const iconEntry = item.icon;
    const Icon = iconEntry.light ? null : iconEntry;
    const LightIcon = iconEntry.light;
    const DarkIcon = iconEntry.dark;
    const VariantIcon =
      LightIcon && DarkIcon ? (isDarkMode ? DarkIcon : LightIcon) : null;

    return (
      <div
        key={item.id}
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `rotate(${item.angle}deg)` }}
      >
        <div
          className="absolute left-1/2 top-0 pointer-events-auto"
          style={{
            transform: `translate(-50%, -50%) rotate(-${item.angle}deg)`,
          }}
        >
          <motion.button
            type="button"
            onPointerDown={(event) => handlePointerDown(event, item.id)}
            onMouseEnter={() => setActiveId(item.id)}
            onMouseLeave={() => setActiveId(null)}
            onFocus={() => setActiveId(item.id)}
            onBlur={() => setActiveId(null)}
            aria-label={item.name}
            className={`relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/90 dark:bg-neutral-900/90 border border-gray-400/40 dark:border-neutral-800/80 shadow-sm transition-colors duration-300 ${
              isActive ? "shadow-lg shadow-blue-500/20" : ""
            }`}
            whileHover={prefersReducedMotion ? {} : { scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            {Icon && <Icon className="h-6 w-6 sm:h-7 sm:w-7" />}
            {VariantIcon && <VariantIcon className="h-6 w-6 sm:h-7 sm:w-7" />}

            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/90 dark:bg-neutral-900/90 border border-gray-200/70 dark:border-neutral-700/70 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 shadow-md"
                >
                  {item.name}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={ref}
      className={`mt-24 w-full max-w-5xl scroll-reveal ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tighter text-gray-900 dark:text-gray-100">
          My Arsenal
        </h2>
      </div>

      <div className="mt-20 flex items-center justify-center">
        <div className="relative flex items-center justify-center w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[520px] lg:h-[520px]">
          <div className="relative z-10 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 shadow-lg">
            <motion.div
              animate={prefersReducedMotion ? {} : { scale: [1, 1.05, 1] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500"
            ></motion.div>
          </div>

          {Object.keys(rings).map((ringKey) => {
            const ringItems = rings[ringKey];
            const ringSize = ringConfig[ringKey].size;
            const ringLine = ringConfig[ringKey].line;

            if (ringItems.length === 0) return null;

            const speed = ringItems[0].speed;
            const direction = ringItems[0].direction === "ccw" ? -360 : 360;

            return (
              <motion.div
                key={ringKey}
                className={`absolute rounded-full border ${ringLine} pointer-events-none will-change-transform`}
                style={{ width: ringSize, height: ringSize }}
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        rotate: direction,
                      }
                }
                transition={{
                  duration: speed,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {ringItems.map(renderIcon)}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechOrbitSection;
