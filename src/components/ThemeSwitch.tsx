"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "@/components/Icons";

export default function ThemeSwitch() {
  const [mounted, setMounted] = React.useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (resolvedTheme === "dark") {
    return <Sun onClick={() => setTheme("light")} className="cursor-pointer" />;
  }

  if (resolvedTheme === "light") {
    return <Moon onClick={() => setTheme("dark")} className="cursor-pointer" />;
  }
}
