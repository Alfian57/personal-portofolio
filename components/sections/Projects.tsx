"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github, LockKeyhole } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { UI_COPY } from "@/constants/section-content";
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
  if (status === "Research") return "Riset";
  if (status === "Competition") return "Kompetisi";
  if (status === "Professional") return "Profesional";
  if (status === "Private/Internal") return "Internal";
  return "Terpilih";
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <SectionShell id="projects" className="white-section">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <SectionHeading section="projects" align="center" />

        <div className="case-study-list">
          {PORTFOLIO_DATA.projects.map((project, index) => (
            <motion.article
              key={project.id}
              variants={fadeInUp}
              className={`case-study ${index % 2 ? "is-reversed" : ""}`}
            >
              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                className="case-study-image"
              >
                <Image
                  src={project.image}
                  alt={`Preview ${project.title}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-contain"
                />
              </button>

              <div className="case-study-copy">
                <span>{getStatusLabel(project.status)}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="chip-row">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="editorial-chip">
                      {tech}
                    </span>
                  ))}
                </div>
                <button type="button" onClick={() => setSelectedProject(project)} className="text-action">
                  Lihat Detail
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>

      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} size="xl">
        {selectedProject && (
          <div className="modal-content">
            <p className="section-kicker">Detail Studi Kasus</p>
            <h2 className="modal-title">{selectedProject.title}</h2>
            {selectedProject.role && <p className="modal-subtitle">{selectedProject.role}</p>}
            <p className="modal-lead">{selectedProject.description}</p>
            {selectedProject.context && <p className="modal-note">{selectedProject.context}</p>}

            <div className="casebook-cover mt-6">
              <Image
                src={selectedProject.image}
                alt={`Ilustrasi editorial untuk ${selectedProject.title}`}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-contain"
              />
            </div>

            {selectedProject.images && selectedProject.images.length > 0 && (
              <div className="mt-6">
                <Carousel images={selectedProject.images} alt={selectedProject.title} />
              </div>
            )}

            <div className="modal-two-col">
              <div>
                <p className="section-kicker">Highlight Teknis</p>
                <ul className="detail-list">
                  {(selectedProject.highlights ?? []).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {selectedProject.outcome && (
                  <p className="modal-note">
                    <strong>Hasil:</strong> {selectedProject.outcome}
                  </p>
                )}
              </div>

              <aside className="modal-side">
                <p className="section-kicker">Stack & Kategori</p>
                <div className="chip-row">
                  {[...selectedProject.technologies, ...selectedProject.tags].map((item) => (
                    <span key={item} className="editorial-chip">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="modal-actions">
                  {isValidExternalUrl(selectedProject.link) && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button button-primary"
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
                      className="button button-secondary"
                    >
                      <Github className="h-4 w-4" />
                      {UI_COPY.codeCta}
                    </a>
                  )}
                  {!isValidExternalUrl(selectedProject.link) &&
                    !isValidExternalUrl(selectedProject.github) && (
                      <p className="private-note">
                        <LockKeyhole className="h-4 w-4" />
                        {UI_COPY.noPublicLink}
                      </p>
                    )}
                </div>
              </aside>
            </div>
          </div>
        )}
      </Modal>
    </SectionShell>
  );
}
