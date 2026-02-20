import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const token = req.cookies.get("token")?.value; // authentication indicator only
  const role = req.cookies.get("role")?.value; // optional role indicator

  const authPages = ["/login", "/register"];
  const protectedUserPages = ["/dashboard", "/account"];
  const protectedAdminPages = ["/admin"];

  // === If logged in → don't go to login/register ===
  if (token && authPages.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // === Visitor trying to access user-protected pages ===
  if (!token && protectedUserPages.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // === Non-admin trying to access admin pages ===
  if (protectedAdminPages.some((p) => pathname.startsWith(p))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/account/:path*",
    "/admin/:path*",
  ],
};
