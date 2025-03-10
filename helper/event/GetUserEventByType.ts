import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import EventModel from "@/models/Event";

export async function GetUserEventByType(userId: string, req: NextRequest, eventType?: string) {
  try {
    // 🔹 Connect to the database
    await connectDB();

    // 🔹 Get today's date at 00:00:00 (start of the day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let filter: any = { user: userId };

    // 🔹 Validate eventType
    if (!eventType) {
      return NextResponse.json(
        { error: "❌ Event type is required! Use 'upcoming', 'today', or 'past'." },
        { status: 400 }
      );
    }

    if (eventType === "upcoming") {
      filter.eventDate = { $gte: today }; // ✅ Future events
    } else if (eventType === "today") {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1); // Get end of today
      filter.eventDate = { $gte: today, $lt: tomorrow }; // ✅ Events happening today
    } else if (eventType === "past") { // 🔹 Renamed from "previous"
      filter.eventDate = { $lt: today }; // ✅ Past events
    } else {
      return NextResponse.json(
        { error: "❌ Invalid event type! Use 'upcoming', 'today', or 'past'." },
        { status: 400 }
      );
    }

    // 🔹 Fetch events based on the filter
    const events = await EventModel.find(filter).sort({ eventDate: 1 });

    return NextResponse.json({ events }, { status: 200 });
  } catch (error: any) {
    console.error("❌ Error fetching events:", error);
    return NextResponse.json(
      { error: error.message || "🚨 Something went wrong!" },
      { status: 500 }
    );
  }
}
