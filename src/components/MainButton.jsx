import { HugeiconsIcon } from "@hugeicons/react";
import { ChevronRight } from "@hugeicons/core-free-icons";

const MainButton = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        group
        bg-neutral-950
        text-white
        dark:bg-neutral-100
        dark:text-neutral-900
        
        text-sm lg:text-[15px]

        pl-6 pr-6 py-3
        group-hover:pr-8
        sm:pl-7 sm:pr-7 sm:py-4
        sm:group-hover:pr-9
        lg:pl-7 lg:pr-7 lg:py-4

        rounded-[14px]

        hover:bg-neutral-900
        dark:hover:bg-white
        active:scale-[0.98]

        transition-all
        duration-200

        disabled:opacity-50
        disabled:cursor-not-allowed

        w-fit

        ${className}
      `}
    >
      <div className="inline-flex items-center gap-0 group-hover:gap-3 transition-all duration-200">
        {children}
        <span className="inline-flex items-center overflow-hidden w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-200">
          <HugeiconsIcon
            icon={ChevronRight}
            className="w-5 h-5 text-white dark:text-neutral-900"
          />
        </span>
      </div>
    </button>
  );
};

export default MainButton;
