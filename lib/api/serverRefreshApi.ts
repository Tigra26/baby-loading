import { apiClient } from "./client";

export const serverRefreshSession = async (cookie: string) => {
  return apiClient.get("/auth/session", {
    headers: {
      Cookie: cookie,
    },
  });
};
