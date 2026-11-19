/**
 * Expecta D.M. · Arte por encargo
 * Lógica de la aplicación web:
 * - Catálogo dinámico y filtros condicionales
 * - Tarjetas con carrusel multifoto accesible (flechas, contador y swipe)
 * - Visor (Lightbox) con navegación entre fotos del trabajo, swipe y zoom al 250% interactivo
 * - Encapsulado dentro de IIFE para no generar variables globales
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
        ilustracion: "¡Hola! Me gustaría pedir una ilustración por encargo. Te paso una foto de referencia para que me digas si es posible.",
        otros: "¡Hola! Me gustaría pedirte un encargo especial. Te cuento la idea y te mando referencias."
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
        descripcion: "Retratos y piezas originales en técnica mixta."
      },
      {
        id: "ilustracion",
        nombre: "Ilustración por encargo",
        descripcion: "Piezas originales a tinta, plumilla y acuarela."
      },
      {
        id: "otros",
        nombre: "Otros encargos",
        descripcion: "Piezas especiales hechas a medida, como maquetas. Si lo imaginas, pregúntame.",
        mensajeWa: "¡Hola! Me gustaría pedirte un encargo especial. Te cuento la idea y te mando referencias."
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

  // Estado general de la galería
  let categoriaFiltroActiva = "todos";
  let trabajosVisibles = [];
  let elementoPrevioFoco = null;

  // Estado del visor (Lightbox) y zoom
  let trabajoLightbox = null;
  let fotoLightboxIndex = 0;
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

  // Elementos del DOM
  const contenedorCategorias = document.getElementById("contenedor-categorias");
  const contenedorFiltros = document.getElementById("galeria-filtros");
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
  const pieEnlaceIg = document.getElementById("pie-enlace-ig");
  const pieEnlaceWa = document.getElementById("pie-enlace-wa");
  const anioActualEl = document.getElementById("anio-actual");

  /**
   * Renderiza las tarjetas de categorías según los trabajos existentes.
   * Utiliza la primera imagen (portada) de cada categoría.
   */
  const renderizarCategorias = (listaTrabajos) => {
    if (!contenedorCategorias) return;

    contenedorCategorias.innerHTML = "";
    const categoriasActivas = obtenerCategoriasActivas(listaTrabajos);

    categoriasActivas.forEach((cat) => {
      const primerTrabajo = listaTrabajos.find((t) => t.categoria === cat.id);
      if (!primerTrabajo || !primerTrabajo.imagenes || primerTrabajo.imagenes.length === 0) return;

      const portada = primerTrabajo.imagenes[0];
      const mensajeWa =
        cat.mensajeWa ||
        CONFIG.mensajesWa.porCategoria[cat.id] ||
        CONFIG.mensajesWa.general;
      const urlWa = construirEnlaceWa(mensajeWa);

      const tarjeta = document.createElement("article");
      tarjeta.className = "tarjeta-categoria";
      tarjeta.innerHTML = `
        <div class="categoria-img-wrap">
          <img 
            src="${portada.src}" 
            alt="${portada.alt || primerTrabajo.titulo + ' - ' + cat.nombre}" 
            width="${portada.ancho}" 
            height="${portada.alto}" 
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

    // Tarjeta final para ideas personalizadas (ocupa ancho completo)
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
   * Cada trabajo es UNA sola tarjeta con carrusel de fotos si contiene más de una.
   */
  const renderizarGaleria = (listaTrabajos) => {
    if (!contenedorGaleria) return;

    contenedorGaleria.innerHTML = "";

    trabajosVisibles =
      categoriaFiltroActiva === "todos"
        ? [...listaTrabajos]
        : listaTrabajos.filter((t) => t.categoria === categoriaFiltroActiva);

      trabajosVisibles.forEach((trabajo, trabajoIndex) => {
        const nombreCat = obtenerNombreCategoria(trabajo.categoria);
        const fotos = trabajo.imagenes || [];
        const numFotos = fotos.length;
        let fotoIndexActual = 0;

        const portada = fotos[0] || { src: "", alt: trabajo.titulo, ancho: 1200, alto: 1200 };

        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta-trabajo";

        // Contenedor visual de la imagen con carrusel
        const imgWrap = document.createElement("div");
        imgWrap.className = "trabajo-img-wrap";
        imgWrap.tabIndex = 0;
        imgWrap.setAttribute("role", "button");
        imgWrap.setAttribute("aria-label", `Ver ${trabajo.titulo} en detalle`);

          const imgEl = document.createElement("img");
          imgEl.src = portada.src;
          imgEl.alt = portada.alt;
          imgEl.width = portada.ancho;
          imgEl.height = portada.alto;
          imgEl.loading = "lazy";
          imgEl.className = "trabajo-img";
          imgWrap.appendChild(imgEl);

          let contadorEl = null;

          // Actualiza la imagen mostrada en la tarjeta
          const actualizarFotoTarjeta = (delta) => {
            fotoIndexActual = (fotoIndexActual + delta + numFotos) % numFotos;
            const fotoActual = fotos[fotoIndexActual];
            imgEl.src = fotoActual.src;
            imgEl.alt = fotoActual.alt;
            imgEl.width = fotoActual.ancho;
            imgEl.height = fotoActual.alto;
            if (contadorEl) {
              contadorEl.textContent = `${fotoIndexActual + 1} / ${numFotos}`;
            }
          };

          // Si tiene más de una foto, añadir flechas accesibles y contador
          if (numFotos > 1) {
            const btnPrev = document.createElement("button");
            btnPrev.type = "button";
            btnPrev.className = "carrusel-btn carrusel-prev";
            btnPrev.setAttribute("aria-label", "Foto anterior");
            btnPrev.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        `;
            btnPrev.addEventListener("click", (e) => {
              e.stopPropagation();
              actualizarFotoTarjeta(-1);
            });
            imgWrap.appendChild(btnPrev);

            const btnNext = document.createElement("button");
            btnNext.type = "button";
            btnNext.className = "carrusel-btn carrusel-next";
            btnNext.setAttribute("aria-label", "Foto siguiente");
            btnNext.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        `;
            btnNext.addEventListener("click", (e) => {
              e.stopPropagation();
              actualizarFotoTarjeta(1);
            });
            imgWrap.appendChild(btnNext);

            contadorEl = document.createElement("span");
            contadorEl.className = "carrusel-contador";
            contadorEl.setAttribute("aria-live", "polite");
            contadorEl.textContent = `1 / ${numFotos}`;
            imgWrap.appendChild(contadorEl);

            // Deslizamiento táctil (swipe) en móvil para pasar fotos
            let touchStartX = 0;
            let touchStartY = 0;
            let esSwipe = false;

            imgWrap.addEventListener(
              "touchstart",
              (e) => {
                if (e.touches.length === 1) {
                  touchStartX = e.touches[0].clientX;
                  touchStartY = e.touches[0].clientY;
                  esSwipe = false;
                }
              },
              { passive: true }
            );

            imgWrap.addEventListener(
              "touchmove",
              (e) => {
                if (e.touches.length === 1) {
                  const dx = e.touches[0].clientX - touchStartX;
                  const dy = e.touches[0].clientY - touchStartY;
                  if (Math.abs(dx) > 15 && Math.abs(dx) > Math.abs(dy)) {
                    esSwipe = true;
                  }
                }
              },
              { passive: true }
            );

            imgWrap.addEventListener(
              "touchend",
              (e) => {
                if (esSwipe && e.changedTouches.length === 1) {
                  const diffX = e.changedTouches[0].clientX - touchStartX;
                  if (Math.abs(diffX) > 40) {
                    if (diffX < 0) actualizarFotoTarjeta(1);
                    else actualizarFotoTarjeta(-1);
                  }
                }
              },
              { passive: true }
            );
          }

          // Al pulsar la foto (o Enter/Espacio en el wrap), abre el visor en esa foto exacta
          imgWrap.addEventListener("click", () => {
            abrirLightbox(trabajoIndex, fotoIndexActual, imgWrap);
          });

          imgWrap.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              abrirLightbox(trabajoIndex, fotoIndexActual, imgWrap);
            } else if (e.key === "ArrowLeft" && numFotos > 1) {
              e.preventDefault();
              actualizarFotoTarjeta(-1);
            } else if (e.key === "ArrowRight" && numFotos > 1) {
              e.preventDefault();
              actualizarFotoTarjeta(1);
            }
          });

          tarjeta.appendChild(imgWrap);

          // Cuerpo con textos
          const cuerpo = document.createElement("div");
          cuerpo.className = "trabajo-cuerpo";
          cuerpo.innerHTML = `
        <span class="trabajo-categoria">${nombreCat}</span>
        <h3 class="trabajo-titulo">${trabajo.titulo}</h3>
        <p class="trabajo-desc">${trabajo.descripcion}</p>
      `;
          tarjeta.appendChild(cuerpo);

          contenedorGaleria.appendChild(tarjeta);
        });
      };

      /**
       * Restablece el zoom de la imagen en el visor a su escala normal.
       */
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

        /**
         * Aplica zoom al 250% centrado exactamente en el punto donde se hizo clic o doble toque.
         */
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

        /**
         * Abre el visor Lightbox en un trabajo y foto determinados.
         */
        const abrirLightbox = (trabajoIndex, fotoIndex, elementoOrigen) => {
          if (!lightbox || !trabajosVisibles[trabajoIndex]) return;

          elementoPrevioFoco = elementoOrigen;
          trabajoLightbox = trabajosVisibles[trabajoIndex];
          fotoLightboxIndex = fotoIndex || 0;

          actualizarContenidoLightbox();

          lightbox.classList.add("abierto");
          lightbox.setAttribute("aria-hidden", "false");
          document.body.style.overflow = "hidden";

          btnCerrarLightbox?.focus();
        };

        /**
         * Cierra el visor Lightbox y restaura el foco original.
         */
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

        /**
         * Actualiza la imagen a tamaño completo y los datos mostrados en el Lightbox.
         */
        const actualizarContenidoLightbox = () => {
          if (!trabajoLightbox) return;

          const fotos = trabajoLightbox.imagenes || [];
          const foto = fotos[fotoLightboxIndex] || fotos[0];
          if (!foto) return;

          resetZoom();

          // Imagen a tamaño completo
          lightboxImg.src = foto.src;
          lightboxImg.alt = foto.alt;
          lightboxImg.width = foto.ancho;
          lightboxImg.height = foto.alto;

          lightboxTitulo.textContent = trabajoLightbox.titulo;
          lightboxCat.textContent = obtenerNombreCategoria(trabajoLightbox.categoria);
          lightboxDesc.textContent = trabajoLightbox.descripcion;

          if (lightboxContador) {
            lightboxContador.textContent = `${fotoLightboxIndex + 1} / ${fotos.length}`;
          }

          // Si tiene una sola foto, ocultar flechas del visor
          if (fotos.length <= 1) {
            btnPrevLightbox?.classList.add("oculto");
            btnNextLightbox?.classList.add("oculto");
          } else {
            btnPrevLightbox?.classList.remove("oculto");
            btnNextLightbox?.classList.remove("oculto");
          }

          // Botón de WhatsApp para este encargo
          const catEncontrada = CONFIG.categorias.find((c) => c.id === trabajoLightbox.categoria);
          const mensajeWa =
            catEncontrada?.mensajeWa ||
            CONFIG.mensajesWa.porCategoria[trabajoLightbox.categoria] ||
            CONFIG.mensajesWa.general;
          if (lightboxBtnWa) {
            lightboxBtnWa.href = construirEnlaceWa(mensajeWa);
          }
        };

        /**
         * Navega entre las fotos del trabajo actualmente abierto en el Lightbox.
         */
          const navegarFotoLightbox = (delta) => {
            if (!trabajoLightbox || !trabajoLightbox.imagenes || trabajoLightbox.imagenes.length <= 1) return;
            const numFotos = trabajoLightbox.imagenes.length;
            fotoLightboxIndex = (fotoLightboxIndex + delta + numFotos) % numFotos;
            actualizarContenidoLightbox();
          };

          /**
           * Configura eventos interactivos del Lightbox: Zoom, arrastre, swipe y teclado.
           */
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

            // Clic fuera de la foto para cerrar (solo cuando no está ampliada)
            lightbox?.addEventListener("click", (e) => {
                if (e.target === lightbox || e.target === lightboxVisual) {
                  if (isZoomed) {
                    resetZoom();
                  } else {
                    cerrarLightbox();
                  }
                }
              });

            // Clic directo sobre la foto para alternar Zoom al 250% o volver al normal
            lightboxImg?.addEventListener("click", (e) => {
              e.stopPropagation();
              if (hasDragged) {
                hasDragged = false;
                return;
              }
              if (isZoomed) {
                resetZoom();
              } else {
                aplicarZoom(e.clientX, e.clientY);
              }
            });

            // Arrastre con ratón en escritorio con foto ampliada
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
              if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
                hasDragged = true;
              }
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

            // Zoom con rueda del ratón en escritorio
            lightboxVisual?.addEventListener(
              "wheel",
              (e) => {
                if (!lightbox.classList.contains("abierto")) return;
                e.preventDefault();
                if (e.deltaY < 0 && !isZoomed) {
                  aplicarZoom(e.clientX, e.clientY);
                } else if (e.deltaY > 0 && isZoomed) {
                  resetZoom();
                }
              },
              { passive: false }
            );

            // Eventos táctiles en móvil (Zoom con doble toque, arrastre ampliado o swipe entre fotos)
            let touchStartX = 0;
            let touchStartY = 0;
            let touchInitialPanX = 0;
            let touchInitialPanY = 0;
            let touchMoved = false;

            lightboxVisual?.addEventListener(
              "touchstart",
              (e) => {
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
              },
              { passive: false }
            );

            lightboxVisual?.addEventListener(
              "touchmove",
              (e) => {
                if (e.touches.length === 1) {
                  const dx = e.touches[0].clientX - touchStartX;
                  const dy = e.touches[0].clientY - touchStartY;
                  if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
                    touchMoved = true;
                  }

                  if (isZoomed && isDragging) {
                    e.preventDefault();
                    panX = touchInitialPanX + dx;
                    panY = touchInitialPanY + dy;
                    lightboxImg.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomScale})`;
                  }
                }
              },
              { passive: false }
            );

            lightboxVisual?.addEventListener(
              "touchend",
              (e) => {
                const now = Date.now();
                const esDobleToque = now - lastTouchTime < 300;
                lastTouchTime = now;

                if (isZoomed) {
                  isDragging = false;
                  lightboxVisual?.classList.remove("arrastrando");
                  if (!touchMoved || esDobleToque) {
                    resetZoom();
                  }
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
              },
              { passive: false }
            );

            // Navegación y atajos por teclado
            document.addEventListener("keydown", (e) => {
              if (!lightbox || !lightbox.classList.contains("abierto")) return;

              if (e.key === "Escape") {
                e.preventDefault();
                if (isZoomed) {
                  resetZoom();
                } else {
                  cerrarLightbox();
                }
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
                if (isZoomed) {
                  resetZoom();
                }
              } else if (e.key === "Enter" || e.key === " ") {
                if (document.activeElement === lightboxImg || document.activeElement === lightboxVisual) {
                  e.preventDefault();
                  if (isZoomed) {
                    resetZoom();
                  } else {
                    const rect = lightboxImg.getBoundingClientRect();
                    aplicarZoom(rect.left + rect.width / 2, rect.top + rect.height / 2);
                  }
                }
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
