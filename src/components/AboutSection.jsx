import Section from "./Section";

export default function AboutSection({ paragraphs }) {
  return (
    <Section id="about" title="About">
      <div className="aboutCopy">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
