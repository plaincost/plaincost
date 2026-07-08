import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "plaincost_admin";

function getAdminSecret(): string | null {
  return process.env.WAITLIST_ADMIN_SECRET ?? null;
}

async function hmacSha256(secret: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(message),
  );

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function getAdminSessionToken(): Promise<string | null> {
  const secret = getAdminSecret();

  if (!secret) {
    return null;
  }

  return hmacSha256(secret, "plaincost-admin-session");
}

export function isValidAdminPassword(password: string): boolean {
  const secret = getAdminSecret();

  if (!secret || secret.length !== password.length) {
    return false;
  }

  let mismatch = 0;

  for (let index = 0; index < secret.length; index += 1) {
    mismatch |= secret.charCodeAt(index) ^ password.charCodeAt(index);
  }

  return mismatch === 0;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const expectedToken = await getAdminSessionToken();

  if (!expectedToken) {
    return false;
  }

  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  return session === expectedToken;
}