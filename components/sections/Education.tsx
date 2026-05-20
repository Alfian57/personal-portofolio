"use client";

import { motion } from "framer-motion";
import { CalendarRange, GraduationCap, MapPin } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Education() {
  return (
    <SectionShell id="education">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <SectionHeading section="education" />

        <div className="grid gap-6 lg:grid-cols-2">
          {PORTFOLIO_DATA.education.map((item) => (
            <motion.article
              key={item.id}
              variants={fadeInUp}
              className="education-card editorial-card card-hover p-5 sm:p-6 md:p-7"
            >
              <div className="education-card-header flex items-start gap-4">
                <div className="education-card-icon editorial-icon h-14 w-14 shrink-0">
                  <GraduationCap className="h-6 w-6" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="section-kicker">Riwayat Pendidikan</p>
                  <h3 className="education-card-title display-font mt-3 text-3xl font-extrabold text-[var(--foreground)] dark:text-[var(--foreground)]">
                    {item.degree}
                  </h3>
                  <p className="education-card-institution mt-2 text-lg font-bold text-[var(--accent)] dark:text-[var(--accent)]">
                    {item.institution}
                  </p>
                </div>
              </div>

              <div className="education-meta-row mt-6 flex flex-wrap gap-3 text-sm text-[var(--muted)] dark:text-[var(--muted)]">
                <span className="editorial-chip">
                  <CalendarRange className="h-4 w-4 text-[var(--accent)]" />
                  {item.period}
                </span>
                <span className="editorial-chip">
                  <MapPin className="h-4 w-4 text-[var(--accent)]" />
                  {item.location}
                </span>
              </div>

              {item.description && (
                <p className="education-description mt-6 text-sm leading-8 text-[var(--muted)] dark:text-[var(--muted)]">
                  {item.description}
                </p>
              )}
            </motion.article>
          ))}
        </div>
      </motion.div>
    </SectionShell>
  );
}
