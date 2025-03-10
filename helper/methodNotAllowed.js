import { NextResponse } from "next/server";

function methodNotAllowed() {
  return NextResponse.json(
    { message: "🚫 Oops! This method is not allowed on this route." },
    { status: 405 }
  );
}

export default methodNotAllowed;
