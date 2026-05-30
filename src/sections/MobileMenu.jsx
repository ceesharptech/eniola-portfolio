import { useEffect, useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu04Icon, X } from "@hugeicons/core-free-icons";
import { navItems } from "../data/navItems";
import MainButton from "../components/MainButton";

const MobileMenu = ({ isOpen, onToggle, onClose, onNavClick, activeId }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={containerRef}
      className="md:hidden mt-10 w-full sticky top-10 z-50 animate-nav delay-2"
    >
      <div className="flex justify-between items-center gap-6 pl-2 bg-white/70 dark:bg-neutral-900/70 border-2 border-gray-200 dark:border-neutral-800 rounded-3xl px-2 py-2 shadow-sm backdrop-blur-xl relative z-50">
        <div className="p-2">
          <button
            className={`flex justify-center items-center transition-all duration-300 ${
              isOpen ? "rotate-90" : "rotate-0"
            } text-gray-700 dark:text-gray-100`}
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls="mobile-menu-panel"
            aria-label="Toggle menu"
            type="button"
          >
            {isOpen ? (
              <HugeiconsIcon icon={X} className="w-7 h-7" />
            ) : (
              <HugeiconsIcon icon={Menu04Icon} className="w-7 h-7" />
            )}
          </button>
        </div>
        <a
          href="https://cal.com/eniola-amusu-lzh5bu"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MainButton>Book a Call</MainButton>
        </a>
      </div>

      <div
        id="mobile-menu-panel"
        className={`absolute left-0 top-[110%] w-full bg-white dark:bg-neutral-900/95 backdrop-blur-xl border-2 border-gray-200 dark:border-neutral-800 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 max-h-96 p-3"
            : "opacity-0 -translate-y-2 max-h-0 p-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onNavClick(item.scrollId)}
                className="flex items-center justify-start gap-3 py-3 px-3 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all duration-200 w-full text-gray-700 dark:text-gray-100"
              >
                {item.icon}
                <span className="text-md font-normal">{item.label}</span>
                {item.scrollId && item.scrollId === activeId && (
                  <span className="ml-auto bg-gray-800 dark:bg-gray-200 h-1.5 w-1.5 rounded-full"></span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
