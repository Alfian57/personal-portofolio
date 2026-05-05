"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BriefcaseBusiness, CalendarRange, ChevronRight, MapPin } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { Clay3DAsset } from "@/components/ui/Clay3DAsset";
import { Modal } from "@/components/ui/Modal";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Experience as ExperienceType } from "@/types/portfolio";

function getTypeStyles(type: ExperienceType["type"]) {
  if (type === "Contract") {
    return "bg-[var(--success-soft)] text-teal-700 dark:text-teal-200";
  }

  if (type === "Internship") {
    return "bg-[var(--warning-soft)] text-amber-700 dark:text-amber-200";
  }

  return "bg-[var(--danger-soft)] text-rose-700 dark:text-rose-200";
}

function getTypeLabel(type: ExperienceType["type"]) {
  if (type === "Contract") {
    return "Kontrak";
  }

  if (type === "Internship") {
    return "Magang";
  }

  return "Full-time";
}

export function Experience() {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceType | null>(null);

  return (
    <SectionShell
      id="experience"
      asset={
        <Clay3DAsset
          variant="cube"
          delay="short"
          className="top-[16%] left-4 hidden h-28 w-28 opacity-70 xl:block 2xl:left-[calc((100vw_-_80rem)/2_-_2.5rem)]"
        />
      }
    >
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <SectionHeading section="experience" />

        <div className="grid gap-4 lg:grid-cols-2">
          {PORTFOLIO_DATA.experiences.map((experience, index) => (
            <motion.button
              key={experience.id}
              type="button"
              variants={fadeInUp}
              onClick={() => setSelectedExperience(experience)}
              className="clay-card card-hover grid gap-4 p-4 text-left md:p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="clay-icon h-11 w-11 shrink-0 rounded-[1.25rem]">
                    <BriefcaseBusiness className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold tracking-[0.14em] text-[var(--accent)] uppercase dark:text-[var(--accent)]">
                      Pengalaman 0{index + 1}
                    </p>
                    <h3 className="display-font mt-1 truncate text-2xl font-extrabold text-[var(--foreground)] dark:text-[var(--foreground)]">
                      {experience.title}
                    </h3>
                    <p className="mt-1 truncate text-base font-bold text-[var(--accent)] dark:text-[var(--accent)]">
                      {experience.company}
                    </p>
                  </div>
                </div>

                <span
                  className={`clay-chip shrink-0 px-3 py-1 text-xs uppercase ${getTypeStyles(
                    experience.type
                  )}`}
                >
                  {getTypeLabel(experience.type)}
                </span>
              </div>

              <div className="grid gap-2 text-sm text-[var(--muted)] sm:grid-cols-2 dark:text-[var(--muted)]">
                <span className="inline-flex items-center gap-2">
                  <CalendarRange className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                  <span className="truncate">{experience.period}</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                  <span className="truncate">{experience.location}</span>
                </span>
              </div>

              <p className="line-clamp-2 text-sm leading-6 text-[var(--muted)] dark:text-[var(--muted)]">
                {experience.description[0]}
              </p>

              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 flex-wrap gap-2">
                  {experience.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="clay-chip">
                      {tech}
                    </span>
                  ))}
                  {experience.technologies.length > 3 && (
                    <span className="clay-chip">+{experience.technologies.length - 3}</span>
                  )}
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-[var(--accent)] dark:text-[var(--accent)]">
                  Detail
                  <ChevronRight className="h-4 w-4" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <Modal isOpen={!!selectedExperience} onClose={() => setSelectedExperience(null)} size="lg">
        {selectedExperience && (
          <div className="p-5 md:p-7">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
              <div className="flex min-w-0 items-start gap-4">
                <div className="clay-icon h-14 w-14 shrink-0">
                  <BriefcaseBusiness className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="section-kicker">Detail Pengalaman</p>
                  <h2 className="display-font mt-3 text-3xl leading-tight font-extrabold text-[var(--foreground)] md:text-4xl dark:text-[var(--foreground)]">
                    {selectedExperience.title}
                  </h2>
                  <p className="mt-2 text-lg font-bold text-[var(--accent)] dark:text-[var(--accent)]">
                    {selectedExperience.company}
                  </p>
                </div>
              </div>

              <span
                className={`clay-chip w-fit px-3 py-1 text-xs uppercase ${getTypeStyles(selectedExperience.type)}`}
              >
                {getTypeLabel(selectedExperience.type)}
              </span>
            </div>

            <div className="mt-5 grid gap-3 text-sm text-[var(--muted)] sm:grid-cols-2 dark:text-[var(--muted)]">
              <div className="clay-inset flex items-center gap-3 px-4 py-3">
                <CalendarRange className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                <span>{selectedExperience.period}</span>
              </div>
              <div className="clay-inset flex items-center gap-3 px-4 py-3">
                <MapPin className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                <span>{selectedExperience.location}</span>
              </div>
            </div>

            <div className="soft-divider my-6" />

            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.55fr)]">
              <div className="clay-inset p-5">
                <p className="section-kicker">Tanggung Jawab Utama</p>
                <ul className="mt-4 space-y-3">
                  {selectedExperience.description.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-7 text-[var(--muted)] dark:text-[var(--muted)]"
                    >
                      <span className="status-dot mt-2 h-2.5 w-2.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="clay-card p-5">
                <div className="flex items-center gap-3">
                  <div className="clay-icon h-11 w-11 rounded-[1.25rem]">
                    <BriefcaseBusiness className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="section-kicker">Ringkasan</p>
                    <p className="mt-1 text-sm leading-6 text-[var(--muted)] dark:text-[var(--muted)]">
                      {selectedExperience.type === "Internship"
                        ? "Program magang industri"
                        : selectedExperience.type === "Contract"
                          ? "Kontrak profesional"
                          : "Peran full-time"}
                    </p>
                  </div>
                </div>

                <div className="soft-divider my-4" />

                <p className="text-sm leading-7 text-[var(--muted)] dark:text-[var(--muted)]">
                  Detail ini memuat tanggung jawab inti, teknologi yang digunakan, dan dokumentasi
                  visual bila tersedia.
                </p>

                <div className="soft-divider my-4" />

                <p className="section-kicker">Teknologi</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedExperience.technologies.map((tech) => (
                    <span key={tech} className="clay-chip px-2.5 py-1 text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </aside>
            </div>

            {selectedExperience.images && selectedExperience.images.length > 0 && (
              <div className="mt-6">
                <p className="section-kicker">Dokumentasi</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {selectedExperience.images.slice(0, 2).map((image, index) => (
                    <div key={image} className="clay-inset relative aspect-[16/7] overflow-hidden">
                      <Image
                        src={image}
                        alt={`${selectedExperience.title} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </SectionShell>
  );
}
