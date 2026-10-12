const REQUIRED = ['SMTP_USER', 'SMTP_PASS', 'MAIL_FROM', 'MAIL_TO']

// Falla al arrancar si falta algo, en lugar de descubrirlo en el primer envío.
export function loadConfig(env = process.env) {
  const missing = REQUIRED.filter((key) => !env[key])
  if (missing.length > 0) {
    throw new Error(`Faltan variables de entorno: ${missing.join(', ')}`)
  }

  return {
    port: Number(env.PORT ?? 3000),
    trustProxy: Number(env.TRUST_PROXY ?? 1),
    corsOrigin: env.CORS_ORIGIN || null,
    smtp: {
      host: env.SMTP_HOST ?? 'smtp.ionos.es',
      port: Number(env.SMTP_PORT ?? 465),
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
    mailFrom: env.MAIL_FROM,
    mailTo: env.MAIL_TO,
  }
}
