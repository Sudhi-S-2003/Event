import methodNotAllowed from "@/helper/methodNotAllowed";
import { GetEventByType} from "@/helper/event/GETEventByType";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const eventType = request.nextUrl.searchParams.get("type");

  if (eventType) {

    return await GetEventByType( request, eventType); 
  }

  return new Response("Event type is missing", { status: 400 });
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

export async function POST() {
  return methodNotAllowed();
}
