"use client";

import { ArrowUp, Code2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { UI_COPY } from "@/constants/section-content";

export function Footer() {
  return (
    <footer className="relative z-10 px-6 pt-4 pb-10 md:px-8">
      <div className="clay-card mx-auto flex max-w-7xl flex-col gap-5 px-5 py-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="clay-icon h-12 w-12 shrink-0">
            <Code2 className="h-6 w-6" />
          </div>
          <div>
            <p className="display-font text-lg font-extrabold text-[var(--foreground)] dark:text-[var(--foreground)]">
              {PORTFOLIO_DATA.hero.name}
            </p>
            <p className="text-sm leading-7 text-[var(--muted)] dark:text-[var(--muted)]">
              {UI_COPY.footer}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-[var(--muted)] dark:text-[var(--muted)]">
            (c) {new Date().getFullYear()} Alfian Gading Saputra
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="clay-button clay-button-secondary px-4 py-3"
            aria-label={UI_COPY.backToTop}
          >
            <ArrowUp className="h-4 w-4" />
            <span className="hidden sm:inline">{UI_COPY.backToTop}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
