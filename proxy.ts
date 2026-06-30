import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { serverRefreshSession } from "./lib/api/serverRefreshApi";
import { parse } from "cookie";

const privateRoutes = ["/profile", "/diary", "/journey"];
const publicRoutes = ["/auth/login", "/auth/register"];

const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!accessToken) {
    if (refreshToken) {
      const data = await serverRefreshSession();
      const setCookie = data.headers["set-cookie"];

      if (setCookie) {
        const response = isPublicRoute
          ? NextResponse.redirect(new URL("/profile", request.url))
          : NextResponse.next();

        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);

          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path || "/",
            maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
          };

          if (parsed.accessToken) {
            response.cookies.set("accessToken", parsed.accessToken, options);
          }

          if (parsed.refreshToken) {
            response.cookies.set("refreshToken", parsed.refreshToken, options);
          }
        }

        return response;
      }
    }

    if (isPublicRoute) {
      return NextResponse.next();
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  if (isPrivateRoute) {
    return NextResponse.next();
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
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
