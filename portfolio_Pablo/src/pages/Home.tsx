import { Link } from 'react-router'
import { profile, highlightedStack } from '../data/cv'
import './Home.css'

function Home() {

  return (
    <div className="home">
      <section className="home-hero">
        <p className="eyebrow">&gt; {profile.role.toLowerCase()}_</p>
        <h1>
          Pablo <span className="home-hero-accent">Esquinas</span>
        </h1>
        <p className="home-lead">
          Java, Python y SQL para sistemas que aguantan carga real: APIs,
          pipelines de CI/CD y bases de datos bien modeladas.
        </p>
        <div className="home-actions">
          <Link to="/proyectos" className="btn btn-primary">Ver proyectos</Link>
          <Link to="/cv" className="btn">Ver CV</Link>
        </div>
      </section>

      <section className="home-section">
        <h2>Sobre mí</h2>
        <p>{profile.summary}</p>
      </section>

      <section className="home-section">
        <h2>Stack</h2>
        <ul className="home-stack">
          {highlightedStack.map((tech) => (
            <li key={tech} className="home-stack-item">{tech}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Home
