import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authenticateUser } from "@/lib/auth";
import { CreateEvent } from "@/helper/event/CreateEvent";
import { GetUserEvent } from "@/helper/event/GetUserEvent";
import { UpdateEvent } from "@/helper/event/UpdateEvent";
import { GetUserEventByType } from "@/helper/event/GetUserEventByType";
import mongoose from "mongoose";

// 🔹 Universal function to handle authentication and response
async function handleRequest(req: NextRequest, method: string) {
  try {
    // 🔹 Authenticate user
    const authResult = await authenticateUser(req);
    if (authResult instanceof NextResponse) {
      return authResult; // Return unauthorized response if authentication fails
    }
    const { userId }: { userId: unknown } = authResult; // Destructuring with 'unknown' type
    console.log(userId);

    // Check if userId is a valid ObjectId string
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    switch (method) {
      case "POST":
        return await CreateEvent(userId, req); // ✅ Create event
      case "GET":
        const eventType = req.nextUrl.searchParams.get("type"); // Get event ID from query params
        if (eventType) {
          return await GetUserEventByType(userId, req, eventType); // ✅ Get user events by type
        }
        return await GetUserEvent(userId, req); // ✅ Get user events
      case "PATCH": // ✅ Added PATCH method for updating events
        const eventId = req.nextUrl.searchParams.get("id"); // Get event ID from query params
        if (!eventId) {
          return NextResponse.json(
            { error: "❌ Event ID is required!" },
            { status: 400 }
          );
        }

        return await UpdateEvent(userId, req, eventId);
      default:
        return NextResponse.json(
          { error: "🚫 Method not allowed" },
          { status: 405 }
        );
    }
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { error: "🚨 Internal server error" },
      { status: 500 }
    );
  }
}

// 🔹 Export HTTP methods
export async function POST(req: NextRequest) {
  return handleRequest(req, "POST");
}

export async function GET(req: NextRequest) {
  return handleRequest(req, "GET");
}

export async function PATCH(req: NextRequest) {
  return handleRequest(req, "PATCH");
}
