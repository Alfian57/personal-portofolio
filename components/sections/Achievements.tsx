"use client";

import { motion } from "framer-motion";
import { Trophy, ExternalLink, ChevronRight } from "lucide-react";
import { useState } from "react";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Modal } from "@/components/ui/Modal";
import { Achievement } from "@/types/portfolio";
import Image from "next/image";

export function Achievements() {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  return (
    <section id="achievements" className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-12 flex items-center gap-3">
            <Trophy className="h-8 w-8 text-blue-500" />
            <h2 className="text-4xl font-bold md:text-5xl">Achievements</h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {PORTFOLIO_DATA.achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedAchievement(achievement)}
                className="group cursor-pointer rounded-2xl bg-linear-to-br from-gray-800 to-gray-800 p-6 shadow-lg transition-all hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-blue-500 p-3 transition-transform group-hover:scale-110">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="mb-1 text-xl font-bold text-white transition-colors group-hover:text-blue-500">
                        {achievement.title}
                      </h3>
                      <ChevronRight className="h-5 w-5 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-blue-500" />
                    </div>
                    <p className="mb-2 font-semibold text-blue-400">{achievement.issuer}</p>
                    <p className="mb-2 text-sm text-gray-400">{achievement.date}</p>
                    <p className="line-clamp-2 text-gray-300">{achievement.description}</p>
                    {achievement.tags && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {achievement.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-blue-900/30 px-2 py-1 text-xs text-blue-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Achievement Detail Modal */}
      <Modal isOpen={!!selectedAchievement} onClose={() => setSelectedAchievement(null)}>
        {selectedAchievement && (
          <div className="p-8">
            {/* Header */}
            <div className="mb-6 flex items-start gap-4">
              <div className="rounded-xl bg-blue-500 p-4">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="mb-2 text-3xl font-bold text-white">{selectedAchievement.title}</h2>
                <p className="mb-1 text-xl font-semibold text-blue-400">
                  {selectedAchievement.issuer}
                </p>
                <p className="text-gray-400">{selectedAchievement.date}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="mb-4 leading-relaxed text-gray-300">
                {selectedAchievement.description}
              </p>
              {selectedAchievement.detailedDescription && (
                <p className="leading-relaxed text-gray-400">
                  {selectedAchievement.detailedDescription}
                </p>
              )}
            </div>

            {/* Tags */}
            {selectedAchievement.tags && (
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold text-white">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAchievement.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Image Gallery */}
            {selectedAchievement.images && selectedAchievement.images.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold text-white">Gallery</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {selectedAchievement.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-video overflow-hidden rounded-lg bg-gray-700"
                    >
                      <Image
                        src={image}
                        alt={`${selectedAchievement.title} - Image ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Link */}
            {selectedAchievement.link && (
              <a
                href={selectedAchievement.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-600"
              >
                View Certificate
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}
