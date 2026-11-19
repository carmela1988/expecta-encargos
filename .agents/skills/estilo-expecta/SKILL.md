---
name: estilo-expecta
description: Sistema visual de la marca Expecta D.M. Úsala SIEMPRE que crees o modifiques HTML, CSS o cualquier elemento visual de la web.
---
# Estilo visual Expecta D.M.
Inspiración: ilustración a tinta con plumilla y acuarela. Elegante, artesanal, con mucho aire. Nada de estética tecnológica, neón, degradados chillones ni sombras duras.

## Paleta (variables CSS en :root)
--papel: #F6F3EE (fondo, papel de acuarela cálido)
--tinta: #1E1B24 (texto y líneas)
--anil: #3B3FA8 (color principal, azul cobalto de acuarela)
--lavanda: #9C93C8 (manchas suaves y fondos secundarios)
--sepia: #8A4A32 (detalles y enlaces al pasar el ratón)
--oro: #A8873F (detalles finos, con mucha moderación)
--rojo: #C8343A (solo pequeños acentos puntuales, nunca en bloques)

## Tipografía (Google Fonts)
- Títulos: "Cormorant Garamond", 500–600, tamaños grandes, poco peso.
- Texto: "Lato", 400, 16–18px, interlineado 1.7.
- Nunca más de dos familias tipográficas.

## Recursos visuales
- Manchas de acuarela: formas orgánicas con radial-gradient suaves y un filtro SVG (feTurbulence + feDisplacementMap) para bordes irregulares. Opacidad baja (0.15–0.35), detrás del contenido.
- Separadores: líneas finas de 1px en --tinta con opacidad 0.3, o un trazo SVG irregular tipo plumilla.
- Bordes de tarjetas: sin sombras duras. Como mucho, una sombra muy difusa (0 10px 30px rgba(30,27,36,0.08)).
- Botones: borde de 1px en --tinta, fondo transparente; al pasar el ratón, fondo --anil y texto --papel. Esquinas poco redondeadas (4px).
- Mucho espacio en blanco. Las imágenes son las protagonistas.

## Prohibido
- Imágenes generadas por IA para mostrar trabajos.
- Emojis en la interfaz.
- Animaciones rápidas o llamativas: solo fundidos suaves (opacity/transform, 300–600ms) y respetar prefers-reduced-motion.
