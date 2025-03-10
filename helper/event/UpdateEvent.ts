import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import EventModel from "@/models/Event";
import { updateEventSchema } from "@/validator/eventValidator";

export async function UpdateEvent(userId: string, req: NextRequest, eventId: string) {
  try {
    await connectDB();

    let body;
    try {
      body = await req.json();
    } catch (error) {
      return NextResponse.json(
        { error: "❌ Invalid JSON format!" },
        { status: 400 }
      );
    }

    // 🔹 Validate request body
    const { error, value } = updateEventSchema.validate(body, { abortEarly: false });

    if (error) {
      return NextResponse.json(
        { error: "❌ Validation failed!", details: error.details.map((e) => e.message) },
        { status: 400 }
      );
    }

    // 🔹 Check if event exists and user is the owner
    const event = await EventModel.findById(eventId);
    if (!event) {
      return NextResponse.json(
        { error: "🚫 Event not found!" },
        { status: 404 }
      );
    }

    if (event.user.toString() !== userId.toString()) {
      return NextResponse.json(
        { error: "🚫 Unauthorized! You can't update this event." },
        { status: 403 }
      );
    }

    // 🔹 Update event
    Object.assign(event, value);
    await event.save();

    return NextResponse.json(
      { message: "✅ Event updated successfully!", event },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error updating event:", error);
    return NextResponse.json(
      { error: error.message || "🚨 Something went wrong!" },
      { status: 500 }
    );
  }
}
