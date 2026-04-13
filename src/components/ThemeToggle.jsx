export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="themeToggle"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className="themeIcon" aria-hidden="true">
        {isDark ? "☀" : "☾"}
      </span>
      <span>{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
