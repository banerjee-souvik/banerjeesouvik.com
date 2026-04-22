"use client";

import EventLoopAnimation from "./EventLoopAnimation";

function renderBlock(block) {
  if (block.type === "heading") {
    return <h2>{block.content}</h2>;
  }

  if (block.type === "paragraph") {
    return <p>{block.content}</p>;
  }

  if (block.type === "code") {
    return (
      <pre className="blogCode">
        <code>{block.code}</code>
      </pre>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="blogList">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "event-loop-animation") {
    return (
      <section className="blogLottie">
        <h3>{block.title}</h3>
        <p>{block.description}</p>
        <EventLoopAnimation />
      </section>
    );
  }

  return null;
}

export default function BlogPostContent({ blocks }) {
  return (
    <div className="blogContent">
      {blocks.map((block, index) => (
        <div key={`${block.type}-${index}`}>{renderBlock(block)}</div>
      ))}
    </div>
  );
}
