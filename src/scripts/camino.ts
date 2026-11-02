const camino = document.querySelector<HTMLElement>(".camino");
const recorrido = camino?.querySelector<HTMLElement>(".camino-recorrido");
const ventana = camino?.querySelector<HTMLElement>(".camino-ventana");
const relato = camino?.querySelector<HTMLElement>(".camino-relato");
const figura = camino?.querySelector<HTMLElement>(".camino-figura");
const indicacion = camino?.querySelector<HTMLElement>("[data-camino-indicacion]");

if (camino && recorrido && ventana && relato && figura) {
  const mobile = window.matchMedia("(max-width: 40rem)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const etapas = [...figura.querySelectorAll<HTMLElement>(".etapa")];
  const pasos = [...relato.children];

  const activar = () => {
    if (!mobile.matches) return;
    camino.classList.add("camino-manual");
    actualizar();
  };

  const escucharCambio = (consulta: MediaQueryList, callback: () => void) => {
    if ("addEventListener" in consulta) {
      consulta.addEventListener("change", callback);
    } else {
      consulta.addListener(callback);
    }
  };

  const actualizar = () => {
    if (!camino.classList.contains("camino-manual")) return;
    const inicio = recorrido.getBoundingClientRect().top + window.scrollY;
    const recorridoTotal = Math.max(recorrido.offsetHeight - window.innerHeight, 1);
    const progreso = Math.min(1, Math.max(0, (window.scrollY - inicio) / recorridoTotal));
    const pasoActivo = progreso * Math.max(pasos.length - 1, 1);
    const etapaActiva = progreso * Math.max(etapas.length - 1, 1);
    const anchoPaso = pasos[0]?.getBoundingClientRect().width ?? ventana.clientWidth;
    const estilos = getComputedStyle(relato);
    const separacion = parseFloat(estilos.columnGap || estilos.gap) || 0;

    relato.style.setProperty("--camino-x", `${pasoActivo * (anchoPaso + separacion)}px`);
    if (indicacion) indicacion.dataset.oculta = progreso > 0.1 ? "true" : "false";
    etapas.forEach((etapa, indice) => {
      const distancia = Math.abs(indice - etapaActiva);
      etapa.style.opacity = `${Math.max(0, 1 - distancia)}`;
      etapa.style.transform = `scale(${1 - Math.min(distancia, 1) * 0.04})`;
    });
  };

  let raf = 0;
  const escucharScroll = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      actualizar();
    });
  };

  activar();
  window.addEventListener("scroll", escucharScroll, { passive: true });
  window.addEventListener("resize", activar, { passive: true });
  escucharCambio(mobile, activar);
  escucharCambio(reduced, actualizar);
}
