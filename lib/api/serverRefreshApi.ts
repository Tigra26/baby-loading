import { apiClient } from "./client";

type RefreshSessionResponse = {
  success: boolean;
};

export const serverRefreshSession = async (cookieHeader: string) => {
  const response = await apiClient.get<RefreshSessionResponse>(
    "/auth/session",
    {
      headers: {
        Cookie: cookieHeader,
      },
    }
  );

  return response;
};
