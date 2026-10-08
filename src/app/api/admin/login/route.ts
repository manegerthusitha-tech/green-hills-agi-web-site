import { NextResponse } from "next/server";
import { signSession } from "@/lib/auth";
import { verifyAdminCredentials } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || !body.username || !body.password) {
      return NextResponse.json(
        { success: false, message: "Username and password are required" },
        { status: 400 }
      );
    }

    const { username, password } = body;

    // Verify against MySQL database with bcrypt encrypted password
    const authResult = await verifyAdminCredentials(username, password);

    if (authResult.success && authResult.user) {
      const secret = process.env.JWT_SECRET || "default_local_secret_for_green_hills_agri";

      // Session lasts 1 day
      const exp = Date.now() + 24 * 60 * 60 * 1000;
      const token = await signSession(
        {
          id: authResult.user.id,
          username: authResult.user.username,
          exp,
        },
        secret
      );

      const response = NextResponse.json({
        success: true,
        message: "Logged in successfully",
        user: { username: authResult.user.username },
      });

      response.cookies.set({
        name: "admin_session",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(exp),
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: "Invalid username or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login API error:", error);
    const message =
      error instanceof Error ? error.message : "An error occurred during authentication";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
