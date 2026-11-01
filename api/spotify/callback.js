import {
  appendSetCookie,
  clearCookie,
  cookieHeader,
  exchangeAuthorizationCode,
  isSecureRequest,
  parseCookies,
  requireEnv,
  siteOrigin,
} from "../_lib/spotify.js";

/**
 * Callback OAuth: valida state, exchange code, cookies de sesión.
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).setHeader("Allow", "GET").end("Method Not Allowed");
    return;
  }

  const secure = isSecureRequest(req);
  const origin = siteOrigin();
  const failRedirect = `${origin}/acerca?spotify=error#banda-sonora`;

  try {
    const redirectUri = requireEnv("SPOTIFY_REDIRECT_URI");
    const query = req.query || {};
    const code = typeof query.code === "string" ? query.code : "";
    const state = typeof query.state === "string" ? query.state : "";
    const oauthError = typeof query.error === "string" ? query.error : "";

    if (oauthError || !code || !state) {
      res.statusCode = 302;
      res.setHeader("Location", failRedirect);
      res.end();
      return;
    }

    const cookies = parseCookies(req.headers.cookie);
    if (!cookies.sp_oauth_state || cookies.sp_oauth_state !== state) {
      res.statusCode = 302;
      res.setHeader("Location", failRedirect);
      res.end();
      return;
    }

    const verifier = cookies.sp_code_verifier;
    if (!verifier) {
      res.statusCode = 302;
      res.setHeader("Location", failRedirect);
      res.end();
      return;
    }

    const tokens = await exchangeAuthorizationCode({
      code,
      verifier,
      redirectUri,
    });

    appendSetCookie(res, clearCookie("sp_oauth_state", { secure }));
    appendSetCookie(res, clearCookie("sp_code_verifier", { secure }));

    const accessMax = Math.max(60, Number(tokens.expires_in) || 3600);
    appendSetCookie(
      res,
      cookieHeader("sp_access_token", tokens.access_token, {
        maxAge: accessMax,
        secure,
      }),
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

    res.statusCode = 302;
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Location", `${origin}/acerca?spotify=connected#banda-sonora`);
    res.end();
  } catch {
    res.statusCode = 302;
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Location", failRedirect);
    res.end();
  }
}
