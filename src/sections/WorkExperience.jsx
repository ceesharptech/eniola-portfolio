import { experienceItems } from "../data/experienceItems";
import useScrollReveal from "../hooks/useScrollReveal";

const WorkExperience = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`flex flex-col items-start mt-20 gap-4 w-full md:max-w-lg scroll-reveal ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <h2 className="font-bold text-2xl md:text-3xl tracking-tighter mb-10 text-gray-900 dark:text-gray-100">
        Work Experience
      </h2>

      <div className="flex flex-col items-start gap-7 w-full">
        {experienceItems.map((item) => (
          <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-2 sm:gap-16 w-full"
            key={item.id}
          >
            <span className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium tracking-tighter min-w-[90px]">
              {item.year}
            </span>

            <div className="flex flex-wrap items-center gap-1 md:gap-2">
              <span className="text-base font-medium md:text-base text-gray-700 dark:text-gray-200 tracking-tight">
                {item.title} at
              </span>
              <div
                className={`${item.buttonStyle} flex justify-center items-center gap-2 tracking-tight border shadow-sm rounded-xl px-3 py-[5px] text-base md:text-base font-semibold`}
              >
                <item.icon className={`h-4 w-4 ${item.iconClass || ""}`} />
                {item.companyName}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;
