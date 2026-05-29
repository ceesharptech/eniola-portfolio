import { HugeiconsIcon } from "@hugeicons/react";
import { ChevronRight } from "@hugeicons/core-free-icons";
import { projectItems } from "../data/projectItems";
import useScrollReveal from "../hooks/useScrollReveal";
import {
  React,
  TailwindCSS,
  ExpressJsDark,
  ExpressJsLight,
  Supabase,
  NextJs,
  HTML5,
  CSS3,
  JavaScript,
  Django,
} from "developer-icons";

const toolIconMap = {
  react: React,
  tailwind: TailwindCSS,
  express: { light: ExpressJsDark, dark: ExpressJsLight },
  supabase: Supabase,
  next: NextJs,
  html: HTML5,
  css: CSS3,
  javascript: JavaScript,
  django: Django,
};

const ProjectCard = ({ item, index }) => {
  const { ref, isVisible } = useScrollReveal({
    threshold: 0.1,
    rootMargin: "0px 0px -10% 0px",
  });

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 0.1}ms` }}
      className={`flex flex-col items-start w-full gap-4 border border-gray-200 dark:border-neutral-800 p-5 rounded-3xl md:border-l md:border-gray-300 dark:md:border-neutral-700 pb-10 scroll-reveal ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <div className="bg-gray-300 dark:bg-neutral-800 w-full h-[240px] sm:h-[280px] md:h-[360px] lg:h-[440px] rounded-2xl p-4 sm:p-6 lg:p-8 shadow-md mb-4">
        <img
          src={item.image}
          alt={`${item.name} preview`}
          className="w-full h-full rounded-xl object-fill"
          loading="lazy"
        />
      </div>

      <div className="project-content flex flex-col items-start pl-3 gap-4">
        <h3 className="text-xl md:text-2xl font-semibold tracking-tighter">
          {item.name}
        </h3>

        <span className="text-gray-600 dark:text-gray-300 font-medium text-sm md:text-base max-w-full sm:max-w-md lg:max-w-lg tracking-tight">
          {item.description}
        </span>

        <div className="flex flex-wrap items-center gap-3 text-gray-700 dark:text-gray-200">
          {(item.tools || []).map((tool) => {
            const iconEntry = toolIconMap[tool];
            if (!iconEntry) return null;

            if (iconEntry.light && iconEntry.dark) {
              const LightIcon = iconEntry.light;
              const DarkIcon = iconEntry.dark;

              return (
                <span
                  key={`${item.id}-${tool}`}
                  className="relative h-6 w-6 md:h-7 md:w-7"
                >
                  <LightIcon className="h-6 w-6 md:h-7 md:w-7 dark:hidden" />
                  <DarkIcon className="hidden h-6 w-6 md:h-7 md:w-7 dark:block" />
                </span>
              );
            }

            const Icon = iconEntry;
            return (
              <Icon
                key={`${item.id}-${tool}`}
                className="h-6 w-6 md:h-7 md:w-7"
              />
            );
          })}
        </div>

        <a href={item.link}>
          <button
            className="text-sm lg:text-[15px] font-medium px-5 py-3 sm:px-7 sm:py-4 lg:px-6 lg:py-4
            rounded-[14px] hover:bg-gray-200 dark:hover:bg-neutral-700 active:scale-[0.98] transition-all duration-200 disabled:opacity-50
            disabled:cursor-not-allowed w-fit flex justify-center gap-1 items-center bg-gray-100 dark:bg-neutral-800 text-black dark:text-neutral-100
            hover:gap-3 tracking-tight"
          >
            View Project
            <HugeiconsIcon icon={ChevronRight} className="w-5 h-5" />
          </button>
        </a>
      </div>
    </div>
  );
};

const Projects = () => {
  const { ref, isVisible } = useScrollReveal({
    threshold: 0.2,
    rootMargin: "0px 0px -15% 0px",
  });

  return (
    <div
      id="projects"
      className="mt-32 flex flex-col items-center gap-12 w-full"
    >
      <h2
        ref={ref}
        className={`text-2xl lg:text-3xl font-bold tracking-tighter lg:mb-6 text-center text-gray-900 dark:text-gray-100 scroll-reveal bounce ${
          isVisible ? "is-visible" : ""
        }`}
      >
        Here's What I've been up to
      </h2>

      <div className="flex flex-col items-center gap-10 w-full md:max-w-xl lg:max-w-2xl mb-20">
        {projectItems.map((item, index) => (
          <ProjectCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
