"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, Calendar, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Modal } from "@/components/ui/Modal";
import { Certification } from "@/types/portfolio";
import Image from "next/image";

export function Certifications() {
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [selectedIssuer, setSelectedIssuer] = useState<string>("All");
  const [showAll, setShowAll] = useState(false);

  // Get all unique issuers
  const allIssuers = useMemo(() => {
    const issuers = new Set<string>();
    PORTFOLIO_DATA.certifications.forEach((cert) => {
      issuers.add(cert.issuer);
    });
    return ["All", ...Array.from(issuers).sort()];
  }, []);

  // Filter certifications by selected issuer
  const filteredCertifications = useMemo(() => {
    if (selectedIssuer === "All") {
      return PORTFOLIO_DATA.certifications;
    }
    return PORTFOLIO_DATA.certifications.filter(
      (cert) => cert.issuer === selectedIssuer
    );
  }, [selectedIssuer]);

  // Show only first 6 or all
  const displayedCertifications = showAll
    ? filteredCertifications
    : filteredCertifications.slice(0, 6);

  return (
    <section id="certifications" className="bg-gray-900/50 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-12 flex items-center gap-3">
            <Award className="h-8 w-8 text-blue-500" />
            <h2 className="text-4xl font-bold md:text-5xl">Certifications</h2>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {allIssuers.map((issuer) => (
                <button
                  key={issuer}
                  onClick={() => {
                    setSelectedIssuer(issuer);
                    setShowAll(false);
                  }}
                  className={`rounded-lg px-4 py-2 font-medium transition-all ${
                    selectedIssuer === issuer
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {issuer}
                </button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIssuer}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {displayedCertifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                onClick={() => setSelectedCertification(cert)}
                className="group cursor-pointer rounded-2xl bg-gray-800 p-6 shadow-lg transition-all hover:shadow-xl"
              >
                {/* Certificate Image/Icon */}
                {cert.image ? (
                  <div className="relative mb-4 h-40 w-full overflow-hidden rounded-lg bg-gray-700">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="mb-4 flex h-40 w-full items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-purple-600">
                    <Award className="h-16 w-16 text-white" />
                  </div>
                )}

                <div className="mb-2 flex items-start justify-between">
                  <h3 className="flex-1 text-lg font-bold text-white transition-colors group-hover:text-blue-500">
                    {cert.title}
                  </h3>
                  <ChevronRight className="ml-2 h-5 w-5 shrink-0 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-blue-500" />
                </div>

                <p className="mb-2 font-semibold text-blue-400">{cert.issuer}</p>

                <div className="mb-3 flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>{cert.date}</span>
                  {cert.expiryDate && <span className="text-xs">• Expires: {cert.expiryDate}</span>}
                </div>

                <p className="mb-3 line-clamp-2 text-sm text-gray-400">{cert.description}</p>

                {cert.skills && (
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="rounded bg-gray-700 px-2 py-1 text-xs text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 2 && (
                      <span className="px-2 py-1 text-xs text-gray-500">
                        +{cert.skills.length - 2} more
                      </span>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
            </motion.div>
          </AnimatePresence>

          {/* See More/Less Button */}
          {filteredCertifications.length > 6 && (
            <motion.div variants={fadeInUp} className="mt-8 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="rounded-lg bg-blue-500 px-8 py-3 font-semibold text-white transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/50"
              >
                {showAll
                  ? "Show Less"
                  : `See More (${filteredCertifications.length - 6} more)`}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Certification Detail Modal */}
      <Modal isOpen={!!selectedCertification} onClose={() => setSelectedCertification(null)}>
        {selectedCertification && (
          <div className="p-8">
            {/* Certificate Image */}
            {selectedCertification.image && (
              <div className="relative mb-6 h-64 w-full overflow-hidden rounded-xl bg-gray-700">
                <Image
                  src={selectedCertification.image}
                  alt={selectedCertification.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover"
                />
              </div>
            )}

            {/* Header */}
            <div className="mb-6 flex items-start gap-4">
              <div className="rounded-xl bg-blue-500 p-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="mb-2 text-3xl font-bold text-white">
                  {selectedCertification.title}
                </h2>
                <p className="mb-2 text-xl font-semibold text-blue-400">
                  {selectedCertification.issuer}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Issued: {selectedCertification.date}</span>
                  </div>
                  {selectedCertification.expiryDate && (
                    <span>• Expires: {selectedCertification.expiryDate}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="leading-relaxed text-gray-300">{selectedCertification.description}</p>
            </div>

            {/* Credential Info */}
            {selectedCertification.credentialId && (
              <div className="mb-6 rounded-lg bg-gray-700/50 p-4">
                <p className="mb-1 text-sm text-gray-400">Credential ID</p>
                <p className="font-mono text-white">{selectedCertification.credentialId}</p>
              </div>
            )}

            {/* Skills */}
            {selectedCertification.skills && selectedCertification.skills.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold text-white">Skills Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCertification.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              {selectedCertification.credentialUrl && (
                <a
                  href={selectedCertification.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-600"
                >
                  View Credential
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
