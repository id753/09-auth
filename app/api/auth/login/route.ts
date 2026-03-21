// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { handleApiError } from "../../_utils/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Запрос к  реальному бэкенду
    const apiRes = await api.post("/auth/login", body);

    // Создаем ответ для браузера
    const response = NextResponse.json(apiRes.data, { status: apiRes.status });

    // Извлекаем куки, которые прислал бэкенд
    const setCookieHeader = apiRes.headers["set-cookie"];

    if (setCookieHeader) {
      // Важно: перекладываем заголовки из ответа бэкенда в ответ Next.js
      // Браузер увидит их и сохранит автоматически
      setCookieHeader.forEach((cookie) => {
        response.headers.append("set-cookie", cookie);
      });
    }

    return response;
  } catch (error) {
    return handleApiError(error, "Login failed");
  }
}
