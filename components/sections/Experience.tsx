"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CalendarRange, MapPin } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { Modal } from "@/components/ui/Modal";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Experience as ExperienceType } from "@/types/portfolio";

export function Experience() {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceType | null>(null);

  return (
    <SectionShell id="experience" className="white-section compact-section">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <SectionHeading section="experience" align="center" />

        <div className="experience-list">
          {PORTFOLIO_DATA.experiences.map((experience, index) => (
            <motion.button
              key={experience.id}
              type="button"
              variants={fadeInUp}
              onClick={() => setSelectedExperience(experience)}
              className={`experience-row ${index === 0 ? "is-active" : ""}`}
            >
              <span className="experience-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="experience-main">
                <strong>{experience.title}</strong>
                <span>{experience.company}</span>
              </span>
              <span className="experience-meta">
                <span>{experience.period}</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <Modal isOpen={!!selectedExperience} onClose={() => setSelectedExperience(null)} size="lg">
        {selectedExperience && (
          <div className="modal-content">
            <p className="section-kicker">Detail Pengalaman</p>
            <h2 className="modal-title">{selectedExperience.title}</h2>
            <p className="modal-subtitle">{selectedExperience.company}</p>

            <div className="modal-meta-grid">
              <span>
                <CalendarRange className="h-4 w-4" />
                {selectedExperience.period}
              </span>
              <span>
                <MapPin className="h-4 w-4" />
                {selectedExperience.location}
              </span>
            </div>

            <ul className="detail-list">
              {selectedExperience.description.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="chip-row">
              {selectedExperience.technologies.map((tech) => (
                <span key={tech} className="editorial-chip">
                  {tech}
                </span>
              ))}
            </div>

            {selectedExperience.images && selectedExperience.images.length > 0 && (
              <div className="modal-image-grid">
                {selectedExperience.images.slice(0, 2).map((image, index) => (
                  <div key={image} className="modal-image">
                    <Image
                      src={image}
                      alt={`${selectedExperience.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    </SectionShell>
  );
}
