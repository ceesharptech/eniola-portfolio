import { HugeiconsIcon } from "@hugeicons/react";
import useScrollReveal from "../hooks/useScrollReveal";
import {
  GithubIcon,
  InstagramIcon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";

const Footer = () => {
  const { ref, isVisible } = useScrollReveal({
    threshold: 1,
    rootMargin: "0px",
  });

  return (
    <footer
      ref={ref}
      className="md:mt-1 mt-20 flex flex-col items-center w-full max-w-3xl mb-10"
    >
      <div className="w-full bg-gray-300 dark:bg-neutral-800 h-[1px] mb-10"></div>
      <div className="flex flex-col gap-1 items-center text-center">
        <span
          className={`text-base text-gray-600 dark:text-gray-300 tracking-tight font-medium scroll-reveal ${
            isVisible ? "is-visible" : ""
          }`}
        >
          Copyright 2026 &copy; Eniola Amusu. All rights reserved
        </span>

        <div className="flex justify-center items-center gap-8 mt-8">
          <a
            href="https://github.com/ceesharptech"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HugeiconsIcon
              icon={GithubIcon}
              className={`w-6 h-6 text-gray-700 dark:text-gray-200 hover:cursor-pointer hover:rotate-6 hover:scale-110 transition-all duration-200 icon-reveal ${
                isVisible ? "is-visible" : ""
              }`}
              style={{ animationDelay: isVisible ? "140ms" : "0ms" }}
            />
          </a>
          <a
            href="https://instagram.com/10x.eniola"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HugeiconsIcon
              icon={InstagramIcon}
              className={`w-6 h-6 text-gray-700 dark:text-gray-200 hover:cursor-pointer hover:rotate-6 hover:scale-110 transition-all duration-200 icon-reveal ${
                isVisible ? "is-visible" : ""
              }`}
              style={{ animationDelay: isVisible ? "260ms" : "0ms" }}
            />
          </a>
          <a
            href="https://x.com/eniolaamusu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HugeiconsIcon
              icon={NewTwitterIcon}
              className={`w-6 h-6 text-gray-700 dark:text-gray-200 hover:cursor-pointer hover:rotate-6 hover:scale-110 transition-all duration-200 icon-reveal ${
                isVisible ? "is-visible" : ""
              }`}
              style={{ animationDelay: isVisible ? "380ms" : "0ms" }}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
