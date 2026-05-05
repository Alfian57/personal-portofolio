"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, CalendarRange, ExternalLink, Layers3, Search } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { UI_COPY } from "@/constants/section-content";
import { Clay3DAsset } from "@/components/ui/Clay3DAsset";
import { Modal } from "@/components/ui/Modal";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Certification } from "@/types/portfolio";

const previewLimit = 8;

export function Certifications() {
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [showDirectory, setShowDirectory] = useState(false);
  const [directorySearch, setDirectorySearch] = useState("");
  const [selectedIssuer, setSelectedIssuer] = useState<string>(UI_COPY.allIssuers);

  const issuerStats = useMemo(() => {
    const counts = new Map<string, number>();

    PORTFOLIO_DATA.certifications.forEach((certification) => {
      counts.set(certification.issuer, (counts.get(certification.issuer) ?? 0) + 1);
    });

    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, []);

  const previewCertifications = PORTFOLIO_DATA.certifications.slice(0, previewLimit);
  const directoryCertifications = useMemo(() => {
    const search = directorySearch.trim().toLowerCase();

    return PORTFOLIO_DATA.certifications.filter((certification) => {
      const matchesIssuer =
        selectedIssuer === UI_COPY.allIssuers || certification.issuer === selectedIssuer;
      const searchableText = [
        certification.title,
        certification.issuer,
        certification.date,
        certification.description,
        ...(certification.skills ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return matchesIssuer && (!search || searchableText.includes(search));
    });
  }, [directorySearch, selectedIssuer]);

  const hiddenCount = Math.max(
    PORTFOLIO_DATA.certifications.length - previewCertifications.length,
    0
  );
  const credentialLink = selectedCertification?.credentialUrl?.startsWith("http")
    ? selectedCertification.credentialUrl
    : undefined;

  return (
    <SectionShell
      id="certifications"
      asset={
        <Clay3DAsset
          variant="badge"
          delay="long"
          className="top-[13%] right-4 hidden h-28 w-28 opacity-70 xl:block 2xl:right-[calc((100vw_-_80rem)/2_-_2rem)]"
        />
      }
    >
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <SectionHeading section="certifications" />

        <div className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
          <motion.aside variants={fadeInUp} className="clay-card p-4 sm:p-5">
            <div className="flex items-start gap-4">
              <div className="clay-icon h-12 w-12 shrink-0 rounded-[1.4rem]">
                <Layers3 className="h-6 w-6" />
              </div>
              <div>
                <p className="section-kicker">Ringkasan Kredensial</p>
                <p className="display-font mt-2 text-5xl font-extrabold text-[var(--foreground)] dark:text-[var(--foreground)]">
                  {PORTFOLIO_DATA.certifications.length}
                </p>
              </div>
            </div>

            <p className="mt-3 text-sm leading-6 text-[var(--muted)] dark:text-[var(--muted)]">
              Sertifikasi disusun sebagai ringkasan agar section tetap satu layar. Daftar lengkap
              dan gambar sertifikat tersedia melalui detail.
            </p>

            <div className="soft-divider my-4" />

            <div className="grid gap-2">
              {issuerStats.slice(0, 5).map(([issuer, count]) => (
                <div
                  key={issuer}
                  className="clay-inset flex items-center justify-between gap-3 px-3 py-2"
                >
                  <span className="truncate text-sm font-bold text-[var(--foreground)] dark:text-[var(--foreground)]">
                    {issuer}
                  </span>
                  <span className="clay-chip shrink-0 px-2.5 py-1 text-xs">{count}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowDirectory(true)}
              className="clay-button clay-button-primary mt-4 w-full"
            >
              Lihat Semua Sertifikasi
            </button>
          </motion.aside>

          <motion.div variants={fadeInUp} className="grid content-start gap-2.5 sm:grid-cols-2">
            {previewCertifications.map((certification, index) => (
              <button
                key={certification.id}
                type="button"
                onClick={() => setSelectedCertification(certification)}
                className="clay-card card-hover flex items-center gap-3 p-3 text-left"
              >
                <div className="clay-icon h-11 w-11 shrink-0 rounded-[1.15rem]">
                  <Award className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="display-font line-clamp-2 text-sm leading-tight font-extrabold text-[var(--foreground)] dark:text-[var(--foreground)]">
                      {certification.title}
                    </h3>
                    <span className="text-[0.68rem] font-extrabold tracking-[0.12em] text-[var(--accent)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-xs font-bold text-[var(--accent)] dark:text-[var(--accent)]">
                    {certification.issuer}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2 text-xs text-[var(--muted)] dark:text-[var(--muted)]">
                    <CalendarRange className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />
                    <span>{certification.date}</span>
                  </div>
                </div>
              </button>
            ))}

            {hiddenCount > 0 && (
              <button
                type="button"
                onClick={() => setShowDirectory(true)}
                className="clay-card card-hover flex items-center justify-center p-4 text-center sm:col-span-2"
              >
                <span className="text-sm font-extrabold text-[var(--accent)] dark:text-[var(--accent)]">
                  +{hiddenCount} sertifikasi lainnya
                </span>
              </button>
            )}
          </motion.div>
        </div>
      </motion.div>

      <Modal isOpen={showDirectory} onClose={() => setShowDirectory(false)} size="xl">
        <div className="p-6 md:p-8">
          <p className="section-kicker">Direktori Sertifikasi</p>
          <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="display-font text-3xl font-extrabold text-[var(--foreground)] md:text-4xl dark:text-[var(--foreground)]">
                Semua Sertifikasi
              </h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)] dark:text-[var(--muted)]">
                {directoryCertifications.length} dari {PORTFOLIO_DATA.certifications.length}{" "}
                kredensial ditampilkan.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setDirectorySearch("");
                setSelectedIssuer(UI_COPY.allIssuers);
              }}
              className="clay-button clay-button-secondary w-fit"
            >
              Reset Filter
            </button>
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.45fr)]">
            <label className="clay-inset flex items-center gap-3 px-4 py-3">
              <Search className="h-4 w-4 shrink-0 text-[var(--accent)]" />
              <span className="sr-only">Cari sertifikasi</span>
              <input
                value={directorySearch}
                onChange={(event) => setDirectorySearch(event.target.value)}
                placeholder="Cari judul, penerbit, skill..."
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] dark:text-[var(--foreground)]"
              />
            </label>

            <select
              value={selectedIssuer}
              onChange={(event) => setSelectedIssuer(event.target.value)}
              className="clay-inset min-h-12 w-full px-4 py-3 text-sm font-bold text-[var(--foreground)] outline-none dark:text-[var(--foreground)]"
              aria-label="Filter penerbit sertifikasi"
            >
              <option>{UI_COPY.allIssuers}</option>
              {issuerStats.map(([issuer]) => (
                <option key={issuer}>{issuer}</option>
              ))}
            </select>
          </div>

          <div className="mt-6 grid gap-2.5 md:grid-cols-2">
            {directoryCertifications.length > 0 ? (
              directoryCertifications.map((certification, index) => (
                <button
                  key={certification.id}
                  type="button"
                  onClick={() => {
                    setShowDirectory(false);
                    setSelectedCertification(certification);
                  }}
                  className="clay-inset flex items-center gap-3 p-3 text-left transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div className="clay-icon h-11 w-11 shrink-0 rounded-[1.15rem]">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <p className="line-clamp-2 font-bold text-[var(--foreground)] dark:text-[var(--foreground)]">
                        {certification.title}
                      </p>
                      <span className="text-xs font-extrabold tracking-[0.12em] text-[var(--accent)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-sm text-[var(--muted)] dark:text-[var(--muted)]">
                      {certification.issuer} / {certification.date}
                    </p>
                  </div>
                </button>
              ))
            ) : (
              <div className="clay-inset p-5 text-center md:col-span-2">
                <p className="font-extrabold text-[var(--foreground)] dark:text-[var(--foreground)]">
                  Tidak ada sertifikasi yang cocok.
                </p>
                <p className="mt-2 text-sm text-[var(--muted)] dark:text-[var(--muted)]">
                  Ubah kata kunci atau pilih semua penerbit.
                </p>
              </div>
            )}
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={!!selectedCertification}
        onClose={() => setSelectedCertification(null)}
        size="lg"
      >
        {selectedCertification && (
          <div className="p-6 md:p-8">
            {selectedCertification.image && (
              <div className="clay-inset relative mb-7 h-64 overflow-hidden">
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
              <div className="clay-icon h-14 w-14 shrink-0">
                <Award className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="section-kicker">Detail Sertifikasi</p>
                <h2 className="display-font mt-3 text-4xl font-extrabold text-[var(--foreground)] dark:text-[var(--foreground)]">
                  {selectedCertification.title}
                </h2>
                <p className="mt-2 text-lg font-bold text-[var(--accent)] dark:text-[var(--accent)]">
                  {selectedCertification.issuer}
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--muted)] dark:text-[var(--muted)]">
                  <span className="inline-flex items-center gap-2">
                    <CalendarRange className="h-4 w-4 text-[var(--accent)]" />
                    Diterbitkan: {selectedCertification.date}
                  </span>
                  {selectedCertification.expiryDate && (
                    <span>Kedaluwarsa: {selectedCertification.expiryDate}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="soft-divider my-7" />

            <div className="grid gap-7 lg:grid-cols-[1fr_0.8fr]">
              <div className="space-y-5">
                <p className="text-sm leading-8 text-[var(--muted)] dark:text-[var(--muted)]">
                  {selectedCertification.description}
                </p>

                {selectedCertification.credentialId && (
                  <div className="clay-inset p-5">
                    <p className="section-kicker">ID Kredensial</p>
                    <p className="mt-3 font-mono text-sm break-all text-[var(--foreground)] dark:text-[var(--foreground)]">
                      {selectedCertification.credentialId}
                    </p>
                  </div>
                )}

                {!credentialLink && selectedCertification.credentialUrl && (
                  <div className="clay-inset p-5">
                    <p className="section-kicker">Kode Kredensial</p>
                    <p className="mt-3 font-mono text-sm break-all text-[var(--foreground)] dark:text-[var(--foreground)]">
                      {selectedCertification.credentialUrl}
                    </p>
                  </div>
                )}
              </div>

              {selectedCertification.skills && selectedCertification.skills.length > 0 && (
                <div className="clay-card p-5">
                  <p className="section-kicker">Skill Terkait</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedCertification.skills.map((skill) => (
                      <span key={skill} className="clay-chip">
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
                  className="clay-button clay-button-primary"
                >
                  <ExternalLink className="h-4 w-4" />
                  {UI_COPY.credentialCta}
                </a>
              </div>
            )}
          </div>
        )}
      </Modal>
    </SectionShell>
  );
}
