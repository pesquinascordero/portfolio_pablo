import { Link } from 'react-router'

function NotFound() {

  return (
    <div>
      <h2>404</h2>
      <p>Esta no es la clase de ballet, vuelve a la página principal</p>
      <Link to="/">Ir a la página principal</Link>
    </div>
  )
}

export default NotFound
