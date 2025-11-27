"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useState, useMemo } from "react";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Modal } from "@/components/ui/Modal";
import { Carousel } from "@/components/ui/Carousel";
import { Project } from "@/types/portfolio";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [showAll, setShowAll] = useState(false);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    PORTFOLIO_DATA.projects.forEach((project) => {
      project.tags.forEach((tag) => tags.add(tag));
    });
    return ["All", ...Array.from(tags).sort()];
  }, []);

  // Filter projects by selected tag
  const filteredProjects = useMemo(() => {
    if (selectedTag === "All") {
      return PORTFOLIO_DATA.projects;
    }
    return PORTFOLIO_DATA.projects.filter((project) =>
      project.tags.includes(selectedTag)
    );
  }, [selectedTag]);

  // Show only first 6 or all
  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 6);

  return (
    <section id="projects" className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-12">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">Featured Projects</h2>
            <p className="text-lg text-gray-400">
              A collection of my recent work and side projects
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTag(tag);
                    setShowAll(false);
                  }}
                  className={`rounded-lg px-4 py-2 font-medium transition-all ${
                    selectedTag === tag
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTag}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gray-800 shadow-lg transition-all hover:shadow-2xl"
              >
                <div className="p-8">
                  <div className="mb-4 text-6xl">{project.image}</div>
                  <h3 className="mb-3 text-2xl font-bold transition-colors group-hover:text-blue-500">
                    {project.title}
                  </h3>
                  <p className="mb-4 line-clamp-3 text-gray-400">{project.description}</p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-gray-700 px-3 py-1 text-sm text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs text-blue-400">
                    {project.tags.map((tag) => (
                      <span key={tag}>#{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
            </motion.div>
          </AnimatePresence>

          {/* See More/Less Button */}
          {filteredProjects.length > 6 && (
            <motion.div variants={fadeInUp} className="mt-8 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="rounded-lg bg-blue-500 px-8 py-3 font-semibold text-white transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/50"
              >
                {showAll ? "Show Less" : `See More (${filteredProjects.length - 6} more)`}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
          <div className="p-8">
            {/* Project Images Carousel */}
            {selectedProject.images && selectedProject.images.length > 0 && (
              <div className="mb-6">
                <Carousel images={selectedProject.images} alt={selectedProject.title} />
              </div>
            )}

            {/* Project Icon */}
            {(!selectedProject.images || selectedProject.images.length === 0) && (
              <div className="mb-6 text-8xl text-center">{selectedProject.image}</div>
            )}

            {/* Project Info */}
            <div className="mb-6">
              <h2 className="mb-3 text-3xl font-bold text-white">{selectedProject.title}</h2>
              <p className="leading-relaxed text-gray-300">{selectedProject.description}</p>
            </div>

            {/* Technologies */}
            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold text-white">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold text-white">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-gray-700 px-3 py-1 text-sm text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-600"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              )}
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-gray-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-600"
                >
                  <Github className="h-4 w-4" />
                  View Code
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
