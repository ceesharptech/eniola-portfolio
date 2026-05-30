import { useEffect, useMemo, useState } from "react";
import FloatingNav from "./sections/FloatingNav";
import MobileMenu from "./sections/MobileMenu";
import IntroSection from "./sections/IntroSection";
import CarouselSection from "./sections/CarouselSection";
import AboutSection from "./sections/AboutSection";
import WorkExperience from "./sections/WorkExperience";
import Projects from "./sections/Projects";
import MyServices from "./sections/MyServices";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import NameHover from "./sections/NameHover";
import TechStackGrid from "./sections/TechStackGrid";
import { navItems } from "./data/navItems";
import ThemeToggle from "./components/ThemeToggle";

const NAV_OFFSET = 150;

const Portfolio = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [pendingSection, setPendingSection] = useState(null);

  const scrollTargets = useMemo(
    () => navItems.map((item) => item.scrollId).filter(Boolean),
    [],
  );

  useEffect(() => {
    const sections = scrollTargets
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length === 0) return;

        const bestEntry = visibleEntries.reduce((current, next) =>
          current.intersectionRatio >= next.intersectionRatio ? current : next,
        );

        if (pendingSection && bestEntry.target.id !== pendingSection) {
          return;
        }

        setActiveSection(bestEntry.target.id);
        setPendingSection(null);
      },
      {
        root: null,
        rootMargin: `-${NAV_OFFSET}px 0px -45% 0px`,
        threshold: [0.1, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [scrollTargets, pendingSection]);

  const scrollToSection = (sectionId) => {
    if (!sectionId) return;
    const section = document.getElementById(sectionId);
    if (!section) return;

    setPendingSection(sectionId);

    const top =
      section.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleNavClick = (sectionId) => {
    if (!sectionId) return;
    setPendingSection(sectionId);
    if (isOpen) {
      setIsOpen(false);
      window.setTimeout(() => scrollToSection(sectionId), 200);
      return;
    }
    scrollToSection(sectionId);
  };

  return (
    <div className="flex flex-col items-center px-6 sm:px-8 lg:px-0 w-full min-h-screen bg-white text-gray-900 dark:bg-neutral-950 dark:text-gray-100 transition-colors duration-300">
      <ThemeToggle />
      <FloatingNav activeId={activeSection} onNavClick={handleNavClick} />
      <MobileMenu
        isOpen={isOpen}
        onToggle={() => setIsOpen((open) => !open)}
        onClose={() => setIsOpen(false)}
        onNavClick={handleNavClick}
        activeId={activeSection}
      />

      <main className="mt-20 flex flex-col items-center w-full max-w-5xl">
        <IntroSection />
      </main>

      <CarouselSection />
      <AboutSection />
      <TechStackGrid />

      <div className="mt-32 w-full md:w-[50%] bg-gray-300 dark:bg-neutral-800 h-[1px]"></div>

      <WorkExperience />
      <Projects />
      <MyServices />
      <Testimonials />
      <Contact />
      <NameHover />
      <Footer />
    </div>
  );
};

export default Portfolio;
