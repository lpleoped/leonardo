const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const marcarLectura = (lectura: HTMLElement) => {
  const cuerpo = lectura.querySelector<HTMLElement>("[data-voz-cuerpo]");
  if (!cuerpo) return;
  const overflow = cuerpo.scrollHeight - cuerpo.clientHeight > 8;
  lectura.toggleAttribute("data-overflow", overflow);
  const alFondo = !overflow || cuerpo.scrollTop + cuerpo.clientHeight >= cuerpo.scrollHeight - 8;
  lectura.toggleAttribute("data-at-end", alFondo);
};

for (const seccion of document.querySelectorAll<HTMLElement>(".voces")) {
  const carrusel = seccion.querySelector<HTMLElement>("[data-voces-carrusel]");
  const prev = seccion.querySelector<HTMLButtonElement>("[data-voces-prev]");
  const next = seccion.querySelector<HTMLButtonElement>("[data-voces-next]");
  if (!carrusel || !prev || !next) continue;

  const lecturas = [...seccion.querySelectorAll<HTMLElement>(".voz-lectura")];

  const refrescarLecturas = () => {
    for (const lectura of lecturas) marcarLectura(lectura);
  };

  for (const lectura of lecturas) {
    const cuerpo = lectura.querySelector<HTMLElement>("[data-voz-cuerpo]");
    if (!cuerpo) continue;
    cuerpo.addEventListener(
      "scroll",
      () => {
        marcarLectura(lectura);
      },
      { passive: true },
    );
  }

  const paso = () => {
    const tarjeta = carrusel.querySelector<HTMLElement>(".voz");
    if (!tarjeta) return Math.round(carrusel.clientWidth * 0.86);
    const pista = carrusel.querySelector<HTMLElement>(".voces-pista");
    const gap = pista
      ? Number.parseFloat(getComputedStyle(pista).columnGap || getComputedStyle(pista).gap) || 0
      : 0;
    return Math.round(tarjeta.getBoundingClientRect().width + gap);
  };

  const actualizar = () => {
    const max = carrusel.scrollWidth - carrusel.clientWidth;
    prev.disabled = carrusel.scrollLeft <= 2;
    next.disabled = carrusel.scrollLeft >= max - 2;
    refrescarLecturas();
  };

  const ir = (dir: -1 | 1) => {
    carrusel.scrollBy({
      left: dir * paso(),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  prev.addEventListener("click", () => ir(-1));
  next.addEventListener("click", () => ir(1));
  carrusel.addEventListener("scroll", actualizar, { passive: true });
  window.addEventListener("resize", actualizar, { passive: true });
  if (typeof ResizeObserver !== "undefined") {
    const ro = new ResizeObserver(refrescarLecturas);
    for (const lectura of lecturas) ro.observe(lectura);
  }
  actualizar();
}
