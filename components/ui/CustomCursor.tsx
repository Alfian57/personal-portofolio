"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

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
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || coarsePointer || !ringRef.current || !dotRef.current) {
      return;
    }

    const root = document.documentElement;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const pointer = { x: -80, y: -80 };
    const ringPosition = { x: -80, y: -80 };
    let frame = 0;
    let visible = false;
    let interactive = false;

    root.classList.add("custom-cursor-enabled");

    const setVisibility = (nextVisible: boolean) => {
      if (visible === nextVisible) {
        return;
      }

      visible = nextVisible;
      ring.dataset.visible = String(nextVisible);
      dot.dataset.visible = String(nextVisible);
    };

    const setInteractive = (nextInteractive: boolean) => {
      if (interactive === nextInteractive) {
        return;
      }

      interactive = nextInteractive;
      ring.dataset.interactive = String(nextInteractive);
      dot.dataset.interactive = String(nextInteractive);
    };

    const animate = () => {
      ringPosition.x += (pointer.x - ringPosition.x) * 0.24;
      ringPosition.y += (pointer.y - ringPosition.y) * 0.24;

      ring.style.transform = `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      pointer.x = event.clientX;
      pointer.y = event.clientY;
      setVisibility(true);

      const target = event.target instanceof Element ? event.target : null;
      setInteractive(Boolean(target?.closest(interactiveSelector)));
    };

    const handlePointerLeave = () => setVisibility(false);

    frame = requestAnimationFrame(animate);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      root.classList.remove("custom-cursor-enabled");
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <>
      <div ref={ringRef} aria-hidden="true" className="custom-cursor-ring" />
      <div ref={dotRef} aria-hidden="true" className="custom-cursor-dot" />
    </>,
    document.body
  );
}
