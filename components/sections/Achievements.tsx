"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Trophy } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { UI_COPY } from "@/constants/section-content";
import { Modal } from "@/components/ui/Modal";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Achievement } from "@/types/portfolio";

export function Achievements() {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const stats = [
    { label: "Karya dan studi kasus", value: PORTFOLIO_DATA.projects.length },
    { label: "Pengalaman profesional", value: PORTFOLIO_DATA.experiences.length },
    { label: "Catatan pencapaian", value: PORTFOLIO_DATA.achievements.length },
    { label: "Kredensial terverifikasi", value: PORTFOLIO_DATA.certifications.length },
  ];

  return (
    <SectionShell id="achievements" className="white-section">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className="proof-quote">
          <p>Catatan teknis</p>
          <blockquote>
            &quot;Sistem yang baik harus mudah dilacak, kontrak API-nya jelas, dan antarmukanya tidak
            membebani pengguna.&quot;
          </blockquote>
        </div>

        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.label}>
              <strong>{String(stat.value).padStart(2, "0")}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        <SectionHeading section="achievements" />

        <div className="grid gap-4 lg:grid-cols-3">
          {PORTFOLIO_DATA.achievements.map((achievement, index) => (
            <motion.button
              key={achievement.id}
              type="button"
              variants={fadeInUp}
              onClick={() => setSelectedAchievement(achievement)}
              className="editorial-card card-hover p-5 text-left"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="editorial-icon h-12 w-12 shrink-0 rounded-[1.4rem]">
                  <Trophy className="h-5 w-5" />
                </div>
                <p className="text-xs font-extrabold tracking-[0.14em] text-[var(--accent)] uppercase dark:text-[var(--accent)]">
                  Pencapaian 0{index + 1}
                </p>
              </div>

              <h3 className="display-font mt-4 line-clamp-2 text-2xl font-extrabold text-[var(--foreground)] dark:text-[var(--foreground)]">
                {achievement.title}
              </h3>
              <p className="mt-2 line-clamp-1 text-base font-bold text-[var(--accent)] dark:text-[var(--accent)]">
                {achievement.issuer}
              </p>
              <p className="mt-2 text-sm font-bold tracking-[0.14em] text-[var(--muted)] uppercase dark:text-[var(--muted)]">
                {achievement.date}
              </p>

              <p className="mt-4 line-clamp-3 text-sm leading-6 text-[var(--muted)] dark:text-[var(--muted)]">
                {achievement.description}
              </p>

              {achievement.tags && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {achievement.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="editorial-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <Modal isOpen={!!selectedAchievement} onClose={() => setSelectedAchievement(null)} size="lg">
        {selectedAchievement && (
          <div className="achievement-modal-content p-6 md:p-8">
            <div className="achievement-modal-header flex items-start gap-4">
              <div className="editorial-icon h-14 w-14 shrink-0">
                <Trophy className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="section-kicker">Detail Pencapaian</p>
                <h2 className="achievement-modal-title display-font mt-3 text-4xl font-extrabold text-[var(--foreground)] dark:text-[var(--foreground)]">
                  {selectedAchievement.title}
                </h2>
                <p className="mt-2 text-lg font-bold text-[var(--accent)] dark:text-[var(--accent)]">
                  {selectedAchievement.issuer}
                </p>
                <p className="mt-3 text-sm font-extrabold tracking-[0.14em] text-[var(--muted)] uppercase dark:text-[var(--muted)]">
                  {selectedAchievement.date}
                </p>
              </div>
            </div>

            <div className="soft-divider my-7" />

            <div className="grid gap-7 lg:grid-cols-[1fr_0.8fr]">
              <div className="space-y-4 text-sm leading-8 text-[var(--muted)] dark:text-[var(--muted)]">
                <p>{selectedAchievement.description}</p>
                {selectedAchievement.detailedDescription && (
                  <p>{selectedAchievement.detailedDescription}</p>
                )}
              </div>

              {selectedAchievement.tags && (
                <div className="editorial-inset p-5">
                  <p className="section-kicker">Bukti Teknis</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedAchievement.tags.map((tag) => (
                      <span key={tag} className="editorial-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {selectedAchievement.images && selectedAchievement.images.length > 0 && (
              <div className="mt-8">
                <p className="section-kicker">Dokumentasi</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {selectedAchievement.images.map((image, index) => (
                    <div
                      key={image}
                      className="editorial-inset relative aspect-video overflow-hidden"
                    >
                      <Image
                        src={image}
                        alt={`${selectedAchievement.title} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedAchievement.link && (
              <div className="mt-8">
                <a
                  href={selectedAchievement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-button editorial-button-primary"
                >
                  <ExternalLink className="h-4 w-4" />
                  {UI_COPY.certificateCta}
                </a>
              </div>
            )}
          </div>
        )}
      </Modal>
    </SectionShell>
  );
}
