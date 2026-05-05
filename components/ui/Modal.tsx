"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "md" | "lg" | "xl";
}

export function Modal({ isOpen, onClose, children, size = "lg" }: ModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (!isOpen) {
      return;
    }

    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
      previouslyFocusedElement?.focus();
    };
  }, [isOpen, onClose]);

  if (typeof document === "undefined") {
    return null;
  }

  const sizeClass = size === "md" ? "max-w-3xl" : size === "xl" ? "max-w-6xl" : "max-w-5xl";

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[90]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[var(--modal-overlay)] backdrop-blur-xl dark:bg-[var(--modal-overlay)]"
          />

          <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 22, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Dialog detail portfolio"
              className={`clay-card clay-card-strong relative z-[1] max-h-[90vh] w-full overflow-hidden ${sizeClass}`}
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="clay-icon absolute top-3 right-3 z-10 h-11 w-11 text-[var(--foreground)] dark:text-[var(--foreground)]"
                aria-label="Tutup modal"
              >
                <X className="h-4 w-4" />
              </button>

              <div data-native-scroll="true" className="max-h-[90vh] overflow-y-auto">
                {children}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
