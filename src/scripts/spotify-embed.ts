type SpotifyEmbedController = {
  addListener: (event: string, callback: (event: unknown) => void) => void;
};

type SpotifyIframeApi = {
  createController: (
    element: HTMLElement,
    options: { width: string; height: string; uri: string },
    callback: (controller: SpotifyEmbedController) => void,
  ) => void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
  }
}

let apiPromise: Promise<SpotifyIframeApi> | undefined;

function loadApi() {
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    const previous = window.onSpotifyIframeApiReady;
    window.onSpotifyIframeApiReady = (api) => {
      previous?.(api);
      resolve(api);
    };

    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    document.head.appendChild(script);
  });

  return apiPromise;
}

function initEmbed(element: HTMLElement) {
  const mount = element.firstElementChild;
  const uri = element.dataset.spotifyUri;
  const height = element.dataset.spotifyHeight;
  if (!(mount instanceof HTMLElement) || !uri) return;

  void loadApi().then((api) => {
    api.createController(
      mount,
      {
        width: "100%",
        height: height || "352",
        uri,
      },
      () => {},
    );
  });
}

function boot() {
  document.querySelectorAll<HTMLElement>("[data-spotify-embed]").forEach(initEmbed);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
