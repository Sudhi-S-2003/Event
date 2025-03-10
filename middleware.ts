import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  console.log("Token:", token);

  const protectedRoutes = ["/events", "/dashboard"];
  const authRoutes = ["/login", "/register"];

  const pathname = req.nextUrl.pathname;

  if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// 🔒 Protect routes
export const config = {
  matcher: ["/login", "/register", "/events", "/dashboard/:path*"],
};
