import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import UserModel from "@/models/User";
import methodNotAllowed from "@/helper/methodNotAllowed";

export async function GET() {
  return methodNotAllowed();
}

export async function PUT() {
  return methodNotAllowed();
}

export async function DELETE() {
  return methodNotAllowed();
}

export async function PATCH() {
  return methodNotAllowed();
}

export async function POST(req: Request) {
  await connectDB();

  try {
    const token = req.headers.get("cookie")?.split("token=")[1]?.split(";")[0];

    if (!token) {
      return NextResponse.json(
        { error: "🚫 No session token provided!" },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ sessionToken: token });

    if (!user) {
      return NextResponse.json(
        { error: "🚫 Invalid session or already logged out!" },
        { status: 401 }
      );
    }

    user.sessionToken = null;
    user.sessionCreatedAt = null;
    await user.save();

    const response = NextResponse.json(
      { message: "✅ Logout successful! See you again. 👋" },
      { status: 200 }
    );

    response.cookies.set("token", "", { httpOnly: true, path: "/", maxAge: 0 });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "❌ Failed to log out. Please try again!" },
      { status: 500 }
    );
  }
}
