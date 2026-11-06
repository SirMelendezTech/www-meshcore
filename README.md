# MeshCore Puerto Rico

Portal MeshCore de la comunidad [PRMSH](https://prmsh.com/), publicado en
`meshcore.prmsh.com`. Explica qué es MeshCore, cómo viajan los mensajes,
qué hardware usar, cómo configurar el radio y dónde encontrar a la comunidad.
No es el sitio oficial del proyecto MeshCore.

Páginas (español / inglés):

- **Inicio** (`/`, `/en/`): MeshCore, cómo funciona (roles, ruteo, preset de
  radio), recursos oficiales, hardware y comunidad.
- **MeshCore y Meshtastic** (`/protocolos/`, `/en/protocols/`): comparación.
- **Mapa** (`/mapa/`, `/en/map/`): mapa en vivo embebido desde
  [CoreScope](https://corescope.prmsh.com).

Construido con [Astro](https://astro.build) y [Svelte](https://svelte.dev)
(solo para el menú móvil, el diagrama de ruteo y el texto animado del mapa).

## Sistema de diseño

La estructura viene de prmsh.com (repositorio `portada-prmsh`): tipografía,
escala, espaciado, botones, encabezado, pie, relieve y menú móvil, copiados aquí
para que cada sitio se despliegue por separado. El **color** no es el de
prmsh.com: sigue la paleta oficial de [meshcore.io](https://meshcore.io/).

| Tema   | Fondo     | Superficie | Texto     | Acción    | Azul      |
| :----- | :-------- | :--------- | :-------- | :-------- | :-------- |
| Oscuro | `#111827` | `#1f2937`  | `#f9fafb` | `#ffffff` | `#60a5fa` |
| Claro  | `#f9fafb` | `#ffffff`  | `#111827` | `#111827` | `#1d4ed8` |

- Los colores viven solo en `src/styles/tokens.css`. Los valores claros aparecen
  dos veces a propósito: preferencia del sistema y elección con el botón.
- El tema se fija antes del primer pintado (script en `Layout.astro`), se guarda
  en `localStorage` (`mcpr-theme`) y sigue al sistema hasta que la persona elige.
- `npm run terrain` regenera los dos relieves de `public/terrain/`.
- El mapa de CoreScope recibe `?theme=` y se recarga al cambiar de modo.

## Enlaces y datos

- Todos los destinos externos viven en `src/config/links.ts`.
- Todo el texto vive en `src/i18n/ui.ts` (inicio, mapa) y
  `src/i18n/protocolos.ts` (comparación). Cambia ambos idiomas.
- Los datos técnicos del inicio salen de fuentes oficiales, citadas en
  `src/i18n/ui.ts`: el preset «USA» de la lista oficial
  (`api.meshcore.nz/api/v1/config`), roles y ruteo de la
  [FAQ](https://docs.meshcore.io/faq/) y el hardware de
  [meshcore.io](https://meshcore.io/). Revísalos en cada versión de MeshCore.
- La red del mapa del inicio (`src/data/illustrative-network.ts`) es
  conceptual: lugares reales, nodos y enlaces inventados, y así lo dice el
  sitio.

## Mapa (CoreScope)

La página del mapa carga CoreScope en un iframe en modo embed
(`coreScopeEmbedUrl` en `src/config/links.ts`). CoreScope solo permite el modo
embed en `#/map` y `#/channels`. Si CoreScope empieza a enviar
`X-Frame-Options` o una CSP con `frame-ancestors` que excluya
`meshcore.prmsh.com`, el iframe dejará de cargar; el botón "Abrir CoreScope"
sigue funcionando.

## Comandos

| Comando           | Acción                                                    |
| :---------------- | :-------------------------------------------------------- |
| `npm install`     | Instala dependencias                                      |
| `npm run dev`     | Servidor local en `localhost:4321`                        |
| `npm run check`   | Revisión de tipos (`astro check`)                         |
| `npm run format`  | Formatea con Prettier (`format:check` solo revisa)        |
| `npm run build`   | Genera el sitio en `./dist/` (incluye el sitemap)         |
| `npm run preview` | Previsualiza el build                                     |
| `npm run og`      | Regenera `public/og.png` y los iconos PWA (ver el script) |
| `npm run terrain` | Regenera los relieves oscuro y claro                      |
| `npm run icons`   | Regenera `favicon.ico` y `apple-touch-icon.png`           |

## Despliegue

`.github/workflows/deploy.yml` construye y publica `main` a GitHub Pages en
cada push. El dominio vive en `public/CNAME`.
