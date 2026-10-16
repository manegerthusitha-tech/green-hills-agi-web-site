import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET() {
  try {
    const folderId = process.env.GALLERY_VIDEOS_FOLDER_ID;

    if (!folderId) {
      return NextResponse.json(
        { success: false, message: "Video folder ID is missing." },
        { status: 500 }
      );
    }

    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    auth.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const drive = google.drive({ version: "v3", auth });

    const result = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false and mimeType contains 'video/'`,
      fields: "files(id,name,mimeType,webViewLink,thumbnailLink)",
      orderBy: "createdTime desc",
    });

    const videos = (result.data.files || []).map((file) => ({
      id: file.id,
      name: file.name,
      url: `https://drive.google.com/file/d/${file.id}/preview`,
      thumbnail: file.thumbnailLink || null,
    }));

    return NextResponse.json({ success: true, videos });
  } catch (error) {
    console.error("Gallery videos error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load videos." },
      { status: 500 }
    );
  }
}