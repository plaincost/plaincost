import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSessionToken } from "@/lib/admin-auth";

const protectedPrefixes = [
  "/admin/waitlist",
  "/admin/aws",
  "/api/admin/waitlist",
  "/api/admin/aws",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const expectedToken = await getAdminSessionToken();

  if (!expectedToken) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Admin is not configured." }, { status: 503 });
    }

    const loginUrl = new URL("/admin", request.url);
    loginUrl.searchParams.set("error", "config");
    return NextResponse.redirect(loginUrl);
  }

  const session = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

  if (session !== expectedToken) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const loginUrl = new URL("/admin", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/waitlist/:path*",
    "/admin/aws/:path*",
    "/api/admin/waitlist/:path*",
    "/api/admin/aws/:path*",
  ],
};