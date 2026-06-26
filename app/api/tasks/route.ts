import { NextRequest, NextResponse } from "next/server";
import { api } from "../api";
import { cookies } from "next/headers";
import { logErrorResponse } from "../_utils/utils";
import { isAxiosError } from "axios";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const { searchParams } = new URL(request.url);

    const res = await api.get("/tasks", {
      headers: {
        Cookie: cookieStore.toString(),
      },
      params: {
        page: searchParams.get("page") ?? undefined,
        limit: searchParams.get("limit") ?? undefined,
        sortOrder: searchParams.get("sortOrder") ?? undefined,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    const body = await request.json();

    const res = await api.post("/tasks", body, {
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
