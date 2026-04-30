export const ARCANE_NAV = [
  {
    href: "#about",
    section: "about",
    lore: "Profil",
    english: "Tentang",
    short: "Profil",
  },
  {
    href: "#experience",
    section: "experience",
    lore: "Pengalaman",
    english: "Kerja",
    short: "Kerja",
  },
  {
    href: "#projects",
    section: "projects",
    lore: "Karya Terpilih",
    english: "Proyek",
    short: "Karya",
  },
  {
    href: "#education",
    section: "education",
    lore: "Pendidikan",
    english: "Akademik",
    short: "Pendidikan",
  },
  {
    href: "#achievements",
    section: "achievements",
    lore: "Pencapaian",
    english: "Prestasi",
    short: "Prestasi",
  },
  {
    href: "#certifications",
    section: "certifications",
    lore: "Sertifikasi",
    english: "Kredensial",
    short: "Sertifikasi",
  },
  {
    href: "#contact",
    section: "contact",
    lore: "Kontak",
    english: "Hubungi",
    short: "Kontak",
  },
] as const;

export const SECTION_CHAPTERS = {
  about: {
    chapter: "01",
    lore: "Profil",
    english: "Tentang",
    description:
      "Ringkasan keahlian, cara kerja, dan area engineering yang paling sering saya tangani.",
  },
  experience: {
    chapter: "02",
    lore: "Pengalaman",
    english: "Riwayat Kerja",
    description:
      "Pengalaman industri yang berfokus pada backend, integrasi API, database, dan deployment web.",
  },
  projects: {
    chapter: "03",
    lore: "Karya Terpilih",
    english: "Studi Kasus",
    description:
      "Karya dan studi kasus nyata yang bisa dipertanggungjawabkan, tanpa link atau klaim placeholder.",
  },
  education: {
    chapter: "04",
    lore: "Pendidikan",
    english: "Latar Akademik",
    description: "Fondasi akademik dan vokasi yang membentuk kemampuan software engineering saya.",
  },
  achievements: {
    chapter: "05",
    lore: "Pencapaian",
    english: "Prestasi",
    description:
      "Pencapaian kompetitif dan riset yang menunjukkan kemampuan menyelesaikan problem teknis di bawah tekanan.",
  },
  certifications: {
    chapter: "06",
    lore: "Sertifikasi",
    english: "Kredensial",
    description:
      "Sertifikasi dan pembelajaran terstruktur yang mendukung keahlian backend, web, cloud, DevOps, dan database.",
  },
  contact: {
    chapter: "07",
    lore: "Kontak",
    english: "Kolaborasi",
    description:
      "Terbuka untuk peluang fullstack/backend, kolaborasi produk, dan diskusi teknis yang membutuhkan eksekusi rapi.",
  },
} as const;

export const ARCANE_LORE = {
  brand: {
    guild: "Portofolio Engineering Alfian",
    motto: "Backend, API, dan Web Interface",
  },
  hero: {
    chapter: "Portofolio // Fullstack Developer",
    overline: "Fullstack Developer berfokus backend di Yogyakarta",
    intro: [
      "Saya membangun aplikasi web dengan fondasi backend yang rapi, aman, dan mudah dikembangkan. Area utama saya adalah Laravel, Go, REST API, SQL, dan Next.js.",
      "Saya terbiasa menjembatani kebutuhan produk dengan implementasi teknis, mulai dari struktur database, endpoint API, sampai interface yang nyaman digunakan.",
    ],
    primaryCta: "Lihat Karya Terpilih",
    secondaryCta: "Hubungi Saya",
    dossierTitle: "Ringkasan Profesional",
    dossierDescription:
      "Ringkasan singkat untuk recruiter atau tim engineering yang ingin menilai fokus, lokasi, dan stack utama saya.",
    dossierFields: [
      { label: "Peran", value: "Fullstack Developer" },
      { label: "Lokasi", value: "Yogyakarta, Indonesia" },
      { label: "Fokus Utama", value: "Backend, API Design, Database" },
      { label: "Stack Utama", value: "Laravel, Go, Next.js, TypeScript" },
    ],
    statLabels: {
      projects: "Karya Terpilih",
      achievements: "Pencapaian",
      certifications: "Sertifikasi",
    },
    socialTitle: "Tautan Profesional",
  },
  about: {
    prelude:
      "Saya melihat software engineering sebagai pekerjaan membangun sistem yang jelas, tahan uji, dan nyaman dirawat oleh tim berikutnya.",
    creedTitle: "Prinsip Engineering",
    creed: [
      "Rancang alur data dan API sebelum mempercantik tampilan.",
      "Jaga performa, keamanan, dan maintainability sejak awal.",
      "Buat kompleksitas teknis terasa tertata untuk user dan tim.",
    ],
    focusTitle: "Keahlian Utama",
    currentTitle: "Fokus Saat Ini",
    currentDescription:
      "Saat ini saya memperkuat pengalaman backend Laravel di lingkungan profesional, sambil terus mengembangkan Go, Next.js, Docker, dan praktik desain sistem.",
  },
  experience: {
    sectionNote:
      "Setiap pengalaman menampilkan peran, tanggung jawab, stack, dan dokumentasi visual yang relevan.",
    modalTitle: "Detail Pengalaman",
  },
  projects: {
    featuredTitle: "Studi Kasus Utama",
    archiveTitle: "Karya Tambahan",
    allFilter: "Semua",
    modalTitle: "Detail Studi Kasus",
    liveCta: "Buka Tautan Publik",
    codeCta: "Buka Repository",
  },
  achievements: {
    modalTitle: "Detail Pencapaian",
    certificateCta: "Lihat Sertifikat",
  },
  certifications: {
    allFilter: "Semua Penerbit",
    modalTitle: "Detail Sertifikasi",
    credentialCta: "Buka Kredensial",
  },
  contact: {
    title: "Mari Diskusikan Peluang Kerja atau Kolaborasi",
    description:
      "Saya terbuka untuk peran fullstack/backend, kolaborasi produk, dan proyek web yang membutuhkan struktur sistem yang kuat serta interface yang jelas.",
    note: "Cara tercepat menghubungi saya adalah melalui email atau LinkedIn.",
  },
  footer: {
    closing:
      "Portfolio ini dirancang agar recruiter dan tim teknis bisa cepat memahami fokus, bukti kerja, dan cara menghubungi saya.",
    backToTop: "Kembali ke Atas",
  },
} as const;

export type SectionKey = keyof typeof SECTION_CHAPTERS;
