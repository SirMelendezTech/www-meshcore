# MeshCore Puerto Rico

Sitio del proyecto comunitario MeshCore Puerto Rico: una red mesh LoRa
descentralizada para comunicación resiliente en la isla, sin depender de
internet ni torres celulares.

Páginas (español / inglés):

- **Inicio** (`/`, `/en/`): qué es la red, guía de hardware, roles de nodo y el
  preset de radio USA/Canadá para que un usuario nuevo configure su nodo.
- **MeshCore vs Meshtastic** (`/protocolos/`, `/en/protocols/`): comparación
  de los dos protocolos.
- **Mapa** (`/mapa/`, `/en/map/`): mapa en vivo de la red, embebido desde
  [CoreScope](https://corescope.prmsh.com), con botón para abrir CoreScope.

Construido con [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com).
Publicado en GitHub Pages bajo el dominio `meshcore.prmsh.com`.

## Estructura

```text
/
├── public/              favicon, iconos, og.png, CNAME, robots.txt, sitemap.xml
├── src/
│   ├── components/
│   │   ├── Home.astro       página de inicio, compartida por todos los idiomas
│   │   ├── Protocolos.astro comparación MeshCore vs Meshtastic
│   │   ├── Mapa.astro       mapa en vivo (iframe de CoreScope)
│   │   ├── SiteHeader.astro nav: secciones del inicio y páginas aparte
│   │   ├── SiteFooter.astro
│   │   └── svelte-bits/     fondos animados (Svelte)
│   ├── i18n/
│   │   ├── ui.ts          textos traducidos (es, en), rutas por idioma, URL de CoreScope
│   │   └── protocolos.ts  textos de la página de comparación
│   ├── layouts/
│   │   └── Layout.astro   SEO (meta, Open Graph, hreflang, JSON-LD)
│   ├── pages/
│   │   ├── index.astro, protocolos/, mapa/   español (idioma por defecto, en `/`)
│   │   └── en/                               inglés (`/en/`, `/en/protocols/`, `/en/map/`)
│   └── styles/
│       └── global.css     tokens de diseño y tipografía
└── .github/workflows/deploy.yml   build + deploy a GitHub Pages
```

## Idiomas

El sitio está en español (por defecto, en `/`) e inglés (`/en/`), usando el
[i18n routing de Astro](https://docs.astro.build/en/guides/internationalization/).
Todo el texto vive en `src/i18n/ui.ts`; al cambiar un texto, actualízalo en
ambos idiomas. Para agregar otro idioma: súmalo a `languages`, `homePath`,
`protocolsPath` y `mapPath` en `ui.ts` y a `i18n.locales` en
`astro.config.mjs`, crea sus páginas en `src/pages/<código>/` y añádelas a
`public/sitemap.xml`.

## Mapa (CoreScope)

La página del mapa carga CoreScope en un iframe usando su modo embed
(`https://corescope.prmsh.com/#/map?embed=1&theme=dark`), que oculta la
navegación de CoreScope. La URL está en `coreScopeEmbedUrl` en
`src/i18n/ui.ts`. CoreScope solo permite el modo embed en `#/map` y
`#/channels`. Si CoreScope empieza a enviar `X-Frame-Options` o una CSP con
`frame-ancestors` que excluya `meshcore.prmsh.com`, el iframe dejará de cargar;
el botón "Abrir CoreScope" sigue funcionando.

## Comandos

| Comando            | Acción                                        |
| :------------------ | :--------------------------------------------- |
| `npm install`        | Instala dependencias                           |
| `npm run dev`        | Levanta el servidor local en `localhost:4321`  |
| `npm run build`      | Genera el sitio de producción en `./dist/`     |
| `npm run preview`    | Previsualiza el build antes de desplegar       |

## Despliegue

El workflow `.github/workflows/deploy.yml` construye y publica `main` a
GitHub Pages en cada push. El dominio personalizado vive en `public/CNAME`;
confirma en el repositorio de GitHub (Settings → Pages) que el registro DNS
de `meshcore.prmsh.com` apunta al Pages de este repo.

## Pendiente

- Confirmar los valores del preset "USA/Canadá" (`src/i18n/ui.ts`,
  `configura.specs` en ambos idiomas) contra el selector de la app MeshCore antes de cada
  release — los presets pueden cambiar de versión a versión.
- Revisar `/mapa/` en un navegador: ancho del nav a 1280px y que el mapa
  abra centrado en Puerto Rico (depende de la configuración de CoreScope).
- El canal público de Puerto Rico (nombre/clave) se comparte en Discord a
  propósito, no en esta página, para que nunca quede desactualizado.
