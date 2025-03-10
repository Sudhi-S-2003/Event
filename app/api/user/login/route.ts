import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import UserModel from "@/models/User";
import PhoneModel from "@/models/Phone";
import methodNotAllowed from "@/helper/methodNotAllowed";
import { comparePassword } from "@/helper/passwordHelper";
import crypto from "crypto"; 
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
    const body = await req.json();
    const { identifier, password } = body; 

    let user = null;

    if (identifier.includes("@")) {
      user = await UserModel.findOne({ email: identifier });
    } else {
      const phoneData = await PhoneModel.findOne({ "phone.value": identifier }).populate("user");
      user = phoneData?.user || null;
    }

    if (!user) {
      return NextResponse.json(
        { error: "🚫 Invalid email/phone or password!" },
        { status: 401 }
      );
    }

    const sessionExpiration = 24 * 60 * 60 * 1000; 
    
    const isSessionValid =
      user.sessionToken && user.sessionCreatedAt && 
      new Date().getTime() - new Date(user.sessionCreatedAt).getTime() < sessionExpiration;

    if (isSessionValid) {
      return NextResponse.json(
        { error: "🚫 Already logged in. Please log out first!" },
        { status: 403 }
      );
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "🚫 Invalid email/phone or password!" },
        { status: 401 }
      );
    }

    const sessionToken = crypto.randomBytes(32).toString("hex");

    user.sessionToken = sessionToken;
    user.sessionCreatedAt = new Date();
    await user.save();

    return NextResponse.json(
      {
        message: "✅ Login successful! Welcome back! 🎉",
        token: sessionToken,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "❌ Failed to login. Please try again!" },
      { status: 500 }
    );
  }
}
