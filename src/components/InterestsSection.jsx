import Section from "./Section";

export default function InterestsSection({ interests }) {
  return (
    <Section id="interests" title="Interests">
      <div className="interestsGrid">
        {interests.map((interest) => (
          <article className="card" key={interest.id}>
            <h3>{interest.title}</h3>
            <p>{interest.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
