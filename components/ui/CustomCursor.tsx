"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const interactiveSelector = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "summary",
  "[role='button']",
  "[data-cursor='interactive']",
].join(",");

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const cursorX = useMotionValue(-80);
  const cursorY = useMotionValue(-80);
  const springX = useSpring(cursorX, { stiffness: 520, damping: 34, mass: 0.32 });
  const springY = useSpring(cursorY, { stiffness: 520, damping: 34, mass: 0.32 });
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const interactiveRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const root = document.documentElement;
    root.classList.add("custom-cursor-enabled");

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setIsVisible(true);

      const target = event.target instanceof Element ? event.target : null;
      const nextInteractive = Boolean(target?.closest(interactiveSelector));

      if (interactiveRef.current !== nextInteractive) {
        interactiveRef.current = nextInteractive;
        setIsInteractive(nextInteractive);
      }
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      root.classList.remove("custom-cursor-enabled");
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [cursorX, cursorY, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="custom-cursor-ring"
        style={{ left: springX, top: springY }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isInteractive ? 1.65 : 1 }}
        transition={{ duration: 0.16, ease: "easeOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="custom-cursor-dot"
        style={{ left: cursorX, top: cursorY }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isInteractive ? 0.72 : 1 }}
        transition={{ duration: 0.12, ease: "easeOut" }}
      />
    </>
  );
}
