"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { fadeInUp, staggerContainer, scaleOnHover } from "@/lib/animations";

export function Hero() {
  return (
    <section className="flex min-h-screen items-center justify-center px-4 pt-16">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="text-center"
        >
          <motion.p variants={fadeInUp} className="mb-4 text-lg text-gray-400 md:text-xl">
            {PORTFOLIO_DATA.hero.greeting}
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="mb-4 text-5xl font-bold md:text-7xl lg:text-8xl"
          >
            <span className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {PORTFOLIO_DATA.hero.name}
            </span>
          </motion.h1>

          <motion.h2
            variants={fadeInUp}
            className="mb-6 text-2xl font-semibold text-gray-200 md:text-4xl"
          >
            {PORTFOLIO_DATA.hero.tagline}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mb-12 max-w-3xl text-lg text-gray-400 md:text-xl"
          >
            {PORTFOLIO_DATA.hero.description}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <motion.a
              href="#projects"
              {...scaleOnHover}
              className="rounded-full flex justify-center items-center bg-linear-to-r from-blue-500 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg transition-shadow hover:shadow-xl"
            >
              {PORTFOLIO_DATA.hero.cta.primary}
              <ArrowRight className="ml-2 inline-block h-5 w-5" />
            </motion.a>
            <motion.a
              href="#contact"
              {...scaleOnHover}
              className="rounded-full flex justify-center items-center border-2 border-gray-700 bg-gray-800 px-8 py-4 font-semibold text-white transition-colors hover:border-blue-500"
            >
              {PORTFOLIO_DATA.hero.cta.secondary}
            </motion.a>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-12 flex justify-center gap-6">
            {PORTFOLIO_DATA.socials.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="rounded-full bg-gray-800 p-3 transition-colors hover:bg-blue-500 hover:text-white"
                  aria-label={social.label}
                >
                  <Icon className="h-6 w-6" />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
