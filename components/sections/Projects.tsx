"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  BrainCircuit,
  ChevronRight,
  ExternalLink,
  Github,
  GraduationCap,
  LockKeyhole,
  PanelsTopLeft,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { UI_COPY } from "@/constants/section-content";
import { Clay3DAsset } from "@/components/ui/Clay3DAsset";
import { Modal } from "@/components/ui/Modal";
import { Carousel } from "@/components/ui/Carousel";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Project } from "@/types/portfolio";

function isValidExternalUrl(url?: string) {
  return Boolean(url && url.startsWith("http"));
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

function getProjectIconKind(project: Project) {
  const content = `${project.title} ${project.tags.join(" ")} ${project.technologies.join(" ")}`;

  if (/edukasi|pancasila|student|quiz/i.test(content)) {
    return "education";
  }

  if (/ai|deep|vision|riset|pkm/i.test(content)) {
    return "ai";
  }

  return "web";
}

type ProjectFilterOption = {
  label: string;
  count: number;
  matches: (project: Project) => boolean;
};

function ProjectVisual({ project }: { project: Project }) {
  const iconKind = getProjectIconKind(project);

  return (
    <div className="clay-icon h-16 w-16 shrink-0 rounded-[1.5rem]">
      <div className="flex h-full w-full items-center justify-center">
        {iconKind === "education" && <GraduationCap className="h-7 w-7" />}
        {iconKind === "ai" && <BrainCircuit className="h-7 w-7" />}
        {iconKind === "web" && <PanelsTopLeft className="h-7 w-7" />}
      </div>
    </div>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>(UI_COPY.all);

  const filterOptions = useMemo<ProjectFilterOption[]>(() => {
    const definitions = new Map<string, (project: Project) => boolean>();

    const addFilter = (label: string, matches: (project: Project) => boolean) => {
      if (!label || definitions.has(label)) {
        return;
      }

      definitions.set(label, matches);
    };

    addFilter(UI_COPY.all, () => true);

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
      .filter((option) => option.label === UI_COPY.all || option.count > 0);
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
    <SectionShell
      id="projects"
      asset={
        <Clay3DAsset
          variant="workspace"
          delay="long"
          className="right-4 bottom-[7%] hidden h-32 w-32 opacity-70 xl:block 2xl:right-[calc((100vw_-_80rem)/2_-_2.5rem)]"
        />
      }
    >
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <SectionHeading section="projects" />

        <motion.div
          variants={fadeInUp}
          className="hide-scrollbar mb-5 flex gap-2 overflow-x-auto pb-2"
        >
          {filterOptions.map((option) => {
            const isActive = selectedFilter === option.label;

            return (
              <button
                key={option.label}
                type="button"
                onClick={() => setSelectedFilter(option.label)}
                aria-pressed={isActive}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? "nav-pill-active"
                    : "bg-[var(--surface)] text-[var(--muted)] shadow-[var(--clay-shadow-small)] hover:text-[var(--foreground)] dark:bg-[var(--surface)] dark:text-[var(--muted)]"
                }`}
              >
                <span>{option.label}</span>
                <span className="rounded-full bg-white/35 px-2 py-0.5 text-[0.68rem] leading-none dark:bg-slate-950/20">
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
              className="grid gap-4 lg:grid-cols-2"
            >
              {displayedProjects.map((project, index) => (
                <motion.button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.24, delay: Math.min(index * 0.04, 0.12) }}
                  className="clay-card card-hover p-5 text-left md:p-6"
                >
                  <div className="flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <ProjectVisual project={project} />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-extrabold tracking-[0.14em] text-[var(--accent)] uppercase dark:text-[var(--accent)]">
                          Studi Kasus 0{index + 1}
                        </p>
                        <h3 className="display-font mt-2 line-clamp-2 text-2xl leading-tight font-extrabold text-[var(--foreground)] dark:text-[var(--foreground)]">
                          {project.title}
                        </h3>
                      </div>
                      <span className="clay-chip shrink-0 text-[var(--accent)] dark:text-[var(--accent)]">
                        {getStatusLabel(project.status)}
                      </span>
                    </div>

                    {project.role && (
                      <p className="mt-4 text-sm font-bold text-[var(--accent)] dark:text-[var(--accent)]">
                        {project.role}
                      </p>
                    )}

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--muted)] dark:text-[var(--muted)]">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="clay-chip">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-4">
                      <span className="inline-flex items-center gap-2 text-sm font-extrabold text-[var(--accent)] dark:text-[var(--accent)]">
                        Lihat studi kasus
                        <ChevronRight className="h-4 w-4" />
                      </span>
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
              className="clay-card p-6 text-center md:p-8"
            >
              <p className="section-kicker">Belum ada karya</p>
              <h3 className="display-font mt-3 text-2xl font-extrabold text-[var(--foreground)] dark:text-[var(--foreground)]">
                Tidak ada karya untuk filter{" "}
                <span className="text-[var(--accent)]">{selectedFilter}</span>.
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--muted)] dark:text-[var(--muted)]">
                Pilih kategori lain atau kembali ke semua karya untuk melihat seluruh studi kasus
                yang tersedia.
              </p>
              <button
                type="button"
                onClick={() => setSelectedFilter(UI_COPY.all)}
                className="clay-button clay-button-secondary mt-5"
              >
                Tampilkan Semua
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} size="xl">
        {selectedProject && (
          <div className="p-5 sm:p-6 md:p-8">
            <p className="section-kicker">Detail Studi Kasus</p>
            <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="display-font text-3xl leading-tight font-extrabold text-[var(--foreground)] md:text-4xl dark:text-[var(--foreground)]">
                  {selectedProject.title}
                </h2>
                {selectedProject.role && (
                  <p className="mt-3 text-base font-bold text-[var(--accent)] dark:text-[var(--accent)]">
                    {selectedProject.role}
                  </p>
                )}
              </div>
              <span className="clay-chip w-fit text-[var(--accent)] dark:text-[var(--accent)]">
                <BadgeCheck className="h-4 w-4" />
                {getStatusLabel(selectedProject.status)}
              </span>
            </div>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)] sm:text-base dark:text-[var(--muted)]">
              {selectedProject.description}
            </p>

            {selectedProject.context && (
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted-strong)] dark:text-[var(--muted-strong)]">
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
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-7 text-[var(--muted)] dark:text-[var(--muted)]"
                    >
                      <span className="status-dot mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {selectedProject.outcome && (
                  <div className="clay-inset mt-6 p-5">
                    <p className="section-kicker">Hasil</p>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)] dark:text-[var(--muted)]">
                      {selectedProject.outcome}
                    </p>
                  </div>
                )}
              </div>

              <aside className="clay-card p-5">
                <p className="section-kicker">Stack & Kategori</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span key={tech} className="clay-chip">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="soft-divider my-5" />

                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="clay-chip">
                      {tag}
                    </span>
                  ))}
                </div>

                {(isValidExternalUrl(selectedProject.link) ||
                  isValidExternalUrl(selectedProject.github)) && (
                  <>
                    <div className="soft-divider my-5" />
                    <div className="grid gap-3">
                      {isValidExternalUrl(selectedProject.link) && (
                        <a
                          href={selectedProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="clay-button clay-button-primary"
                        >
                          <ExternalLink className="h-4 w-4" />
                          {UI_COPY.liveCta}
                        </a>
                      )}
                      {isValidExternalUrl(selectedProject.github) && (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="clay-button clay-button-secondary"
                        >
                          <Github className="h-4 w-4" />
                          {UI_COPY.codeCta}
                        </a>
                      )}
                    </div>
                  </>
                )}

                {!isValidExternalUrl(selectedProject.link) &&
                  !isValidExternalUrl(selectedProject.github) && (
                    <div className="clay-inset mt-5 flex gap-3 p-4">
                      <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)] dark:text-[var(--accent)]" />
                      <p className="text-sm leading-6 text-[var(--muted)] dark:text-[var(--muted)]">
                        {UI_COPY.noPublicLink}
                      </p>
                    </div>
                  )}
              </aside>
            </div>
          </div>
        )}
      </Modal>
    </SectionShell>
  );
}
