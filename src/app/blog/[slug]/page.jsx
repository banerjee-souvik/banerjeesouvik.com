import Link from "next/link";
import { notFound } from "next/navigation";
import BlogPostContent from "../../../components/blog/BlogPostContent";
import BlogTopNav from "../../../components/blog/BlogTopNav";
import { getAllBlogPosts, getBlogPostBySlug } from "../../../content/blogPosts";

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Souvik Banerjee`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="blogPage">
      <BlogTopNav />

      <article className="blogArticle">
        <header className="blogHeader">
          <p className="blogEyebrow">Article</p>
          <h1>{post.title}</h1>
          <p className="blogMetaLine">
            <time dateTime={post.publishedAt}>{post.publishedAt}</time>
            <span>·</span>
            <span>{post.readingMinutes} min read</span>
          </p>
          <p>{post.excerpt}</p>
        </header>

        <BlogPostContent blocks={post.blocks} />

        <section className="blogReferences">
          <h2>References & Credits</h2>
          <ul className="blogList">
            {post.references.map((reference) => (
              <li key={`${reference.href}-${reference.label}`}>
                <a href={reference.href} target="_blank" rel="noreferrer">
                  {reference.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
