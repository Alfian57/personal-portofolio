import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alfian Gading Saputra | Fullstack Developer",
  description:
    "Portofolio profesional Alfian Gading Saputra, Fullstack Developer yang berfokus pada backend systems, API design, database, dan responsive web interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${archivo.variable} ${spaceGrotesk.variable} min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
