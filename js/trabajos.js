// js/trabajos.js — cada objeto es UN trabajo de la galería.
// "imagenes" es una lista: la primera es la portada; si hay más de una,
// la tarjeta muestra flechas para pasarlas y el visor las enseña todas.
const trabajos = [

  // ── FIMO ─────────────────────────────────────────────────────────────────
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
    titulo: "Art Toy montañero",
    categoria: "fimo",
    descripcion: "Art toy original en fimo: mono montañero con plumífero, mochila y bastones.",
    imagenes: [
      { src: "img/fimo/montanero/01-frente.webp", ancho: 1200, alto: 1600, alt: "Art Toy montañero de frente: mono con plumífero, mochila y bastones" },
      { src: "img/fimo/montanero/02-tres-cuartos.webp", ancho: 1200, alto: 1600, alt: "Art Toy montañero en vista de tres cuartos" },
      { src: "img/fimo/montanero/03-espalda.webp", ancho: 1200, alto: 1600, alt: "Art Toy montañero de espaldas con la mochila" },
    ],
  },

  // ── CUADROS ──────────────────────────────────────────────────────────────
  {
    titulo: "Retrato de perfil",
    categoria: "cuadros",
    descripcion: "Retrato a partir de una foto familiar. Acuarela.",
    imagenes: [
      { src: "img/cuadros/retrato-perfil.webp", ancho: 1600, alto: 1600, alt: "Retrato en acuarela de una mujer de perfil con el pelo recogido y pendiente de perla" },
    ],
  },
  {
    titulo: "Madre y bebé",
    categoria: "cuadros",
    descripcion: "Acuarela y tinta.",
    imagenes: [
      { src: "img/cuadros/madre-y-bebe.webp", ancho: 1600, alto: 1149, alt: "Retrato en acuarela y tinta de madre con su bebé" },
    ],
  },
  {
    titulo: "Niña de azul",
    categoria: "cuadros",
    descripcion: "Retrato a partir de una foto familiar. Tinta y acuarela.",
    imagenes: [
      { src: "img/cuadros/nina-de-azul.webp", ancho: 1501, alto: 1600, alt: "Retrato a tinta y acuarela de una niña con diadema y vestido azul de flores" },
    ],
  },
  {
    titulo: "Bebé con cascos",
    categoria: "cuadros",
    descripcion: "Retrato a partir de una foto familiar. Acuarela.",
    imagenes: [
      { src: "img/cuadros/bebe-cascos.webp", ancho: 1600, alto: 1600, alt: "Retrato en acuarela de un bebé con auriculares morados" },
    ],
  },
  {
    titulo: "Conversación",
    categoria: "cuadros",
    descripcion: "Retrato por encargo a partir de una foto. Tinta y aguada.",
    imagenes: [
      { src: "img/cuadros/conversacion.webp", ancho: 1600, alto: 1198, alt: "Dibujo a tinta de dos hombres mayores conversando, uno con gorra y otro con gorro de lana" },
    ],
  },
  {
    titulo: "Retrato en spray",
    categoria: "cuadros",
    descripcion: "Técnica mixta.",
    imagenes: [
      { src: "img/cuadros/retrato-spray.webp", ancho: 1200, alto: 1600, alt: "Retrato de mujer en grises sobre fondo de espray rosa y azul" },
    ],
  },
  {
    titulo: "Tres niños",
    categoria: "cuadros",
    descripcion: "Acuarela y tinta.",
    imagenes: [
      { src: "img/cuadros/tres-ninos.webp", ancho: 1600, alto: 1151, alt: "Retrato en acuarela y tinta de tres niños" },
    ],
  },
  {
    titulo: "Retrato de perro",
    categoria: "cuadros",
    descripcion: "Retrato de mascota en tinta y acuarela.",
    imagenes: [
      { src: "img/cuadros/retrato-perro.webp", ancho: 1280, alto: 1600, alt: "Retrato de perro en tinta y acuarela" },
    ],
  },

  // ── ILUSTRACIÓN ──────────────────────────────────────────────────────────
  {
    titulo: "Mujer tigre",
    categoria: "ilustracion",
    descripcion: "Tinta y acuarela.",
    imagenes: [
      { src: "img/ilustracion/mujer-tigre.webp", ancho: 1200, alto: 1600, alt: "Ilustración a tinta y acuarela: mujer fusionada con un tigre" },
    ],
  },
  {
    titulo: "El cuervo",
    categoria: "ilustracion",
    descripcion: "Tinta sepia y acuarela.",
    imagenes: [
      { src: "img/ilustracion/cuervo.webp", ancho: 1188, alto: 1600, alt: "Ilustración en tinta sepia: un cuervo posado sobre una mujer encogida" },
    ],
  },
  {
    titulo: "Flores en la piel",
    categoria: "ilustracion",
    descripcion: "Acuarela, tinta y pan de oro.",
    imagenes: [
      { src: "img/ilustracion/espalda-flores.webp", ancho: 1184, alto: 1600, alt: "Ilustración en acuarela: espalda de mujer con flores doradas" },
    ],
  },
  {
    titulo: "Mujer en kraft",
    categoria: "ilustracion",
    descripcion: "Tinta y collage de papel kraft.",
    imagenes: [
      { src: "img/ilustracion/mujer-kraft.webp", ancho: 1339, alto: 1600, alt: "Ilustración a tinta de una mujer con un halo de papel kraft arrugado" },
    ],
  },
  {
    titulo: "Estatua en turquesa",
    categoria: "ilustracion",
    descripcion: "Técnica mixta.",
    imagenes: [
      { src: "img/cuadros/estatua-turquesa.webp", ancho: 1200, alto: 1600, alt: "Busto de estatua clásica sobre fondo turquesa con salpicaduras rojas" },
    ],
  },
  {
    titulo: "Retrato en violeta",
    categoria: "ilustracion",
    descripcion: "Técnica mixta.",
    imagenes: [
      { src: "img/cuadros/retrato-violeta.webp", ancho: 1200, alto: 1600, alt: "Retrato expresivo a tinta sobre fondo violeta" },
    ],
  },
  {
    titulo: "Retrato en rojo",
    categoria: "ilustracion",
    descripcion: "Técnica mixta.",
    imagenes: [
      { src: "img/cuadros/retrato-rojo.webp", ancho: 1200, alto: 1600, alt: "Retrato expresivo a tinta sobre fondo rojo" },
    ],
  },
  {
    titulo: "Carnero",
    categoria: "ilustracion",
    descripcion: "Tinta y acuarela.",
    imagenes: [
      { src: "img/ilustracion/carnero.webp", ancho: 1600, alto: 1301, alt: "Ilustración de carnero en tinta y acuarela" },
    ],
  },
  {
    titulo: "Iguana",
    categoria: "ilustracion",
    descripcion: "Tinta y acuarela.",
    imagenes: [
      { src: "img/ilustracion/iguana.webp", ancho: 1588, alto: 1600, alt: "Ilustración de iguana en tinta y acuarela" },
    ],
  },
  {
    titulo: "Tigre azul",
    categoria: "ilustracion",
    descripcion: "Tinta y acuarela.",
    imagenes: [
      { src: "img/ilustracion/tigre-azul.webp", ancho: 1200, alto: 1600, alt: "Ilustración a tinta y acuarela azul: figura femenina, pelícano y tigre entre flores" },
    ],
  },

  // ── MAQUETAS ─────────────────────────────────────────────────────────────
  {
    titulo: "Maqueta rústica",
    categoria: "maquetas",
    descripcion: "Hecha a mano con miniaturas: muros desconchados, ladrillo visto, pila de lavar, farol y utensilios envejecidos.",
    imagenes: [
      { src: "img/otros/maqueta-completa.webp", ancho: 1200, alto: 1600, alt: "Maqueta rústica completa: estancia encalada con vigas de madera, puerta, pila de lavar y barreño" },
      { src: "img/otros/maqueta-rincon.webp", ancho: 1200, alto: 1600, alt: "Rincón de la maqueta: muro desconchado, barreño y puerta de madera" },
      { src: "img/otros/maqueta-pila.webp", ancho: 1200, alto: 1600, alt: "Detalle de la maqueta: pila de lavar, grifo y farolillo" },
      { src: "img/otros/miniaturas-barreno-cubo.webp", ancho: 1600, alto: 1200, alt: "Miniaturas de barreño y cubo con acabado oxidado" },
      { src: "img/otros/miniaturas-cocina.webp", ancho: 1600, alto: 1200, alt: "Miniaturas de cocina: lechera, jarra esmaltada, cazo y rodillo" },
    ],
  },
];
