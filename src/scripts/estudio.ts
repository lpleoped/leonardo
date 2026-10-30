type Recorte = {
  boton: HTMLButtonElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  giro: number;
  hasta: number;
  tocado: number;
  suprimirClick: boolean;
  baseX: number;
  baseY: number;
  fase: number;
  fase2: number;
  ritmo: number;
  sobre: boolean;
  anclar: boolean;
};

const oscilar = (recorte: Recorte, tiempo: number) => {
  const t = tiempo * recorte.ritmo;
  return {
    x: Math.sin(t + recorte.fase) * 6 + Math.sin(t * 0.57 + recorte.fase2) * 3,
    y: Math.cos(t * 0.82 + recorte.fase2) * 5 + Math.sin(t * 1.31 + recorte.fase) * 2.5,
    giro: Math.sin(t * 0.64 + recorte.fase) * 1.1,
  };
};

const limitar = (valor: number, minimo: number, maximo: number) =>
  Math.min(Math.max(valor, minimo), Math.max(minimo, maximo));

for (const estudio of document.querySelectorAll<HTMLElement>("[data-estudio]")) {
  const mesa = estudio.querySelector<HTMLElement>("[data-estudio-mesa]");
  if (!mesa) continue;

  const preferencia = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reducido = preferencia.matches;
  let visible = false;
  let cuadro = 0;
  let anterior = 0;
  let arrastre: { recorte: Recorte; id: number; inicioX: number; inicioY: number;
    x: number; y: number; ultimoX: number; ultimoY: number; tiempo: number;
    movido: boolean } | null = null;

  const nombre = document.querySelector<HTMLElement>(".home-nombre");
  const recortes: Recorte[] = Array.from(
    estudio.querySelectorAll<HTMLButtonElement>("[data-estudio-recorte]"),
    (boton) => ({
      boton, x: 0, y: 0, vx: 0, vy: 0, giro: 0, hasta: 0, tocado: 0, suprimirClick: false,
      baseX: 0, baseY: 0, fase: Math.random() * Math.PI * 2, fase2: Math.random() * Math.PI * 2,
      ritmo: 0.00032 + Math.random() * 0.00022, sobre: false, anclar: true,
    }),
  );

  const cursor = { x: 0, y: 0, vx: 0, vy: 0, tiempo: 0 };
  const seguirCursor = (evento: PointerEvent) => {
    if (evento.pointerType === "touch") return;
    const delta = evento.timeStamp - cursor.tiempo;
    if (delta <= 0) return;
    if (delta > 100) {
      cursor.vx = 0;
      cursor.vy = 0;
    } else {
      cursor.vx += ((evento.clientX - cursor.x) / delta - cursor.vx) * 0.5;
      cursor.vy += ((evento.clientY - cursor.y) / delta - cursor.vy) * 0.5;
    }
    cursor.x = evento.clientX;
    cursor.y = evento.clientY;
    cursor.tiempo = evento.timeStamp;
  };
  estudio.addEventListener("pointermove", seguirCursor, { passive: true });

  // Each card stays in its own margin, leaving the reel and its links clear.
  const limites = (recorte: Recorte) => {
    const ancho = mesa.clientWidth;
    const alto = mesa.clientHeight;
    const { offsetLeft: izquierda, offsetTop: arriba, offsetWidth: w, offsetHeight: h } = recorte.boton;
    const borde = 14;
    // On the phone the collage is its own strip, so each photo can travel the band.
    if (ancho <= 640) {
      return {
        minX: borde - izquierda,
        maxX: ancho - borde - izquierda - w,
        minY: borde - arriba,
        maxY: Math.max(borde, alto - h - borde) - arriba,
      };
    }
    const margen = Math.min(ancho / 2, Math.max(w + borde * 2, ancho * 0.19));
    const ladoIzquierdo = recorte.boton.dataset.lado === "izquierdo";
    return {
      minX: (ladoIzquierdo ? borde : ancho - margen + borde) - izquierda,
      maxX: (ladoIzquierdo ? margen - borde : ancho - borde) - izquierda - w,
      minY: borde - arriba,
      maxY: Math.max(borde, alto - h - 70) - arriba,
    };
  };

  // Keeps every photo outside the name, even while it drifts or is dragged.
  const apartarDelNombre = (recorte: Recorte) => {
    if (!nombre || mesa.clientWidth <= 640) return;
    const mesaCaja = mesa.getBoundingClientRect();
    const letras = nombre.getBoundingClientRect();
    const holgura = 18;
    const nL = letras.left - mesaCaja.left - holgura;
    const nR = letras.right - mesaCaja.left + holgura;
    const nT = letras.top - mesaCaja.top - holgura;
    const nB = letras.bottom - mesaCaja.top + holgura;
    const { offsetLeft, offsetTop, offsetWidth: w, offsetHeight: h } = recorte.boton;
    const top = offsetTop + recorte.y;
    const bottom = top + h;
    if (bottom <= nT || top >= nB) return;
    const left = offsetLeft + recorte.x;
    const right = left + w;
    if (right <= nL || left >= nR) return;
    if (recorte.boton.dataset.lado === "izquierdo") recorte.x -= right - nL;
    else recorte.x += nR - left;
  };

  const pintar = (recorte: Recorte) => {
    const aplicar = () => {
      const limite = limites(recorte);
      recorte.x = limitar(recorte.x, limite.minX, limite.maxX);
      recorte.y = limitar(recorte.y, limite.minY, limite.maxY);
    };
    aplicar();
    apartarDelNombre(recorte);
    aplicar();
    recorte.boton.style.setProperty("--recorte-x", `${recorte.x.toFixed(2)}px`);
    recorte.boton.style.setProperty("--recorte-y", `${recorte.y.toFixed(2)}px`);
    recorte.boton.style.setProperty("--recorte-empuje", `${recorte.giro.toFixed(2)}deg`);
  };

  const detener = () => {
    cancelAnimationFrame(cuadro);
    cuadro = 0;
    anterior = 0;
    for (const recorte of recortes) {
      recorte.vx = 0;
      recorte.vy = 0;
      recorte.giro = 0;
      pintar(recorte);
    }
  };

  const puedeAnimar = () => visible && !document.hidden && !reducido;

  const animar = (tiempo: number) => {
    cuadro = 0;
    if (!puedeAnimar()) { detener(); return; }
    const delta = Math.min(32, anterior ? tiempo - anterior : 16);
    anterior = tiempo;
    for (const recorte of recortes) {
      if (arrastre?.recorte === recorte) continue;
      const inercia = tiempo <= recorte.hasta && Math.abs(recorte.vx) + Math.abs(recorte.vy) >= 0.009;
      if (inercia) {
        const limite = limites(recorte);
        recorte.x += recorte.vx * delta;
        recorte.y += recorte.vy * delta;
        if (recorte.x < limite.minX || recorte.x > limite.maxX) recorte.vx *= -0.72;
        if (recorte.y < limite.minY || recorte.y > limite.maxY) recorte.vy *= -0.72;
        const friccion = Math.pow(0.972, delta / 16);
        recorte.vx *= friccion;
        recorte.vy *= friccion;
        recorte.giro *= Math.pow(0.96, delta / 16);
        pintar(recorte);
        continue;
      }
      if (recorte.vx !== 0 || recorte.vy !== 0) recorte.anclar = true;
      recorte.vx = 0;
      recorte.vy = 0;
      if (recorte.sobre) { pintar(recorte); continue; }
      if (recorte.anclar) {
        const origen = oscilar(recorte, tiempo);
        recorte.baseX = recorte.x - origen.x;
        recorte.baseY = recorte.y - origen.y;
        recorte.anclar = false;
      }
      const vaiven = oscilar(recorte, tiempo);
      recorte.x = recorte.baseX + vaiven.x;
      recorte.y = recorte.baseY + vaiven.y;
      recorte.giro = vaiven.giro;
      pintar(recorte);
    }
    cuadro = requestAnimationFrame(animar);
  };

  const mover = () => {
    if (!cuadro && puedeAnimar()) cuadro = requestAnimationFrame(animar);
  };

  const impulsar = (recorte: Recorte, suave = false) => {
    if (reducido) {
      // Reduced motion keeps an explicit user action, without rebound or inertia.
      recorte.x += recorte.boton.dataset.lado === "izquierdo" ? 9 : -9;
      recorte.y += recorte.y > 0 ? -9 : 9;
      pintar(recorte);
      return;
    }
    recorte.vx = (recorte.boton.dataset.lado === "izquierdo" ? 1 : -1) * (suave ? 0.13 : 0.6);
    recorte.vy = suave ? -0.09 : -0.4;
    recorte.giro = suave ? -2 : -7;
    recorte.hasta = performance.now() + 4500;
    mover();
  };

  // A passing cursor pushes the card along its own heading, never during a drag.
  const empujar = (recorte: Recorte, evento: PointerEvent) => {
    if (evento.pointerType === "touch" || evento.buttons !== 0 || arrastre || !puedeAnimar()) return;
    seguirCursor(evento);
    const ahora = performance.now();
    if (ahora - recorte.tocado < 250) return;
    let dx = cursor.vx;
    let dy = cursor.vy;
    let rapidez = Math.hypot(dx, dy);
    if (rapidez < 0.05) {
      const caja = recorte.boton.getBoundingClientRect();
      dx = caja.left + caja.width / 2 - evento.clientX;
      dy = caja.top + caja.height / 2 - evento.clientY;
      rapidez = 0;
    }
    const largo = Math.hypot(dx, dy) || 1;
    const fuerza = limitar(rapidez * 0.8, 0.25, 1.1);
    recorte.tocado = ahora;
    recorte.vx = limitar(recorte.vx + (dx / largo) * fuerza, -1.2, 1.2);
    recorte.vy = limitar(recorte.vy + (dy / largo) * fuerza, -1.2, 1.2);
    recorte.giro = limitar(recorte.giro + (dx / largo) * fuerza * 12, -9, 9);
    recorte.hasta = ahora + 4500;
    mover();
  };

  const devolver = (recorte: Recorte) => {
    recorte.x = 0;
    recorte.y = 0;
    recorte.baseX = 0;
    recorte.baseY = 0;
    recorte.vx = 0;
    recorte.vy = 0;
    recorte.giro = 0;
    recorte.anclar = true;
    pintar(recorte);
  };

  for (const recorte of recortes) {
    const { boton } = recorte;
    boton.addEventListener("pointerenter", (evento) => {
      if (evento.pointerType === "touch") return;
      recorte.sobre = true;
      empujar(recorte, evento);
    });
    boton.addEventListener("pointerleave", (evento) => {
      if (evento.pointerType === "touch") return;
      recorte.sobre = false;
      if (Math.abs(recorte.vx) + Math.abs(recorte.vy) < 0.009) recorte.anclar = true;
    });

    boton.addEventListener("pointerdown", (evento) => {
      // A finger slide on the photo moves it. A tap, without a slide, still nudges.
      if ((evento.pointerType !== "touch" && evento.button !== 0) || arrastre) return;
      if (evento.pointerType === "touch") recorte.sobre = true;
      recorte.vx = 0;
      recorte.vy = 0;
      arrastre = { recorte, id: evento.pointerId, inicioX: evento.clientX, inicioY: evento.clientY,
        x: recorte.x, y: recorte.y, ultimoX: evento.clientX, ultimoY: evento.clientY,
        tiempo: performance.now(), movido: false };
      boton.setPointerCapture(evento.pointerId);
      boton.classList.add("esta-en-mano");
    });

    boton.addEventListener("pointermove", (evento) => {
      if (!arrastre || arrastre.recorte !== recorte || arrastre.id !== evento.pointerId) return;
      const ahora = performance.now();
      const delta = Math.max(12, ahora - arrastre.tiempo);
      const dx = evento.clientX - arrastre.inicioX;
      const dy = evento.clientY - arrastre.inicioY;
      arrastre.movido ||= Math.hypot(dx, dy) > 4;
      recorte.x = arrastre.x + dx;
      recorte.y = arrastre.y + dy;
      recorte.vx = limitar((evento.clientX - arrastre.ultimoX) / delta, -1.2, 1.2);
      recorte.vy = limitar((evento.clientY - arrastre.ultimoY) / delta, -1.2, 1.2);
      recorte.giro = reducido ? 0 : limitar(dx * 0.055, -6, 6);
      arrastre.ultimoX = evento.clientX;
      arrastre.ultimoY = evento.clientY;
      arrastre.tiempo = ahora;
      pintar(recorte);
    });

    const soltar = (evento: PointerEvent) => {
      if (!arrastre || arrastre.recorte !== recorte || arrastre.id !== evento.pointerId) return;
      const movido = arrastre.movido;
      const fresco = performance.now() - arrastre.tiempo < 100;
      arrastre = null;
      boton.classList.remove("esta-en-mano");
      if (evento.pointerType === "touch") recorte.sobre = false;
      recorte.anclar = true;
      recorte.suprimirClick = movido;
      if (boton.hasPointerCapture(evento.pointerId)) boton.releasePointerCapture(evento.pointerId);
      if (evento.type === "pointercancel" || !movido || !fresco || !puedeAnimar()) {
        recorte.vx = 0;
        recorte.vy = 0;
        recorte.giro = 0;
        pintar(recorte);
      } else {
        recorte.hasta = performance.now() + 4500;
        mover();
      }
      // Browsers dispatch a click immediately after a completed pointer gesture.
      window.setTimeout(() => { recorte.suprimirClick = false; }, 0);
    };
    boton.addEventListener("pointerup", soltar);
    boton.addEventListener("pointercancel", soltar);
    boton.addEventListener("lostpointercapture", soltar);

    boton.addEventListener("click", () => {
      if (!recorte.suprimirClick) impulsar(recorte);
    });

    boton.addEventListener("keydown", (evento) => {
      const paso = evento.shiftKey ? 28 : 14;
      const teclas: Record<string, [number, number]> = {
        ArrowLeft: [-paso, 0], ArrowRight: [paso, 0], ArrowUp: [0, -paso], ArrowDown: [0, paso],
      };
      if (evento.key === "Escape") { evento.preventDefault(); devolver(recorte); return; }
      const cambio = teclas[evento.key];
      if (!cambio) return;
      evento.preventDefault();
      recorte.vx = 0;
      recorte.vy = 0;
      recorte.giro = 0;
      recorte.x += cambio[0];
      recorte.y += cambio[1];
      recorte.baseX = recorte.x;
      recorte.baseY = recorte.y;
      recorte.anclar = true;
      pintar(recorte);
    });
  }

  new IntersectionObserver(([entrada]) => {
    visible = entrada.isIntersecting;
    if (!visible) { detener(); return; }
    mover();
  }, { threshold: 0.1 }).observe(mesa);

  new ResizeObserver(() => recortes.forEach(pintar)).observe(mesa);
  document.addEventListener("visibilitychange", () => { if (document.hidden) detener(); });
  preferencia.addEventListener("change", (evento) => {
    reducido = evento.matches;
    if (reducido) detener();
  });
  recortes.forEach(pintar);
}
