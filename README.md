# MeshCore Puerto Rico

Landing page del proyecto comunitario MeshCore Puerto Rico: una red mesh LoRa
descentralizada para comunicación resiliente en la isla, sin depender de
internet ni torres celulares.

Construido con [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com).

## Estructura

```text
/
├── public/
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
└── package.json
```

## Comandos

| Comando           | Acción                                       |
| :----------------- | :-------------------------------------------- |
| `npm install`       | Instala dependencias                          |
| `npm run dev`       | Levanta el servidor local en `localhost:4321` |
| `npm run build`     | Genera el sitio de producción en `./dist/`    |
| `npm run preview`   | Previsualiza el build antes de desplegar      |

## Pendiente

- Reemplazar los enlaces placeholder (`#`) de "Unirme al chat" y "Escribir por
  correo" en `src/pages/index.astro` con los canales reales de la comunidad.
- Agregar mapa de cobertura/nodos real en la sección "Cobertura".
