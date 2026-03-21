import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";
import { checkServerSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  //   Если токен есть и мы идем на логин/регистрацию -> на главную
  if (accessToken && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  //Если токена НЕТ, но есть рефреш-токен -> Пытаемся обновиться
  if (!accessToken && refreshToken) {
    try {
      const apiRes = await checkServerSession();
      const setCookieHeader = apiRes.headers["set-cookie"];

      const response = isPublicRoute
        ? NextResponse.redirect(new URL("/", request.url))
        : NextResponse.next();

      if (setCookieHeader) {
        const cookieStrings = Array.isArray(setCookieHeader)
          ? setCookieHeader
          : [setCookieHeader];

        cookieStrings.forEach((str) => {
          const parsed = parse(str);
          const name = str.split("=")[0].trim();
          const value = parsed[name];

          if (
            ["accessToken", "refreshToken", "sessionId"].includes(name) &&
            value
          ) {
            response.cookies.set(name, value, {
              httpOnly: true,
              path: "/",
              secure: false, // Для localhost
              sameSite: "lax",
              maxAge: 86400,
            });
          }
        });
      }
      return response;
    } catch (error) {
      console.error("Middleware Refresh Error:", error);
      if (isPrivateRoute) {
        const res = NextResponse.redirect(new URL("/sign-in", request.url));
        res.cookies.delete("refreshToken");
        return res;
      }
    }
  }

  if (!accessToken && isPrivateRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
