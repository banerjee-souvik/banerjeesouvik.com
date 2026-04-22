"use client";

import ThemeToggle from "../ThemeToggle";
import useTheme from "../../hooks/useTheme";

export default function BlogThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="blogThemeToggle">
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
    </div>
  );
}
