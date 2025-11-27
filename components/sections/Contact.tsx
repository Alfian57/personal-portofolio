"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { fadeInUp, staggerContainer, scaleOnHover } from "@/lib/animations";

export function Contact() {
  return (
    <section id="contact" className="bg-gray-900/50 px-4 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">{PORTFOLIO_DATA.contact.title}</h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-400">
              {PORTFOLIO_DATA.contact.description}
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-12">
            <motion.a
              href={`mailto:${PORTFOLIO_DATA.contact.email}`}
              {...scaleOnHover}
              className="inline-flex items-center gap-3 rounded-full bg-linear-to-r from-blue-500 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-shadow hover:shadow-xl"
            >
              <Mail className="h-6 w-6" />
              {PORTFOLIO_DATA.contact.email}
            </motion.a>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex justify-center gap-6">
            {PORTFOLIO_DATA.socials.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="rounded-full bg-gray-800 p-4 shadow-lg transition-colors hover:bg-blue-500 hover:text-white"
                  aria-label={social.label}
                >
                  <Icon className="h-7 w-7" />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
