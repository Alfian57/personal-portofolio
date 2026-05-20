"use client";

import { ArrowUp } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-socials">
          {PORTFOLIO_DATA.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            >
              {social.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="footer-top"
          aria-label="Kembali ke atas"
        >
          <ArrowUp className="h-4 w-4" />
        </button>

        <p>Portofolio pribadi(c)2026</p>
      </div>
    </footer>
  );
}
