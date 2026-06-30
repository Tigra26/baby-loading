import { cookies } from "next/headers";
import { apiClient } from "./client";

export const serverRefreshSession = async () => {
  const cookieStore = await cookies();

  const response = await apiClient.get<boolean>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response;
};
