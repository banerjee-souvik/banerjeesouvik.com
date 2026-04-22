import {
  interests,
  profile,
  socialLinks,
} from "./content/portfolioContent";
import { getAllBlogPosts } from "./content/blogPosts";
import BlogSection from "./components/BlogSection";
import Hero from "./components/Hero";
import InterestsSection from "./components/InterestsSection";
import useTheme from "./hooks/useTheme";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const blogPreview = getAllBlogPosts().map((post) => ({
    id: post.slug,
    slug: post.slug,
    title: post.title,
    description: post.excerpt,
    status: `${post.readingMinutes} min read`,
  }));

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
        <BlogSection posts={blogPreview} />
      </main>
    </div>
  );
}
