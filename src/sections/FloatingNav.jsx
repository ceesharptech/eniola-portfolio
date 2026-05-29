import { Fragment } from "react";
import { navItems } from "../data/navItems";
import MainButton from "../components/MainButton";
const FloatingNav = ({ activeId, onNavClick }) => {
  return (
    <div className="mt-10 hidden md:flex justify-center items-center backdrop-blur-md bg-white/70 dark:bg-neutral-900/70 border-2 border-gray-200 dark:border-neutral-800 rounded-3xl px-2 py-2 top-10 z-50 sticky transition-all duration-500 animate-nav delay-3">
      <div className="flex justify-between items-center gap-6 pl-2">
        {navItems.map((item, index) => (
          <Fragment key={item.id}>
            <div className="group flex flex-col items-center gap-2 relative hover:scale-110 transition-all duration-200">
              <div
                className="hidden group-hover:flex absolute top-0 left-0 right-0 bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 px-4 py-2 rounded-xl
              group-hover:translate-y-12 w-fit hover:cursor-pointer transition-all duration-300"
              >
                <span className="text-xs text-gray-600 dark:text-gray-300 font-normal tracking-tighter">
                  {item.label}
                </span>
              </div>
              <button
                type="button"
                className={`${activeId === item.scrollId ? "py-2 px-3" : "p-3"} hover:px-4 hover:bg-gray-100 dark:hover:bg-neutral-800 flex
              flex-col items-center justify-center rounded-xl transition-all duration-300 text-gray-700 dark:text-gray-100`}
                aria-label={item.label}
                onClick={() => onNavClick(item.scrollId)}
              >
                {item.icon}
                {item.scrollId && item.scrollId === activeId && (
                  <div className="mt-1 bg-gray-800 dark:bg-gray-200 h-1 w-1 rounded-full"></div>
                )}
              </button>
            </div>
            {index === 0 && (
              <div className="bg-gray-300 dark:bg-neutral-700 h-6 w-[1px]"></div>
            )}
          </Fragment>
        ))}
        <MainButton>Book a Call</MainButton>
      </div>
    </div>
  );
};

export default FloatingNav;
