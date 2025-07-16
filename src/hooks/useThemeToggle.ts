import type { Theme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { createCyberTheme } from "../theme/theme";

type ThemeMode = "light" | "dark";

export const useThemeToggle = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    // 初始化状态时同步读取 localStorage
    const saved = localStorage.getItem("theme") as ThemeMode;
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? "dark" : "light";
  });

  const [theme, setTheme] = useState<Theme>(createCyberTheme(themeMode));
  useEffect(() => {
    console.log("theme", theme.palette.mode);
  }, [theme]);

  useEffect(() => {
    console.log("themeMode", themeMode);
    document.documentElement.setAttribute("data-theme", themeMode);
    localStorage.setItem("theme", themeMode);
    setTheme(createCyberTheme(themeMode));
  }, [themeMode]);

  const toggleTheme = () => {
    const newThemeMode: ThemeMode = themeMode === "light" ? "dark" : "light";
    console.log("newThemeMode", newThemeMode);
    setThemeMode(newThemeMode);
  };

  return { theme, toggleTheme };
};
