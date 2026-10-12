import { describe, it, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import { createApp } from '../src/app.js'

const validPayload = {
  name: 'Ana Pérez',
  email: 'ana@example.com',
  subject: 'Oferta de trabajo',
  message: 'Hola Pablo, me gustaría hablar sobre una posición backend.',
}

// Mailer simulado: registra lo que se enviaría sin tocar SMTP
function fakeMailer({ fail = false } = {}) {
  return {
    sent: [],
    async sendContact(data) {
      if (fail) throw new Error('SMTP caído')
      this.sent.push(data)
    },
  }
}

describe('POST /api/contact', () => {
  let server
  let baseUrl
  let mailer

  function start(options = {}) {
    mailer = fakeMailer(options.mailer)
    const app = createApp({ mailer, rateLimitOptions: options.rateLimit })
    return new Promise((resolve) => {
      server = app.listen(0, '127.0.0.1', () => {
        baseUrl = `http://127.0.0.1:${server.address().port}`
        resolve()
      })
    })
  }

  // Sin cerrar el servidor y sus conexiones keep-alive, node --test no termina
  afterEach(() => new Promise((resolve) => {
    server.closeAllConnections()
    server.close(resolve)
  }))

  function post(body) {
    return fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    })
  }

  it('envía el correo y responde 200 con datos válidos', async () => {
    await start()
    const res = await post(validPayload)

    assert.equal(res.status, 200)
    assert.deepEqual(await res.json(), { ok: true })
    assert.equal(mailer.sent.length, 1)
    assert.equal(mailer.sent[0].email, 'ana@example.com')
  })

  it('responde 400 con los campos que fallan', async () => {
    await start()
    const res = await post({ ...validPayload, email: 'no-es-un-email' })

    assert.equal(res.status, 400)
    const body = await res.json()
    assert.ok(body.fields.email)
    assert.equal(mailer.sent.length, 0)
  })

  it('rechaza saltos de línea en el asunto (inyección de cabeceras)', async () => {
    await start()
    const res = await post({
      ...validPayload,
      subject: 'Hola\r\nBcc: spam@example.com',
    })

    assert.equal(res.status, 400)
    assert.ok((await res.json()).fields.subject)
    assert.equal(mailer.sent.length, 0)
  })

  it('finge éxito cuando el honeypot viene relleno, sin enviar nada', async () => {
    await start()
    const res = await post({ ...validPayload, website: 'http://spam.example' })

    assert.equal(res.status, 200)
    assert.equal(mailer.sent.length, 0)
  })

  it('responde 500 sin revelar el error interno si SMTP falla', async () => {
    await start({ mailer: { fail: true } })
    const res = await post(validPayload)

    assert.equal(res.status, 500)
    const body = await res.json()
    assert.equal(body.error, 'No se pudo enviar el mensaje')
    assert.doesNotMatch(JSON.stringify(body), /SMTP caído/)
  })

  it('responde 400 con JSON mal formado', async () => {
    await start()
    const res = await post('{"name": ')

    assert.equal(res.status, 400)
    assert.equal((await res.json()).error, 'Petición no válida')
  })

  it('aplica rate limit y responde 429 al exceder el límite', async () => {
    await start({ rateLimit: { limit: 1 } })

    const first = await post(validPayload)
    const second = await post(validPayload)

    assert.equal(first.status, 200)
    assert.equal(second.status, 429)
  })
})
