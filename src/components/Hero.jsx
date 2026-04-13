import profilePhoto from "../assets/souvik_banerjee_photo.webp";

function Icon({ id }) {
  if (id === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.94 8.5v9h-3v-9h3Zm.2-2.78a1.72 1.72 0 1 1-3.44 0 1.72 1.72 0 0 1 3.44 0ZM20.3 12.35v5.15h-3v-4.8c0-1.2-.42-2.03-1.48-2.03-.81 0-1.29.55-1.5 1.08-.08.2-.1.48-.1.76v4.99h-3v-9h3v1.23c.44-.68 1.22-1.65 2.97-1.65 2.17 0 3.8 1.42 3.8 4.47Z" />
      </svg>
    );
  }

  if (id === "github") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.69-.22.69-.48v-1.88c-2.8.6-3.39-1.2-3.39-1.2-.46-1.16-1.1-1.47-1.1-1.47-.9-.61.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.88 1.52 2.32 1.08 2.9.83.09-.64.35-1.08.63-1.32-2.24-.25-4.59-1.12-4.59-4.98 0-1.1.4-2 1.03-2.7-.1-.25-.45-1.28.1-2.67 0 0 .84-.27 2.75 1.03a9.52 9.52 0 0 1 5 0c1.9-1.3 2.74-1.03 2.74-1.03.55 1.39.2 2.42.1 2.67.64.7 1.03 1.6 1.03 2.7 0 3.87-2.35 4.72-4.6 4.97.36.31.67.92.67 1.85v2.75c0 .27.18.59.7.49A10 10 0 0 0 12 2Z" />
      </svg>
    );
  }

  if (id === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm8.5 1.7h-8.5A4.05 4.05 0 0 0 3.7 7.75v8.5a4.05 4.05 0 0 0 4.05 4.05h8.5a4.05 4.05 0 0 0 4.05-4.05v-8.5a4.05 4.05 0 0 0-4.05-4.05Z" />
        <path d="M12 7.1A4.9 4.9 0 1 1 7.1 12 4.9 4.9 0 0 1 12 7.1Zm0 1.7A3.2 3.2 0 1 0 15.2 12 3.2 3.2 0 0 0 12 8.8Z" />
        <circle cx="17.15" cy="6.85" r="1.1" />
      </svg>
    );
  }

  return null;
}

export default function Hero({ profile, socialLinks }) {
  return (
    <header className="hero" aria-labelledby="profile-title">
      <div className="heroBody">
        <img
          className="profilePhoto"
          src={profilePhoto}
          alt="Portrait of Souvik Banerjee"
          loading="eager"
        />
        <div className="heroContent">
          <h1 id="profile-title">{profile.name}</h1>
          <p className="subtitle">{profile.role}</p>
          <p className="summary">{profile.summary}</p>
          <p className="meta">
            <span className="metaIcon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.12 7 13 7 13s7-7.88 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
              </svg>
            </span>
            <span>{profile.location}</span>
          </p>
          <ul className="socialLinks" aria-label="Social links">
            {socialLinks.map((link) => (
              <li key={link.id}>
                <a href={link.href} target="_blank" rel="noreferrer noopener">
                  <span className="socialIcon">
                    <Icon id={link.id} />
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
