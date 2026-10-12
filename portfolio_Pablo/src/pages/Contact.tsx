import { useState, type ChangeEvent, type FormEvent } from 'react'
import { profile } from '../data/cv'
import './Contact.css'

const links = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'Teléfono', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
  { label: 'LinkedIn', value: 'linkedin.com/in/pablo-esquinas-cordero', href: profile.linkedin },
  { label: 'GitHub', value: 'github.com/pesquinascordero', href: profile.github },
]

type FormValues = {
  name: string
  email: string
  subject: string
  message: string
  // Campo trampa: los humanos no lo ven, los bots suelen rellenarlo
  website: string
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

const initialValues: FormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '',
}

function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [status, setStatus] = useState<Status>('idle')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState('')

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setFieldErrors({})
    setServerError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await res.json().catch(() => ({}))

      if (res.ok) {
        setStatus('sent')
        setValues(initialValues)
        return
      }

      setFieldErrors(data.fields ?? {})
      setServerError(data.error ?? 'No se pudo enviar el mensaje')
      setStatus('error')
    } catch {
      setServerError('No hay conexión con el servidor. Inténtalo más tarde.')
      setStatus('error')
    }
  }

  const isSending = status === 'sending'

  return (
    <section className="contact-page">
      <p className="eyebrow">// contacto</p>
      <h2>Hablemos</h2>
      <p>Si buscas un desarrollador backend, escríbeme por el canal que prefieras.</p>

      <form className="contact-form card" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="name">Nombre</label>
          <input id="name" name="name" type="text" value={values.name} onChange={handleChange} />
          {fieldErrors.name && <p className="form-error">{fieldErrors.name}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={values.email} onChange={handleChange} />
          {fieldErrors.email && <p className="form-error">{fieldErrors.email}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="subject">Asunto</label>
          <input id="subject" name="subject" type="text" value={values.subject} onChange={handleChange} />
          {fieldErrors.subject && <p className="form-error">{fieldErrors.subject}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="message">Mensaje</label>
          <textarea id="message" name="message" rows={6} value={values.message} onChange={handleChange} />
          {fieldErrors.message && <p className="form-error">{fieldErrors.message}</p>}
        </div>

        {/* Honeypot: oculto para personas, accesible para bots */}
        <div className="hp-field" aria-hidden="true">
          <label htmlFor="website">Web</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isSending}>
          {isSending ? 'Enviando...' : 'Enviar mensaje'}
        </button>

        <div role="status" aria-live="polite">
          {status === 'sent' && <p className="form-success">Mensaje enviado. Gracias, te contesto pronto.</p>}
          {status === 'error' && serverError && <p className="form-error">{serverError}</p>}
        </div>
      </form>

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
