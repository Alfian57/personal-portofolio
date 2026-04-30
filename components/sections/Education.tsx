"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarRange, GraduationCap, MapPin } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Education() {
  return (
    <section id="education" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <SectionHeading section="education" />

          <div className="grid gap-6 lg:grid-cols-2">
            {PORTFOLIO_DATA.education.map((item) => (
              <motion.article
                key={item.id}
                variants={fadeInUp}
                className="section-frame card-hover relative overflow-hidden p-5 sm:p-6 md:p-7"
              >
                <div className="pointer-events-none absolute top-2 right-2 h-32 w-24 opacity-[0.22]">
                  <Image
                    src="/isekai/academy-spire.svg"
                    alt=""
                    width={96}
                    height={128}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-xl border border-[var(--status-gold-border)] bg-[var(--status-gold-bg)] p-3">
                    <GraduationCap className="h-6 w-6 text-[var(--gold-bright)]" />
                  </div>

                  <div className="flex-1">
                    <p className="section-kicker">Riwayat Pendidikan</p>
                    <h3 className="display-font mt-3 text-3xl text-[var(--foreground)]">
                      {item.degree}
                    </h3>
                    <p className="mt-2 text-lg text-[var(--gold-bright)]">{item.institution}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-4 text-sm text-[var(--muted)]">
                  <span className="inline-flex items-center gap-2">
                    <CalendarRange className="h-4 w-4 text-[var(--mana)]" />
                    {item.period}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[var(--mana)]" />
                    {item.location}
                  </span>
                </div>

                {item.description && (
                  <p className="mt-6 text-sm leading-8 text-[var(--muted)]">{item.description}</p>
                )}
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
