import express from 'express'
import rateLimit from 'express-rate-limit'
import { validateContact } from './validate.js'

// Construye la aplicación sin arrancarla, para poder probarla con un mailer simulado.
export function createApp({
  mailer,
  trustProxy = 1,
  corsOrigin = null,
  rateLimitOptions = {},
}) {
  const app = express()

  app.disable('x-powered-by')
  app.set('trust proxy', trustProxy)
  app.use(express.json({ limit: '10kb' }))

  if (corsOrigin) {
    app.use((req, res, next) => {
      res.set('Access-Control-Allow-Origin', corsOrigin)
      res.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
      res.set('Access-Control-Allow-Headers', 'Content-Type')
      if (req.method === 'OPTIONS') return res.sendStatus(204)
      next()
    })
  }

  const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: 'Demasiadas peticiones, inténtalo más tarde' },
    ...rateLimitOptions,
  })

  app.post('/api/contact', contactLimiter, async (req, res) => {
    const body = req.body ?? {}

    // Honeypot: un bot rellena el campo oculto "website". Respondemos OK sin enviar nada.
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      return res.json({ ok: true })
    }

    const { valid, errors, data } = validateContact(body)
    if (!valid) {
      return res.status(400).json({ error: 'Datos no válidos', fields: errors })
    }

    try {
      await mailer.sendContact(data)
      res.json({ ok: true })
    } catch (err) {
      // Registramos el detalle en el servidor, pero no lo devolvemos al cliente
      console.error('Error enviando el correo:', err.message)
      res.status(500).json({ error: 'No se pudo enviar el mensaje' })
    }
  })

  // Cuerpo JSON mal formado u otros errores de parseo
  app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed' || err.type === 'entity.too.large') {
      return res.status(err.status).json({ error: 'Petición no válida' })
    }
    next(err)
  })

  return app
}
