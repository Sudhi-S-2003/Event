import UserModel from "@/models/User";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const authenticateUser = async (req: NextRequest) => {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "🚫 Unauthorized access!" }, { status: 401 });
    }

    const sessionToken = authHeader.split(" ")[1];
    if (!sessionToken) {
      return NextResponse.json({ error: "🚫 Invalid token!" }, { status: 401 });
    }

    const user = await UserModel.findOne({ sessionToken });

    if (!user) {
      return NextResponse.json({ error: "🚫 Invalid session!" }, { status: 401 });
    }

    // Check if session is expired
    const sessionAge = Date.now() - new Date(user.sessionCreatedAt || 0).getTime();
    const oneDayInMs = 24 * 60 * 60 * 1000; 

    if (sessionAge > oneDayInMs) {
      user.sessionToken = null;
      user.sessionCreatedAt = null;
      await user.save();

      return NextResponse.json({ error: "🚫 Session expired! Please log in again." }, { status: 401 });
    }

    return { userId: user._id }; 
  } catch (error) {
    console.error("❌ Authentication Error:", error);
    return NextResponse.json({ error: "🚨 Server error!" }, { status: 500 });
  }
};
