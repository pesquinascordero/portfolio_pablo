import { projects } from '../data/projects'
import './Projects.css'

function Projects() {

  return (
    <section className="projects-page">
      <p className="eyebrow">// proyectos</p>
      <h2>Proyectos</h2>

      <ul className="projects-grid">
        {projects.map((project) => (
          <li key={project.title} className="card project">
            <span className="project-type">{project.type}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <ul className="project-tags">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Projects
