# Expecta D.M. · Arte por encargo

Muestrario web y catálogo interactivo de piezas artesanales por encargo creadas por la artista y tatuadora **Expecta D.M.** El proyecto exhibe sus trabajos en modelado de **Art Toys en fimo**, **ilustraciones personalizadas** a tinta, plumilla y acuarela, **bolsos intervenidos** y **cuadros**.

La web está concebida con una estética artesanal, elegante y cuidada (papel de acuarela, manchas suaves y tipografía clásica), permitiendo a los visitantes explorar las obras, filtrarlas por categoría, verlas en alta definición y solicitar su propio encargo a través de WhatsApp con mensajes directos y personalizados.

---

## Tecnologías utilizadas

- **HTML5 semántico**: Estructura accesible (`header`, `nav`, `main`, `section`, `footer`, `dialog/lightbox`), jerarquía única de encabezados (`h1`) y marcado para lectores de pantalla.
- **CSS3 encapsulado**:
  - Todo el diseño está acotado bajo la clase raíz `.expecta-encargos` para permitir su integración en cualquier CMS o web externa sin conflictos de estilos.
  - Paleta cromática oficial de Expecta D.M. mediante variables CSS (`--papel`, `--tinta`, `--anil`, `--lavanda`, `--sepia`, `--oro`, `--rojo`).
  - Tipografías Google Fonts: *Cormorant Garamond* (títulos) y *Lato* (cuerpo y botones).
  - Efectos visuales orgánicos con gradientes radiales y filtro SVG (`feTurbulence` + `feDisplacementMap`) simulando textura de acuarela.
  - Diseño *mobile-first*, adaptado a 375px (móvil), 768px (tablet) y 1280px (escritorio).
  - Soporte para accesibilidad y `prefers-reduced-motion`.
- **JavaScript (Vanilla ES6+)**:
  - Sin frameworks ni dependencias externas.
  - Lógica aislada dentro de una función autoejecutable (IIFE) para no contaminar el espacio global.
  - Renderizado dinámico de categorías y filtros en función de los trabajos existentes.
  - Visor interactivo (*lightbox*) navegable por teclado (<kbd>Esc</kbd>, <kbd>←</kbd>, <kbd>→</kbd>) y con control de foco.
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
│   ├── fimo/                        # Fotografías reales en formato WebP de Art Toys
│   └── ilustracion/                 # Fotografías reales en formato WebP de ilustraciones
├── js/
│   ├── app.js                       # Configuración y lógica interactiva de la web
│   └── trabajos.js                  # Colección de datos y trabajos expuestos
├── index.html                       # Página principal
└── README.md                        # Documentación del proyecto
```

---

## Cómo añadir un trabajo nuevo

El catálogo se alimenta de forma automática a partir del archivo [`js/trabajos.js`](js/trabajos.js). Para añadir una nueva obra, sigue estos pasos:

1. **Guarda la imagen:**
   - Optimiza la fotografía en formato **WebP** y colócala en la carpeta correspondiente (`img/fimo/`, `img/ilustracion/`, etc.).
   - Anota el ancho y alto real en píxeles de la imagen.

2. **Añade el objeto al array en `js/trabajos.js`:**
   Abre [`js/trabajos.js`](js/trabajos.js) y añade una nueva línea dentro de la constante `trabajos`:

```javascript
{
  titulo: "Art Toy Escaladora",
  categoria: "fimo",
  imagen: "img/fimo/art-toy-escaladora.webp",
  ancho: 1600,
  alto: 1600,
  descripcion: "Figura personalizada en fimo: escaladora con arnés, pies de gato y magnesera."
}
```

> **Categorías disponibles:**
> - `fimo` (Art Toys personalizados)
> - `bolsos` (Bolsos personalizados)
> - `cuadros` (Cuadros)
> - `ilustracion` (Ilustración por encargo)
> - `otros` (Otros encargos)
>
> *Nota: Si añades un trabajo de una categoría que antes no tenía obras (por ejemplo `bolsos` o `otros`), tanto su tarjeta en la sección de categorías como su botón de filtro en la galería aparecerán automáticamente.*

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

Desarrollado con ayuda de Antigravity (IA).
