import { NextRequest, NextResponse } from "next/server";
import { serverRefreshSession } from "./lib/api/serverRefreshApi";
import { parse } from "cookie";

const privateRoutes = ["/profile", "/diary", "/journey"];
const publicRoutes = ["/auth/login", "/auth/register"];

const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((r) => pathname.startsWith(r));
  const isPrivateRoute = privateRoutes.some((r) => pathname.startsWith(r));

  const response = NextResponse.next();

  if (!accessToken && refreshToken) {
    try {
      const res = await serverRefreshSession(
        request.headers.get("cookie") ?? ""
      );

      const setCookie = res.headers["set-cookie"];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);

          const options = {
            path: parsed.Path || "/",
            maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          };

          if (parsed.accessToken) {
            response.cookies.set("accessToken", parsed.accessToken, options);
          }

          if (parsed.refreshToken) {
            response.cookies.set("refreshToken", parsed.refreshToken, options);
          }
        }
      }
    } catch {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  if (!accessToken && !refreshToken && isPrivateRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
};

export const config = {
  matcher: [
    "/profile/:path*",
    "/diary/:path*",
    "/journey/:path*",
    "/auth/:path*",
  ],
};

export default proxy;
