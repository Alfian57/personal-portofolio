"use client";

import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { ARCANE_LORE } from "@/constants/lore-content";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";

export function Footer() {
  return (
    <footer className="relative z-10 px-6 pt-4 pb-10 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-2xl border border-[var(--footer-border)] bg-[var(--footer-bg)] px-5 py-5 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--status-gold-border)] bg-[var(--status-gold-bg)]">
            <Image
              src="/isekai/guild-crest.svg"
              alt=""
              width={32}
              height={36}
              className="h-8 w-8 object-contain"
            />
          </div>
          <div>
            <p className="display-font text-lg text-[var(--foreground)]">
              {PORTFOLIO_DATA.hero.name}
            </p>
            <p className="text-sm leading-7 text-[var(--muted)]">{ARCANE_LORE.footer.closing}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-[var(--muted)]">
            (c) {new Date().getFullYear()} Alfian Gading Saputra
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="ghost-button px-4 py-3"
            aria-label={ARCANE_LORE.footer.backToTop}
          >
            <ArrowUp className="h-4 w-4" />
            <span className="hidden sm:inline">{ARCANE_LORE.footer.backToTop}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
