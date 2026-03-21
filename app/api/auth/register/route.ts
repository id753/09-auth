import { NextResponse } from "next/server";
import { api } from "../../api";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const apiRes = await api.post("/auth/register", body);

    const response = NextResponse.json(apiRes.data);

    const backendCookies = apiRes.headers["set-cookie"];
    if (backendCookies) {
      backendCookies.forEach((c) => response.headers.append("set-cookie", c));
    }

    return response;
  } catch (error) {}
}
