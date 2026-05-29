import { carouselItems } from "../data/carouselItems";
import useMarquee from "../hooks/useMarquee";

// Reusable sub-component layout so you don't repeat your card JSX code
const RenderCards = () => (
  <>
    {carouselItems.map((item, index) => (
      <div
        key={`${item.id}-${index}`}
        className="bg-gray-100/50 dark:bg-neutral-900/60 border-2 -z-10 border-gray-200 dark:border-neutral-800 rounded-3xl flex flex-col gap-1 items-center justify-between w-[400px] h-[300px] sm:w-[420px] sm:h-[320px] md:w-[420px] md:h-[320px] lg:w-[540px] lg:h-[390px] p-4 shrink-0"
      >
        <div className="w-full flex justify-between items-center">
          <div className="rounded-full bg-gray-300 dark:bg-neutral-700 w-2 h-2"></div>
          <div className="rounded-full bg-gray-300 dark:bg-neutral-700 w-2 h-2"></div>
        </div>

        <div className="carousel-image flex items-center -z-10 justify-center rounded-xl w-[95%] h-[95%] shadow-md overflow-hidden">
          <img
            src={item.image}
            alt={`Carousel item ${item.label}`}
            className="h-full w-full object-fill"
            loading="lazy"
          />
        </div>

        <div className="w-full flex justify-between items-center">
          <div className="rounded-full bg-gray-300 dark:bg-neutral-700 w-2 h-2"></div>
          <div className="rounded-full bg-gray-300 dark:bg-neutral-700 w-2 h-2"></div>
        </div>
      </div>
    ))}
  </>
);

const CarouselSection = () => {
  // We don't merge them into one array anymore.
  // The hook will now measure the parent track cleanly.
  const { containerRef, trackRef } = useMarquee({
    baseSpeed: 80,
    hoverSpeed: 40,
  });

  return (
    <div
      ref={containerRef}
      className="marquee flex items-center overflow-x-hidden mt-10 relative w-full animate-rise delay-6"
    >
      {/* Decorative gradient masks */}
      {/* <div className="bg-white dark:bg-neutral-950 h-full w-[30px] absolute z-10 left-0 pointer-events-none"></div>
      <div className="bg-white dark:bg-neutral-950 blur-xl h-full w-[80px] absolute z-10 left-0 pointer-events-none"></div>
      <div className="bg-white dark:bg-neutral-950 blur-xl h-full w-[80px] absolute z-10 right-0 pointer-events-none"></div>
      <div className="bg-white dark:bg-neutral-950 h-full w-[30px] absolute z-10 right-0 pointer-events-none"></div> */}

      {/* The Master moving track container */}
      <div
        ref={trackRef}
        className="marquee-track flex items-center gap-6 sm:gap-10 py-6 will-change-transform"
      >
        {/* Track 1 */}
        <div className="flex items-center gap-6 sm:gap-10 shrink-0">
          <RenderCards />
        </div>

        {/* Track 2 (Identical mirror copy for perfect loop alignment) */}
        <div
          className="flex items-center gap-6 sm:gap-10 shrink-0"
          aria-hidden="true"
        >
          <RenderCards />
        </div>
      </div>
    </div>
  );
};

export default CarouselSection;
