import axios from "axios";
import { parse } from "cookie";

// 0
import { NextRequest, NextResponse } from "next/server";

// 3
import { cookies } from "next/headers";

// 2
const privateRoutes = ["/profile"];

const baseURL = "https://notehub-api.goit.study";

// 1
export async function middleware(request: NextRequest) {
  // 4
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  // 5 далее пренести в хедере
  if (isPrivateRoute) {
    if (!accessToken) {
      if (!refreshToken) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      } else {
        const response = await axios.get(`${baseURL}/auth/session`, {
          headers: {
            Cookie: cookieStore.toString(),
          },
        });

        // 6 копия куки с апи-аус-логин-роут
        const setCookie = response.headers["set-cookie"];

        if (setCookie) {
          const cookieArray = Array.isArray(setCookie)
            ? setCookie
            : [setCookie];
          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);
            const options = {
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              path: parsed.Path,
              maxAge: Number(parsed["Max-Age"]),
            };
            if (parsed.accessToken)
              cookieStore.set("accessToken", parsed.accessToken, options);
            if (parsed.refreshToken)
              cookieStore.set("refreshToken", parsed.refreshToken, options);
          }

          return NextResponse.json(response.data, { status: response.status });
        }

        return NextResponse.next({
          headers: {
            Cookie: cookieStore.toString(),
          },
        });
      }
    } else {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  // matchers: ["/profile"],
  matcher: ["/profile", "/auth/session"],
};
