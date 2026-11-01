import {
  appendSetCookie,
  clearCookie,
  isSecureRequest,
  siteOrigin,
} from "../_lib/spotify.js";

/**
 * Cierra sesión Spotify del visitante (borra cookies).
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.status(405).setHeader("Allow", "GET, POST").end("Method Not Allowed");
    return;
  }

  const secure = isSecureRequest(req);
  appendSetCookie(res, clearCookie("sp_access_token", { secure }));
  appendSetCookie(res, clearCookie("sp_refresh_token", { secure }));
  appendSetCookie(res, clearCookie("sp_oauth_state", { secure }));
  appendSetCookie(res, clearCookie("sp_code_verifier", { secure }));
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "GET") {
    res.statusCode = 302;
    res.setHeader("Location", `${siteOrigin()}/acerca?spotify=logout#banda-sonora`);
    res.end();
    return;
  }

  res.status(204).end();
}
