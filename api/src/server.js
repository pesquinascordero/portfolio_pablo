import { loadConfig } from './config.js'
import { createMailer } from './mailer.js'
import { createApp } from './app.js'

const config = loadConfig()

const app = createApp({
  mailer: createMailer(config),
  trustProxy: config.trustProxy,
  corsOrigin: config.corsOrigin,
})

// Escucha solo en local: nginx es quien recibe el tráfico público y lo reenvía aquí.
app.listen(config.port, '127.0.0.1', () => {
  console.log(`API escuchando en 127.0.0.1:${config.port}`)
})
