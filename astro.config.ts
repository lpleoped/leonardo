import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// Canónico y sitemap: SITE manda. En Vercel, sin SITE, usamos el dominio del proyecto.
// Los hostings marcan CI: publicar con localhost dejaría el canónico roto.
const vercelHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const siteValue = process.env.SITE ?? vercelHost;
const site = (() => {
  if (!siteValue) return "http://localhost:4321";

  const value = siteValue.trim();
  const scheme = value.match(/^https?:\/\//)?.[0] ?? "https://";
  const withoutScheme = value.replace(/^https?:\/\//, "");
  const nestedScheme = withoutScheme.search(/https?:\/\//);
  const host = nestedScheme === -1 ? withoutScheme : withoutScheme.slice(0, nestedScheme);
  return `${scheme}${host}`.replace(/\/$/, "");
})();
if (process.env.CI && !process.env.SITE && !vercelHost) {
  throw new Error(
    "Falta SITE (o un host de Vercel): definila con el dominio público antes de publicar.",
  );
}

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
