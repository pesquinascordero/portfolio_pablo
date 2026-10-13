# Plan: diseño de la página de inicio

Referencia de decisiones: `.documentos/diseno-home.md`.

Cada fase termina con una comprobación en el navegador (`npm run dev`). No pasamos a la siguiente hasta que la anterior se vea bien.

## Fase 0: decisiones pendientes

- [x] Alcance: solo Home en esta fase. Las páginas CV, Proyectos y Contacto se diseñan después.
- [x] Contenido: sale del CV (`src/data/cv.ts`) y de los proyectos (`src/data/projects.ts`), no de la captura.
- [x] Foto del hero: la aporta Pablo. Está en `src/assets/pablo.jpg`, recortada en 4:5 y centrada en la cara.

## Fase 1: estructura y fondos

1. Crear un componente por sección dentro de `src/components/home/`:
   `Hero`, `About`, `Stack`, `Projects`, `ContactCta`.
2. `Home.tsx` solo compone esas piezas, en orden. Sin lógica ni textos fijos.
3. Crear el componente `GhostTitle`: título grande y tenue detrás de cada sección. Recibe el texto como prop.
4. Ajustar el espaciado vertical entre secciones.

**Comprobación:** las secciones aparecen en orden, con el texto de marcador en cada una.

## Fase 2: hero

1. Layout de dos columnas: texto a la izquierda, foto a la derecha.
2. Titular con el nombre y el rol, de `profile` en `cv.ts`. La segunda línea en `--neon-pink`.
3. Frase de presentación y botones «Ver proyectos» (a `/proyectos`) y «Ver CV» (a `/cv`).
4. Foto: si hay imagen, se usa; si no, un bloque con borde y un texto de marcador.
5. En móvil, la foto va debajo del texto.

**Comprobación:** en escritorio, texto y foto se ven a la vez; en móvil, no hay scroll horizontal.

## Fase 3: sobre mí y stack

1. «Sobre mí»: el resumen de `profile.summary` a la derecha, cuatro tarjetas numeradas a la izquierda.
2. Las cuatro tarjetas son textos nuevos y cortos, escritos a partir del CV (backend y APIs, bases de datos, CI/CD y cloud, testing). Van en `src/data/home.ts`, no en el JSX.
3. Iconos: SVG en línea, sin librerías nuevas.
4. Stack: cuatro columnas con las categorías de `skills` en `cv.ts`. En móvil, una columna.

**Comprobación:** las tarjetas tienen número, icono y texto; el stack sale de `cv.ts`.

## Fase 4: proyectos destacados

1. Lista numerada con una flecha en cada fila, con los tres primeros de `projects` en `projects.ts`.
2. Botón «Ver todos los proyectos» a `/proyectos`.

**Comprobación:** la lista muestra tres proyectos y los enlaces funcionan.

## Fase 5: cierre y footer

1. Bloque final con una frase de invitación, botón a `/contacto` y los enlaces de `profile` (email, LinkedIn, GitHub). Los enlaces externos se abren en pestaña nueva.
2. Footer con el año y el nombre.

**Comprobación:** los enlaces abren bien y el botón lleva a `/contacto`.

## Fase 6: revisión

1. Revisar la paleta: que no haya colores fuera de las variables.
2. Revisar móvil (anchura estrecha) y escritorio.
3. Comprobar que el contenido sale de `src/data/`.
4. Compilar con `npm run build` y corregir errores. Lo ejecuta Pablo, porque el build no se lanza tras cada cambio.
5. Renombrar `--neon-cyan` y `--neon-pink` a `--accent` y `--accent-2`, si la paleta queda cerrada.

**Comprobación:** build sin errores y la página se ve bien en las dos anchuras.

## Fase 7: versión 2, más parecida a la referencia

Hecha tras revisar la primera versión con la captura de referencia.

1. Tipografía: Space Grotesk para títulos e Inter para texto. Se quitan los brillos de neón de los títulos.
2. Cabecera: logo «PE» a la izquierda y menú centrado.
3. Hero: titular en dos líneas con palabras en acento, línea de tecnologías debajo de los botones.
4. Sobre mí: tarjetas transparentes con borde fino, con icono y número, y título «¿Quién soy?».
5. Stack: cuatro columnas con cabecera subrayada, sin tarjetas de fondo.
6. Proyectos: título centrado y filas con flecha circular, que llevan a `/proyectos`.
7. Contacto: bloque centrado con el email grande, botón al formulario y enlaces a LinkedIn y GitHub.

**Comprobación:** la página se parece a la referencia en composición, con el contenido del CV y sin imágenes ni textos copiados.

**Pendiente:** foto del hero (ver fase 0).

## Fuera de este plan

- Diseño de las páginas CV, Proyectos y Contacto. Aquí entra la línea de tiempo de experiencia y formación.
- Animaciones de entrada al hacer scroll.
