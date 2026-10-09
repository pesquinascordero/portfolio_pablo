import { profile, skills, experience, education, languages } from '../data/cv'
import './Cv.css'

function Cv() {

  return (
    <article className="cv">
      <header className="cv-header">
        <p className="eyebrow">// curriculum</p>
        <h2>{profile.name}</h2>
        <p className="cv-role">{profile.role}</p>
        <p className="cv-meta">{profile.location}</p>
      </header>

      <section className="cv-section">
        <h3>Perfil profesional</h3>
        <p>{profile.summary}</p>
      </section>

      <section className="cv-section">
        <h3>Experiencia profesional</h3>
        {experience.map((job) => (
          <div key={job.period} className="card cv-job">
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
        <dl className="cv-skills">
          {skills.map((group) => (
            <div key={group.category} className="cv-skill-group">
              <dt>{group.category}</dt>
              <dd>{group.items.join(' · ')}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="cv-section">
        <h3>Formación</h3>
        {education.map((item) => (
          <div key={item.title} className="card cv-job">
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
