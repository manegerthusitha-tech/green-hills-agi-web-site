import { NextRequest, NextResponse } from "next/server";
import { listFolderFiles, CATEGORY_FOLDERS, GalleryImage } from "@/lib/googleDrive";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category")?.toLowerCase() || "all";

    if (category !== "all" && !CATEGORY_FOLDERS[category]) {
      return NextResponse.json(
        { success: false, message: `Invalid category: "${category}". Must be one of all, farm, production, products, visitors.` },
        { status: 400 }
      );
    }

    let images: GalleryImage[] = [];

    if (category === "all") {
      const promises = Object.entries(CATEGORY_FOLDERS).map(async ([cat, folderId]) => {
        if (!folderId) return [];
        try {
          return await listFolderFiles(cat, folderId);
        } catch (err) {
          console.error(`Error loading category "${cat}":`, err);
          return [];
        }
      });

      const results = await Promise.all(promises);
      images = results.flat();
      
      // Sort combined images by createdTime descending
      images.sort(
        (a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()
      );
    } else {
      const folderId = CATEGORY_FOLDERS[category];
      if (folderId) {
        images = await listFolderFiles(category, folderId);
      }
    }

    return NextResponse.json({ success: true, images });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to retrieve gallery images";
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
export const dynamic = "force-dynamic";
