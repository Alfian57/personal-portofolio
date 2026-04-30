import { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

export interface HeroData {
  greeting: string;
  name: string;
  tagline: string;
  description: string;
  cta: {
    primary: string;
    secondary: string;
  };
}

export interface AboutData {
  title: string;
  description: string[];
  skills: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  type: "Internship" | "Contract" | "Full-time";
  images?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  tags: string[];
  role?: string;
  context?: string;
  highlights?: string[];
  outcome?: string;
  status?: "Professional" | "Research" | "Competition" | "Private/Internal";
  images?: string[];
  link?: string;
  github?: string;
  featured?: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description?: string;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  detailedDescription?: string;
  images?: string[];
  tags?: string[];
  link?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  skills?: string[];
  expiryDate?: string;
}

export interface ContactData {
  title: string;
  description: string;
  email: string;
}

export interface PortfolioData {
  navigation: NavLink[];
  socials: SocialLink[];
  hero: HeroData;
  about: AboutData;
  experiences: Experience[];
  projects: Project[];
  education: Education[];
  achievements: Achievement[];
  certifications: Certification[];
  contact: ContactData;
}
