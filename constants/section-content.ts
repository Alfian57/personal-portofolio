export const NAV_ITEMS = [
  { href: "#about", section: "about", label: "Profil", short: "Profil" },
  { href: "#experience", section: "experience", label: "Pengalaman", short: "Kerja" },
  { href: "#projects", section: "projects", label: "Karya Terpilih", short: "Karya" },
  { href: "#education", section: "education", label: "Pendidikan", short: "Pendidikan" },
  { href: "#achievements", section: "achievements", label: "Pencapaian", short: "Prestasi" },
  {
    href: "#certifications",
    section: "certifications",
    label: "Sertifikasi",
    short: "Sertifikasi",
  },
  { href: "#contact", section: "contact", label: "Kontak", short: "Kontak" },
] as const;

export const SECTION_CONTENT = {
  about: {
    index: "01",
    title: "Profil",
    eyebrow: "Tentang",
    description:
      "Ringkasan fokus engineering, cara kerja, dan area fullstack yang paling sering saya tangani.",
  },
  experience: {
    index: "02",
    title: "Pengalaman",
    eyebrow: "Riwayat Kerja",
    description:
      "Pengalaman profesional yang berfokus pada backend, API, database, deployment, dan pembelajaran teknis.",
  },
  projects: {
    index: "03",
    title: "Karya Terpilih",
    eyebrow: "Studi Kasus",
    description:
      "Proyek yang menunjukkan kemampuan merancang backend, alur data, dan interface web yang bisa dirawat.",
  },
  education: {
    index: "04",
    title: "Pendidikan",
    eyebrow: "Latar Akademik",
    description: "Fondasi akademik dan vokasi yang mendukung kemampuan software engineering saya.",
  },
  achievements: {
    index: "05",
    title: "Pencapaian",
    eyebrow: "Prestasi",
    description:
      "Pencapaian kompetitif dan riset yang menunjukkan kemampuan menyelesaikan masalah teknis.",
  },
  certifications: {
    index: "06",
    title: "Sertifikasi",
    eyebrow: "Kredensial",
    description:
      "Sertifikasi dan pembelajaran terstruktur yang mendukung backend, web, cloud, DevOps, dan database.",
  },
  contact: {
    index: "07",
    title: "Kontak",
    eyebrow: "Kolaborasi",
    description: "Terbuka untuk peluang fullstack/backend, kolaborasi produk, dan diskusi teknis.",
  },
} as const;

export const UI_COPY = {
  all: "Semua",
  allIssuers: "Semua Penerbit",
  backToTop: "Kembali ke Atas",
  certificateCta: "Lihat Sertifikat",
  credentialCta: "Buka Kredensial",
  codeCta: "Buka Repository",
  liveCta: "Buka Tautan Publik",
  noPublicLink:
    "Link publik tidak ditampilkan karena karya ini berbasis kompetisi, riset, atau pekerjaan internal.",
  footer:
    "Portfolio ini dirancang agar recruiter dan tim teknis bisa cepat memahami fokus, bukti kerja, dan cara menghubungi saya.",
} as const;

export type SectionKey = keyof typeof SECTION_CONTENT;
