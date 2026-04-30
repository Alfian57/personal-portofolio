"use client";

import { motion } from "framer-motion";
import { Code2, Database, ServerCog, ShieldCheck } from "lucide-react";
import { ARCANE_LORE } from "@/constants/lore-content";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function About() {
  const strengths = [
    {
      icon: ShieldCheck,
      title: "Pola pikir API aman",
      text: "Membiasakan kontrak API, validasi, dan struktur backend yang mudah diaudit.",
    },
    {
      icon: Database,
      title: "Peka database",
      text: "Memperhatikan skema, relasi, query, dan flow data sejak awal pengerjaan.",
    },
    {
      icon: Code2,
      title: "UI mudah dirawat",
      text: "Menyusun interface yang rapi, responsif, dan tidak mengorbankan kejelasan konten.",
    },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <SectionHeading section="about" />

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]">
            <motion.article variants={fadeInUp} className="section-frame p-5 sm:p-6 md:p-7">
              <p className="text-base leading-7 text-[var(--muted-strong)]">
                {ARCANE_LORE.about.prelude}
              </p>

              <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--muted)] sm:text-base">
                {PORTFOLIO_DATA.about.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="ornament-line my-6" />

              <div className="grid gap-4 md:grid-cols-3">
                {strengths.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="min-w-0">
                      <Icon className="h-5 w-5 text-[var(--gold-bright)]" />
                      <h3 className="display-font mt-3 text-lg font-bold text-[var(--foreground)]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </motion.article>

            <div className="grid gap-5">
              <motion.aside variants={fadeInUp} className="section-frame p-5 sm:p-6">
                <p className="section-kicker">{ARCANE_LORE.about.creedTitle}</p>
                <div className="mt-5 space-y-4">
                  {ARCANE_LORE.about.creed.map((item, index) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="rune-dot mt-2 shrink-0" />
                      <div>
                        <p className="text-xs font-bold tracking-[0.16em] text-[var(--mana)] uppercase">
                          Prinsip 0{index + 1}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-[var(--foreground)]">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.aside>

              <motion.aside variants={fadeInUp} className="section-frame p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <ServerCog className="h-5 w-5 text-[var(--gold-bright)]" />
                  <p className="section-kicker">{ARCANE_LORE.about.currentTitle}</p>
                </div>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {ARCANE_LORE.about.currentDescription}
                </p>
              </motion.aside>

              <motion.aside variants={fadeInUp} className="section-frame p-5 sm:p-6">
                <p className="section-kicker">{ARCANE_LORE.about.focusTitle}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {PORTFOLIO_DATA.about.skills.map((skill) => (
                    <span key={skill} className="arcane-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.aside>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
