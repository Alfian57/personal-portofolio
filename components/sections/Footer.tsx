"use client";

import { PORTFOLIO_DATA } from "@/constants/portfolio-data";

export function Footer() {
  return (
    <footer className="border-t border-gray-800 px-4 py-8">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} {PORTFOLIO_DATA.hero.name}. Built with Next.js, TypeScript &
          Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
