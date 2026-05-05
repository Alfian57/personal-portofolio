import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import Script from "next/script";
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
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (() => {
              try {
                const preference = localStorage.getItem("portfolio-theme") || "light";
                const shouldUseDark = preference === "dark";
                document.documentElement.classList.toggle("dark", shouldUseDark);
                document.documentElement.style.colorScheme = shouldUseDark ? "dark" : "light";
              } catch {
                document.documentElement.classList.remove("dark");
                document.documentElement.style.colorScheme = "light";
              }
            })();
          `}
        </Script>
      </head>
      <body
        className={`${archivo.variable} ${spaceGrotesk.variable} min-h-screen bg-[var(--bg)] text-[var(--foreground)] antialiased dark:bg-[var(--bg)] dark:text-[var(--foreground)]`}
      >
        {children}
      </body>
    </html>
  );
}
