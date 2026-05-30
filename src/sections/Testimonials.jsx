import { testimonialItems } from "../data/testimonialItems";
import useMarquee from "../hooks/useMarquee";
import useScrollReveal from "../hooks/useScrollReveal";

// Isolated sub-component protects your custom styling rules
const RenderCards = () => (
  <>
    {testimonialItems.map((item, index) => (
      <div
        key={`${item.id}-${index}`}
        className="bg-gray-100/40 dark:bg-neutral-900/60 border-2 z-10 border-gray-100 dark:border-neutral-800 rounded-3xl w-[300px] sm:w-[320px] md:w-[320px] lg:w-[400px] p-6 shrink-0"
      >
        <div className="flex flex-col justify-between gap-8 h-full items-start">
          <p className="text-sm md:text-base font-normal text-gray-600 dark:text-gray-300 tracking-tight">
            {item.content}
          </p>
          <div className="flex items-center justify-start gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-neutral-700">
              <img
                src={item.avatarImg}
                alt={item.author}
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <span className="text-md md:text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                {item.author}
              </span>
              <p className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 tracking-tight">
                {item.authorTitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
);

const Testimonials = () => {
  const { containerRef, trackRef } = useMarquee({
    baseSpeed: 80,
    hoverSpeed: 40,
  });
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal({
    threshold: 0.2,
    rootMargin: "0px 0px -12% 0px",
  });
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal({
    threshold: 0.15,
    rootMargin: "0px 0px -10% 0px",
  });

  return (
    <div className="mt-24 flex flex-col items-center gap-4 w-full">
      <h2
        ref={headingRef}
        className={`text-2xl lg:text-3xl font-bold tracking-tighter text-gray-900 dark:text-gray-100 scroll-reveal ${
          headingVisible ? "is-visible" : ""
        }`}
      >
        Testimonials
      </h2>
      <div
        ref={contentRef}
        className={`scroll-reveal w-full ${contentVisible ? "is-visible" : ""}`}
      >
        <div
          ref={containerRef}
          className="marquee flex items-center overflow-x-hidden relative w-full"
        >
          {/* The Master track holding both mirror structures */}
          <div
            ref={trackRef}
            className="marquee-track flex items-stretch gap-6 sm:gap-10 py-6 will-change-transform"
          >
            {/* Track 1 */}
            <div className="flex items-stretch gap-6 sm:gap-10 shrink-0">
              <RenderCards />
            </div>

            {/* Track 2 (Identical mirror copy for calculation accuracy) */}
            <div
              className="flex items-stretch gap-6 sm:gap-10 shrink-0"
              aria-hidden="true"
            >
              <RenderCards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
