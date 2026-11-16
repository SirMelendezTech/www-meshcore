# AGENTS.md

MeshCore Puerto Rico (`meshcore.prmsh.com`): a static, bilingual (Spanish first, English second)
community site built with Astro, with Svelte islands. Read `README.md` for the page list, design
system and commands; read `CONTRIBUTING.md` for the branch, commit and pull request flow.

## Development

Start the dev server in background mode:

```
astro dev --background
```

Manage it with `astro dev stop`, `astro dev status` and `astro dev logs`.

A change is done when `npm run check`, `npm run format:check` and `npm run build` all pass.

## Conventions

- **Links**: every external URL lives in `src/config/links.ts`. Add a `LinkId` and a destination
  there, then render it with `linkAttrs(id)` (or `linkHtml` inside translated copy).
- **Copy**: every visible string lives in `src/i18n/ui.ts` or `src/i18n/protocolos.ts`. Edit the
  Spanish and English blocks together; the `ui` type keeps both locales the same shape.
- **New tab**: a link that opens a new tab carries visually hidden `t.a11y.newTab` text after its
  label, so screen readers announce it.
- **Icons**: brand logos come from `simple-icons` as inline `<svg aria-hidden="true">`; the
  surrounding link or button carries the accessible name.
- **Color**: tokens live only in `src/styles/tokens.css`. Light values appear twice on purpose
  (system preference and the theme button); change both.
- **Mobile navigation**: below `80rem` the header nav is replaced by `MobileNav.svelte`. A new
  header link must also reach that menu (`items`, `secondary` or `cta`).
- **Facts**: technical data (radio preset, roles, routing, hardware) comes from the official
  MeshCore sources cited in `src/i18n/ui.ts`. Cite the source next to any new fact.

## Documentation

Astro docs: https://docs.astro.build. Consult the matching guide before working on:

- [Routing, pages, middleware](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Svelte and other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Styling](https://docs.astro.build/en/guides/styling/)
- [Internationalization](https://docs.astro.build/en/guides/internationalization/)
