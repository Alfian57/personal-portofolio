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
import { CustomCursor } from "@/components/ui/CustomCursor";

export default function Portfolio() {
  return (
    <main className="site-shell min-h-screen text-[var(--foreground)]">
      <CustomCursor />
      <div aria-hidden="true" className="world-backdrop">
        <div className="world-backdrop__veil" />
        <div className="world-backdrop__grid" />
      </div>
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
