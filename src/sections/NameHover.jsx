import { TextHoverEffect } from "../components/ui/text-hover-effect";
import useScrollReveal from "../hooks/useScrollReveal";

const NameHover = () => {
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal({
    threshold: 0.2,
    rootMargin: "0px 0px -8% 0px",
  });

  return (
    <div className="h-[40rem] hidden lg:flex flex-col items-center justify-center w-full gap-6">
      <div
        ref={contentRef}
        className={`w-full scroll-reveal ${contentVisible ? "is-visible" : ""}`}
      >
        <TextHoverEffect text="ENIOLA" />
      </div>
    </div>
  );
};

export default NameHover;
