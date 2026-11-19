# Expecta D.M. · Arte por encargo

Muestrario web y catálogo interactivo de piezas artesanales por encargo creadas por la artista y tatuadora **Expecta D.M.** El proyecto exhibe sus trabajos en modelado de **Art Toys en fimo**, **cuadros**, **ilustraciones personalizadas** y **otros encargos** (como maquetas y miniaturas).

La web está concebida con una estética artesanal, elegante y cuidada, permitiendo a los visitantes explorar las obras, filtrarlas por categoría, verlas en alta definición y solicitar su propio encargo a través de WhatsApp con mensajes directos y personalizados.

---

## Tecnologías utilizadas

- **HTML5 semántico**: Estructura accesible (`header`, `nav`, `main`, `section`, `footer`, `dialog/lightbox`), jerarquía única de encabezados (`h1`) y marcado para lectores de pantalla.
- **CSS3 encapsulado**:
  - Todo el diseño está acotado bajo la clase raíz `.expecta-encargos` para permitir su integración en cualquier CMS o web externa sin conflictos de estilos.
  - Paleta cromática oficial de Expecta D.M. mediante variables CSS (`--papel`, `--tinta`, `--anil`, `--lavanda`, `--sepia`, `--oro`, `--rojo`).
  - Tipografías Google Fonts: *Cormorant Garamond* (títulos) y *Lato* (cuerpo y botones).
  - Diseño *mobile-first*, adaptado a 375px (móvil), 768px (tablet) y 1280px (escritorio).
  - Soporte para accesibilidad y `prefers-reduced-motion`.
- **JavaScript (Vanilla ES6+)**:
  - Sin frameworks ni dependencias externas.
  - Lógica aislada dentro de una función autoejecutable (IIFE) para no contaminar el espacio global.
  - Renderizado dinámico de categorías y filtros en función de los trabajos existentes.
  - **Carrusel de fotos por trabajo en la galería**: Si un trabajo cuenta con varias imágenes, la tarjeta incluye flechas de navegación accesibles, contador de fotos y soporte para gestos táctiles (*swipe*).
  - **Visor interactivo (*lightbox*) con zoom**: Permite recorrer las fotos de la obra seleccionada (con flechas en pantalla, teclado <kbd>←</kbd> <kbd>→</kbd> y *swipe* móvil) y ampliar detalles hasta el 250% centrado en el punto pulsado, con desplazamiento por arrastre (*pan*) y rueda del ratón.
  - Integración segura con la API de WhatsApp (`wa.me`) con codificación mediante `encodeURIComponent`.

---

## Estructura del proyecto

```text
expecta-encargos/
├── .agents/
│   └── skills/
│       ├── estilo-expecta/SKILL.md  # Directrices visuales y paleta cromática
│       ├── voz-expecta/SKILL.md     # Pautas de tono, redacción y textos
│       └── revision-web/SKILL.md    # Checklist de calidad y accesibilidad
├── css/
│   └── estilos.css                  # Estilos completos encapsulados en .expecta-encargos
├── img/
│   ├── cuadros/                     # Fotografías en formato WebP de cuadros
│   ├── fimo/                        # Fotografías en formato WebP de Art Toys
│   ├── ilustracion/                 # Fotografías en formato WebP de ilustraciones
│   ├── otros/                       # Fotografías en formato WebP de maquetas y miniaturas
│   └── sobre-mi/                    # Fotografía de Expecta D.M.
├── js/
│   ├── app.js                       # Configuración y lógica interactiva de la web
│   └── trabajos.js                  # Colección de datos y trabajos expuestos
├── index.html                       # Página principal
└── README.md                        # Documentación del proyecto
```

---

## Cómo añadir un trabajo nuevo

El catálogo se alimenta de forma automática a partir del archivo [`js/trabajos.js`](js/trabajos.js). Para añadir una nueva obra, sigue estos pasos:

1. **Guarda las imágenes:**
   - Optimiza las fotografías en formato **WebP** y colócalas en la carpeta correspondiente (`img/fimo/`, `img/cuadros/`, `img/ilustracion/`, `img/otros/`, etc.).
   - Anota el ancho y alto real en píxeles de cada imagen.

2. **Añade el objeto al array en `js/trabajos.js`:**
   Abre [`js/trabajos.js`](js/trabajos.js) y añade una nueva entrada dentro de la constante `trabajos`:

```javascript
{
  titulo: "Art Toy Escaladora",
  categoria: "fimo",
  descripcion: "Figura personalizada en fimo: escaladora con arnés, pies de gato y magnesera.",
  imagenes: [
    { src: "img/fimo/escaladora/01-frente.webp", ancho: 1200, alto: 1600, alt: "Art Toy de escaladora de frente con pies de gato y magnesera" },
    { src: "img/fimo/escaladora/02-detalle.webp", ancho: 1200, alto: 1600, alt: "Detalle de los pies de gato y el arnés" }
  ]
}
```

> **Detalles sobre las imágenes:**
> - La **primera imagen** del array `imagenes` se utiliza como **portada** en la galería y en las tarjetas de categoría.
> - Si el trabajo tiene **más de una imagen**, la tarjeta de la galería mostrará automáticamente flechas discretas de navegación y un contador (`1 / N`), permitiendo recorrerlas antes de abrir el visor.

> **Categorías disponibles:**
> - `fimo` (Art Toys personalizados)
> - `bolsos` (Bolsos personalizados)
> - `cuadros` (Cuadros)
> - `ilustracion` (Ilustración por encargo)
> - `otros` (Otros encargos)
>
> *Nota: Si añades un trabajo de una categoría que antes no tenía obras (por ejemplo `bolsos`), tanto su tarjeta en la sección de categorías como su botón de filtro en la galería aparecerán automáticamente.*

---

## Publicación en GitHub Pages

Para publicar este proyecto de forma gratuita mediante GitHub Pages:

1. Asegúrate de haber subido todos los cambios a la rama principal (`main`) en tu repositorio de GitHub:
   ```bash
   git add .
   git commit -m "Publica versión inicial de la web"
   git push origin main
   ```
2. Entra a tu repositorio en GitHub desde el navegador.
3. Dirígete a la pestaña **Settings** (Configuración) > **Pages** (en el menú lateral izquierdo).
4. En el apartado **Build and deployment**:
   - **Source:** Selecciona *Deploy from a branch*.
   - **Branch:** Selecciona `main` y en la carpeta elige `/ (root)`.
   - Haz clic en **Save**.
5. En unos instantes, GitHub Pages te facilitará la URL pública (por ejemplo: `https://carmela1988.github.io/expecta-encargos/`).

---

## Autoría
Desarrollado por [Carmen](https://github.com/carmela1988) como proyecto de portfolio, con ayuda de Google Antigravity (IA).
Todas las obras y fotografías son de Expecta D.M. y no pueden usarse sin su permiso.
