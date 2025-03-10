import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import EventModel from "@/models/Event"; // ✅ Added import

export async function GetUserEvent(userId: string, req: NextRequest) {
  await connectDB();
  
  try {
    const events = await EventModel.find({ user: userId });

    return NextResponse.json({ events });
  } catch (error) {
    console.error("❌ Fetch Events Error:", error);
    return NextResponse.json({ error: "🚨 Failed to fetch events!" }, { status: 500 });
  }
}
