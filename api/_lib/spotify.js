import { createHash, randomBytes } from "node:crypto";

export const SCOPES = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-read-playback-state",
  "user-modify-playback-state",
].join(" ");

const COOKIE_BASE = "Path=/; HttpOnly; SameSite=Lax";

export function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    const err = new Error(`Falta ${name}`);
    err.statusCode = 500;
    throw err;
  }
  return value;
}

export function siteOrigin() {
  const site = process.env.SITE?.replace(/\/$/, "");
  if (site) return site;
  const host =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (host) return `https://${host.replace(/^https?:\/\//, "")}`;
  return "http://localhost:4321";
}

export function isSecureRequest(req) {
  const proto = req.headers["x-forwarded-proto"];
  if (proto) return String(proto).split(",")[0].trim() === "https";
  return Boolean(process.env.VERCEL);
}

export function base64Url(buffer) {
  return Buffer.from(buffer)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export function randomToken(bytes = 32) {
  return base64Url(randomBytes(bytes));
}

export function pkceChallenge(verifier) {
  return base64Url(createHash("sha256").update(verifier).digest());
}

export function parseCookies(header) {
  const out = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (!key) continue;
    out[key] = decodeURIComponent(value);
  }
  return out;
}

export function cookieHeader(name, value, { maxAge, secure, path = "/" } = {}) {
  const bits = [
    `${name}=${encodeURIComponent(value)}`,
    `Path=${path}`,
    "HttpOnly",
    "SameSite=Lax",
  ];
  if (typeof maxAge === "number") bits.push(`Max-Age=${maxAge}`);
  if (secure) bits.push("Secure");
  return bits.join("; ");
}

export function clearCookie(name, { secure, path = "/" } = {}) {
  return cookieHeader(name, "", { maxAge: 0, secure, path });
}

/** @param {import('@vercel/node').VercelResponse} res */
export function appendSetCookie(res, line) {
  const prev = res.getHeader("Set-Cookie");
  if (!prev) {
    res.setHeader("Set-Cookie", line);
    return;
  }
  const list = Array.isArray(prev) ? prev : [String(prev)];
  res.setHeader("Set-Cookie", [...list, line]);
}

export async function exchangeAuthorizationCode({ code, verifier, redirectUri }) {
  const clientId = requireEnv("SPOTIFY_CLIENT_ID");
  const clientSecret = requireEnv("SPOTIFY_CLIENT_SECRET");
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: verifier,
  });
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
    body,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const err = new Error(data.error_description || data.error || "token_exchange_failed");
    err.statusCode = response.status;
    throw err;
  }
  return data;
}

export async function refreshAccessToken(refreshToken) {
  const clientId = requireEnv("SPOTIFY_CLIENT_ID");
  const clientSecret = requireEnv("SPOTIFY_CLIENT_SECRET");
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId,
  });
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
    body,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const err = new Error(data.error_description || data.error || "refresh_failed");
    err.statusCode = response.status;
    throw err;
  }
  return data;
}

export async function fetchSpotifyMe(accessToken) {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) return null;
  return response.json();
}

export { COOKIE_BASE };
