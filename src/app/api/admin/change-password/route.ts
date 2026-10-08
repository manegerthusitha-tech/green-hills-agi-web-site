import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { verifyAdminCredentials, saveAdminWithEncryptedPassword } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session || !session.username) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Please log in first" },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Current and new passwords are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: "New password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    const username = session.username as string;

    // Verify current password first
    const isCurrentValid = await verifyAdminCredentials(username, currentPassword);
    if (!isCurrentValid.success) {
      return NextResponse.json(
        { success: false, message: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Encrypt and save new password in MySQL
    await saveAdminWithEncryptedPassword(username, newPassword);

    return NextResponse.json({
      success: true,
      message: "Password updated successfully in database",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update password";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
