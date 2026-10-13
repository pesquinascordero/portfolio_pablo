# Diseño de la página de inicio (Home)

Estado: propuesta confirmada en alcance. Pendiente: foto del hero.

Written for: el propio Pablo, como referencia del proyecto.

## Objetivo

Que la página de inicio tenga un diseño **propio**, con el estilo visual de referencia (oscuro, un acento, secciones claras) y **el contenido de tu CV**.

**Versión 2 (vigente):** la composición de la página debe parecerse mucho a la captura de referencia: cabecera con logo a la izquierda y menú centrado, titular grande en dos líneas con palabras en acento, tarjetas transparentes con borde fino, columnas para el stack, filas de proyectos con flecha circular y bloque de contacto centrado.

Lo que **no** se copia de la referencia: imágenes, textos, nombre de la persona, botón «Get Resume», blog y cualquier sección fuera de las cuatro páginas de la web. Todo el contenido sale de tu CV, tus proyectos y tu foto.

Si una sección de la captura no encaja con tu web, la quitamos.

## Alcance del sitio

La web tiene cuatro páginas, y solo cuatro:

| Ruta | Página | Qué contiene |
|------|--------|--------------|
| `/` | Home | Presentación y resumen |
| `/cv` | CV | Todo el currículum: experiencia, formación, habilidades, idiomas |
| `/proyectos` | Proyectos | Lista completa de proyectos |
| `/contacto` | Contacto | Formulario y enlaces |

No añadimos blog ni página de descarga de CV, aunque aparezcan en la referencia.

## Paleta (decidida)

| Uso | Color |
|-----|-------|
| Fondo | `#0c0d15` |
| Superficies (tarjetas) | `#161a2c` |
| Acento principal | `#6366f1` |
| Acento secundario | `#818cf8` |
| Texto | `#aab1cc` |
| Títulos | `#eef0ff` |

Estos valores ya están aplicados en `src/index.css`.

## Tipografía (versión 2)

| Uso | Fuente |
|-----|--------|
| Títulos | Space Grotesk |
| Texto | Inter |
| Etiquetas técnicas y menú | JetBrains Mono |

Orbitron se ha retirado: era demasiado de ciencia ficción para el estilo de referencia. Los brillos de neón de los títulos también se han quitado.

## Cabecera

Nombre «Pablo Esquinas» a la izquierda y enlaces a la derecha (Home, CV, Proyectos, Contacto). Sin botón de descarga de CV.

## Hero (decidido por Pablo)

De arriba abajo, en la columna de texto (izquierda, en escritorio):

1. Nombre completo: «Pablo Esquinas Cordero».
2. Definición breve de la actividad.
3. Dos botones: «Ver CV» y «Contacto».
4. Descripción larga de quién eres, tomada del perfil del CV.

La foto va arriba, en color, sin marco. Usa `src/assets/pablo-cutout.png`: la foto original (`pablo.jpg`) con el fondo blanco quitado, de forma que la persona se funde con el fondo de la página. Un degradado en la parte inferior evita el corte de los brazos.

El recorte se hizo con un script local (Pillow) que marca como fondo el blanco gris conectado con los bordes de la imagen. Los bordes del pelo tienen un ligero halo: si se nota, se puede repetir con una herramienta como remove.bg.

**Disposición**: todo centrado, en una sola columna. Pablo prefirió esta versión a la de dos columnas.

Sin fondo de rejilla: se quitó del `body`, así que no aparece en ninguna página.

## Estructura de Home

De arriba abajo, con el contenido de tu CV:

1. **Hero**: nombre completo, definición breve, botones «Ver CV» y «Contacto», y descripción larga. Detalle en la sección «Hero» de más abajo. Foto a la derecha.
2. **Título de fondo «SOBRE MÍ»**: palabra grande y tenue detrás de la sección.
3. **Sobre mí**: el resumen de tu perfil profesional, y cuatro tarjetas numeradas (01 a 04) con las áreas que más destacas: backend y APIs, bases de datos, CI/CD y cloud, testing. Botón a `/cv`.
4. **Título de fondo «STACK»**.
5. **Stack**: cuatro columnas con las categorías de habilidades de `src/data/cv.ts`.
6. **Título de fondo «PROYECTOS»**.
7. **Proyectos destacados**: lista numerada con una flecha por fila, con los tres primeros de `src/data/projects.ts`. Botón a `/proyectos`.
8. **Cierre**: frase de invitación y botón a `/contacto`, más los enlaces a email, LinkedIn y GitHub.
9. **Footer**: año y nombre.

### Qué sale de la referencia y dónde va

- **«Experience & Education» (línea de tiempo)** no va a Home. Es contenido de la página de **CV**, que se diseñará en otra fase.
- **Botón «Get Resume»** y **«Blog»** no se añaden.
- **Textos en inglés** de la captura se traducen al español. Los títulos de fondo también.

## Cambios decididos por Pablo (última ronda)

- **Home queda con tres bloques**: hero, proyectos destacados y contacto. Se quitan «Sobre mí» (tarjetas y texto de la derecha) y «Stack técnico», de momento. Los componentes `About` y `Stack` se han eliminado.
- **Cabecera centrada en una fila**: el nombre «Pablo Esquinas» va justo a la izquierda de los enlaces (Home, CV, Proyectos, Contacto), y el conjunto va centrado.

## Decisiones abiertas

- **Foto del hero**: ¿la pasas (en `src/assets/`) o dejamos un bloque preparado con un texto de marcador?
- **Nombres de las variables**: `--neon-cyan` y `--neon-pink` siguen existiendo, aunque ahora son índigo. Se renombran al cerrar la paleta.

## Qué no cambia

- El formulario de contacto y la API.
- Los datos: el contenido sale de `src/data/`, no del JSX.
- Las rutas y el menú superior.

## Criterios de aceptación

- Home tiene las secciones de la estructura, en ese orden, con el texto de tu CV.
- No aparece ninguna sección de la referencia que no esté en la lista anterior.
- Se lee bien en escritorio y en móvil, sin scroll horizontal.
- El contenido sale de los ficheros de datos, no está escrito a mano en los componentes.
- No hay colores fuera de la paleta.
- El build (`npm run build`) pasa sin errores antes de publicar.

Plan de ejecución: `.planes/diseno-home.md`.
