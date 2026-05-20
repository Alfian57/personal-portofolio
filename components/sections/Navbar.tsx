"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/constants/section-content";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { fadeInDown } from "@/lib/animations";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateNavbarState = () => {
      setScrolled(window.scrollY > 18);

      const activationLine = Math.min(180, Math.max(96, window.innerHeight * 0.28));
      const sections = NAV_ITEMS.flatMap((item) => {
        const element = document.getElementById(item.section);

        return element ? [{ id: item.section, element }] : [];
      });

      const current = sections.reduce((active, item) => {
        return item.element.offsetTop <= window.scrollY + activationLine ? item.id : active;
      }, "");
      const pageBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 12;

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
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
        <motion.nav
          initial="initial"
          animate="animate"
          variants={fadeInDown}
          className={`navbar-shell mx-auto max-w-7xl border-b transition-colors duration-300 ${
            scrolled
              ? "border-black bg-white/92 backdrop-blur-xl"
              : "border-black/18 bg-white/74 backdrop-blur-md"
          }`}
        >
          <Link
            href="#top"
            className="logo-mark"
            onClick={() => {
              setActiveSection("");
              setMobileOpen(false);
            }}
          >
            {PORTFOLIO_DATA.hero.name}
          </Link>

          <div className="navbar-links">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.section;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setActiveSection(item.section)}
                  aria-current={isActive ? "page" : undefined}
                  className={`nav-link ${isActive ? "is-active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <a href={`mailto:${PORTFOLIO_DATA.contact.email}`} className="navbar-email text-link">
            Email
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="icon-button navbar-menu-button"
            aria-label="Buka navigasi"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </motion.nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-white px-5 pt-24 pb-8 lg:hidden"
          >
            <motion.div
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 14, opacity: 0 }}
              className="grid gap-2 border-y border-black py-4"
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setActiveSection(item.section);
                    setMobileOpen(false);
                  }}
                  className="mobile-nav-link"
                >
                  <span>{item.label}</span>
                  <span>{item.short}</span>
                </Link>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
