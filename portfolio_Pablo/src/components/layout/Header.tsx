import { NavLink } from 'react-router'
import './Layout.css'

function Header() {

  return (
    <header className="site-header">
      <nav className="site-nav">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/cv">CV</NavLink>
        <NavLink to="/proyectos">Proyectos</NavLink>
        <NavLink to="/contacto">Contacto</NavLink>
      </nav>
    </header>
  )
}

export default Header
