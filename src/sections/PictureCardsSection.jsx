import useScrollReveal from "../hooks/useScrollReveal";

const PictureCardsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`group mt-20 flex flex-col items-center w-full gap-6
     md:relative md:w-fit md:h-[360px] md:justify-center hover:scale-110 transition-all duration-300 scroll-reveal ${
       isVisible ? "is-visible" : ""
     }`}
    >
      <div
        className="flex flex-col items-start gap-2 w-full max-w-xs md:w-64 md:h-72
       bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-800 p-3 md:absolute md:right-0 md:top-14 md:z-10 md:-rotate-12 shadow-xl
       group-hover:-translate-x-3 group-hover:translate-y-2 transition-all duration-300"
      >
        <div className="w-full h-56 md:h-5/6 bg-gray-400 dark:bg-neutral-700"></div>
        <span className="font-normal text-3xl tracking-normal saint-font text-gray-800 dark:text-gray-100">
          Time when I traveled out
        </span>
      </div>
      <div
        className="flex flex-col items-start gap-2 w-full max-w-xs md:w-60 md:h-72
       bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-800 p-3 md:absolute md:left-0 md:top-0 md:z-20
       md:rotate-12 shadow-xl group-hover:translate-x-3 group-hover:translate-y-2 transition-all duration-300"
      >
        <div className="w-full h-56 md:h-5/6 bg-gray-400 dark:bg-neutral-700"></div>
        <span className="font-normal text-3xl tracking-normal saint-font text-gray-800 dark:text-gray-100">
          My Picture 2
        </span>
      </div>
    </div>
  );
};

export default PictureCardsSection;
