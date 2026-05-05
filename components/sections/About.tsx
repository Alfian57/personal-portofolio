"use client";

import { motion } from "framer-motion";
import { Code2, Database, ServerCog, ShieldCheck } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { Clay3DAsset } from "@/components/ui/Clay3DAsset";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function About() {
  const strengths = [
    {
      icon: ShieldCheck,
      title: "API aman",
      text: "Kontrak API, validasi, dan struktur backend yang mudah diaudit.",
    },
    {
      icon: Database,
      title: "Database rapi",
      text: "Skema, relasi, query, dan alur data dipikirkan sejak awal.",
    },
    {
      icon: Code2,
      title: "UI terawat",
      text: "Interface responsif yang tetap jelas untuk user dan tim.",
    },
  ];

  const principles = [
    "Rancang alur data dan API sebelum mempercantik tampilan.",
    "Jaga performa, keamanan, dan maintainability sejak awal.",
    "Buat kompleksitas teknis terasa tertata untuk user dan tim.",
  ];

  return (
    <SectionShell
      id="about"
      asset={
        <Clay3DAsset
          variant="database"
          delay="medium"
          className="right-4 bottom-[8%] hidden h-32 w-32 opacity-75 xl:block 2xl:right-[calc((100vw_-_80rem)/2_-_2rem)]"
        />
      }
    >
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <SectionHeading section="about" />

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)]">
          <motion.article variants={fadeInUp} className="clay-card p-5 md:p-6">
            <p className="text-base leading-7 font-semibold text-[var(--muted-strong)] dark:text-[var(--muted-strong)]">
              Saya adalah Fullstack Developer dengan fokus kuat pada backend, desain API, database,
              dan integrasi antarmuka.
            </p>

            <p className="mt-4 line-clamp-5 text-sm leading-7 text-[var(--muted)] dark:text-[var(--muted)]">
              {PORTFOLIO_DATA.about.description.join(" ")}
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {strengths.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="clay-inset min-w-0 p-4">
                    <div className="clay-icon h-10 w-10 rounded-[1.2rem]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="display-font mt-3 text-base font-extrabold text-[var(--foreground)] dark:text-[var(--foreground)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)] dark:text-[var(--muted)]">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.article>

          <div className="grid gap-4">
            <motion.aside variants={fadeInUp} className="clay-card p-5">
              <div className="flex items-center gap-3">
                <div className="clay-icon h-11 w-11 rounded-[1.25rem]">
                  <ServerCog className="h-5 w-5" />
                </div>
                <div>
                  <p className="section-kicker">Fokus Saat Ini</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)] dark:text-[var(--muted)]">
                    Backend Laravel, Go, Next.js, Docker, dan praktik desain sistem.
                  </p>
                </div>
              </div>
            </motion.aside>

            <motion.aside variants={fadeInUp} className="clay-card p-5">
              <p className="section-kicker">Prinsip Engineering</p>
              <div className="mt-4 grid gap-3">
                {principles.map((item, index) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="status-dot mt-2 shrink-0" />
                    <div>
                      <p className="text-xs font-extrabold tracking-[0.14em] text-[var(--accent)] uppercase dark:text-[var(--accent)]">
                        Prinsip 0{index + 1}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-[var(--foreground)] dark:text-[var(--foreground)]">
                        {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.aside>

            <motion.aside variants={fadeInUp} className="clay-card p-5">
              <p className="section-kicker">Fullstack Tech Stack</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {PORTFOLIO_DATA.about.skills.map((skill) => (
                  <span key={skill} className="clay-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.aside>
          </div>
        </div>
      </motion.div>
    </SectionShell>
  );
}
