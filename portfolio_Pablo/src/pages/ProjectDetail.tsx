import { Link, useParams } from 'react-router'
import { projects } from '../data/projects'
import NotFound from './NotFound'
import './Projects.css'

function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return <NotFound />
  }

  return (
    <article className="project-detail">
      <Link to="/proyectos" className="project-detail-back">← Volver a proyectos</Link>

      <p className="eyebrow">{project.type}</p>
      <h2>{project.title}</h2>
      <p className="project-detail-description">{project.description}</p>

      <ul className="project-tags">
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

      <p className="project-detail-soon">
        La explicación detallada de este proyecto está en preparación.
      </p>
    </article>
  )
}

export default ProjectDetail
