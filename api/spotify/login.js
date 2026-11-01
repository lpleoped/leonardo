import {
  SCOPES,
  appendSetCookie,
  cookieHeader,
  isSecureRequest,
  pkceChallenge,
  randomToken,
  requireEnv,
} from "../_lib/spotify.js";

/**
 * Inicia OAuth (PKCE). Redirect a Spotify Accounts.
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).setHeader("Allow", "GET").end("Method Not Allowed");
    return;
  }

  try {
    const clientId = requireEnv("SPOTIFY_CLIENT_ID");
    const redirectUri = requireEnv("SPOTIFY_REDIRECT_URI");
    const secure = isSecureRequest(req);
    const state = randomToken(16);
    const verifier = randomToken(32);
    const challenge = pkceChallenge(verifier);

    appendSetCookie(
      res,
      cookieHeader("sp_oauth_state", state, { maxAge: 600, secure }),
    );
    appendSetCookie(
      res,
      cookieHeader("sp_code_verifier", verifier, { maxAge: 600, secure }),
    );

    const url = new URL("https://accounts.spotify.com/authorize");
    url.searchParams.set("client_id", clientId);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("scope", SCOPES);
    url.searchParams.set("state", state);
    url.searchParams.set("code_challenge_method", "S256");
    url.searchParams.set("code_challenge", challenge);

    res.statusCode = 302;
    res.setHeader("Location", url.toString());
    res.setHeader("Cache-Control", "no-store");
    res.end();
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).setHeader("Cache-Control", "no-store").json({
      error: "spotify_login_failed",
      message: status === 500 ? "Config incompleta" : String(error.message),
    });
  }
}
