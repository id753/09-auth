import { NextResponse } from "next/server";
import { isAxiosError } from "axios";

export function logErrorResponse(errorObj: unknown): void {
  const green = "\x1b[32m";
  const yellow = "\x1b[33m";
  const reset = "\x1b[0m";

  // Стрелка зелёная, текст жёлтый
  console.log(`${green}> ${yellow}Error Response Data:${reset}`);
  console.dir(errorObj, { depth: null, colors: true });
}

export function handleApiError(
  error: unknown,
  defaultMessage: string = "Internal Server Error"
) {
  if (isAxiosError(error)) {
    // Логируем для сервера (в терминал)
    logErrorResponse(error.response?.data);

    return NextResponse.json(
      {
        error: error.response?.data?.message || error.message || defaultMessage,
        response: error.response?.data,
      },
      {
        // Если статус от бэкенда пришел (400, 401, 404), берем его.
        // Если это ошибка сети или 500 — ставим 500.
        status: error.response?.status || 500,
      }
    );
  }

  // Если это системная ошибка JS (например, TypeError)
  if (error instanceof Error) {
    logErrorResponse({ message: error.message });
  }

  return NextResponse.json({ error: defaultMessage }, { status: 500 });
}
