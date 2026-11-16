# Cómo contribuir

Gracias por ayudar a mejorar MeshCore Puerto Rico. Este sitio es un proyecto comunitario de
[PRMSH](https://prmsh.com/); no es el sitio oficial de MeshCore.

## Antes de empezar

- ¿Encontraste un dato técnico incorrecto, un enlace roto o un error de traducción? Abre un
  [issue](https://github.com/SirMelendezTech/www-meshcore/issues) con la página, lo que dice y la
  fuente que lo corrige.
- Para cambios grandes (páginas nuevas, rediseños), abre un issue primero o conversa en el
  [Discord de la comunidad](https://discord.gg/3v6rRhNRpD).

## Preparar el entorno

Necesitas Node.js 22.12 o más reciente.

```sh
npm install
npm run dev        # http://localhost:4321
```

## Reglas del proyecto

- **Dos idiomas.** Todo texto visible vive en `src/i18n/ui.ts` o `src/i18n/protocolos.ts`. Cambia
  el español y el inglés en el mismo pull request.
- **Enlaces en un solo lugar.** Toda URL externa vive en `src/config/links.ts`.
- **Datos con fuente.** Los datos técnicos salen de fuentes oficiales de MeshCore
  ([docs.meshcore.io](https://docs.meshcore.io/), [meshcore.io](https://meshcore.io/)). Cita la
  fuente en el código o en el pull request.
- **Colores** solo en `src/styles/tokens.css`, para modo claro y oscuro.
- **Accesibilidad.** Contenido usable con teclado, foco visible, texto alternativo y contraste
  suficiente en ambos temas. Los enlaces que abren pestaña nueva lo anuncian.

## Flujo de trabajo

1. Crea una rama desde `main`: `feat/…`, `fix/…`, `docs/…`.
2. Haz commits con [Conventional Commits](https://www.conventionalcommits.org/):
   `feat: …`, `fix: …`, `docs: …`, `chore: …`.
3. Antes de abrir el pull request, todo esto debe pasar:

   ```sh
   npm run check
   npm run format:check   # npm run format lo arregla
   npm run build
   ```

4. Abre el pull request contra `main` y completa la plantilla. Revisa el sitio en modo claro y
   oscuro, en escritorio y en teléfono.

Cada push a `main` publica el sitio en GitHub Pages.
