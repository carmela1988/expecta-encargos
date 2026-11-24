/**
 * Expecta D.M. · Arte por encargo
 * Lógica de la aplicación web:
 * - Catálogo dinámico: una tarjeta por categoría en la galería
 * - Carrusel por categoría: todas las fotos de todas las obras en un único pase
 * - Título y descripción de la obra en curso cambian al pasar de foto
 * - Visor (Lightbox) con navegación entre fotos de la categoría, swipe y zoom al 250%
 * - Encapsulado dentro de IIFE para no generar variables globales
 */
(() => {
  "use strict";

  // ── CONFIGURACIÓN CENTRAL ─────────────────────────────────────────────────
  const CONFIG = {
    whatsappNumber: "34624939426",

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
        ilustracion: "¡Hola! Me gustaría pedir una ilustración por encargo. Te paso una foto de referencia para que me digas si es posible.",
        maquetas: "¡Hola! Me gustaría pedirte un encargo especial. Te cuento la idea y te mando referencias.",
      },
    },

    // Categorías en orden estricto de visualización.
    // Solo se muestran si hay al menos un trabajo con ese id en trabajos.js.
    categorias: [
      {
        id: "fimo",
        nombre: "Art Toys",
        descripcion: "Figuras de fimo hechas a mano a partir de tu foto, y art toys originales.",
        portada: "Art Toy Tete",
      },
      {
        id: "bolsos",
        nombre: "Bolsos personalizados",
        descripcion: "[DESCRIPCIÓN PENDIENTE]",
      },
      {
        id: "cuadros",
        nombre: "Cuadros por encargo",
        descripcion: "Retratos de personas y mascotas a partir de tu foto, en acuarela y técnica mixta.",
      },
      {
        id: "ilustracion",
        nombre: "Ilustraciones originales",
        descripcion: "Piezas a tinta, plumilla y acuarela.",
      },
      {
        id: "maquetas",
        nombre: "Maquetas",
        descripcion: "Maquetas y escenas con miniaturas hechas a mano.",
      },
    ],
  };

  // Categorías que muestran la obra entera (object-fit: contain sobre --papel-claro)
  const CATS_CONTAIN = ["fimo", "cuadros", "ilustracion"];
  const CATS_CONTAIN_PORTADA = ["ilustracion"];

  // ── UTILIDADES ────────────────────────────────────────────────────────────

  const construirEnlaceWa = (mensaje) =>
    `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(mensaje)}`;

  const obtenerCategoriasActivas = (listaTrabajos) =>
    CONFIG.categorias.filter((cat) =>
      listaTrabajos.some((t) => t.categoria === cat.id)
    );

  const obtenerNombreCategoria = (catId) => {
    const cat = CONFIG.categorias.find((c) => c.id === catId);
    return cat ? cat.nombre : catId;
  };

  /**
   * Aplana todas las fotos de los trabajos de una categoría en un array plano.
   * Cada elemento incluye los datos de imagen y una referencia al trabajo ({...img, trabajo}).
   */
  const aplanarFotosCategoria = (listaTrabajos, catId) => {
    const fotos = [];
    listaTrabajos
      .filter((t) => t.categoria === catId)
      .forEach((trabajo) => {
        (trabajo.imagenes || []).forEach((img) => {
          fotos.push({ ...img, trabajo });
        });
      });
    return fotos;
  };

  // ── ESTADO DEL LIGHTBOX ───────────────────────────────────────────────────
  let fotosLightbox = []; // array plano de {src, ancho, alto, alt, trabajo}
  let fotoLightboxIndex = 0;
  let elementoPrevioFoco = null;
  let isZoomed = false;
  let zoomScale = 1;
  let panX = 0;
  let panY = 0;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let initialPanX = 0;
  let initialPanY = 0;
  let hasDragged = false;
  let lastTouchTime = 0;

  // ── REFERENCIAS AL DOM ────────────────────────────────────────────────────
  const contenedorCategorias = document.getElementById("contenedor-categorias");
  const contenedorGaleria = document.getElementById("galeria-grid");
  const lightbox = document.getElementById("lightbox");
  const lightboxVisual = lightbox?.querySelector(".lightbox-visual");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitulo = document.getElementById("lightbox-titulo");
  const lightboxCat = document.getElementById("lightbox-cat");
  const lightboxDesc = document.getElementById("lightbox-desc");
  const lightboxContador = document.getElementById("lightbox-contador");
  const lightboxBtnWa = document.getElementById("lightbox-btn-wa");
  const btnCerrarLightbox = document.getElementById("lightbox-cerrar");
  const btnPrevLightbox = document.getElementById("lightbox-prev");
  const btnNextLightbox = document.getElementById("lightbox-next");
  const btnHeroWa = document.getElementById("hero-btn-wa");
  const btnWaFlotante = document.getElementById("btn-wa-flotante");
  const pieEnlaceWa = document.getElementById("pie-enlace-wa");
  const anioActualEl = document.getElementById("anio-actual");

  // ── SECCIÓN CATEGORÍAS ────────────────────────────────────────────────────

  /**
   * Renderiza las tarjetas de la sección "Categorías de encargos".
   * Solo las categorías con obras aparecen.
   * Cuadros e ilustración usan object-fit: contain sobre --papel-claro.
   * Incluye un enlace "Ver trabajos" que hace scroll a la tarjeta de galería.
   */
  const renderizarCategorias = (listaTrabajos) => {
    if (!contenedorCategorias) return;

    contenedorCategorias.innerHTML = "";
    const categoriasActivas = obtenerCategoriasActivas(listaTrabajos);

    categoriasActivas.forEach((cat) => {
      // La portada es la obra indicada en "portada" (CONFIG) o, si no hay, la primera de la categoría
      const primerTrabajo =
        listaTrabajos.find((t) => t.categoria === cat.id && t.titulo === cat.portada) ||
        listaTrabajos.find((t) => t.categoria === cat.id);
      if (!primerTrabajo?.imagenes?.length) return;

      const portada = primerTrabajo.imagenes[0];
      const mensajeWa =
        cat.mensajeWa ||
        CONFIG.mensajesWa.porCategoria[cat.id] ||
        CONFIG.mensajesWa.general;
      const urlWa = construirEnlaceWa(mensajeWa);
      const usaContain = CATS_CONTAIN_PORTADA.includes(cat.id);
      const claseContain = usaContain ? " categoria-img-contain" : "";

      const tarjeta = document.createElement("article");
      tarjeta.className = "tarjeta-categoria";
      tarjeta.innerHTML = `
        <div class="categoria-img-wrap${claseContain}">
          <img
            src="${portada.src}"
            alt="${portada.alt || `${primerTrabajo.titulo} — ${cat.nombre}`}"
            width="${portada.ancho}"
            height="${portada.alto}"
            loading="lazy"
            class="categoria-img${claseContain}"
          >
        </div>
        <div class="categoria-cuerpo">
          <h3 class="categoria-titulo">${cat.nombre}</h3>
          <p class="categoria-desc">${cat.descripcion}</p>
          <div class="categoria-acciones">
            <a href="${urlWa}" target="_blank" rel="noopener noreferrer" class="boton categoria-btn">
              Pide el tuyo
            </a>
            <a href="#galeria-cat-${cat.id}" class="boton categoria-btn-ver">
              Ver trabajos
            </a>
          </div>
        </div>
      `;
      contenedorCategorias.appendChild(tarjeta);
    });

    // Tarjeta final "¿Tienes otra idea?" — franja completa
    const urlWaOtra = construirEnlaceWa(CONFIG.mensajesWa.otraIdea);
    const tarjetaOtraIdea = document.createElement("article");
    tarjetaOtraIdea.className = "tarjeta-categoria tarjeta-otra-idea";
    tarjetaOtraIdea.innerHTML = `
      <h3 class="categoria-titulo">¿Tienes otra idea? Cuéntamela</h3>
      <p class="categoria-desc">Si tienes en mente un proyecto especial o una pieza a medida con tu propia historia, podemos darle forma juntos.</p>
      <a href="${urlWaOtra}" target="_blank" rel="noopener noreferrer" class="boton boton-otra-idea">
        Cuéntame tu idea
      </a>
    `;
    contenedorCategorias.appendChild(tarjetaOtraIdea);
  };

  // ── GALERÍA ───────────────────────────────────────────────────────────────

  /**
   * Renderiza la galería: UNA tarjeta por categoría activa.
   * El carrusel recorre TODAS las fotos de TODAS las obras de esa categoría.
   * Título y descripción debajo de la imagen cambian según la obra en curso.
   * Cuadros e ilustración usan object-fit: contain.
   */
  const renderizarGaleria = (listaTrabajos) => {
    if (!contenedorGaleria) return;

    contenedorGaleria.innerHTML = "";
    const categoriasActivas = obtenerCategoriasActivas(listaTrabajos);

    categoriasActivas.forEach((cat) => {
      const fotosPlanas = aplanarFotosCategoria(listaTrabajos, cat.id);
      if (fotosPlanas.length === 0) return;

      const usaContain = CATS_CONTAIN.includes(cat.id);
      const numFotos = fotosPlanas.length;
      let fotoIndexActual = 0;

      const tarjeta = document.createElement("article");
      tarjeta.className = "tarjeta-trabajo";
      tarjeta.id = `galeria-cat-${cat.id}`;

      // ── Contenedor visual de imagen con carrusel ──
      const imgWrap = document.createElement("div");
      imgWrap.className = `trabajo-img-wrap${usaContain ? " trabajo-img-contain" : ""}`;
      imgWrap.tabIndex = 0;
      imgWrap.setAttribute("role", "button");
      imgWrap.setAttribute("aria-label", `Ver galería de ${cat.nombre}`);

      const imgEl = document.createElement("img");
      imgEl.src = fotosPlanas[0].src;
      imgEl.alt = fotosPlanas[0].alt;
      imgEl.width = fotosPlanas[0].ancho;
      imgEl.height = fotosPlanas[0].alto;
      imgEl.loading = "lazy";
      imgEl.className = `trabajo-img${usaContain ? " trabajo-img-contain" : ""}`;
      imgWrap.appendChild(imgEl);

      // ── Vídeo: para las obras que en trabajos.js tienen "video" ──
      const videoEl = document.createElement("video");
      videoEl.className = imgEl.className;
      videoEl.muted = true;
      videoEl.loop = true;
      videoEl.playsInline = true;
      videoEl.preload = "none";
      videoEl.style.display = "none";
      imgWrap.appendChild(videoEl);

      // Enseña la foto o el vídeo según lo que sea el elemento actual
      const mostrarMedia = (foto) => {
        if (foto.video) {
          imgEl.style.display = "none";
          videoEl.poster = foto.src;
          if (videoEl.getAttribute("src") !== foto.video) videoEl.src = foto.video;
          videoEl.setAttribute("aria-label", foto.alt);
          videoEl.style.display = "block";
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
          videoEl.style.display = "none";
          imgEl.style.display = "block";
          imgEl.src = foto.src;
          imgEl.alt = foto.alt;
          imgEl.width = foto.ancho;
          imgEl.height = foto.alto;
        }
      };
      if (fotosPlanas[0].video) mostrarMedia(fotosPlanas[0]);

      // Al pulsar: si es vídeo, pausa o reanuda; si es foto, abre el visor (solo con fotos)
      const pulsarMedia = () => {
        const foto = fotosPlanas[fotoIndexActual];
        if (foto.video) {
          if (videoEl.paused) videoEl.play().catch(() => {});
          else videoEl.pause();
          return;
        }
        const soloFotos = fotosPlanas.filter((f) => !f.video);
        abrirLightbox(soloFotos, soloFotos.indexOf(foto), imgWrap);
      };

      // ── Cuerpo: nombre de categoría + título y desc de la obra en curso ──
      const cuerpo = document.createElement("div");
      cuerpo.className = "trabajo-cuerpo";

      const catSpan = document.createElement("span");
      catSpan.className = "trabajo-categoria";
      catSpan.textContent = cat.nombre;

      const tituloEl = document.createElement("h3");
      tituloEl.className = "trabajo-titulo";
      tituloEl.textContent = fotosPlanas[0].trabajo.titulo;

      const descEl = document.createElement("p");
      descEl.className = "trabajo-desc";
      descEl.textContent = fotosPlanas[0].trabajo.descripcion;

      cuerpo.appendChild(catSpan);
      cuerpo.appendChild(tituloEl);
      cuerpo.appendChild(descEl);

      // ── Actualización al pasar de foto ──
      let contadorEl = null;

      const actualizarFotoTarjeta = (delta) => {
        fotoIndexActual = (fotoIndexActual + delta + numFotos) % numFotos;
        const foto = fotosPlanas[fotoIndexActual];
        mostrarMedia(foto);
        tituloEl.textContent = foto.trabajo.titulo;
        descEl.textContent = foto.trabajo.descripcion;
        if (contadorEl) contadorEl.textContent = `${fotoIndexActual + 1} / ${numFotos}`;
      };

      // ── Flechas y contador (siempre si hay más de una foto) ──
      if (numFotos > 1) {
        const btnPrev = document.createElement("button");
        btnPrev.type = "button";
        btnPrev.className = "carrusel-btn carrusel-prev";
        btnPrev.setAttribute("aria-label", "Foto anterior");
        btnPrev.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg>`;
        btnPrev.addEventListener("click", (e) => { e.stopPropagation(); actualizarFotoTarjeta(-1); });
        imgWrap.appendChild(btnPrev);

        const btnNext = document.createElement("button");
        btnNext.type = "button";
        btnNext.className = "carrusel-btn carrusel-next";
        btnNext.setAttribute("aria-label", "Foto siguiente");
        btnNext.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
        btnNext.addEventListener("click", (e) => { e.stopPropagation(); actualizarFotoTarjeta(1); });
        imgWrap.appendChild(btnNext);

        contadorEl = document.createElement("span");
        contadorEl.className = "carrusel-contador";
        contadorEl.setAttribute("aria-live", "polite");
        contadorEl.textContent = `1 / ${numFotos}`;
        imgWrap.appendChild(contadorEl);

        // Swipe táctil en la tarjeta
        let touchStartX = 0;
        let touchStartY = 0;
        let esSwipe = false;

        imgWrap.addEventListener("touchstart", (e) => {
          if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            esSwipe = false;
          }
        }, { passive: true });

        imgWrap.addEventListener("touchmove", (e) => {
          if (e.touches.length === 1) {
            const dx = e.touches[0].clientX - touchStartX;
            const dy = e.touches[0].clientY - touchStartY;
            if (Math.abs(dx) > 15 && Math.abs(dx) > Math.abs(dy)) esSwipe = true;
          }
        }, { passive: true });

        imgWrap.addEventListener("touchend", (e) => {
          if (esSwipe && e.changedTouches.length === 1) {
            const diffX = e.changedTouches[0].clientX - touchStartX;
            if (Math.abs(diffX) > 40) {
              if (diffX < 0) actualizarFotoTarjeta(1);
              else actualizarFotoTarjeta(-1);
            }
          }
        }, { passive: true });
      }

      // ── Pulsar imagen → abrir lightbox en la foto actual ──
      imgWrap.addEventListener("click", pulsarMedia);

      imgWrap.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          pulsarMedia();
        } else if (e.key === "ArrowLeft" && numFotos > 1) {
          e.preventDefault();
          actualizarFotoTarjeta(-1);
        } else if (e.key === "ArrowRight" && numFotos > 1) {
          e.preventDefault();
          actualizarFotoTarjeta(1);
        }
      });

      tarjeta.appendChild(imgWrap);
      tarjeta.appendChild(cuerpo);
      contenedorGaleria.appendChild(tarjeta);
    });
  };

  // ── ZOOM ──────────────────────────────────────────────────────────────────

  const resetZoom = () => {
    isZoomed = false;
    zoomScale = 1;
    panX = 0;
    panY = 0;
    isDragging = false;
    hasDragged = false;
    if (lightboxImg) {
      lightboxImg.style.transform = "";
      lightboxImg.style.transformOrigin = "center center";
    }
    lightboxVisual?.classList.remove("con-zoom", "arrastrando");
  };

  const aplicarZoom = (clientX, clientY) => {
    if (!lightboxImg || !lightboxVisual) return;
    const rect = lightboxImg.getBoundingClientRect();
    const percentX = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const percentY = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
    zoomScale = 2.5;
    isZoomed = true;
    panX = 0;
    panY = 0;
    lightboxImg.style.transformOrigin = `${percentX}% ${percentY}%`;
    lightboxImg.style.transform = `scale(${zoomScale})`;
    lightboxVisual.classList.add("con-zoom");
  };

  // ── LIGHTBOX ──────────────────────────────────────────────────────────────

  /**
   * Abre el visor con el array de fotos de una categoría.
   * @param {Array}   fotosArr   Array plano {src, ancho, alto, alt, trabajo}
   * @param {number}  fotoIndex  Índice de la foto a mostrar inicialmente
   * @param {Element} elementoOrigen  Elemento que recibirá el foco al cerrar
   */
  const abrirLightbox = (fotosArr, fotoIndex, elementoOrigen) => {
    if (!lightbox || !fotosArr?.length) return;
    elementoPrevioFoco = elementoOrigen;
    fotosLightbox = fotosArr;
    fotoLightboxIndex = fotoIndex || 0;
    actualizarContenidoLightbox();
    lightbox.classList.add("abierto");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    btnCerrarLightbox?.focus();
  };

  const cerrarLightbox = () => {
    if (!lightbox) return;
    resetZoom();
    lightbox.classList.remove("abierto");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (elementoPrevioFoco) {
      elementoPrevioFoco.focus();
      elementoPrevioFoco = null;
    }
  };

  const actualizarContenidoLightbox = () => {
    if (!fotosLightbox?.length) return;
    const foto = fotosLightbox[fotoLightboxIndex];
    if (!foto) return;

    resetZoom();

    lightboxImg.src = foto.src;
    lightboxImg.alt = foto.alt;
    lightboxImg.width = foto.ancho;
    lightboxImg.height = foto.alto;

    lightboxTitulo.textContent = foto.trabajo.titulo;
    lightboxCat.textContent = obtenerNombreCategoria(foto.trabajo.categoria);
    lightboxDesc.textContent = foto.trabajo.descripcion;

    if (lightboxContador) {
      lightboxContador.textContent = `${fotoLightboxIndex + 1} / ${fotosLightbox.length}`;
    }

    if (fotosLightbox.length <= 1) {
      btnPrevLightbox?.classList.add("oculto");
      btnNextLightbox?.classList.add("oculto");
    } else {
      btnPrevLightbox?.classList.remove("oculto");
      btnNextLightbox?.classList.remove("oculto");
    }

    const catEncontrada = CONFIG.categorias.find((c) => c.id === foto.trabajo.categoria);
    const mensajeWa =
      catEncontrada?.mensajeWa ||
      CONFIG.mensajesWa.porCategoria[foto.trabajo.categoria] ||
      CONFIG.mensajesWa.general;
    if (lightboxBtnWa) lightboxBtnWa.href = construirEnlaceWa(mensajeWa);
  };

  const navegarFotoLightbox = (delta) => {
    if (!fotosLightbox?.length || fotosLightbox.length <= 1) return;
    fotoLightboxIndex = (fotoLightboxIndex + delta + fotosLightbox.length) % fotosLightbox.length;
    actualizarContenidoLightbox();
  };

  // ── EVENTOS DEL LIGHTBOX ─────────────────────────────────────────────────

  const inicializarEventosLightbox = () => {
    btnCerrarLightbox?.addEventListener("click", cerrarLightbox);

    btnPrevLightbox?.addEventListener("click", (e) => {
      e.stopPropagation();
      navegarFotoLightbox(-1);
    });
    btnNextLightbox?.addEventListener("click", (e) => {
      e.stopPropagation();
      navegarFotoLightbox(1);
    });

    // Clic fuera de la foto para cerrar (si no hay zoom)
    lightbox?.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target === lightboxVisual) {
        if (isZoomed) resetZoom();
        else cerrarLightbox();
      }
    });

    // Clic sobre la foto: alterna zoom
    lightboxImg?.addEventListener("click", (e) => {
      e.stopPropagation();
      if (hasDragged) { hasDragged = false; return; }
      if (isZoomed) resetZoom();
      else aplicarZoom(e.clientX, e.clientY);
    });

    // Arrastre con ratón (escritorio, foto ampliada)
    lightboxImg?.addEventListener("mousedown", (e) => {
      if (!isZoomed) return;
      isDragging = true;
      hasDragged = false;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      initialPanX = panX;
      initialPanY = panY;
      lightboxVisual?.classList.add("arrastrando");
      e.preventDefault();
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging || !isZoomed) return;
      const dx = e.clientX - dragStartX;
      const dy = e.clientY - dragStartY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasDragged = true;
      panX = initialPanX + dx;
      panY = initialPanY + dy;
      lightboxImg.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomScale})`;
    });

    window.addEventListener("mouseup", () => {
      if (isDragging) {
        isDragging = false;
        lightboxVisual?.classList.remove("arrastrando");
      }
    });

    // Zoom con rueda del ratón
    lightboxVisual?.addEventListener("wheel", (e) => {
      if (!lightbox.classList.contains("abierto")) return;
      e.preventDefault();
      if (e.deltaY < 0 && !isZoomed) aplicarZoom(e.clientX, e.clientY);
      else if (e.deltaY > 0 && isZoomed) resetZoom();
    }, { passive: false });

    // Eventos táctiles en el visor
    let touchStartX = 0;
    let touchStartY = 0;
    let touchInitialPanX = 0;
    let touchInitialPanY = 0;
    let touchMoved = false;

    lightboxVisual?.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchMoved = false;
        if (isZoomed) {
          isDragging = true;
          touchInitialPanX = panX;
          touchInitialPanY = panY;
          lightboxVisual?.classList.add("arrastrando");
        }
      }
    }, { passive: false });

    lightboxVisual?.addEventListener("touchmove", (e) => {
      if (e.touches.length === 1) {
        const dx = e.touches[0].clientX - touchStartX;
        const dy = e.touches[0].clientY - touchStartY;
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) touchMoved = true;
        if (isZoomed && isDragging) {
          e.preventDefault();
          panX = touchInitialPanX + dx;
          panY = touchInitialPanY + dy;
          lightboxImg.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomScale})`;
        }
      }
    }, { passive: false });

    lightboxVisual?.addEventListener("touchend", (e) => {
      const now = Date.now();
      const esDobleToque = now - lastTouchTime < 300;
      lastTouchTime = now;

      if (isZoomed) {
        isDragging = false;
        lightboxVisual?.classList.remove("arrastrando");
        if (!touchMoved || esDobleToque) resetZoom();
      } else {
        if (touchMoved && e.changedTouches.length === 1) {
          const diffX = e.changedTouches[0].clientX - touchStartX;
          if (Math.abs(diffX) > 40) {
            if (diffX < 0) navegarFotoLightbox(1);
            else navegarFotoLightbox(-1);
          }
        } else if (esDobleToque) {
          aplicarZoom(touchStartX, touchStartY);
        }
      }
    }, { passive: false });

    // Teclado
    document.addEventListener("keydown", (e) => {
      if (!lightbox?.classList.contains("abierto")) return;

      if (e.key === "Escape") {
        e.preventDefault();
        if (isZoomed) resetZoom();
        else cerrarLightbox();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        navegarFotoLightbox(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navegarFotoLightbox(1);
      } else if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        if (!isZoomed && lightboxImg) {
          const rect = lightboxImg.getBoundingClientRect();
          aplicarZoom(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
      } else if (e.key === "-" || e.key === "_") {
        e.preventDefault();
        if (isZoomed) resetZoom();
      } else if (e.key === "Enter" || e.key === " ") {
        if (document.activeElement === lightboxImg || document.activeElement === lightboxVisual) {
          e.preventDefault();
          if (isZoomed) resetZoom();
          else {
            const rect = lightboxImg.getBoundingClientRect();
            aplicarZoom(rect.left + rect.width / 2, rect.top + rect.height / 2);
          }
        }
      }
    });
  };

  // ── ENLACES ESTÁTICOS ─────────────────────────────────────────────────────

  const inicializarEnlaces = () => {
    if (btnHeroWa) btnHeroWa.href = construirEnlaceWa(CONFIG.mensajesWa.general);
    if (btnWaFlotante) btnWaFlotante.href = construirEnlaceWa(CONFIG.mensajesWa.flotante);

    if (pieEnlaceWa) {
      pieEnlaceWa.href = construirEnlaceWa(CONFIG.mensajesWa.pie);
      pieEnlaceWa.textContent = "WhatsApp (+34 624 93 94 26)";
    }

    if (anioActualEl) anioActualEl.textContent = new Date().getFullYear();
  };

  // ── ARRANQUE ──────────────────────────────────────────────────────────────

  const iniciar = () => {
    const listaTrabajos = typeof trabajos !== "undefined" ? trabajos : [];
    inicializarEnlaces();
    renderizarCategorias(listaTrabajos);
    renderizarGaleria(listaTrabajos);
    inicializarEventosLightbox();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
