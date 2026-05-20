"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Send } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/portfolio-data";
import { SectionShell } from "@/components/ui/SectionShell";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Contact() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const interests = PORTFOLIO_DATA.contact.interests ?? [];

  const baseEmailHref = useMemo(() => {
    const subject = encodeURIComponent("Peluang Backend/Fullstack - Alfian");
    return `mailto:${PORTFOLIO_DATA.contact.email}?subject=${subject}`;
  }, []);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest]
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const body = [
      `Nama: ${formData.get("name") ?? ""}`,
      `Email: ${formData.get("email") ?? ""}`,
      `Perusahaan: ${formData.get("company") ?? ""}`,
      `Minat: ${selectedInterests.join(", ") || "-"}`,
      "",
      String(formData.get("message") ?? ""),
    ].join("\n");

    window.location.href = `${baseEmailHref}&body=${encodeURIComponent(body)}`;
  };

  return (
    <SectionShell id="contact" className="white-section contact-section" maxWidth="6xl">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="contact-heading">
          <h2>
            <span>Mari Berdiskusi</span> {PORTFOLIO_DATA.contact.title}
          </h2>
          <ArrowRight className="h-10 w-10" />
          <p>{PORTFOLIO_DATA.contact.description}</p>
        </motion.div>

        <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="contact-form">
          <div className="form-grid">
            <label>
              <span>Nama *</span>
              <input name="name" placeholder="Halo..." required />
            </label>
            <label>
              <span>Email *</span>
              <input name="email" type="email" placeholder="Ke mana saya bisa membalas?" required />
            </label>
          </div>

          <label>
            <span>Perusahaan atau organisasi</span>
            <input name="company" placeholder="Nama perusahaan, organisasi, atau website" />
          </label>

          <label>
            <span>Apa yang ingin dibahas? *</span>
            <textarea
              name="message"
              placeholder="Ceritakan kebutuhan, timeline, atau peran yang ingin didiskusikan..."
              required
            />
          </label>

          <div className="interest-group" aria-label="Minat">
            {interests.map((interest) => {
              const active = selectedInterests.includes(interest);

              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={active ? "is-active" : ""}
                >
                  {interest}
                </button>
              );
            })}
          </div>

          <div className="contact-submit-row">
            <a href={baseEmailHref} className="text-action">
              <Mail className="h-4 w-4" />
              {PORTFOLIO_DATA.contact.email}
            </a>
            <button type="submit" className="button button-primary">
              Kirim Pesan
              <Send className="h-4 w-4" />
            </button>
          </div>
        </motion.form>
      </motion.div>
    </SectionShell>
  );
}
