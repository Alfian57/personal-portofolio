"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Trophy } from "lucide-react";
import { ARCANE_LORE } from "@/constants/lore-content";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { Modal } from "@/components/ui/Modal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Achievement } from "@/types/portfolio";

export function Achievements() {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  return (
    <section id="achievements" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <SectionHeading section="achievements" />

          <div className="grid gap-5 lg:grid-cols-3">
            {PORTFOLIO_DATA.achievements.map((achievement, index) => (
              <motion.button
                key={achievement.id}
                type="button"
                variants={fadeInUp}
                onClick={() => setSelectedAchievement(achievement)}
                className={`section-frame card-hover p-5 text-left sm:p-6 md:p-7 ${
                  index === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <div className="pointer-events-none absolute top-2 right-2 h-28 w-28 opacity-[0.2]">
                  <Image
                    src="/isekai/victory-banner.svg"
                    alt=""
                    width={112}
                    height={96}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-xl border border-[var(--status-gold-border)] bg-[var(--status-gold-bg)] p-3">
                    <Trophy className="h-6 w-6 text-[var(--gold-bright)]" />
                  </div>
                  <p className="text-xs font-bold tracking-[0.16em] text-[var(--mana)] uppercase">
                    Pencapaian 0{index + 1}
                  </p>
                </div>

                <h3 className="display-font mt-6 text-3xl text-[var(--foreground)]">
                  {achievement.title}
                </h3>
                <p className="mt-3 text-base text-[var(--gold-bright)]">{achievement.issuer}</p>
                <p className="mt-2 text-sm tracking-[0.16em] text-[var(--mana)] uppercase">
                  {achievement.date}
                </p>

                <p className="mt-5 text-sm leading-8 text-[var(--muted)]">
                  {achievement.description}
                </p>

                {achievement.tags && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {achievement.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="arcane-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      <Modal isOpen={!!selectedAchievement} onClose={() => setSelectedAchievement(null)}>
        {selectedAchievement && (
          <div className="p-6 md:p-8">
            <div className="pointer-events-none absolute top-10 right-10 hidden h-36 w-36 opacity-[0.18] md:block">
              <Image
                src="/isekai/victory-banner.svg"
                alt=""
                width={144}
                height={124}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-xl border border-[var(--status-gold-border)] bg-[var(--status-gold-bg)] p-3">
                <Trophy className="h-6 w-6 text-[var(--gold-bright)]" />
              </div>
              <div className="flex-1">
                <p className="section-kicker">{ARCANE_LORE.achievements.modalTitle}</p>
                <h2 className="display-font mt-3 text-4xl text-[var(--foreground)]">
                  {selectedAchievement.title}
                </h2>
                <p className="mt-2 text-lg text-[var(--gold-bright)]">
                  {selectedAchievement.issuer}
                </p>
                <p className="mt-3 text-sm font-bold tracking-[0.16em] text-[var(--mana)] uppercase">
                  {selectedAchievement.date}
                </p>
              </div>
            </div>

            <div className="ornament-line my-7" />

            <div className="grid gap-7 lg:grid-cols-[1fr_0.8fr]">
              <div className="space-y-4 text-sm leading-8 text-[var(--muted)]">
                <p>{selectedAchievement.description}</p>
                {selectedAchievement.detailedDescription && (
                  <p>{selectedAchievement.detailedDescription}</p>
                )}
              </div>

              {selectedAchievement.tags && (
                <div className="parchment-surface p-5">
                  <p className="section-kicker">Bukti Teknis</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedAchievement.tags.map((tag) => (
                      <span key={tag} className="arcane-chip">
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
                      className="relative aspect-video overflow-hidden rounded-xl border border-[var(--image-border)]"
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
                  className="arcane-button"
                >
                  <ExternalLink className="h-4 w-4" />
                  {ARCANE_LORE.achievements.certificateCta}
                </a>
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}
