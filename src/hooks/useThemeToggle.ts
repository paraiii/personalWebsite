import type { Theme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { createCyberTheme } from "../theme/theme";

type ThemeMode = "light" | "dark";

export const useThemeToggle = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");
  const [theme, setTheme] = useState<Theme>(createCyberTheme("dark"));

  useEffect(() => {
    console.log("themeMode", themeMode);
  }, [themeMode]);

  useEffect(() => {
    // 从localStorage获取保存的主题
    const savedTheme = localStorage.getItem("theme") as ThemeMode;

    if (savedTheme) {
      setThemeMode(savedTheme);
      setTheme(createCyberTheme(savedTheme));
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      // 检测系统主题偏好
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const defaultTheme: ThemeMode = prefersDark ? "dark" : "light";
      setThemeMode(defaultTheme);
      setTheme(createCyberTheme(defaultTheme));
      document.documentElement.setAttribute("data-theme", defaultTheme);
      localStorage.setItem("theme", defaultTheme);
    }
  }, []);

  // 当 themeMode 改变时，更新主题
  useEffect(() => {
    setTheme(createCyberTheme(themeMode));
    document.documentElement.setAttribute("data-theme", themeMode);
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    const newThemeMode: ThemeMode = themeMode === "light" ? "dark" : "light";
    console.log("newThemeMode", newThemeMode);
    setThemeMode(newThemeMode);
  };

  return { theme, toggleTheme };
};
