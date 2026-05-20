import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/Education";
import { Achievements } from "@/components/sections/Achievements";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Portfolio() {
  return (
    <main className="site-shell min-h-screen text-[var(--foreground)] dark:text-[var(--foreground)]">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Education />
      <Achievements />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}
