import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (session) {
    return NextResponse.json({ success: true, user: { username: session.username } });
  }
  return NextResponse.json({ success: false, message: "No active session found" }, { status: 401 });
}
