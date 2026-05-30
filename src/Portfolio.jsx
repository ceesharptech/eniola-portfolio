import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const navigate = useNavigate();

  const scrollTargets = useMemo(
    () => navItems.map((item) => item.scrollId).filter(Boolean),
    [],
  );

  const sectionsRef = useRef([]);

  useEffect(() => {
    sectionsRef.current = scrollTargets
      .map((id) => {
        const element = document.getElementById(id);
        if (!element) return null;
        return { id, element };
      })
      .filter(Boolean);
  }, [scrollTargets]);

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return;
    scrollToSection(target);
    navigate("/", { replace: true, state: {} });
  }, [location.state, navigate]);

  useEffect(() => {
    if (sectionsRef.current.length === 0) return;

    let animationFrame = null;
    const updateActiveSection = () => {
      animationFrame = null;
      const scrollPosition = window.scrollY + NAV_OFFSET + 1;

      const sections = sectionsRef.current
        .map(({ id, element }) => {
          const rect = element.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const bottom = top + rect.height;
          return { id, top, bottom };
        })
        .filter((section) => section.bottom > section.top);

      if (sections.length === 0) return;

      const pendingTarget = pendingSection
        ? sections.find((section) => section.id === pendingSection)
        : null;

      if (pendingTarget && scrollPosition < pendingTarget.top) {
        return;
      }

      const active = sections
        .filter((section) => scrollPosition >= section.top)
        .sort((a, b) => b.top - a.top)[0];

      if (active && active.id !== activeSection) {
        setActiveSection(active.id);
      }

      if (pendingTarget && scrollPosition >= pendingTarget.top) {
        setPendingSection(null);
      }
    };

    const handleScroll = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [activeSection, pendingSection]);

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
