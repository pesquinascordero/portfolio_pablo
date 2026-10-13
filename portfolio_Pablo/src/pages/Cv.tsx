import { profile, skills, experience, education, languages } from '../data/cv'
import './Cv.css'

function Cv() {

  return (
    <article className="cv">
      <header className="cv-header">
        <p className="eyebrow">{profile.role} · Java · Python · SQL</p>
        <h2>Currículum vitae</h2>
        <p className="cv-summary">{profile.summary}</p>
        <p className="cv-meta">{profile.location}</p>
        <ul className="cv-contact">
          <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
          <li><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        </ul>
        <a href="/cv-pablo-esquinas.pdf" download className="btn btn-primary cv-download">Descargar CV (PDF)</a>
      </header>

      <section className="cv-section">
        <h3>Experiencia</h3>
        {experience.map((job) => (
          <div key={job.period} className="cv-job">
            <h4>{job.role}</h4>
            <p className="cv-meta">{job.company} · {job.type} · {job.period}</p>
            <ul className="cv-list">
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="cv-section">
        <h3>Habilidades técnicas</h3>
        <div className="cv-skill-grid">
          {skills.map((group) => (
            <div key={group.category} className="card cv-skill-card">
              <h4>{group.category}</h4>
              <ul className="cv-tags">
                {group.items.map((item) => (
                  <li key={item} className="cv-tag">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="cv-section">
        <h3>Formación</h3>
        {education.map((item) => (
          <div key={item.title} className="cv-job">
            <h4>{item.title}</h4>
            <p className="cv-meta">{item.institution} · {item.period}</p>
            <p>{item.detail}</p>
          </div>
        ))}
      </section>

      <section className="cv-section">
        <h3>Idiomas</h3>
        <ul className="cv-list">
          {languages.map((lang) => (
            <li key={lang.name}><strong>{lang.name}:</strong> {lang.level}</li>
          ))}
        </ul>
      </section>
    </article>
  )
}

export default Cv
