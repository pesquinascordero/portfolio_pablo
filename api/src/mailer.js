import nodemailer from 'nodemailer'

// Crea el transporte SMTP una sola vez. Con 465 la conexión es TLS desde el principio (secure: true).
export function createMailer(config) {
  const transport = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.port === 465,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass,
    },
  })

  return {
    async sendContact({ name, email, subject, message }) {
      await transport.sendMail({
        from: config.mailFrom,
        to: config.mailTo,
        // Así respondes directamente al visitante desde tu buzón
        replyTo: `${name} <${email}>`,
        subject: `[Portfolio] ${subject}`,
        text: `De: ${name} <${email}>\n\n${message}`,
      })
    },
  }
}
