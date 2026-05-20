"use client";

import { motion } from "framer-motion";
import { ArrowRight, Braces, Database, Layers3, ServerCog } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const offerings = [
  {
    icon: ServerCog,
    title: "Desain Backend API",
    text: "REST API, autentikasi, validasi, dan struktur Laravel/Go yang mudah dirawat.",
  },
  {
    icon: Database,
    title: "Database & Alur Data",
    text: "Skema, relasi, query, dan alur data yang jelas untuk produk web yang bertumbuh.",
  },
  {
    icon: Layers3,
    title: "Antarmuka Fullstack",
    text: "Antarmuka Next.js/Tailwind yang rapi, responsif, dan terhubung dengan backend.",
  },
];

export function About() {
  return (
    <SectionShell id="about" className="white-section">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className="section-split-heading offering-heading">
          <SectionHeading section="about" />
          <p>
            {PORTFOLIO_DATA.about.description[0]} {PORTFOLIO_DATA.about.description[2]}
          </p>
          <a href="#contact" className="button button-primary">
            Lihat Semua Layanan
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="offering-grid">
          {offerings.map((item, index) => {
            const Icon = item.icon;
            const featured = index === 0;

            return (
              <motion.article
                key={item.title}
                variants={fadeInUp}
                className={`offering-card ${featured ? "is-featured" : ""}`}
              >
                <Icon className="h-8 w-8" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a href="#projects">
                  Baca Selengkapnya
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.article>
            );
          })}
        </div>

        <motion.div variants={fadeInUp} className="skills-marquee">
          <Braces className="h-5 w-5" />
          {PORTFOLIO_DATA.about.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </motion.div>
      </motion.div>
    </SectionShell>
  );
}
