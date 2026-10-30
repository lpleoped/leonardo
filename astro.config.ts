import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// Hasta definir el dominio, el canónico y el sitemap usan SITE o localhost.
// Los hostings marcan sus builds con CI: publicar con localhost dejaría el canónico roto.
if (process.env.CI && !process.env.SITE) {
  throw new Error("Falta SITE: definila con el dominio público antes de publicar.");
}
const site = process.env.SITE ?? "http://localhost:4321";

export default defineConfig({
  site,
  integrations: [mdx(), sitemap()],
  vite: {
    build: {
      // Lightning CSS fusiona animation-timeline en un shorthand que el navegador
      // rechaza. Conservar los longhands mantiene el recorrido en producción.
      // https://github.com/parcel-bundler/lightningcss/issues/1283
      cssMinify: false,
    },
    preview: {
      // Solo el túnel temporal de Cloudflare. No abre el preview a cualquier host.
      allowedHosts: [".trycloudflare.com"],
    },
  },
});
