import { Link } from 'react-router'
import { homeDefinition } from '../../data/home'
import { profile } from '../../data/cv'
import photo from '../../assets/pablo-cutout.png'

function Hero() {

  return (
    <section className="home-hero">
      <img className="home-photo" src={photo} alt={profile.name} />

      <h1>{profile.name}</h1>
      <p className="home-hero-definition">{homeDefinition}</p>
      <div className="home-actions">
        <Link to="/cv" className="btn btn-primary">Ver CV</Link>
        <Link to="/contacto" className="btn">Contacto</Link>
      </div>
      <p className="home-lead">{profile.summary}</p>
    </section>
  )
}

export default Hero
