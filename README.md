<div align="center">

# Leonardo Pedreira

**Idea, dirección creativa y desarrollo web por [Leonardo Pedreira](https://www.linkedin.com/in/leonardo-pedreira/)**

Sitio personal: el trabajo, el recorrido y las piezas que cuentan quién soy,
construido como edición —no como CV web ni como archivo infinito.

`Astro` · `TypeScript` · `MDX` · `CSS moderno` · `Sitio estático` · `Vercel Functions (Spotify OAuth)`

</div>

---

## Sobre el proyecto

Es un proyecto personal y sin fines de lucro. Nació para tener una web propia de punta a punta: pocas piezas, contadas desde la idea, con el rol y los créditos a la vista.

Montevideo. El oficio se ve en la pieza y en el lugar. El chrome es papel y tinta.

## La idea

- **Papel y tinta.** La interfaz funciona como un impreso. El color lo trae cada caso.
- **Una vida que camina.** En *Acerca*, el recorrido pasa por los lugares donde estudié y trabajé.
- **Un estudio sobre la mesa.** En la portada, las fotos se mueven como recortes sueltos.
- **Más abajo, el archivo.** Artes marciales, música y familia: facetas que no son una segunda carrera.

## Stack

| Capa | Elección |
| --- | --- |
| Framework | Astro 7, con salida estática |
| Contenido | Markdown / MDX validado con un schema |
| Estilos | CSS propio, con animaciones guiadas por el scroll |
| Tipografía | Anybody y Newsreader, autoalojadas |
| Lenguaje | TypeScript |

## Ver el proyecto en local

```bash
corepack enable
corepack pnpm install
corepack pnpm dev
```

Requiere Node.js 22. El sitio queda en `http://localhost:4321`.

### Spotify OAuth (opt-in del visitante)

El embed de la playlist funciona sin login. «Conectar Spotify» usa OAuth del **visitante** (PKCE + Functions en `api/spotify/`). No se presta el Premium del dueño del sitio.

1. Creá una app en [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Redirect URIs exactos, por ejemplo:
   - `http://127.0.0.1:3000/api/spotify/callback` (`vercel dev`; Spotify no acepta `localhost`)
   - `https://tu-dominio.com/api/spotify/callback` (producción, HTTPS)
3. Copiá [`.env.example`](.env.example) a `.env` y completá `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REDIRECT_URI`, `SITE`.
4. En Vercel → Settings → Environment Variables, las mismas claves como **Secret** (Production + Preview).
5. Para probar login en local: `corepack pnpm exec vercel dev` (o `corepack pnpm dev:oauth`). `astro dev` solo no sirve las Functions.

Detalle de seguridad: skill del repo `spotify-oauth-seguro`.

## Créditos

- **Idea, dirección creativa y desarrollo web:** Leonardo Pedreira.

Las tipografías Anybody y Newsreader se distribuyen bajo la SIL Open Font License.

Las marcas, logos, nombres comerciales e imágenes de terceros pertenecen a sus respectivos titulares. Leonardo no reclama esos derechos; se muestran en contexto biográfico y de portfolio personal en este sitio. Detalle en [LICENSE](LICENSE).

La carpeta `privados/` es trabajo personal local (notas y pendientes que no van al sitio ni al remoto).

## Licencia

**© 2026 Leonardo Pedreira. Todos los derechos reservados.**

Este repositorio es público para mostrar el trabajo, no para reutilizarlo. No se autoriza copiar, modificar, distribuir ni usar el material original de Leonardo sin permiso escrito. Ver [LICENSE](LICENSE).

---

<div align="center">

¿Te interesa el proyecto o querés trabajar juntos? Escribime por [LinkedIn](https://www.linkedin.com/in/leonardo-pedreira/).

</div>
