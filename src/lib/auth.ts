import { cookies } from "next/headers";

const encoder = new TextEncoder();

function base64urlEncode(str: string): string {
  // Safe base64url encoding for UTF-8 strings
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64urlDecode(str: string): string {
  // Safe base64url decoding for UTF-8 strings
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return decodeURIComponent(escape(atob(base64)));
}

async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const secretBuffer = encoder.encode(secret);
  return crypto.subtle.importKey(
    "raw",
    secretBuffer,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function signSession(payload: object, secret: string): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = base64urlEncode(JSON.stringify(header));
  const encodedPayload = base64urlEncode(JSON.stringify(payload));
  const data = `${encodedHeader}.${encodedPayload}`;
  
  const key = await getCryptoKey(secret);
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(data)
  );
  
  const signatureBytes = new Uint8Array(signatureBuffer);
  let signatureBinStr = "";
  for (let i = 0; i < signatureBytes.byteLength; i++) {
    signatureBinStr += String.fromCharCode(signatureBytes[i]);
  }
  const signature = btoa(signatureBinStr)
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
    
  return `${data}.${signature}`;
}

export async function verifySession(token: string, secret: string): Promise<Record<string, unknown> | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [header, payload, signature] = parts;
    const data = `${header}.${payload}`;
    
    const key = await getCryptoKey(secret);
    
    let signatureBase64 = signature.replace(/-/g, "+").replace(/_/g, "/");
    while (signatureBase64.length % 4) {
      signatureBase64 += "=";
    }
    const signatureBinStr = atob(signatureBase64);
    const signatureBytes = new Uint8Array(signatureBinStr.length);
    for (let i = 0; i < signatureBinStr.length; i++) {
      signatureBytes[i] = signatureBinStr.charCodeAt(i);
    }
    
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes,
      encoder.encode(data)
    );
    
    if (!isValid) return null;
    
    const decodedPayload = JSON.parse(base64urlDecode(payload));
    
    if (decodedPayload.exp && decodedPayload.exp < Date.now()) {
      return null;
    }
    
    return decodedPayload;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return null;
  
  const secret = process.env.JWT_SECRET || "default_local_secret_for_green_hills_agri";
  return verifySession(token, secret);
}
