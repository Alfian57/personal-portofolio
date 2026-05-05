"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Send } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { Clay3DAsset } from "@/components/ui/Clay3DAsset";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Contact() {
  return (
    <section id="contact" className="section-padding">
      <Clay3DAsset
        variant="message"
        delay="medium"
        className="right-4 bottom-[10%] hidden h-32 w-32 opacity-80 lg:block xl:right-8 2xl:right-[calc((100vw_-_72rem)/2_-_1.5rem)]"
      />
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <SectionHeading section="contact" align="center" />

          <motion.div variants={fadeInUp} className="clay-card clay-card-strong p-5 sm:p-6 md:p-8">
            <div className="grid gap-7 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <div className="clay-icon h-11 w-11 rounded-[1.25rem]">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <p className="section-kicker">Diskusi Peluang</p>
                </div>
                <h3 className="display-font mt-4 max-w-2xl text-3xl leading-tight font-extrabold text-[var(--foreground)] md:text-4xl dark:text-[var(--foreground)]">
                  {PORTFOLIO_DATA.contact.title}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base dark:text-[var(--muted)]">
                  {PORTFOLIO_DATA.contact.description}
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--muted-strong)] dark:text-[var(--muted-strong)]">
                  Cara tercepat menghubungi saya adalah melalui email atau LinkedIn.
                </p>
              </div>

              <div>
                <a
                  href={`mailto:${PORTFOLIO_DATA.contact.email}`}
                  className="clay-button clay-button-primary w-full"
                >
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
                        className="clay-inset flex items-center justify-between gap-3 px-4 py-3 text-sm font-bold text-[var(--foreground)] transition-transform duration-200 hover:-translate-y-0.5 dark:text-[var(--foreground)]"
                      >
                        <span className="inline-flex items-center gap-3">
                          <Icon className="h-5 w-5 text-[var(--accent)]" />
                          {social.label}
                        </span>
                        <Send className="h-4 w-4 text-[var(--accent)]" />
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
