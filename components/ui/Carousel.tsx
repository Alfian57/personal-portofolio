"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  images: string[];
  alt: string;
}

function shouldContainImage(src: string) {
  return src.includes("Cert") || src.includes("certificate") || src.includes("PKM-Cert");
}

export function Carousel({ images, alt }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((index) => (index === images.length - 1 ? 0 : index + 1));
  };

  if (images.length === 0) {
    return (
      <div className="clay-inset flex h-80 items-center justify-center">
        <p className="text-sm text-[var(--muted)]">Tidak ada visual yang tercatat.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="clay-inset relative h-[18rem] overflow-hidden md:h-[28rem]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={{
              enter: (currentDirection: number) => ({
                x: currentDirection > 0 ? "12%" : "-12%",
                opacity: 0,
              }),
              center: { x: 0, opacity: 1 },
              exit: (currentDirection: number) => ({
                x: currentDirection < 0 ? "12%" : "-12%",
                opacity: 0,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22 }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex]}
              alt={`${alt} - ${currentIndex + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className={
                shouldContainImage(images[currentIndex]) ? "object-contain p-4" : "object-cover"
              }
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent dark:from-slate-950/55" />

        <div className="clay-chip absolute bottom-4 left-4 bg-[var(--surface)]/90 text-[var(--foreground)] backdrop-blur-sm dark:bg-[var(--surface)]/90">
          Visual {currentIndex + 1} / {images.length}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              className="clay-icon absolute top-1/2 left-4 h-11 w-11 -translate-y-1/2 text-[var(--foreground)] backdrop-blur-sm dark:text-[var(--foreground)]"
              aria-label="Gambar sebelumnya"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="clay-icon absolute top-1/2 right-4 h-11 w-11 -translate-y-1/2 text-[var(--foreground)] backdrop-blur-sm dark:text-[var(--foreground)]"
              aria-label="Gambar berikutnya"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {images.map((image, index) => {
            const isActive = index === currentIndex;

            return (
              <button
                key={image}
                type="button"
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2.5 rounded-full transition-all ${
                  isActive
                    ? "w-10 bg-[image:var(--accent-gradient)]"
                    : "w-2.5 bg-slate-300 dark:bg-slate-600"
                }`}
                aria-label={`Ke gambar ${index + 1}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
