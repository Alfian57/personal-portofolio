"use client";

import { motion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, FolderKanban, Mail, MessageSquare } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { Clay3DAsset } from "@/components/ui/Clay3DAsset";
import { ClayListItem, ClayMetric } from "@/components/ui/ClayPrimitives";
import { SectionShell } from "@/components/ui/SectionShell";
import { fadeInLeft, fadeInRight, fadeInUp, staggerSlow } from "@/lib/animations";

export function Hero() {
  const statCards = [
    { label: "Karya Terpilih", value: `${PORTFOLIO_DATA.projects.length}` },
    { label: "Pencapaian", value: `${PORTFOLIO_DATA.achievements.length}` },
    { label: "Sertifikasi", value: `${PORTFOLIO_DATA.certifications.length}` },
  ];
  const quickLinks = [
    {
      href: "#projects",
      icon: FolderKanban,
      title: "Studi kasus",
      text: "Lihat proyek dan konteks teknis yang paling relevan.",
    },
    {
      href: "#experience",
      icon: BriefcaseBusiness,
      title: "Riwayat kerja",
      text: "Telusuri pengalaman profesional dan tanggung jawab utama.",
    },
    {
      href: "#contact",
      icon: MessageSquare,
      title: "Kontak",
      text: "Hubungi melalui email, GitHub, atau LinkedIn.",
    },
  ];

  return (
    <SectionShell
      id="top"
      asset={
        <>
          <Clay3DAsset
            variant="workspace"
            delay="short"
            className="top-24 right-4 hidden h-36 w-36 opacity-80 lg:block xl:right-8 xl:h-44 xl:w-44 2xl:right-[calc((100vw_-_80rem)/2)]"
          />
          <Clay3DAsset
            variant="orbit"
            delay="long"
            className="bottom-7 left-4 hidden h-24 w-24 opacity-70 md:block xl:left-8 xl:h-28 xl:w-28 2xl:left-[calc((100vw_-_80rem)/2)]"
          />
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:items-center">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerSlow}
          className="max-w-4xl"
        >
          <motion.p variants={fadeInLeft} className="section-kicker">
            Portfolio // Fullstack Developer
          </motion.p>

          <motion.h1
            variants={fadeInLeft}
            className="display-font mt-4 max-w-4xl text-4xl leading-[1.03] font-extrabold text-[var(--foreground)] sm:text-5xl xl:text-6xl dark:text-[var(--foreground)]"
          >
            {PORTFOLIO_DATA.hero.name}
          </motion.h1>

          <motion.p
            variants={fadeInLeft}
            className="mt-3 max-w-3xl text-lg leading-7 font-bold text-[var(--accent)] sm:text-xl dark:text-[var(--accent)]"
          >
            {PORTFOLIO_DATA.hero.tagline}
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="mt-4 max-w-3xl text-base leading-7 text-[var(--muted)] dark:text-[var(--muted)]"
          >
            Saya membangun aplikasi web yang rapi dari sisi backend, alur data, dan interface.
            Detail profil, stack, dan cara kerja saya tersedia di bagian berikutnya.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
            <a href="#projects" className="clay-button clay-button-primary">
              <ArrowRight className="h-4 w-4" />
              {PORTFOLIO_DATA.hero.cta.primary}
            </a>
            <a href="#contact" className="clay-button clay-button-secondary">
              <Mail className="h-4 w-4" />
              {PORTFOLIO_DATA.hero.cta.secondary}
            </a>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-6 grid gap-3 sm:grid-cols-3">
            {statCards.map((stat) => (
              <ClayMetric key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </motion.div>
        </motion.div>

        <motion.aside
          initial="initial"
          animate="animate"
          variants={fadeInRight}
          className="clay-card clay-card-strong p-5"
        >
          <div className="flex items-start gap-4">
            <div className="clay-icon h-14 w-14 shrink-0">
              <ArrowRight className="h-7 w-7" />
            </div>
            <div className="min-w-0">
              <p className="section-kicker">Jalur Cepat</p>
              <h2 className="display-font mt-2 text-xl font-extrabold text-[var(--foreground)] dark:text-[var(--foreground)]">
                Pilih bagian yang ingin dinilai dulu
              </h2>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-[var(--muted)] dark:text-[var(--muted)]">
            Mulai dari bukti kerja, pengalaman profesional, atau kontak langsung sesuai kebutuhan
            evaluasi Anda.
          </p>

          <div className="mt-4 grid gap-3">
            {quickLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="block transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <ClayListItem
                    icon={Icon}
                    title={item.title}
                    description={item.text}
                    meta="Buka"
                  />
                </a>
              );
            })}
          </div>

          <a
            href="#about"
            className="clay-button clay-button-secondary mt-4 w-full"
            aria-label="Lihat profil lengkap"
          >
            Lihat Profil Lengkap
          </a>
        </motion.aside>
      </div>
    </SectionShell>
  );
}
