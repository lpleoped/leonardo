type SessionPayload = {
  connected: boolean;
  accessToken?: string;
  premium?: boolean;
  displayName?: string | null;
  product?: string;
};

async function fetchSession(): Promise<SessionPayload> {
  const res = await fetch("/api/spotify/session", {
    credentials: "same-origin",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) return { connected: false };
  return (await res.json()) as SessionPayload;
}

function initPanel(panel: HTMLElement) {
  const conectar = panel.querySelector<HTMLAnchorElement>("[data-spotify-conectar]");
  const logout = panel.querySelector<HTMLButtonElement>("[data-spotify-logout]");
  const estado = panel.querySelector<HTMLElement>("[data-spotify-estado]");

  async function applySession(session: SessionPayload) {
    const conectado = Boolean(session.connected && session.accessToken);
    if (conectar) conectar.hidden = conectado;
    if (logout) logout.hidden = !conectado;

    if (!conectado) {
      if (estado) estado.hidden = true;
      return;
    }

    if (estado) {
      estado.hidden = false;
      const nombre = session.displayName?.trim();
      estado.textContent = nombre ? nombre : "Conectado";
      estado.dataset.en = nombre ? nombre : "Connected";
    }
  }

  logout?.addEventListener("click", async () => {
    await fetch("/api/spotify/logout", { method: "POST", credentials: "same-origin" });
    await applySession({ connected: false });
  });

  void fetchSession().then(applySession);
}

function boot() {
  document.querySelectorAll<HTMLElement>("[data-spotify-panel]").forEach(initPanel);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
