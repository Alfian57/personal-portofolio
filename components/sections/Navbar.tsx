"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-900/80 shadow-lg backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            className="bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-2xl font-bold text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            &lt;/&gt;
          </motion.div>

          <div className="hidden items-center space-x-8 md:flex">
            {PORTFOLIO_DATA.navigation.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 transition-colors hover:text-blue-400"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
