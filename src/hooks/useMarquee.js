import { useEffect, useRef } from "react";

const useMarquee = ({ baseSpeed = 40, hoverSpeed = 20 } = {}) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;

    if (!container || !track) return;

    let rafId = 0;
    let lastTime = performance.now();
    let translateX = 0;
    let speed = baseSpeed;
    let loopWidth = 0;

    const measure = () => {
      const firstChild = track.firstElementChild;
      if (firstChild && firstChild.scrollWidth > 0) {
        loopWidth = firstChild.scrollWidth;
        return;
      }
      loopWidth = track.scrollWidth / 2;
    };

    measure();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measure)
        : null;

    if (resizeObserver) {
      resizeObserver.observe(track);
    }

    const handleEnter = () => {
      speed = hoverSpeed;
    };

    const handleLeave = () => {
      speed = baseSpeed;
    };

    const step = (time) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      translateX -= speed * delta;

      if (loopWidth > 0) {
        translateX %= loopWidth;
        if (translateX > 0) {
          translateX -= loopWidth;
        }
      }

      track.style.transform = `translate3d(${translateX}px, 0, 0)`;
      rafId = requestAnimationFrame(step);
    };

    container.addEventListener("mouseenter", handleEnter);
    container.addEventListener("mouseleave", handleLeave);
    container.addEventListener("focusin", handleEnter);
    container.addEventListener("focusout", handleLeave);

    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      container.removeEventListener("mouseenter", handleEnter);
      container.removeEventListener("mouseleave", handleLeave);
      container.removeEventListener("focusin", handleEnter);
      container.removeEventListener("focusout", handleLeave);
    };
  }, [baseSpeed, hoverSpeed]);

  return { containerRef, trackRef };
};

export default useMarquee;
