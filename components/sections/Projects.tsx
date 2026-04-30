"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, ChevronRight, ExternalLink, Github, LockKeyhole } from "lucide-react";
import { ARCANE_LORE } from "@/constants/lore-content";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { Modal } from "@/components/ui/Modal";
import { Carousel } from "@/components/ui/Carousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Project } from "@/types/portfolio";

function isValidExternalUrl(url?: string) {
  return Boolean(url && url.startsWith("http"));
}

function shouldContainImage(src: string) {
  return src.includes("Cert") || src.includes("certificate") || src.includes("PKM-Cert");
}

function getStatusLabel(status: Project["status"]) {
  if (status === "Research") {
    return "Riset";
  }

  if (status === "Competition") {
    return "Kompetisi";
  }

  if (status === "Professional") {
    return "Profesional";
  }

  if (status === "Private/Internal") {
    return "Internal/Privat";
  }

  return "Terpilih";
}

type ProjectFilterOption = {
  label: string;
  count: number;
  matches: (project: Project) => boolean;
};

function ProjectMark({ project }: { project: Project }) {
  return (
    <Image src={project.image} alt="" width={42} height={42} className="h-10 w-10 object-contain" />
  );
}

function EvidencePreview({ project, priority = false }: { project: Project; priority?: boolean }) {
  const evidence = project.images?.[0];

  if (!evidence) {
    return (
      <div className="flex h-full items-center justify-center bg-[var(--image-well)]">
        <ProjectMark project={project} />
      </div>
    );
  }

  return (
    <Image
      src={evidence}
      alt={`Bukti visual ${project.title}`}
      fill
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
      className={shouldContainImage(evidence) ? "object-contain p-4" : "object-cover"}
    />
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>(ARCANE_LORE.projects.allFilter);

  const filterOptions = useMemo<ProjectFilterOption[]>(() => {
    const definitions = new Map<string, (project: Project) => boolean>();
    const allFilter = ARCANE_LORE.projects.allFilter;

    const addFilter = (label: string, matches: (project: Project) => boolean) => {
      if (!label || definitions.has(label)) {
        return;
      }

      definitions.set(label, matches);
    };

    addFilter(allFilter, () => true);

    PORTFOLIO_DATA.projects.forEach((project) => {
      project.tags.forEach((tag) => {
        addFilter(tag, (item) => item.tags.includes(tag));
      });

      const statusLabel = getStatusLabel(project.status);
      addFilter(statusLabel, (item) => getStatusLabel(item.status) === statusLabel);
    });

    return Array.from(definitions.entries())
      .map(([label, matches]) => ({
        label,
        matches,
        count: PORTFOLIO_DATA.projects.filter(matches).length,
      }))
      .filter((option) => option.label === allFilter || option.count > 0);
  }, []);

  const filteredProjects = useMemo(() => {
    const activeFilter =
      filterOptions.find((option) => option.label === selectedFilter) ?? filterOptions[0];

    return activeFilter
      ? PORTFOLIO_DATA.projects.filter(activeFilter.matches)
      : PORTFOLIO_DATA.projects;
  }, [filterOptions, selectedFilter]);

  const featuredProjects = filteredProjects.filter((project) => project.featured);
  const otherProjects = filteredProjects.filter((project) => !project.featured);
  const displayedProjects = [...featuredProjects, ...otherProjects];

  return (
    <section id="projects" className="section-padding">
      <div
        aria-hidden="true"
        className="isekai-board pointer-events-none absolute top-8 right-4 hidden h-56 w-56 opacity-[0.08] lg:block"
      />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <SectionHeading section="projects" />

          <motion.div
            variants={fadeInUp}
            className="hide-scrollbar mb-6 flex gap-2 overflow-x-auto pb-2"
          >
            {filterOptions.map((option) => {
              const isActive = selectedFilter === option.label;

              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setSelectedFilter(option.label)}
                  aria-pressed={isActive}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? "border-[var(--filter-active-border)] bg-[var(--filter-active-bg)] text-[var(--foreground)]"
                      : "border-[var(--filter-idle-border)] bg-[var(--filter-idle-bg)] text-[var(--muted)] hover:border-[var(--filter-hover-border)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <span>{option.label}</span>
                  <span className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-2 py-0.5 text-[0.68rem] leading-none text-[var(--muted-strong)]">
                    {option.count}
                  </span>
                </button>
              );
            })}
          </motion.div>

          <AnimatePresence mode="wait">
            {displayedProjects.length > 0 ? (
              <motion.div
                key={`grid-${selectedFilter}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="grid gap-4 lg:grid-cols-3"
              >
                {displayedProjects.map((project, index) => (
                  <motion.button
                    key={project.id}
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.24, delay: Math.min(index * 0.04, 0.12) }}
                    className={`section-frame card-hover overflow-hidden p-0 text-left ${
                      index === 0 ? "lg:col-span-2" : ""
                    }`}
                  >
                    <div
                      className={`grid h-full ${index === 0 ? "md:grid-cols-[0.9fr_1.1fr]" : ""}`}
                    >
                      <div className="relative min-h-[12rem] bg-[var(--image-well)]">
                        <EvidencePreview project={project} priority={index === 0} />
                        <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--badge-bg)] px-3 py-1.5 text-xs font-bold tracking-[0.14em] text-[var(--mana)] uppercase backdrop-blur-sm">
                          <ProjectMark project={project} />
                          {getStatusLabel(project.status)}
                        </div>
                      </div>

                      <div className="flex min-h-full flex-col p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-bold tracking-[0.16em] text-[var(--mana)] uppercase">
                              Studi Kasus 0{index + 1}
                            </p>
                            <h3 className="display-font mt-3 text-2xl leading-tight font-bold text-[var(--foreground)]">
                              {project.title}
                            </h3>
                          </div>
                          <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-[var(--gold-bright)]" />
                        </div>

                        {project.role && (
                          <p className="mt-3 text-sm font-semibold text-[var(--gold-bright)]">
                            {project.role}
                          </p>
                        )}

                        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                          {project.description}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span key={tech} className="arcane-chip">
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="mt-auto pt-5">
                          <span className="inline-flex items-center gap-2 text-sm font-bold text-[var(--gold-bright)]">
                            Lihat studi kasus
                            <ChevronRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={`empty-${selectedFilter}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="section-frame p-6 text-center md:p-8"
              >
                <p className="section-kicker">Belum ada karya</p>
                <h3 className="display-font mt-3 text-2xl font-bold text-[var(--foreground)]">
                  Tidak ada karya untuk filter{" "}
                  <span className="text-[var(--gold-bright)]">{selectedFilter}</span>.
                </h3>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--muted)]">
                  Pilih kategori lain atau kembali ke semua karya untuk melihat seluruh studi kasus
                  yang tersedia.
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedFilter(ARCANE_LORE.projects.allFilter)}
                  className="ghost-button mt-5"
                >
                  Tampilkan Semua
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
          <div className="p-5 sm:p-6 md:p-8">
            <p className="section-kicker">{ARCANE_LORE.projects.modalTitle}</p>
            <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="display-font text-3xl leading-tight font-bold text-[var(--foreground)] md:text-4xl">
                  {selectedProject.title}
                </h2>
                {selectedProject.role && (
                  <p className="mt-3 text-base font-semibold text-[var(--gold-bright)]">
                    {selectedProject.role}
                  </p>
                )}
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--status-mana-border)] bg-[var(--status-mana-bg)] px-3 py-2 text-xs font-bold tracking-[0.14em] text-[var(--mana)] uppercase">
                <BadgeCheck className="h-4 w-4" />
                {getStatusLabel(selectedProject.status)}
              </span>
            </div>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)] sm:text-base">
              {selectedProject.description}
            </p>

            {selectedProject.context && (
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted-strong)]">
                {selectedProject.context}
              </p>
            )}

            {selectedProject.images && selectedProject.images.length > 0 && (
              <div className="mt-6">
                <Carousel images={selectedProject.images} alt={selectedProject.title} />
              </div>
            )}

            <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_0.72fr]">
              <div>
                <p className="section-kicker">Highlight Teknis</p>
                <ul className="mt-4 space-y-3">
                  {(selectedProject.highlights ?? []).map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-7 text-[var(--muted)]">
                      <span className="rune-dot mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {selectedProject.outcome && (
                  <div className="mt-6 border-l border-[var(--filter-active-border)] pl-4">
                    <p className="section-kicker">Hasil</p>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                      {selectedProject.outcome}
                    </p>
                  </div>
                )}
              </div>

              <aside className="section-frame p-5">
                <p className="section-kicker">Stack & Kategori</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span key={tech} className="arcane-chip">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="ornament-line my-5" />

                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="arcane-chip">
                      {tag}
                    </span>
                  ))}
                </div>

                {(isValidExternalUrl(selectedProject.link) ||
                  isValidExternalUrl(selectedProject.github)) && (
                  <>
                    <div className="ornament-line my-5" />
                    <div className="grid gap-3">
                      {isValidExternalUrl(selectedProject.link) && (
                        <a
                          href={selectedProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="arcane-button"
                        >
                          <ExternalLink className="h-4 w-4" />
                          {ARCANE_LORE.projects.liveCta}
                        </a>
                      )}
                      {isValidExternalUrl(selectedProject.github) && (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ghost-button"
                        >
                          <Github className="h-4 w-4" />
                          {ARCANE_LORE.projects.codeCta}
                        </a>
                      )}
                    </div>
                  </>
                )}

                {!isValidExternalUrl(selectedProject.link) &&
                  !isValidExternalUrl(selectedProject.github) && (
                    <div className="mt-5 flex gap-3 rounded-xl border border-[var(--callout-border)] bg-[var(--callout-bg)] p-4">
                      <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-[var(--gold-bright)]" />
                      <p className="text-sm leading-6 text-[var(--muted)]">
                        Link publik tidak ditampilkan karena karya ini berbasis kompetisi, riset,
                        atau pekerjaan internal.
                      </p>
                    </div>
                  )}
              </aside>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
