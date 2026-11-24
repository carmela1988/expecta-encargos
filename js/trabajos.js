// js/trabajos.js — cada objeto es UN trabajo de la galería.
// "imagenes" es una lista: la primera es la portada; si hay más de una,
// la tarjeta muestra flechas para pasarlas y el visor las enseña todas.
const trabajos = [

  // ── FIMO ─────────────────────────────────────────────────────────────────
  {
    titulo: "Art Toy Bigfoot",
    categoria: "fimo",
    descripcion: "Art toy original en fimo: Bigfoot montañero con plumífero, mochila y bastones.",
    imagenes: [
      { src: "img/fimo/bigfoot-collage.webp", ancho: 1600, alto: 1600, alt: "Art Toy original en fimo de un Bigfoot montañero azul con plumífero verde, en tres vistas" },
    ],
  },
  {
    titulo: "Art Toy Tete",
    categoria: "fimo",
    descripcion: "Figura personalizada en fimo: esquiador con mochila, esquís y bastones.",
    imagenes: [
      { src: "img/fimo/art-toy-tete.webp", ancho: 1024, alto: 1024, alt: "Art Toy de fimo de Tete, esquiador con mochila negra y esquís a la espalda, en dos vistas" },
    ],
  },
  {
    titulo: "Art Toy Aurora",
    categoria: "fimo",
    descripcion: "Figura personalizada en fimo: montañera con mochila y bastones de trekking.",
    imagenes: [
      { src: "img/fimo/aurora-collage.webp", ancho: 1600, alto: 1600, alt: "Art Toy Aurora: montañera de pelo rizado con gafas de sol, chaqueta azul y bastones, en tres vistas" },
    ],
  },
  {
    titulo: "Aurora: el proceso",
    categoria: "fimo",
    descripcion: "De la estructura de alambre a la figura terminada: así se hace un Art Toy personalizado.",
    imagenes: [
      { video: "img/fimo/aurora/proceso.mp4", src: "img/fimo/aurora/proceso-poster.webp", ancho: 1080, alto: 1350, alt: "Vídeo del proceso del Art Toy Aurora: estructura de alambre, volumen, ropa y figura terminada" },
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
      { src: "img/cuadros/madre-y-bebe.webp", ancho: 1525, alto: 1071, alt: "Retrato en acuarela y tinta de madre con su bebé" },
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
      { src: "img/cuadros/tres-ninos.webp", ancho: 1524, alto: 1111, alt: "Retrato en acuarela y tinta de tres niños" },
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
      { src: "img/ilustracion/carnero.webp", ancho: 1447, alto: 1144, alt: "Ilustración de carnero en tinta y acuarela" },
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
