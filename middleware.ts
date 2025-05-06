import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware running at:", request.nextUrl.pathname);
  const token = request.cookies.get("auth_token")?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthPage = ["/auth/login", "/auth/verify-otp"].includes(pathname);
  const isDashboard = pathname.startsWith("/dashboard");

  // 1. Redirect unauthenticated users from protected routes
  if (isDashboard && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // 2. Block direct access to /auth/verify-otp
  if (pathname === "/auth/verify-otp") {
    const referer = request.headers.get("referer");
    const cameFromLogin = referer?.endsWith("/auth/login");
    if (!cameFromLogin) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // 3. Redirect authenticated users away from auth pages
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login", "/auth/verify-otp"],
};
