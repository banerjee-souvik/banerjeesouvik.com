import Section from "./Section";

export default function ImpactMetrics({ metrics }) {
  return (
    <Section id="impact" title="Impact">
      <div className="metricGrid">
        {metrics.map((metric) => (
          <article className="metric" key={metric.id} aria-label={metric.label}>
            <p className="metricValue">{metric.value}</p>
            <p className="metricLabel">{metric.label}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
