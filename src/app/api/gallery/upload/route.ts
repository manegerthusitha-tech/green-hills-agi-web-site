import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { uploadFile, CATEGORY_FOLDERS } from "@/lib/googleDrive";

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate the Admin Session
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse Multi-Part Form Data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const category = formData.get("category") as string | null;

    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });
    }

    // Ensure the file is actually an image
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ success: false, message: "Only image files are allowed" }, { status: 400 });
    }

    const catKey = category?.toLowerCase();
    if (!catKey || !CATEGORY_FOLDERS[catKey]) {
      return NextResponse.json(
        { success: false, message: `Invalid category: "${category}"` },
        { status: 400 }
      );
    }

    const folderId = CATEGORY_FOLDERS[catKey];
    if (!folderId) {
      return NextResponse.json(
        { success: false, message: `Google Drive Folder ID not configured for "${category}"` },
        { status: 500 }
      );
    }

    // 3. Convert File to Node Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 4. Upload to Google Drive
    const uploadedFile = await uploadFile(buffer, file.name, file.type, folderId);

    return NextResponse.json({
      success: true,
      message: "Image uploaded successfully to Google Drive",
      file: {
        id: uploadedFile.id,
        name: uploadedFile.name,
      },
    });
  } catch (error) {
    console.error("Error in upload handler:", error);
    const message = error instanceof Error ? error.message : "An error occurred during file upload";
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
