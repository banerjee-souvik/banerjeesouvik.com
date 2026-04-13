import Section from "./Section";
import SkillGroup from "./SkillGroup";

export default function SkillsSection({ skillGroups }) {
  return (
    <Section id="skills" title="Skills">
      <div className="skillsGrid">
        {skillGroups.map((group) => (
          <SkillGroup group={group} key={group.id} />
        ))}
      </div>
    </Section>
  );
}
