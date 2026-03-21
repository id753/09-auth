import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";
import { checkServerSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Пытаемся получить accessToken из кук запроса (то, что прислал браузер)
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // 2. Если accessToken нет, но есть refreshToken — идем на бэкенд за новой сессией
  if (!accessToken && refreshToken) {
    try {
      const apiRes = await checkServerSession();
      const setCookieHeader = apiRes.headers["set-cookie"];

      if (setCookieHeader) {
        // Создаем базовый ответ (либо редирект на главную, либо разрешаем переход дальше)
        const response = isPublicRoute
          ? NextResponse.redirect(new URL("/", request.url))
          : NextResponse.next();

        // Парсим массив строк из заголовка Set-Cookie
        const cookieStrings = Array.isArray(setCookieHeader)
          ? setCookieHeader
          : [setCookieHeader];

        cookieStrings.forEach((str) => {
          const parsed = parse(str);
          // Извлекаем имя куки (первая часть до знака '=')
          const name = str.split("=")[0].trim();
          const value = parsed[name];

          // Проверяем, что это наши токены и значение не пустое (для TS)
          if (
            (name === "accessToken" ||
              name === "refreshToken" ||
              name === "sessionId") &&
            value
          ) {
            response.cookies.set(name, value, {
              httpOnly: true,
              path: parsed.Path || "/",
              // ВАЖНО: на http://localhost принудительно ставим secure: false, иначе браузер их не сохранит
              secure: false,
              sameSite: "lax",
              maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : 86400,
            });
          }
        });

        return response;
      }
    } catch (error) {
      console.error("Auth Refresh Error in Middleware:", error);
      // Если рефреш не удался — отправляем на логин, если это приватный роут
      if (isPrivateRoute) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    }
  }

  // 3. Логика защиты роутов (Access Control)
  if (!accessToken && isPrivateRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (accessToken && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Конфигурация путей, для которых запускается Middleware
export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
