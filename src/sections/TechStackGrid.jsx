import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { techStackItems } from "../data/techStackItems";
import useScrollReveal from "../hooks/useScrollReveal";

const useThemeVariant = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const updateTheme = () => setIsDarkMode(root.classList.contains("dark"));

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return isDarkMode;
};

const TechStackGrid = () => {
  const [activeId, setActiveId] = useState(null);
  const isDarkMode = useThemeVariant();
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal({
    threshold: 0.2,
    rootMargin: "0px 0px -15% 0px",
  });
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal({
    threshold: 0.15,
    rootMargin: "0px 0px -12% 0px",
  });

  const iconMap = useMemo(() => {
    return techStackItems.map((item) => {
      const iconEntry = item.icon;
      const LightIcon = iconEntry.light;
      const DarkIcon = iconEntry.dark;
      const BaseIcon = iconEntry.light ? null : iconEntry;
      const VariantIcon =
        LightIcon && DarkIcon ? (isDarkMode ? DarkIcon : LightIcon) : null;

      return {
        ...item,
        Icon: BaseIcon,
        VariantIcon,
      };
    });
  }, [isDarkMode]);

  const handlePointerDown = (event, id) => {
    if (event.pointerType === "mouse") return;
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="mt-32 w-full md:max-w-[38rem]">
      <div className="flex flex-col items-center gap-4">
        <h2
          ref={headingRef}
          className={`text-2xl lg:text-3xl font-bold tracking-tighter text-gray-900 dark:text-gray-100 scroll-reveal ${
            headingVisible ? "is-visible" : ""
          }`}
        >
          My Arsenal
        </h2>
      </div>

      <div
        ref={gridRef}
        className={`mt-16 grid grid-cols-2 md:grid-cols-3 gap-4 scroll-reveal ${
          gridVisible ? "is-visible" : ""
        }`}
      >
        {iconMap.map((item) => {
          const isActive = activeId === item.id;

          return (
            <motion.button
              key={item.id}
              type="button"
              onPointerDown={(event) => handlePointerDown(event, item.id)}
              onMouseEnter={() => setActiveId(item.id)}
              onMouseLeave={() => setActiveId(null)}
              onFocus={() => setActiveId(item.id)}
              onBlur={() => setActiveId(null)}
              aria-label={item.name}
              className={`relative flex items-center justify-center rounded-2xl border border-gray-200/80 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-900/80 p-6 shadow-sm transition-colors duration-300 scale-reveal ${
                gridVisible ? "is-visible" : ""
              } ${isActive ? "shadow-lg shadow-blue-500/20" : ""}`}
              style={{
                transitionDelay: `${item.order * 80}ms`,
                transformStyle: "preserve-3d",
              }}
              whileHover={{ y: -8, rotateX: 8, rotateY: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center">
                {item.Icon && (
                  <item.Icon className="h-10 w-10 md:h-12 md:w-12" />
                )}
                {item.VariantIcon && (
                  <item.VariantIcon className="h-10 w-10 md:h-12 md:w-12" />
                )}
              </div>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-gray-200/70 dark:border-neutral-700/70 bg-white/90 dark:bg-neutral-900/90 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 shadow-md"
                  >
                    {item.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};

export default TechStackGrid;
