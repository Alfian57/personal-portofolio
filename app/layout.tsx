import type { Metadata } from "next";
import { Archivo, DM_Sans } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alfian Gading Saputra | Fullstack Developer",
  description:
    "Portofolio profesional Alfian Gading Saputra, Fullstack Developer yang berfokus pada backend, desain API, database, dan antarmuka web yang responsif.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${archivo.variable} ${dmSans.variable} min-h-screen bg-[var(--bg)] text-[var(--foreground)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
