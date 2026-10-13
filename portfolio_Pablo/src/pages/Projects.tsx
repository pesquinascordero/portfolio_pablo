import { Link } from 'react-router'
import { projects } from '../data/projects'
import './Projects.css'

function Projects() {

  return (
    <section className="projects-page">
      <h2>Proyectos</h2>

      <ul className="projects-grid">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link to={`/proyectos/${project.slug}`} className="card project">
              <div className="project-cover" aria-hidden="true">
                <span>{project.type}</span>
              </div>
              <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className="project-tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Projects
