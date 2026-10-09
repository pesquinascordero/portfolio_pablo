import { Link } from 'react-router'
import './NotFound.css'

function NotFound() {

  return (
    <section className="notfound">
      <p className="notfound-code">404</p>
      <p className="notfound-text">Esta no es la clase de ballet, vuelve a la página principal</p>
      <Link to="/" className="btn btn-primary">Ir a la página principal</Link>
    </section>
  )
}

export default NotFound
