# Plan: formulario de contacto por email

Referencia de decisiones: `.documentos/contacto-email.md`.

Cada fase termina con una comprobación. No pasamos a la siguiente hasta que la anterior funcione.

## Fase 0: decisiones pendientes

- [x] Lenguaje del servicio: **Node/Express**.
- [x] Cuenta de envío: `automatizaciones@pabloesquinas.es`.
- [x] Cuenta que recibe los mensajes: `pesquinascordero@gmail.com`.
- [x] Host SMTP confirmado por el panel: `smtp.ionos.es`, puerto 465, SSL/TLS.

## Fase 1: crear la cuenta en IONOS (manual, lo haces tú)

Los pasos exactos de la interfaz pueden cambiar. Revisa lo que ves en tu panel.

1. Entra en el panel de IONOS y localiza el **dominio** que vas a usar.
2. Abre la sección de **correo electrónico** asociada al dominio.
3. Crea la cuenta de envío (`noreply@<dominio>`) y define una contraseña fuerte. Guárdala en un gestor de contraseñas, no en el repositorio.
4. Crea o confirma la cuenta que recibirá los mensajes.
5. Entra en el webmail de IONOS con la cuenta de envío para comprobar que la contraseña funciona.

**Comprobación:** puedes iniciar sesión en el webmail con la cuenta de envío.

## Fase 2: comprobar SMTP desde el VPS

**Estado: completada.** Desde el VPS, `smtp.ionos.es:465` responde `220 ... ESMTP` sobre TLS. El certificado incluye `smtp.ionos.es` en su SAN, así que Nodemailer validará el host sin `rejectUnauthorized: false`.

Antes de escribir código, confirmamos que el VPS puede hablar con IONOS.

1. Desde el VPS, prueba la conexión al puerto 465:
   ```bash
   openssl s_client -connect smtp.ionos.com:465 -quiet
   ```
   Debe mostrar un banner `220 ...`. Sal con `QUIT`.
2. Si el 465 falla, prueba el 587 con STARTTLS:
   ```bash
   openssl s_client -starttls smtp -connect smtp.ionos.com:587
   ```
3. Envía un correo de prueba con las credenciales. Lo haremos con una herramienta de línea de comandos o desde el propio servicio en la fase 3.

**Comprobación:** el VPS completa la conexión y el correo de prueba llega a tu buzón.

## Fase 3: servicio del endpoint

Lenguaje según la decisión de la fase 0.

1. Crear el proyecto del servicio en el repositorio, en una carpeta propia (por ejemplo `api/`).
2. Implementar `POST /api/contact` con:
   - Validación de nombre, email, asunto y mensaje (longitud máxima, formato de email).
   - Honeypot: si el campo trampa viene relleno, responder OK sin enviar nada.
   - Lectura de credenciales desde variables de entorno.
   - Envío por SMTP a `smtp.ionos.com` (465 SSL o 587 STARTTLS).
3. Rate limiting por IP.
4. Respuestas claras: 200 si se envía, 400 si la validación falla, 429 si hay demasiadas peticiones, 500 si SMTP falla (sin revelar detalles).
5. Tests del endpoint con la cuenta de envío **simulada** (sin mandar correos reales en los tests).

**Estado:** código y tests completados en `api/` (7 tests en verde, con mailer simulado). Pendiente la prueba con correo real: crear `api/.env` a partir de `api/.env.example`, poner la contraseña de la cuenta de envío, arrancar con `npm start` y lanzar un `curl` de prueba.

**Comprobación:** los tests pasan y, con una petición manual con `curl`, llega un correo real a tu buzón.

## Fase 4: formulario en React

1. Añadir el formulario en `src/pages/Contact.tsx`, con estilos en `Contact.css`.
2. Campos: nombre, email, asunto, mensaje, y el campo trampa oculto.
3. Estados: enviando, enviado, error. Sin recargar la página.
4. Llamar a `/api/contact` con `fetch`.
5. Validación en el cliente para dar feedback rápido, sabiendo que el servidor es quien manda.

**Comprobación:** en local, el formulario envía y muestra el estado correcto en cada caso.

## Fase 5: despliegue en el VPS

1. Ubicar el servicio en el VPS y crear un usuario de sistema para ejecutarlo.
2. Crear `/etc/portfolio-api.env` con las credenciales, permisos 600 y propiedad del usuario del servicio.
3. Crear una unidad de systemd para el servicio, con reinicio automático.
4. Configurar **Caddy** (el servidor web del VPS): `handle /api/*` con `reverse_proxy 127.0.0.1:3000`, y para el resto de rutas `try_files {path} /index.html` dentro de `file_server`. Validar la configuración con `caddy validate` antes de recargar.
5. Actualizar `deploy.sh` para reiniciar el servicio tras desplegar la web.

**Comprobación:** `curl https://<dominio>/api/contact` con una petición válida devuelve 200 y llega el correo.

## Fase 6: entregabilidad

Que los correos no acaben en spam.

1. En el DNS del dominio, revisar los registros **SPF**, **DKIM** y **DMARC** que IONOS indica para el correo.
2. Enviar un correo de prueba a una cuenta externa (Gmail) y revisar la cabecera del mensaje.

**Comprobación:** el correo llega a la bandeja de entrada y no a spam.

## Fuera de este plan (mejoras futuras)

- Captcha invisible (Cloudflare Turnstile o hCaptcha).
- Copia de los mensajes en base de datos.
- Respuesta automática de confirmación al visitante.
