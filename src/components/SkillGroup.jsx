export default function SkillGroup({ group }) {
  return (
    <article className="card skillCard">
      <h3>{group.label}</h3>
      <ul className="chipList" aria-label={`${group.label} skills`}>
        {group.items.map((item) => (
          <li key={item} className="chip">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
