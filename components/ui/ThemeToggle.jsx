"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1">
      <button
        onClick={() => setTheme("light")}
        className={`rounded-full p-2 transition ${
          theme === "light"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Light mode"
      >
        <Sun size={16} />
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`rounded-full p-2 transition ${
          theme === "dark"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Dark mode"
      >
        <Moon size={16} />
      </button>

      <button
        onClick={() => setTheme("system")}
        className={`rounded-full p-2 transition ${
          theme === "system"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="System theme"
      >
        <Monitor size={16} />
      </button>
    </div>
  );
}