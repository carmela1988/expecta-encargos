---
name: estilo-expecta
description: Sistema visual de la marca Expecta D.M. Úsala SIEMPRE que crees o modifiques HTML, CSS o cualquier elemento visual de la web.
---
# Estilo visual Expecta D.M.
Inspiración: taller de artista. Collage vintage de papel rasgado, grabado clásico, tinta y acuarela. Elegante, artesanal, cálido, con mucho aire. Nada de estética tecnológica, neón, degradados chillones ni sombras duras.

## Paleta (variables CSS en :root)
--papel: #EDE3D3 (fondo, papel beige cálido)
--tinta: #1E1B24 (texto y líneas)
--teja: #8E3B2C (color principal de acento: botones activos, enlaces al pasar el ratón, números, etiquetas)
--papel-claro: #F8F3EA (fondo de tarjetas, para que destaquen sobre --papel)
--arena: #E9DCC6 (fondos suaves secundarios)
--sepia: #8A4A32 (detalles)
--oro: #A8873F (detalles finos, con mucha moderación)
--rojo: #C8343A (solo pequeños acentos puntuales, nunca en bloques)
No usar azules ni lavandas.

## Tipografía (Google Fonts)
- Títulos: "Cormorant Garamond", 500–600, tamaños grandes, poco peso.
- Texto: "Lato", 400, 16–18px, interlineado 1.7.
- Nunca más de dos familias tipográficas.

## Fondo
- La cabecera usa el collage img/fondo/collage.webp (escritorio) e img/fondo/collage-movil.webp (móvil), con un fundido inferior hacia --papel.
- El resto de la página va sobre --papel liso: las obras son las protagonistas.

## Recursos visuales
- Separadores: líneas finas de 1px en --tinta con opacidad 0.2–0.3.
- Tarjetas: sin sombras duras. Como mucho, una sombra muy difusa (0 10px 30px rgba(30,27,36,0.08)).
- Botones: borde de 1px en --tinta, fondo transparente; al pasar el ratón, fondo --teja y texto --papel. Esquinas poco redondeadas (4px).
- Mucho espacio en blanco.

## Prohibido
- Imágenes generadas por IA para mostrar trabajos (la galería solo lleva obras reales).
- Personajes o diseños con derechos de autor.
- Emojis en la interfaz.
- Animaciones rápidas o llamativas: solo fundidos suaves (opacity/transform, 300–600ms) y respetar prefers-reduced-motion.
