import { serviceItems } from "../data/serviceItems";
import useScrollReveal from "../hooks/useScrollReveal";

const ServiceCard = ({ item, index }) => {
  const { ref, isVisible } = useScrollReveal({
    threshold: 0.12,
    rootMargin: "0px 0px -10% 0px",
  });

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 90}ms` }}
      className={`flex flex-col items-center md:items-start justify-between p-6 md:pl-8 gap-1 md:gap-4 bg-gray-100/40 dark:bg-neutral-900/60 border border-gray-200 dark:border-neutral-800 w-full h-44 lg:h-52 rounded-2xl shadow-sm scale-reveal ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <div className="w-full flex justify-center md:justify-start">
        <div className="group relative w-24 h-24 md:w-24 md:h-24">
          <div className="bg-slate-900 dark:bg-slate-200 w-14 h-14 md:w-20 md:h-20 rounded-2xl absolute top-5 z-20 left-10 rotate-12 shadow-xl shadow-black/20 group-hover:rotate-[20deg] group-hover:left-12 transition-all duration-200"></div>
          <div className="bg-slate-200 dark:bg-slate-700 w-14 h-14 md:w-20 md:h-20 rounded-2xl absolute top-1 z-10 left-0 -rotate-12 shadow-xl shadow-black/20 group-hover:-rotate-[20deg] group-hover:-left-2 transition-all duration-200"></div>
        </div>
      </div>

      <span className="text-sm md:text-lg text-black/90 dark:text-neutral-100 font-semibold tracking-tighter">
        {item.name}
      </span>
    </div>
  );
};

const MyServices = () => {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal({
    threshold: 0.2,
    rootMargin: "0px 0px -15% 0px",
  });
  const { ref: subRef, isVisible: subVisible } = useScrollReveal({
    threshold: 0.2,
    rootMargin: "0px 0px -12% 0px",
  });

  return (
    <div className="flex flex-col items-center mt-20 gap-4 w-full max-w-2xl">
      <div className="flex flex-col items-center gap-3 text-center">
        <h2
          ref={headingRef}
          className={`font-bold text-2xl md:text-3xl tracking-tighter text-gray-900 dark:text-gray-100 scroll-reveal ${
            headingVisible ? "is-visible" : ""
          }`}
        >
          How Can I Help?
        </h2>
        <span
          ref={subRef}
          className={`text-base lg:text-lg text-gray-500 dark:text-gray-400 font-medium tracking-tight scroll-reveal ${
            subVisible ? "is-visible" : ""
          }`}
        >
          Let's turn your vision into something amazing
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4 w-full mt-5">
        {serviceItems.map((item, index) => (
          <ServiceCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default MyServices;
