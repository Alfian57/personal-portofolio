"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Award, CalendarRange, ExternalLink } from "lucide-react";
import { ARCANE_LORE } from "@/constants/lore-content";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { Modal } from "@/components/ui/Modal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Certification } from "@/types/portfolio";

export function Certifications() {
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [selectedIssuer, setSelectedIssuer] = useState<string>(
    ARCANE_LORE.certifications.allFilter
  );
  const [showAll, setShowAll] = useState(false);

  const issuers = useMemo(() => {
    const allIssuers = new Set<string>();
    PORTFOLIO_DATA.certifications.forEach((certification) => {
      allIssuers.add(certification.issuer);
    });

    return [ARCANE_LORE.certifications.allFilter, ...Array.from(allIssuers).sort()];
  }, []);

  const filteredCertifications = useMemo(() => {
    if (selectedIssuer === ARCANE_LORE.certifications.allFilter) {
      return PORTFOLIO_DATA.certifications;
    }

    return PORTFOLIO_DATA.certifications.filter(
      (certification) => certification.issuer === selectedIssuer
    );
  }, [selectedIssuer]);

  const displayedCertifications = showAll
    ? filteredCertifications
    : filteredCertifications.slice(0, 6);
  const credentialLink = selectedCertification?.credentialUrl?.startsWith("http")
    ? selectedCertification.credentialUrl
    : undefined;

  return (
    <section id="certifications" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <SectionHeading section="certifications" />

          <motion.div
            variants={fadeInUp}
            className="hide-scrollbar mb-8 flex gap-2 overflow-x-auto pb-2"
          >
            {issuers.map((issuer) => {
              const isActive = selectedIssuer === issuer;

              return (
                <button
                  key={issuer}
                  type="button"
                  onClick={() => {
                    setShowAll(false);
                    setSelectedIssuer(issuer);
                  }}
                  aria-pressed={isActive}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-all ${
                    isActive
                      ? "border-[var(--filter-active-border)] bg-[var(--filter-active-bg)] text-[var(--foreground)]"
                      : "border-[var(--filter-idle-border)] bg-[var(--filter-idle-bg)] text-[var(--muted)] hover:border-[var(--filter-hover-border)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {issuer}
                </button>
              );
            })}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIssuer}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24 }}
              className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            >
              {displayedCertifications.map((certification, index) => (
                <motion.button
                  key={certification.id}
                  type="button"
                  onClick={() => setSelectedCertification(certification)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: index * 0.04 }}
                  className="section-frame card-hover overflow-hidden p-0 text-left"
                >
                  <div className="relative h-48 overflow-hidden bg-[var(--image-well)]">
                    {certification.image ? (
                      <Image
                        src={certification.image}
                        alt={certification.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-contain p-3"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center [background:var(--empty-visual-bg)]">
                        <Award className="h-12 w-12 text-[var(--gold-bright)]" />
                      </div>
                    )}
                    <div className="absolute inset-0 [background:var(--media-overlay-strong)]" />
                    <div className="absolute right-4 bottom-4 left-4">
                      <p className="text-xs font-bold tracking-[0.16em] text-[var(--mana)] uppercase">
                        Sertifikasi 0{index + 1}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <h3 className="display-font text-2xl text-[var(--foreground)]">
                      {certification.title}
                    </h3>
                    <p className="mt-2 text-base text-[var(--gold-bright)]">
                      {certification.issuer}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-sm text-[var(--muted)]">
                      <CalendarRange className="h-4 w-4 text-[var(--mana)]" />
                      <span>{certification.date}</span>
                    </div>

                    {certification.skills && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {certification.skills.slice(0, 3).map((skill) => (
                          <span key={skill} className="arcane-chip">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>

          {displayedCertifications.length === 0 && (
            <motion.div variants={fadeInUp} className="section-frame p-6 text-center md:p-8">
              <p className="section-kicker">Belum ada sertifikasi</p>
              <h3 className="display-font mt-3 text-2xl font-bold text-[var(--foreground)]">
                Tidak ada sertifikasi dari{" "}
                <span className="text-[var(--gold-bright)]">{selectedIssuer}</span>.
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--muted)]">
                Pilih penerbit lain atau kembali ke semua penerbit untuk melihat daftar sertifikasi
                yang tersedia.
              </p>
              <button
                type="button"
                onClick={() => {
                  setShowAll(false);
                  setSelectedIssuer(ARCANE_LORE.certifications.allFilter);
                }}
                className="ghost-button mt-5"
              >
                Tampilkan Semua
              </button>
            </motion.div>
          )}

          {filteredCertifications.length > 6 && (
            <motion.div variants={fadeInUp} className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setShowAll((value) => !value)}
                className="ghost-button"
              >
                {showAll
                  ? "Tampilkan Lebih Ringkas"
                  : `Tampilkan Sertifikasi Lainnya (${filteredCertifications.length - 6})`}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>

      <Modal isOpen={!!selectedCertification} onClose={() => setSelectedCertification(null)}>
        {selectedCertification && (
          <div className="p-6 md:p-8">
            {selectedCertification.image && (
              <div className="relative mb-7 h-64 overflow-hidden rounded-2xl border border-[var(--image-border)] bg-[var(--image-well)]">
                <Image
                  src={selectedCertification.image}
                  alt={selectedCertification.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-contain p-4"
                />
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className="rounded-xl border border-[var(--status-gold-border)] bg-[var(--status-gold-bg)] p-3">
                <Award className="h-6 w-6 text-[var(--gold-bright)]" />
              </div>
              <div className="flex-1">
                <p className="section-kicker">{ARCANE_LORE.certifications.modalTitle}</p>
                <h2 className="display-font mt-3 text-4xl text-[var(--foreground)]">
                  {selectedCertification.title}
                </h2>
                <p className="mt-2 text-lg text-[var(--gold-bright)]">
                  {selectedCertification.issuer}
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--muted)]">
                  <span className="inline-flex items-center gap-2">
                    <CalendarRange className="h-4 w-4 text-[var(--mana)]" />
                    Diterbitkan: {selectedCertification.date}
                  </span>
                  {selectedCertification.expiryDate && (
                    <span>Kedaluwarsa: {selectedCertification.expiryDate}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="ornament-line my-7" />

            <div className="grid gap-7 lg:grid-cols-[1fr_0.8fr]">
              <div className="space-y-5">
                <p className="text-sm leading-8 text-[var(--muted)]">
                  {selectedCertification.description}
                </p>

                {selectedCertification.credentialId && (
                  <div className="parchment-surface p-5">
                    <p className="section-kicker">ID Kredensial</p>
                    <p className="mt-3 font-mono text-sm break-all text-[var(--foreground)]">
                      {selectedCertification.credentialId}
                    </p>
                  </div>
                )}

                {!credentialLink && selectedCertification.credentialUrl && (
                  <div className="parchment-surface p-5">
                    <p className="section-kicker">Kode Kredensial</p>
                    <p className="mt-3 font-mono text-sm break-all text-[var(--foreground)]">
                      {selectedCertification.credentialUrl}
                    </p>
                  </div>
                )}
              </div>

              {selectedCertification.skills && selectedCertification.skills.length > 0 && (
                <div className="section-frame p-5">
                  <p className="section-kicker">Skill Terkait</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedCertification.skills.map((skill) => (
                      <span key={skill} className="arcane-chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {credentialLink && (
              <div className="mt-8">
                <a
                  href={credentialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arcane-button"
                >
                  <ExternalLink className="h-4 w-4" />
                  {ARCANE_LORE.certifications.credentialCta}
                </a>
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}
