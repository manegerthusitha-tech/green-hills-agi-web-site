import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { deleteFile } from "@/lib/googleDrive";

export async function DELETE(request: NextRequest) {
  try {
    // 1. Authenticate the Admin Session
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // 2. Extract the fileId
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get("id");

    if (!fileId) {
      return NextResponse.json({ success: false, message: "Missing image ID (id parameter)" }, { status: 400 });
    }

    // 3. Delete from Google Drive
    await deleteFile(fileId);

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully from Google Drive",
    });
  } catch (error) {
    console.error("Error in delete handler:", error);
    const message = error instanceof Error ? error.message : "An error occurred during file deletion";
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
