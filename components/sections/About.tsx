"use client";

import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function About() {
  return (
    <section id="about" className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-8 flex items-center gap-3">
            <Code2 className="h-8 w-8 text-blue-500" />
            <h2 className="text-4xl font-bold md:text-5xl">{PORTFOLIO_DATA.about.title}</h2>
          </motion.div>

          <div className="grid gap-12 md:grid-cols-2">
            <motion.div variants={fadeInUp} className="space-y-4">
              {PORTFOLIO_DATA.about.description.map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed text-gray-400">
                  {paragraph}
                </p>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="mb-6 text-2xl font-semibold">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {PORTFOLIO_DATA.about.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.1 }}
                    className="rounded-full bg-blue-900/30 px-4 py-2 font-medium text-blue-400"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
