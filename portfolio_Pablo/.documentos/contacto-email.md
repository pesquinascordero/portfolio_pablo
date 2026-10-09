# Formulario de contacto por email

Estado: decidido (opción C), con Node/Express como lenguaje del servicio. Los mensajes llegan a `pesquinascordero@gmail.com`.

Written for: el propio Pablo, como referencia del proyecto.

## Decisión

El formulario de la página de Contacto envía los datos a un **endpoint propio** en el VPS, que reenvía el mensaje por SMTP de IONOS a un buzón del dominio.

```
Visitante → React (POST /api/contact) → nginx → servicio en el VPS → SMTP de IONOS → buzón
```

### Por qué no el navegador directamente

Un SMTP necesita usuario y contraseña. Si estuvieran en el frontend, cualquiera podría verlos en las herramientas de desarrollador. Las credenciales viven solo en el servidor.

### Alternativas descartadas (por ahora)

- **`mailto:`**: depende del cliente de correo del visitante y no envía nada desde la web.
- **Formspree / Web3Forms / EmailJS**: válidos como plan de transición, pero los mensajes pasan por un tercero y no controlamos el remitente.

## Servicio

- Lenguaje y framework: **Node.js con Express**. Node 22 LTS, ya instalado en el VPS.
- Librería de envío: **Nodemailer**, que habla SMTP y gestiona TLS.
- Carpeta en el repo: `api/`, separada de la web (`portfolio_Pablo/`).

## Buzón de recepción

- Los mensajes del formulario llegan a `pesquinascordero@gmail.com`.

## Cuenta de envío

- Dirección: `automatizaciones@pabloesquinas.es`
- Contraseña: **no se guarda en este repositorio ni en este documento**. Se introduce en `/etc/portfolio-api.env` del VPS (fase 5 del plan).
- Usuario SMTP: la dirección completa.
- Remitente: solo se aceptan remitentes del mismo dominio que la cuenta (regla desde el 29/01/2024). Como `pabloesquinas.es` es el dominio de la cuenta, está bien.

## Datos de IONOS

### Entrante (confirmado por el panel de IONOS)

| Tipo | Servidor | Puerto | Cifrado |
|------|----------|--------|---------|
| IMAP | `imap.ionos.es` | 993 | SSL/TLS |
| POP3 | `pop.ionos.es` | 995 | SSL/TLS |

No usamos el entrante para el formulario. Solo sirve como referencia.

### Saliente (SMTP): confirmado por el panel de IONOS

| Servidor | Puerto | Cifrado |
|----------|--------|---------|
| `smtp.ionos.es` | 465 | SSL/TLS |

- Usuario: la dirección de correo completa (`automatizaciones@pabloesquinas.es`).
- Contraseña: la de ese buzón concreto.
- Si el puerto 465 estuviera bloqueado, la documentación de IONOS sugiere el 587 con STARTTLS. Lo comprobaremos en la fase 2 del plan.

Comprobado desde el VPS (fase 2): `smtp.ionos.es:465` responde `220` sobre TLS. El certificado incluye `smtp.ionos.es` en su SAN, así que la validación del host no fallará en Node.

Nota: la documentación pública que consulté menciona `smtp.ionos.com`. El panel de tu cuenta indica `smtp.ionos.es`, así que usamos el de tu panel.

Fuentes:
- [IONOS Mail Server details for IMAP, POP3 and SMTP](https://www.ionos.com/help/email/general-topics/ionos-mail-server-details-for-imap-pop3-and-smtp/)
- [Settings for your email programs (IMAP/POP3)](https://www.ionos.com/help/email/general-topics/settings-for-your-email-programs-imap-pop3/)

## Cuentas de correo

- Usaremos **una cuenta dedicada al envío** (por ejemplo `noreply@<dominio>`), y los mensajes llegarán a tu buzón personal.
- Así la contraseña de envío es distinta de la que usas a diario y puedes rotarla sin afectar a tu correo.
- IONOS permite hasta 5 cuentas con el plan actual. Esta es una de ellas.

## Seguridad

- Ninguna credencial en el repositorio. Van en un fichero de entorno del VPS (`/etc/portfolio-api.env`, permisos 600).
- `.env` y cualquier fichero de credenciales en `.gitignore`.
- El endpoint valida todos los campos en el servidor, aunque el frontend ya los valide.
- Rate limiting en nginx o en el servicio, para que no se use para enviar spam desde el dominio.
- Campo trampa (*honeypot*) en el formulario. Un captcha invisible queda como mejora posterior.

## Fuentes de verdad

- Plan de ejecución: `.planes/contacto-email.md`.
- Este documento recoge decisiones y datos. El plan recoge los pasos.
