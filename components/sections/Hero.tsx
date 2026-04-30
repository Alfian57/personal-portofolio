"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, ShieldCheck } from "lucide-react";
import { ARCANE_LORE } from "@/constants/lore-content";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { fadeInLeft, fadeInRight, fadeInUp, staggerSlow } from "@/lib/animations";

export function Hero() {
  const statCards = [
    {
      label: ARCANE_LORE.hero.statLabels.projects,
      value: `${PORTFOLIO_DATA.projects.length}`,
    },
    {
      label: ARCANE_LORE.hero.statLabels.achievements,
      value: `${PORTFOLIO_DATA.achievements.length}`,
    },
    {
      label: ARCANE_LORE.hero.statLabels.certifications,
      value: `${PORTFOLIO_DATA.certifications.length}`,
    },
  ];

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pt-24 pb-12 sm:px-6 md:px-8 lg:pt-24 lg:pb-16"
    >
      <div
        aria-hidden="true"
        className="hero-visual-backdrop absolute inset-x-0 top-0 h-[30rem]"
      />
      <div
        aria-hidden="true"
        className="isekai-seal pointer-events-none absolute top-24 right-0 hidden h-64 w-64 opacity-[0.09] md:block"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.18fr)_minmax(20rem,0.82fr)] lg:items-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerSlow}
            className="max-w-4xl"
          >
            <motion.p variants={fadeInLeft} className="section-kicker">
              {ARCANE_LORE.hero.chapter}
            </motion.p>
            <motion.p
              variants={fadeInLeft}
              className="mt-3 max-w-xl text-sm font-semibold tracking-[0.16em] text-[var(--mana)] uppercase"
            >
              {ARCANE_LORE.hero.overline}
            </motion.p>

            <motion.h1
              variants={fadeInLeft}
              className="display-font mt-5 max-w-4xl text-4xl leading-[1.02] font-bold text-[var(--foreground)] sm:text-5xl lg:text-6xl"
            >
              {PORTFOLIO_DATA.hero.name}
            </motion.h1>

            <motion.p
              variants={fadeInLeft}
              className="mt-4 max-w-3xl text-lg leading-7 font-semibold text-[var(--gold-bright)] sm:text-xl"
            >
              {PORTFOLIO_DATA.hero.tagline}
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-5 max-w-3xl space-y-3">
              {ARCANE_LORE.hero.intro.map((paragraph) => (
                <p key={paragraph} className="text-base leading-7 text-[var(--muted)]">
                  {paragraph}
                </p>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
              <a href="#projects" className="arcane-button">
                <ArrowRight className="h-4 w-4" />
                {ARCANE_LORE.hero.primaryCta}
              </a>
              <a href="#contact" className="ghost-button">
                <Mail className="h-4 w-4" />
                {ARCANE_LORE.hero.secondaryCta}
              </a>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-8 grid gap-3 sm:grid-cols-3">
              {statCards.map((stat) => (
                <div key={stat.label} className="section-frame px-4 py-4">
                  <p className="text-xs font-bold tracking-[0.16em] text-[var(--mana)] uppercase">
                    {stat.label}
                  </p>
                  <p className="display-font mt-2 text-3xl font-bold text-[var(--foreground)]">
                    {stat.value}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.aside
            initial="initial"
            animate="animate"
            variants={fadeInRight}
            className="section-frame p-5 sm:p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--parchment)]">
                <Image
                  src="/isekai/guild-crest.svg"
                  alt=""
                  width={36}
                  height={40}
                  priority
                  className="h-9 w-9 object-contain"
                />
              </div>
              <div className="min-w-0">
                <p className="section-kicker">{ARCANE_LORE.hero.dossierTitle}</p>
                <h2 className="display-font mt-2 text-2xl font-bold text-[var(--foreground)]">
                  Siap backend, paham produk
                </h2>
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              {ARCANE_LORE.hero.dossierDescription}
            </p>

            <div className="mt-5 divide-y divide-[var(--glass-border)]">
              {ARCANE_LORE.hero.dossierFields.map((field) => (
                <div key={field.label} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <p className="text-xs font-bold tracking-[0.16em] text-[var(--mana)] uppercase">
                    {field.label}
                  </p>
                  <p className="text-sm leading-6 text-[var(--foreground)]">{field.value}</p>
                </div>
              ))}
            </div>

            <div className="ornament-line my-5" />

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--gold-bright)]" />
                <p className="text-sm leading-6 text-[var(--muted)]">
                  API, database, dan maintainability menjadi prioritas utama.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--gold-bright)]" />
                <p className="text-sm leading-6 text-[var(--muted)]">
                  Siap untuk peluang onsite/hybrid di Yogyakarta maupun remote.
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {PORTFOLIO_DATA.about.skills.slice(0, 8).map((skill) => (
                <span key={skill} className="arcane-chip">
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-xs font-bold tracking-[0.16em] text-[var(--mana)] uppercase">
                {ARCANE_LORE.hero.socialTitle}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {PORTFOLIO_DATA.socials.map((social) => {
                  const Icon = social.icon;
                  const isMail = social.href.startsWith("mailto:");

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target={isMail ? undefined : "_blank"}
                      rel={isMail ? undefined : "noopener noreferrer"}
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-2 text-sm text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--border)]"
                    >
                      <Icon className="h-4 w-4 text-[var(--gold-bright)]" />
                      {social.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
