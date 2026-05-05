"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/constants/section-content";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { fadeInDown } from "@/lib/animations";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateNavbarState = () => {
      setScrolled(window.scrollY > 24);

      const activationLine = Math.min(220, Math.max(112, window.innerHeight * 0.32));
      const sections = NAV_ITEMS.flatMap((item) => {
        const element = document.getElementById(item.section);

        return element ? [{ id: item.section, element }] : [];
      });

      const activeInViewport = sections.find((item) => {
        const rect = item.element.getBoundingClientRect();
        return rect.top <= activationLine && rect.bottom > activationLine;
      });

      const passedSection = sections.reduce((active, item) => {
        return item.element.offsetTop <= window.scrollY + activationLine ? item.id : active;
      }, "");

      const pageBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 12;
      const current = activeInViewport?.id ?? passedSection;

      setActiveSection(pageBottom ? (sections.at(-1)?.id ?? current) : current);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateNavbarState);
    };

    updateNavbarState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 md:px-6">
        <motion.nav
          initial="initial"
          animate="animate"
          variants={fadeInDown}
          className={`mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-[2rem] border px-3 py-2 transition-all duration-300 md:px-4 lg:grid lg:grid-cols-[minmax(12rem,16rem)_1fr_auto] lg:items-center ${
            scrolled
              ? "clay-card bg-[var(--surface)]/88 backdrop-blur-xl dark:bg-[var(--surface)]/88"
              : "border-[var(--border)] bg-[var(--surface)]/68 shadow-[var(--clay-shadow-small)] backdrop-blur-md dark:bg-[var(--surface)]/68"
          }`}
        >
          <Link
            href="#top"
            className="display-font min-w-0 shrink-0 truncate rounded-full px-3 py-2 text-sm font-extrabold text-[var(--foreground)] sm:text-base dark:text-[var(--foreground)]"
            onClick={() => {
              setActiveSection("");
              setMobileOpen(false);
            }}
          >
            {PORTFOLIO_DATA.hero.name}
          </Link>

          <div className="hidden items-center justify-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.section;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setActiveSection(item.section)}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full border px-3 py-2 text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? "nav-pill-active"
                      : "border-transparent text-[var(--muted)] hover:border-[var(--border)] hover:bg-[var(--surface-raised)] hover:text-[var(--foreground)] dark:hover:bg-[var(--surface-raised)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center gap-2 lg:justify-self-end">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="clay-icon h-11 w-11 text-[var(--foreground)] lg:!hidden dark:text-[var(--foreground)]"
              aria-label="Buka navigasi"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[var(--modal-overlay)] px-3 pt-24 pb-6 backdrop-blur-xl sm:px-4 md:px-6 dark:bg-[var(--modal-overlay)]"
          >
            <motion.div
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 14, opacity: 0 }}
              className="clay-card clay-card-strong mx-auto max-w-2xl p-4 sm:p-5"
            >
              <div className="mb-4">
                <p className="section-kicker">Navigasi</p>
                <h2 className="display-font mt-2 text-2xl font-bold text-[var(--foreground)]">
                  Pilih Bagian
                </h2>
              </div>

              <div className="grid gap-2">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.section;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        setActiveSection(item.section);
                        setMobileOpen(false);
                      }}
                      aria-current={isActive ? "page" : undefined}
                      className={`rounded-[1.4rem] border px-4 py-3 transition-all duration-200 ${
                        isActive
                          ? "nav-pill-active"
                          : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] shadow-[var(--clay-shadow-small)] hover:text-[var(--foreground)] dark:bg-[var(--surface)]"
                      }`}
                    >
                      <span className="display-font block text-lg font-bold">{item.label}</span>
                      <span className="mt-1 block text-xs font-bold tracking-[0.14em] uppercase opacity-75">
                        {item.short}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
