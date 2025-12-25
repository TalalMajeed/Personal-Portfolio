import { NextResponse } from "next/server";
import { ensureDefaultAdmin, verifyCredentials } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await ensureDefaultAdmin();

    const body = await request.json().catch(() => null);
    const email = body?.email;
    const password = body?.password;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email ||
      !password
    ) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 },
      );
    }

    const isValid = await verifyCredentials(email, password);

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 },
      );
    }

    const response = NextResponse.json(
      { success: true, message: "Login successful." },
      { status: 200 },
    );

    response.cookies.set("admin_session", "true", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 },
    );
  }
}
