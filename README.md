# Recupé Plus Landing Page

Sitio estático desarrollado con Pug, Sass BEM y JavaScript modular. Prepros es el único compilador del proyecto; Node.js se utiliza solo para publicar `public/` en GitHub Pages.

## Desarrollo con Prepros

Abre la raíz del repositorio en Prepros. `prepros.config` define cuatro entradas:

- `src/pug/pages/index.pug` → `public/index.html`
- `src/pug/pages/style-guide.pug` → `public/style-guide.html`
- `src/scss/styles.scss` → `public/styles.css`
- `src/js/index.js` → `public/index.js`

Los componentes Pug, parciales Sass y módulos JS no se compilan individualmente. Sass usa `@import`; `styles.scss` carga primero los breakpoints globales y después el resto del proyecto.

Los recursos estáticos viven en `public/assets`. Swiper y Prism se cargan desde CDN.

## Versión de CSS y JavaScript

Para invalidar la caché de los assets:

```sh
npm run build
```

El comando incrementa `assetVersion` (`1.0.0` → `1.0.1`) y sincroniza
`src/pug/data/site-data.pug`. Si Prepros está abierto, recompila las páginas y
genera referencias como `styles.css?v=1.0.1` e `index.js?v=1.0.1`.

## Integraciones pendientes de WordPress

- El selector ES/EN de la navegación está preparado para que WPML o Polylang
  reemplace sus enlaces desde `src/pug/data/main-menu-data.pug`.
- El teléfono y mensaje del botón flotante de WhatsApp se configuran en
  `src/pug/data/whatsapp-button-data.pug`. El número actual es un placeholder.

## Despliegue

```sh
npm install
npm run deploy
```

Sitio: https://kikeestradadev.github.io/recupepluslp/

## Assets pendientes

El proyecto origen incluye todas las imágenes de contenido, productos y logotipos. Solo falta `assets/img/icon_1024.png`, todavía referenciado como favicon y Apple touch icon.
