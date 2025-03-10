import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import EventModel from "@/models/Event";
import { eventSchema } from "@/validator/eventValidator";

export async function CreateEvent(userId: string, req: NextRequest) {
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
    const { error, value } = eventSchema.validate(body, { abortEarly: false });

    if (error) {
      return NextResponse.json(
        { error: "❌ Validation failed!", details: error.details.map((e) => e.message) },
        { status: 400 }
      );
    }

    // 🔹 Create new event
    const newEvent = await EventModel.create({ user: userId, ...value });

    return NextResponse.json(
      { message: "✅ Event created successfully!", event: newEvent },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Error creating event:", error);
    return NextResponse.json(
      { error: error.message || "🚨 Something went wrong!" },
      { status: 500 }
    );
  }
}
