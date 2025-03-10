import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import UserModel, { IUser } from "@/models/User";
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

    let user: IUser | null = null; // Declare user as IUser | null for type safety

    // Check if identifier is an email or a phone number
    if (identifier.includes("@")) {
      user = await UserModel.findOne({ email: identifier }) as IUser | null; // Use IUser type assertion
    } else {
      const phoneData = await PhoneModel.findOne({ "phone.value": identifier }).populate("user");
      user = phoneData?.user as IUser | null; // Use IUser type assertion for populated user
    }

    // If user doesn't exist, return an error response
    if (!user) {
      return NextResponse.json({ error: "🚫 Invalid email/phone or password!" }, { status: 401 });
    }

    // Session expiration time (24 hours)
    const sessionExpiration = 24 * 60 * 60 * 1000;

    // Check if session is valid
    const isSessionValid =
      user.sessionToken &&
      user.sessionCreatedAt &&
      new Date().getTime() - new Date(user.sessionCreatedAt).getTime() < sessionExpiration;

    // If session is valid, return an error response
    if (isSessionValid) {
      return NextResponse.json({ error: "🚫 Already logged in. Please log out first!" }, { status: 403 });
    }

    // Compare the password with the hashed password stored in the database
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "🚫 Invalid email/phone or password!" }, { status: 401 });
    }

    // Generate a session token
    const sessionToken = crypto.randomBytes(32).toString("hex");

    // Set session token and session creation date
    user.sessionToken = sessionToken;
    user.sessionCreatedAt = new Date();
    await user.save();

    // Set HttpOnly cookie with the session token
    const response = NextResponse.json({ message: "✅ Login successful! Welcome back! 🎉" });
    response.cookies.set("token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: sessionExpiration / 1000, // Convert to seconds
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "❌ Failed to login. Please try again!" }, { status: 500 });
  }
}
