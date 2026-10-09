# MeshCore Puerto Rico

Landing page del proyecto comunitario MeshCore Puerto Rico: una red mesh LoRa
descentralizada para comunicación resiliente en la isla, sin depender de
internet ni torres celulares. Incluye guía de hardware y el preset de radio
USA/Canadá para que un usuario nuevo pueda configurar su nodo.

Construido con [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com).
Publicado en GitHub Pages bajo el dominio `meshcore.prmsh.com`.

## Estructura

```text
/
├── public/              favicon, iconos, og.png, CNAME, robots.txt, sitemap.xml
├── src/
│   ├── layouts/
│   │   └── Layout.astro   SEO (meta, Open Graph, JSON-LD)
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css     tokens de diseño y tipografía
└── .github/workflows/deploy.yml   build + deploy a GitHub Pages
```

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

- Confirmar los valores del preset "USA/Canadá" (`src/pages/index.astro`,
  sección `configura`) contra el selector de la app MeshCore antes de cada
  release — los presets pueden cambiar de versión a versión.
- El canal público de Puerto Rico (nombre/clave) se comparte en Discord a
  propósito, no en esta página, para que nunca quede desactualizado.
