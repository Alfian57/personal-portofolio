"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Modal } from "@/components/ui/Modal";
import { Experience as ExperienceType } from "@/types/portfolio";

export function Experience() {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceType | null>(null);

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "Magang":
        return "bg-purple-900/30 text-purple-400";
      case "Kontrak":
        return "bg-green-900/30 text-green-400";
      case "Full-time":
        return "bg-blue-900/30 text-blue-400";
      default:
        return "bg-gray-900/30 text-gray-400";
    }
  };

  return (
    <section id="experience" className="bg-gray-900/50 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-12 flex items-center gap-3">
            <Briefcase className="h-8 w-8 text-blue-500" />
            <h2 className="text-4xl font-bold md:text-5xl">Experience</h2>
          </motion.div>

          <div className="space-y-8">
            {PORTFOLIO_DATA.experiences.map((exp) => (
              <motion.div
                key={exp.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedExperience(exp)}
                className="group cursor-pointer rounded-2xl bg-gray-800 p-8 shadow-lg transition-shadow hover:shadow-xl"
              >
                <div className="mb-4 flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-blue-500">
                        {exp.title}
                      </h3>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getTypeBadgeColor(
                          exp.type
                        )}`}
                      >
                        {exp.type}
                      </span>
                    </div>
                    <p className="mb-2 text-xl font-semibold text-blue-400">{exp.company}</p>
                  </div>
                  <div className="mt-2 flex flex-col gap-2 md:mt-0 md:items-end">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span>{exp.location}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-blue-500" />
                  </div>
                </div>

                <ul className="mb-4 space-y-2">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-400">
                      <span className="text-blue-500">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-blue-900/20 px-3 py-1 text-sm text-blue-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Experience Detail Modal */}
      <Modal isOpen={!!selectedExperience} onClose={() => setSelectedExperience(null)}>
        {selectedExperience && (
          <div className="p-8">
            {/* Header */}
            <div className="mb-6 flex items-start gap-4">
              <div className="rounded-xl bg-blue-500 p-4">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-3">
                  <h2 className="text-3xl font-bold text-white">{selectedExperience.title}</h2>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${getTypeBadgeColor(
                      selectedExperience.type
                    )}`}
                  >
                    {selectedExperience.type}
                  </span>
                </div>
                <p className="mb-2 text-xl font-semibold text-blue-400">
                  {selectedExperience.company}
                </p>
                <div className="flex flex-col gap-1 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{selectedExperience.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedExperience.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold text-white">Responsibilities</h3>
              <ul className="space-y-2">
                {selectedExperience.description.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-300">
                    <span className="text-blue-500">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold text-white">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {selectedExperience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Image Gallery */}
            {selectedExperience.images && selectedExperience.images.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold text-white">Images</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {selectedExperience.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-video overflow-hidden rounded-lg bg-gray-700"
                    >
                      <Image
                        src={image}
                        alt={`${selectedExperience.title} - Certificate ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110"
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
