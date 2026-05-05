"use client";

import { useEffect, useRef } from "react";

function getSectionIndex(sections: Element[]) {
  const viewportMiddle = window.scrollY + window.innerHeight / 2;
  const sectionOffsets = sections.map(
    (section) => section.getBoundingClientRect().top + window.scrollY
  );

  return sectionOffsets.reduce((closestIndex, offset, index) => {
    const currentDistance = Math.abs(offset - viewportMiddle);
    const closestDistance = Math.abs(sectionOffsets[closestIndex] - viewportMiddle);

    return currentDistance < closestDistance ? index : closestIndex;
  }, 0);
}

export function SectionScrollController() {
  const isAnimating = useRef(false);
  const sectionsRef = useRef<Element[]>([]);

  useEffect(() => {
    const refreshSections = () => {
      sectionsRef.current = Array.from(document.querySelectorAll("main > section, main > footer"));
    };

    const scrollToSection = (direction: 1 | -1) => {
      const sections = sectionsRef.current;

      if (sections.length === 0 || isAnimating.current) {
        return;
      }

      const currentIndex = getSectionIndex(sections);
      const nextIndex = Math.min(Math.max(currentIndex + direction, 0), sections.length - 1);

      if (nextIndex === currentIndex) {
        return;
      }

      isAnimating.current = true;
      sections[nextIndex].scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => {
        isAnimating.current = false;
      }, 760);
    };

    refreshSections();

    const handleWheel = (event: WheelEvent) => {
      const target = event.target instanceof Element ? event.target : null;

      if (
        window.innerWidth < 768 ||
        event.ctrlKey ||
        Math.abs(event.deltaY) < 20 ||
        target?.closest("[data-native-scroll='true']")
      ) {
        return;
      }

      event.preventDefault();
      scrollToSection(event.deltaY > 0 ? 1 : -1);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target instanceof Element ? event.target : null;

      if (
        window.innerWidth < 768 ||
        event.defaultPrevented ||
        target?.closest(
          "input, textarea, select, [contenteditable='true'], [data-native-scroll='true']"
        )
      ) {
        return;
      }

      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        scrollToSection(1);
      }

      if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        scrollToSection(-1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", refreshSections, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", refreshSections);
    };
  }, []);

  return null;
}
