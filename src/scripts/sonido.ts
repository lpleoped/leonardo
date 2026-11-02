const disparadores = document.querySelectorAll<HTMLAnchorElement>("[data-sonido-trigger]");
const panel = document.querySelector<HTMLElement>("[data-spotify-panel]");
const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

for (const disparador of disparadores) {
  disparador.addEventListener("click", (evento) => {
    evento.preventDefault();
    if (!panel) return;
    panel.closest(".banda-sonora")?.classList.add("banda-sonora--activa");
    panel.scrollIntoView({ behavior: reducir ? "auto" : "smooth", block: "center" });
    window.setTimeout(() => {
      panel.querySelector<HTMLIFrameElement>("iframe")?.focus({ preventScroll: true });
    }, reducir ? 0 : 450);
  });
}
