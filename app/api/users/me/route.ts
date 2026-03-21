export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";
import { handleApiError, logErrorResponse } from "../../_utils/utils";
import { isAxiosError } from "axios";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const res = await api.get("/users/me", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    return handleApiError(error, "Profile get failed");
  }
}

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const body = await request.json();

    const res = await api.patch("/users/me", body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    return handleApiError(error, "Profile update failed");
  }
}
