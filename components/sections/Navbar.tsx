"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ARCANE_NAV } from "@/constants/lore-content";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
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
      const sections = ARCANE_NAV.flatMap((item) => {
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
          className={`mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl border px-3 py-2 transition-all duration-300 md:px-4 xl:grid xl:grid-cols-[minmax(12rem,16rem)_1fr_auto] xl:items-center ${
            scrolled
              ? "border-[var(--navbar-border)] bg-[var(--navbar-bg-scrolled)] shadow-[var(--shadow-card)] backdrop-blur-xl"
              : "border-[var(--navbar-border)] bg-[var(--navbar-bg)] backdrop-blur-md"
          }`}
        >
          <Link
            href="#top"
            className="display-font min-w-0 shrink-0 truncate rounded-xl px-2 py-2 text-sm font-bold text-[var(--foreground)] sm:text-base"
            onClick={() => {
              setActiveSection("");
              setMobileOpen(false);
            }}
          >
            {PORTFOLIO_DATA.hero.name}
          </Link>

          <div className="hidden items-center justify-center gap-1 xl:flex">
            {ARCANE_NAV.map((item) => {
              const isActive = activeSection === item.section;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setActiveSection(item.section)}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full border px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? "border-[var(--glass-border-strong)] bg-[var(--parchment-strong)] text-[var(--foreground)]"
                      : "border-transparent text-[var(--muted)] hover:border-[var(--border-soft)] hover:bg-[var(--glass-bg)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {item.lore}
                </Link>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center gap-2 xl:justify-self-end">
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--foreground)] xl:hidden"
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
            className="fixed inset-0 z-40 bg-[var(--modal-overlay)] px-3 pt-24 pb-6 backdrop-blur-xl sm:px-4 md:px-6"
          >
            <motion.div
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 14, opacity: 0 }}
              className="section-frame mx-auto max-w-2xl p-4 sm:p-5"
            >
              <div className="mb-4">
                <p className="section-kicker">Navigasi</p>
                <h2 className="display-font mt-2 text-2xl font-bold text-[var(--foreground)]">
                  Pilih Bagian
                </h2>
              </div>

              <div className="grid gap-2">
                {ARCANE_NAV.map((item) => {
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
                      className={`rounded-xl border px-4 py-3 transition-colors duration-200 ${
                        isActive
                          ? "border-[var(--glass-border-strong)] bg-[var(--parchment-strong)] text-[var(--foreground)]"
                          : "border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--muted)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      <span className="display-font block text-lg font-bold">{item.lore}</span>
                      <span className="mt-1 block text-xs font-bold tracking-[0.16em] text-[var(--mana)] uppercase">
                        {item.english}
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
