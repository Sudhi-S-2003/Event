import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authenticateUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // 🔹 Authentication check
    const authResult = await authenticateUser(req);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const { userId } = authResult;
    // 🔹 Authentication check


    return NextResponse.json({
      message: "🔒 Protected data accessed!",
      userId,
    });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { error: "🚨 Something went wrong!" },
      { status: 500 }
    );
  }
}
