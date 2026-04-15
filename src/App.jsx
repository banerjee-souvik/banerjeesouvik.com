import {
  blogPosts,
  interests,
  profile,
  socialLinks,
} from "./content/portfolioContent";
import BlogSection from "./components/BlogSection";
import Hero from "./components/Hero";
import InterestsSection from "./components/InterestsSection";
import useTheme from "./hooks/useTheme";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="page">
      <div className="ambient ambientOne" aria-hidden="true" />
      <div className="ambient ambientTwo" aria-hidden="true" />

      <Hero
        profile={profile}
        socialLinks={socialLinks}
        theme={theme}
        onThemeToggle={toggleTheme}
      />

      <main>
        <InterestsSection interests={interests} />
        <BlogSection posts={blogPosts} />
      </main>
    </div>
  );
}
