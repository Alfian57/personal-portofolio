"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type ThemePreference = "light" | "dark";

const storageKey = "portfolio-theme";

function applyTheme(preference: ThemePreference) {
  const shouldUseDark = preference === "dark";

  document.documentElement.classList.toggle("dark", shouldUseDark);
  document.documentElement.style.colorScheme = shouldUseDark ? "dark" : "light";
}

export function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedPreference = window.localStorage.getItem(storageKey) as ThemePreference | null;
    const initialPreference =
      storedPreference === "light" || storedPreference === "dark" ? storedPreference : "light";

    applyTheme(initialPreference);
    queueMicrotask(() => {
      setPreference(initialPreference);
      setMounted(true);
    });
  }, []);

  const cycleTheme = () => {
    const nextPreference: ThemePreference = preference === "light" ? "dark" : "light";

    setPreference(nextPreference);
    window.localStorage.setItem(storageKey, nextPreference);
    applyTheme(nextPreference);
  };

  const Icon = preference === "dark" ? Moon : Sun;
  const label = mounted ? `Tema: ${preference === "dark" ? "gelap" : "terang"}` : "Tema";

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className="clay-icon h-11 w-11 text-[var(--foreground)] dark:text-[var(--foreground)]"
      aria-label={`${label}. Klik untuk mengganti tema.`}
      title={label}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
