import Section from "./Section";

export default function BlogSection({ posts }) {
  return (
    <Section id="blog" title="Blog">
      <div className="blogGrid">
        {posts.map((post) => (
          <article className="card" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p className="blogStatus">{post.status}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
