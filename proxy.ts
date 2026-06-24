import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const privateRoutes = ["/profile", "/diary", "/journey"];
const publicRoutes = ["/auth/login", "/auth/register"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const isHomePage = pathname === "/";
  const isPrivateRoute =
    isHomePage || privateRoutes.some((route) => pathname.startsWith(route));

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isPrivateRoute && !accessToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/profile/:path*",
    "/diary/:path*",
    "/journey/:path*",
    "/auth/:path*",
  ],
};