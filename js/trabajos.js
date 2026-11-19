// js/trabajos.js — cada objeto es UN trabajo de la galería.
// "imagenes" es una lista: la primera es la portada; si hay más de una,
// la tarjeta muestra flechas para pasarlas y el visor las enseña todas.
const trabajos = [
  {
    titulo: "Art Toy Tete",
    categoria: "fimo",
    descripcion: "Figura personalizada en fimo: esquiador con mochila, esquís y bastones.",
    imagenes: [
      { src: "img/fimo/art-toy-tete.webp", ancho: 1024, alto: 1024, alt: "Art Toy de fimo de Tete, esquiador con mochila naranja y esquís a la espalda" },
    ],
  },
  {
    titulo: "Art Toy Aurora",
    categoria: "fimo",
    descripcion: "Figura personalizada en fimo: montañera con mochila y bastones de trekking. Incluye el proceso, desde la estructura de alambre.",
    imagenes: [
      { src: "img/fimo/aurora/01-frente.webp", ancho: 1200, alto: 1600, alt: "Art Toy Aurora: montañera de pelo rizado con gafas de sol, chaqueta azul y bastones" },
      { src: "img/fimo/aurora/02-perfil.webp", ancho: 1200, alto: 1600, alt: "Art Toy Aurora vista de tres cuartos" },
      { src: "img/fimo/aurora/03-detalle.webp", ancho: 1200, alto: 1600, alt: "Detalle de la cara, el pelo y la chaqueta del Art Toy Aurora" },
      { src: "img/fimo/aurora/04-de-frente.webp", ancho: 1200, alto: 1600, alt: "Art Toy Aurora de frente con los dos bastones" },
      { src: "img/fimo/aurora/05-espalda.webp", ancho: 1200, alto: 1600, alt: "Art Toy Aurora de espaldas, con la mochila turquesa y el pelo rizado" },
      { src: "img/fimo/aurora/06-proceso-estructura.webp", ancho: 1200, alto: 1600, alt: "Proceso: estructura de alambre de la figura" },
      { src: "img/fimo/aurora/07-proceso-volumen.webp", ancho: 1200, alto: 1600, alt: "Proceso: volumen del cuerpo cubierto con cinta" },
      { src: "img/fimo/aurora/08-proceso-ropa.webp", ancho: 1200, alto: 1600, alt: "Proceso: pantalones y botas ya modelados en fimo" },
    ],
  },
  {
    titulo: "Estatua en turquesa",
    categoria: "cuadros",
    descripcion: "Técnica mixta.",
    imagenes: [{ src: "img/cuadros/estatua-turquesa.webp", ancho: 1200, alto: 1600, alt: "Busto de estatua clásica sobre fondo turquesa con salpicaduras rojas" }],
  },
  {
    titulo: "Retrato en violeta",
    categoria: "cuadros",
    descripcion: "Técnica mixta.",
    imagenes: [{ src: "img/cuadros/retrato-violeta.webp", ancho: 1200, alto: 1600, alt: "Retrato expresivo a tinta sobre fondo violeta" }],
  },
  {
    titulo: "Retrato en rojo",
    categoria: "cuadros",
    descripcion: "Técnica mixta.",
    imagenes: [{ src: "img/cuadros/retrato-rojo.webp", ancho: 1200, alto: 1600, alt: "Retrato expresivo a tinta sobre fondo rojo" }],
  },
  {
    titulo: "Retrato en spray",
    categoria: "cuadros",
    descripcion: "Técnica mixta.",
    imagenes: [{ src: "img/cuadros/retrato-spray.webp", ancho: 1200, alto: 1600, alt: "Retrato de mujer en grises sobre fondo de espray rosa y azul" }],
  },
  {
    titulo: "Tigre azul",
    categoria: "ilustracion",
    descripcion: "Tinta y acuarela.",
    imagenes: [{ src: "img/ilustracion/tigre-azul.webp", ancho: 1200, alto: 1600, alt: "Ilustración a tinta y acuarela azul: figura femenina, pelícano y tigre entre flores" }],
  },
  {
    titulo: "El cuervo",
    categoria: "ilustracion",
    descripcion: "Tinta sepia y acuarela.",
    imagenes: [{ src: "img/ilustracion/cuervo.webp", ancho: 1188, alto: 1600, alt: "Ilustración en tinta sepia: un cuervo posado sobre una mujer encogida" }],
  },
  {
    titulo: "Flores en la piel",
    categoria: "ilustracion",
    descripcion: "Acuarela, tinta y pan de oro.",
    imagenes: [{ src: "img/ilustracion/espalda-flores.webp", ancho: 1184, alto: 1600, alt: "Ilustración en acuarela: espalda de mujer con flores doradas" }],
  },
  {
    titulo: "Maqueta rústica",
    categoria: "otros",
    descripcion: "Maqueta hecha a mano con miniaturas: muros desconchados, ladrillo visto, pila de lavar, farol y utensilios envejecidos.",
    imagenes: [
      { src: "img/otros/maqueta-completa.webp", ancho: 1200, alto: 1600, alt: "Maqueta rústica completa: estancia encalada con vigas de madera, puerta, pila de lavar y barreño" },
      { src: "img/otros/maqueta-rincon.webp", ancho: 1200, alto: 1600, alt: "Rincón de la maqueta: muro desconchado, barreño y puerta de madera" },
      { src: "img/otros/maqueta-pila.webp", ancho: 1200, alto: 1600, alt: "Detalle de la maqueta: pila de lavar, grifo y farolillo" },
      { src: "img/otros/miniaturas-barreno-cubo.webp", ancho: 1600, alto: 1200, alt: "Miniaturas de barreño y cubo con acabado oxidado" },
      { src: "img/otros/miniaturas-cocina.webp", ancho: 1600, alto: 1200, alt: "Miniaturas de cocina: lechera, jarra esmaltada, cazo y rodillo" },
    ],
  },
];
