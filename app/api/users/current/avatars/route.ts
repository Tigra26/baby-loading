import { logErrorResponse } from "@/app/api/_utils/utils";
import { api } from "@/app/api/api";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();

    const incomingFormData = await request.formData();
    const file = incomingFormData.get("file");

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const backendFormData = new FormData();

    backendFormData.append("avatar", file);

    const res = await api.patch("/users/current/avatars", backendFormData, {
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "multipart/form-data",
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
