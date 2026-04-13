import Section from "./Section";

export default function BlogSection({ tracks }) {
  return (
    <Section id="blog" title="Blog">
      <div className="blogGrid">
        {tracks.map((track) => (
          <article className="card" key={track.id}>
            <h3>{track.title}</h3>
            <p>{track.description}</p>
            <p className="blogStatus">{track.status}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
