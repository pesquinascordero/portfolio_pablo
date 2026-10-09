const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LINE_BREAK = /[\r\n]/

const TEXT_RULES = {
  name: { min: 2, max: 100 },
  subject: { min: 3, max: 150 },
  message: { min: 10, max: 5000 },
}

// Valida y normaliza el cuerpo de la petición. Nunca confía en lo que llega del frontend.
export function validateContact(body) {
  const errors = {}
  const data = {}

  for (const [field, { min, max }] of Object.entries(TEXT_RULES)) {
    const value = typeof body[field] === 'string' ? body[field].trim() : ''
    data[field] = value

    if (value.length < min || value.length > max) {
      errors[field] = `Debe tener entre ${min} y ${max} caracteres`
    } else if (field !== 'message' && LINE_BREAK.test(value)) {
      // Evita inyección de cabeceras SMTP a través de saltos de línea
      errors[field] = 'No puede contener saltos de línea'
    }
  }

  const email = typeof body.email === 'string' ? body.email.trim() : ''
  data.email = email
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Email no válido'
  }

  return { valid: Object.keys(errors).length === 0, errors, data }
}
