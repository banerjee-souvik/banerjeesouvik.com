import Link from "next/link";
import BlogTopNav from "../../components/blog/BlogTopNav";
import { getAllBlogPosts } from "../../content/blogPosts";

export const metadata = {
  title: "Blog | Souvik Banerjee",
  description: "Notes on software, systems, and anything interesting.",
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="blogPage">
      <BlogTopNav />

      <header className="blogHeader">
        <p className="blogEyebrow">Blog</p>
        <h1>Notes, experiments, and long-form thoughts.</h1>
        <p>
          I write about software engineering and other topics I find worth sharing.
        </p>
      </header>

      <section className="blogIndexGrid">
        {posts.map((post) => (
          <article className="card" key={post.slug}>
            <h2>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="blogMetaLine">
              <time dateTime={post.publishedAt}>{post.publishedAt}</time>
              <span>·</span>
              <span>{post.readingMinutes} min read</span>
            </p>
            <p>{post.excerpt}</p>
            <div className="blogTagRow">
              {post.tags.map((tag) => (
                <span className="blogTag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
