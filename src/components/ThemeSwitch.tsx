"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "@/components/Icons";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
}
