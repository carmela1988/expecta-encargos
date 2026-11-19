/**
 * Expecta D.M. · Arte por encargo
 * Lógica de la aplicación web (catálogo, filtros dinámicos, lightbox y WhatsApp)
 * Encapsulado dentro de IIFE para no generar variables globales.
 */
(() => {
  "use strict";

  // Objeto de configuración centralizado
  const CONFIG = {
    whatsappNumber: "34624939426",
    instagramUser: "hic_sunt_tattoo",
    instagramUrl: "https://www.instagram.com/hic_sunt_tattoo/",

    // Todos los mensajes de WhatsApp se definen exclusivamente aquí
    mensajesWa: {
      general: "¡Hola! Me gustaría hacerte una consulta sobre un encargo personalizado. Te paso una foto de referencia.",
      otraIdea: "¡Hola! Tengo una idea para un encargo personalizado y me gustaría ver si es posible. Te paso una foto de referencia.",
      flotante: "¡Hola! Me gustaría hacerte una consulta sobre un encargo personalizado. Te paso una foto de referencia.",
      pie: "¡Hola! Me gustaría hacerte una consulta sobre un encargo personalizado. Te paso una foto de referencia.",
      porCategoria: {
        fimo: "¡Hola! Me gustaría pedir un Art Toy personalizado. Te paso una foto de referencia para que me digas si es posible.",
        bolsos: "¡Hola! Me gustaría pedir un bolso personalizado. Te paso una foto de referencia para que me digas si es posible.",
        cuadros: "¡Hola! Me gustaría pedir un cuadro personalizado. Te paso una foto de referencia para que me digas si es posible.",
        ilustracion: "¡Hola! Me gustaría pedir una ilustración por encargo. Te paso una foto de referencia para que me digas si es posible."
      }
    },

    // Categorías en orden estricto de visualización
    categorias: [
      {
        id: "fimo",
        nombre: "Art Toys personalizados",
        descripcion: "Figuras de fimo hechas a mano a partir de una foto de la persona."
      },
      {
        id: "bolsos",
        nombre: "Bolsos personalizados",
        descripcion: "[DESCRIPCIÓN PENDIENTE]"
      },
      {
        id: "cuadros",
        nombre: "Cuadros",
        descripcion: "[DESCRIPCIÓN PENDIENTE]"
      },
      {
        id: "ilustracion",
        nombre: "Ilustración por encargo",
        descripcion: "Piezas originales a tinta, plumilla y acuarela."
      }
    ]
  };

  /**
   * Genera el enlace oficial a WhatsApp codificando el mensaje en UTF-8 seguro.
   * @param {string} mensaje Texto del mensaje.
   * @returns {string} URL formateada para WhatsApp.
   */
  const construirEnlaceWa = (mensaje) => {
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
  };

  /**
   * Obtiene las categorías que tienen al menos un trabajo en el catálogo.
   * @param {Array} listaTrabajos Colección de trabajos.
   * @returns {Array} Categorías activas.
   */
  const obtenerCategoriasActivas = (listaTrabajos) => {
    return CONFIG.categorias.filter((cat) =>
      listaTrabajos.some((t) => t.categoria === cat.id)
    );
  };

  /**
   * Obtiene el nombre legible de una categoría según su id.
   * @param {string} catId Identificador de la categoría.
   * @returns {string} Nombre legible.
   */
  const obtenerNombreCategoria = (catId) => {
    const encontrada = CONFIG.categorias.find((c) => c.id === catId);
    return encontrada ? encontrada.nombre : catId;
  };

  // Estado de la galería y lightbox
  let categoriaFiltroActiva = "todos";
  let trabajosVisibles = [];
  let indiceTrabajoActivo = 0;
  let elementoPrevioFoco = null;

  // Elementos del DOM
  const contenedorCategorias = document.getElementById("contenedor-categorias");
  const contenedorFiltros = document.getElementById("galeria-filtros");
  const contenedorGaleria = document.getElementById("galeria-grid");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitulo = document.getElementById("lightbox-titulo");
  const lightboxCat = document.getElementById("lightbox-cat");
  const lightboxDesc = document.getElementById("lightbox-desc");
  const lightboxBtnWa = document.getElementById("lightbox-btn-wa");
  const btnCerrarLightbox = document.getElementById("lightbox-cerrar");
  const btnPrevLightbox = document.getElementById("lightbox-prev");
  const btnNextLightbox = document.getElementById("lightbox-next");
  const btnHeroWa = document.getElementById("hero-btn-wa");
  const btnWaFlotante = document.getElementById("btn-wa-flotante");
  const pieEnlaceIg = document.getElementById("pie-enlace-ig");
  const pieEnlaceWa = document.getElementById("pie-enlace-wa");
  const anioActualEl = document.getElementById("anio-actual");

  /**
   * Renderiza las tarjetas de categorías según los trabajos existentes.
   * Al final incluye la tarjeta especial "¿Tienes otra idea?".
   */
  const renderizarCategorias = (listaTrabajos) => {
    if (!contenedorCategorias) return;

    contenedorCategorias.innerHTML = "";
    const categoriasActivas = obtenerCategoriasActivas(listaTrabajos);

    categoriasActivas.forEach((cat) => {
      const primerTrabajo = listaTrabajos.find((t) => t.categoria === cat.id);
      if (!primerTrabajo) return;

      const mensajeWa =
        CONFIG.mensajesWa.porCategoria[cat.id] || CONFIG.mensajesWa.general;
      const urlWa = construirEnlaceWa(mensajeWa);

      const tarjeta = document.createElement("article");
      tarjeta.className = "tarjeta-categoria";
      tarjeta.innerHTML = `
        <div class="categoria-img-wrap">
          <img 
            src="${primerTrabajo.imagen}" 
            alt="${primerTrabajo.titulo} - ${cat.nombre}" 
            width="${primerTrabajo.ancho}" 
            height="${primerTrabajo.alto}" 
            loading="lazy"
            class="categoria-img"
          >
        </div>
        <div class="categoria-cuerpo">
          <h3 class="categoria-titulo">${cat.nombre}</h3>
          <p class="categoria-desc">${cat.descripcion}</p>
          <a href="${urlWa}" target="_blank" rel="noopener noreferrer" class="boton categoria-btn">
            Pide el tuyo
          </a>
        </div>
      `;
      contenedorCategorias.appendChild(tarjeta);
    });

    // Tarjeta final para ideas personalizadas
    const urlWaOtra = construirEnlaceWa(CONFIG.mensajesWa.otraIdea);
    const tarjetaOtraIdea = document.createElement("article");
    tarjetaOtraIdea.className = "tarjeta-categoria tarjeta-otra-idea";
    tarjetaOtraIdea.innerHTML = `
      <h3 class="categoria-titulo">¿Tienes otra idea? Cuéntamela</h3>
      <p class="categoria-desc">Si tienes en mente un proyecto especial o una pieza a medida con tu propia historia, podemos darle forma juntos.</p>
      <a href="${urlWaOtra}" target="_blank" rel="noopener noreferrer" class="boton boton-primario">
        Cuéntame tu idea
      </a>
    `;
    contenedorCategorias.appendChild(tarjetaOtraIdea);
  };

  /**
   * Renderiza los botones de filtro de la galería.
   */
  const renderizarFiltros = (listaTrabajos) => {
    if (!contenedorFiltros) return;

    contenedorFiltros.innerHTML = "";
    const categoriasActivas = obtenerCategoriasActivas(listaTrabajos);

    // Botón "Todos"
    const btnTodos = document.createElement("button");
    btnTodos.type = "button";
    btnTodos.className = `btn-filtro ${categoriaFiltroActiva === "todos" ? "activo" : ""}`;
    btnTodos.textContent = "Todos";
    btnTodos.addEventListener("click", () => cambiarFiltro("todos", listaTrabajos));
    contenedorFiltros.appendChild(btnTodos);

    // Botones por categoría activa
    categoriasActivas.forEach((cat) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `btn-filtro ${categoriaFiltroActiva === cat.id ? "activo" : ""}`;
      btn.textContent = cat.nombre;
      btn.addEventListener("click", () => cambiarFiltro(cat.id, listaTrabajos));
      contenedorFiltros.appendChild(btn);
    });
  };

  /**
   * Cambia el filtro actual y vuelve a renderizar la cuadrícula de la galería.
   */
  const cambiarFiltro = (catId, listaTrabajos) => {
    categoriaFiltroActiva = catId;

    // Actualizar clases de botones
    const botones = contenedorFiltros.querySelectorAll(".btn-filtro");
    botones.forEach((btn, index) => {
      if (index === 0 && catId === "todos") {
        btn.classList.add("activo");
      } else if (index > 0 && CONFIG.categorias.filter((c) => listaTrabajos.some((t) => t.categoria === c.id))[index - 1]?.id === catId) {
        btn.classList.add("activo");
      } else {
        btn.classList.remove("activo");
      }
    });

    renderizarGaleria(listaTrabajos);
  };

  /**
   * Renderiza la galería según el filtro activo.
   */
  const renderizarGaleria = (listaTrabajos) => {
    if (!contenedorGaleria) return;

    contenedorGaleria.innerHTML = "";

    trabajosVisibles =
      categoriaFiltroActiva === "todos"
        ? [...listaTrabajos]
        : listaTrabajos.filter((t) => t.categoria === categoriaFiltroActiva);

    trabajosVisibles.forEach((trabajo, index) => {
      const nombreCat = obtenerNombreCategoria(trabajo.categoria);
      const tarjeta = document.createElement("article");
      tarjeta.className = "tarjeta-trabajo";
      tarjeta.tabIndex = 0;
      tarjeta.setAttribute("role", "button");
      tarjeta.setAttribute("aria-label", `Ver ${trabajo.titulo} en detalle`);

      tarjeta.innerHTML = `
        <div class="trabajo-img-wrap">
          <img 
            src="${trabajo.imagen}" 
            alt="${trabajo.titulo} - ${trabajo.descripcion}" 
            width="${trabajo.ancho}" 
            height="${trabajo.alto}" 
            loading="lazy"
            class="trabajo-img"
          >
        </div>
        <div class="trabajo-cuerpo">
          <span class="trabajo-categoria">${nombreCat}</span>
          <h3 class="trabajo-titulo">${trabajo.titulo}</h3>
          <p class="trabajo-desc">${trabajo.descripcion}</p>
        </div>
      `;

      // Eventos para abrir Lightbox (clic o teclado Enter/Espacio)
      tarjeta.addEventListener("click", () => abrirLightbox(index, tarjeta));
      tarjeta.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          abrirLightbox(index, tarjeta);
        }
      });

      contenedorGaleria.appendChild(tarjeta);
    });
  };

  /**
   * Abre el visor Lightbox en una posición determinada.
   */
  const abrirLightbox = (index, elementoOrigen) => {
    if (!lightbox || !trabajosVisibles[index]) return;

    elementoPrevioFoco = elementoOrigen;
    indiceTrabajoActivo = index;
    actualizarContenidoLightbox();

    lightbox.classList.add("abierto");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Foco accesible al botón de cerrar
    btnCerrarLightbox?.focus();
  };

  /**
   * Cierra el visor Lightbox y restaura el foco.
   */
  const cerrarLightbox = () => {
    if (!lightbox) return;

    lightbox.classList.remove("abierto");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (elementoPrevioFoco) {
      elementoPrevioFoco.focus();
      elementoPrevioFoco = null;
    }
  };

  /**
   * Actualiza la imagen y los datos mostrados en el Lightbox.
   */
  const actualizarContenidoLightbox = () => {
    const trabajo = trabajosVisibles[indiceTrabajoActivo];
    if (!trabajo) return;

    lightboxImg.src = trabajo.imagen;
    lightboxImg.alt = `${trabajo.titulo} - ${trabajo.descripcion}`;
    lightboxImg.width = trabajo.ancho;
    lightboxImg.height = trabajo.alto;

    lightboxTitulo.textContent = trabajo.titulo;
    lightboxCat.textContent = obtenerNombreCategoria(trabajo.categoria);
    lightboxDesc.textContent = trabajo.descripcion;

    // Enlace de WhatsApp propio de la categoría para el botón del Lightbox
    const mensajeWa =
      CONFIG.mensajesWa.porCategoria[trabajo.categoria] ||
      CONFIG.mensajesWa.general;
    if (lightboxBtnWa) {
      lightboxBtnWa.href = construirEnlaceWa(mensajeWa);
    }
  };

  /**
   * Pasa al trabajo anterior dentro del Lightbox.
   */
  const navegarPrev = () => {
    if (trabajosVisibles.length === 0) return;
    indiceTrabajoActivo =
      (indiceTrabajoActivo - 1 + trabajosVisibles.length) % trabajosVisibles.length;
    actualizarContenidoLightbox();
  };

  /**
   * Pasa al trabajo siguiente dentro del Lightbox.
   */
  const navegarNext = () => {
    if (trabajosVisibles.length === 0) return;
    indiceTrabajoActivo = (indiceTrabajoActivo + 1) % trabajosVisibles.length;
    actualizarContenidoLightbox();
  };

  /**
   * Configura eventos del Lightbox y navegación por teclado.
   */
  const inicializarEventosLightbox = () => {
    btnCerrarLightbox?.addEventListener("click", cerrarLightbox);
    btnPrevLightbox?.addEventListener("click", navegarPrev);
    btnNextLightbox?.addEventListener("click", navegarNext);

    // Clic fuera del contenido para cerrar
    lightbox?.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        cerrarLightbox();
      }
    });

    // Atajos de teclado: Escape, Flecha izquierda y Flecha derecha
    document.addEventListener("keydown", (e) => {
      if (!lightbox || !lightbox.classList.contains("abierto")) return;

      if (e.key === "Escape") {
        e.preventDefault();
        cerrarLightbox();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        navegarPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navegarNext();
      }
    });
  };

  /**
   * Inicializa enlaces estáticos configurados con CONFIG.
   */
  const inicializarEnlaces = () => {
    // Botón Hero
    if (btnHeroWa) {
      btnHeroWa.href = construirEnlaceWa(CONFIG.mensajesWa.general);
    }

    // Botón flotante móvil
    if (btnWaFlotante) {
      btnWaFlotante.href = construirEnlaceWa(CONFIG.mensajesWa.flotante);
    }

    // Pie: Instagram unificado
    if (pieEnlaceIg) {
      pieEnlaceIg.href = CONFIG.instagramUrl;
      pieEnlaceIg.textContent = `Instagram · Hic Sunt Tattoo (@${CONFIG.instagramUser})`;
    }

    // Pie: WhatsApp
    if (pieEnlaceWa) {
      pieEnlaceWa.href = construirEnlaceWa(CONFIG.mensajesWa.pie);
      pieEnlaceWa.textContent = "WhatsApp (+34 624 93 94 26)";
    }

    // Año actual dinámico
    if (anioActualEl) {
      anioActualEl.textContent = new Date().getFullYear();
    }
  };

  /**
   * Arranque de la aplicación cuando el DOM esté listo.
   */
  const iniciar = () => {
    const listaTrabajos = typeof trabajos !== "undefined" ? trabajos : [];

    inicializarEnlaces();
    renderizarCategorias(listaTrabajos);
    renderizarFiltros(listaTrabajos);
    renderizarGaleria(listaTrabajos);
    inicializarEventosLightbox();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
