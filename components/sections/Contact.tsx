"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Send } from "lucide-react";
import { ARCANE_LORE } from "@/constants/lore-content";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div
        aria-hidden="true"
        className="isekai-portal pointer-events-none absolute top-8 left-4 hidden h-52 w-52 opacity-[0.08] lg:block"
      />
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <SectionHeading
            section="contact"
            description={ARCANE_LORE.contact.description}
            align="center"
          />

          <motion.div variants={fadeInUp} className="section-frame p-5 sm:p-6 md:p-8">
            <div className="grid gap-7 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-[var(--gold-bright)]" />
                  <p className="section-kicker">{ARCANE_LORE.contact.title}</p>
                </div>
                <h3 className="display-font mt-4 max-w-2xl text-3xl leading-tight font-bold text-[var(--foreground)] md:text-4xl">
                  {PORTFOLIO_DATA.contact.title}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
                  {PORTFOLIO_DATA.contact.description}
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--muted-strong)]">
                  {ARCANE_LORE.contact.note}
                </p>
              </div>

              <div>
                <a href={`mailto:${PORTFOLIO_DATA.contact.email}`} className="arcane-button w-full">
                  <Mail className="h-4 w-4" />
                  {PORTFOLIO_DATA.contact.email}
                </a>

                <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  {PORTFOLIO_DATA.socials.map((social) => {
                    const Icon = social.icon;
                    const isMail = social.href.startsWith("mailto:");

                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target={isMail ? undefined : "_blank"}
                        rel={isMail ? undefined : "noopener noreferrer"}
                        className="flex items-center justify-between gap-3 rounded-xl border border-[var(--callout-border)] bg-[var(--callout-bg)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--filter-active-border)]"
                      >
                        <span className="inline-flex items-center gap-3">
                          <Icon className="h-5 w-5 text-[var(--gold-bright)]" />
                          {social.label}
                        </span>
                        <Send className="h-4 w-4 text-[var(--mana)]" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
