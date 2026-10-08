export interface GalleryImage {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  createdTime: string;
  category: string;
  url: string;
}

export const CATEGORY_FOLDERS: Record<string, string | undefined> = {
  farm: process.env.FARM_FOLDER_ID || "15iE2TP4gV_1iICvgojVJs-eBPB9079p2",
  production: process.env.PRODUCTION_FOLDER_ID || "1Nf9OREMEZVIi3Zcpknr4yVju6NBeCJ7x",
  products: process.env.PRODUCTS_FOLDER_ID || "16fLkvobFvDdFN5Tz4oM74GSfOFOXl84g",
  visitors: process.env.VISITORS_FOLDER_ID || "1uRuBHMMfyDKM5rnQz88oBkFMKLa7voDH",
};

let cachedToken: { accessToken: string; expiresAt: number } | null = null;

/**
 * Get an access token using OAuth 2.0 Refresh Token flow.
 * This uploads files under the real user's account (with storage quota),
 * unlike Service Accounts which have zero quota on personal Google Drive.
 */
export async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60000) {
    return cachedToken.accessToken;
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "Missing Google OAuth credentials. Please set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN in .env.local. " +
      "Run: node scripts/get-refresh-token.js <CLIENT_ID> <CLIENT_SECRET>"
    );
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to refresh Google OAuth access token: ${errorText}`);
  }

  const data = await response.json();
  cachedToken = {
    accessToken: data.access_token,
    expiresAt: Date.now() + (data.expires_in || 3600) * 1000,
  };

  return data.access_token;
}

export async function listFolderFiles(category: string, folderId: string): Promise<GalleryImage[]> {
  const accessToken = await getAccessToken();
  const q = `'${folderId}' in parents and trashed = false and mimeType starts with 'image/'`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name,mimeType,size,createdTime)&orderBy=createdTime+desc`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to list Google Drive files for category "${category}": ${errorText}`);
  }

  const data = await response.json();
  interface DriveFile {
    id: string;
    name: string;
    mimeType: string;
    size?: string;
    createdTime: string;
  }

  const files: DriveFile[] = data.files || [];

  return files.map((file) => ({
    id: file.id,
    name: file.name,
    mimeType: file.mimeType,
    size: Number(file.size || 0),
    createdTime: file.createdTime,
    category,
    url: `/api/gallery/image/${file.id}`,
  }));
}

export async function uploadFile(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string,
  folderId: string
): Promise<{ id: string; name: string }> {
  const accessToken = await getAccessToken();
  const boundary = "-------314159265358979323846";

  const metadata = {
    name: fileName,
    parents: [folderId],
  };

  const multipartBody = Buffer.concat([
    Buffer.from(`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n`),
    Buffer.from(`--${boundary}\r\nContent-Type: ${mimeType}\r\nContent-Transfer-Encoding: base64\r\n\r\n`),
    Buffer.from(fileBuffer.toString("base64")),
    Buffer.from(`\r\n--${boundary}--`),
  ]);

  const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": `multipart/related; boundary=${boundary}`,
      "Content-Length": String(multipartBody.length),
    },
    body: multipartBody,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google Drive Upload API Failed: ${errorText}`);
  }

  return response.json();
}

export async function deleteFile(fileId: string): Promise<void> {
  const accessToken = await getAccessToken();
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok && response.status !== 404) {
    const errorText = await response.text();
    throw new Error(`Google Drive Delete API Failed: ${errorText}`);
  }
}

export async function getFileStream(fileId: string): Promise<{ stream: ReadableStream; mimeType: string }> {
  const accessToken = await getAccessToken();

  // 1. Fetch file metadata for the correct Content-Type
  const metaResponse = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?fields=mimeType`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!metaResponse.ok) {
    throw new Error(`Failed to fetch file metadata: ${await metaResponse.text()}`);
  }
  const { mimeType } = await metaResponse.json();

  // 2. Fetch the actual content stream
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch file stream: ${await response.text()}`);
  }

  if (!response.body) {
    throw new Error("No body received in Google Drive download response");
  }

  return {
    stream: response.body,
    mimeType,
  };
}
