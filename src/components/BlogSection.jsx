import Link from "next/link";
import Section from "./Section";

export default function BlogSection({ posts }) {
  return (
    <Section id="blog" title="Blog">
      <div className="blogGrid">
        {posts.map((post) => (
          <article className="card" key={post.id}>
            <h3>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>
            <p>{post.description}</p>
            <p className="blogStatus">{post.status ?? "Published"}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
