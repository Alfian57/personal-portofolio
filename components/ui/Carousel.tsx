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
      <div className="parchment-surface flex h-80 items-center justify-center">
        <p className="text-sm text-[var(--muted)]">Tidak ada visual yang tercatat.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="relative h-[18rem] overflow-hidden rounded-2xl border border-[var(--image-border)] bg-[var(--carousel-bg)] md:h-[28rem]">
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

        <div className="absolute inset-0 [background:var(--media-overlay)]" />

        <div className="absolute bottom-4 left-4 rounded-full border border-[var(--floating-control-border)] bg-[var(--media-caption-bg)] px-4 py-2 text-xs font-bold tracking-[0.14em] text-[var(--mana)] uppercase backdrop-blur-sm">
          Visual {currentIndex + 1} / {images.length}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              className="absolute top-1/2 left-4 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--floating-control-border)] bg-[var(--floating-control-bg)] text-[var(--foreground)] backdrop-blur-sm"
              aria-label="Gambar sebelumnya"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="absolute top-1/2 right-4 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--floating-control-border)] bg-[var(--floating-control-bg)] text-[var(--foreground)] backdrop-blur-sm"
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
                  isActive ? "w-10 bg-[var(--gold-bright)]" : "w-2.5 bg-[var(--dot-inactive)]"
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
