import Hero from '../components/home/Hero'
import './Home.css'

// Solo compone secciones. Los textos y datos viven en src/data/.
function Home() {

  return (
    <div className="home">
      <Hero />
    </div>
  )
}

export default Home
