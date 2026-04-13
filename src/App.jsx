import {
  aboutParagraphs,
  blogTracks,
  interests,
  profile,
  socialLinks,
} from "./content/portfolioContent";
import AboutSection from "./components/AboutSection";
import BlogSection from "./components/BlogSection";
import Hero from "./components/Hero";
import InterestsSection from "./components/InterestsSection";
import ThemeToggle from "./components/ThemeToggle";
import useTheme from "./hooks/useTheme";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="page">
      <div className="ambient ambientOne" aria-hidden="true" />
      <div className="ambient ambientTwo" aria-hidden="true" />

      <div className="pageTopBar">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>

      <Hero profile={profile} socialLinks={socialLinks} />

      <main>
        <AboutSection paragraphs={aboutParagraphs} />
        <InterestsSection interests={interests} />
        <BlogSection tracks={blogTracks} />
      </main>
    </div>
  );
}
