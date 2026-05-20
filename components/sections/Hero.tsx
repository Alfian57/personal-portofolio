"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Check, Download, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { SectionShell } from "@/components/ui/SectionShell";
import { fadeInLeft, fadeInRight, fadeInUp, staggerSlow } from "@/lib/animations";

const skillBarItems = ["Backend API", "Fullstack Web", "Laravel", "Go", "Next.js", "Database"];

const heroProof = [
  "Backend, API, dan integrasi frontend",
  "Siap untuk peran fullstack/backend",
  "Yogyakarta / siap bekerja remote",
];

export function Hero() {
  const stats = [
    { label: "Karya Terpilih", value: String(PORTFOLIO_DATA.projects.length).padStart(2, "0") },
    { label: "Pengalaman", value: String(PORTFOLIO_DATA.experiences.length).padStart(2, "0") },
    {
      label: "Kredensial",
      value: String(PORTFOLIO_DATA.certifications.length).padStart(2, "0"),
    },
  ];

  return (
    <>
      <SectionShell id="top" className="hero-section">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerSlow}
          className="hero-grid"
        >
          <div className="hero-copy">
            <motion.div variants={fadeInLeft} className="hero-accent-dot" aria-hidden="true" />
            <motion.p variants={fadeInLeft} className="hero-eyebrow">
              Fullstack Developer Berorientasi Produk
            </motion.p>

            <motion.h1 variants={fadeInLeft} className="hero-title">
              <span>{PORTFOLIO_DATA.hero.greeting}</span>{" "}
              <strong>Saya {PORTFOLIO_DATA.hero.name.split(" ")[0]}</strong>
            </motion.h1>

            <motion.p variants={fadeInUp} className="hero-role">
              {PORTFOLIO_DATA.hero.tagline}
              <Sparkles className="h-4 w-4" />
            </motion.p>

            <motion.p variants={fadeInUp} className="hero-description">
              {PORTFOLIO_DATA.hero.description}
            </motion.p>

            <motion.ul variants={fadeInUp} className="hero-proof">
              {heroProof.map((item) => (
                <li key={item}>
                  <Check className="h-4 w-4" />
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeInUp} className="hero-actions">
              <a href="#projects" className="button button-primary">
                {PORTFOLIO_DATA.hero.cta.primary}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="text-action">
                {PORTFOLIO_DATA.hero.cta.secondary}
                <Download className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          <motion.div variants={fadeInRight} className="hero-portrait-wrap">
            <div className="hero-gradient" aria-hidden="true" />
            <div className="hello-badge">Halo</div>
            <div className="hero-portrait">
              <Image
                src="/editorial/alfian-hero-editorial.png"
                alt="Foto Alfian Gading Saputra"
                fill
                priority
                sizes="(max-width: 767px) 88vw, (max-width: 1024px) 70vw, 560px"
                className="object-cover object-top"
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div initial="initial" animate="animate" variants={staggerSlow} className="hero-stats">
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </motion.div>
          ))}
        </motion.div>
      </SectionShell>

      <div className="skill-bar" aria-label="Ringkasan keahlian">
        <div className="skill-bar-track">
          {skillBarItems.map((item) => (
            <a key={item} href="#about">
              <span>+</span>
              {item}
            </a>
          ))}
        </div>
      </div>

      <div className="micro-row">
        <div className="micro-row-socials">
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
        <a className="micro-row-email" href={`mailto:${PORTFOLIO_DATA.contact.email}`}>
          {PORTFOLIO_DATA.contact.email}
        </a>
        <a className="micro-row-scroll" href="#about" aria-label="Gulir ke profil">
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>
    </>
  );
}
