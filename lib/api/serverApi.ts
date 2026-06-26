import { cookies } from "next/headers";
import { apiClient } from "./client";
import { Tasks } from "@/types/task";

export const serverRefreshSession = async () => {
  const cookieStore = await cookies();

  const response = await apiClient.get<boolean>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response;
};

export const serverGetTasks = async (): Promise<Tasks> => {
  const cookieStore = await cookies();

  const { data } = await apiClient.get<Tasks>("/tasks", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};
