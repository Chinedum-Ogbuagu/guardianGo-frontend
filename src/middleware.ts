import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  const pathname = request.nextUrl.pathname;

  const isAuthPage = ["/auth/login", "/auth/verify-otp"].includes(pathname);
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (pathname === "/auth/verify-otp") {
    const referer = request.headers.get("referer");
    const cameFromLogin = referer?.endsWith("/auth/login");
    if (!cameFromLogin) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login", "/auth/verify-otp"],
};
