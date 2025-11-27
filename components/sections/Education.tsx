"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Education() {
  return (
    <section id="education" className="bg-gray-900/50 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-12 flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-blue-500" />
            <h2 className="text-4xl font-bold md:text-5xl">Education</h2>
          </motion.div>

          <div className="space-y-6">
            {PORTFOLIO_DATA.education.map((edu) => (
              <motion.div
                key={edu.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl bg-gray-800 p-8 shadow-lg transition-shadow hover:shadow-xl"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <h3 className="mb-2 text-2xl font-bold text-white">{edu.degree}</h3>
                    <p className="mb-2 text-xl font-semibold text-blue-400">{edu.institution}</p>
                    {edu.description && <p className="mb-4 text-gray-400">{edu.description}</p>}
                  </div>
                  <div className="mt-2 flex flex-col gap-2 md:mt-0 md:items-end">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>{edu.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
