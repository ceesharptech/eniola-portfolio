import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;

    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    return storedTheme ? storedTheme === "dark" : prefersDark;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setIsDark((prev) => !prev)}
      className="fixed z-[60] right-4 bottom-6 top-auto md:right-8 md:top-10 md:bottom-auto h-10 w-10 md:h-12 md:w-12 rounded-full border border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur shadow-md shadow-black/10 dark:shadow-black/40 transition-all duration-300 animate-nav delay-2"
    >
      <span className="relative block h-full w-full">
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isDark
              ? "opacity-0 rotate-90 scale-75"
              : "opacity-100 rotate-0 scale-100"
          }`}
        >
          <HugeiconsIcon icon={Sun03Icon} className="h-5 w-5" />
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-75"
          }`}
        >
          <HugeiconsIcon icon={Moon02Icon} className="h-5 w-5" />
        </span>
      </span>
    </button>
  );
};

export default ThemeToggle;
