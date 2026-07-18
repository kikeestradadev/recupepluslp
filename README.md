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

## Despliegue

```sh
npm install
npm run deploy
```

Sitio: https://kikeestradadev.github.io/recupepluslp/

## Assets pendientes

El proyecto origen incluye todas las imágenes de contenido, productos y logotipos. Solo falta `assets/img/icon_1024.png`, todavía referenciado como favicon y Apple touch icon.
