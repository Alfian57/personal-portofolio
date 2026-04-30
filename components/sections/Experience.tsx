"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BriefcaseBusiness, CalendarRange, ChevronRight, MapPin } from "lucide-react";
import { ARCANE_LORE } from "@/constants/lore-content";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { Modal } from "@/components/ui/Modal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Experience as ExperienceType } from "@/types/portfolio";

function getTypeStyles(type: ExperienceType["type"]) {
  if (type === "Contract") {
    return "border-[var(--status-mana-border)] bg-[var(--status-mana-bg)] text-[var(--mana)]";
  }

  if (type === "Internship") {
    return "border-[var(--status-gold-border)] bg-[var(--status-gold-bg)] text-[var(--gold-bright)]";
  }

  return "border-[var(--status-ember-border)] bg-[var(--status-ember-bg)] text-[var(--ember)]";
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
    <section id="experience" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <SectionHeading section="experience" description={ARCANE_LORE.experience.sectionNote} />

          <div className="relative">
            <div className="absolute top-6 bottom-0 left-4 hidden w-px [background:var(--timeline-line)] lg:block" />

            <div className="space-y-6">
              {PORTFOLIO_DATA.experiences.map((experience, index) => (
                <motion.article
                  key={experience.id}
                  variants={fadeInUp}
                  className="relative lg:pl-14"
                >
                  <div className="absolute top-10 left-0 hidden lg:flex lg:h-8 lg:w-8 lg:items-center lg:justify-center lg:rounded-full lg:border lg:border-[var(--status-gold-border)] lg:bg-[var(--status-gold-bg)]">
                    <div className="rune-dot" />
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedExperience(experience)}
                    className="section-frame card-hover w-full p-5 text-left sm:p-6 md:p-7"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="max-w-3xl">
                        <p className="text-xs font-bold tracking-[0.16em] text-[var(--mana)] uppercase">
                          Pengalaman 0{index + 1}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-3">
                          <h3 className="display-font text-3xl text-[var(--foreground)]">
                            {experience.title}
                          </h3>
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-bold tracking-[0.14em] uppercase ${getTypeStyles(experience.type)}`}
                          >
                            {getTypeLabel(experience.type)}
                          </span>
                        </div>
                        <p className="mt-3 text-lg text-[var(--gold-bright)]">
                          {experience.company}
                        </p>
                      </div>

                      <div className="space-y-2 text-sm text-[var(--muted)]">
                        <div className="flex items-center gap-2">
                          <CalendarRange className="h-4 w-4 text-[var(--mana)]" />
                          <span>{experience.period}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[var(--mana)]" />
                          <span>{experience.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                      <ul className="space-y-3">
                        {experience.description.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-sm leading-7 text-[var(--muted)]"
                          >
                            <span className="rune-dot mt-2 h-2.5 w-2.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center justify-between gap-5 lg:flex-col lg:items-end">
                        <div className="flex flex-wrap gap-2 lg:justify-end">
                          {experience.technologies.map((tech) => (
                            <span key={tech} className="arcane-chip">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--gold-bright)]">
                          Lihat detail
                          <ChevronRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </button>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <Modal isOpen={!!selectedExperience} onClose={() => setSelectedExperience(null)}>
        {selectedExperience && (
          <div className="p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="rounded-xl border border-[var(--status-gold-border)] bg-[var(--status-gold-bg)] p-3">
                <BriefcaseBusiness className="h-6 w-6 text-[var(--gold-bright)]" />
              </div>
              <div className="flex-1">
                <p className="section-kicker">{ARCANE_LORE.experience.modalTitle}</p>
                <h2 className="display-font mt-3 text-4xl text-[var(--foreground)]">
                  {selectedExperience.title}
                </h2>
                <p className="mt-2 text-lg text-[var(--gold-bright)]">
                  {selectedExperience.company}
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--muted)]">
                  <span className="inline-flex items-center gap-2">
                    <CalendarRange className="h-4 w-4 text-[var(--mana)]" />
                    {selectedExperience.period}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[var(--mana)]" />
                    {selectedExperience.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="ornament-line my-7" />

            <div className="grid gap-7 lg:grid-cols-[1fr_0.75fr]">
              <div>
                <p className="section-kicker">Tanggung Jawab Utama</p>
                <ul className="mt-4 space-y-3">
                  {selectedExperience.description.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-7 text-[var(--muted)]">
                      <span className="rune-dot mt-2 h-2.5 w-2.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="parchment-surface p-5">
                <p className="section-kicker">Teknologi</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedExperience.technologies.map((tech) => (
                    <span key={tech} className="arcane-chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {selectedExperience.images && selectedExperience.images.length > 0 && (
              <div className="mt-8">
                <p className="section-kicker">Dokumentasi</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {selectedExperience.images.map((image, index) => (
                    <div
                      key={image}
                      className="relative aspect-video overflow-hidden rounded-xl border border-[var(--image-border)]"
                    >
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
    </section>
  );
}
