import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin/dashboard and any child paths
  if (pathname.startsWith("/admin/dashboard")) {
    const sessionCookie = request.cookies.get("admin_session")?.value;
    const secret = process.env.JWT_SECRET || "default_local_secret_for_green_hills_agri";

    const session = sessionCookie ? await verifySession(sessionCookie, secret) : null;

    if (!session) {
      const loginUrl = new URL("/admin", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
