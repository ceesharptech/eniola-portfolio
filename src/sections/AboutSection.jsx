import useScrollReveal from "../hooks/useScrollReveal";

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`flex flex-col justify-start gap-6 mt-16 w-[90%] max-w-md lg:max-w-lg scroll-reveal ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <h2 className="font-bold text-xl md:text-2xl lg:text-3xl tracking-tighter text-gray-900 dark:text-gray-100">
        About
      </h2>

      <p className="font-medium text-gray-700 dark:text-gray-300 text-sm md:text-base tracking-tight text-justify leading-normal">
        I’m a Full Stack Developer and Computer Science student. I enjoy turning
        ideas into functional, user-focused products while challenging myself to
        grow with every project. My goal is to{" "}
        <strong>become as cracked of an engineer as I can be.</strong>
        <br />
        <br />
        Beyond development, I’m driven by creativity, curiosity, and the desire
        to create work that stands out and leaves a lasting impression.
      </p>
    </div>
  );
};

export default AboutSection;
