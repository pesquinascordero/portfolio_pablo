import { profile } from '../data/cv'
import './Contact.css'

const links = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'Teléfono', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
  { label: 'LinkedIn', value: 'linkedin.com/in/pablo-esquinas-cordero', href: profile.linkedin },
  { label: 'GitHub', value: 'github.com/pesquinascordero', href: profile.github },
]

function Contact() {

  return (
    <section className="contact-page">
      <p className="eyebrow">// contacto</p>
      <h2>Hablemos</h2>
      <p>Si buscas un desarrollador backend, escríbeme por el canal que prefieras.</p>

      <ul className="contact-list">
        {links.map((link) => (
          <li key={link.label} className="card contact-item">
            <span className="contact-label">{link.label}</span>
            <a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
              {link.value}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Contact
