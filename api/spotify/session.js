import {
  appendSetCookie,
  clearCookie,
  cookieHeader,
  fetchSpotifyMe,
  isSecureRequest,
  parseCookies,
  refreshAccessToken,
} from "../_lib/spotify.js";

/**
 * Devuelve access token del visitante (same-origin) para Web Playback.
 * Refresca en server si hace falta. No loguea tokens.
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).setHeader("Allow", "GET").end("Method Not Allowed");
    return;
  }

  res.setHeader("Cache-Control", "no-store");
  const secure = isSecureRequest(req);
  const cookies = parseCookies(req.headers.cookie);

  try {
    let access = cookies.sp_access_token || "";
    let refresh = cookies.sp_refresh_token || "";

    if (!access && refresh) {
      const tokens = await refreshAccessToken(refresh);
      access = tokens.access_token;
      const accessMax = Math.max(60, Number(tokens.expires_in) || 3600);
      appendSetCookie(
        res,
        cookieHeader("sp_access_token", access, { maxAge: accessMax, secure }),
      );
      if (tokens.refresh_token) {
        refresh = tokens.refresh_token;
        appendSetCookie(
          res,
          cookieHeader("sp_refresh_token", refresh, {
            maxAge: 60 * 60 * 24 * 30,
            secure,
          }),
        );
      }
    }

    if (!access) {
      res.status(401).json({ connected: false });
      return;
    }

    let me = await fetchSpotifyMe(access);
    if (!me && refresh) {
      const tokens = await refreshAccessToken(refresh);
      access = tokens.access_token;
      const accessMax = Math.max(60, Number(tokens.expires_in) || 3600);
      appendSetCookie(
        res,
        cookieHeader("sp_access_token", access, { maxAge: accessMax, secure }),
      );
      if (tokens.refresh_token) {
        appendSetCookie(
          res,
          cookieHeader("sp_refresh_token", tokens.refresh_token, {
            maxAge: 60 * 60 * 24 * 30,
            secure,
          }),
        );
      }
      me = await fetchSpotifyMe(access);
    }

    if (!me) {
      appendSetCookie(res, clearCookie("sp_access_token", { secure }));
      appendSetCookie(res, clearCookie("sp_refresh_token", { secure }));
      res.status(401).json({ connected: false });
      return;
    }

    res.status(200).json({
      connected: true,
      accessToken: access,
      product: me.product || "unknown",
      displayName: me.display_name || null,
      premium: me.product === "premium",
    });
  } catch {
    res.status(401).json({ connected: false });
  }
}
