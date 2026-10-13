import { NavLink } from 'react-router'
import { profile } from '../../data/cv'
import './Layout.css'

function Header() {

  return (
    <header className="site-header">
      <div className="site-bar">
        <NavLink to="/" end className="site-brand">{profile.name.replace(' Cordero', '')}</NavLink>
        <nav className="site-nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/cv">CV</NavLink>
          <NavLink to="/proyectos">Proyectos</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
