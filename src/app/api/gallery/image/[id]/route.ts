import { NextRequest } from "next/server";
import { getFileStream } from "@/lib/googleDrive";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: fileId } = await params;
    if (!fileId) {
      return new Response("Missing file ID", { status: 400 });
    }

    const { stream, mimeType } = await getFileStream(fileId);

    // Return the Google Drive download stream directly to the client
    // Set headers for long-term browser & CDN caching
    return new Response(stream, {
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error(`Error proxying Google Drive image:`, error);
    const message = error instanceof Error ? error.message : "Failed to stream image";
    return new Response(message, { status: 500 });
  }
}
